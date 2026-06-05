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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on June 5, 2026._

## v0.7.5 (published June 5, 2026)

Release link: [GitHub Release v0.7.5](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.7.5)

- Improves toolbar customization on iPhone and iPad by making custom icon slots match the selected visible toolbar action count.
- Adds a 7-action toolbar density option for iPhone layouts that have room for more than five actions without forcing the 8-action scroll-heavy layout.
- Restores iPad toolbar settings behavior so visible actions respond to the configured toolbar count and custom icon selection.
- Added dynamic custom toolbar icon selection for 4, 5, 6, 7, 8, 10, or all visible actions.
- Added focused regression coverage for toolbar action limits, custom action ordering, and iPad-style custom filtering.
- Added release performance smoke measurements for 100k-line and 250k-line large-file sample generation.
- Added a draggable code minimap viewport marker so dragging the marker scrolls the editor to the matching document position.
- Improved current-line and matching-bracket visibility on macOS with draw-time overlays that stay synced with caret movement.
- Fixed custom toolbar icon selection being capped at 5 even when more visible actions were configured.
- Fixed iPad toolbar customization settings not affecting the visible toolbar action row.

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
