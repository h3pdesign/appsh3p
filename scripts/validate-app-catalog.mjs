import fs from 'node:fs'

const source = fs.readFileSync('docs/.vitepress/data/apps.ts', 'utf8')
const index = fs.readFileSync('docs/apps/index.md', 'utf8')
const slugs = [...source.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1])
const missing = slugs.filter((slug) => !index.includes(`/apps/${slug}/overview`))
const duplicate = slugs.filter((slug, index) => slugs.indexOf(slug) !== index)

if (slugs.length !== 10 || missing.length || duplicate.length) {
  console.error('[app-catalog] expected 10 unique catalog entries represented in docs/apps/index.md')
  if (missing.length) console.error(`[app-catalog] missing: ${missing.join(', ')}`)
  if (duplicate.length) console.error(`[app-catalog] duplicate: ${duplicate.join(', ')}`)
  process.exit(1)
}

console.log(`[app-catalog] ${slugs.length} entries validated`)
