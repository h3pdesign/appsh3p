import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const BASE_DIR = new URL('../docs/public/polymarket-us-politics/', import.meta.url)
const STATE_PATH = new URL('./data/daily-summary-state.json', BASE_DIR)
const PAGE_NAMES = [
  'state-of-us-politics.html',
  'foreign-policy.html',
  '2028-race.html',
  'trump.html',
  'fed-economy.html',
  'midterms.html',
  'congress.html',
  'legal.html',
  'social-media.html'
]

const API_URL = 'https://gamma-api.polymarket.com/markets?active=true&closed=false&archived=false&limit=200'
const USER_AGENT = 'appsh3p-exec-summary-bot/1.0'

const force = process.argv.includes('--force')

const SECTION_RULES = [
  { id: 'foreign', keywords: ['iran', 'israel', 'war', 'strike', 'somalia', 'mexico', 'military', 'nato', 'china', 'ukraine', 'gaza'] },
  { id: 'presidential', keywords: ['2028', 'president', 'nominee', 'election winner'] },
  { id: 'trump', keywords: ['trump', 'truth social', 'greenland', 'impeach'] },
  { id: 'fed', keywords: ['fed', 'powell', 'warsh', 'tariff', 'economy', 'inflation', 'rate cut', 'rate hike'] },
  { id: 'midterms', keywords: ['midterm', 'blue wave', 'house popular vote', 'senate seats'] },
  { id: 'congress', keywords: ['congress', 'house', 'senate', 'speaker', 'shutdown', 'fisa', 'act', 'legislation'] },
  { id: 'legal', keywords: ['clinton', 'epstein', 'charged', 'legal', 'impeached', 'noem'] },
  { id: 'social', keywords: ['musk', 'tweet', 'social', 'truth social', 'posts'] }
]

function parseArray(value) {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatPercent(value) {
  return `${Math.round(value)}%`
}

function toneForPercent(value) {
  if (value >= 67) return 'green'
  if (value >= 34) return 'amber'
  return 'red'
}

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function berlinNowParts() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(new Date())

  const map = Object.fromEntries(parts.filter(p => p.type !== 'literal').map(p => [p.type, p.value]))
  return {
    date: `${map.year}-${map.month}-${map.day}`,
    hour: Number(map.hour),
    minute: Number(map.minute)
  }
}

function pickTopOutcome(market) {
  const outcomes = parseArray(market.outcomes)
  const prices = parseArray(market.outcomePrices).map(v => Number(v))
  if (outcomes.length === 0 || prices.length === 0) return { outcome: 'Yes', probability: null }

  let best = { idx: 0, value: Number.isFinite(prices[0]) ? prices[0] : -1 }
  for (let i = 1; i < Math.min(outcomes.length, prices.length); i += 1) {
    const value = Number(prices[i])
    if (Number.isFinite(value) && value > best.value) best = { idx: i, value }
  }

  const prob = Number.isFinite(best.value) ? Math.max(0, Math.min(100, best.value * 100)) : null
  return {
    outcome: outcomes[best.idx] || 'Top outcome',
    probability: prob
  }
}

function topicScore(question) {
  const q = normalize(question)
  if (!q) return 0
  const mustHave = ['trump', 'election', 'fed', 'congress', 'senate', 'house', 'iran', 'israel', 'war', 'policy', 'midterm', 'social']
  return mustHave.some(k => q.includes(k)) ? 1 : 0
}

function sectionForQuestion(question) {
  const q = normalize(question)
  for (const rule of SECTION_RULES) {
    if (rule.keywords.some(k => q.includes(normalize(k)))) return rule.id
  }
  return 'foreign'
}

function sameQuestionExists(html, question) {
  const needle = normalize(question)
  const matches = [...html.matchAll(/<h3 class="card-question">([\s\S]*?)<\/h3>/g)]
  return matches.some(m => normalize(m[1]) === needle)
}

