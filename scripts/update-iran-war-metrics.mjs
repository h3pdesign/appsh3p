import { readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { archiveMetricReports } from './archive-metric-reports.mjs'
import '../docs/public/polymarket-us-politics/event-evidence.js'

const outputPath = new URL('../docs/public/polymarket-us-politics/data/iran-war-metrics.json', import.meta.url)
const evidencePath = new URL('../docs/public/polymarket-us-politics/data/reviewed-conflict-evidence.json', import.meta.url)

export function applyReviewedEvidence(payload, evidence) {
  for (const conflict of payload.conflicts || []) {
    const reviews = evidence.metric_reviews[conflict.id] || {}
    conflict.subtitle = 'Dated source reports and selected historical incidents. Coverage is incomplete; report dates are not live update times.'
    conflict.confidence = 'See evidence on each record'
    const sources = [...new Map(Object.values(reviews).map(review => [review.source_url, review])).values()]
    for (const [index, prefix] of ['', 'secondary_', 'tertiary_', 'quaternary_'].entries()) {
      conflict[prefix + 'source_name'] = sources[index]?.source_name || ''
      conflict[prefix + 'source_url'] = sources[index]?.source_url || ''
    }
    conflict.metrics = (conflict.metrics || []).map(metric => {
      const review = reviews[metric.id]
      if (!review) return {
        ...metric, previous_unverified_value: metric.previous_unverified_value ?? metric.value,
        value: null, verification_status: 'unverified', confidence: 'Unverified',
        source: 'No reviewed metric-specific evidence', source_name: 'No reviewed metric-specific evidence',
        source_url: '', updated_at_utc: null, reported_as_of: null,
        scope: 'No substantiated figure for this metric and reporting period.', note: '', primary_source_index: null,
        verification_note: 'Previous figure could not be substantiated for its stated scope and reporting period. Withheld pending evidence.'
      }
      return { ...metric, ...review, source: review.source_name, note: review.verification_note,
        confidence: review.verification_status === 'source_verified' ? 'Source verified' : 'Reported claim',
        reviewed_on: evidence.reviewed_on, updated_at_utc: review.reported_as_of }
    })
    const historic = evidence.historical_events.filter(point => point.conflict_id === conflict.id).map(point => ({
      ...point, verification_status: 'verified', verified_at_utc: evidence.reviewed_on + 'T00:00:00Z',
      location_precision: 'approximate locality', label: 'Historical event', description: point.verification_note
    }))
    const retained = (conflict.map_points || []).filter(globalThis.EventEvidence.eligible)
    conflict.map_points = [...new Map([...retained, ...historic].map(point => [point.point_key, point])).values()]
    conflict.map = { ...(conflict.map || {}), points: conflict.map_points }
    conflict.timeline = globalThis.EventEvidence.timeline(conflict.map_points, conflict.id === 'ukraine_2026' ? 'ukraine' : 'iran')
    // The old curves were interpolated from totals, not observed historical data.
    conflict.daily_series = []
    conflict.metric_series = {}
    conflict.data_quality_note = evidence.methodology
    conflict.reviewed_on = evidence.reviewed_on
    conflict.as_of_utc = Object.values(reviews).map(review => review.reported_as_of).sort().at(-1) || null
    conflict.updated_at_utc = conflict.as_of_utc
  }
  payload.reviewed_on = evidence.reviewed_on
  // A scheduled run is not new reporting or a new verification.
  payload.updated_at_utc = payload.conflicts.map(conflict => conflict.as_of_utc).filter(Boolean).sort().at(-1) || null
  return payload
}

async function main() {
  const payload = JSON.parse(await readFile(outputPath, 'utf8'))
  const evidence = JSON.parse(await readFile(evidencePath, 'utf8'))
  const output = applyReviewedEvidence(payload, evidence)
  await writeFile(outputPath, JSON.stringify(output, null, 2) + '\n')
  await archiveMetricReports(output)
  console.log('Applied reviewed evidence; report dates and historical occurrences preserved.')
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(error); process.exitCode = 1 })
}
