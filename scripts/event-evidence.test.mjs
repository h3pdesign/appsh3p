import test from 'node:test';
import assert from 'node:assert/strict';
import '../docs/public/polymarket-us-politics/event-evidence.js';

const evidence = globalThis.EventEvidence;
const event = {
  name: 'Test event', occurred_at_utc: '2020-01-02T03:00:00Z',
  reported_at_utc: '2020-01-05T09:00:00Z', source_url: 'https://example.org/event/1',
  verification_status: 'verified', verification_note: 'Occurrence and location checked against source.',
  verified_at_utc: '2020-01-05T09:00:00Z', lat: 35, lng: 51
};
test('unrelated news feeds remain untouched', () => {
  const news = { conflicts: { iran: [] } };
  assert.equal(evidence.sanitize(news), news);
});
test('occurrence time never falls back to refresh or report time', () => {
  assert.equal(evidence.timestamp(event), Date.parse(event.occurred_at_utc));
  assert.equal(evidence.timestamp({ reported_at_utc: event.reported_at_utc }), null);
});
test('event evidence and valid coordinates are required', () => {
  assert.equal(evidence.eligible(event), true);
  for (const change of [{ source_url: '' }, { verification_note: '' }, { verification_status: 'unverified' },
    { synthetic: true }, { name: 'Tehran hotspot 2026-09-14T04 #113' }, { lat: 100 },
    { occurred_at_utc: '2999-01-01T00:00:00Z' }, { verified_at_utc: '2999-01-01T00:00:00Z' }]) {
    assert.equal(evidence.eligible({ ...event, ...change }), false);
  }
});
test('sanitation removes unsupported points and builds timeline from occurrence dates', () => {
  const feed = evidence.sanitize({ conflicts: [{ id: 'iran_2026', map: {},
    map_points: [event, { name: 'Generated point', reported_at_utc: event.reported_at_utc }],
    timeline: [{ text: 'Source chain verified' }] }] });
  const conflict = feed.conflicts[0];
  assert.deepEqual(conflict.map_points, [event]);
  assert.deepEqual(conflict.map.points, [event]);
  assert.equal(conflict.timeline[0].timestamp_utc, event.occurred_at_utc);
  assert.equal(conflict.excluded_unverified_points, 1);
});
