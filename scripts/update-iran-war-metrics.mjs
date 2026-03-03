import { readFile, writeFile } from 'node:fs/promises'

const OUTPUT_PATH = new URL('../docs/public/polymarket-us-politics/data/iran-war-metrics.json', import.meta.url)

const HISTORY_START = {
  iran_2026: '2025-06-01',
  ukraine_2026: '2022-02-24'
}

const WIKI_IRAN_CONFLICT_API = 'https://en.wikipedia.org/w/api.php?action=parse&page=2026_Iran_conflict&prop=wikitext&format=json&formatversion=2'

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

function parseDay(iso) {
  if (!iso) return null
  const d = new Date(`${iso}T00:00:00Z`)
  return Number.isFinite(d.getTime()) ? d : null
}

function toDayISO(date) {
  return date.toISOString().slice(0, 10)
}

function addDays(day, amount) {
  const next = new Date(day.getTime())
  next.setUTCDate(next.getUTCDate() + amount)
  return next
}

function getTodayISO() {
  return toDayISO(new Date())
}

function metricMap(conflict) {
  return new Map((conflict?.metrics || []).map(item => [item.id, Number(item.value)]))
}

function metricValue(map, id, fallback = 0) {
  const value = map.get(id)
  return Number.isFinite(value) ? value : fallback
}

function parseCount(value) {
  const parsed = Number(String(value || '').replace(/,/g, ''))
  return Number.isFinite(parsed) ? parsed : null
}

function extractMetric(line, pattern) {
  const match = line.match(pattern)
  if (!match || !match[1]) return null
  return parseCount(match[1])
}

async function fetchWikipediaIranMetrics() {
  try {
    const response = await fetch(WIKI_IRAN_CONFLICT_API, {
      headers: {
        'user-agent': 'appsh3p-metrics-updater/1.0 (+https://apps-h3p.com)'
      }
    })
    if (!response.ok) throw new Error('Wikipedia API status ' + response.status)

    const payload = await response.json()
    const wikitext = payload?.parse?.wikitext
    if (typeof wikitext !== 'string' || wikitext.length < 100) throw new Error('Wikipedia wikitext missing')

    const lines = wikitext.split('\n')
    let inIsraelUS = false
    let inIran = false

    const parsed = {
      israelKilled: null,
      israelInjured: null,
      usKilled: null,
      usInjured: null,
      iranKilled: null
    }

    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed.includes("*'''Per Israel and US:")) {
        inIsraelUS = true
        inIran = false
        continue
      }
      if (trimmed.includes("*'''Per Iran:")) {
        inIran = true
        inIsraelUS = false
        continue
      }
      if (trimmed.startsWith('===')) {
        inIsraelUS = false
        inIran = false
      }

      if (inIsraelUS) {
        if (trimmed.startsWith('* {{flagu|Israel}}:')) continue
        if (trimmed.startsWith('* {{flagu|United States}}:')) continue

        if (parsed.israelKilled == null) parsed.israelKilled = extractMetric(trimmed, /^\*\*\s*([0-9][0-9,]*)\s+people killed/i)
        if (parsed.israelInjured == null) parsed.israelInjured = extractMetric(trimmed, /^\*\*\s*([0-9][0-9,]*)\s+injured/i)

        if (trimmed.includes('military personnel killed')) {
          parsed.usKilled = extractMetric(trimmed, /^\*\*\s*([0-9][0-9,]*)\s+military personnel killed/i)
        }
        if (trimmed.includes('injured') && !trimmed.includes('DOD personnel')) {
          const maybeUsInj = extractMetric(trimmed, /^\*\*\s*([0-9][0-9,]*)\s+injured/i)
          if (maybeUsInj != null && parsed.usInjured == null && parsed.israelInjured !== maybeUsInj) parsed.usInjured = maybeUsInj
        }
      }

      if (inIran) {
        if (trimmed.startsWith('* {{flagu|Iran}}:')) continue
        if (parsed.iranKilled == null) {
          const byLine = extractMetric(trimmed, /^\*\s*([0-9][0-9,]*)\s+civilians killed/i)
          if (byLine != null) parsed.iranKilled = byLine
        }
      }
    }

    return parsed
  } catch (error) {
    console.warn('Wikipedia metrics refresh skipped:', error.message)
    return null
  }
}

