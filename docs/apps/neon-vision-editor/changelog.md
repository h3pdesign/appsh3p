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

## v0.9.5 (published July 22, 2026)

Release link: [GitHub Release v0.9.5](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.9.5)

- Converts plain text to a reviewable, source-preserving Markdown proposal using Apple Intelligence or an explicitly configured AI provider, with cancellation and a 30-second safety limit.
- Makes text encoding a deliberate document setting: detect, reopen, and save UTF-8/BOM, UTF-16, common Windows, ISO, and Mac encodings without silently changing the file format.
- Polishes the editor across windows and devices with independent window state, natural-language completion for Markdown and text, and clearer Markdown and snapshot workflows.
- Adds the focused Welcome Tour and professional What’s New page, including shared-file sync guidance, essential editor setup, and expandable advanced settings.
- Adds a compact Code Snapshot workspace with adaptive, full-image previews on iPhone and iPad, translucent surfaces, and explicit `.png` export names.
- Makes Markdown formatting controls stay below document tabs and within the editor pane, while preserving preview and sidebar boundaries.
- Keeps separate editor windows independent so cursor, selection, tabs, and document state do not follow activity in another window.
- Completes a window close after choosing Don’t Save, preserves restored macOS window sizes, and keeps text selection usable after switching tabs.
- Improves HTML highlighting on supported macOS versions and hardens Markdown conversion feedback when Apple Intelligence or a configured provider is unavailable, slow, or returns an invalid response.

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
