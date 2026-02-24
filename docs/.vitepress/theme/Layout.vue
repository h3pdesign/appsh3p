<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const route = useRoute()

const APP_STORE_URL = 'https://apps.apple.com/de/app/neon-vision-editor/id6758950965'
const HERO_FX_PREF_KEY = 'h3p_hero_fx_disabled'
const COMPACT_CARDS_PREF_KEY = 'h3p_compact_cards'
const READING_MODE_PREF_KEY = 'h3p_reading_mode'
let revealObserver: IntersectionObserver | null = null
let scrollHandler: (() => void) | null = null
let carouselTimer: number | null = null
let carouselPauseHandlers: Array<() => void> = []
let parallaxCleanup: (() => void) | null = null
let analyticsCleanup: (() => void) | null = null
let mediaHashCache: Record<string, string> | null = null

type QuickLink = {
  text: string
  link: string
  icon: string
  tone: 'neon' | 'metric' | 'release' | 'default'
}

type DocJumpLink = {
  text: string
  link: string
}

const headingCount = ref(0)
const readingMinutes = ref(1)
const heroFxEnabled = ref(true)
const compactCardsEnabled = ref(false)
const readingModeEnabled = ref(false)

const appSlug = computed(() => {
  const match = route.path.match(/^\/apps\/([^/]+)/)
  return match ? match[1] : ''
})

const isAppsRoute = computed(() => route.path.startsWith('/apps/'))
const isAppsIndexRoute = computed(() => route.path === '/apps/' || route.path === '/apps/index')
const isHomeRoute = computed(() => route.path === '/')
const feedbackBase = 'https://github.com/h3pdesign/appsh3p/issues/new'

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

const topSwitcherLinks = [
  { key: 'neon-vision-editor', text: 'Neon', link: '/apps/neon-vision-editor/overview' },
  { key: 'metric-data', text: 'Metric', link: '/apps/metric-data/overview' },
  { key: 'x-newsbook', text: 'Newsbook', link: '/apps/x-newsbook/overview' },
  { key: 'release-assistant', text: 'Release', link: '/apps/release-assistant/overview' }
]

const appUpdatedBySlug: Record<string, string> = {
  'neon-vision-editor': 'February 24, 2026',
  'metric-data': 'February 16, 2026',
  'x-newsbook': 'February 17, 2026',
  'release-assistant': 'February 16, 2026'
}

const appDocTopLinks = computed<DocJumpLink[]>(() => {
  if (!isAppDocPage.value) return []
  const base = '/apps/' + appSlug.value
  return [
    { text: 'Overview', link: base + '/overview' },
    { text: 'Install', link: base + '/installation' },
    { text: 'Features', link: base + '/features' },
    { text: 'FAQ', link: base + '/faq' }
  ]
})

const appDocRelatedLinks = computed<DocJumpLink[]>(() => {
  if (!isAppDocPage.value) return []
  const base = '/apps/' + appSlug.value
  const all: DocJumpLink[] = [
    { text: 'Overview', link: base + '/overview' },
    { text: 'Installation', link: base + '/installation' },
    { text: 'Features', link: base + '/features' },
    { text: 'Gallery', link: base + '/gallery' },
    { text: 'Changelog', link: base + '/changelog' },
    { text: 'Known Issues', link: base + '/known-issues' },
    { text: 'FAQ', link: base + '/faq' }
  ]
  const currentPath = route.path.endsWith('/') ? route.path.slice(0, -1) : route.path
  return all.filter((item) => item.link !== currentPath).slice(0, 4)
})

const currentAppUpdatedOn = computed(() => {
  if (!isAppDocPage.value) return ''
  return appUpdatedBySlug[appSlug.value] || 'February 17, 2026'
})

const feedbackYesHref = computed(() => {
  const title = `Docs feedback (helpful): ${route.path}`
  const body = `Page: https://apps-h3p.com${route.path}\n\nWhat worked well:\n- `
  return `${feedbackBase}?labels=documentation,feedback&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`
})

const feedbackNoHref = computed(() => {
  const title = `Docs feedback (needs improvement): ${route.path}`
  const body = `Page: https://apps-h3p.com${route.path}\n\nWhat was missing or unclear:\n- `
  return `${feedbackBase}?labels=documentation,feedback&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`
})

const visualBugHref = computed(() => {
  const title = `Visual bug report: ${route.path}`
  const body = `Page: https://apps-h3p.com${route.path}\n\nWhat looks wrong:\n- \n\nExpected:\n- `
  return `${feedbackBase}?labels=documentation,visual-bug&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`
})

function activeSwitcher(linkKey: string) {
  return appSlug.value === linkKey
}

function openSearch() {
  const btn = document.querySelector('.DocSearch-Button') as HTMLButtonElement | null
  btn?.click()
}

function applyCompactCardsClass() {
  document.documentElement.classList.toggle('compact-home-cards', compactCardsEnabled.value)
}

