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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on July 25, 2026._

## v0.9.8 (published July 25, 2026)

Release link: [GitHub Release v0.9.8](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.9.8)

- Makes advanced editing workflows dependable again across document sizes: syntax highlighting, previews, the minimap, the table of contents, and project navigation now remain available together without persistent oversized scrollbars.
- Turns external-change and text-encoding status into actionable controls, with recent sync activity, timestamps, encoding, byte-order-mark, and line-ending choices available directly from the status bar.
- Replaces placeholder starter snippets with a shared catalog of practical, language-specific templates that can be customized once and used consistently from the editor and Settings.
- Adds stronger code-editing assistance with completion controls, built-in snippets, automatic bracket, quote, tag, and Markdown-list continuation, expanded theme customization, and clearer keyboard-driven actions.
- Expands Markdown conversion into a source-preserving review flow for selections or complete documents, including emphasis, links, autolinks, tables, cancellation, malformed-output handling, and multilingual or large input.
- Makes encoding changes explicit and recoverable with immediate Save Using transcoding, BOM-aware session persistence, and Save, Compare, or Cancel choices when an externally changed document still has local edits.
- Shows Markdown table-of-contents hierarchy through indentation and typographic weight instead of source-level `#` prefixes.
- Restores timely HTML syntax highlighting on macOS Sequoia and keeps viewport-based highlighting responsive for large HTML documents.
- Restores Markdown, HTML, and SVG preview availability together with reliable minimap and table-of-contents updates after document, tab, toolbar, and sidebar transitions.
- Uses the same thin, automatically fading overlay scrollbars in the editor, previews, table of contents, and project sidebar on macOS.

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
