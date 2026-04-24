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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on April 24, 2026._

## v0.6.2 (published April 24, 2026)

Release link: [GitHub Release v0.6.2](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.6.2)

- Find-in-files now supports selective project-wide replace with explicit preview and cancellation controls.
- Navigation and edit workflows are faster with direct `Go to Line` and `Go to Symbol` commands.
- macOS sidebar and tour overlays are more comfortable and consistent for daily keyboard/mouse use.
- Project sidebar disclosure controls now align better with file rows and are easier to recognize.
- Added selective project-wide replace from `Find in Files` with match selection controls (`Select All`, `Select None`), apply, and cancel.
- Added `Go to Line` and `Go to Symbol` entry points for faster in-document navigation.
- Improved Code Snapshot composer layout on macOS so settings controls track the snapshot composition width more tightly.
- Added support for opening `.cif` and `.mcif` files as plain-text documents.
- Added a configurable project-sidebar disclosure symbol style (`Chevron`, `Triangle`, `Caret`, `Plus/Minus`) in sidebar/global settings.
- Fixed macOS sidebar disclosure spacing so project disclosure controls are no longer pinned too close to the left edge.

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
