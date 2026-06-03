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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on June 3, 2026._

## v0.7.4 (published June 3, 2026)

Release link: [GitHub Release v0.7.4](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.7.4)

- Improves launch stability on macOS 26.x beta systems by deferring startup diagnostics and window chrome work until the first editor window has settled.
- Adds release preflight coverage for App Clip metadata, App Clip card assets, privacy-sensitive logging, and remote Markdown preview guardrails.
- Refines Settings and Safe Mode behavior across macOS, iOS, and iPadOS while preserving the lightweight editor workflow.
- Added App Clip release validation for `CFBundleIconName`, associated App Clip domains, parent app entitlements, and 1800 x 1200 RGB card assets.
- Added automated Markdown preview remote-content checks so HTTP/HTTPS images stay clickable placeholders and the preview WebView remains non-persistent with JavaScript disabled.
- Added privacy log auditing to release preflight so tab contents, prompts, tokens, and local file paths are not introduced into release logging paths.
- Improved Safe Mode messaging and behavior by pausing heavier startup features, Markdown preview, and code minimap during recovery launches.
- Made iPad Settings prefer the largest available sheet size and tuned macOS Settings sizing to avoid scrolling when the screen can fit the full window.
- Fixed a macOS startup crash risk by moving launch completion marking, AI health checks, updater checks, and window tabbing policy out of the earliest layout phase.
- Fixed sensitive AI activity log output by redacting bearer tokens, API-key-like strings, user paths, and file URLs.

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
