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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on March 29, 2026._

## v0.5.8 (published March 29, 2026)

Release link: [GitHub Release v0.5.8](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.5.8)

- Huge files now reach first content faster through deferred, chunked installation instead of a single blocking editor handoff.
- Large-file sessions stay more responsive while the rest of the document is installed in the background.
- Large-file status is clearer while deferred loading is active, with visible session affordances for the active open mode.
- Remote workflows can now be started from the Mac, attached from iPhone and iPad, and used to browse, open, edit, and explicitly save supported remote text files through the Mac-hosted broker.
- Markdown preview export controls and the project sidebar now use a denser, more polished layout across macOS, iPhone, and iPad.
- Added the `0.5.8` release line for incremental loading of huge files, centered on the deferred/chunked open path tracked in `#28`.
- Expanded the large-file open flow with a lightweight preparation state before the full editor content is installed.
- Completed the large-file session controls so `Standard`, `Deferred`, and `Plain Text` modes remain available when performance mode is active.
- Added a Mac-hosted remote session broker with SSH-key startup, attach codes for iPhone/iPad clients, a remote browser, remote open, explicit remote save, and remote revision-token conflict protection.
- Added clearer Remote settings guidance for local Mac SSH targets, attach-code usage, and the split between the Mac SSH owner and iPhone/iPad broker clients.

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
