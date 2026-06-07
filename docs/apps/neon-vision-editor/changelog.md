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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on June 7, 2026._

## v0.7.6 (published June 7, 2026)

Release link: [GitHub Release v0.7.6](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.7.6)

- Fixes Markdown preview clipping on iPhone by tightening compact preview controls and adding regression coverage for constrained preview widths.
- Stabilizes Swift editor scrolling when bold keywords, current-line highlighting, matching-bracket highlighting, and line wrapping settings interact.
- Improves macOS Settings by making the window user-resizable and reorganizing dense editor/theme controls into cleaner, scroll-safe sections.
- Added configurable status bar items for cursor position, line count, word count, encoding, line endings, indentation, selection size, file size, Git branch/changes, and Markdown preview theme.
- Reworked the macOS Themes settings tab into balanced cards with integrated theme preview, theme selection, theme colors, formatting, and Markdown preview controls.
- Added Markdown preview theme audit coverage and compact clipping fixtures for iPhone-sized layouts.
- Added localization audit coverage for settings/status bar strings.
- Added a manual release QA checklist covering Markdown preview themes, editor overlays, Settings resize behavior, status bar density, and project sidebar spacing.
- Fixed iPhone Markdown preview theme content and control cards being clipped in compact layouts.
- Fixed macOS editor flicker and disappearing text while scrolling Swift code with bold keywords, current-line highlighting, matching-bracket highlighting, and line wrap combinations.

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