function applyHeroFxClass() {
  document.documentElement.classList.toggle('no-hero-fx', !heroFxEnabled.value)
}

function applyReadingModeClass() {
  const enabled = readingModeEnabled.value && !isHomeRoute.value
  document.documentElement.classList.toggle('h3p-reading-mode', enabled)
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

function loadCompactCardsPreference() {
  try {
    compactCardsEnabled.value = localStorage.getItem(COMPACT_CARDS_PREF_KEY) === '1'
  } catch {
    compactCardsEnabled.value = false
  }
  applyCompactCardsClass()
}

function loadReadingModePreference() {
  try {
    readingModeEnabled.value = localStorage.getItem(READING_MODE_PREF_KEY) === '1'
  } catch {
    readingModeEnabled.value = false
  }
  applyReadingModeClass()
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

function toggleCompactCards() {
  compactCardsEnabled.value = !compactCardsEnabled.value
  try {
    localStorage.setItem(COMPACT_CARDS_PREF_KEY, compactCardsEnabled.value ? '1' : '0')
  } catch {
    // ignore storage errors
  }
  applyCompactCardsClass()
}

function toggleReadingMode() {
  readingModeEnabled.value = !readingModeEnabled.value
  try {
    localStorage.setItem(READING_MODE_PREF_KEY, readingModeEnabled.value ? '1' : '0')
  } catch {
    // ignore storage errors
  }
  applyReadingModeClass()
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

function cleanupCarousel() {
  if (carouselTimer) {
    window.clearInterval(carouselTimer)
    carouselTimer = null
  }
  carouselPauseHandlers.forEach((fn) => fn())
  carouselPauseHandlers = []
}

function cleanupParallax() {
  if (parallaxCleanup) {
    parallaxCleanup()
    parallaxCleanup = null
  }
}

function cleanupAnalytics() {
  if (analyticsCleanup) {
    analyticsCleanup()
    analyticsCleanup = null
  }
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

function applyAppThemeClass() {
  const root = document.documentElement
  root.classList.remove('app-theme-neon', 'app-theme-metric', 'app-theme-release')
  if (appSlug.value === 'neon-vision-editor') root.classList.add('app-theme-neon')
  if (appSlug.value === 'metric-data') root.classList.add('app-theme-metric')
  if (appSlug.value === 'x-newsbook') root.classList.add('app-theme-release')
  if (appSlug.value === 'release-assistant') root.classList.add('app-theme-release')
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
  if (!isAppsIndexRoute.value) return

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
        badge.classList.remove('freshness-today', 'freshness-recent', 'freshness-stale')
        if (days === 0) {
          badge.textContent = 'updated today'
          badge.classList.add('freshness-today')
        } else if (days <= 2) {
          badge.textContent = `updated ${days}d ago`
          badge.classList.add('freshness-recent')
        } else {
          badge.textContent = `updated ${days}d ago`
          badge.classList.add('freshness-stale')
        }
      } catch {
        // keep fallback
      }
    })
  )
}

