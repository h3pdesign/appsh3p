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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on May 9, 2026._

## v0.6.6 (published May 9, 2026)

Release link: [GitHub Release v0.6.6](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.6.6)

- File opening from Finder/system dialogs is now more robust: existing windows are brought back to the foreground instead of staying in the background.
- Empty startup tabs are now cleanly reused when opening a file, preventing unnecessary extra tabs.
- Large UI monoliths were further modularized, making follow-up fixes significantly lower risk.
- iPad hardware shortcuts can now be configured directly in Settings and keyboard editing is fully reliable (text selection, copy/cut/paste, undo/redo, close tab).
- Toolbar customization on iPhone/iPad is more practical with visibility controls for primary icons and an optional compact custom 5-icon mode.
- `plist` files can now be shown in a structured, collapsible tree view alongside raw text.
- Welcome Tour and support prompt flows now share a consistent modern visual style, with improved spacing and button ergonomics on iPhone, iPad, and macOS.
- Release gating now runs as a single script step that combines the platform matrix build and release preflight checks.
- Improved external file-open routing on macOS: after opening, the target editor window is brought to foreground and activated.
- Added clean untitled tab replacement flow in `EditorViewModel.openFile(url:)` when only a single untouched placeholder tab exists.

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
