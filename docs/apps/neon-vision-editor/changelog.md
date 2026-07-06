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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on July 6, 2026._

## v0.8.4 (published July 6, 2026)

Release link: [GitHub Release v0.8.4](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.8.4)

- Improves day-to-day editor interaction with toolbar hover labels, stronger find-panel focus, VIM arrow-key navigation, and a more useful macOS sidebar terminal.
- Hardens Markdown preview, custom AI endpoint validation, and GitHub Pages deployment so common user workflows are less likely to fail during active editing or release updates.
- Stabilizes macOS compatibility follow-up for tab hit testing, release metadata, and post-0.8.3 App Store review cleanup.
- Added hover labels for toolbar buttons, improved find-panel typing focus and contrast, and expanded VIM normal-mode movement to physical arrow keys.
- Upgraded the macOS sidebar terminal from single-command execution to a persistent sidebar shell session for common git, npm, node, and docker-style commands.
- Serialized GitHub Pages deployments so fast successive pushes do not cancel or race active Pages publishes.
- Fixed custom AI provider validation so localhost endpoints can be used intentionally while public remote endpoints still require HTTPS.
- Coalesced Markdown preview reloads to reduce redundant refreshes during active typing and avoid avoidable WebView churn.
- Stabilized the sidebar terminal shell startup by avoiding interactive-shell assumptions in the pipe-backed implementation.
- Restored reliable macOS 15 tab mouse hit testing and kept release/download metadata fresh for the 0.8.4 release line.

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
