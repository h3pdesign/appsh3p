import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'h3p apps',
  titleTemplate: ':title | h3p apps',
  description: 'Clean and modern apps by H3P with guides, changelogs, and platform documentation.',
  sitemap: {
    hostname: 'https://apps-h3p.com'
  },
  head: [
    ['meta', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' }],
    ['meta', { name: 'author', content: 'H3P' }],
    ['meta', { name: 'theme-color', content: '#0b7cff' }],
    ['meta', { name: 'referrer', content: 'strict-origin-when-cross-origin' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { property: 'og:site_name', content: 'h3p apps' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:title', content: 'h3p apps' }],
    ['meta', { property: 'og:description', content: 'Clean and modern apps by H3P with guides, changelogs, and platform documentation.' }],
    ['meta', { property: 'og:url', content: 'https://apps-h3p.com/' }],
    ['meta', { property: 'og:image', content: 'https://apps-h3p.com/media/neon-vision-editor-hero.png' }],
    ['meta', { property: 'og:image:alt', content: 'h3p apps documentation and app previews' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'h3p apps' }],
    ['meta', { name: 'twitter:description', content: 'Clean and modern apps by H3P with guides, changelogs, and platform documentation.' }],
    ['meta', { name: 'twitter:image', content: 'https://apps-h3p.com/media/neon-vision-editor-hero.png' }],
    ['meta', { name: 'twitter:creator', content: '@h3palpha' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon-light.svg', media: '(prefers-color-scheme: light)' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon-dark.svg', media: '(prefers-color-scheme: dark)' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['script', { type: 'application/ld+json' }, '{"@context":"https://schema.org","@type":"WebSite","name":"h3p apps","url":"https://apps-h3p.com","potentialAction":{"@type":"SearchAction","target":"https://apps-h3p.com/?q={search_term_string}","query-input":"required name=search_term_string"}}'],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#0b7cff' }],
    ['link', { rel: 'canonical', href: 'https://apps-h3p.com/' }]
  ],
  appearance: true,
  lang: 'en-US',
  cleanUrls: true,

  themeConfig: {
    siteTitle: 'h3p apps',
    aside: false,
    footer: {
      message: 'Clean and modern development',
      copyright: 'Copyright 2026 by h3p Hilthart Pedersen.'
    },

    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/introduction' },
      { text: 'Apps', link: '/apps/index' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Policies', link: '/policies/index' },
      { text: 'All Work', link: 'https://h3pdesign.github.io/' },
      { text: 'Politics Monitor', link: 'https://apps-h3p.com/polymarket-us-politics/conflict-monitor.html' },
      { text: 'Support', link: '/support/' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/h3pdesign/appsh3p' },
      { icon: 'x', link: 'https://twitter.com/h3palpha' }
    ]
  }
})
