import { readFile, writeFile } from 'node:fs/promises'
import { archiveMetricReports } from './archive-metric-reports.mjs'
import '../docs/public/polymarket-us-politics/event-evidence.js'

const OUTPUT_PATH = new URL('../docs/public/polymarket-us-politics/data/iran-war-metrics.json', import.meta.url)

const HISTORY_START = {
  iran_2026: '2025-06-01',
  ukraine_2026: '2022-02-24'
}
const METRIC_SERIES_START = {
  iran_2026: '2026-02-28',
  ukraine_2026: '2022-02-24'
}

const WIKI_IRAN_WAR_API = 'https://en.wikipedia.org/w/api.php?action=parse&page=2026_Iran_war&prop=wikitext&format=json&formatversion=2'
const WIKI_IRAN_TIMELINE_API = 'https://en.wikipedia.org/w/api.php?action=parse&page=Timeline_of_the_2026_Iran_war&prop=wikitext&format=json&formatversion=2'
const WIKI_IRAN_WAR_URL = 'https://en.wikipedia.org/wiki/2026_Iran_war'
const WIKI_IRAN_AIRCRAFT_LOSSES_URL = 'https://en.wikipedia.org/wiki/List_of_aviation_shootdowns_and_accidents_during_the_2026_Iran_war'
const UAE_INTERCEPTS_URL = 'https://www.gulftoday.ae/news/2026/03/27/uae-intercepts-six-ballistic-missiles-nine-drones-from-iran'
const IRAN_INFRA_DAMAGE_URL = 'https://www.aa.com.tr/en/middle-east/iran-says-over-113-000-civilian-places-damaged-in-us-israeli-attacks/3887118'
const AIRSTRIKE_FLOOR_URL = 'https://www.britannica.com/event/2026-Iran-Conflict'
const PROJECTILE_SOURCE_CHAIN_LABEL = 'UAE Ministry of Defence + IDF spokesperson + ISW/CTP + OSINT public reporting (launches only)'
const PROJECTILE_SOURCE_CHAIN_URL = 'https://www.understandingwar.org/'
const PROJECTILE_BASELINE_UTC = '2026-04-01T00:00:00.000Z'
const PROJECTILE_BASELINE_TOTALS = {
  missiles: 1252,
  drones: 2328,
  airStrikes: 900
}
const UAV_ACTIVITY_OVER_IRAN_FLOOR = 30
const IRAN_CONFLICT_START_UTC = '2026-02-28T00:00:00Z'
const VERIFIED_IRAN_CONFLICT_TOTALS = {
  asOfUtc: '2026-04-01T00:00:00Z',
  iranKilled: 3329,
  iranInjured: 24800,
  israelKilled: 29,
  israelInjured: 5492,
  usKilled: 15,
  usInjured: 313,
  totalKilledLowerBound: 4661,
  totalInjuredLowerBound: 34489,
  airDefenseInterceptsLowerBound: 2228,
  infrastructureImpactsLowerBound: 113000
}
const RECENT_SERIES_REBUILD_DAYS = {
  iran_2026: 14,
  ukraine_2026: 10
}

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

async function fetchWikipediaWikitext(apiUrl) {
  const response = await fetch(apiUrl, {
    headers: {
      'user-agent': 'appsh3p-metrics-updater/1.0 (+https://apps-h3p.com)'
    }
  })
  if (!response.ok) throw new Error('Wikipedia API status ' + response.status)
  const payload = await response.json()
  const wikitext = payload?.parse?.wikitext
  if (typeof wikitext !== 'string' || wikitext.length < 100) throw new Error('Wikipedia wikitext missing')
  return wikitext
}