function setupAppsCarousel() {
  cleanupCarousel()
  if (!isAppsIndexRoute.value) return

  const carousel = document.querySelector('.apps-carousel') as HTMLElement | null
  const viewport = document.querySelector('.apps-carousel-viewport') as HTMLElement | null
  const firstSlide = document.querySelector('.apps-slide') as HTMLElement | null
  const prevBtn = document.querySelector('.apps-carousel-prev') as HTMLButtonElement | null
  const nextBtn = document.querySelector('.apps-carousel-next') as HTMLButtonElement | null
  const dots = Array.from(document.querySelectorAll<HTMLButtonElement>('.apps-carousel-dot'))
  const dragHint = document.querySelector('.apps-carousel-drag-hint') as HTMLElement | null
  if (!carousel || !viewport || !firstSlide) return

  let paused = false
  let carouselInView = false
  const cardWidth = () => firstSlide.getBoundingClientRect().width + 10

  const activeIndex = () => {
    const idx = Math.round(viewport.scrollLeft / Math.max(cardWidth(), 1))
    return Math.max(0, Math.min(idx, Math.max(dots.length - 1, 0)))
  }

  const setActiveDot = (idx: number) => {
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === idx))
  }

  const hideDragHint = () => {
    if (!dragHint) return
    dragHint.classList.remove('is-visible')
    dragHint.classList.add('is-hidden')
    try {
      localStorage.setItem('h3p_apps_carousel_hint_seen', '1')
    } catch {
      // ignore storage errors
    }
  }

  const goToIndex = (idx: number) => {
    viewport.scrollTo({ left: Math.max(0, idx) * cardWidth(), behavior: 'smooth' })
    setActiveDot(Math.max(0, Math.min(idx, Math.max(dots.length - 1, 0))))
  }

  const goNext = () => {
    const endPos = viewport.scrollWidth - viewport.clientWidth - 4
    if (viewport.scrollLeft >= endPos) {
      viewport.scrollTo({ left: 0, behavior: 'smooth' })
      setActiveDot(0)
      return
    }
    viewport.scrollBy({ left: cardWidth(), behavior: 'smooth' })
    window.setTimeout(() => setActiveDot(activeIndex()), 160)
  }

  const goPrev = () => {
    if (viewport.scrollLeft <= 4) {
      const last = Math.max(dots.length - 1, 0)
      goToIndex(last)
      return
    }
    viewport.scrollBy({ left: -cardWidth(), behavior: 'smooth' })
    window.setTimeout(() => setActiveDot(activeIndex()), 160)
  }

  const step = () => {
    if (paused) return
    goNext()
  }

  carouselTimer = window.setInterval(step, 3400)

  const onEnter = () => {
    paused = true
    hideDragHint()
  }
  const onLeave = () => { paused = false }

  viewport.addEventListener('mouseenter', onEnter)
  viewport.addEventListener('mouseleave', onLeave)
  const onScrollSync = () => setActiveDot(activeIndex())
  viewport.addEventListener('touchstart', onEnter, { passive: true })
  viewport.addEventListener('touchend', onLeave, { passive: true })
  viewport.addEventListener('scroll', onScrollSync, { passive: true })

  carouselPauseHandlers.push(() => viewport.removeEventListener('mouseenter', onEnter))
  carouselPauseHandlers.push(() => viewport.removeEventListener('mouseleave', onLeave))
  carouselPauseHandlers.push(() => viewport.removeEventListener('touchstart', onEnter))
  carouselPauseHandlers.push(() => viewport.removeEventListener('touchend', onLeave))
  carouselPauseHandlers.push(() => viewport.removeEventListener('scroll', onScrollSync))

  if (prevBtn) {
    const onPrev = () => {
      paused = true
      hideDragHint()
      goPrev()
    }
    prevBtn.addEventListener('click', onPrev)
    carouselPauseHandlers.push(() => prevBtn.removeEventListener('click', onPrev))
  }

  if (nextBtn) {
    const onNext = () => {
      paused = true
      hideDragHint()
      goNext()
    }
    nextBtn.addEventListener('click', onNext)
    carouselPauseHandlers.push(() => nextBtn.removeEventListener('click', onNext))
  }

  dots.forEach((dot, idx) => {
    const onDot = () => {
      paused = true
      hideDragHint()
      goToIndex(idx)
    }
    dot.addEventListener('click', onDot)
    carouselPauseHandlers.push(() => dot.removeEventListener('click', onDot))
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if (!carouselInView) return
    const target = e.target as HTMLElement | null
    if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return
    if (e.key === 'ArrowRight') {
      paused = true
      hideDragHint()
      e.preventDefault()
      goNext()
    }
    if (e.key === 'ArrowLeft') {
      paused = true
      hideDragHint()
      e.preventDefault()
      goPrev()
    }
  }
  window.addEventListener('keydown', onKeyDown)
  carouselPauseHandlers.push(() => window.removeEventListener('keydown', onKeyDown))

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        carouselInView = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0.55)
      },
      { threshold: [0.25, 0.55, 0.8] }
    )
    observer.observe(carousel)
    carouselPauseHandlers.push(() => observer.disconnect())
  } else {
    carouselInView = true
  }

  if (dragHint) {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    let seen = false
    try {
      seen = localStorage.getItem('h3p_apps_carousel_hint_seen') === '1'
    } catch {
      seen = false
    }

    if (isMobile && !seen) {
      requestAnimationFrame(() => dragHint.classList.add('is-visible'))
      const onFirstGesture = () => hideDragHint()
      viewport.addEventListener('pointerdown', onFirstGesture, { once: true, passive: true })
      viewport.addEventListener('scroll', onFirstGesture, { once: true, passive: true })
      carouselPauseHandlers.push(() => viewport.removeEventListener('pointerdown', onFirstGesture))
      carouselPauseHandlers.push(() => viewport.removeEventListener('scroll', onFirstGesture))
    } else {
      hideDragHint()
    }
  }

  setActiveDot(activeIndex())
}

