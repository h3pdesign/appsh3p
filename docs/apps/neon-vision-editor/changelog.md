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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on April 28, 2026._

## v0.6.3 (published April 28, 2026)

Release link: [GitHub Release v0.6.3](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.6.3)

- Native diff workflows are now available for comparing the current tab against disk and comparing two open tabs.
- iPhone and iPad toolbar/help surfaces are more discoverable, with a dedicated Toolbar Help entry and scrollable compact toolbars.
- Markdown Preview export is more reliable, including complete paginated PDF output and flexible one-page exports with tighter margins.
- Project sidebar actions on iPhone now open the expected file/folder pickers and keep new-file prompts stable.
- Markdown, plain-text extension handling, themes, and support-purchase messaging are more accurate across platforms.
- Added a native side-by-side diff view with change navigation, accessible hunk summaries, Compare with Disk, and Compare Open Tabs entry points.
- Added a full Toolbar Help section that explains toolbar symbols, groups actions by workflow, adapts to iPhone/iPad/macOS widths, and is reachable from the toolbar, macOS Help menu, and menu-bar extra.
- Expanded iPhone/iPad toolbar coverage so commonly used and previously overflow-only actions are visible in the scrollable toolbar, with Toolbar Help pinned next to Settings on iPad.
- Updated the Welcome Tour with the latest major features and a live support-purchase card that avoids premature App Store price-unavailable states.
- Added `.bak` plain-text support and improved `.zshrc`/dotfile loading behavior.

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
