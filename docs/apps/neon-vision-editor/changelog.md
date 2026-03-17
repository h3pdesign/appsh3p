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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on March 17, 2026._

## v0.5.6 (published March 17, 2026)

Release link: [GitHub Release v0.5.6](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.5.6)

- Safe Mode now recovers from repeated failed launches without getting stuck on every normal restart.
- Large project folders now get a background file index that feeds `Quick Open` and `Find in Files` instead of relying only on live folder scans.
- Markdown documents can now be exported directly from preview as PDF in both paginated and one-page formats.
- Theme formatting and Settings polish now apply immediately, with better localization and an iPad hardware-keyboard Vim MVP.
- Added Safe Mode startup recovery with repeated-failure detection, blank-document launch fallback, a dedicated startup explanation, and a `Normal Next Launch` recovery action.
- Added a background project file index for larger folders and wired it into `Quick Open`, `Find in Files`, and project refresh flows.
- Added Markdown preview PDF export with paginated and one-page output modes.
- Added an iPad hardware-keyboard Vim MVP with core normal-mode navigation/editing commands and shared mode-state reporting.
- Added theme formatting controls for bold keywords, italic comments, underlined links, and bold Markdown headings across active themes.
- Fixed theme-formatting updates so editor styling refreshes immediately without requiring a theme switch.

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
