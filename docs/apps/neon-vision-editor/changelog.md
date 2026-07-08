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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on July 8, 2026._

## v0.8.5 (published July 8, 2026)

Release link: [GitHub Release v0.8.5](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.8.5)

- Fixes TestFlight crash reports tied to macOS window restoration callbacks and AppKit delegate forwarding during close/restore flows.
- Restores reliable macOS editor text rendering after file load, sidebar toggles, window focus changes, and older macOS layout refreshes.
- Expands TypeScript syntax highlighting so modern TypeScript files keep imports, decorators, utility types, async arrows, and property access readable.
- Hardened the macOS editor and window lifecycle paths while keeping iOS and iPadOS builds unchanged.
- Added broader TypeScript highlighting coverage with regression tests for decorators, type utilities, async functions, readonly properties, and property access.
- Removed unsafe generic `NSWindowDelegate` forwarding from the macOS close-confirmation bridge and explicitly forwards restoration callbacks instead.
- Coalesced macOS text-view display refreshes onto the next main-runloop turn so layout invalidation does not run inside AppKit layout observation.
- Refreshed visible editor glyph display after geometry and app/window activation changes to avoid blank text after sidebar or focus transitions.

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