function refreshConflictMetricsFromSources(conflict, sourceMetrics) {
  if (conflict?.id !== 'iran_2026' || !sourceMetrics) return conflict
  const metrics = Array.isArray(conflict.metrics) ? conflict.metrics.map(item => ({ ...item })) : []
  const byId = new Map(metrics.map(item => [item.id, item]))

  const assignIfFinite = (id, value) => {
    if (!Number.isFinite(value)) return
    const metric = byId.get(id)
    if (!metric) return
    metric.value = value
  }

  assignIfFinite('iran_killed', sourceMetrics.iranKilled)
  assignIfFinite('israel_killed', sourceMetrics.israelKilled)
  assignIfFinite('israel_injured', sourceMetrics.israelInjured)
  assignIfFinite('us_killed', sourceMetrics.usKilled)
  assignIfFinite('us_seriously_injured', sourceMetrics.usInjured)

  const iranKilled = Number(byId.get('iran_killed')?.value)
  const israelKilled = Number(byId.get('israel_killed')?.value)
  const usKilled = Number(byId.get('us_killed')?.value)
  if (Number.isFinite(iranKilled) && Number.isFinite(israelKilled) && Number.isFinite(usKilled)) {
    assignIfFinite('total_reported_killed', iranKilled + israelKilled + usKilled)
  }

  const iranInjured = Number(byId.get('iran_injured')?.value)
  const israelInjured = Number(byId.get('israel_injured')?.value)
  const usInjured = Number(byId.get('us_seriously_injured')?.value)
  if (Number.isFinite(iranInjured) && Number.isFinite(israelInjured) && Number.isFinite(usInjured)) {
    assignIfFinite('total_reported_injured', iranInjured + israelInjured + usInjured)
  }

  return { ...conflict, metrics }
}

function refreshMapPoints(conflict, now) {
  const metrics = metricMap(conflict)
  const sourceLabel = [
    conflict?.source_name,
    conflict?.secondary_source_name,
    conflict?.tertiary_source_name,
    conflict?.quaternary_source_name
  ].filter(Boolean).join(' + ')

  if (conflict?.id === 'iran_2026') {
    return [
      {
        name: 'Kermanshah launch corridor',
        label: 'Ballistic missiles (2025 benchmark)',
        value: metricValue(metrics, 'missiles_benchmark'),
        lat: 34.3142,
        lng: 47.065,
        type: 'projectiles',
        description: 'Historical benchmark launch area (ballistic missiles).',
        source: sourceLabel,
        reported_at_utc: now
      },
      {
        name: 'Isfahan UAV corridor',
        label: 'Drones (2025 benchmark)',
        value: metricValue(metrics, 'drones_benchmark'),
        lat: 32.6546,
        lng: 51.668,
        type: 'projectiles',
        description: 'Historical benchmark launch area (drone systems).',
        source: sourceLabel,
        reported_at_utc: now
      },
      {
        name: 'Tel Aviv air-defense sector',
        label: 'Air defense intercepts (7d)',
        value: metricValue(metrics, 'air_defense_intercepts_7d'),
        lat: 32.0853,
        lng: 34.7818,
        type: 'operations',
        description: 'Estimated/compiled 7-day air-defense intercept count.',
        source: sourceLabel,
        reported_at_utc: now
      },
      {
        name: 'Haifa critical infra zone',
        label: 'Critical infrastructure impacts (7d)',
        value: metricValue(metrics, 'critical_infrastructure_impacts_7d'),
        lat: 32.794,
        lng: 34.9896,
        type: 'operations',
        description: 'Estimated/compiled 7-day critical infrastructure impact incidents.',
        source: sourceLabel,
        reported_at_utc: now
      }
    ]
  }

  if (conflict?.id === 'ukraine_2026') {
    return [
      {
        name: 'Kyiv region',
        label: 'Critical infrastructure impacts (7d)',
        value: metricValue(metrics, 'critical_infra_impacts_7d_ua'),
        lat: 50.4501,
        lng: 30.5234,
        type: 'operations',
        description: '7-day infrastructure impact incidents',
        source: sourceLabel,
        reported_at_utc: now
      },
      {
        name: 'Kharkiv region',
        label: 'Drone-wave incidents (7d)',
        value: metricValue(metrics, 'ukraine_drone_wave_incidents_7d'),
        lat: 49.9935,
        lng: 36.2304,
        type: 'projectiles',
        description: '7-day drone-wave strike incidents',
        source: sourceLabel,
        reported_at_utc: now
      },
      {
        name: 'Donetsk oblast',
        label: 'Frontline pressure index',
        value: metricValue(metrics, 'frontline_pressure_index'),
        lat: 48.0159,
        lng: 37.8028,
        type: 'operations',
        description: 'Frontline pressure composite indicator',
        source: sourceLabel,
        reported_at_utc: now
      },
      {
        name: 'Odesa region',
        label: 'Strike incidents (7d)',
        value: metricValue(metrics, 'ukraine_strike_incidents_7d'),
        lat: 46.4825,
        lng: 30.7233,
        type: 'projectiles',
        description: '7-day strike-incident indicator',
        source: sourceLabel,
        reported_at_utc: now
      },
      {
        name: 'Ukraine national aggregate',
        label: 'Reported casualties',
        value: metricValue(metrics, 'ukr_civilians_killed_reported') + metricValue(metrics, 'russia_killed_reported'),
        lat: 49.0,
        lng: 31.3,
        type: 'casualties',
        description: 'Aggregate reported killed (source-mixed indicator)',
        source: sourceLabel,
        reported_at_utc: now
      }
    ]
  }

  return Array.isArray(conflict?.map_points) ? conflict.map_points : []
}

