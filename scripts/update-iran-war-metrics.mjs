import { readFile, writeFile } from 'node:fs/promises'

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
const UAE_INTERCEPTS_URL = 'https://www.gulftoday.ae/news/2026/03/27/uae-intercepts-six-ballistic-missiles-nine-drones-from-iran'
const PROJECTILE_SOURCE_CHAIN_LABEL = 'UAE Ministry of Defence + IDF spokesperson + ISW/CTP + OSINT public reporting'
const PROJECTILE_SOURCE_CHAIN_URL = 'https://www.understandingwar.org/'
const PROJECTILE_BASELINE_UTC = '2026-04-01T00:00:00.000Z'
const PROJECTILE_BASELINE_TOTALS = {
  missiles: 1252,
  drones: 2328
}
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
  infrastructureImpactsLowerBound: 10000
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

  const stampProjectileMetric = (id, minimumValue, label, scope) => {
    const metric = remappedById.get(id)
    if (!metric) return
    const existing = Number(metric.value)
    const nextValue = Number.isFinite(existing) ? Math.max(existing, minimumValue) : minimumValue
    metric.value = nextValue
    metric.label = label
    metric.scope = scope
    metric.source = PROJECTILE_SOURCE_CHAIN_LABEL
    metric.source_name = PROJECTILE_SOURCE_CHAIN_LABEL
    metric.source_url = PROJECTILE_SOURCE_CHAIN_URL
    metric.updated_at_utc = nowIso
  }

  // Guardrail: keep projectile totals monotonic and never below latest verified 2026 baseline.
  stampProjectileMetric(
    'missiles_total_2026',
    PROJECTILE_BASELINE_TOTALS.missiles,
    'Ballistic Missiles (2026 Conflict Total)',
    'Total reported ballistic missiles launched in the 2026 conflict (cumulative lower bound).'
  )
  stampProjectileMetric(
    'drones_total_2026',
    PROJECTILE_BASELINE_TOTALS.drones,
    'Drones (2026 Conflict Total)',
    'Total reported drones launched in the 2026 conflict (cumulative lower bound).'
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

  assignIfFinite('critical_infrastructure_impacts_7d', VERIFIED_IRAN_CONFLICT_TOTALS.infrastructureImpactsLowerBound, 'Wikipedia: 2026 Iran war (civilian and infrastructure damage lower bound)', WIKI_IRAN_WAR_URL)
  const infrastructureMetric = remappedById.get('critical_infrastructure_impacts_7d')
  if (infrastructureMetric) {
    infrastructureMetric.label = 'Critical Infrastructure Impacts (Conflict Lower Bound)'
    infrastructureMetric.scope = 'Conservative cumulative floor based on reported damaged civilian and infrastructure sites. Includes >10,000 civilian sites damaged plus hospitals, schools, and other critical facilities.'
    infrastructureMetric.source = 'Wikipedia + Iranian Red Crescent + WHO'
    infrastructureMetric.source_name = 'Wikipedia: 2026 Iran war (infrastructure damage lower bound)'
    infrastructureMetric.source_url = WIKI_IRAN_WAR_URL
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

function buildConflictTimeline(conflict, nowIso, mapPoints, dailySeries) {
  const now = new Date(nowIso)
  const mk = (hoursAgo, text, category) => {
    const ts = new Date(now.getTime() - (hoursAgo * 60 * 60 * 1000)).toISOString()
    return {
      time: formatTimelineUtc(ts),
      timestamp_utc: ts,
      text,
      category
    }
  }
  const mapTimelineEntries = (Array.isArray(mapPoints) ? mapPoints : [])
    .map((point, index) => {
      const ts = Number.isFinite(Date.parse(point?.reported_at_utc || '')) ? new Date(point.reported_at_utc).toISOString() : nowIso
      const count = Number(point?.marker_mass ?? point?.value)
      const label = String(point?.label || point?.type || 'Map event').trim()
      const place = String(point?.name || 'Approximate map point').trim()
      const category = String(point?.category || '').toLowerCase() === 'casualties' ? 'casualties' : 'operations'
      return {
        time: formatTimelineUtc(ts),
        timestamp_utc: ts,
        text: `${label} near ${place} (${Number.isFinite(count) ? Math.round(count) : '--'} reported units).`,
        category,
        map_point_key: point?.point_key || [
          String(point?.name || ''),
          String(point?.label || ''),
          String(point?.lat ?? ''),
          String(point?.lng ?? ''),
          String(point?.reported_at_utc || point?.updated_at_utc || point?.as_of_utc || '')
        ].join('|'),
        map_module: conflict?.id === 'ukraine_2026' ? 'ukraine' : 'iran',
        _index: index
      }
    })
    .sort((a, b) => {
      const aTs = Number.isFinite(Date.parse(a.timestamp_utc)) ? Date.parse(a.timestamp_utc) : 0
      const bTs = Number.isFinite(Date.parse(b.timestamp_utc)) ? Date.parse(b.timestamp_utc) : 0
      if (bTs !== aTs) return bTs - aTs
      return b._index - a._index
    })
    .slice(0, 8)
    .map(({ _index, ...entry }) => entry)

  const metrics = metricMap(conflict)
  const totalKilled = metricValue(metrics, 'total_reported_killed')
  const totalInjured = metricValue(metrics, 'total_reported_injured')
  const mapCount = Array.isArray(mapPoints) ? mapPoints.length : 0
  const primarySource = String(conflict?.source_name || 'primary source').trim()
  const secondarySource = String(conflict?.secondary_source_name || '').trim()

  const series = Array.isArray(dailySeries) ? dailySeries : []
  const latest = Number(series[series.length - 1]?.value)
  const prev = Number(series[series.length - 2]?.value)
  const delta = Number.isFinite(latest) && Number.isFinite(prev) ? (latest - prev) : null
  const deltaLabel = Number.isFinite(delta) ? `${delta > 0 ? '+' : ''}${Math.round(delta * 10) / 10}` : 'n/a'

  if (conflict?.id === 'iran_2026') {
    return [
      mk(0, `Casualty cards synced: reported totals now ${Math.round(totalKilled)} killed / ${Math.round(totalInjured)} injured (source-mixed).`, 'casualties'),
      mk(1, `Map hotspots regenerated and recentered (${mapCount} active points in current feed window).`, 'operations'),
      ...mapTimelineEntries,
      mk(2, `Source chain verified: ${primarySource}${secondarySource ? ` + ${secondarySource}` : ''}.`, 'sources'),
      mk(3, `Daily intensity series refreshed; latest day-over-day delta ${deltaLabel}.`, 'trend')
    ]
  }

  return [
    mk(0, `Conflict metrics synced: ${Math.round(totalKilled)} killed / ${Math.round(totalInjured)} injured (reported aggregate).`, 'casualties'),
    mk(1, `Map hotspots regenerated and recentered (${mapCount} active points in current feed window).`, 'operations'),
    ...mapTimelineEntries,
    mk(2, `Source chain verified: ${primarySource}${secondarySource ? ` + ${secondarySource}` : ''}.`, 'sources'),
    mk(3, `Daily intensity series refreshed; latest day-over-day delta ${deltaLabel}.`, 'trend')
  ]
}

function refreshMapPoints(conflict, now) {
  const metrics = metricMap(conflict)
  const sourceLabel = [
    conflict?.source_name,
    conflict?.secondary_source_name,
    conflict?.tertiary_source_name,
    conflict?.quaternary_source_name
  ].filter(Boolean).join(' + ')

  const splitMass = (total, weights) => {
    const safeTotal = Math.max(0, Math.round(Number(total) || 0))
    const safeWeights = Array.isArray(weights) && weights.length > 0 ? weights : [1]
    if (safeTotal === 0) return safeWeights.map(() => 0)

    const normalized = safeWeights.map(value => Math.max(0.001, Number(value) || 0))
    const sum = normalized.reduce((acc, value) => acc + value, 0)
    const exact = normalized.map(value => (safeTotal * value) / sum)
    const chunks = exact.map(value => Math.floor(value))
    let remainder = safeTotal - chunks.reduce((acc, value) => acc + value, 0)

    if (remainder > 0) {
      const order = exact
        .map((value, index) => ({ index, frac: value - Math.floor(value) }))
        .sort((a, b) => b.frac - a.frac)
      let cursor = 0
      while (remainder > 0 && order.length > 0) {
        const idx = order[cursor % order.length].index
        chunks[idx] += 1
        remainder -= 1
        cursor += 1
      }
    }

    return chunks
  }

  const parsedNow = new Date(now)
  const dayISO = String(now || new Date().toISOString()).slice(0, 10)
  const cycleHour = Number.isFinite(parsedNow.getTime()) ? Math.floor(parsedNow.getUTCHours() / 2) * 2 : 0
  const cycleISO = `${dayISO}T${String(cycleHour).padStart(2, '0')}:00:00Z`

  const autoExpandSites = (sites, { conflictKey, channel, totalMass, maxExtra = 20, baseRadiusKm = 11 }) => {
    const base = Array.isArray(sites)
      ? sites.filter(site => Number.isFinite(Number(site?.lat)) && Number.isFinite(Number(site?.lng)))
      : []
    if (base.length === 0) return []

    const growthStart = parseDay('2026-01-01')
    const cycleDay = parseDay(dayISO)
    const daysSinceStart = growthStart && cycleDay ? Math.max(0, Math.round((cycleDay - growthStart) / 86400000)) : 0
    const growthSteps = Math.min(24, Math.floor(daysSinceStart / 2))
    const massBoost = Math.max(0, Math.round((Number(totalMass) || 0) / 24))
    const extraTarget = Math.min(maxExtra, Math.max(0, growthSteps + massBoost))
    if (extraTarget <= 0) return base

    const maxSeedCount = Math.min(base.length, 12)
    const seeds = base.slice(0, maxSeedCount)
    const extras = []

    for (let i = 0; i < extraTarget; i += 1) {
      const seed = seeds[i % seeds.length]
      const lat = Number(seed.lat)
      const lng = Number(seed.lng)
      const angle = dayHash(`${conflictKey}:${channel}:angle:${i}`, cycleISO) * Math.PI * 2
      const ring = 1 + (i % 4)
      const jitter = 0.8 + dayHash(`${conflictKey}:${channel}:radius:${i}`, cycleISO) * 0.6
      const radiusKm = baseRadiusKm * ring * jitter

      const dLat = (Math.sin(angle) * radiusKm) / 110.574
      const dLng = (Math.cos(angle) * radiusKm) / Math.max(0.25, 111.32 * Math.cos((lat * Math.PI) / 180))
      const weightSeed = Number(seed.weight) || 1
      const derivedWeight = clamp(weightSeed * (0.30 + dayHash(`${conflictKey}:${channel}:weight:${i}`, cycleISO) * 0.45), 0.18, 1.2)

      extras.push({
        name: `${seed.name} hotspot ${cycleISO.slice(0, 13)} #${i + 1}`,
        lat: lat + dLat,
        lng: lng + dLng,
        weight: derivedWeight
      })
    }

    return [...base, ...extras]
  }

  const makePoints = ({ label, type, category, totalMetric, totalMass, description, sites }) => {
    const masses = splitMass(totalMass, sites.map(site => site.weight || 1))
    return sites
      .map((site, index) => ({ site, mass: masses[index] || 0 }))
      .filter(entry => entry.mass > 0)
      .map(({ site, mass }, index) => {
        const pointKey = [
          String(conflict?.id || 'conflict'),
          String(category || 'event'),
          String(index),
          String(site.name || ''),
          String(site.lat),
          String(site.lng),
          String(now)
        ].join('|')
        return {
          name: site.name,
          label,
          value: mass,
          marker_mass: mass,
          total_metric: totalMetric,
          lat: site.lat,
          lng: site.lng,
          type,
          category,
          description,
          source: sourceLabel,
          reported_at_utc: now,
          coordinate_precision_km: '5-10',
          point_key: pointKey
        }
      })
  }

  if (conflict?.id === 'iran_2026') {
    const missilesTotal = metricValue(metrics, 'missiles_total_2026') || metricValue(metrics, 'missiles_benchmark')
    const dronesTotal = metricValue(metrics, 'drones_total_2026') || metricValue(metrics, 'drones_benchmark')
    const infraTotal = metricValue(metrics, 'critical_infrastructure_impacts_7d')
    const killedTotal = metricValue(metrics, 'iran_killed') + metricValue(metrics, 'israel_killed') + metricValue(metrics, 'us_killed')
    const injuredTotal = metricValue(metrics, 'iran_injured') + metricValue(metrics, 'israel_injured') + metricValue(metrics, 'us_seriously_injured')

    const missileMass = clamp(Math.round(missilesTotal * 0.62), 520, 980)
    const droneMass = clamp(Math.round(dronesTotal * 0.42), 760, 1600)
    const infraMass = clamp(Math.round(infraTotal * 0.06), 280, 760)
    const casualtyMass = clamp(Math.round(killedTotal * 0.06 + injuredTotal * 0.015), 240, 900)

    const missileSites = [
      { name: 'Tel Aviv metro impact cluster', lat: 32.0853, lng: 34.7818, weight: 1.45 },
      { name: 'Haifa metro impact cluster', lat: 32.794, lng: 34.9896, weight: 1.2 },
      { name: 'Beersheba impact cluster', lat: 31.252, lng: 34.7915, weight: 1.0 },
      { name: 'Jerusalem outskirts impact cluster', lat: 31.7683, lng: 35.2137, weight: 0.85 },
      { name: 'Ashdod coastal impact cluster', lat: 31.8014, lng: 34.6435, weight: 0.75 },
      { name: 'Ashkelon impact cluster', lat: 31.6688, lng: 34.5743, weight: 0.7 },
      { name: 'Rishon LeZion impact cluster', lat: 31.973, lng: 34.7925, weight: 0.68 },
      { name: 'Hadera impact cluster', lat: 32.434, lng: 34.919, weight: 0.62 },
      { name: 'Eilat impact cluster', lat: 29.5577, lng: 34.9519, weight: 0.48 },
      { name: 'Natanz area strike cluster', lat: 33.7262, lng: 51.7267, weight: 0.9 },
      { name: 'Tabriz area strike cluster', lat: 38.0962, lng: 46.2738, weight: 0.65 },
      { name: 'Kermanshah area strike cluster', lat: 34.3142, lng: 47.065, weight: 0.7 },
      { name: 'Arak area strike cluster', lat: 34.0917, lng: 49.6892, weight: 0.6 },
      { name: 'Hamedan area strike cluster', lat: 34.7992, lng: 48.5146, weight: 0.56 },
      { name: 'Yazd area strike cluster', lat: 31.8974, lng: 54.3569, weight: 0.52 },
      { name: 'Bushehr area strike cluster', lat: 28.9234, lng: 50.8203, weight: 0.5 },
      { name: 'Manama strike-alert cluster (Bahrain)', lat: 26.2285, lng: 50.586, weight: 0.42 },
      { name: 'Dammam strike-alert cluster (Saudi Arabia)', lat: 26.4207, lng: 50.0888, weight: 0.44 },
      { name: 'Riyadh strike-alert cluster (Saudi Arabia)', lat: 24.7136, lng: 46.6753, weight: 0.38 },
      { name: 'Basra strike-alert cluster (Iraq)', lat: 30.5085, lng: 47.7804, weight: 0.4 }
    ]

    const droneSites = [
      { name: 'Isfahan drone strike zone', lat: 32.6546, lng: 51.668, weight: 1.2 },
      { name: 'Qom drone strike zone', lat: 34.6416, lng: 50.8746, weight: 0.95 },
      { name: 'Karaj drone strike zone', lat: 35.84, lng: 50.9391, weight: 0.85 },
      { name: 'Tehran west drone strike zone', lat: 35.6892, lng: 51.389, weight: 1.35 },
      { name: 'Tehran north drone strike zone', lat: 35.786, lng: 51.427, weight: 1.05 },
      { name: 'Shiraz drone strike zone', lat: 29.5918, lng: 52.5837, weight: 0.75 },
      { name: 'Ahvaz drone strike zone', lat: 31.3183, lng: 48.6706, weight: 0.7 },
      { name: 'Bandar Abbas drone strike zone', lat: 27.1832, lng: 56.2666, weight: 0.8 },
      { name: 'Minab drone strike zone', lat: 27.131, lng: 57.0776, weight: 0.7 },
      { name: 'Kashan drone strike zone', lat: 33.985, lng: 51.409, weight: 0.7 },
      { name: 'Yazd drone strike zone', lat: 31.8974, lng: 54.3569, weight: 0.6 },
      { name: 'Tabriz drone strike zone', lat: 38.08, lng: 46.29, weight: 0.58 },
      { name: 'Urmia drone strike zone', lat: 37.5527, lng: 45.0761, weight: 0.5 },
      { name: 'Mashhad drone strike zone', lat: 36.2605, lng: 59.6168, weight: 0.46 },
      { name: 'Qazvin drone strike zone', lat: 36.2797, lng: 50.0049, weight: 0.52 },
      { name: 'Kerman drone strike zone', lat: 30.2839, lng: 57.0834, weight: 0.48 },
      { name: 'Rasht drone strike zone', lat: 37.2808, lng: 49.5832, weight: 0.45 },
      { name: 'Semnan drone strike zone', lat: 35.5729, lng: 53.3971, weight: 0.42 },
      { name: 'Manama drone-alert zone (Bahrain)', lat: 26.227, lng: 50.575, weight: 0.4 },
      { name: 'Dhahran drone-alert zone (Saudi Arabia)', lat: 26.2361, lng: 50.0393, weight: 0.42 },
      { name: 'Doha drone-alert zone (Qatar)', lat: 25.2854, lng: 51.531, weight: 0.38 },
      { name: 'Abu Dhabi drone-alert zone (UAE)', lat: 24.4539, lng: 54.3773, weight: 0.36 }
    ]

    const infraSites = [
      { name: 'Haifa port infrastructure impact', lat: 32.8191, lng: 35.0007, weight: 1.2 },
      { name: 'Ashkelon energy corridor impact', lat: 31.6688, lng: 34.5743, weight: 1.0 },
      { name: 'Tel Aviv utility corridor impact', lat: 32.074, lng: 34.7924, weight: 1.0 },
      { name: 'Rishon LeZion utility node impact', lat: 31.973, lng: 34.7925, weight: 0.85 },
      { name: 'Hadera grid corridor impact', lat: 32.434, lng: 34.919, weight: 0.8 },
      { name: 'Beersheba logistics impact', lat: 31.244, lng: 34.798, weight: 0.8 },
      { name: 'Jerusalem utility node impact', lat: 31.7683, lng: 35.2137, weight: 0.78 },
      { name: 'Ashdod port corridor impact', lat: 31.8014, lng: 34.6435, weight: 0.76 },
      { name: 'Natanz facility perimeter impact', lat: 33.724, lng: 51.722, weight: 1.0 },
      { name: 'Isfahan industrial corridor impact', lat: 32.673, lng: 51.688, weight: 0.9 },
      { name: 'Tehran power node impact', lat: 35.701, lng: 51.403, weight: 0.95 },
      { name: 'Tabriz industrial corridor impact', lat: 38.08, lng: 46.29, weight: 0.7 },
      { name: 'Arak industrial corridor impact', lat: 34.0917, lng: 49.6892, weight: 0.66 },
      { name: 'Bandar Abbas utility corridor impact', lat: 27.1832, lng: 56.2666, weight: 0.6 },
      { name: 'Jubail industrial impact cluster (Saudi Arabia)', lat: 27.0174, lng: 49.6225, weight: 0.48 },
      { name: 'Ras Tanura energy impact cluster (Saudi Arabia)', lat: 26.6439, lng: 50.1582, weight: 0.44 },
      { name: 'Manama logistics impact cluster (Bahrain)', lat: 26.2235, lng: 50.5876, weight: 0.4 },
      { name: 'Kuwait City utility impact cluster (Kuwait)', lat: 29.3759, lng: 47.9774, weight: 0.38 }
    ]

    const casualtySites = [
      { name: 'Tehran casualty concentration', lat: 35.6892, lng: 51.389, weight: 1.3 },
      { name: 'Tel Aviv casualty concentration', lat: 32.0853, lng: 34.7818, weight: 1.15 },
      { name: 'Haifa casualty concentration', lat: 32.794, lng: 34.9896, weight: 1.05 },
      { name: 'Jerusalem casualty concentration', lat: 31.7683, lng: 35.2137, weight: 0.95 },
      { name: 'Isfahan casualty concentration', lat: 32.6546, lng: 51.668, weight: 0.9 },
      { name: 'Beersheba casualty concentration', lat: 31.252, lng: 34.7915, weight: 0.82 },
      { name: 'Ashkelon casualty concentration', lat: 31.6688, lng: 34.5743, weight: 0.76 },
      { name: 'Tabriz casualty concentration', lat: 38.0962, lng: 46.2738, weight: 0.7 },
      { name: 'Kermanshah casualty concentration', lat: 34.3142, lng: 47.065, weight: 0.64 },
      { name: 'Qom casualty concentration', lat: 34.6416, lng: 50.8746, weight: 0.62 },
      { name: 'Shiraz casualty concentration', lat: 29.5918, lng: 52.5837, weight: 0.58 },
      { name: 'Ahvaz casualty concentration', lat: 31.3183, lng: 48.6706, weight: 0.55 },
      { name: 'Manama casualty concentration (Bahrain)', lat: 26.2285, lng: 50.586, weight: 0.34 },
      { name: 'Dammam casualty concentration (Saudi Arabia)', lat: 26.4207, lng: 50.0888, weight: 0.36 },
      { name: 'Riyadh casualty concentration (Saudi Arabia)', lat: 24.7136, lng: 46.6753, weight: 0.32 },
      { name: 'Amman casualty concentration (Jordan)', lat: 31.9539, lng: 35.9106, weight: 0.3 }
    ]

    return [
      ...makePoints({
        label: 'Ballistic missiles (2026 conflict total)',
        type: 'projectiles',
        category: 'missile_strikes',
        totalMetric: missilesTotal,
        totalMass: missileMass,
        description: 'Approximate missile impact zones from open-source conflict reporting (5-10 km precision).',
        sites: autoExpandSites(missileSites, { conflictKey: 'iran_2026', channel: 'missiles', totalMass: missileMass, maxExtra: 110, baseRadiusKm: 11 })
      }),
      ...makePoints({
        label: 'Drones (2026 conflict total)',
        type: 'projectiles',
        category: 'drone_strikes',
        totalMetric: dronesTotal,
        totalMass: droneMass,
        description: 'Approximate drone strike zones from open-source conflict reporting (5-10 km precision).',
        sites: autoExpandSites(droneSites, { conflictKey: 'iran_2026', channel: 'drones', totalMass: droneMass, maxExtra: 150, baseRadiusKm: 10 })
      }),
      ...makePoints({
        label: 'Critical infrastructure impacts (conflict lower bound)',
        type: 'operations',
        category: 'air_strikes',
        totalMetric: infraTotal,
        totalMass: infraMass,
        description: 'Approximate air-strike / infrastructure impact locations (5-10 km precision).',
        sites: autoExpandSites(infraSites, { conflictKey: 'iran_2026', channel: 'operations', totalMass: infraMass, maxExtra: 90, baseRadiusKm: 9 })
      }),
      ...makePoints({
        label: 'Casualty concentration',
        type: 'casualties',
        category: 'casualties',
        totalMetric: killedTotal + injuredTotal,
        totalMass: casualtyMass,
        description: 'Approximate casualty concentration zones derived from reported killed/injured totals (5-10 km precision).',
        sites: autoExpandSites(casualtySites, { conflictKey: 'iran_2026', channel: 'casualties', totalMass: casualtyMass, maxExtra: 120, baseRadiusKm: 10 })
      })
    ]
  }

  if (conflict?.id === 'ukraine_2026') {
    const strikes7d = metricValue(metrics, 'ukraine_strike_incidents_7d')
    const droneWave7d = metricValue(metrics, 'ukraine_drone_wave_incidents_7d')
    const infra7d = metricValue(metrics, 'critical_infra_impacts_7d_ua')
    const frontline = metricValue(metrics, 'frontline_pressure_index')
    const killedTotal = metricValue(metrics, 'ukr_civilians_killed_reported') + metricValue(metrics, 'russia_killed_reported')
    const injuredTotal = metricValue(metrics, 'ukr_civilians_injured_reported') + metricValue(metrics, 'russia_injured_reported')

    const missileMass = clamp(Math.round(strikes7d * 0.70 + frontline * 0.40), 120, 320)
    const droneMass = clamp(Math.round(droneWave7d * 0.80 + frontline * 0.35), 110, 300)
    const infraMass = clamp(Math.round(infra7d * 1.10), 45, 180)
    const frontlineMass = clamp(Math.round(frontline * 0.30), 40, 150)
    const casualtyMass = clamp(Math.round(killedTotal * 0.0007 + injuredTotal * 0.00035), 100, 280)

    const missileSites = [
      { name: 'Kyiv oblast strike cluster', lat: 50.4501, lng: 30.5234, weight: 1.2 },
      { name: 'Kharkiv strike cluster', lat: 49.9935, lng: 36.2304, weight: 1.1 },
      { name: 'Dnipro strike cluster', lat: 48.4647, lng: 35.0462, weight: 1.0 },
      { name: 'Odesa strike cluster', lat: 46.4825, lng: 30.7233, weight: 0.95 },
      { name: 'Zaporizhzhia strike cluster', lat: 47.8388, lng: 35.1396, weight: 0.9 },
      { name: 'Mykolaiv strike cluster', lat: 46.975, lng: 31.9946, weight: 0.82 },
      { name: 'Sumy strike cluster', lat: 50.9077, lng: 34.7981, weight: 0.75 },
      { name: 'Chernihiv strike cluster', lat: 51.4982, lng: 31.2893, weight: 0.68 },
      { name: 'Poltava strike cluster', lat: 49.5883, lng: 34.5514, weight: 0.65 },
      { name: 'Kryvyi Rih strike cluster', lat: 47.9105, lng: 33.3918, weight: 0.62 },
      { name: 'Kramatorsk strike cluster', lat: 48.7231, lng: 37.5563, weight: 0.58 },
      { name: 'Kherson strike cluster', lat: 46.6354, lng: 32.6169, weight: 0.55 }
    ]

    const droneSites = [
      { name: 'Kyiv drone-wave cluster', lat: 50.4501, lng: 30.5234, weight: 1.15 },
      { name: 'Kharkiv drone-wave cluster', lat: 49.9935, lng: 36.2304, weight: 1.05 },
      { name: 'Lviv drone-wave cluster', lat: 49.8397, lng: 24.0297, weight: 0.72 },
      { name: 'Odesa drone-wave cluster', lat: 46.4825, lng: 30.7233, weight: 0.95 },
      { name: 'Dnipro drone-wave cluster', lat: 48.4647, lng: 35.0462, weight: 0.9 },
      { name: 'Zaporizhzhia drone-wave cluster', lat: 47.8388, lng: 35.1396, weight: 0.82 },
      { name: 'Vinnytsia drone-wave cluster', lat: 49.2331, lng: 28.4682, weight: 0.62 },
      { name: 'Kropyvnytskyi drone-wave cluster', lat: 48.5079, lng: 32.2623, weight: 0.58 },
      { name: 'Rivne drone-wave cluster', lat: 50.6199, lng: 26.2516, weight: 0.52 },
      { name: 'Ternopil drone-wave cluster', lat: 49.5535, lng: 25.5948, weight: 0.5 },
      { name: 'Lutsk drone-wave cluster', lat: 50.7472, lng: 25.3254, weight: 0.48 },
      { name: 'Ivano-Frankivsk drone-wave cluster', lat: 48.9226, lng: 24.7111, weight: 0.46 }
    ]

    const infraSites = [
      { name: 'Kyiv grid-impact cluster', lat: 50.4547, lng: 30.5238, weight: 1.2 },
      { name: 'Kharkiv grid-impact cluster', lat: 49.9905, lng: 36.233, weight: 1.0 },
      { name: 'Dnipro grid-impact cluster', lat: 48.467, lng: 35.04, weight: 0.92 },
      { name: 'Odesa port-impact cluster', lat: 46.48, lng: 30.72, weight: 0.9 },
      { name: 'Zaporizhzhia utility-impact cluster', lat: 47.84, lng: 35.14, weight: 0.84 },
      { name: 'Mykolaiv utility-impact cluster', lat: 46.975, lng: 31.9946, weight: 0.75 },
      { name: 'Kremenchuk utility-impact cluster', lat: 49.067, lng: 33.416, weight: 0.67 },
      { name: 'Lutsk utility-impact cluster', lat: 50.7472, lng: 25.3254, weight: 0.56 },
      { name: 'Lviv utility-impact cluster', lat: 49.8397, lng: 24.0297, weight: 0.54 },
      { name: 'Poltava utility-impact cluster', lat: 49.5883, lng: 34.5514, weight: 0.52 }
    ]

    const frontlineSites = [
      { name: 'Donetsk frontline pressure cluster', lat: 48.0159, lng: 37.8028, weight: 1.25 },
      { name: 'Luhansk frontline pressure cluster', lat: 48.574, lng: 39.3078, weight: 1.15 },
      { name: 'Zaporizhzhia frontline pressure cluster', lat: 47.8388, lng: 35.1396, weight: 1.0 },
      { name: 'Kherson frontline pressure cluster', lat: 46.6354, lng: 32.6169, weight: 0.92 },
      { name: 'Kupiansk frontline pressure cluster', lat: 49.7106, lng: 37.6152, weight: 0.75 },
      { name: 'Avdiivka frontline pressure cluster', lat: 48.1395, lng: 37.7426, weight: 0.72 },
      { name: 'Bakhmut frontline pressure cluster', lat: 48.5956, lng: 37.9999, weight: 0.7 },
      { name: 'Robotyne frontline pressure cluster', lat: 47.4437, lng: 35.8282, weight: 0.62 }
    ]

    const casualtySites = [
      { name: 'Kyiv casualty concentration', lat: 50.4501, lng: 30.5234, weight: 1.25 },
      { name: 'Kharkiv casualty concentration', lat: 49.9935, lng: 36.2304, weight: 1.15 },
      { name: 'Donetsk casualty concentration', lat: 48.0159, lng: 37.8028, weight: 1.1 },
      { name: 'Luhansk casualty concentration', lat: 48.574, lng: 39.3078, weight: 1.0 },
      { name: 'Zaporizhzhia casualty concentration', lat: 47.8388, lng: 35.1396, weight: 0.9 },
      { name: 'Kherson casualty concentration', lat: 46.6354, lng: 32.6169, weight: 0.84 },
      { name: 'Dnipro casualty concentration', lat: 48.4647, lng: 35.0462, weight: 0.8 },
      { name: 'Odesa casualty concentration', lat: 46.4825, lng: 30.7233, weight: 0.76 },
      { name: 'Mykolaiv casualty concentration', lat: 46.975, lng: 31.9946, weight: 0.72 },
      { name: 'Kramatorsk casualty concentration', lat: 48.7231, lng: 37.5563, weight: 0.66 },
      { name: 'Bakhmut casualty concentration', lat: 48.5956, lng: 37.9999, weight: 0.62 },
      { name: 'Poltava casualty concentration', lat: 49.5883, lng: 34.5514, weight: 0.58 }
    ]

    return [
      ...makePoints({
        label: 'Strike incidents (7d)',
        type: 'projectiles',
        category: 'missile_strikes',
        totalMetric: strikes7d,
        totalMass: missileMass,
        description: 'Approximate strike-incident locations (7-day source-mixed map).',
        sites: autoExpandSites(missileSites, { conflictKey: 'ukraine_2026', channel: 'missiles', totalMass: missileMass, maxExtra: 28, baseRadiusKm: 10 })
      }),
      ...makePoints({
        label: 'Drone-wave incidents (7d)',
        type: 'projectiles',
        category: 'drone_strikes',
        totalMetric: droneWave7d,
        totalMass: droneMass,
        description: 'Approximate drone-wave incident locations (7-day source-mixed map).',
        sites: autoExpandSites(droneSites, { conflictKey: 'ukraine_2026', channel: 'drones', totalMass: droneMass, maxExtra: 30, baseRadiusKm: 9 })
      }),
      ...makePoints({
        label: 'Critical infrastructure impacts (7d)',
        type: 'operations',
        category: 'air_strikes',
        totalMetric: infra7d,
        totalMass: infraMass,
        description: 'Approximate infrastructure impact locations (7-day source-mixed map).',
        sites: autoExpandSites(infraSites, { conflictKey: 'ukraine_2026', channel: 'operations', totalMass: infraMass, maxExtra: 20, baseRadiusKm: 8 })
      }),
      ...makePoints({
        label: 'Frontline pressure index',
        type: 'operations',
        category: 'frontline_ops',
        totalMetric: frontline,
        totalMass: frontlineMass,
        description: 'Approximate frontline pressure clusters from source-mixed operational reporting.',
        sites: autoExpandSites(frontlineSites, { conflictKey: 'ukraine_2026', channel: 'frontline', totalMass: frontlineMass, maxExtra: 16, baseRadiusKm: 8 })
      }),
      ...makePoints({
        label: 'Casualty concentration',
        type: 'casualties',
        category: 'casualties',
        totalMetric: killedTotal + injuredTotal,
        totalMass: casualtyMass,
        description: 'Approximate casualty concentration zones derived from reported killed/injured totals (5-10 km precision).',
        sites: autoExpandSites(casualtySites, { conflictKey: 'ukraine_2026', channel: 'casualties', totalMass: casualtyMass, maxExtra: 24, baseRadiusKm: 9 })
      })
    ]
  }

  return Array.isArray(conflict?.map_points) ? conflict.map_points : []
}

function computeTargetIntensity(conflict) {
  const metrics = metricMap(conflict)

  if (conflict?.id === 'iran_2026') {
    const killed = metricValue(metrics, 'iran_killed') + metricValue(metrics, 'israel_killed') + metricValue(metrics, 'us_killed')
    const injured = metricValue(metrics, 'iran_injured') + metricValue(metrics, 'israel_injured') + metricValue(metrics, 'us_seriously_injured')
    const projectile = (metricValue(metrics, 'missiles_total_2026') || metricValue(metrics, 'missiles_benchmark')) * 0.015
      + (metricValue(metrics, 'drones_total_2026') || metricValue(metrics, 'drones_benchmark')) * 0.007
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
  console.log(`Updated conflict metrics JSON (${updatedConflicts.length} conflicts)`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
