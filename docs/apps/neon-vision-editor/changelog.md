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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on March 16, 2026._

## v0.5.5 (published March 16, 2026)

Release link: [GitHub Release v0.5.5](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.5.5)

- Stabilized first-open rendering from the project sidebar so file content and syntax highlighting appear on first click without requiring tab switches.
- Hardened startup/session behavior so `Reopen Last Session` reliably wins over conflicting blank-document startup states.
- Refined large-file activation and loading placeholders to avoid misclassifying smaller files as large-file sessions.
- Fixed a session-restore regression where previously open files could appear empty on first sidebar click until changing tabs.
- Fixed highlight scheduling during document-state transitions (`switch`, `finish load`, external edits) on macOS, iOS, and iPadOS.
- Fixed startup-default conflicts by aligning defaults and runtime startup gating between `Reopen Last Session` and `Open with Blank Document`.
- Fixed macOS shutdown persistence timing by saving session/draft snapshots on `willResignActive` and `willTerminate`.
- Fixed line-number ruler refresh timing to reduce layout churn/flicker and avoid draw-time retile side effects.
- Fixed horizontal viewport carry-over during document transitions so left-edge content no longer opens clipped.

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
