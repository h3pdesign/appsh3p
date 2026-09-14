// Occurrence time and an event-specific reviewed citation are required for map events.
globalThis.EventEvidence = (() => {
  function timestamp(point) {
    const raw = point?.occurred_at_utc;
    if (typeof raw !== 'string' || !/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(raw)) return null;
    const value = Date.parse(raw);
    return Number.isFinite(value) && value <= Date.now() ? value : null;
  }
  function eligible(point) {
    let url;
    try { url = new URL(point?.source_url); } catch { return false; }
    return timestamp(point) !== null && point.verification_status === 'verified'
      && point.synthetic !== true && !/hotspot \d{4}-/.test(point.name || '')
      && ['http:', 'https:'].includes(url.protocol)
      && typeof point.verification_note === 'string' && point.verification_note.trim().length > 0
      && Number.isFinite(Date.parse(point.verified_at_utc)) && Date.parse(point.verified_at_utc) <= Date.now()
      && Number.isFinite(point.lat) && Math.abs(point.lat) <= 90
      && Number.isFinite(point.lng) && Math.abs(point.lng) <= 180;
  }
  function timeline(points, module) {
    return points.filter(eligible).map(point => ({
      timestamp_utc: point.occurred_at_utc,
      time: point.occurred_at_utc,
      text: point.name || point.label,
      category: point.category || point.type,
      map_point_key: point.point_key,
      map_module: module,
      source_url: point.source_url
    }));
  }
  function sanitize(feed) {
    for (const conflict of Array.isArray(feed.conflicts) ? feed.conflicts : []) {
      const points = Array.isArray(conflict.map_points) ? conflict.map_points : [];
      const accepted = points.filter(eligible);
      conflict.excluded_unverified_points = points.length - accepted.length;
      conflict.map_points = accepted;
      if (conflict.map) conflict.map.points = accepted;
      conflict.timeline = timeline(accepted, conflict.id === 'ukraine_2026' ? 'ukraine' : 'iran');
    }
    return feed;
  }
  return { timestamp, eligible, timeline, sanitize };
})();
