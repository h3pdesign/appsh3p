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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on July 19, 2026._

## v0.8.9 (published July 19, 2026)

Release link: [GitHub Release v0.8.9](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.8.9)

- Delivers a major Project Sidebar redesign with a clearer Files/Search/Git/Terminal rail, a visible Git change count, and compact, scannable change rows.
- Reworks Markdown presentation across macOS, iPhone, iPad, and visionOS with a contextual formatting toolbar, compact phone control, improved preview controls, and more reliable rendered content.
- Makes unusually large documents predictable: responsive loading begins early, while files at or above 100 MB open as a safe, read-only partial preview instead of exhausting editor memory.
- Redesigned the Project Sidebar navigation as a single glass rail and upgraded Git changes with status icons, state chips, path context, and focused per-file actions.
- Added a Markdown formatting surface with direct inline controls, heading selection, lists, quote/code tools, structural actions, and platform-appropriate compact presentation.
- Improved Markdown, HTML, and SVG preview workflows, including explicit preview visibility controls, more resilient local image handling, richer Markdown styling, and compact iPhone preview settings.
- Added pinch-to-zoom font sizing for touch devices and the macOS trackpad, while retaining the existing editor font-size controls.
- Keeps the Markdown formatting control below tabs while overlaying the actual editor surface rather than creating a separate opaque host row.
- Improves minimap activation, viewport synchronization, and draggable marker behavior after tab switches and on large documents.
- Avoids full-file allocation for 100 MB or larger documents; partial previews are clearly labeled and cannot overwrite their original source.

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
