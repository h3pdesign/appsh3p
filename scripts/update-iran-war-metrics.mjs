import { readFile, writeFile } from 'node:fs/promises'

const OUTPUT_PATH = new URL('../docs/public/polymarket-us-politics/data/iran-war-metrics.json', import.meta.url)

const CONFLICT_URL = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content|timestamp&rvslots=main&formatversion=2&format=json&titles=2026_Iran_conflict'
const WAR_BENCHMARK_URL = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content|timestamp&rvslots=main&formatversion=2&format=json&titles=Twelve-Day_War'

function parseIntSafe(value) {
  if (value == null) return null
  const n = Number.parseInt(String(value).replace(/,/g, ''), 10)
  return Number.isFinite(n) ? n : null
}

function pull(pattern, text) {
  const match = text.match(pattern)
  return match?.[1] ?? null
}

function pullNumber(pattern, text) {
  return parseIntSafe(pull(pattern, text))
}

function getPagePayload(json) {
  const page = json?.query?.pages?.[0]
  const revision = page?.revisions?.[0]
  return {
    content: revision?.slots?.main?.content || '',
    timestamp: revision?.timestamp || null
  }
}

async function fetchWikiContent(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'appsh3p-metrics-bot/1.0'
    }
  })
  if (!response.ok) throw new Error(`Failed to fetch wiki source: ${response.status}`)
  return getPagePayload(await response.json())
}

async function loadExisting() {
  try {
    return JSON.parse(await readFile(OUTPUT_PATH, 'utf8'))
  } catch {
    return {}
  }
}

function chooseValue(parsed, existing, key) {
  return Number.isFinite(parsed) ? parsed : (existing[key] ?? null)
}

function extractChunk(line, startLabel) {
  const start = line.indexOf(startLabel)
  if (start < 0) return ''
  return line.slice(start)
}

async function main() {
  const [conflict, benchmark, existing] = await Promise.all([
    fetchWikiContent(CONFLICT_URL),
    fetchWikiContent(WAR_BENCHMARK_URL),
    loadExisting()
  ])

  const casualties1 = pull(/\|\s*casualties1\s*=([^\n]+)/i, conflict.content) || ''
  const casualties2 = pull(/\|\s*casualties2\s*=([^\n]+)/i, conflict.content) || ''

  const usChunk = extractChunk(casualties1, '{{flagdeco|USA}}')
  const israelChunk = extractChunk(casualties1, '{{flagdeco|Israel}}')

  const metrics = {
    as_of_utc: conflict.timestamp || existing.as_of_utc || new Date().toISOString(),
    updated_at_utc: new Date().toISOString(),
    source_name: 'Wikipedia: 2026 Iran conflict + Twelve-Day War',
    source_url: 'https://en.wikipedia.org/wiki/2026_Iran_conflict',
    iran_reported_killed: chooseValue(pullNumber(/([0-9,]+)\s+people killed\s*\(including/i, casualties2), existing, 'iran_reported_killed'),
    iran_reported_injured: chooseValue(pullNumber(/<br\s*\/?>([0-9,]+)\s+injured/i, casualties2), existing, 'iran_reported_injured'),
    israel_reported_killed: chooseValue(pullNumber(/\{\{flagdeco\|Israel\}\}\s*([0-9,]+)\s+people killed/i, israelChunk), existing, 'israel_reported_killed'),
    israel_reported_injured: chooseValue(pullNumber(/([0-9,]+)\s+injured/i, israelChunk), existing, 'israel_reported_injured'),
    us_soldiers_killed: chooseValue(pullNumber(/\{\{flagdeco\|USA\}\}\s*([0-9,]+)\s+service members killed/i, usChunk), existing, 'us_soldiers_killed'),
    us_soldiers_seriously_injured: chooseValue(pullNumber(/service members killed,\s*([0-9,]+)\s+seriously injured/i, usChunk), existing, 'us_soldiers_seriously_injured'),
    war_2025_ballistic_missiles: chooseValue(pullNumber(/of\s+([0-9,]+)\s+ballistic missiles fired by Iran/i, benchmark.content), existing, 'war_2025_ballistic_missiles'),
    war_2025_drones: chooseValue(pullNumber(/([0-9,]+)\s+drones destroyed before being launched/i, benchmark.content), existing, 'war_2025_drones')
  }

  await writeFile(OUTPUT_PATH, `${JSON.stringify(metrics, null, 2)}\n`)
  console.log('Updated:', OUTPUT_PATH.pathname)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
