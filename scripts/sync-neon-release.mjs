import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const APP_KEY = process.argv[2] || process.env.SYNC_APP || 'neon'
const REPO_ARG = process.argv[3] || process.env.SYNC_REPO || ''

const APPS = {
  neon: {
    defaultRepo: 'h3pdesign/Neon-Vision-Editor',
    overviewPath: 'docs/apps/neon-vision-editor/overview.md',
    changelogPath: 'docs/apps/neon-vision-editor/changelog.md',
    timelineClass: 'neon',
    updateOverview(content, rel) {
      let out = content
      out = out.replace(/(<p class="overview-last-updated">Last updated: )[^<]+(<\/p>)/, `$1${rel.publishedLong}$2`)
      out = out.replace(/(<div><span>latest version<\/span><strong>)v\d+\.\d+\.\d+(<\/strong><\/div>)/, `$1${rel.tag}$2`)
      out = out.replace(/\[Latest GitHub Release \(v\d+\.\d+\.\d+\)\]\(https:\/\/github.com\/h3pdesign\/Neon-Vision-Editor\/releases\/tag\/v\d+\.\d+\.\d+\)/, `[Latest GitHub Release (${rel.tag})](${rel.url})`)
      return out
    },
    updateHome(content, rel) {
      return content.replace(/Neon Vision Editor v\d+\.\d+\.\d+ release notes and docs refresh/g, `Neon Vision Editor ${rel.tag} release notes and docs refresh`)
    },
    updateLayout(content, rel) {
      let out = content
      out = out.replace(/('neon-vision-editor': ')[^']+(',)/, `$1${rel.publishedLong}$2`)
      out = out.replace(/(<p><strong>Neon Vision Editor )v\d+\.\d+\.\d+(<\/strong> published on )[^.]+(\.<\/p>)/, `$1${rel.tag}$2${rel.publishedLong}$3`)
      out = out.replace(/https:\/\/github.com\/h3pdesign\/Neon-Vision-Editor\/releases\/tag\/v\d+\.\d+\.\d+/, rel.url)
      return out
    },
    updateChangelog(content, rel) {
      let out = content
      out = out.replace(/(_Source: GitHub Releases for \[Neon Vision Editor\]\(https:\/\/github.com\/h3pdesign\/Neon-Vision-Editor\)\. Last synced on )[^.]+(\._)/, `$1${rel.publishedLong}$2`)
      out = out.replace(/## v\d+\.\d+\.\d+ \(published [^)]+\)/, `## ${rel.tag} (published ${rel.publishedLong})`)
      out = out.replace(/Release link: \[GitHub Release v\d+\.\d+\.\d+\]\(https:\/\/github.com\/h3pdesign\/Neon-Vision-Editor\/releases\/tag\/v\d+\.\d+\.\d+\)/, `Release link: [GitHub Release ${rel.tag}](${rel.url})`)
      const blockRegex = /(Release link: \[GitHub Release [^\n]+\]\([^\n]+\)\n\n)([\s\S]*?)(\n## v\d+\.\d+\.\d+ \(published)/
      if (blockRegex.test(out)) {
        out = out.replace(blockRegex, (_, head, __, next) => `${head}${rel.bullets.join('\n')}\n${next}`)
      }
      return out
    }
  },
  metric: {
    defaultRepo: 'h3pdesign/Metrics',
    overviewPath: 'docs/apps/metric-data/overview.md',
    changelogPath: 'docs/apps/metric-data/changelog.md',
    timelineClass: 'metric',
    updateOverview(content, rel) {
      let out = content
      out = out.replace(/(<p class="overview-last-updated">Last updated: )[^<]+(<\/p>)/, `$1${rel.publishedLong}$2`)
      out = out.replace(/(<div><span>latest version<\/span><strong>)[^<]+(<\/strong><\/div>)/, `$1${rel.tag}$2`)
      return out
    },
    updateHome(content, rel) {
      return content.replace(/Metric Data overview now iPad-first with metadata and support docs/g, `Metric Data ${rel.tag} docs and support updates`)    
    },
    updateLayout(content, rel) {
      return content.replace(/('metric-data': ')[^']+(',)/, `$1${rel.publishedLong}$2`)
    },
    updateChangelog(content, rel) {
      let out = content
      out = out.replace(/^## [^\n]+/m, `## ${rel.tag} (published ${rel.publishedLong})`)
      return out
    }
  },
  'release-assistant': {
    defaultRepo: 'h3pdesign/Release-Assistant',
    overviewPath: 'docs/apps/release-assistant/overview.md',
    changelogPath: 'docs/apps/release-assistant/changelog.md',
    timelineClass: 'release',
    updateOverview(content, rel) {
      let out = content
      out = out.replace(/(<p class="overview-last-updated">Last updated: )[^<]+(<\/p>)/, `$1${rel.publishedLong}$2`)
      out = out.replace(/(<div><span>latest version<\/span><strong>)[^<]+(<\/strong><\/div>)/, `$1${rel.tag}$2`)
      return out
    },
    updateHome(content, rel) {
      return content.replace(/Release Assistant workflow, gallery, and FAQ expanded/g, `Release Assistant ${rel.tag} workflow and docs expanded`)
    },
    updateLayout(content, rel) {
      return content.replace(/('release-assistant': ')[^']+(',)/, `$1${rel.publishedLong}$2`)
    },
    updateChangelog(content, rel) {
      let out = content
      out = out.replace(/^## [^\n]+/m, `## ${rel.tag} (published ${rel.publishedLong})`)
      return out
    }
  }
}

if (!APPS[APP_KEY]) {
  console.error(`Unsupported app key: ${APP_KEY}`)
  process.exit(1)
}

const app = APPS[APP_KEY]
const repo = REPO_ARG || app.defaultRepo
const api = `https://api.github.com/repos/${repo}/releases/latest`

function formatLongDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

function formatIsoDate(iso) {
  return new Date(iso).toISOString().slice(0, 10)
}

function extractReleaseBullets(body) {
  const lines = (body || '').split(/\r?\n/)
  const bullets = lines
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- ') || l.startsWith('* '))
    .slice(0, 10)
    .map((l) => (l.startsWith('* ') ? `- ${l.slice(2)}` : l))
  return bullets.length ? bullets : ['- Release notes are available in the linked GitHub release.']
}

async function fetchLatestRelease() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'appsh3p-version-sync'
  }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  const res = await fetch(api, { headers })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to fetch latest release for ${repo}: ${res.status} ${text}`)
  }

  const json = await res.json()
  return {
    tag: json.tag_name,
    url: json.html_url,
    publishedIso: json.published_at,
    publishedLong: formatLongDate(json.published_at),
    publishedDate: formatIsoDate(json.published_at),
    bullets: extractReleaseBullets(json.body || '')
  }
}

async function read(relPath) {
  return fs.readFile(path.join(ROOT, relPath), 'utf8')
}

async function writeIfChanged(relPath, content) {
  const filePath = path.join(ROOT, relPath)
  const before = await fs.readFile(filePath, 'utf8')
  if (before !== content) {
    await fs.writeFile(filePath, content)
    return true
  }
  return false
}

async function main() {
  const rel = await fetchLatestRelease()
  console.log(`[${APP_KEY}] Latest release: ${rel.tag} (${rel.publishedLong}) from ${repo}`)

  const changed = []

  const indexPath = 'docs/index.md'
  const appsIndexPath = 'docs/apps/index.md'
  const layoutPath = 'docs/.vitepress/theme/Layout.vue'

  const index = app.updateHome(await read(indexPath), rel)
  if (await writeIfChanged(indexPath, index)) changed.push(indexPath)

  let appsIndex = await read(appsIndexPath)
  appsIndex = appsIndex.replace(
    new RegExp(`(<div class=\\"apps-release-item ${app.timelineClass}\\"><span class=\\"name\\">[^<]+<\\/span><span class=\\"tag\\">)[^<]+(<\\/span><span class=\\"date\\">)\\d{4}-\\d{2}-\\d{2}(<\\/span><\\/div>)`),
    `$1${rel.tag}$2${rel.publishedDate}$3`
  )
  if (await writeIfChanged(appsIndexPath, appsIndex)) changed.push(appsIndexPath)

  const overview = app.updateOverview(await read(app.overviewPath), rel)
  if (await writeIfChanged(app.overviewPath, overview)) changed.push(app.overviewPath)

  const layout = app.updateLayout(await read(layoutPath), rel)
  if (await writeIfChanged(layoutPath, layout)) changed.push(layoutPath)

  const changelog = app.updateChangelog(await read(app.changelogPath), rel)
  if (await writeIfChanged(app.changelogPath, changelog)) changed.push(app.changelogPath)

  if (changed.length === 0) {
    console.log('No version changes needed.')
  } else {
    console.log('Updated files:')
    changed.forEach((f) => console.log(`- ${f}`))
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
