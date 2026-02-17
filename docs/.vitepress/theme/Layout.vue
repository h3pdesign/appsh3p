<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const route = useRoute()

const APP_STORE_URL = 'https://apps.apple.com/de/app/neon-vision-editor/id6758950965'
const HERO_FX_PREF_KEY = 'h3p_hero_fx_disabled'
let revealObserver: IntersectionObserver | null = null
let scrollHandler: (() => void) | null = null

type QuickLink = {
  text: string
  link: string
  icon: string
  tone: 'neon' | 'metric' | 'release' | 'default'
}

const headingCount = ref(0)
const readingMinutes = ref(1)
const heroFxEnabled = ref(true)

const appSlug = computed(() => {
  const match = route.path.match(/^\/apps\/([^/]+)/)
  return match ? match[1] : ''
})

const isAppsRoute = computed(() => route.path.startsWith('/apps/'))
const isHomeRoute = computed(() => route.path === '/')

const isAppDocPage = computed(() => {
  return appSlug.value !== '' && appSlug.value !== 'index' && appSlug.value !== 'github-repositories'
})

const appQuickLinks = computed<QuickLink[]>(() => {
  if (!isAppDocPage.value) return []
  const base = `/apps/${appSlug.value}`
  return [
    { text: 'Overview', link: `${base}/overview`, icon: 'O', tone: 'default' },
    { text: 'Features', link: `${base}/features`, icon: 'F', tone: 'neon' },
    { text: 'Gallery', link: `${base}/gallery`, icon: 'G', tone: 'metric' },
    { text: 'Changelog', link: `${base}/changelog`, icon: 'C', tone: 'release' }
  ]
})

function applyHeroFxClass() {
  document.documentElement.classList.toggle('no-hero-fx', !heroFxEnabled.value)
}

function loadHeroFxPreference() {
  try {
    const stored = localStorage.getItem(HERO_FX_PREF_KEY)
    heroFxEnabled.value = stored !== '1'
  } catch {
    heroFxEnabled.value = true
  }
  applyHeroFxClass()
}

function toggleHeroFx() {
  heroFxEnabled.value = !heroFxEnabled.value
  try {
    localStorage.setItem(HERO_FX_PREF_KEY, heroFxEnabled.value ? '0' : '1')
  } catch {
    // ignore storage errors
  }
  applyHeroFxClass()
}

function cleanupRevealObserver() {
  if (revealObserver) {
    revealObserver.disconnect()
    revealObserver = null
  }
}

function cleanupAsideProgress() {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
    window.removeEventListener('resize', scrollHandler)
    scrollHandler = null
  }
  document.documentElement.style.removeProperty('--h3p-aside-progress')
}

function updateAsideProgress() {
  const docEl = document.documentElement
  const max = docEl.scrollHeight - window.innerHeight
  const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
  docEl.style.setProperty('--h3p-aside-progress', progress.toFixed(4))
}

function setupAsideProgress() {
  cleanupAsideProgress()
  if (!isAppsRoute.value) return
  scrollHandler = () => updateAsideProgress()
  window.addEventListener('scroll', scrollHandler, { passive: true })
  window.addEventListener('resize', scrollHandler, { passive: true })
  updateAsideProgress()
}

function setupDocStats() {
  if (!isAppsRoute.value) {
    headingCount.value = 0
    readingMinutes.value = 1
    return
  }

  const doc = document.querySelector('.VPDoc .vp-doc') as HTMLElement | null
  if (!doc) {
    headingCount.value = 0
    readingMinutes.value = 1
    return
  }

  const headings = doc.querySelectorAll('h2, h3')
  headingCount.value = headings.length

  const text = doc.innerText || ''
  const words = text.trim().split(/\s+/).filter(Boolean).length
  readingMinutes.value = Math.max(1, Math.ceil(words / 220))
}

