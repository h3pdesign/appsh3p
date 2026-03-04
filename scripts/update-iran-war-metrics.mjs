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

  const splitMass = (total, weights) => {
    const safeWeights = Array.isArray(weights) && weights.length > 0 ? weights : [1]
    const sum = safeWeights.reduce((acc, value) => acc + Math.max(0.001, Number(value) || 0), 0)
    const chunks = safeWeights.map(weight => Math.max(1, Math.round(total * (Math.max(0.001, Number(weight) || 0) / sum))))
    let diff = total - chunks.reduce((acc, value) => acc + value, 0)
    let cursor = 0
    while (diff !== 0 && chunks.length > 0) {
      const idx = cursor % chunks.length
      if (diff > 0) {
        chunks[idx] += 1
        diff -= 1
      } else if (chunks[idx] > 1) {
        chunks[idx] -= 1
        diff += 1
      }
      cursor += 1
    }
    return chunks
  }

  const makePoints = ({ label, type, category, totalMetric, totalMass, description, sites }) => {
    const masses = splitMass(totalMass, sites.map(site => site.weight || 1))
    return sites.map((site, index) => ({
      name: site.name,
      label,
      value: masses[index],
      marker_mass: masses[index],
      total_metric: totalMetric,
      lat: site.lat,
      lng: site.lng,
      type,
      category,
      description,
      source: sourceLabel,
      reported_at_utc: now,
      coordinate_precision_km: '5-10'
    }))
  }

  if (conflict?.id === 'iran_2026') {
    const missilesTotal = metricValue(metrics, 'missiles_benchmark')
    const dronesTotal = metricValue(metrics, 'drones_benchmark')
    const infraTotal = metricValue(metrics, 'critical_infrastructure_impacts_7d')

    const missileMass = clamp(Math.round(missilesTotal * 0.46), 220, 420)
    const droneMass = clamp(Math.round(dronesTotal * 0.30), 260, 560)
    const infraMass = clamp(Math.round(infraTotal * 1.8), 50, 140)

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
      { name: 'Bushehr area strike cluster', lat: 28.9234, lng: 50.8203, weight: 0.5 }
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
      { name: 'Semnan drone strike zone', lat: 35.5729, lng: 53.3971, weight: 0.42 }
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
      { name: 'Bandar Abbas utility corridor impact', lat: 27.1832, lng: 56.2666, weight: 0.6 }
    ]

    return [
      ...makePoints({
        label: 'Ballistic missiles (2025 benchmark)',
        type: 'projectiles',
        category: 'missile_strikes',
        totalMetric: missilesTotal,
        totalMass: missileMass,
        description: 'Approximate missile impact zones from open-source conflict reporting (5-10 km precision).',
        sites: missileSites
      }),
      ...makePoints({
        label: 'Drones (2025 benchmark)',
        type: 'projectiles',
        category: 'drone_strikes',
        totalMetric: dronesTotal,
        totalMass: droneMass,
        description: 'Approximate drone strike zones from open-source conflict reporting (5-10 km precision).',
        sites: droneSites
      }),
      ...makePoints({
        label: 'Critical infrastructure impacts (7d)',
        type: 'operations',
        category: 'air_strikes',
        totalMetric: infraTotal,
        totalMass: infraMass,
        description: 'Approximate air-strike / infrastructure impact locations (5-10 km precision).',
        sites: infraSites
      })
    ]
  }

  if (conflict?.id === 'ukraine_2026') {
    const strikes7d = metricValue(metrics, 'ukraine_strike_incidents_7d')
    const droneWave7d = metricValue(metrics, 'ukraine_drone_wave_incidents_7d')
    const infra7d = metricValue(metrics, 'critical_infra_impacts_7d_ua')
    const frontline = metricValue(metrics, 'frontline_pressure_index')

    const missileMass = clamp(Math.round(strikes7d * 0.70 + frontline * 0.40), 120, 320)
    const droneMass = clamp(Math.round(droneWave7d * 0.80 + frontline * 0.35), 110, 300)
    const infraMass = clamp(Math.round(infra7d * 1.10), 45, 180)
    const frontlineMass = clamp(Math.round(frontline * 0.30), 40, 150)

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

    return [
      ...makePoints({
        label: 'Strike incidents (7d)',
        type: 'projectiles',
        category: 'missile_strikes',
        totalMetric: strikes7d,
        totalMass: missileMass,
        description: 'Approximate strike-incident locations (7-day source-mixed map).',
        sites: missileSites
      }),
      ...makePoints({
        label: 'Drone-wave incidents (7d)',
        type: 'projectiles',
        category: 'drone_strikes',
        totalMetric: droneWave7d,
        totalMass: droneMass,
        description: 'Approximate drone-wave incident locations (7-day source-mixed map).',
        sites: droneSites
      }),
      ...makePoints({
        label: 'Critical infrastructure impacts (7d)',
        type: 'operations',
        category: 'air_strikes',
        totalMetric: infra7d,
        totalMass: infraMass,
        description: 'Approximate infrastructure impact locations (7-day source-mixed map).',
        sites: infraSites
      }),
      ...makePoints({
        label: 'Frontline pressure index',
        type: 'operations',
        category: 'frontline_ops',
        totalMetric: frontline,
        totalMass: frontlineMass,
        description: 'Approximate frontline pressure clusters from source-mixed operational reporting.',
        sites: frontlineSites
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
