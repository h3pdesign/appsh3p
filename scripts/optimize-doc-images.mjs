import { existsSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs'
import { join, extname, relative } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const mediaDir = join(ROOT, 'docs/public/media')
const maxBytes = 6_000_000

const variants = [
  {
    source: join(mediaDir, 'neon-vision-editor-hero.png'),
    widths: [640, 960]
  }
]

function hasCommand(cmd) {
  const probe = spawnSync('sh', ['-lc', `command -v ${cmd}`], { stdio: 'ignore' })
  return probe.status === 0
}

function run(cmd, args) {
  const res = spawnSync(cmd, args, { stdio: 'inherit' })
  return res.status === 0
}

function resizePng(input, output, width) {
  if (hasCommand('sips')) {
    return run('sips', ['-Z', String(width), input, '--out', output])
  }
  if (hasCommand('magick')) {
    return run('magick', [input, '-resize', `${width}x`, output])
  }
  if (hasCommand('convert')) {
    return run('convert', [input, '-resize', `${width}x`, output])
  }
  return false
}

function toWebp(input, output) {
  if (hasCommand('cwebp')) {
    return run('cwebp', ['-q', '82', input, '-o', output])
  }
  if (hasCommand('magick')) {
    return run('magick', [input, '-quality', '82', output])
  }
  if (hasCommand('convert')) {
    return run('convert', [input, '-quality', '82', output])
  }
  return false
}

function optimizeVariants() {
  let generatedAny = false
  for (const item of variants) {
    if (!existsSync(item.source)) continue
    for (const width of item.widths) {
      const pngOut = item.source.replace(/\.png$/i, `-${width}.png`)
      const webpOut = item.source.replace(/\.png$/i, `-${width}.webp`)
      const resized = resizePng(item.source, pngOut, width)
      if (resized) {
        generatedAny = true
        toWebp(pngOut, webpOut)
      }
    }
    toWebp(item.source, item.source.replace(/\.png$/i, '.webp'))
  }
  if (!generatedAny) {
    console.log('Image optimization skipped: no local resize tool found (sips/magick/convert).')
  }
}

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

function enforceSizeBudget() {
  const allowed = new Set(['.png', '.jpg', '.jpeg', '.webp'])
  const files = walk(mediaDir).filter((p) => allowed.has(extname(p).toLowerCase()))
  const oversized = files
    .map((p) => ({ path: p, size: statSync(p).size }))
    .filter((f) => f.size > maxBytes)

  if (oversized.length > 0) {
    console.error(`Found ${oversized.length} oversized media assets (> ${maxBytes} bytes):`)
    oversized.forEach((f) => console.error(`- ${f.path} (${f.size} bytes)`))
    process.exit(1)
  }
}

function writeMediaHashManifest() {
  const allowed = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg'])
  const files = walk(mediaDir).filter((p) => allowed.has(extname(p).toLowerCase()))
  const manifest = {}

  for (const p of files) {
    const key = relative(mediaDir, p).replaceAll('\\', '/')
    const data = readFileSync(p)
    const hash = createHash('sha1').update(data).digest('hex').slice(0, 10)
    manifest[key] = hash
  }

  writeFileSync(join(mediaDir, 'media-hashes.json'), `${JSON.stringify(manifest, null, 2)}\n`)
}

optimizeVariants()
enforceSizeBudget()
writeMediaHashManifest()
console.log('Docs image optimization/check complete.')
