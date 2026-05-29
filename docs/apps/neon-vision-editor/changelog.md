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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on May 29, 2026._

## v0.7.3 (published May 29, 2026)

Release link: [GitHub Release v0.7.3](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.7.3)

- Hardens remote editing for shared-network workflows by encrypting broker request and response payloads and moving SSH key bookmarks into Keychain storage.
- Keeps API tokens in Keychain for both Debug and Release builds while migrating legacy UserDefaults token values out of plain preferences.
- Improves editor responsiveness across Git history, Markdown preview, line numbers, invisible-character rendering, syntax highlighting, and large-file workflows.
- Added AES-GCM encryption for Remote Broker transport payloads, with attach-token-derived keys and versioned envelopes.
- Replaced remote Markdown image loads with clickable placeholders so Preview no longer fetches external image resources automatically.
- Improved Git history loading by batching commit metadata and shortstat parsing instead of issuing per-commit status work.
- Reduced Markdown preview churn by keying render cache entries to stable tab revisions and avoiding stale debounced content captures.
- Added App Clip project scaffolding for lightweight launch surface validation ahead of wider release testing.
- Fixed iOS Markdown list Return handling so keyboard replacement ranges no longer delete already typed list text.
- Fixed DEBUG API token persistence so provider keys no longer remain in UserDefaults.

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
