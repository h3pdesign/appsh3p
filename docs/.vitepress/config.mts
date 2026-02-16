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
    ['meta', { property: 'og:site_name', content: 'h3p apps' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'h3p apps' }],
    ['meta', { property: 'og:description', content: 'Clean and modern apps by H3P with guides, changelogs, and platform documentation.' }],
    ['meta', { property: 'og:url', content: 'https://apps-h3p.com/' }],
    ['meta', { property: 'og:image', content: 'https://apps-h3p.com/media/neon-vision-editor-hero.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'h3p apps' }],
    ['meta', { name: 'twitter:description', content: 'Clean and modern apps by H3P with guides, changelogs, and platform documentation.' }],
    ['meta', { name: 'twitter:image', content: 'https://apps-h3p.com/media/neon-vision-editor-hero.png' }],
    ['link', { rel: 'canonical', href: 'https://apps-h3p.com/' }]
  ],
  appearance: true,
  lang: 'en-US',
  cleanUrls: true,

  themeConfig: {
    siteTitle: 'h3p apps',

    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/introduction' },
      { text: 'Apps', link: '/apps/index' },
      { text: 'Policies', link: '/policies/api-stability' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/getting-started/introduction' },
          { text: 'Who This Is For', link: '/getting-started/who-this-is-for' },
          { text: 'Documentation Standards', link: '/getting-started/documentation-standards' },
          { text: 'Platform Support', link: '/getting-started/platform-support' },
          { text: 'Release Notes Workflow', link: '/getting-started/release-notes-workflow' }
        ]
      },
      {
        text: 'Apps',
        items: [
          { text: 'All Apps', link: '/apps/index' },
          { text: 'GitHub Repositories', link: '/apps/github-repositories' },

          { text: 'Neon Vision Editor: Overview', link: '/apps/neon-vision-editor/overview' },
          { text: 'Neon Vision Editor: Launch Story', link: '/apps/neon-vision-editor/launch-story' },
          { text: 'Neon Vision Editor: Installation', link: '/apps/neon-vision-editor/installation' },
          { text: 'Neon Vision Editor: Features', link: '/apps/neon-vision-editor/features' },
          { text: 'Neon Vision Editor: Gallery', link: '/apps/neon-vision-editor/gallery' },
          { text: 'Neon Vision Editor: Changelog', link: '/apps/neon-vision-editor/changelog' },
          { text: 'Neon Vision Editor: Known Issues', link: '/apps/neon-vision-editor/known-issues' },
          { text: 'Neon Vision Editor: FAQ', link: '/apps/neon-vision-editor/faq' },

          { text: 'Metric Data: Overview', link: '/apps/metric-data/overview' },
          { text: 'Metric Data: Installation', link: '/apps/metric-data/installation' },
          { text: 'Metric Data: Features', link: '/apps/metric-data/features' },
          { text: 'Metric Data: Gallery', link: '/apps/metric-data/gallery' },
          { text: 'Metric Data: Known Issues', link: '/apps/metric-data/known-issues' },
          { text: 'Metric Data: FAQ', link: '/apps/metric-data/faq' },

          { text: 'Release Assistant: Overview', link: '/apps/release-assistant/overview' },
          { text: 'Release Assistant: Installation', link: '/apps/release-assistant/installation' },
          { text: 'Release Assistant: Features', link: '/apps/release-assistant/features' },
          { text: 'Release Assistant: Gallery', link: '/apps/release-assistant/gallery' },
          { text: 'Release Assistant: Known Issues', link: '/apps/release-assistant/known-issues' },
          { text: 'Release Assistant: FAQ', link: '/apps/release-assistant/faq' }
        ]
      },
      {
        text: 'Policies',
        items: [
          { text: 'API Stability', link: '/policies/api-stability' },
          { text: 'Roadmap', link: '/policies/roadmap' },
          { text: 'Contributing', link: '/policies/contributing' },
          { text: 'License', link: '/policies/license' }
        ]
      },
      {
        text: 'Support',
        items: [
          { text: 'Support and Feedback', link: '/support/support-and-feedback' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/h3pdesign/appsh3p' }
    ]
  }
})