function parseDateFromChangelog(text: string): Date | null {
  const m1 = text.match(/published\s+([A-Za-z]+\s+\d{1,2},\s+\d{4})/i)
  if (m1) {
    const d = new Date(m1[1])
    if (!Number.isNaN(d.getTime())) return d
  }

  const m2 = text.match(/(\d{4}-\d{2}-\d{2})/)
  if (m2) {
    const d = new Date(`${m2[1]}T00:00:00Z`)
    if (!Number.isNaN(d.getTime())) return d
  }

  return null
}

async function setupAppsIndexUpdateBadges() {
  if (route.path !== '/apps/index') return

  const cards = Array.from(document.querySelectorAll<HTMLElement>('.app-card[data-changelog]'))
  await Promise.all(
    cards.map(async (card) => {
      const url = card.getAttribute('data-changelog')
      const badge = card.querySelector<HTMLElement>('.app-updated-badge')
      if (!url || !badge) return

      try {
        const res = await fetch(url)
        if (!res.ok) return
        const text = await res.text()
        const d = parseDateFromChangelog(text)
        if (!d) return
        const days = Math.max(0, Math.floor((Date.now() - d.getTime()) / 86400000))
        badge.textContent = `updated ${days}d ago`
      } catch {
        // keep fallback badge text
      }
    })
  )
}

function removeHomeWidgets() {
  document.querySelector('.home-hero-widgets')?.remove()
  document.querySelector('.VPHome .VPHero')?.classList.remove('has-home-widgets')
}

function ensureHomeWidgets() {
  if (!isHomeRoute.value) {
    removeHomeWidgets()
    return
  }

  const hero = document.querySelector('.VPHome .VPHero') as HTMLElement | null
  const container = document.querySelector('.VPHome .VPHero .container') as HTMLElement | null
  if (!hero || !container) return
  if (container.querySelector('.home-hero-widgets')) return

  const widget = document.createElement('aside')
  widget.className = 'home-hero-widgets'
  widget.setAttribute('aria-label', 'Startpage highlights')
  widget.innerHTML = `
    <section class="home-hero-widget-card">
      <h3>Status</h3>
      <ul>
        <li><strong>3</strong> apps documented</li>
        <li>Published on <a href="https://apps-h3p.com" target="_blank" rel="noreferrer noopener">apps-h3p.com</a></li>
        <li><a href="https://github.com/h3pdesign/appsh3p" target="_blank" rel="noreferrer noopener">Docs repo</a></li>
      </ul>
      <div class="home-hero-mini-apps" aria-label="App icons">
        <a href="/apps/neon-vision-editor/overview"><img src="/icons/neon-vision-editor.png" alt="Neon Vision Editor" /></a>
        <a href="/apps/metric-data/overview"><img src="/icons/metric-data.png" alt="Metric Data" /></a>
        <a href="/apps/release-assistant/overview"><img src="/icons/release-assistant.png" alt="Release Assistant" /></a>
      </div>
    </section>

    <section class="home-hero-widget-card home-platform-matrix-card">
      <h3>Platform matrix</h3>
      <div class="home-platform-matrix">
        <div class="home-platform-row">
          <span class="app">Neon</span>
          <span class="plat">macOS</span><span class="plat">iPadOS</span><span class="plat">iOS</span>
        </div>
        <div class="home-platform-row">
          <span class="app">Metric</span>
          <span class="plat">macOS</span><span class="plat">iPadOS</span><span class="plat">iOS</span>
        </div>
        <div class="home-platform-row">
          <span class="app">Release</span>
          <span class="plat">macOS</span>
        </div>
      </div>
    </section>

    <section class="home-hero-widget-card home-hero-ticker">
      <h3>Latest release</h3>
      <p><strong>Neon Vision Editor v0.4.23</strong> published on February 16, 2026.</p>
      <a href="https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.4.23" target="_blank" rel="noreferrer noopener">View GitHub release</a>
    </section>
  `

  hero.classList.add('has-home-widgets')
  container.appendChild(widget)
}

