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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on July 15, 2026._

## v0.8.7 (published July 15, 2026)

Release link: [GitHub Release v0.8.7](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.8.7)

- Restores reliable macOS editor rendering, mouse placement, and selection after loading a document or changing sidebar and window geometry.
- Adds drag-to-reorder tabs on macOS, including clear before/after placement feedback.
- Upgrades the macOS sidebar terminal to a real PTY-backed shell for interactive command-line workflows.
- Makes tab switching and reordering more responsive, with a persistent blue marker for the active tab and a yellow marker for the previously selected tab.
- Added native macOS PTY sessions with terminal resize, Ctrl-C, Ctrl-D, restart, bounded scrollback, and project-directory support. ANSI/VT rendering remains tracked separately.
- Added Copy Diagnostics details for OS version and safe editor performance settings, without exposing document content or paths.
- Added a macOS preference to show or hide the Welcome Tour menu-bar shortcut.
- Kept normal documents on contiguous TextKit layout and refreshes their display after document transitions, preventing blank editor content and failed mouse hit testing.
- Limits full TextKit invalidation to small documents; larger files refresh only the visible range to protect editor responsiveness.
- Added before/after tab drop handling with an insertion marker, and regression coverage for tab ordering and selection preservation.

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
