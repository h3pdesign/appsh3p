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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on June 9, 2026._

## v0.7.7 (published June 9, 2026)

Release link: [GitHub Release v0.7.7](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.7.7)

- Improves iPad Welcome Tour spacing so the What's New cards, page dots, and navigation buttons sit closer together in compact form sheets.
- Makes iPad Find & Replace more compact and visually consistent by removing redundant inner panel surfaces and tightening field, option, and action spacing.
- Cleans up iPhone sidebar density and translucent sheet presentation for table-of-contents and project navigation.
- Rebalanced Welcome Tour form-sheet geometry on iPad with smaller footer controls, iPad-specific sheet heights, and a lighter bottom fade.
- Tightened iPad Find & Replace sheet width, height, internal padding, picker width, and action button typography.
- Made compact iOS table-of-contents rows narrower with reduced marker, indent, horizontal padding, and row inset values.
- Switched compact iOS table-of-contents and project sidebar sheets to translucent backgrounds with hidden navigation bar backgrounds.
- Fixed excessive empty space between Welcome Tour cards and footer buttons on iPad form sheets.
- Fixed iPad Find & Replace showing stacked inner and outer panel backgrounds instead of a single translucent sheet surface.
- Fixed iPad Find & Replace wasting space around fields, toggles, scope selection, and action buttons.

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
