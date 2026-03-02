import { writeFile } from 'node:fs/promises'

const OUTPUT = new URL('../docs/public/polymarket-us-politics/data/conflict-news.json', import.meta.url)
const USER_AGENT = 'appsh3p-conflict-news-bot/1.0'

const SOURCES = {
  iran_2026: [
    {
      source: 'Google News',
      url: 'https://news.google.com/rss/search?q=Iran+Israel+conflict+when:1d&hl=en-US&gl=US&ceid=US:en'
    },
    {
      source: 'Google News',
      url: 'https://news.google.com/rss/search?q=Iran+US+strike+when:1d&hl=en-US&gl=US&ceid=US:en'
    },
    {
      source: 'Bing News',
      url: 'https://www.bing.com/news/search?q=Iran+Israel+conflict&format=RSS'
    }
  ],
  ukraine_2026: [
    {
      source: 'Google News',
      url: 'https://news.google.com/rss/search?q=Ukraine+war+when:1d&hl=en-US&gl=US&ceid=US:en'
    },
    {
      source: 'Google News',
      url: 'https://news.google.com/rss/search?q=Russia+Ukraine+frontline+when:1d&hl=en-US&gl=US&ceid=US:en'
    }
  ]
}

const CONFLICT_KEYWORDS = {
  iran_2026: ['iran', 'israel', 'tehran', 'khamenei', 'us strike', 'middle east'],
  ukraine_2026: ['ukraine', 'russia', 'kyiv', 'donetsk', 'zaporizhzhia', 'black sea']
}

function decodeEntities(text) {
  return String(text || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .trim()
}

function pickTag(block, tag) {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return m ? decodeEntities(m[1]) : ''
}

function parseRss(xml, fallbackSource) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
  return items.map(match => {
    const block = match[1]
    const title = pickTag(block, 'title')
    const url = pickTag(block, 'link')
    const pub = pickTag(block, 'pubDate')
    const source = pickTag(block, 'source') || fallbackSource
    const published = Date.parse(pub)
    return {
      title,
      url,
      source,
      published_at_utc: Number.isFinite(published) ? new Date(published).toISOString() : null
    }
  }).filter(item => item.title && item.url)
}

function dedupeAndSort(items) {
  const seen = new Set()
  const clean = []
  for (const item of items) {
    const key = `${item.title}::${item.url}`
    if (seen.has(key)) continue
    seen.add(key)
    clean.push(item)
  }
  return clean.sort((a, b) => (Date.parse(b.published_at_utc || '') || 0) - (Date.parse(a.published_at_utc || '') || 0))
}

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function matchesConflict(item, conflictId) {
  const haystack = normalize(`${item.title} ${item.source}`)
  const keywords = CONFLICT_KEYWORDS[conflictId] || []
  return keywords.some(k => haystack.includes(normalize(k)))
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { 'user-agent': USER_AGENT } })
  if (!response.ok) throw new Error(`Feed fetch failed (${response.status}) for ${url}`)
  return response.text()
}

async function buildConflictNews(conflictId, entries) {
  const all = []
  for (const entry of entries) {
    try {
      const xml = await fetchText(entry.url)
      all.push(...parseRss(xml, entry.source))
    } catch (error) {
      console.error(`[${conflictId}] ${error.message}`)
    }
  }
  const filtered = all.filter(item => matchesConflict(item, conflictId))
  return dedupeAndSort(filtered).slice(0, 20)
}

async function main() {
  const conflicts = {}

  for (const [conflictId, feeds] of Object.entries(SOURCES)) {
    conflicts[conflictId] = await buildConflictNews(conflictId, feeds)
  }

  const output = {
    updated_at_utc: new Date().toISOString(),
    conflicts
  }

  await writeFile(OUTPUT, `${JSON.stringify(output, null, 2)}\n`)
  console.log(`Updated: ${OUTPUT.pathname}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
