import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const changelogRoot = path.join(root, 'docs/apps')
const appNames = {
  'gitbird': 'GitBird',
  'history-vision': 'History Vision',
  'image-sorter': 'Image Sorter',
  'lingua-latina': 'Lingua Latina',
  'liquid-record': 'Liquid Record',
  'metric-data': 'Metrics Data',
  'morphia': 'Morphia: Living Art',
  'neon-vision-editor': 'Neon Vision Editor',
  'release-assistant': 'Release Assistant',
  'vistral': 'Vistral',
  'x-newsbook': 'X-Newsbook'
}
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function headingDate(heading) {
  const iso = heading.match(/\b(20\d{2}-\d{2}-\d{2})\b/)?.[1]
  if (iso) return iso
  const match = heading.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:\s*[–-]\s*(\d{1,2}))?,?\s+(20\d{2})\b/)
  if (!match) return null
  const month = months.indexOf(match[1])
  const day = Number(match[3] || match[2])
  return new Date(Date.UTC(Number(match[4]), month, day)).toISOString().slice(0, 10)
}

function cleanText(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function latestUpdates() {
  const today = new Date()
  const todayUTC = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  const folders = await fs.readdir(changelogRoot, { withFileTypes: true })
  const updates = []

  for (const folder of folders) {
    if (!folder.isDirectory() || !appNames[folder.name]) continue
    const changelogPath = path.join(changelogRoot, folder.name, 'changelog.md')
    let markdown
    try {
      markdown = await fs.readFile(changelogPath, 'utf8')
    } catch {
      continue
    }

    const match = markdown.match(/^##\s+(.+)$/m)
    if (!match) continue
    const date = headingDate(match[1])
    if (!date) continue
    const ageDays = Math.floor((todayUTC - Date.parse(`${date}T00:00:00Z`)) / 86_400_000)
    if (ageDays < 0 || ageDays > 6) continue

    const section = markdown.slice(markdown.indexOf(match[0]) + match[0].length).split(/^##\s+/m, 1)[0]
    const bullet = section.match(/^\s*-\s+(.+)$/m)?.[1]
    const version = match[1].match(/\bv?\d+\.\d+(?:\.\d+)?\b/)?.[0]
    updates.push({
      slug: folder.name,
      title: appNames[folder.name],
      version: version ? ` ${version.replace(/^v/, '')}` : '',
      date,
      summary: cleanText(bullet || match[1])
    })
  }

  return updates.sort((a, b) => b.date.localeCompare(a.date))
}

function homeMarkup(updates) {
  if (!updates.length) return '<p>No app updates have been documented in the last seven days. Browse the changelog for earlier releases.</p>'
  return updates.map((item) => {
    const date = new Date(`${item.date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    return `      <a href="/apps/${item.slug}/changelog"><time datetime="${item.date}">${date}</time><span><strong>${item.title}${item.version}</strong> ${item.summary}</span><b>↗</b></a>`
  }).join('\n')
}

function catalogueMarkup(updates) {
  if (!updates.length) return '<span class="apps-whats-new-item">No app updates have been documented in the last seven days. Browse the changelog for earlier releases.</span>'
  return updates.map((item) => {
    const date = new Date(`${item.date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    return `    <span class="apps-whats-new-item is-${item.slug}">${date}: ${item.title}${item.version} ${item.summary}</span>`
  }).join('\n')
}

async function replaceContainer(file, className, markup) {
  const filePath = path.join(root, file)
  const content = await fs.readFile(filePath, 'utf8')
  const pattern = new RegExp(`(<div class="${className}">)[\\s\\S]*?(\\n[ \\t]*</div>)`)
  if (!pattern.test(content)) throw new Error(`Could not find ${className} in ${file}`)
  const next = content.replace(pattern, `$1\n${markup}$2`)
  if (next !== content) await fs.writeFile(filePath, next)
}

const updates = await latestUpdates()
await replaceContainer('docs/index.md', 'h3p-home-update-list', homeMarkup(updates))
await replaceContainer('docs/apps/index.md', 'apps-whats-new-items', catalogueMarkup(updates))
console.log(`Refreshed weekly updates from ${updates.length} dated app changelog${updates.length === 1 ? '' : 's'}.`)