function setupHeadingTools() {
  if (!isAppsRoute.value) return
  const doc = document.querySelector('.VPDoc .vp-doc') as HTMLElement | null
  if (!doc) return

  const labelFromTitle = (title: string): string | null => {
    const t = title.toLowerCase()
    if (t.includes('install') || t.includes('setup')) return 'Setup'
    if (t.includes('feature') || t.includes('workflow') || t.includes('daily') || t.includes('quick')) return 'Daily use'
    if (t.includes('known') || t.includes('faq') || t.includes('issue') || t.includes('support') || t.includes('troubleshoot')) return 'Troubleshooting'
    return null
  }

  doc.querySelectorAll<HTMLElement>('h2, h3').forEach((h) => {
    if (!h.id) return

    if (!h.querySelector('.h3p-copy-link')) {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'h3p-copy-link'
      btn.textContent = '↗'
      btn.title = 'Copy section link'
      btn.setAttribute('aria-label', 'Copy section link')
      btn.addEventListener('click', async () => {
        const url = `${window.location.origin}${window.location.pathname}#${h.id}`
        try {
          await navigator.clipboard.writeText(url)
          btn.textContent = '✓'
          window.setTimeout(() => { btn.textContent = '↗' }, 1200)
        } catch {
          btn.textContent = '!'
          window.setTimeout(() => { btn.textContent = '↗' }, 1200)
        }
      })
      h.appendChild(btn)
    }

    if (h.tagName.toLowerCase() === 'h2' && !h.previousElementSibling?.classList.contains('h3p-section-kicker')) {
      const label = labelFromTitle(h.textContent || '')
      if (label) {
        const div = document.createElement('div')
        div.className = 'h3p-section-kicker'
        div.textContent = label
        h.parentNode?.insertBefore(div, h)
      }
    }
  })
}

function setupImageSkeletons() {
  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('.overview-app-shot, .home-bottom-image img, .startpage-app-item img, .h3p-search-macbook'))
  imgs.forEach((img) => {
    if (img.classList.contains('h3p-img-ready')) return
    img.classList.add('h3p-img-skeleton')
    const markReady = () => {
      img.classList.add('h3p-img-ready')
    }
    if (img.complete) {
      markReady()
    } else {
      img.addEventListener('load', markReady, { once: true })
      img.addEventListener('error', markReady, { once: true })
    }
  })
}

function setupLocalizedDates() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-date]'))
  nodes.forEach((node) => {
    const raw = node.dataset.date || ''
    if (!raw) return
    const d = new Date(raw)
    if (Number.isNaN(d.getTime())) return
    node.textContent = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  })
}

function setupHomeSectionCopyLinks() {
  if (!isHomeRoute.value) return
  const doc = document.querySelector('.VPHome .vp-doc')
  if (!doc) return

  doc.querySelectorAll<HTMLElement>('h2[id]').forEach((h) => {
    if (h.querySelector('.h3p-copy-link')) return
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'h3p-copy-link'
    btn.textContent = '↗'
    btn.title = 'Copy section link'
    btn.setAttribute('aria-label', 'Copy section link')
    btn.addEventListener('click', async () => {
      const url = `${window.location.origin}${window.location.pathname}#${h.id}`
      try {
        await navigator.clipboard.writeText(url)
        btn.textContent = '✓'
        window.setTimeout(() => { btn.textContent = '↗' }, 1200)
      } catch {
        btn.textContent = '!'
        window.setTimeout(() => { btn.textContent = '↗' }, 1200)
      }
    })
    h.appendChild(btn)
  })
}

function setupHomeFeatureDecor() {
  if (!isHomeRoute.value) return
  const target = document.querySelector<HTMLAnchorElement>('.VPHome .VPFeatures a[href="/getting-started/introduction"]')
  const box = target?.querySelector<HTMLElement>('.box')
  if (!box) return
  if (!box.querySelector('.h3p-search-macbook-shadow')) {
    const shadow = document.createElement('span')
    shadow.className = 'h3p-search-macbook-shadow'
    shadow.setAttribute('aria-hidden', 'true')
    box.appendChild(shadow)
  }
  if (!box.querySelector('.h3p-search-macbook')) {
    const img = document.createElement('img')
    img.className = 'h3p-search-macbook'
    img.src = '/media/macbook-cutout.png'
    img.alt = ''
    img.setAttribute('aria-hidden', 'true')
    img.decoding = 'async'
    img.loading = 'lazy'
    box.appendChild(img)
  }
}

function removeHomeWidgets() {
  document.querySelector('.home-hero-widgets')?.remove()
  document.querySelector('.VPHome .VPHero')?.classList.remove('has-home-widgets')
}

