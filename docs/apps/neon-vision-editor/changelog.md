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

_Source: GitHub Releases for [Neon Vision Editor](https://github.com/h3pdesign/Neon-Vision-Editor). Last synced on June 17, 2026._

## v0.7.9 (published June 17, 2026)

Release link: [GitHub Release v0.7.9](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v0.7.9)

- Adds OpenCode Go as an optional AI completion provider with secure Keychain token storage and a configurable model id.
- Adds a custom OpenAI-compatible provider so compatible hosted or local endpoints can be used for completion.
- Reduces unnecessary completion work by skipping model-backed suggestions in obvious comment and string contexts.
- Makes caret status updates cheaper across macOS, iOS, and iPadOS by avoiding temporary prefix-string allocation while preserving UTF-16 editor offsets.
- Updates Xcode project metadata for current Xcode Cloud and release signing expectations.
- Added OpenCode Go (OpenCode Zen) using the shared OpenAI-compatible chat completions client and the deepseek-v4-flash default model.
- Added Settings controls for selecting OpenCode Go, storing its API token, and configuring the OpenCode model id.
- Added a custom OpenAI-compatible provider with user-configured base URL, model, and optional API key, grouped in its own Settings section.
- Added AI Activity Log diagnostics for failed or empty provider responses, including HTTP status and finish reason, so silent fallbacks are now visible.
- Added shared completion heuristics for comment/string detection and regression coverage for local completions and caret position calculations.

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
