---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/neon-vision-editor-hero.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/neon-vision-editor-hero.png
---

# Neon Vision Editor Changelog

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on July 2, 2026._

## v0.8.3 (published July 2, 2026)

Release link: [GitHub Release v0.8.3](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.8.3)

- Expands Markdown preview compatibility with GitHub Flavored Markdown, safer re-rendering, and syntax-colored code blocks.
- Polishes macOS Settings sizing, translucency, and theme controls while keeping iPad editor and preview text sizes aligned.
- Added GitHub Flavored Markdown as the default preview mode while keeping CommonMark compatibility available.
- Added Markdown code-block language controls and syntax highlighting with theme-aware, higher-contrast colors.
- Enabled line wrap by default for new installs across supported platforms while preserving existing user preferences.
- Reduced editor/preview update overhead so Markdown edits and preview refreshes stay responsive during active typing.
- Required HTTPS for custom AI provider endpoints to keep user-configured network integrations on secure transports.
- Fixed Markdown preview text sizing on iPad so preview text tracks the editor font size instead of rendering noticeably larger.
- Restored translucent Settings surfaces in translucent mode and kept vibrant syntax colors distinct from code-block backgrounds.

## v0.4.22 (published February 16, 2026)

Release link: [GitHub Release v0.4.22](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.4.22)

- Added shared syntax-regex compilation cache across highlight passes on macOS and iOS.
- Improved large-document responsiveness by avoiding full regex reprocessing on caret-only moves.
- Improved iOS line-number gutter performance by caching line-count driven rendering paths.
- Fixed macOS ruler hot-path overhead with cached UTF-16 line-start indexing and logarithmic lookup.

## v0.4.21 (published February 16, 2026)

Release link: [GitHub Release v0.4.21](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.4.21)

- Added curated popular themes including Dracula, One Dark Pro, Nord, Tokyo Night, and Gruvbox.
- Improved direct-distribution updater flow with in-app download, verification, and staged install.
- Improved updater safety by constraining install actions to direct-distribution macOS builds.
- Fixed Main Thread Checker violations around `NSTextView` string and selection snapshots.
- Fixed Neon Glow token mapping for intended palette readability.

## v1.0.0 milestone context

- App is available on [App Store](https://apps.apple.com/de/app/neon-vision-editor/id6758950965) with preview builds via [TestFlight](https://testflight.apple.com/join/YWB2fGAP).
- Core launch scope included macOS, iPadOS, and iOS platform parity with native implementation.

## Related Pages

- [Overview](/apps/neon-vision-editor/overview)
- [Launch Story](/apps/neon-vision-editor/launch-story)
- [Features](/apps/neon-vision-editor/features)
- [Gallery](/apps/neon-vision-editor/gallery)
- [Known Issues](/apps/neon-vision-editor/known-issues)
- [FAQ](/apps/neon-vision-editor/faq)
