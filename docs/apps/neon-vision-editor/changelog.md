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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on June 27, 2026._

## v0.8.1 (published June 27, 2026)

Release link: [GitHub Release v0.8.1](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.8.1)

- Hardens iPadOS App Store builds by keeping terminal and shell-execution entry points macOS-only, so iPadOS remains a text editor and previewer without code execution.
- Adds a GitHub-only release workflow that can create and publish the release tag, ZIP, DMG, checksums, and release notes from GitHub without local release commands.
- Fixes iPad editor layout issues so the toolbar uses the available editor width and no-wrap Markdown editing can scroll horizontally beside the preview.
- Added a manual GitHub release workflow with dry-run support, secret preflight checks, draft-before-publish release handling, asset verification, SHA256 checksums, and post-release workflow dispatches.
- Added release metadata gates so release docs, README status, project version metadata, and the Welcome Tour What's New page are checked before GitHub release builds.
- Added dedicated SVG and HTML preview panes, including passive HTML rendering inside Markdown preview, with preview coordination moved out of the main content view.
- Split file preview coordination into dedicated preview files and added SVG and HTML web previews beside the source editor.
- Refined iPad top chrome so the editor toolbar fills the available width dynamically while keeping compact controls usable.
- Hardened iPadOS App Store builds by keeping terminal and shell-execution entry points macOS-only.
- Fixed SVG preview rendering so previews fit the pane without adding an extra dark background block.

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
