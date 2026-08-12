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

_Source: local Neon Vision Editor changelog and README. Last synced on August 9, 2026._

## v1.3.5 (published August 11, 2026)

Release link: [GitHub Release v1.3.5](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.3.5)

- Refines Quick Look behavior and macOS Settings sizing after the v1.3.4 appearance correction.
- Keeps release metadata, download documentation, and platform version references synchronized for the next direct-download release.
- Includes the latest post-release polish without changing the supported workflow or migration path.
- Improves Quick Look and Settings-window sizing behavior on macOS.
- Refreshes release documentation, download metrics, Sparkle metadata, and App Store version references.
- Reduces layout movement and sizing friction when working with Quick Look previews and macOS Settings.
- Keeps the release-facing documentation and published-version references aligned with v1.3.5.

## v1.2.5 (published August 7, 2026)

Release link: [GitHub Release v1.2.5](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.2.5)

- Keeps generated and minified source files responsive by avoiding unnecessary full-document regex highlighting.
- Preserves fast, viewport-scoped syntax coloring for large JSON, HTML, and CSV documents.
- Makes large-file behavior easier to control with clear generated-file highlighting options.
- Adds Automatic, Full, and Off generated-file syntax highlighting modes.
- Detects common generated-source markers and very long minified lines with a bounded prefix scan.
- Extends the large-file benchmark and performance contract with HTML and minified JavaScript fixtures.
- Updates the app icon for the iOS, iPadOS, and macOS 27 Liquid Glass appearance, including the revised iOS 26 shared presentation. Thanks to [@LegalizeNukes](https://github.com/LegalizeNukes) for the new icon design.
- Stops stale or expensive syntax passes from being scheduled for likely generated JavaScript and similar source files.
- Keeps macOS and iOS syntax-highlight caches stable when generated-file highlighting is intentionally suppressed.

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
