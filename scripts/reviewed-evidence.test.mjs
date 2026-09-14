import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { applyReviewedEvidence } from './update-iran-war-metrics.mjs'
import { collectReports } from './archive-metric-reports.mjs'

const evidence = JSON.parse(await readFile(new URL('../docs/public/polymarket-us-politics/data/reviewed-conflict-evidence.json', import.meta.url)))
const seed = { conflicts: [{ id: 'iran_2026', metrics: [{ id: 'air_defense_intercepts_7d', value: 9999 }, { id: 'unknown', value: 123 }], daily_series: [{ value: 88 }] }, { id: 'ukraine_2026', metrics: [{ id: 'ukr_civilians_killed_reported', value: 99999 }] }] }
test('unsupported numbers and generated series are not republished', () => {
  const output = applyReviewedEvidence(structuredClone(seed), evidence)
  assert.equal(output.conflicts[0].metrics[1].value, null)
  assert.equal(output.conflicts[0].metrics[1].previous_unverified_value, 123)
  assert.deepEqual(output.conflicts[0].daily_series, [])
  assert.deepEqual(output.conflicts[0].metric_series, {})
})
test('reviewed reports can correct numbers downward without changing report dates', () => {
  const output = applyReviewedEvidence(structuredClone(seed), evidence)
  assert.equal(output.conflicts[0].metrics[0].value, 2228)
  assert.equal(output.conflicts[0].metrics[0].reported_as_of, '2026-03-27')
  assert.equal(output.conflicts[1].metrics[0].value, 16874)
  assert.deepEqual(applyReviewedEvidence(structuredClone(output), evidence), output)
})
test('all eight dated historic events survive refresh and evidence filtering', () => {
  const output = applyReviewedEvidence(structuredClone(seed), evidence)
  const points = output.conflicts.flatMap(conflict => conflict.map_points)
  assert.equal(points.length, 8)
  assert(points.every(globalThis.EventEvidence.eligible))
  assert.equal(globalThis.EventEvidence.dateLabel(points[0]), '2025-06-14 (time not specified)')
  assert.equal(globalThis.EventEvidence.timestamp({ occurred_on: '2025-02-30' }), null)
})
test('archive ignores unverified figures and uses report dates, not refresh time', () => {
  const output = applyReviewedEvidence(structuredClone(seed), evidence)
  const archive = collectReports({}, output)
  assert.equal(archive['iran:unknown'], undefined)
  assert.equal(archive['iran:air_defense_intercepts_7d'][0].at, '2026-03-27')
})