function buildSummaryParagraph(market, topOutcome, berlinDate) {
  const question = escapeHtml(market.question || 'Market update')
  const outcome = escapeHtml(topOutcome.outcome || 'Top outcome')
  const probabilityText = Number.isFinite(topOutcome.probability) ? formatPercent(topOutcome.probability) : 'n/a'
  const volume = Number(market.volume)
  const volumeText = Number.isFinite(volume)
    ? (volume >= 1_000_000
      ? `$${(volume / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
      : `$${Math.round(volume / 1_000)}K`)
    : 'n/a'

  return `<p class="exec-text auto-daily-summary" id="dailyPolymarketUpdate"><strong>Daily Polymarket update (${berlinDate}, 06:00 Europe/Berlin):</strong> The market currently prices <strong>\"${question}\"</strong> at <strong>${probabilityText}</strong> for <strong>${outcome}</strong>, with approximately <strong>${volumeText}</strong> in traded volume.</p>`
}

function upsertSummary(html, summaryParagraph) {
  const existing = /<p class="exec-text auto-daily-summary" id="dailyPolymarketUpdate">[\s\S]*?<\/p>/
  if (existing.test(html)) return html.replace(existing, summaryParagraph)

  const target = /(<section class="section" id="summary"[\s\S]*?<div class="executive-summary reveal">[\s\S]*?<p class="exec-text">[\s\S]*?<\/p>)/
  if (!target.test(html)) return html
  return html.replace(target, `$1\n      ${summaryParagraph}`)
}

function buildAutoCard(market, topOutcome) {
  const question = escapeHtml(market.question || 'Daily Polymarket market')
  const outcome = escapeHtml(topOutcome.outcome || 'Top outcome')
  const probability = Number.isFinite(topOutcome.probability) ? Math.round(topOutcome.probability) : 50
  const tone = toneForPercent(probability)
  const vol = Number(market.volume)
  const volText = Number.isFinite(vol)
    ? (vol >= 1_000_000
      ? `$${(vol / 1_000_000).toFixed(1).replace(/\.0$/, '')}M vol`
      : `$${Math.round(vol / 1_000)}K vol`)
    : 'Live volume'

  return [
    '      <article class="card reveal auto-news-card" data-market-question="' + question + '">',
    '        <span class="tag-badge watch">Daily Update</span>',
    '        <div class="card-header">',
    `          <h3 class="card-question">${question}</h3>`,
    `          <span class="card-volume">${volText}</span>`,
    '        </div>',
    '        <div class="prob-single">',
    `          <span class="prob-big-value ${tone}">${probability}%</span>`,
    `          <div class="prob-big-bar"><div class="prob-big-fill ${tone}" data-width="${probability}"></div></div>`,
    '        </div>',
    `        <p class="prob-tag">Top market outcome: ${outcome}</p>`,
    '      </article>'
  ].join('\n')
}

function upsertSectionCard(html, sectionId, cardMarkup, question) {
  const withoutOldAutoCards = html.replace(
    /<article class="card reveal auto-news-card"[\s\S]*?<\/article>\n?/g,
    ''
  )

  if (sameQuestionExists(withoutOldAutoCards, question)) return withoutOldAutoCards

  const sectionPattern = new RegExp(`(<section class=\\"section\\" id=\\"${sectionId}\\"[\\s\\S]*?<div class=\\"card-grid(?: three-col)?\\">)`, 'm')
  if (!sectionPattern.test(withoutOldAutoCards)) return withoutOldAutoCards
  return withoutOldAutoCards.replace(sectionPattern, `$1\n${cardMarkup}`)
}

async function fetchRelevantMarket() {
  const response = await fetch(API_URL, { headers: { 'user-agent': USER_AGENT } })
  if (!response.ok) throw new Error(`Polymarket API error ${response.status}`)
  const payload = await response.json()
  const markets = Array.isArray(payload) ? payload : []

  const candidates = markets
    .filter(m => m?.question && topicScore(m.question) > 0)
    .map(m => {
      const volume = Number(m.volume)
      const updated = Date.parse(m.updatedAt || m.updated_at || m.endDate || '') || 0
      const recencyBoost = updated > 0 ? Math.floor(updated / 1000) : 0
      const score = (Number.isFinite(volume) ? volume : 0) + recencyBoost * 0.001
      return { market: m, score }
    })
    .sort((a, b) => b.score - a.score)

  return candidates[0]?.market || null
}

async function loadState() {
  if (!existsSync(STATE_PATH)) return { last_run_berlin_date: null, last_question: null }
  try {
    return JSON.parse(await readFile(STATE_PATH, 'utf8'))
  } catch {
    return { last_run_berlin_date: null, last_question: null }
  }
}

async function saveState(state) {
  await writeFile(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`)
}

async function main() {
  const now = berlinNowParts()
  const state = await loadState()

  if (!force) {
    if (now.hour !== 6) {
      console.log(`Skip: current Berlin time is ${String(now.hour).padStart(2, '0')}:${String(now.minute).padStart(2, '0')}, not 06:00.`)
      return
    }
    if (state.last_run_berlin_date === now.date) {
      console.log(`Skip: already updated for ${now.date}.`)
      return
    }
  }

  let market
  try {
    market = await fetchRelevantMarket()
  } catch (error) {
    console.log(`Skip: failed to fetch market (${error.message}).`)
    return
  }

  if (!market?.question) {
    console.log('Skip: no relevant active Polymarket item found.')
    return
  }

  const topOutcome = pickTopOutcome(market)
  const summaryParagraph = buildSummaryParagraph(market, topOutcome, now.date)
  const sectionId = sectionForQuestion(market.question)
  const cardMarkup = buildAutoCard(market, topOutcome)

  let changed = 0
  for (const name of PAGE_NAMES) {
    const path = new URL(name, BASE_DIR)
    const current = await readFile(path, 'utf8')
    const withSummary = upsertSummary(current, summaryParagraph)
    const updated = upsertSectionCard(withSummary, sectionId, cardMarkup, market.question)

    if (updated !== current) {
      await writeFile(path, updated)
      changed += 1
    }
  }

  await saveState({
    last_run_berlin_date: now.date,
    last_question: market.question,
    updated_at_utc: new Date().toISOString()
  })

  console.log(`Daily executive summary update done. Section: ${sectionId}. Pages changed: ${changed}.`) 
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
