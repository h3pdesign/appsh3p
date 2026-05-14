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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on May 13, 2026._

## v0.6.7 (published May 13, 2026)

Release link: [GitHub Release v0.6.7](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.6.7)

- Swift 6 migration work is now substantially safer across macOS, iOS, and iPadOS with stricter actor isolation fixes and cross-platform build coverage.
- Git workflows are more useful inside the editor with working-tree status, branch history, commit diff viewing, and a visual graph tab.
- Find in Files now lives in the project sidebar on compact devices, making iPhone search navigation and selection more consistent.
- Release automation now validates changelog, README, marketing version, and build-number consistency with short actionable fix guidance before release.
- Migrated project build settings toward Swift 6 language mode and fixed related Sendable/main-actor diagnostics across editor, settings, AI, markdown preview, and remote-session code.
- Added Git service/view-model infrastructure for sandbox-aware repository status, fetch/pull/push actions, history, branch graph data, and commit diff presentation.
- Added Git sidebar tabs for Changes, History, and Graph, including per-commit insertion/deletion summaries and a visual graph canvas for branch history.
- Added structured Git diff presentation using the existing editor diff UI, including translucent styling when enabled.
- Added Find in Files as a project-sidebar tab on macOS/iOS/iPadOS, with compact iPhone layout tuning, sidebar activation from toolbar search, and result selection that opens files and highlights matches.
- Added project sidebar polish for Git/search workflows, including wider graph/history presentation, translucent sidebar surfaces, and compact heading adjustments.

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