function ensureHomeWidgets() {
  if (!isHomeRoute.value) {
    removeHomeWidgets()
    cleanupParallax()
    return
  }

  const hero = document.querySelector('.VPHome .VPHero') as HTMLElement | null
  const container = document.querySelector('.VPHome .VPHero .container') as HTMLElement | null
  if (!hero || !container) return
  if (!container.querySelector('.home-hero-widgets')) {
    const widget = document.createElement('aside')
    widget.className = 'home-hero-widgets is-loading'
    widget.setAttribute('aria-label', 'Startpage highlights')
    widget.innerHTML = `
      <section class="home-hero-widget-card">
        <h3>Status</h3>
        <ul>
          <li><strong>4</strong> apps documented</li>
          <li>Published on <a href="https://apps-h3p.com" target="_blank" rel="noreferrer noopener">apps-h3p.com</a></li>
          <li><a href="https://github.com/h3pdesign/appsh3p" target="_blank" rel="noreferrer noopener">Docs repo</a></li>
        </ul>
        <div class="home-deploy-badge"><a href="https://github.com/h3pdesign/appsh3p/commit/ae3e8f2" target="_blank" rel="noreferrer noopener">Last deployment: <span data-date="2026-02-24">February 24, 2026</span></a></div>
        <div class="home-hero-mini-apps" aria-label="App icons">
          <a href="/apps/neon-vision-editor/overview"><img class="mini-icon-neon" src="/icons/neon-vision-editor.png" alt="Neon Vision Editor" width="22" height="22" loading="lazy" decoding="async" /></a>
          <a href="/apps/metric-data/overview"><img src="/icons/metric-data.png" alt="Metric Data" width="22" height="22" loading="lazy" decoding="async" /></a>
          <a href="/apps/x-newsbook/overview"><img src="/icons/x-newsbook.png" alt="X-Newsbook" width="22" height="22" loading="lazy" decoding="async" /></a>
          <a href="/apps/release-assistant/overview"><img src="/icons/release-assistant.png" alt="Release Assistant" width="22" height="22" loading="lazy" decoding="async" /></a>
        </div>
      </section>

      <section class="home-hero-widget-card home-platform-matrix-card">
        <h3>Platform matrix</h3>
        <div class="home-platform-matrix">
          <div class="home-platform-row"><span class="app">Neon</span><span class="plat">macOS</span><span class="plat">iPadOS</span><span class="plat">iOS</span></div>
          <div class="home-platform-row"><span class="app">Metric</span><span class="plat">macOS</span><span class="plat">iPadOS</span><span class="plat">iOS</span></div>
          <div class="home-platform-row"><span class="app">Newsbook</span><span class="plat">macOS</span><span class="plat">iPadOS</span><span class="plat">iOS</span></div>
          <div class="home-platform-row"><span class="app">Release</span><span class="plat">macOS</span></div>
        </div>
      </section>

      <section class="home-hero-widget-card home-hero-ticker">
        <h3>Latest release</h3>
        <p><strong>Neon Vision Editor v0.4.30</strong> published on February 24, 2026.</p>
        <a href="https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.4.30" target="_blank" rel="noreferrer noopener">View GitHub release</a>
      </section>
    `

    hero.classList.add('has-home-widgets')
    container.appendChild(widget)
    requestAnimationFrame(() => {
      widget.classList.add('is-ready')
      widget.classList.remove('is-loading')
    })
  }

  cleanupParallax()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const widget = container.querySelector('.home-hero-widgets') as HTMLElement | null
  const focalCard = document.querySelector('.startpage-focal-card') as HTMLElement | null
  if (!widget) return

  const onMove = (e: MouseEvent) => {
    const rect = hero.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width) - 0.5
    const ny = ((e.clientY - rect.top) / rect.height) - 0.5
    widget.style.transform = `translate3d(${nx * 6}px, ${ny * 6}px, 0)`
    if (focalCard) {
      focalCard.style.transform = `translate3d(${nx * 4}px, ${ny * 4}px, 0)`
    }
  }
  const onLeave = () => {
    widget.style.transform = 'translate3d(0,0,0)'
    if (focalCard) focalCard.style.transform = 'translate3d(0,0,0)'
  }
  hero.addEventListener('mousemove', onMove)
  hero.addEventListener('mouseleave', onLeave)

  parallaxCleanup = () => {
    hero.removeEventListener('mousemove', onMove)
    hero.removeEventListener('mouseleave', onLeave)
    widget.style.transform = 'translate3d(0,0,0)'
    if (focalCard) focalCard.style.transform = 'translate3d(0,0,0)'
  }
}

function trackEvent(eventName: string, payload: Record<string, string>) {
  try {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
    if (typeof gtag === 'function') {
      gtag('event', eventName, payload)
    }
  } catch {
    // ignore analytics errors
  }

  try {
    const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer
    if (Array.isArray(dataLayer)) {
      dataLayer.push({ event: eventName, ...payload })
    }
  } catch {
    // ignore analytics errors
  }
}

function setupHomeLastUpdated() {
  if (!isHomeRoute.value) return
  const output = document.querySelector('.startpage-updated-date') as HTMLElement | null
  const syncOutput = document.querySelector('.startpage-synced-badge') as HTMLElement | null
  const deployDate = document.querySelector('.home-deploy-badge [data-date]') as HTMLElement | null
  if (!output) return
  const dateNodes = Array.from(document.querySelectorAll<HTMLElement>('.startpage-weekly-strip strong[data-date]'))
  if (dateNodes.length === 0) return

  const dates = dateNodes
    .map((node) => node.dataset.date || '')
    .map((raw) => new Date(raw))
    .filter((d) => !Number.isNaN(d.getTime()))
  if (dates.length === 0) return

  const latest = new Date(Math.max(...dates.map((d) => d.getTime())))
  const iso = latest.toISOString().slice(0, 10)
  const label = latest.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  output.textContent = `updated ${label}`
  if (syncOutput) syncOutput.textContent = `GitHub synced ${label}`
  if (deployDate) {
    deployDate.dataset.date = iso
    deployDate.textContent = latest.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
  }
}

