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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on March 9, 2026._

## v0.5.2 (published March 9, 2026)

Release link: [GitHub Release v0.5.2](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.5.2)

- Added editor performance presets in Settings (`Balanced`, `Large Files`, `Battery`) with shared runtime mapping.
- Added configurable project navigator placement (`Left`/`Right`) for project-structure sidebar layout.
- Added richer updater diagnostics details in Settings: staged update summary, last install-attempt summary, and recent sanitized log snippet.
- Added CSV/TSV table mode with a `Table`/`Text` switch, lazy row rendering, and background parsing for larger datasets.
- Added an in-app `Editor Help` sheet that lists core editor actions and keyboard shortcuts.
- Added a dedicated `Support Neon Vision Editor…` entry to the macOS `Help` menu for direct support-dialog access.
- Improved iOS/iPadOS large-file responsiveness by lowering automatic large-file thresholds and applying preset-based tuning.
- Improved project-sidebar open flow by short-circuiting redundant opens when the selected file is already active.
- Fixed missing diagnostics reset workflow by adding a dedicated `Clear Diagnostics` action that also clears file-open timing snapshots.
- Fixed macOS editor-window top-bar jumping when toggling the toolbar translucency control by keeping chrome flags stable.

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
