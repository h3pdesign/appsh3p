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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on May 15, 2026._

## v0.6.9 (published May 15, 2026)

Release link: [GitHub Release v0.6.9](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.6.9)

- Invisible-character rendering on iPhone and iPad is more responsive and stays aligned while scrolling.
- Syntax highlighting, completion, Find in Files, and folder compare now avoid several repeated main-thread or allocation-heavy paths.
- Sidebar navigation is easier to tap across macOS, iOS, and iPadOS with larger card-style tab targets.
- Improved project sidebar tab affordance across macOS, iOS, and iPadOS with larger card-style Files/Search/Diff/Git targets and visible grey inactive states.
- Tightened Swift 6 syntax-highlight data flow by marking highlight value types as `Sendable` where they cross background highlight closures.
- Updated architecture and release documentation for the current Swift 6, cross-platform editor structure.
- Fixed iOS invisible-character rendering so space, tab, and newline markers stay aligned while scrolling instead of drifting with reused text content.
- Reduced iOS invisible-character overhead by drawing markers in a non-interactive viewport overlay and avoiding full TextKit invalidation when the preference is unchanged.
- Improved syntax-highlighting responsiveness by compiling regexes outside the shared cache lock and bounding fallback bracket-scope searches near the caret.
- Reduced large JSON fast-highlight allocation churn by comparing JSON literals directly instead of creating temporary substrings.

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
