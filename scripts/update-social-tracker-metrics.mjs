import { writeFile } from 'node:fs/promises'

const OUTPUT_PATH = new URL('../docs/public/polymarket-us-politics/data/social-tracker-metrics.json', import.meta.url)

const WIKIMEDIA_API = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user'
const MAX_WIKIMEDIA_FALLBACK_DAYS = 3

function toDayUTC(date) {
  const y = date.getUTCFullYear()
  const m = String(date.getUTCMonth() + 1).padStart(2, '0')
  const d = String(date.getUTCDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

function addDaysUTC(date, amount) {
  const next = new Date(date.getTime())
  next.setUTCDate(next.getUTCDate() + amount)
  return next
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

async function fetchPageviews(article, start, end) {
  const url = `${WIKIMEDIA_API}/${encodeURIComponent(article)}/daily/${start}/${end}`
  const response = await fetch(url, {
    headers: { 'user-agent': 'appsh3p-social-tracker/1.0 (+https://apps-h3p.com)' }
  })
  if (!response.ok) {
    const error = new Error(`Wikimedia API ${response.status} for ${article}`)
    error.status = response.status
    throw error
  }
  const payload = await response.json()
  const items = Array.isArray(payload?.items) ? payload.items : []
  return items.reduce((sum, item) => sum + (Number(item?.views) || 0), 0)
}

async function fetchLatestAvailablePageviews(article, endDate, windowDays) {
  let lastError = null

  for (let offset = 0; offset <= MAX_WIKIMEDIA_FALLBACK_DAYS; offset += 1) {
    const candidateEndDate = addDaysUTC(endDate, -offset)
    const candidateStartDate = addDaysUTC(candidateEndDate, -(windowDays - 1))
    const start = toDayUTC(candidateStartDate)
    const end = toDayUTC(candidateEndDate)

    try {
      const views = await fetchPageviews(article, start, end)
      return {
        views,
        start,
        end,
        is_fallback: offset > 0,
        fallback_days: offset
      }
    } catch (error) {
      lastError = error
      if (error?.status !== 404) throw error
    }
  }

  throw lastError || new Error(`No Wikimedia pageview data available for ${article}`)
}

async function main() {
  const now = new Date()
  const yesterday = addDaysUTC(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())), -1)

  const [elon3, elon7, trump7] = await Promise.all([
    fetchLatestAvailablePageviews('Elon_Musk', yesterday, 3),
    fetchLatestAvailablePageviews('Elon_Musk', yesterday, 7),
    fetchLatestAvailablePageviews('Donald_Trump', yesterday, 7)
  ])
  const asOfUtc = new Date().toISOString()

  const output = {
    updated_at_utc: asOfUtc,
    source_name: 'Wikimedia Pageviews API',
    source_url: 'https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews',
    metrics: [
      {
        id: 'elon_attention_3d',
        label: 'Elon Musk Attention (3D)',
        value: clamp(Math.round(elon3.views), 0, Number.MAX_SAFE_INTEGER),
        unit: 'views',
        window_days: 3,
        scope: 'Latest available 3-day aggregate Wikimedia pageviews for Elon Musk',
        source_name: 'Wikimedia Pageviews API',
        source_url: 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/Elon_Musk/daily',
        source_window_start: elon3.start,
        source_window_end: elon3.end,
        fallback_days: elon3.fallback_days,
        is_fallback: elon3.is_fallback,
        as_of_utc: asOfUtc
      },
      {
        id: 'elon_attention_7d',
        label: 'Elon Musk Attention (7D)',
        value: clamp(Math.round(elon7.views), 0, Number.MAX_SAFE_INTEGER),
        unit: 'views',
        window_days: 7,
        scope: 'Latest available 7-day aggregate Wikimedia pageviews for Elon Musk',
        source_name: 'Wikimedia Pageviews API',
        source_url: 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/Elon_Musk/daily',
        source_window_start: elon7.start,
        source_window_end: elon7.end,
        fallback_days: elon7.fallback_days,
        is_fallback: elon7.is_fallback,
        as_of_utc: asOfUtc
      },
      {
        id: 'trump_attention_7d',
        label: 'Donald Trump Attention (7D)',
        value: clamp(Math.round(trump7.views), 0, Number.MAX_SAFE_INTEGER),
        unit: 'views',
        window_days: 7,
        scope: 'Latest available 7-day aggregate Wikimedia pageviews for Donald Trump',
        source_name: 'Wikimedia Pageviews API',
        source_url: 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/Donald_Trump/daily',
        source_window_start: trump7.start,
        source_window_end: trump7.end,
        fallback_days: trump7.fallback_days,
        is_fallback: trump7.is_fallback,
        as_of_utc: asOfUtc
      }
    ]
  }

  await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`)
  console.log('Updated social tracker metrics JSON')
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
