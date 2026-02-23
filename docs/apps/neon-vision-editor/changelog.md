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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on February 23, 2026._

## v0.4.28 (published February 23, 2026)

Release link: [GitHub Release v0.4.28](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.4.28)

- Added faster large-file loading safeguards to keep full-content attachment reliable across repeated opens.
- Added cross-platform `Save As…` command wiring so renamed saves are accessible from toolbar/menu flows on macOS, iOS, and iPadOS.
- Improved large HTML/CSV editing responsiveness by reducing expensive full-buffer sanitization and update-path overhead.
- Improved macOS Settings UX with smoother tab-to-tab size transitions and tighter dynamic window sizing.
- Improved iOS/iPadOS toolbar language picker sizing so compact labels remain single-line and avoid clipping.
- Improved iPadOS toolbar responsiveness by rebalancing promoted actions vs `...` overflow based on live window width.
- Improved iPadOS toolbar overflow stability to prevent temporary clipping/jitter of the `...` menu during interaction.
- Fixed an intermittent large-file regression where only an initial preview-sized portion (around ~500 lines) remained visible after reopen.
- Fixed iPadOS narrow-window tab overlap with window controls by increasing/adjusting tab strip leading clearance.
- Fixed macOS welcome/start screen presentation so it opens centered and remains draggable as a regular window.

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
