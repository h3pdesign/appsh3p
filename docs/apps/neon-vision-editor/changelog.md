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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on May 19, 2026._

## v0.7.0 (published May 19, 2026)

Release link: [GitHub Release v0.7.0](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.7.0)

- Adds a lightweight integrated terminal tab in the sidebar while preserving the current terminal session when switching tabs.
- Improves large-editor navigation with a wider, scroll-synced, color-coded code minimap for supported code files.
- Tightens editor performance, markdown preview/export behavior, sidebar ergonomics, and project tree refresh behavior across macOS, iOS, and iPadOS.
- Added optional code minimap support with section, declaration, import, property, control-flow, comment, and code markers.
- Added an in-app command-line helper section and optional bundled `nve` helper flow that remains user-initiated and sandbox-friendly.
- Added sidebar terminal integration, markdown preview theme refinements, project tree ignored-folder handling, and more reusable ContentView/sidebar structure.
- Fixed minimap scroll sync by deriving viewport fractions from the actual editor viewport and shared minimap offset math.
- Improved minimap readability by widening the strip and avoiding an all-blue accent block.
- Reduced repeated large-file work in folder compare, diff filtering, markdown export, theme resolution, and project-tree refresh paths.
- Improved settings dropdown sizing/alignment and sidebar tab hit targets.

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
