import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { collectReports } from './archive-metric-reports.mjs'

class Element {
  constructor(tag) { this.tag = tag; this.children = []; this.attributes = {}; this.textContent = '' }
  append(...nodes) { this.children.push(...nodes) }
  setAttribute(key, value) { this.attributes[key] = value }
}
const flatten = node => [node, ...node.children.flatMap(flatten)]
async function render(rows, value = 10) {
  const document = {
    currentScript: { src: 'https://example.test/metric-timeline.js' },
    createElement: tag => new Element(tag), createElementNS: (_, tag) => new Element(tag)
  }
  const context = { window: {}, document, URL, fetch: async () => ({ ok: true, json: async () => ({ 'iran:test': rows }) }) }
  vm.runInNewContext(readFileSync(new URL('../docs/public/polymarket-us-politics/metric-timeline.js', import.meta.url), 'utf8'), context)
  const card = new Element('article'), delta = new Element('div')
  await context.window.MetricTimeline.render(card, { id: 'test', value, scope: 'total' }, '2026-09-14T04:00:00Z', 'iran', delta)
  return { nodes: flatten(card), delta }
}
const report = (value, at = '2026-09-13T04:00:00Z', scope = 'total') => ({ value, at, scope })
test('single report has no dot, chart, or redundant disclosure', async () => {
  const { nodes } = await render([])
  assert.equal(nodes.some(n => ['svg', 'details'].includes(n.tag)), false)
  assert(nodes.some(n => n.textContent === 'No comparable earlier report.'))
})
test('unchanged archived reports show a compact summary', async () => {
  const { nodes, delta } = await render([report(10)])
  assert.equal(nodes.some(n => n.tag === 'svg'), false)
  assert(nodes.some(n => n.textContent === 'Unchanged across 2 reports'))
  assert.equal(delta.textContent, 'No net change')
})
test('downward corrections have a step graph and signed revision', async () => {
  const { nodes, delta } = await render([report(20)])
  assert(nodes.some(n => n.tag === 'path' && n.attributes.d.includes('H')))
  assert.equal(delta.textContent, '-10 in period')
})
test('incompatible scopes and future reports are excluded', async () => {
  const { nodes } = await render([report(20, undefined, 'other'), report(20, '2026-09-15T04:00:00Z')])
  assert.equal(nodes.some(n => n.tag === 'svg'), false)
})
test('archive captures actual metric totals, deduplicating feed timestamps', () => {
  const feed = { conflicts: [{ id: 'iran_2026', as_of_utc: '2026-09-14T04:00:00Z', metrics: [{ id: 'test', value: 12 }] }] }
  const archive = collectReports({}, feed)
  collectReports(archive, feed)
  assert.equal(archive['iran:test'].length, 1)
  assert.equal(archive['iran:test'][0].value, 12)
})