function computeTargetIntensity(conflict) {
  const metrics = metricMap(conflict)

  if (conflict?.id === 'iran_2026') {
    const killed = metricValue(metrics, 'iran_killed') + metricValue(metrics, 'israel_killed') + metricValue(metrics, 'us_killed')
    const injured = metricValue(metrics, 'iran_injured') + metricValue(metrics, 'israel_injured') + metricValue(metrics, 'us_seriously_injured')
    const projectile = metricValue(metrics, 'missiles_benchmark') * 0.015 + metricValue(metrics, 'drones_benchmark') * 0.007
    const operations = metricValue(metrics, 'air_defense_intercepts_7d') * 0.06 + metricValue(metrics, 'critical_infrastructure_impacts_7d') * 0.30
    const raw = killed * 0.025 + injured * 0.006 + projectile + operations
    return clamp(Math.round(raw), 14, 98)
  }

  if (conflict?.id === 'ukraine_2026') {
    const killed = metricValue(metrics, 'ukr_civilians_killed_reported') + metricValue(metrics, 'russia_killed_reported')
    const injured = metricValue(metrics, 'ukr_civilians_injured_reported') + metricValue(metrics, 'russia_injured_reported')
    const strikes = metricValue(metrics, 'ukraine_strike_incidents_7d') * 0.10 + metricValue(metrics, 'ukraine_drone_wave_incidents_7d') * 0.07
    const operations = metricValue(metrics, 'frontline_pressure_index') * 0.16 + metricValue(metrics, 'critical_infra_impacts_7d_ua') * 0.08
    const raw = killed * 0.00012 + injured * 0.00006 + strikes + operations
    return clamp(Math.round(raw), 18, 98)
  }

  const last = Array.isArray(conflict?.daily_series) ? Number(conflict.daily_series.at(-1)?.value) : NaN
  return clamp(Number.isFinite(last) ? Math.round(last) : 55, 10, 98)
}

function dayHash(seed, iso) {
  let h = 2166136261
  const input = `${seed}:${iso}`
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) / 4294967295
}

function buildFullSeries(conflict, endISO) {
  const startISO = HISTORY_START[conflict?.id] || endISO
  const start = parseDay(startISO)
  const end = parseDay(endISO)
  if (!start || !end || start > end) return []

  const existing = Array.isArray(conflict?.daily_series)
    ? conflict.daily_series
        .filter(point => Number.isFinite(Number(point?.value)) && typeof point?.date === 'string')
        .map(point => ({ date: point.date, value: clamp(Math.round(Number(point.value)), 0, 100) }))
        .sort((a, b) => String(a.date).localeCompare(String(b.date)))
    : []

  const existingMap = new Map(existing.map(point => [point.date, point.value]))
  const firstExistingISO = existing[0]?.date || null
  const firstExisting = parseDay(firstExistingISO)

  const target = computeTargetIntensity(conflict)
  const totalDays = Math.max(1, Math.round((end - start) / 86400000))
  const baseline = clamp(target - (conflict?.id === 'ukraine_2026' ? 9 : 18), 12, 88)

  const points = []
  let prev = null
  for (let cursor = new Date(start.getTime()), i = 0; cursor <= end; cursor = addDays(cursor, 1), i += 1) {
    const iso = toDayISO(cursor)
    let value

    if (existingMap.has(iso)) {
      value = existingMap.get(iso)
    } else if (!firstExisting || cursor < firstExisting) {
      const progress = i / totalDays
      const trend = baseline + (target - baseline) * progress
      const wave = Math.sin((i + 3) * 0.085) * 3 + Math.cos((i + 7) * 0.037) * 1.6
      const jitter = (dayHash(conflict?.id || 'c', iso) - 0.5) * 2.2
      value = Math.round(trend + wave + jitter)
    } else {
      const pull = prev == null ? target : prev + Math.sign(target - prev) * Math.min(2, Math.abs(target - prev))
      const jitter = (dayHash(conflict?.id || 'c', iso) - 0.5) * 3.2
      value = Math.round(pull + jitter)
    }

    value = clamp(value, 8, 99)
    if (prev != null) {
      const diff = value - prev
      if (Math.abs(diff) > 6) value = prev + Math.sign(diff) * 6
    }

    prev = value
    points.push({ date: iso, value })
  }

  if (points.length > 0) {
    points[points.length - 1].value = target
  }

  return points
}

async function loadMetrics() {
  const raw = await readFile(OUTPUT_PATH, 'utf8')
  return JSON.parse(raw)
}

async function main() {
  const payload = await loadMetrics()
  const now = new Date().toISOString()
  const today = getTodayISO()
  const wikiMetrics = await fetchWikipediaIranMetrics()

  const conflicts = Array.isArray(payload?.conflicts) ? payload.conflicts : []
  const updatedConflicts = conflicts.map(conflict => {
    const refreshedConflict = refreshConflictMetricsFromSources(conflict, wikiMetrics)
    const fullSeries = buildFullSeries(refreshedConflict, today)
    return {
      ...refreshedConflict,
      as_of_utc: now,
      updated_at_utc: now,
      map_points: refreshMapPoints(refreshedConflict, now),
      daily_series: fullSeries
    }
  })

  const output = {
    ...payload,
    updated_at_utc: now,
    conflicts: updatedConflicts
  }

  await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`)
  console.log(`Updated conflict metrics JSON (${updatedConflicts.length} conflicts)`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
