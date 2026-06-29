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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on June 28, 2026._

## v0.8.2 (published June 28, 2026)

Release link: [GitHub Release v0.8.2](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.8.2)

- Improves visionOS settings with a compact two-pane layout, clearer categories, and less wasted space.
- Fixes visionOS toolbar placement and spacing so actions use the available window width more predictably.
- Refines macOS translucent sidebars and resize handling so editor chrome feels cleaner while preserving usable resize hit areas.
- Reworked visionOS Settings into a narrow category rail and detailed form sections for General, Editor, Appearance, Toolbar, AI, Remote, Shortcuts, and Diagnostics.
- Added compact toolbar settings outside General so long toggle lists no longer create large gaps in the main settings view.
- Tuned macOS sidebar/tab transitions and translucent backgrounds for a smoother editor/sidebar boundary.
- Fixed clipped visionOS welcome controls, blank visionOS app icon metadata, toolbar alignment, and settings backgrounds.
- Fixed macOS sidebar resize cursor behavior by keeping the resize hit zone usable while hiding visible divider rails.
- Fixed right-sidebar tab bar transition behavior so the fade is only active when a sidebar is visible.

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
