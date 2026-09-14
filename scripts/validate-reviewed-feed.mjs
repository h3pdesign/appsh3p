import assert from 'node:assert/strict'
import { applyReviewedEvidence } from './update-iran-war-metrics.mjs'

export function validateReviewedFeed(feed, evidence) {
  const expected = applyReviewedEvidence(structuredClone(feed), evidence)
  for (const id of Object.keys(evidence.metric_reviews)) {
    const conflict = feed.conflicts.find(item => item.id === id)
    assert.ok(conflict, `Missing reviewed conflict ${id}`)
    const ids = conflict.metrics.map(metric => metric.id)
    assert.equal(new Set(ids).size, ids.length, `${id}: duplicate metrics`)
    for (const metricId of Object.keys(evidence.metric_reviews[id])) {
      assert.ok(ids.includes(metricId), `${id}: missing reviewed metric ${metricId}`)
    }
    for (const metric of conflict.metrics) {
      const review = evidence.metric_reviews[id][metric.id]
      if (review) {
        assert.ok(Number.isFinite(review.value) && review.value >= 0, `${metric.id}: invalid reviewed value`)
        assert.ok(/^https?:\/\//.test(review.source_url) && review.scope && review.verification_note,
          `${metric.id}: incomplete evidence`)
        assert.ok(['source_verified', 'reported_claim'].includes(review.verification_status), `${metric.id}: invalid status`)
        assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(review.reported_as_of) &&
          Number.isFinite(Date.parse(review.reported_as_of)) && Date.parse(review.reported_as_of) <= Date.now(),
        `${metric.id}: invalid report date`)
      } else {
        assert.ok(evidence.metric_gaps?.[metric.id], `${metric.id}: missing evidence limitation`)
      }
    }
    for (const point of conflict.map_points) {
      assert.ok(globalThis.EventEvidence.eligible(point), `${id}: invalid historical event ${point.point_key}`)
    }
    assert.equal(new Set(conflict.map_points.map(point => point.point_key)).size, conflict.map_points.length,
      `${id}: duplicate historical events`)
    const projected = expected.conflicts.find(item => item.id === id)
    for (const field of ['metrics', 'map_points', 'timeline', 'daily_series', 'metric_series', 'as_of_utc', 'updated_at_utc', 'reviewed_on']) {
      assert.deepEqual(conflict[field], projected[field], `${id}: ${field} differs from reviewed evidence; run the evidence updater`)
    }
    assert.deepEqual(conflict.map.points, conflict.map_points, `${id}: map copies differ`)
  }
  assert.equal(feed.updated_at_utc, expected.updated_at_utc, 'Feed timestamp must reflect reporting, not execution time')
}
