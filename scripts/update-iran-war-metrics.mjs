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

function chooseValue(parsed, fallback) {
  return Number.isFinite(parsed) ? parsed : (Number.isFinite(fallback) ? fallback : null)
}

function extractChunk(line, startLabel) {
  const start = line.indexOf(startLabel)
  if (start < 0) return ''
  return line.slice(start)
}

function fallbackMetric(existing, id) {
  const conflict = (existing.conflicts || []).find(c => c.id === 'iran_2026')
  const metric = (conflict?.metrics || []).find(item => item.id === id)
  return Number.isFinite(metric?.value) ? metric.value : null
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

  const values = {
    iranKilled: chooseValue(pullNumber(/([0-9,]+)\s+people killed\s*\(including/i, casualties2), fallbackMetric(existing, 'iran_killed')),
    iranInjured: chooseValue(pullNumber(/<br\s*\/?>([0-9,]+)\s+injured/i, casualties2), fallbackMetric(existing, 'iran_injured')),
    israelKilled: chooseValue(pullNumber(/\{\{flagdeco\|Israel\}\}\s*([0-9,]+)\s+people killed/i, israelChunk), fallbackMetric(existing, 'israel_killed')),
    israelInjured: chooseValue(pullNumber(/([0-9,]+)\s+injured/i, israelChunk), fallbackMetric(existing, 'israel_injured')),
    usKilled: chooseValue(pullNumber(/\{\{flagdeco\|USA\}\}\s*([0-9,]+)\s+service members killed/i, usChunk), fallbackMetric(existing, 'us_killed')),
    usSeriouslyInjured: chooseValue(pullNumber(/service members killed,\s*([0-9,]+)\s+seriously injured/i, usChunk), fallbackMetric(existing, 'us_seriously_injured')),
    missilesBenchmark: chooseValue(pullNumber(/of\s+([0-9,]+)\s+ballistic missiles fired by Iran/i, benchmark.content), fallbackMetric(existing, 'missiles_benchmark')),
    dronesBenchmark: chooseValue(pullNumber(/([0-9,]+)\s+drones destroyed before being launched/i, benchmark.content), fallbackMetric(existing, 'drones_benchmark'))
  }

  const conflictEntry = {
    id: 'iran_2026',
    title: 'Iran Conflict Monitor',
    subtitle: 'Live casualties and projectile/operation indicators. Map and metrics refresh every 6 hours.',
    as_of_utc: conflict.timestamp || existing.as_of_utc || new Date().toISOString(),
    updated_at_utc: new Date().toISOString(),
    source_name: 'Wikipedia: 2026 Iran conflict + Twelve-Day War',
    source_url: 'https://en.wikipedia.org/wiki/2026_Iran_conflict',
    map: {
      center: [31.2, 49.5],
      zoom: 4
    },
    legend: [
      { type: 'casualties', label: 'Casualty concentration', color: '#ef4444' },
      { type: 'projectiles', label: 'Missile/drone indicator', color: '#f59e0b' },
      { type: 'operations', label: 'Operational impact', color: '#22c55e' }
    ],
    metrics: [
      { id: 'iran_killed', label: 'Iran Reported Killed', value: values.iranKilled },
      { id: 'iran_injured', label: 'Iran Reported Injured', value: values.iranInjured },
      { id: 'israel_killed', label: 'Israel Reported Killed', value: values.israelKilled },
      { id: 'israel_injured', label: 'Israel Reported Injured', value: values.israelInjured },
      { id: 'us_killed', label: 'US Soldiers Killed', value: values.usKilled },
      { id: 'us_seriously_injured', label: 'US Soldiers Seriously Injured', value: values.usSeriouslyInjured },
      { id: 'missiles_benchmark', label: 'Ballistic Missiles (2025 Benchmark)', value: values.missilesBenchmark },
      { id: 'drones_benchmark', label: 'Drones (2025 Benchmark)', value: values.dronesBenchmark }
    ],
    map_points: [
      {
        name: 'Iran (national)',
        label: 'Reported killed',
        value: values.iranKilled,
        lat: 32.4279,
        lng: 53.688,
        type: 'casualties',
        description: 'Country-level reported deaths'
      },
      {
        name: 'Israel (national)',
        label: 'Reported injured',
        value: values.israelInjured,
        lat: 31.0461,
        lng: 34.8516,
        type: 'casualties',
        description: 'Country-level reported injuries'
      },
      {
        name: 'US force footprint (Kuwait)',
        label: 'US military casualties',
        value: Number.isFinite(values.usKilled) && Number.isFinite(values.usSeriouslyInjured)
          ? values.usKilled + values.usSeriouslyInjured
          : values.usKilled,
        lat: 29.3117,
        lng: 47.4818,
        type: 'operations',
        description: 'Killed + seriously injured'
      },
      {
        name: 'Iran launch profile',
        label: 'Ballistic missiles benchmark',
        value: values.missilesBenchmark,
        lat: 34.8,
        lng: 54.0,
        type: 'projectiles',
        description: '2025 conflict benchmark'
      },
      {
        name: 'Regional drone activity',
        label: 'Drones benchmark',
        value: values.dronesBenchmark,
        lat: 33.5,
        lng: 44.0,
        type: 'projectiles',
        description: '2025 conflict benchmark'
      }
    ]
  }

  const output = {
    active_conflict_id: 'iran_2026',
    updated_at_utc: new Date().toISOString(),
    conflicts: [conflictEntry]
  }

  await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`)
  console.log('Updated:', OUTPUT_PATH.pathname)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