function setupHomeWhatsNewDelta() {
  if (!isHomeRoute.value) return
  const seenKey = 'h3p_startpage_last_seen_ms'
  const dateNodes = Array.from(document.querySelectorAll<HTMLElement>('.startpage-weekly-strip strong[data-date]'))
  if (dateNodes.length === 0) return
  const dates = dateNodes
    .map((node) => node.dataset.date || '')
    .map((raw) => new Date(raw))
    .filter((d) => !Number.isNaN(d.getTime()))
  if (dates.length === 0) return
  const latestMs = Math.max(...dates.map((d) => d.getTime()))

  let previousMs = 0
  try {
    previousMs = Number(localStorage.getItem(seenKey) || '0')
  } catch {
    previousMs = 0
  }

  if (previousMs > 0) {
    const items = Array.from(document.querySelectorAll<HTMLAnchorElement>('.startpage-weekly-strip a'))
    items.forEach((item) => {
      const strong = item.querySelector('strong')
      const raw = strong?.dataset.date || ''
      const d = new Date(raw)
      if (Number.isNaN(d.getTime()) || d.getTime() <= previousMs) return
      if (item.querySelector('.startpage-new-chip')) return
      const badge = document.createElement('span')
      badge.className = 'startpage-new-chip'
      badge.textContent = 'new'
      item.appendChild(badge)
    })
  }

  try {
    localStorage.setItem(seenKey, String(latestMs))
  } catch {
    // ignore storage errors
  }
}

function setupHomeReleaseFreshnessBadges() {
  if (!isHomeRoute.value) return
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.startpage-release-item'))
  if (cards.length === 0) return

  const now = new Date()
  const nowUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())

  cards.forEach((card) => {
    card.querySelector('.startpage-age-badge')?.remove()
    const dateNode = card.querySelector<HTMLElement>('[data-date]')
    const raw = dateNode?.dataset.date || ''
    if (!raw) return
    const d = new Date(raw)
    if (Number.isNaN(d.getTime())) return

    const dateUTC = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
    const days = Math.max(0, Math.floor((nowUTC - dateUTC) / 86400000))
    const label = days === 0 ? 'Updated today' : days === 1 ? 'Updated 1 day ago' : `Updated ${days} days ago`

    const badge = document.createElement('span')
    badge.className = 'startpage-age-badge'
    badge.textContent = label
    const head = card.querySelector('.startpage-release-head')
    if (head) {
      head.insertAdjacentElement('afterend', badge)
    } else {
      card.prepend(badge)
    }
  })
}

function setupHomeFeaturedPreviewToggle() {
  if (!isHomeRoute.value) return
  const wrap = document.querySelector<HTMLElement>('.startpage-feature-preview')
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.startpage-feature-theme-toggle button[data-preview-theme]'))
  if (!wrap || buttons.length === 0) return

  const setTheme = (theme: string) => {
    wrap.setAttribute('data-preview-active', theme)
    buttons.forEach((btn) => {
      const active = btn.dataset.previewTheme === theme
      btn.classList.toggle('is-active', active)
      btn.setAttribute('aria-pressed', active ? 'true' : 'false')
    })
  }

  buttons.forEach((btn) => {
    btn.onclick = () => setTheme(btn.dataset.previewTheme || 'dark')
  })

  setTheme('dark')
}

function setupHomeFooterTabs() {
  if (!isHomeRoute.value) return
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('.startpage-footer-tabs button[data-footer-tab]'))
  const panels = Array.from(document.querySelectorAll<HTMLElement>('.startpage-footer-panel[data-footer-panel]'))
  if (tabs.length === 0 || panels.length === 0) return

  const setTab = (key: string) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.footerTab === key
      tab.classList.toggle('is-active', active)
      tab.setAttribute('aria-selected', active ? 'true' : 'false')
    })
    panels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.footerPanel === key)
    })
  }

  tabs.forEach((tab) => {
    tab.onclick = () => setTab(tab.dataset.footerTab || 'core')
  })
  setTab('core')
}

