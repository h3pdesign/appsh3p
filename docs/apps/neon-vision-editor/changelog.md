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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on March 8, 2026._

## v0.5.1 (published March 8, 2026)

Release link: [GitHub Release v0.5.1](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.5.1)

- Added bulk `Close All Tabs` actions to toolbar surfaces (macOS, iOS, iPadOS), including a confirmation step before closing.
- Added project-structure quick actions to expand all folders or collapse all folders in one step.
- Added six vivid neon syntax themes with distinct color profiles: `Neon Voltage`, `Laserwave`, `Cyber Lime`, `Plasma Storm`, `Inferno Neon`, and `Ultraviolet Flux`.
- Added a lock-safe cross-platform build matrix helper script (`scripts/ci/build_platform_matrix.sh`) to run macOS + iOS Simulator + iPad Simulator builds sequentially.
- Added iPhone Markdown preview as a bottom sheet with toolbar toggle and resizable detents for Apple-guideline-compliant height control.
- Added unsupported-file safety handling across project sidebar, open/import flows, and user-facing unsupported-file alerts instead of crash paths.
- Added a project-sidebar switch to show only supported files (enabled by default).
- Added SVG (`.svg`) editor file support with XML language mapping and syntax-highlighting path reuse.
- Improved Markdown preview stability by preserving relative scroll position during preview refreshes.
- Improved Markdown preview behavior for very large files by using a safe plain-text fallback with explicit status messaging instead of full HTML conversion.

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
