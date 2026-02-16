import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'h3p apps',
  description: 'Documentation portal for H3P apps',
  sitemap: {
    hostname: 'https://apps-h3p.com'
  },
  appearance: 'dark',
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