function setupAppsIndexFilters() {
  if (!(route.path === '/apps/' || route.path === '/apps/index')) return
  const bar = document.querySelector('.apps-filter-bar')
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.apps-filter-bar button[data-app-filter]'))
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.apps-grid .app-card'))
  if (!bar || buttons.length === 0 || cards.length === 0) return

  const matchesFilter = (card: HTMLElement, filter: string) => {
    if (filter === 'all') return true
    const [kind, valueRaw] = filter.split(':', 2)
    const value = (valueRaw || '').toLowerCase()
    if (kind === 'status') {
      return (card.dataset.status || '').toLowerCase() === value
    }
    if (kind === 'platform') {
      const platforms = (card.dataset.platforms || '').toLowerCase().split(',').map((v) => v.trim())
      return platforms.includes(value)
    }
    return true
  }

  const applyFilter = (filter: string) => {
    buttons.forEach((btn) => btn.classList.toggle('is-active', (btn.dataset.appFilter || 'all') === filter))
    cards.forEach((card) => {
      card.classList.toggle('is-filter-hidden', !matchesFilter(card, filter))
    })
  }

  buttons.forEach((btn) => {
    btn.onclick = () => applyFilter(btn.dataset.appFilter || 'all')
  })
  applyFilter('all')
}

async function loadMediaHashes() {
  if (mediaHashCache) return mediaHashCache
  try {
    const res = await fetch('/media/media-hashes.json', { cache: 'no-store' })
    if (!res.ok) return null
    mediaHashCache = await res.json() as Record<string, string>
    return mediaHashCache
  } catch {
    return null
  }
}

function appendHash(url: string, hashes: Record<string, string>) {
  if (!url.startsWith('/media/')) return url
  const [path, existingQuery] = url.split('?')
  const key = path.replace('/media/', '')
  const hash = hashes[key]
  if (!hash) return url
  const query = existingQuery ? `${existingQuery}&h=${hash}` : `h=${hash}`
  return `${path}?${query}`
}

async function setupMediaCacheKeys() {
  const hashes = await loadMediaHashes()
  if (!hashes) return

  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img[src^="/media/"]'))
  imgs.forEach((img) => {
    img.src = appendHash(img.getAttribute('src') || '', hashes)
    const srcset = img.getAttribute('srcset')
    if (srcset) {
      const next = srcset
        .split(',')
        .map((part) => {
          const [url, descriptor] = part.trim().split(/\s+/, 2)
          return `${appendHash(url, hashes)}${descriptor ? ` ${descriptor}` : ''}`
        })
        .join(', ')
      img.setAttribute('srcset', next)
    }
  })

  const sources = Array.from(document.querySelectorAll<HTMLSourceElement>('source[srcset*="/media/"]'))
  sources.forEach((source) => {
    const srcset = source.getAttribute('srcset')
    if (!srcset) return
    const next = srcset
      .split(',')
      .map((part) => {
        const [url, descriptor] = part.trim().split(/\s+/, 2)
        return `${appendHash(url, hashes)}${descriptor ? ` ${descriptor}` : ''}`
      })
      .join(', ')
    source.setAttribute('srcset', next)
  })
}

function setupClickAnalytics() {
  cleanupAnalytics()

  const onClick = (evt: Event) => {
    const target = evt.target as HTMLElement | null
    if (!target) return
    const link = target.closest('a') as HTMLAnchorElement | null
    if (!link) return

    if (link.classList.contains('h3p-nav-search-hint')) {
      trackEvent('nav_search_hint_click', { route: route.path })
      return
    }

    if (link.closest('.h3p-page-feedback')) {
      if (link.classList.contains('feedback-yes')) trackEvent('docs_feedback_yes_click', { route: route.path })
      if (link.classList.contains('feedback-no')) trackEvent('docs_feedback_no_click', { route: route.path })
      if (link.classList.contains('feedback-visual-bug')) trackEvent('docs_feedback_visual_bug_click', { route: route.path })
      return
    }

    if (!isHomeRoute.value) return

    if (link.closest('.VPHero') && link.getAttribute('href') === '/apps/index') {
      trackEvent('home_primary_cta_click', { location: 'hero', target: '/apps/index' })
      return
    }

    if (link.closest('.startpage-start-here')) {
      trackEvent('home_start_here_click', { href: link.getAttribute('href') || '' })
      return
    }

    if (link.closest('.startpage-release-item')) {
      trackEvent('home_release_strip_click', { href: link.getAttribute('href') || '' })
      return
    }

    if (link.closest('.startpage-use-cases')) {
      trackEvent('home_use_case_click', { href: link.getAttribute('href') || '' })
      return
    }

    if (link.closest('.startpage-search-examples')) {
      trackEvent('home_search_example_click', { href: link.getAttribute('href') || '' })
    }
  }

  document.addEventListener('click', onClick)
  analyticsCleanup = () => document.removeEventListener('click', onClick)
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

  const targets = Array.from(container.querySelectorAll<HTMLElement>('.overview-reveal, .overview-hero, h2, h3, p, ul')).filter((el) => !el.closest('pre, code'))

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
  applyAppThemeClass()
  linkHomeHeroBadge()
  ensureHomeWidgets()
  setupOverviewReveal()
  setupAsideProgress()
  setupDocStats()
  setupHeadingTools()
  setupImageSkeletons()
  setupLocalizedDates()
  setupHomeSectionCopyLinks()
  setupHomeFeatureDecor()
  setupHomeLastUpdated()
  setupHomeWhatsNewDelta()
  setupHomeReleaseFreshnessBadges()
  setupHomeFeaturedPreviewToggle()
  setupHomeFooterTabs()
  setupAppsIndexFilters()
  setupClickAnalytics()
  await setupMediaCacheKeys()
  await setupAppsIndexUpdateBadges()
  setupAppsCarousel()
}

