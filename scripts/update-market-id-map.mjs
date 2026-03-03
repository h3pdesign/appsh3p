import { readFile, writeFile } from 'node:fs/promises'

const HTML_PATH = new URL('../docs/public/polymarket-us-politics/state-of-us-politics.html', import.meta.url)
const OUTPUT_PATH = new URL('../docs/public/polymarket-us-politics/data/market-id-map.json', import.meta.url)

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(value) {
  return normalize(value).split(' ').filter(token => token.length > 2)
}

function similarityScore(a, b) {
  const na = normalize(a)
  const nb = normalize(b)
  if (!na || !nb) return 0
  if (na === nb) return 1

  const ta = new Set(tokenize(na))
  const tb = new Set(tokenize(nb))
  if (ta.size === 0 || tb.size === 0) return 0

  let overlap = 0
  ta.forEach(token => { if (tb.has(token)) overlap += 1 })

  const union = new Set([...ta, ...tb]).size || 1
  const jaccard = overlap / union

  const containsBoost = na.includes(nb) || nb.includes(na) ? 0.18 : 0
  const overlapBoost = overlap >= 4 ? 0.12 : overlap >= 2 ? 0.06 : 0

  return Math.min(1, jaccard + containsBoost + overlapBoost)
}

function questionFallbacks(question) {
  const clean = String(question || '').trim()
  if (!clean) return []
  const compact = clean.replace(/[—–-]/g, ' ').replace(/\s+/g, ' ').trim()
  const short = compact.split('?')[0].trim()
  const prefix = compact.slice(0, 72).trim()
  return Array.from(new Set([clean, compact, short, prefix].filter(Boolean)))
}

function extractQuestions(html) {
  const cardQuestions = [...html.matchAll(/<h3 class="card-question">([\s\S]*?)<\/h3>/g)]
    .map(match => match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
  const dataQuestions = [...html.matchAll(/data-market-question="([^"]+)"/g)].map(match => match[1])
  return Array.from(new Set([...dataQuestions, ...cardQuestions].filter(Boolean)))
}

function flattenMarkets(payload) {
  const events = Array.isArray(payload?.events) ? payload.events : []
  return events.flatMap(event => Array.isArray(event?.markets) ? event.markets : [])
}

async function fetchPublicSearch(query) {
  const url = `https://gamma-api.polymarket.com/public-search?q=${encodeURIComponent(query)}&limit=20`
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      'user-agent': 'appsh3p-market-map/1.0'
    }
  })
  if (!response.ok) throw new Error(`public-search failed: ${response.status}`)
  return response.json()
}

function bestMarketForQuestion(markets, question) {
  const openMarkets = markets.filter(market => !market?.closed)
  const ranked = openMarkets
    .map(market => ({
      market,
      score: similarityScore(question, market?.question || '')
    }))
    .sort((a, b) => b.score - a.score)

  if (!ranked.length) return null
  const best = ranked[0]
  if (best.score < 0.36) return null
  return best
}

async function resolveMarket(question) {
  const attempts = questionFallbacks(question)

  for (const attempt of attempts) {
    const payload = await fetchPublicSearch(attempt)
    const markets = flattenMarkets(payload)
    const best = bestMarketForQuestion(markets, question)
    if (best) {
      return {
        market_id: String(best.market.id),
        market_slug: best.market.slug || null,
        market_question: best.market.question || null,
        score: Number(best.score.toFixed(3)),
        active: Boolean(best.market.active),
        closed: Boolean(best.market.closed)
      }
    }
  }

  return null
}

async function main() {
  const html = await readFile(HTML_PATH, 'utf8')
  const questions = extractQuestions(html)

  const entries = []
  const unmapped = []

  for (const question of questions) {
    try {
      const resolved = await resolveMarket(question)
      if (!resolved) {
        unmapped.push(question)
      } else {
        entries.push({ question, ...resolved })
      }
    } catch {
      unmapped.push(question)
    }
    await new Promise(resolve => setTimeout(resolve, 45))
  }

  const output = {
    updated_at_utc: new Date().toISOString(),
    total_questions: questions.length,
    mapped_questions: entries.length,
    unmapped_questions: unmapped.length,
    entries,
    unmapped
  }

  await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`)
  console.log(`Mapped ${entries.length}/${questions.length} questions`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
