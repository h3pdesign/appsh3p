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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on May 20, 2026._

## v0.7.1 (published May 20, 2026)

Release link: [GitHub Release v0.7.1](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.7.1)

- Delivers a focused UI overhaul for the editor chrome, project sidebar, TOC sidebar, Markdown preview, minimap, and document tab bar.
- Makes sidebar terminal access more direct: the toolbar and menu now open the Terminal tab in the project sidebar instead of a separate terminal sheet.
- Tightens Apple Foundation Models completion behavior so Apple AI completion uses the real Foundation Models path and never returns simulated placeholder text.
- Refined the project/sidebar visual system with more pronounced rounded containers, cleaner tab cards, stronger outlines, clearer project path presentation, and tighter iPhone/iPad row spacing.
- Improved TOC presentation with more distinct symbols, markers, line badges, language-aware items, rounded sidebar chrome, and cleaner spacing across macOS, iOS, and iPadOS.
- Polished Markdown preview and document tab transitions with rounded preview chrome, softer split transitions, and tab fades only where the UI actually needs them.
- Cleaned up minimap/editor/sidebar edges by removing conflicting divider lines, reducing visual noise, and improving translucent pane backgrounds.
- Fixed the macOS toolbar Terminal button so it selects the existing sidebar Terminal tab and preserves that sidebar terminal session while switching tabs.
- Removed the old integrated terminal sheet path that opened a separate terminal window.
- Removed simulated Apple Intelligence completion output and stopped returning unavailable-message text as a completion.

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
