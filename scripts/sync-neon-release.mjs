import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const APP_KEY = process.argv[2] || process.env.SYNC_APP || 'neon'
const REPO_ARG = process.argv[3] || process.env.SYNC_REPO || ''
const ALLOW_MISSING_RELEASE_REPO = process.env.SYNC_ALLOW_MISSING_REPO === '1'

const APPS = {
  neon: {
    defaultRepo: 'h3pdesign/Neon-Vision-Editor',
    overviewPath: 'docs/apps/neon-vision-editor/overview.md',
    changelogPath: 'docs/apps/neon-vision-editor/changelog.md',
    timelineClass: 'neon',
    updateOverview(content, rel) {
      let out = content
      out = out.replace(/(<p class="overview-last-updated">Last updated: <span data-date=")\d{4}-\d{2}-\d{2}(">)[^<]+(<\/span><\/p>)/, `$1${rel.publishedDate}$2${rel.publishedLong}$3`)
      out = out.replace(/(<p class="overview-last-updated">Last updated: )[^<]+(<\/p>)/, `$1${rel.publishedLong}$2`)
      out = out.replace(/(<div><span>latest version<\/span><strong>)v\d+\.\d+\.\d+(<\/strong><\/div>)/, `$1${rel.tag}$2`)
      out = out.replace(/\[Latest GitHub Release \(v\d+\.\d+\.\d+\)\]\(https:\/\/github.com\/h3pdesign\/Neon-Vision-Editor\/releases\/tag\/v\d+\.\d+\.\d+\)/, `[Latest GitHub Release (${rel.tag})](${rel.url})`)
      out = out.replace(
        /(<a class="overview-download-badge overview-download-github" href=")https:\/\/github.com\/h3pdesign\/Neon-Vision-Editor\/releases\/tag\/v\d+\.\d+\.\d+("[^>]*>[\s\S]*?<strong>)GitHub v\d+\.\d+\.\d+(<\/strong>)/,
        `$1${rel.url}$2GitHub ${rel.tag}$3`
      )
      out = out.replace(/Direct GitHub releases currently track v\d+\.\d+\.\d+\./, `Direct GitHub releases currently track ${rel.tag}.`)
      out = out.replace(/("softwareVersion":")\d+\.\d+\.\d+(")/, `$1${rel.tag.replace(/^v/, '')}$2`)
      return out
    },
    updateHome(content, rel) {
      let out = content
      out = out.replace(
        /(<a href="\/apps\/neon-vision-editor\/changelog"><strong data-date=")\d{4}-\d{2}-\d{2}(">)[^<]+(<\/strong>: Neon Vision Editor )v\d+\.\d+\.\d+( release notes and docs refresh<\/a>)/,
        `$1${rel.publishedDate}$2${rel.publishedShort}$3${rel.tag}$4`
      )
      out = out.replace(/Neon Vision Editor v\d+\.\d+\.\d+ release notes and docs refresh/g, `Neon Vision Editor ${rel.tag} release notes and docs refresh`)
      out = out.replace(
        /(<article class="startpage-release-item release-neon">[\s\S]*?<span>)v\d+\.\d+\.\d+(<\/span>)/,
        `$1${rel.tag}$2`
      )
      out = out.replace(
        /(<article class="startpage-release-item release-neon">[\s\S]*?<span data-date=")\d{4}-\d{2}-\d{2}(">)[^<]+(<\/span>)/,
        `$1${rel.publishedDate}$2${rel.publishedShort}$3`
      )
      out = out.replace(/https:\/\/github.com\/h3pdesign\/Neon-Vision-Editor\/releases\/tag\/v\d+\.\d+\.\d+/, rel.url)
      out = out.replace(/(<span>Neon release published )[^<]+(<\/span>)/, `$1${rel.publishedShort}$2`)
      out = out.replace(/(<span class="startpage-updated-date">)updated [^<]+(<\/span>)/, `$1updated ${rel.publishedShort}$2`)
      out = out.replace(/(<span class="startpage-synced-badge">)GitHub synced [^<]+(<\/span>)/, `$1GitHub synced ${rel.publishedShort}$2`)
      return out
    },
    updateLayout(content, rel) {
      let out = content
      out = out.replace(/('neon-vision-editor': ')[^']+(',)/, `$1${rel.publishedLong}$2`)
      out = out.replace(/(<p><strong>Neon Vision Editor )v\d+\.\d+\.\d+(<\/strong> published on )[^.]+(\.<\/p>)/, `$1${rel.tag}$2${rel.publishedLong}$3`)
      out = out.replace(/https:\/\/github.com\/h3pdesign\/Neon-Vision-Editor\/releases\/tag\/v\d+\.\d+\.\d+/, rel.url)
      out = out.replace(/(<span data-date=")\d{4}-\d{2}-\d{2}(">)\w+ \d{1,2}, \d{4}(<\/span><\/a><\/div>)/, `$1${rel.publishedDate}$2${rel.publishedLong}$3`)
      return out
    },
    updateChangelog(content, rel, history = [rel]) {
      let out = content
      out = out.replace(
        /_Source: (?:GitHub Releases for \[Neon Vision Editor\]\(https:\/\/github.com\/h3pdesign\/Neon-Vision-Editor\)|local Neon Vision Editor changelog and README)\. Last synced on [^.]+\._/,
        `_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on ${rel.publishedLong}._`
      )
      const versionHeading = /^## (v\d+\.\d+\.\d+) \(published [^)]+\)/gm
      const firstVersion = versionHeading.exec(out)
      if (!firstVersion) return out

      const historyTags = new Set(history.map((entry) => entry.tag))
      const nextUnmanaged = [...out.matchAll(versionHeading)]
        .find((match) => !historyTags.has(match[1]))
      const suffix = nextUnmanaged
        ? out.slice(nextUnmanaged.index)
        : '\n## v1.0.0 milestone context\n\n'
      const blocks = history.map((entry) => [
        `## ${entry.tag} (published ${entry.publishedLong})`,
        '',
        `Release link: [GitHub Release ${entry.tag}](${entry.url})`,
        '',
        entry.bullets.join('\n'),
        ''
      ].join('\n'))
      return `${out.slice(0, firstVersion.index)}${blocks.join('\n')}${suffix}`
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
      return content.replace(/Metrics Data overview now iPad-first with metadata and support docs/g, `Metrics Data ${rel.tag} docs and support updates`)    
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

function formatShortDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

function extractReleaseBullets(body) {
  const lines = (body || '').split(/\r?\n/)
  const bullets = lines
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- ') || l.startsWith('* '))
    .map((l) => (l.startsWith('* ') ? `- ${l.slice(2)}` : l))
    .map((l) => l.replace(/!\[[^\]]*]\([^)]+\)/g, '').replace(/\s{2,}/g, ' ').trim())
    .filter((l) => l !== '-' && !/^- none\.?$/i.test(l))
    .slice(0, 10)
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
    if (ALLOW_MISSING_RELEASE_REPO && (res.status == 404 || res.status == 403)) {
      console.warn(`[${APP_KEY}] Skipping sync for ${repo}: ${res.status}`)
      return null
    }
    throw new Error(`Failed to fetch latest release for ${repo}: ${res.status} ${text}`)
  }

  const json = await res.json()
  return {
    tag: json.tag_name,
    url: json.html_url,
    publishedIso: json.published_at,
    publishedLong: formatLongDate(json.published_at),
    publishedShort: formatShortDate(json.published_at),
    publishedDate: formatIsoDate(json.published_at),
    bullets: extractReleaseBullets(json.body || '')
  }
}

async function fetchReleaseHistory(limit = 7) {
  const historyApi = `https://api.github.com/repos/${repo}/releases?per_page=20`
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'appsh3p-version-sync'
  }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  const res = await fetch(historyApi, { headers })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to fetch release history for ${repo}: ${res.status} ${text}`)
  }
  const releases = await res.json()
  return releases
    .filter((release) => release.published_at && !release.draft && !release.prerelease)
    .slice(0, limit)
    .map((release) => ({
      tag: release.tag_name,
      url: release.html_url,
      publishedLong: formatLongDate(release.published_at),
      publishedShort: formatShortDate(release.published_at),
      publishedDate: formatIsoDate(release.published_at),
      bullets: extractReleaseBullets(release.body || '')
    }))
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
  if (!rel) return
  const history = APP_KEY === 'neon' ? await fetchReleaseHistory() : [rel]
  console.log(`[${APP_KEY}] Latest release: ${rel.tag} (${rel.publishedLong}) from ${repo}`)

  const changed = []

  const indexPath = 'docs/index.md'
  const appsIndexPath = 'docs/apps/index.md'
  const comparePath = 'docs/apps/compare.md'
  const catalogPath = 'docs/.vitepress/data/apps.ts'
  const layoutPath = 'docs/.vitepress/theme/Layout.vue'

  const index = app.updateHome(await read(indexPath), rel)
  if (await writeIfChanged(indexPath, index)) changed.push(indexPath)

  let appsIndex = await read(appsIndexPath)
  appsIndex = appsIndex.replace(
    new RegExp(`(<div class=\\"apps-release-item ${app.timelineClass}\\"><span class=\\"name\\">[^<]+<\\/span><span class=\\"tag\\">)[^<]+(<\\/span><span class=\\"date\\">)\\d{4}-\\d{2}-\\d{2}(<\\/span><\\/div>)`),
    `$1${rel.tag}$2${rel.publishedDate}$3`
  )
  if (await writeIfChanged(appsIndexPath, appsIndex)) changed.push(appsIndexPath)

  let compare = await read(comparePath)
  compare = compare.replace(
    /(\| \[Neon Vision Editor\][^|]+\|[^|]+\|[^|]+\| Public · )v\d+\.\d+\.\d+ \(\d{4}-\d{2}-\d{2}\)( \|)/,
    `$1${rel.tag} (${rel.publishedDate})$2`
  )
  if (await writeIfChanged(comparePath, compare)) changed.push(comparePath)

  let catalog = await read(catalogPath)
  catalog = catalog.replace(
    /(slug: 'neon-vision-editor'[\s\S]*?version: ')[^']+(', releaseDate: ')[^']+(')/,
    `$1${rel.tag.replace(/^v/, '')}$2${rel.publishedDate}$3`
  )
  if (await writeIfChanged(catalogPath, catalog)) changed.push(catalogPath)

  const overview = app.updateOverview(await read(app.overviewPath), rel)
  if (await writeIfChanged(app.overviewPath, overview)) changed.push(app.overviewPath)

  const layout = app.updateLayout(await read(layoutPath), rel)
  if (await writeIfChanged(layoutPath, layout)) changed.push(layoutPath)

  const changelog = app.updateChangelog(await read(app.changelogPath), rel, history)
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