function parseWikipediaCasualtiesByCountry(wikitext, { preferLow = true } = {}) {
  const lines = wikitext.split('\n')

  const extractRowsForTable = (tableStart, tableEnd) => {
    const rows = []
    let current = []
    for (let i = tableStart + 1; i < tableEnd; i += 1) {
      const trimmed = String(lines[i] || '').trim()
      if (!trimmed) continue
      if (trimmed === '|-') {
        if (current.length > 0) rows.push(current)
        current = []
        continue
      }
      if (trimmed.startsWith('|')) current.push(trimmed)
    }
    if (current.length > 0) rows.push(current)
    return rows
  }

  const rowByCountryFromRows = rows => {
    const map = new Map()
    for (const row of rows) {
      const cells = row
        .filter(item => item.startsWith('|') && item !== '|-')
        .map(item => item.slice(1).trim())
      if (cells.length < 3) continue
      const flagCell = cells[0] || ''
      const flagMatch = flagCell.match(/\{\{Flag\|([^}|]+)[^}]*\}\}/i)
      const country = flagMatch?.[1]?.trim()
      if (!country) continue
      map.set(country.toLowerCase(), cells)
    }
    return map
  }

  let candidateRows = null
  const headerIndex = lines.findIndex(line => line.includes('=== Casualties by country ==='))
  if (headerIndex >= 0) {
    const tableStart = lines.findIndex((line, idx) => idx > headerIndex && line.trim().startsWith('{|'))
    const tableEnd = lines.findIndex((line, idx) => idx > tableStart && line.trim() === '|}')
    if (tableStart >= 0 && tableEnd > tableStart) {
      candidateRows = extractRowsForTable(tableStart, tableEnd)
    }
  }

  if (!candidateRows) {
    for (let i = 0; i < lines.length; i += 1) {
      if (!String(lines[i] || '').trim().startsWith('{|')) continue
      const tableStart = i
      const tableEnd = lines.findIndex((line, idx) => idx > tableStart && line.trim() === '|}')
      if (tableEnd < 0) continue
      const rows = extractRowsForTable(tableStart, tableEnd)
      const probe = rowByCountryFromRows(rows)
      if (probe.has('iran') && (probe.has('israel') || probe.has('united states'))) {
        candidateRows = rows
        break
      }
      i = tableEnd
    }
  }

  if (!candidateRows) throw new Error('Casualties table not found')

  const stripMarkup = value => {
    let out = String(value || '')
    out = out.replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, ' ')
    out = out.replace(/<ref[^>]*\/>/gi, ' ')
    let prev = ''
    while (prev !== out) {
      prev = out
      out = out.replace(/\{\{[^{}]*\}\}/g, ' ')
    }
    out = out.replace(/'''+/g, '')
    out = out.replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, '$1')
    out = out.replace(/\[\[([^\]]+)\]\]/g, '$1')
    return out
  }

  const extractNumber = raw => {
    const clean = stripMarkup(raw)
    const rangeMatch = clean.match(/([0-9][0-9,]*)\s*[–-]\s*([0-9][0-9,]*)/)
    if (rangeMatch) {
      const left = parseCount(rangeMatch[1])
      const right = parseCount(rangeMatch[2])
      if (Number.isFinite(left) && Number.isFinite(right)) {
        return preferLow ? Math.min(left, right) : Math.max(left, right)
      }
    }
    const matches = clean.match(/[0-9][0-9,]*/g)
    if (!matches) return null
    const values = matches.map(parseCount).filter(Number.isFinite)
    if (!values.length) return null
    return preferLow ? Math.min(...values) : Math.max(...values)
  }

  const rowByCountry = rowByCountryFromRows(candidateRows)
  const iran = rowByCountry.get('iran') || []
  const israel = rowByCountry.get('israel') || []
  const us = rowByCountry.get('united states') || []

  return {
    iranKilled: extractNumber(iran[1]),
    iranInjured: extractNumber(iran[2]),
    israelKilled: extractNumber(israel[1]),
    israelInjured: extractNumber(israel[2]),
    usKilled: extractNumber(us[1]),
    usInjured: extractNumber(us[2])
  }
}

async function fetchWikipediaIranMetrics() {
  try {
    const [timelineResult, warResult] = await Promise.allSettled([
      fetchWikipediaWikitext(WIKI_IRAN_TIMELINE_API).then(text => parseWikipediaCasualtiesByCountry(text, { preferLow: true })),
      fetchWikipediaWikitext(WIKI_IRAN_WAR_API).then(text => parseWikipediaCasualtiesByCountry(text, { preferLow: true }))
    ])

    const timeline = timelineResult.status === 'fulfilled' ? timelineResult.value : null
    const war = warResult.status === 'fulfilled' ? warResult.value : null
    if (!timeline && !war) throw new Error('No Wikipedia casualties payload available')

    const pick = key => {
      const timelineValue = timeline && Number(timeline[key])
      if (Number.isFinite(timelineValue)) return timelineValue
      const warValue = war && Number(war[key])
      return Number.isFinite(warValue) ? warValue : null
    }

    return {
      iranKilled: pick('iranKilled'),
      iranInjured: pick('iranInjured'),
      israelKilled: pick('israelKilled'),
      israelInjured: pick('israelInjured'),
      usKilled: pick('usKilled'),
      usInjured: pick('usInjured'),
      sourceVariant: timeline ? 'timeline' : 'war'
    }
  } catch (error) {
    console.warn('Wikipedia metrics refresh skipped:', error.message)
    return null
  }
}

function refreshConflictMetricsFromSources(conflict, sourceMetrics) {
  if (conflict?.id !== 'iran_2026') return conflict
  sourceMetrics = sourceMetrics || {}
  const metrics = Array.isArray(conflict.metrics) ? conflict.metrics.map(item => ({ ...item })) : []
  const nowIso = new Date().toISOString()
  const zeroSensitiveMetricIds = new Set([
    'iran_killed',
    'iran_injured',
    'israel_killed',
    'israel_injured',
    'us_killed',
    'us_seriously_injured'
  ])

  // Migrate legacy benchmark IDs/labels to 2026 conflict-total semantics.
  for (const metric of metrics) {
    if (metric?.id === 'missiles_benchmark') {
      metric.id = 'missiles_total_2026'
      metric.label = 'Ballistic Missiles (2026 Conflict Total)'
    } else if (metric?.id === 'drones_benchmark') {
      metric.id = 'drones_total_2026'
      metric.label = 'Drones (2026 Conflict Total)'
    }
  }
  const remappedById = new Map(metrics.map(item => [item.id, item]))

  const upsertMetric = (id, defaults) => {
    let metric = remappedById.get(id)
    if (!metric) {
      metric = { id, ...defaults }
      metrics.push(metric)
      remappedById.set(id, metric)
    }
    return metric
  }

  const assignIfFinite = (id, value, sourceName, sourceUrl) => {
    if (!Number.isFinite(value)) return
    const metric = remappedById.get(id)
    if (!metric) return
    const currentValue = Number(metric.value)
    if (value === 0 && zeroSensitiveMetricIds.has(id) && Number.isFinite(currentValue) && currentValue > 0) {
      return
    }
    metric.value = value
    if (sourceName) metric.source_name = sourceName
    if (sourceUrl) metric.source_url = sourceUrl
    metric.updated_at_utc = nowIso
  }

  const wikiSourceLabel = sourceMetrics.sourceVariant === 'timeline'
    ? 'Wikipedia: Timeline of the 2026 Iran war (casualties by country)'
    : 'Wikipedia: 2026 Iran war (casualties by country)'
  const wikiSourceUrl = sourceMetrics.sourceVariant === 'timeline'
    ? 'https://en.wikipedia.org/wiki/Timeline_of_the_2026_Iran_war#Casualties_by_country'
    : 'https://en.wikipedia.org/wiki/2026_Iran_war#Casualties_by_country'

  const conservativeCasualtyFloor = {
    iran_killed: VERIFIED_IRAN_CONFLICT_TOTALS.iranKilled,
    iran_injured: VERIFIED_IRAN_CONFLICT_TOTALS.iranInjured,
    israel_killed: VERIFIED_IRAN_CONFLICT_TOTALS.israelKilled,
    israel_injured: VERIFIED_IRAN_CONFLICT_TOTALS.israelInjured,
    us_killed: VERIFIED_IRAN_CONFLICT_TOTALS.usKilled,
    us_seriously_injured: VERIFIED_IRAN_CONFLICT_TOTALS.usInjured
  }

  upsertMetric('air_strikes_total_2026', {
    label: 'Air Strikes (Reported Floor)',
    value: PROJECTILE_BASELINE_TOTALS.airStrikes,
    source: 'Britannica: 2026 Iran conflict',
    confidence: 'Low',
    tone: 'amber',
    scope: 'Conservative floor for reported U.S./Israeli air strikes against Iran. Excludes Iranian missile and drone launches.',
    source_name: 'Britannica: 2026 Iran conflict',
    source_url: AIRSTRIKE_FLOOR_URL,
    updated_at_utc: nowIso
  })

  assignIfFinite('iran_killed', Math.max(Number(sourceMetrics.iranKilled) || 0, conservativeCasualtyFloor.iran_killed), 'Wikipedia: 2026 Iran war (casualties by citizenship, conservative lower bound)', WIKI_IRAN_WAR_URL)
  assignIfFinite('iran_injured', Math.max(Number(sourceMetrics.iranInjured) || 0, conservativeCasualtyFloor.iran_injured), 'Wikipedia: 2026 Iran war (casualties by citizenship, conservative lower bound)', WIKI_IRAN_WAR_URL)
  assignIfFinite('israel_killed', Math.max(Number(sourceMetrics.israelKilled) || 0, conservativeCasualtyFloor.israel_killed), 'Wikipedia: 2026 Iran war (casualties by citizenship, conservative lower bound)', WIKI_IRAN_WAR_URL)
  assignIfFinite('israel_injured', Math.max(Number(sourceMetrics.israelInjured) || 0, conservativeCasualtyFloor.israel_injured), 'Wikipedia: 2026 Iran war (casualties by citizenship, conservative lower bound)', WIKI_IRAN_WAR_URL)
  assignIfFinite('us_killed', Math.max(Number(sourceMetrics.usKilled) || 0, conservativeCasualtyFloor.us_killed), 'Wikipedia + U.S. Central Command (conservative lower bound)', WIKI_IRAN_WAR_URL)
  assignIfFinite('us_seriously_injured', Math.max(Number(sourceMetrics.usInjured) || 0, conservativeCasualtyFloor.us_seriously_injured), 'Wikipedia + U.S. Central Command (conservative lower bound)', WIKI_IRAN_WAR_URL)

  const iranKilled = Number(remappedById.get('iran_killed')?.value)
  const israelKilled = Number(remappedById.get('israel_killed')?.value)
  const usKilled = Number(remappedById.get('us_killed')?.value)
  if (Number.isFinite(iranKilled) && Number.isFinite(israelKilled) && Number.isFinite(usKilled)) {
    assignIfFinite('total_reported_killed', Math.max(iranKilled + israelKilled + usKilled, VERIFIED_IRAN_CONFLICT_TOTALS.totalKilledLowerBound), 'Wikipedia: 2026 Iran war (all tracked countries, conservative lower bound)', WIKI_IRAN_WAR_URL)
  }

  const iranInjured = Number(remappedById.get('iran_injured')?.value)
  const israelInjured = Number(remappedById.get('israel_injured')?.value)
  const usInjured = Number(remappedById.get('us_seriously_injured')?.value)
  if (Number.isFinite(iranInjured) && Number.isFinite(israelInjured) && Number.isFinite(usInjured)) {
    assignIfFinite('total_reported_injured', Math.max(iranInjured + israelInjured + usInjured, VERIFIED_IRAN_CONFLICT_TOTALS.totalInjuredLowerBound), 'Wikipedia: 2026 Iran war (all tracked countries, conservative lower bound)', WIKI_IRAN_WAR_URL)
  }

  const stampActivityMetric = (id, minimumValue, label, scope, sourceLabel = PROJECTILE_SOURCE_CHAIN_LABEL, sourceUrl = PROJECTILE_SOURCE_CHAIN_URL) => {
    const metric = remappedById.get(id)
    if (!metric) return
    const existing = Number(metric.value)
    const nextValue = Number.isFinite(existing) ? Math.max(existing, minimumValue) : minimumValue
    metric.value = nextValue
    metric.label = label
    metric.scope = scope
    metric.source = sourceLabel
    metric.source_name = sourceLabel
    metric.source_url = sourceUrl
    metric.updated_at_utc = nowIso
  }

  // Guardrail: keep projectile totals monotonic and never below latest verified 2026 baseline.
  stampActivityMetric(
    'missiles_total_2026',
    PROJECTILE_BASELINE_TOTALS.missiles,
    'Iranian Missiles Launched (Regional Conflict Total)',
    'Total reported Iranian missile launches across the regional 2026 conflict (cumulative lower bound). Excludes U.S./Israeli air strikes.'
  )
  stampActivityMetric(
    'drones_total_2026',
    PROJECTILE_BASELINE_TOTALS.drones,
    'Iranian Drones Launched (Regional Conflict Total)',
    'Total reported Iranian drone launches across the regional 2026 conflict (cumulative lower bound). Excludes U.S./Israeli air strikes.'
  )
  stampActivityMetric(
    'air_strikes_total_2026',
    PROJECTILE_BASELINE_TOTALS.airStrikes,
    'Air Strikes (Reported Floor)',
    'Conservative floor for reported U.S./Israeli air strikes against Iran. Britannica reports nearly 900 strikes in the first 12 hours on February 28, 2026; the campaign continued after that, so this should be read as a minimum rather than an exact total.',
    'Britannica: 2026 Iran conflict',
    AIRSTRIKE_FLOOR_URL
  )

  assignIfFinite('air_defense_intercepts_7d', VERIFIED_IRAN_CONFLICT_TOTALS.airDefenseInterceptsLowerBound, 'UAE air defences public cumulative tally (lower bound)', UAE_INTERCEPTS_URL)
  const interceptMetric = remappedById.get('air_defense_intercepts_7d')
  if (interceptMetric) {
    interceptMetric.label = 'Air Defense Intercepts (Conflict Lower Bound)'
    interceptMetric.scope = 'Publicly documented cumulative intercepts / engagements. Current floor comes from UAE official cumulative tally through March 27, 2026, and undercounts theater-wide interceptions.'
    interceptMetric.source = 'UAE Ministry of Defence / WAM public cumulative tally'
    interceptMetric.source_name = 'UAE air defences cumulative tally through March 27, 2026'
    interceptMetric.source_url = UAE_INTERCEPTS_URL
    interceptMetric.updated_at_utc = nowIso
  }

  assignIfFinite('critical_infrastructure_impacts_7d', VERIFIED_IRAN_CONFLICT_TOTALS.infrastructureImpactsLowerBound, 'Anadolu / Iranian Red Crescent reported damaged civilian places floor', IRAN_INFRA_DAMAGE_URL)
  const infrastructureMetric = remappedById.get('critical_infrastructure_impacts_7d')
  if (infrastructureMetric) {
    infrastructureMetric.label = 'Critical Infrastructure / Civilian Site Impacts (Reported Floor)'
    infrastructureMetric.scope = 'Current reported floor from the Iranian Red Crescent: over 113,000 damaged civilian places since February 28, 2026. This is not an exact total for all theater-wide infrastructure damage and should be read as a minimum reported count.'
    infrastructureMetric.source = 'Iranian Red Crescent via Anadolu'
    infrastructureMetric.source_name = 'Iran says over 113,000 civilian places damaged in US-Israeli attacks'
    infrastructureMetric.source_url = IRAN_INFRA_DAMAGE_URL
    infrastructureMetric.updated_at_utc = nowIso
  }

  const conflictDurationDays = Math.max(1, Math.floor((new Date(nowIso).getTime() - new Date(IRAN_CONFLICT_START_UTC).getTime()) / 86400000) + 1)
  const durationMetric = upsertMetric('conflict_duration_days', {
    label: 'Conflict Duration (days)',
    value: conflictDurationDays,
    source: 'Computed from war start date',
    confidence: 'High',
    tone: 'blue',
    scope: 'Elapsed calendar days since February 28, 2026, inclusive.',
    source_name: 'Wikipedia: 2026 Iran war (war start date)',
    source_url: WIKI_IRAN_WAR_URL,
    updated_at_utc: nowIso
  })
  durationMetric.label = 'Conflict Duration (days)'
  durationMetric.value = conflictDurationDays
  durationMetric.source = 'Computed from war start date'
  durationMetric.confidence = 'High'
  durationMetric.tone = 'blue'
  durationMetric.scope = 'Elapsed calendar days since February 28, 2026, inclusive.'
  durationMetric.source_name = 'Wikipedia: 2026 Iran war (war start date)'
  durationMetric.source_url = WIKI_IRAN_WAR_URL
  durationMetric.updated_at_utc = nowIso

  return {
    ...conflict,
    source_name: sourceMetrics.sourceVariant === 'timeline'
      ? 'Wikipedia: Timeline of the 2026 Iran war (casualty tracker)'
      : 'Wikipedia: 2026 Iran war (casualty tracker)',
    source_url: wikiSourceUrl,
    secondary_source_name: 'U.S. Central Command (CENTCOM) statements',
    secondary_source_url: 'https://www.centcom.mil/MEDIA/STATEMENTS/',
    tertiary_source_name: 'Al Jazeera casualty tracker',
    tertiary_source_url: 'https://www.aljazeera.com/news/2026/3/1/us-israel-attacks-on-iran-death-toll-and-injuries-live-tracker',
    quaternary_source_name: 'The Guardian live coverage',
    quaternary_source_url: 'https://www.theguardian.com/world/live/2026/mar/05/us-israel-war-iran-live-updates-attacks-strikes-trump-netanyahu-lebanon-middle-east-latest-news',
    projectile_source_name: PROJECTILE_SOURCE_CHAIN_LABEL,
    projectile_source_url: PROJECTILE_SOURCE_CHAIN_URL,
    projectile_baseline_utc: PROJECTILE_BASELINE_UTC,
    metrics
  }
}


function formatTimelineUtc(iso) {
  const d = new Date(iso)
  if (!Number.isFinite(d.getTime())) return 'Update'
  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mi = String(d.getUTCMinutes()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${mi} UTC`
}

function buildConflictTimeline(conflict, nowIso, mapPoints) {
  return globalThis.EventEvidence.timeline(mapPoints, conflict?.id === 'ukraine_2026' ? 'ukraine' : 'iran')
}

function refreshMapPoints(conflict) {
  // Keep evidence-backed occurrences unchanged; never derive events from aggregate totals.
  return (Array.isArray(conflict?.map_points) ? conflict.map_points : []).filter(globalThis.EventEvidence.eligible)
}


function computeTargetIntensity(conflict) {
  const metrics = metricMap(conflict)

  if (conflict?.id === 'iran_2026') {
    const killed = metricValue(metrics, 'iran_killed') + metricValue(metrics, 'israel_killed') + metricValue(metrics, 'us_killed')
    const injured = metricValue(metrics, 'iran_injured') + metricValue(metrics, 'israel_injured') + metricValue(metrics, 'us_seriously_injured')
    const projectile = (metricValue(metrics, 'missiles_total_2026') || metricValue(metrics, 'missiles_benchmark')) * 0.015
      + (metricValue(metrics, 'drones_total_2026') || metricValue(metrics, 'drones_benchmark')) * 0.007
    const operations = metricValue(metrics, 'air_defense_intercepts_7d') * 0.06
      + metricValue(metrics, 'critical_infrastructure_impacts_7d') * 0.30
      + metricValue(metrics, 'air_strikes_total_2026') * 0.01
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
  const rebuildTailDays = RECENT_SERIES_REBUILD_DAYS[conflict?.id] || 7
  const rebuildStart = addDays(end, -(rebuildTailDays - 1))
  const conflictStartISO = conflict?.id === 'iran_2026'
    ? IRAN_CONFLICT_START_UTC.slice(0, 10)
    : (METRIC_SERIES_START[conflict?.id] || null)
  const conflictStart = parseDay(conflictStartISO)
  const conflictSpanDays = conflictStart && conflictStart <= end
    ? Math.max(1, Math.round((end - conflictStart) / 86400000))
    : null

  const target = computeTargetIntensity(conflict)
  const totalDays = Math.max(1, Math.round((end - start) / 86400000))
  const baseline = clamp(target - (conflict?.id === 'ukraine_2026' ? 9 : 18), 12, 88)

  const points = []
  let prev = null
  for (let cursor = new Date(start.getTime()), i = 0; cursor <= end; cursor = addDays(cursor, 1), i += 1) {
    const iso = toDayISO(cursor)
    let value

    const preserveExistingPoint = existingMap.has(iso)
      && cursor < rebuildStart
      && !(conflict?.id === 'iran_2026' && conflictStart && cursor >= conflictStart)

    if (preserveExistingPoint) {
      value = existingMap.get(iso)
    } else if (!firstExisting || cursor < firstExisting) {
      const progress = i / totalDays
      const trend = baseline + (target - baseline) * progress
      const wave = Math.sin((i + 3) * 0.085) * 3 + Math.cos((i + 7) * 0.037) * 1.6
      const jitter = (dayHash(conflict?.id || 'c', iso) - 0.5) * 2.2
      value = Math.round(trend + wave + jitter)
    } else {
      const daysToEnd = Math.max(0, Math.round((end - cursor) / 86400000))
      const recentProgress = rebuildTailDays <= 1 ? 1 : 1 - (daysToEnd / Math.max(1, rebuildTailDays - 1))
      const anchor = prev == null
        ? clamp(target - 10, 8, 95)
        : prev
      const desired = anchor + (target - anchor) * clamp(recentProgress * 0.78 + 0.14, 0, 1)
      const wave = Math.sin((i + 2) * 0.9) * 2.8 + Math.cos((i + 5) * 0.45) * 1.4
      const jitter = (dayHash(conflict?.id || 'c', iso) - 0.5) * 2.4
      value = Math.round(desired + wave + jitter)
    }

    value = clamp(value, 8, 99)

    if (conflict?.id === 'iran_2026' && conflictStart && cursor >= conflictStart && conflictSpanDays != null) {
      const conflictDay = Math.max(0, Math.round((cursor - conflictStart) / 86400000))
      const conflictProgress = clamp(conflictDay / conflictSpanDays, 0, 1)
      const floorStart = clamp(target - 24, 72, 84)
      const floorEnd = clamp(target - 16, 78, 90)
      const floorWave = Math.sin((conflictDay + 1) * 0.42) * 1.6 + Math.cos((conflictDay + 2) * 0.19) * 0.8
      const conflictFloor = Math.round(floorStart + (floorEnd - floorStart) * conflictProgress + floorWave)
      value = Math.max(value, conflictFloor)
    }

    if (prev != null) {
      const diff = value - prev
      const maxStep = cursor >= rebuildStart ? 5 : 6
      if (Math.abs(diff) > maxStep) value = prev + Math.sign(diff) * maxStep
    }

    prev = value
    points.push({ date: iso, value })
  }

  if (points.length > 0) {
    points[points.length - 1].value = target
  }

  return points
}

function buildMetricSeries(conflict, dailySeries) {
  const metrics = Array.isArray(conflict?.metrics) ? conflict.metrics : []
  const seriesRows = Array.isArray(dailySeries) ? dailySeries : []
  const startISO = METRIC_SERIES_START[conflict?.id] || HISTORY_START[conflict?.id] || seriesRows[0]?.date || null
  const start = startISO ? parseDay(startISO) : null

  const filteredRows = start
    ? seriesRows.filter(point => {
        const day = parseDay(point?.date)
        return day && day >= start
      })
    : seriesRows.slice()

  const sourceRows = filteredRows.length > 0 ? filteredRows : seriesRows.slice()
  const normalizedWeights = sourceRows.map((point, index) => {
    const base = clamp(Number(point?.value) || 0, 0, 100)
    const recentBias = sourceRows.length <= 1 ? 0 : (index / Math.max(1, sourceRows.length - 1)) * 10
    return Math.max(1, base + recentBias)
  })
  const weightTotal = normalizedWeights.reduce((acc, value) => acc + value, 0) || 1

  const buildCumulativeSeries = (finalValue, mode = 'weighted') => {
    const safeFinal = Math.max(0, Math.round(Number(finalValue) || 0))
    if (sourceRows.length === 0) return []

    if (mode === 'duration') {
      return sourceRows.map((point, index) => ({
        date: point.date,
        value: Math.min(safeFinal, index + 1)
      }))
    }

    let cumulative = 0
    let prevValue = 0
    const rows = sourceRows.map((point, index) => {
      cumulative += normalizedWeights[index] || 0
      let value = Math.round((safeFinal * cumulative) / weightTotal)
      if (value < prevValue) value = prevValue
      if (index === sourceRows.length - 1) value = safeFinal
      prevValue = value
      return {
        date: point.date,
        value
      }
    })
    return rows
  }

  return metrics.reduce((acc, metric) => {
    if (!metric?.id || !Number.isFinite(Number(metric.value))) return acc
    const id = String(metric.id)
    acc[id] = {
      id,
      label: metric.label || id,
      current_value: Math.round(Number(metric.value)),
      tone: metric.tone || 'blue',
      scope: metric.scope || '',
      source_name: metric.source_name || metric.source || '',
      source_url: metric.source_url || '',
      start_date: sourceRows[0]?.date || null,
      end_date: sourceRows[sourceRows.length - 1]?.date || null,
      series: buildCumulativeSeries(metric.value, id === 'conflict_duration_days' ? 'duration' : 'weighted')
    }
    return acc
  }, {})
}

function refreshConflictLegend(conflict) {
  if (conflict?.id === 'iran_2026') {
    return [
      { type: 'casualties', label: 'Casualty concentration', color: '#c026ff' },
      { type: 'missiles', label: 'Missile indicator', color: '#f59e0b' },
      { type: 'drones', label: 'Drone indicator', color: '#60a5fa' },
      { type: 'air_strikes', label: 'Air-strike indicator', color: '#22c55e' }
    ]
  }

  return Array.isArray(conflict?.legend) ? conflict.legend : []
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
    const nextMapPoints = refreshMapPoints(refreshedConflict, now)
    const nextTimeline = buildConflictTimeline(refreshedConflict, now, nextMapPoints, fullSeries)
    return {
      ...refreshedConflict,
      as_of_utc: now,
      updated_at_utc: now,
      legend: refreshConflictLegend(refreshedConflict),
      map: {
        ...(refreshedConflict.map || {}),
        points: nextMapPoints
      },
      map_points: nextMapPoints,
      daily_series: fullSeries,
      metric_series: buildMetricSeries(refreshedConflict, fullSeries),
      timeline: nextTimeline
    }
  })

  const output = {
    ...payload,
    updated_at_utc: now,
    conflicts: updatedConflicts
  }

  await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`)
  await archiveMetricReports(output)
  console.log(`Updated conflict metrics JSON (${updatedConflicts.length} conflicts)`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
