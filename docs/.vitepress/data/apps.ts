export type AppCatalogEntry = {
  slug: string
  name: string
  category: string
  description: string
  icon: string
  status: 'public' | 'private' | 'internal'
  statusLabel: string
  version: string
  releaseDate: string
  platforms: string[]
  useCases: string[]
  overview: string
  installation: string
  changelog: string
  privacy: string
  installLabel: string
  installUrl: string
  privacySummary: string
}

/** Single source of truth for app-page CTAs, comparison content, and filters. */
export const appCatalog: AppCatalogEntry[] = [
  {
    slug: 'neon-vision-editor', name: 'Neon Vision Editor', category: 'Native text, Markdown, and code editor',
    description: 'A focused editor for real files across Apple platforms.', icon: '/icons/neon-vision-editor.png?v=20260401-2',
    status: 'public', statusLabel: 'Public release', version: '1.4.6', releaseDate: '2026-08-16', platforms: ['macOS', 'iPadOS', 'iOS', 'visionOS'],
    useCases: ['coding', 'markdown', 'ai'], overview: '/apps/neon-vision-editor/overview', installation: '/apps/neon-vision-editor/installation', changelog: '/apps/neon-vision-editor/changelog', privacy: '/policies/ai-and-data',
    installLabel: 'GitHub Releases', installUrl: 'https://github.com/h3pdesign/Neon-Vision-Editor/releases', privacySummary: 'Local-first editing; AI data handling is documented and user-controlled.'
  },
  {
    slug: 'gitbird', name: 'GitBird', category: 'Git notification menu bar app',
    description: 'A native macOS menu bar app for GitHub and GitLab notifications.', icon: '/icons/gitbird.png?v=20260809-1',
    status: 'public', statusLabel: 'Public release', version: '2.1.4', releaseDate: '2026-08-05', platforms: ['macOS'],
    useCases: ['git', 'notifications', 'developer'], overview: '/apps/gitbird/overview', installation: '/apps/gitbird/installation', changelog: '/apps/gitbird/changelog', privacy: '/apps/gitbird/privacy-policy',
    installLabel: 'GitHub Releases', installUrl: 'https://github.com/h3pdesign/GitBird/releases', privacySummary: 'Provider tokens are stored in Keychain and used only for configured GitHub or GitLab HTTPS hosts.'
  },
  {
    slug: 'liquid-record', name: 'Liquid Record', category: 'Field recorder and audio capture',
    description: 'An iPhone field-recorder console for WAV capture, markers, playback, and export.', icon: '/icons/liquid-record.png?v=20260809-1',
    status: 'private', statusLabel: 'Private alpha', version: '1.0.1', releaseDate: '2026-08-09', platforms: ['iOS'],
    useCases: ['audio', 'recording', 'workflow'], overview: '/apps/liquid-record/overview', installation: '/apps/liquid-record/installation', changelog: '/apps/liquid-record/changelog', privacy: '/apps/liquid-record/privacy-policy',
    installLabel: 'Request access', installUrl: '/support/support-and-feedback', privacySummary: 'Offline-first local WAV recording with microphone permission requested only from the record action.'
  },
  {
    slug: 'metric-data', name: 'Metrics Data', category: 'AdSense and GA4 analytics workspace',
    description: 'Focused AdSense and GA4 reporting with secure, account-owned access.', icon: '/icons/metric-data.png?v=20260430-1',
    status: 'public', statusLabel: 'App Store release', version: '0.2.6', releaseDate: '2026-06-11', platforms: ['iOS', 'iPadOS', 'macOS', 'visionOS', 'watchOS'],
    useCases: ['analytics', 'reporting'], overview: '/apps/metric-data/overview', installation: '/apps/metric-data/installation', changelog: '/apps/metric-data/changelog', privacy: '/apps/metric-data/privacy-policy',
    installLabel: 'App Store', installUrl: 'https://apps.apple.com/us/app/metrics-data/id6758959570', privacySummary: 'Google account data is user-authorized; App Store privacy lists Data Not Collected.'
  },
  {
    slug: 'x-newsbook', name: 'X-Newsbook', category: 'Reading and news library',
    description: 'A calm, reading-first home for feeds, saved stories, and context.', icon: '/icons/x-newsbook.png?v=20260430-1',
    status: 'private', statusLabel: 'Private beta', version: '10', releaseDate: '2026-02-13', platforms: ['macOS', 'iPadOS', 'iOS'],
    useCases: ['reading', 'research'], overview: '/apps/x-newsbook/overview', installation: '/apps/x-newsbook/installation', changelog: '/apps/x-newsbook/changelog', privacy: '/policies/privacy-policy',
    installLabel: 'Request access', installUrl: '/support/support-and-feedback', privacySummary: 'Covered by the website privacy policy; no public download is listed.'
  },
  {
    slug: 'release-assistant', name: 'Release Assistant', category: 'Release operations',
    description: 'Guarded release workflows with clear checks and audit-ready output.', icon: '/icons/release-assistant.png?v=20260430-1',
    status: 'internal', statusLabel: 'Internal alpha', version: '0.2.0', releaseDate: '2026-05-06', platforms: ['macOS'],
    useCases: ['release', 'automation'], overview: '/apps/release-assistant/overview', installation: '/apps/release-assistant/installation', changelog: '/apps/release-assistant/changelog', privacy: '/policies/privacy-policy',
    installLabel: 'Request access', installUrl: '/support/support-and-feedback', privacySummary: 'Internal tool; access is granted manually and documented through support.'
  },
  {
    slug: 'image-sorter', name: 'Image Sorter', category: 'Visual asset workflow',
    description: 'A deliberate queue for organizing, naming, and processing images.', icon: '/icons/image-sorter.png?v=20260302-1',
    status: 'private', statusLabel: 'Private beta', version: '0.1', releaseDate: '2026-04-30', platforms: ['macOS'],
    useCases: ['visual', 'workflow'], overview: '/apps/image-sorter/overview', installation: '/apps/image-sorter/installation', changelog: '/apps/image-sorter/changelog', privacy: '/policies/privacy-policy',
    installLabel: 'Request access', installUrl: '/support/support-and-feedback', privacySummary: 'Local file workflow; access is private while the app is in beta.'
  },
  {
    slug: 'vistral', name: 'Vistral', category: 'Personal data visualization',
    description: 'Private, explainable dashboards for the data you choose to explore.', icon: '/icons/vistral.png?v=20260430-1',
    status: 'private', statusLabel: 'TestFlight beta', version: '0.1.6', releaseDate: '2026-05-09', platforms: ['macOS', 'iPadOS', 'iOS', 'tvOS', 'watchOS', 'visionOS'],
    useCases: ['analytics', 'visual', 'insights'], overview: '/apps/vistral/overview', installation: '/apps/vistral/installation', changelog: '/apps/vistral/changelog', privacy: '/policies/privacy-policy',
    installLabel: 'TestFlight', installUrl: '/support/support-and-feedback', privacySummary: 'Local-first analytics for data the user chooses to explore; beta access is handled through TestFlight.'
  },
  {
    slug: 'history-vision', name: 'History Vision', category: 'History and timelines',
    description: 'Source-aware stories, timelines, and visual comparisons.', icon: '/icons/history-vision.png?v=20260430-1',
    status: 'private', statusLabel: 'Private beta', version: '1.0', releaseDate: '2026-04-30', platforms: ['macOS', 'iPadOS', 'iOS'],
    useCases: ['history', 'research', 'reading'], overview: '/apps/history-vision/overview', installation: '/apps/history-vision/installation', changelog: '/apps/history-vision/changelog', privacy: '/policies/privacy-policy',
    installLabel: 'Request access', installUrl: '/support/support-and-feedback', privacySummary: 'Source-aware reading experience; private beta access is handled through support.'
  },
  {
    slug: 'lingua-latina', name: 'Lingua Latina', category: 'Latin language study',
    description: 'Dictionary, morphology, grammar, and vocabulary in one native study space.', icon: '/icons/lingua-latina.png?v=20260430-1',
    status: 'public', statusLabel: 'App Store release', version: '1.1.0', releaseDate: '2026-08-08', platforms: ['iOS', 'iPadOS', 'macOS', 'visionOS'],
    useCases: ['language', 'study'], overview: '/apps/lingua-latina/overview', installation: '/apps/lingua-latina/installation', changelog: '/apps/lingua-latina/changelog', privacy: '/apps/lingua-latina/privacy-policy',
    installLabel: 'App Store', installUrl: 'https://apps.apple.com/us/app/lingua-latina/id6767503541', privacySummary: 'App Store privacy lists Data Not Collected; optional external AI providers are user-enabled.'
  }
]

export const appCatalogBySlug = Object.fromEntries(appCatalog.map((app) => [app.slug, app])) as Record<string, AppCatalogEntry>
