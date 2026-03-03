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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on March 3, 2026._

## v0.4.33 (published March 3, 2026)

Release link: [GitHub Release v0.4.33](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.4.33)

- Added performance instrumentation for startup first-paint/first-keystroke and file-open latency in debug builds.
- Added iPad hardware-keyboard shortcut bridging for New Tab, Open, Save, Find, Find in Files, and Command Palette.
- Added local runtime reliability monitoring with previous-run crash bucketing and main-thread stall watchdog logging in debug.
- Improved command palette behavior with fuzzy matching, command entries, and recent-selection ranking.
- Improved large-file responsiveness by forcing throttle mode during load/import and reevaluating after idle.
- Improved project-wide search on macOS via ripgrep-backed Find in Files with fallback scanning.
- Improved iPad toolbar usability with larger minimum touch targets for promoted actions.
- Fixed startup restore flow to recover unsaved draft checkpoints before blank-document startup mode.
- Fixed command/find panels with explicit accessibility labels, hints, and initial focus behavior.

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

- App is available on [App Store](https://apps.apple.com/de/app/neon-vision-editor/id6758950965) and beta via [TestFlight](https://testflight.apple.com/join/YWB2fGAP).
- Core launch scope included macOS, iPadOS, and iOS platform parity with native implementation.

## Related Pages

- [Overview](/apps/neon-vision-editor/overview)
- [Launch Story](/apps/neon-vision-editor/launch-story)
- [Features](/apps/neon-vision-editor/features)
- [Gallery](/apps/neon-vision-editor/gallery)
- [Known Issues](/apps/neon-vision-editor/known-issues)
- [FAQ](/apps/neon-vision-editor/faq)
