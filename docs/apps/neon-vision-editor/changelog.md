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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on May 2, 2026._

## v0.6.4 (published May 2, 2026)

Release link: [GitHub Release v0.6.4](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.6.4)

- iPad and iPhone workflows are more complete, with toolbar customization, native iPad command menus, and direct share/open-in support for Markdown documents.
- JSON documents now have built-in formatting and one-line combine tools from the app menus.
- Hardware-keyboard editing on iPad is more reliable for search and selection.
- The v0.6.4 quality baseline includes Markdown PDF export regression coverage, mobile parity documentation, and compact-layout accessibility checks.
- Added JSON document actions for `Format JSON` and `Combine JSON Lines`, available from macOS menus and iPadOS/iOS command menus.
- Added Settings controls for iPhone/iPad toolbar groups so Search, Compare, Editor Tools, and Preview/Appearance actions can be shown or hidden.
- Added native iPadOS command menus for File, Find, Tools, Help, Settings, Toolbar Help, and Welcome Tour entry points.
- Added GitHub and Feature Request links to the in-app Support settings section.
- Added iOS document type metadata for Markdown so `.md` and `.markdown` files are advertised as editable text documents in Files/share/open-in flows.
- Added v0.6.4 release QA and mobile parity documents covering PDF export, toolbar/sidebar behavior, compact layout, and accessibility expectations.

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
