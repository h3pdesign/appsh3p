import { readFile, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const feedPath = 'docs/public/polymarket-us-politics/data/iran-war-metrics.json'
const archivePath = new URL('../docs/public/polymarket-us-politics/data/metric-reports.json', import.meta.url)

export function collectReports(archive, feed) {
  for (const conflict of feed.conflicts || []) {
    const module = { iran_2026: 'iran', ukraine_2026: 'ukraine' }[conflict.id]
    const at = conflict.as_of_utc || conflict.updated_at_utc || feed.updated_at_utc
    if (!module || !Number.isFinite(Date.parse(at))) continue
    for (const metric of conflict.metrics || []) {
      if (!metric.id || metric.value == null || !Number.isFinite(Number(metric.value))) continue
      const key = `${module}:${metric.id}`
      const rows = (archive[key] || []).filter(row => row.at !== at)
      rows.push({ at, value: Number(metric.value), scope: metric.scope || metric.definition || '' })
      archive[key] = rows.sort((a, b) => Date.parse(a.at) - Date.parse(b.at)).slice(-120)
    }
  }
  return archive
}

export async function archiveMetricReports(feed) {
  let archive = {}
  try { archive = JSON.parse(await readFile(archivePath, 'utf8')) } catch (error) { if (error.code !== 'ENOENT') throw error }
  collectReports(archive, feed)
  await writeFile(archivePath, `${JSON.stringify(archive)}\n`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('..', import.meta.url))
  const commits = execFileSync('git', ['log', '-60', '--format=%H', '--', feedPath], { cwd: root, encoding: 'utf8' }).trim().split('\n').filter(Boolean).reverse()
  const archive = {}
  for (const commit of commits) {
    const feed = JSON.parse(execFileSync('git', ['show', `${commit}:${feedPath}`], { cwd: root, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }))
    collectReports(archive, feed)
  }
  collectReports(archive, JSON.parse(await readFile(new URL(`../${feedPath}`, import.meta.url), 'utf8')))
  await writeFile(archivePath, `${JSON.stringify(archive)}\n`)
  console.log(`Archived ${commits.length} saved feeds across ${Object.keys(archive).length} metrics`)
}
