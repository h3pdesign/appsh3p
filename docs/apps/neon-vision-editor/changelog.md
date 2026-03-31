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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on March 30, 2026._

## v0.6.0 (published March 30, 2026)

Release link: [GitHub Release v0.6.0](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.6.0)

- Remote workflows are clearer on every active surface, with better tab/session state, safer conflict recovery, and more complete iPhone/iPad remote-session support.
- Search, `Find in Files`, and `Find & Replace` are much more mature across macOS, iPhone, and iPad, with stronger keyboard flow, clearer match visibility, better sizing, and cleaner panel layouts.
- Markdown Preview is more polished on all platforms with stronger live-preview readability, full-window themed preview rendering, and clearer export/share feedback.
- iPad editor chrome is more consistent, including tighter toolbar overflow behavior and better default sizing for the project-structure sidebar.
- German localization is more complete, especially in Settings and the recently polished search/preview surfaces.
- Completed the `0.6.0` remote-workflow line with clearer remote tab/document/session state, broker failure clarity, explicit compare-before-reload conflict handling, and safer unsupported-file handling in the remote browser.
- Expanded search and navigation maturity with stronger `Quick Open` ranking, clearer search-source/status messaging, grouped `Find in Files` results, direct toolbar entry points, and improved Return/selection behavior.
- Added more cross-platform keyboard parity on iPad, including sidebar shortcuts, Settings tab navigation, and result-list arrow-key movement in search panels.
- Polished Markdown Preview with clearer export affordances, full-window live preview rendering, larger preview typography, and lightweight copy/export status messaging.
- Continued cross-platform UI refinement for `Find & Replace`, `Find in Files`, project sidebar defaults, toolbar overflow placement, and theme selection visibility.

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