onMounted(async () => {
  loadHeroFxPreference()
  loadCompactCardsPreference()
  loadReadingModePreference()
  await applyPageEnhancements()
})

watch(
  () => route.path,
  async () => {
    applyReadingModeClass()
    await applyPageEnhancements()
  }
)

onBeforeUnmount(() => {
  cleanupRevealObserver()
  cleanupAsideProgress()
  cleanupCarousel()
  cleanupParallax()
  cleanupAnalytics()
})
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <a class="h3p-nav-search-hint" href="#" @click.prevent="openSearch">
        Search <kbd>/</kbd>
      </a>
      <button
        class="h3p-compact-toggle"
        type="button"
        :aria-pressed="compactCardsEnabled"
        @click="toggleCompactCards"
      >
        Compact {{ compactCardsEnabled ? 'On' : 'Off' }}
      </button>
      <button
        class="h3p-hero-fx-toggle"
        type="button"
        :aria-pressed="heroFxEnabled"
        @click="toggleHeroFx"
      >
        FX {{ heroFxEnabled ? 'On' : 'Off' }}
      </button>
      <button
        class="h3p-lang-selector"
        type="button"
        aria-label="Language selector"
        title="Language: English"
      >
        EN
      </button>
      <button
        v-if="!isHomeRoute"
        class="h3p-reading-toggle"
        type="button"
        :aria-pressed="readingModeEnabled"
        @click="toggleReadingMode"
      >
        Read {{ readingModeEnabled ? 'On' : 'Off' }}
      </button>
      <a class="h3p-top-logo" href="/" aria-label="h3p apps home">
        <img class="h3p-logo-light" src="/brand/logo-light.png" alt="H3P logo" />
        <img class="h3p-logo-dark" src="/brand/logo-dark.png" alt="H3P logo" />
      </a>
    </template>

    <template #doc-top>
      <div v-if="isAppDocPage || appDocTopLinks.length > 0" class="h3p-doc-top-navs">
        <nav v-if="isAppDocPage" class="h3p-app-switcher" aria-label="App switcher">
          <a v-for="item in topSwitcherLinks" :key="item.key" :href="item.link" :class="{ active: activeSwitcher(item.key) }">{{ item.text }}</a>
        </nav>
        <nav v-if="appDocTopLinks.length > 0" class="h3p-doc-jump-rail" aria-label="Quick jump">
          <a v-for="item in appDocTopLinks" :key="item.link" :href="item.link">{{ item.text }}</a>
        </nav>
      </div>
      <p v-if="isAppDocPage" class="h3p-doc-last-updated">Last updated: {{ currentAppUpdatedOn }}</p>
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

    <template #doc-bottom>
      <section v-if="appDocRelatedLinks.length > 0" class="h3p-related-pages" aria-label="Next recommended reads">
        <h2>Next recommended read</h2>
        <div class="h3p-related-grid">
          <a v-for="item in appDocRelatedLinks" :key="item.link" :href="item.link" class="h3p-related-card">
            <span>{{ item.text }}</span>
            <strong>Open</strong>
          </a>
        </div>
      </section>
      <section v-if="!isHomeRoute" class="h3p-page-feedback" aria-label="Page feedback">
        <p>Was this page helpful?</p>
        <div class="h3p-page-feedback-actions">
          <a class="feedback-yes" :href="feedbackYesHref" target="_blank" rel="noreferrer noopener">Yes</a>
          <a class="feedback-no" :href="feedbackNoHref" target="_blank" rel="noreferrer noopener">No</a>
          <a class="feedback-visual-bug" :href="visualBugHref" target="_blank" rel="noreferrer noopener">Report visual bug</a>
          <a href="/support/support-and-feedback">Support</a>
        </div>
      </section>
      <a v-if="isAppDocPage" class="h3p-back-apps-fab" href="/apps/index" aria-label="Back to all apps">Back to apps</a>
    </template>

    <template #not-found>
      <section class="h3p-not-found">
        <h1>Page not found</h1>
        <p>The page may have moved. Jump to a known section:</p>
        <div class="h3p-not-found-links">
          <a href="/">Home</a>
          <a href="/apps/index">All Apps</a>
          <a href="/apps/neon-vision-editor/overview">Neon Vision Editor</a>
          <a href="/apps/metric-data/overview">Metric Data</a>
          <a href="/apps/release-assistant/overview">Release Assistant</a>
        </div>
        <p class="hint">Tip: press <kbd>/</kbd> to search documentation.</p>
      </section>
    </template>
  </Layout>
</template>
