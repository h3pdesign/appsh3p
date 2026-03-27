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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on March 26, 2026._

## v0.5.7 (published March 26, 2026)

Release link: [GitHub Release v0.5.7](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.5.7)

- Markdown preview on iPhone now uses a cleaner stacked layout and presents PDF export from the active preview flow.
- Markdown preview controls on macOS and iPad now use a more centered, balanced layout with direct export/share/copy actions.
- Appearance handling is more consistent when macOS follows the system light/dark setting, including Settings and editor window surfaces.
- iPad editor surfaces now avoid stray white seams and mismatched panel backgrounds around sidebars, split panes, and markdown preview.
- App Store support-purchase messaging is safer for review and restricted environments where in-app purchases are unavailable.
- Project indexing and iPad Vim-mode wiring are more complete for the `Quick Open`, `Find in Files`, and keyboard-first editing flows introduced around the `0.5.6` line.
- Completed the project-file index snapshot flow so project refreshes can reuse unchanged entries while continuing to feed `Quick Open` and `Find in Files`.
- Completed iPad Vim-mode integration with a dedicated Settings toggle, shared persistence, and visible mode-state reporting on iPad.
- Expanded the Code Snapshot composer with a `Custom` layout mode, better cross-platform sizing behavior, and cleaner control grouping.
- Fixed iPhone Markdown preview layout so title, controls, and export action read cleanly in a centered vertical flow.

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
