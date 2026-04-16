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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on April 16, 2026._

## v0.6.1 (published April 16, 2026)

Release link: [GitHub Release v0.6.1](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.6.1)

- The project sidebar is now more complete for day-to-day file management with better structure controls and direct item actions.
- Markdown Preview toolbar controls are cleaner and more discoverable with dedicated export/style actions plus localized labels.
- Added project sidebar item actions for creating files/folders, plus rename, duplicate, and delete flows.
- Refined project sidebar visual hierarchy and interaction density for clearer navigation in large trees.
- Added a dedicated Markdown Preview style toolbar button and consolidated export options into toolbar menus that appear only when preview is active.
- Expanded localization coverage for new Markdown Preview toolbar strings (including Simplified Chinese additions).
- Fixed missing localization coverage for newly introduced Markdown Preview toolbar labels/help text.
- Fixed Markdown Preview toolbar/menu availability so controls appear only in Markdown Preview mode.
- [#77](https://github.com/h3pdesign/Neon-Vision-Editor/issues/77) `[UI]: Refine project sidebar layout and visual hierarchy`
- [#78](https://github.com/h3pdesign/Neon-Vision-Editor/issues/78) `[Feature]: Add rename, delete, and duplicate actions for project items`

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
