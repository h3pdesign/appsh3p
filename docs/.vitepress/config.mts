import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'startpage for h3p apps',
  description: 'Documentation portal for H3P apps',
  sitemap: {
    hostname: 'https://apps-h3p.com'
  },
  appearance: 'dark',
  lang: 'en-US',
  cleanUrls: true,

  themeConfig: {
    siteTitle: 'startpage for h3p apps',

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
          { text: 'Neon Vision Editor: Installation', link: '/apps/neon-vision-editor/installation' },
          { text: 'Neon Vision Editor: Features', link: '/apps/neon-vision-editor/features' },
          { text: 'Metric Data: Overview', link: '/apps/metric-data/overview' },
          { text: 'Metric Data: Installation', link: '/apps/metric-data/installation' },
          { text: 'Metric Data: Features', link: '/apps/metric-data/features' },
          { text: 'Release Assistant: Overview', link: '/apps/release-assistant/overview' },
          { text: 'Release Assistant: Installation', link: '/apps/release-assistant/installation' },
          { text: 'Release Assistant: Features', link: '/apps/release-assistant/features' },
          { text: 'Add New App', link: '/apps/add-new-app' }
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
