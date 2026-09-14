(() => {
  const archiveURL = new URL('./data/metric-reports.json', document.currentScript.src);
  const archive = fetch(archiveURL).then(response => {
    if (!response.ok) throw new Error('Report history unavailable');
    return response.json();
  }).catch(() => ({}));
  const date = value => new Date(value).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'UTC'
  });
  const number = value => value.toLocaleString('en-GB');
  function merge(rows, point) {
    const valid = rows.filter(row => Number.isFinite(row?.value) && Number.isFinite(Date.parse(row?.at)));
    if (Number.isFinite(point.value) && Number.isFinite(Date.parse(point.at))) {
      const index = valid.findIndex(row => Date.parse(row.at) === Date.parse(point.at));
      if (index < 0) valid.push(point);
      else valid[index] = point;
    }
    return valid.sort((a, b) => Date.parse(a.at) - Date.parse(b.at)).slice(-120);
  }
  async function render(card, metric, asOf, moduleKey, deltaNode) {
    deltaNode.textContent = '';
    const saved = await archive;
    const scope = metric.scope || metric.definition || '';
    let rows = Array.isArray(saved[`${moduleKey}:${metric.id}`]) ? saved[`${moduleKey}:${metric.id}`] : [];
    rows = rows.filter(row => row.scope === scope && Date.parse(row.at) <= Date.parse(asOf));
    rows = merge(rows, { at: asOf, value: metric.value == null ? NaN : Number(metric.value) });
    const previous = rows.length > 1 ? rows[0] : null;
    const current = rows[rows.length - 1];
    const change = previous && current ? current.value - previous.value : null;
    deltaNode.className = 'metric-delta';
    deltaNode.textContent = change === null ? '' : change === 0 ? 'No net change' : `${change > 0 ? '+' : ''}${number(change)} in period`;
    deltaNode.title = previous ? `Net revision since ${date(previous.at)} UTC; not a daily event count.` : 'No comparable earlier report is available.';

    const panel = document.createElement('div');
    panel.className = 'metric-timeline';
    const caption = document.createElement('div');
    caption.className = 'metric-timeline-caption';
    const changed = rows.some(row => row.value !== current?.value);
    caption.textContent = rows.length < 2 ? 'Latest report' : changed ? 'Reported total revisions' : `Unchanged across ${rows.length} reports`;
    panel.append(caption);
    if (!current) {
      caption.textContent = 'Report timestamp unavailable';
      card.append(panel);
      return;
    }
    if (rows.length > 1 && changed && metric.id !== 'conflict_duration_days') {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 260 48');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', `${rows.length} recorded report snapshots. Latest ${number(current.value)} at ${date(current.at)} UTC. Not daily event counts.`);
    const min = Math.min(...rows.map(row => row.value));
    const max = Math.max(...rows.map(row => row.value));
    const start = Date.parse(rows[0].at);
    const duration = Date.parse(current.at) - start;
    const points = rows.map(row => ({
      x: duration ? 6 + (Date.parse(row.at) - start) / duration * 248 : 130,
      y: max === min ? 24 : 40 - (row.value - min) / (max - min) * 32,
      row
    }));
    if (points.length > 1) {
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', points.map((p, i) => i ? `H${p.x} V${p.y}` : `M${p.x} ${p.y}`).join(' '));
      svg.append(path);
    }
    for (const [index, p] of points.entries()) {
      if (index > 0 && index < points.length - 1 && p.row.value === points[index - 1].row.value) continue;
      const dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y); dot.setAttribute('r', '3');
      const title = document.createElementNS(ns, 'title');
      title.textContent = `${date(p.row.at)} UTC: ${number(p.row.value)}`;
      dot.append(title); svg.append(dot);
    }
    panel.append(svg);
    const range = document.createElement('div');
    range.className = 'metric-timeline-dates';
    range.textContent = `Range: ${number(min)} - ${number(max)}`;
    panel.append(range);
    }
    const dates = document.createElement('div');
    dates.className = 'metric-timeline-dates';
    for (const at of rows.length > 1 ? [rows[0].at, current.at] : [current.at]) {
      const time = document.createElement('time'); time.dateTime = at; time.textContent = `${date(at)} UTC`; dates.append(time);
    }
    panel.append(dates);
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = `Report history (${rows.length})`;
    details.append(summary);
    const list = document.createElement('ol');
    for (const row of [...rows].reverse()) {
      const item = document.createElement('li'); item.textContent = `${date(row.at)} UTC: ${number(row.value)}`; list.append(item);
    }
    details.append(list);
    if (rows.length > 1) panel.append(details);
    else {
      const note = document.createElement('div');
      note.className = 'metric-timeline-note';
      note.textContent = 'No comparable earlier report.';
      panel.append(note);
    }
    card.append(panel);
  }
  window.MetricTimeline = { merge, render };
})();
