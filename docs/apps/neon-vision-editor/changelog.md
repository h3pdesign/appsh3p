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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on July 24, 2026._

## v0.9.7 (published July 24, 2026)

Release link: [GitHub Release v0.9.7](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.9.7)

- Makes macOS document opening, session restoration, preview changes, and external refreshes safer on current macOS releases by avoiding synchronous TextKit and AppKit layout work during a document transition.
- Preserves the editor context after a document transition—line numbers, minimap, caret position, scroll position, and visible source—without asking AppKit to lay out the editor while it is already tracking a layout pass.
- Coalesces the final editor refresh into one post-layout operation, keeping document changes responsive while the source pane, preview, sidebar, line numbers, and minimap settle together.
- Prevents the macOS AppKit layout-observation crash reported during document installation and restoration on macOS 27 beta.
- Cancels stale display refresh work from an earlier document transition so it cannot update the active editor after a newer document has taken its place.
- Aligns the macOS Settings content translucency with the editor's chrome-and-pane surface composition, keeping controls readable in every translucency mode.

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
