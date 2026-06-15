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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on June 15, 2026._

## v0.7.8 (published June 15, 2026)

Release link: [GitHub Release v0.7.8](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.7.8)

- Fixes iPhone and iPad editor behavior when line wrap is disabled so long lines continue horizontally instead of clipping at the right edge.
- Makes line wrap the default on fresh iPhone installs while preserving existing user preferences and keeping iPad/macOS defaults unchanged.
- Restores live cursor position updates in the status bar when editing, moving the caret, or jumping between lines.
- Prevents macOS Settings content from scrolling underneath the native preference toolbar.
- Makes GitHub release builds more deterministic by preserving the selected Xcode toolchain and preferring stable Xcode installations.
- Enforced horizontal scrollable content width for the iOS/iPadOS native editor in no-wrap mode.
- Added iOS/iPadOS caret position publishing for edit, selection, large-file install, and programmatic navigation paths.
- Aligned macOS cursor column reporting with the existing 1-based status bar display.
- Hardened local and GitHub release workflows so the selected Xcode installation persists through build and notarization steps.
- Fixed no-wrap text being cut off on iPhone and iPad instead of allowing horizontal scrolling.

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
