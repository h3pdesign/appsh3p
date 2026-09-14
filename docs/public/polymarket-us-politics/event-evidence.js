// Occurrence time and an event-specific reviewed citation are required for map events.
globalThis.EventEvidence = (() => {
  function timestamp(point) {
    if (typeof point?.occurred_on === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(point.occurred_on)) {
      const day = Date.parse(point.occurred_on + 'T00:00:00Z');
      return Number.isFinite(day) && new Date(day).toISOString().slice(0, 10) === point.occurred_on && day <= Date.now() ? day : null;
    }
    const raw = point?.occurred_at_utc;
    if (typeof raw !== 'string' || !/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(raw)) return null;
    const value = Date.parse(raw);
    return Number.isFinite(value) && value <= Date.now() ? value : null;
  }
  function dateLabel(point) {
    if (point.occurred_on) return point.occurred_on + ' (time not specified)';
    const at = timestamp(point);
    return at === null ? 'Date unknown' : new Date(at).toISOString().slice(0, 19).replace('T', ' ') + ' UTC';
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
      timestamp_utc: point.occurred_at_utc || point.occurred_on,
      time: dateLabel(point),
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
  function renderMetricReview(card, metric, value, badge, delta) {
    const supported = ['source_verified', 'reported_claim'].includes(metric.verification_status);
    value.textContent = supported ? (metric.value_prefix || '') + Number(metric.value).toLocaleString('en-US') : 'Unavailable';
    badge.textContent = supported ? (metric.verification_status === 'source_verified' ? 'Source verified' : 'Reported claim') : 'Unverified';
    badge.title = metric.verification_note || 'No reviewed evidence';
    badge.setAttribute('aria-label', badge.textContent + ': ' + badge.title);
    card.querySelectorAll('.metric-card-source-dot, .metric-card-scope-dot').forEach(node => node.remove());
    value.style.fontSize = supported ? '' : '24px';
    delta.textContent = '';
    const note = document.createElement('p');
    note.className = 'metric-evidence-note';
    note.textContent = supported ? 'Reported as of ' + metric.reported_as_of + ' · Reviewed ' + metric.reviewed_on + '. ' + metric.scope : metric.verification_note;
    card.appendChild(note);
    if (supported) {
      const link = document.createElement('a');
      link.href = metric.source_url;
      link.textContent = metric.source_name;
      link.target = '_blank'; link.rel = 'noopener noreferrer';
      card.appendChild(link);
    }
  }
  return { timestamp, dateLabel, eligible, timeline, sanitize, renderMetricReview };
})();
