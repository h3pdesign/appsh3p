---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/neon-vision-editor-hero.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/neon-vision-editor-hero.png
---

# Neon Vision Editor Installation

## Install Paths

- Direct macOS release: [GitHub Releases](https://github.com/h3pdesign/Neon-Vision-Editor/releases)
- Homebrew Cask: [neon-vision-editor](https://github.com/Homebrew/homebrew-cask/blob/HEAD/Casks/n/neon-vision-editor.rb)
- App Store: [App Store](https://apps.apple.com/de/app/neon-vision-editor/id6758950965)
- TestFlight preview: [TestFlight](https://testflight.apple.com/join/YWB2fGAP)

The direct GitHub release is currently v0.9.4 and can be ahead of App Store listings while platform updates move through review.

| Channel | Platform | Current track |
|---|---|---|
| GitHub Releases | macOS | v0.9.4 direct notarized build |
| Homebrew Cask | macOS | v0.9.4 cask delivery |
| App Store | iOS / iPadOS | v0.7.8 public listing |
| App Store | macOS | v0.8.6 public listing |
| App Store | visionOS | v0.8.8 public listing |
| App Store review | iOS / iPadOS | v0.9.4 in review |
| TestFlight | iOS / iPadOS / macOS | v0.9.4 availability varies |

## Direct macOS Install

Download the latest notarized macOS build from [GitHub Releases](https://github.com/h3pdesign/Neon-Vision-Editor/releases).

For a terminal install:

```bash
curl -fsSL https://raw.githubusercontent.com/h3pdesign/Neon-Vision-Editor/main/scripts/install.sh | sh
```

To install into a user-local app folder:

```bash
curl -fsSL https://raw.githubusercontent.com/h3pdesign/Neon-Vision-Editor/main/scripts/install.sh | sh -s -- --appdir "$HOME/Applications"
```

## Homebrew Install

Homebrew detects Neon Vision Editor as a cask:

```bash
brew install neon-vision-editor
```

The explicit cask form also works:

```bash
brew install --cask neon-vision-editor
```

To avoid an admin password prompt for `/Applications`, install into a user-local app folder:

```bash
brew install --cask --appdir="$HOME/Applications" neon-vision-editor
```

## App Store Install

1. Open [App Store](https://apps.apple.com/de/app/neon-vision-editor/id6758950965).
2. Install Neon Vision Editor.
3. Launch and complete first run.

## TestFlight Install

1. Open [TestFlight](https://testflight.apple.com/join/YWB2fGAP).
2. Install the latest preview build.
3. Confirm build details in app settings.

## Command Line Helper

The direct macOS build includes an optional `nve` helper. It is not included in the Mac App Store build.

1. Open **Settings > Support**.
2. Copy the **Command Line Helper** install command.
3. Run it in Terminal to link the helper into `$HOME/bin`.

Examples:

```bash
nve README.md
nve --wait --new-window "Neon Vision Editor/UI/ContentView.swift"
nve --line 42 "Neon Vision Editor/UI/ContentView.swift"
```

The helper forwards file-open requests through macOS Launch Services and does not read file contents itself.

## Post-Install Validation

1. Create or open a document.
2. Verify syntax highlighting is active.
3. Confirm editing behavior on your target platform.

## Development Reference

Implementation is publicly visible on [GitHub](https://github.com/h3pdesign/Neon-Vision-Editor).

## Related Pages

- [Overview](/apps/neon-vision-editor/overview)
- [Launch Story](/apps/neon-vision-editor/launch-story)
- [Features](/apps/neon-vision-editor/features)
- [Gallery](/apps/neon-vision-editor/gallery)
- [Changelog](/apps/neon-vision-editor/changelog)
- [Known Issues](/apps/neon-vision-editor/known-issues)
- [FAQ](/apps/neon-vision-editor/faq)
