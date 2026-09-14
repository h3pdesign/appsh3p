import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import test from 'node:test'
import { validateReviewedFeed } from './validate-reviewed-feed.mjs'

const read = name => JSON.parse(readFileSync(new URL(`../docs/public/polymarket-us-politics/data/${name}.json`, import.meta.url)))
const evidence = read('reviewed-conflict-evidence')
test('accepts corrected totals, evidence gaps and historical report dates', () => {
  validateReviewedFeed(read('iran-war-metrics'), evidence)
})
for (const [name, mutate] of [
  ['inflated total', feed => { feed.conflicts[0].metrics[0].value = 999999 }],
  ['missing Ukraine metric', feed => { feed.conflicts[1].metrics = [] }],
  ['missing historic event', feed => { feed.conflicts[0].map_points.pop() }],
  ['refresh masquerading as report date', feed => { feed.updated_at_utc = new Date().toISOString() }],
  ['invented trend', feed => { feed.conflicts[0].daily_series = [1, 2] }],
]) {
  test(`rejects ${name}`, () => {
    const feed = read('iran-war-metrics')
    mutate(feed)
    assert.throws(() => validateReviewedFeed(feed, evidence))
  })
}
