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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on May 27, 2026._

## v0.7.2 (published May 27, 2026)

Release link: [GitHub Release v0.7.2](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.7.2)

- Keeps editor wrapping and no-wrap scrolling more stable when switching modes across macOS, iOS, and iPadOS.
- Improves Markdown list editing by continuing the active list marker after pressing Return on populated list items.
- Adds optional indentation guides as a separate, off-by-default editor visibility feature for users who want clearer nesting cues.
- Added optional indentation guides with toolbar and settings controls while keeping the default editor appearance unchanged.
- Improved wrap/no-wrap mode changes so scroll position is preserved and horizontal scrolling is restored where expected.
- Improved iOS editor inset handling so line numbers, content, and scroll indicators stay aligned after layout changes.
- Improved Markdown list continuation for unordered and numbered list markers using the configured indentation style.
- Added off-by-default indentation guide rendering for macOS, iOS, and iPadOS editors.
- Added an Indentation Guides action to the appearance toolbar menus and editor settings.
- Fixed wrap mode updates so toggling line wrap no longer leaves stale text container sizing or loses the visible scroll position.

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
