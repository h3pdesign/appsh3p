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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on March 10, 2026._

## v0.5.3 (published March 10, 2026)

Release link: [GitHub Release v0.5.3](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.5.3)

- Added a new high-readability colorful light theme preset: `Prism Daylight` (also selectable while app appearance is set to dark).
- Added double-click-to-close behavior for tabs on macOS tab strips.
- Added split editor settings sections (`Basics` / `Behavior`) to reduce scrolling in the Editor tab.
- Improved custom theme vibrancy by applying the vivid neon syntax profile to `Custom`, so syntax colors remain bright and saturated.
- Improved Cyber Lime readability in light mode by reducing overly bright green token intensity and switching to a blue cursor accent.
- Improved toolbar symbol color options on macOS with clearer separation between `Dark Gray` and `Black`, plus near-white rendering in dark mode for both options.
- Improved translucent macOS toolbar consistency by enforcing `0.8` opacity for toolbar surfaces in translucency mode.
- Fixed toolbar-symbol contrast edge cases in dark mode where gray/black variants could appear too similar.
- Notarized release published via `scripts/release_all.sh v0.5.3 notarized`.

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
