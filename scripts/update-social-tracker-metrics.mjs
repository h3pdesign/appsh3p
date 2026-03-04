import { writeFile } from 'node:fs/promises'

const OUTPUT_PATH = new URL('../docs/public/polymarket-us-politics/data/social-tracker-metrics.json', import.meta.url)

const WIKIMEDIA_API = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user'

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
  if (!response.ok) throw new Error(`Wikimedia API ${response.status} for ${article}`)
  const payload = await response.json()
  const items = Array.isArray(payload?.items) ? payload.items : []
  return items.reduce((sum, item) => sum + (Number(item?.views) || 0), 0)
}

async function main() {
  const now = new Date()
  const yesterday = addDaysUTC(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())), -1)

  const end = toDayUTC(yesterday)
  const start3 = toDayUTC(addDaysUTC(yesterday, -2))
  const start7 = toDayUTC(addDaysUTC(yesterday, -6))

  const [elon3, elon7, trump7] = await Promise.all([
    fetchPageviews('Elon_Musk', start3, end),
    fetchPageviews('Elon_Musk', start7, end),
    fetchPageviews('Donald_Trump', start7, end)
  ])

  const output = {
    updated_at_utc: new Date().toISOString(),
    source_name: 'Wikimedia Pageviews API',
    source_url: 'https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews',
    metrics: [
      {
        id: 'elon_attention_3d',
        label: 'Elon Musk Attention (3D)',
        value: clamp(Math.round(elon3), 0, Number.MAX_SAFE_INTEGER),
        unit: 'views',
        window_days: 3,
        scope: '3-day aggregate Wikimedia pageviews for Elon Musk',
        source_name: 'Wikimedia Pageviews API',
        source_url: 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/Elon_Musk/daily',
        as_of_utc: new Date().toISOString()
      },
      {
        id: 'elon_attention_7d',
        label: 'Elon Musk Attention (7D)',
        value: clamp(Math.round(elon7), 0, Number.MAX_SAFE_INTEGER),
        unit: 'views',
        window_days: 7,
        scope: '7-day aggregate Wikimedia pageviews for Elon Musk',
        source_name: 'Wikimedia Pageviews API',
        source_url: 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/Elon_Musk/daily',
        as_of_utc: new Date().toISOString()
      },
      {
        id: 'trump_attention_7d',
        label: 'Donald Trump Attention (7D)',
        value: clamp(Math.round(trump7), 0, Number.MAX_SAFE_INTEGER),
        unit: 'views',
        window_days: 7,
        scope: '7-day aggregate Wikimedia pageviews for Donald Trump',
        source_name: 'Wikimedia Pageviews API',
        source_url: 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/Donald_Trump/daily',
        as_of_utc: new Date().toISOString()
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
