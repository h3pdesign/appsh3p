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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on June 23, 2026._

## v0.8.0 (published June 23, 2026)

Release link: [GitHub Release v0.8.0](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.8.0)

- Restores macOS 15 tab bar mouse hit-testing so tabs can be selected and closed normally.
- Fixes macOS translucent editor startup rendering so line numbers no longer appear on a white strip.
- Improves the Welcome Tour release page layout and reduces lightweight completion-trigger allocation while typing.
- Added Xcode Cloud/App Store release runbook and preflight checks for the 0.8.0 release path.
- Kept macOS 26+ tab strip edge fades while skipping the SwiftUI mask on pre-26 macOS where it can intercept tab clicks.
- Updated the Welcome Tour release summary for current App Store-facing changes.
- Fixed macOS 15 tab switching and close-button clicks by avoiding the tab strip fade mask on pre-26 macOS.
- Fixed translucent macOS line-number ruler startup rendering so the ruler stays transparent when the editor background is transparent.
- Fixed the macOS Welcome Tour "What's New" layout so release cards no longer clip or leave stale content at the left edge.
- Reduced completion-trigger scan allocation by checking UTF-16 code units instead of creating one-character substrings.

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
