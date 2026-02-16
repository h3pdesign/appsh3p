import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Your App Docs',
  description: 'Documentation portal for your apps',
  sitemap: {
    hostname: 'https://apps-h3p.com'
  },
  lang: 'en-US',
  cleanUrls: true,

  themeConfig: {
    siteTitle: 'App Docs',

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
          { text: 'App One: Overview', link: '/apps/app-one/overview' },
          { text: 'App One: Installation', link: '/apps/app-one/installation' },
          { text: 'App One: Features', link: '/apps/app-one/features' },
          { text: 'App Two: Overview', link: '/apps/app-two/overview' },
          { text: 'App Two: Installation', link: '/apps/app-two/installation' },
          { text: 'App Two: Features', link: '/apps/app-two/features' },
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
      { icon: 'github', link: 'https://github.com/your-org/your-repo' }
    ]
  }
})