function linkHomeHeroBadge() {
  const heroImage = document.querySelector('.VPHome .VPHero .image .image-src') as HTMLImageElement | null
  if (!heroImage) return
  const parent = heroImage.parentElement
  if (parent?.tagName.toLowerCase() === 'a' && parent.classList.contains('home-hero-appstore-link')) return

  const link = document.createElement('a')
  link.className = 'home-hero-appstore-link'
  link.href = APP_STORE_URL
  link.target = '_blank'
  link.rel = 'noreferrer noopener'
  link.setAttribute('aria-label', 'Open Neon Vision Editor on the App Store')
  heroImage.replaceWith(link)
  link.appendChild(heroImage)
}

function setupOverviewReveal() {
  cleanupRevealObserver()
  if (!route.path.includes('/apps/') || !route.path.includes('/overview')) return

  const container = document.querySelector('.VPDoc .vp-doc')
  if (!container) return

  const targets = Array.from(
    container.querySelectorAll<HTMLElement>('.overview-reveal, .overview-hero, h2, h3, p, ul')
  ).filter((el) => !el.closest('pre, code'))

  if (targets.length === 0) return

  targets.forEach((el, index) => {
    el.classList.add('overview-reveal')
    el.style.setProperty('--overview-reveal-delay', `${Math.min(index * 0.04, 0.3)}s`)
  })

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'))
    return
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          el.classList.add('is-visible')
          revealObserver?.unobserve(el)
        }
      })
    },
    { root: null, threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )

  targets.forEach((el) => revealObserver?.observe(el))
}

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function triggerRouteFade() {
  document.documentElement.classList.add('h3p-route-enter')
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('h3p-route-enter')
    })
  })
}

async function applyPageEnhancements() {
  await nextTick()
  triggerRouteFade()
  linkHomeHeroBadge()
  ensureHomeWidgets()
  setupOverviewReveal()
  setupAsideProgress()
  setupDocStats()
  await setupAppsIndexUpdateBadges()
}

onMounted(async () => {
  loadHeroFxPreference()
  await applyPageEnhancements()
})

watch(
  () => route.path,
  async () => {
    await applyPageEnhancements()
  }
)

onBeforeUnmount(() => {
  cleanupRevealObserver()
  cleanupAsideProgress()
})
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <button
        v-if="isHomeRoute"
        class="h3p-hero-fx-toggle"
        type="button"
        :aria-pressed="heroFxEnabled"
        @click="toggleHeroFx"
      >
        FX {{ heroFxEnabled ? 'On' : 'Off' }}
      </button>
      <a class="h3p-top-logo" href="/" aria-label="h3p apps home">
        <img class="h3p-logo-light" src="/brand/logo-light.png" alt="H3P logo" />
        <img class="h3p-logo-dark" src="/brand/logo-dark.png" alt="H3P logo" />
      </a>
    </template>

    <template #aside-outline-before>
      <section v-if="isAppsRoute" class="h3p-aside-doc-stats" aria-label="Document stats">
        <div class="h3p-aside-doc-stat"><strong>{{ readingMinutes }} min</strong><span>read</span></div>
        <div class="h3p-aside-doc-stat"><strong>{{ headingCount }}</strong><span>sections</span></div>
      </section>
      <section v-if="isAppsRoute" class="h3p-aside-cmd-cta" aria-label="Search shortcut">
        <p>Search docs fast</p>
        <div><kbd>/</kbd> open search</div>
      </section>
    </template>

    <template #aside-outline-after>
      <section v-if="appQuickLinks.length > 0" class="h3p-aside-quick-links" aria-label="Quick app links">
        <div class="h3p-aside-quick-title">Quick links</div>
        <div class="h3p-aside-quick-grid">
          <a v-for="item in appQuickLinks" :key="item.link" :href="item.link" :class="['ql-link', `ql-${item.tone}`]">
            <span class="ql-icon">{{ item.icon }}</span>
            <span>{{ item.text }}</span>
          </a>
        </div>
      </section>
      <button v-if="isAppsRoute" class="h3p-aside-back-top" type="button" @click="backToTop">Back to top</button>
    </template>
  </Layout>
</template>
