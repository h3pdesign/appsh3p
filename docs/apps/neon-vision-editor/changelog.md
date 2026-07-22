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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on July 22, 2026._

## v0.9.4 (published July 22, 2026)

Release link: [GitHub Release v0.9.4](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.9.4)

- Refreshes clean open files automatically after external changes while protecting unsaved edits with the existing review flow.
- Keeps tab switching and minimap scrolling responsive, and automatically reveals a newly opened or selected tab when the tab strip is crowded.
- Separates Sparkle from App Store builds and strengthens the GitHub release path for reliable package resolution and Homebrew Cask delivery.
- Open local documents now use event-driven file presentation with coalesced metadata checks instead of selection-time polling.
- External refresh progress, completion, and review-needed states appear in the editor status area for one or multiple tabs.
- GitHub-hosted releases can prepare the Homebrew Cask update branch with a GitHub App token and provide a direct pull-request link in the workflow summary.
- Preserves cursor, selection, source viewport, and minimap state when a clean document refreshes in place, including inactive tabs and Markdown preview sources.
- Never replaces a dirty buffer after an external change; the existing Keep Local, Reload from Disk, and Compare actions remain authoritative.
- Removes broad tab-state publication and filesystem checks from ordinary tab selection, and reduces minimap work during editor scrolling.
- Gives file tabs stable scroll targets so hidden selected tabs are revealed with only the minimum required horizontal movement.

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
