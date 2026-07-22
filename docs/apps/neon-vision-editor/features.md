---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/neon-vision-editor-hero.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/neon-vision-editor-hero.png
---

# Neon Vision Editor Features

## Editing Flow

Neon Vision Editor is built for focused writing and coding with a native, low-latency feel.

- fast launch and project open behavior
- clear typography and readable spacing
- automatic syntax highlighting, including Swift 6-ready patterns and TeX/LaTeX support
- minimal chrome to keep attention on the text
- tabbed editing, Quick Open, regex Find/Replace, and optional Code Minimap navigation
- large-file safeguards: files below 100 MB remain editable, while files at 100 MB or more open as a read-only partial preview of the first 4 MB

![Editing flow on Mac](/media/neon/editing-mac-frame.png)

## Shared Files and Conflict Protection

Open documents can refresh after external changes from iCloud Drive, a network folder, or another app.

- clean open tabs refresh automatically after delivered file changes
- unsaved edits are never overwritten automatically
- dirty tabs keep the existing review choices: Keep Local, Reload from Disk, or Compare
- sync progress and review-needed states appear in the editor status area

Neon Vision Editor observes and refreshes open files; iCloud Drive or the network folder remains the transport.

## AI Assist (Optional)

AI assistance is available when explicitly requested.

- lightweight completion support
- no forced AI overlays
- no interruptive auto-generation loops

![AI assist workflow on Mac](/media/neon/ai-assist-mac.png)

## Cross-Device Continuity

The app experience is intentionally aligned across macOS, iPadOS, iOS, and visionOS.

- consistent editing behavior across device classes
- consistent visual language and navigation model
- practical context switching between desktop and mobile
- touch and trackpad pinch gestures adjust editor font size across supported platforms
- Remote Sessions are opt-in: macOS owns SSH and broker hosting, while iPhone, iPad, and Apple Vision Pro can attach as clients

![Cross-device editing on iPad](/media/neon/cross-device-ipad.png)
![Cross-device editing on iPhone](/media/neon/cross-device-iphone.png)

## Preview and Export

Markdown, HTML, and SVG previews are opt-in through the toolbar.

- Markdown previews support GitHub Flavored Markdown on macOS, iPhone, and iPad
- visionOS uses dedicated reader surfaces for spatial layouts
- Markdown PDF export supports paginated and one-page output
- Markdown and Swift exports declare content types correctly on iOS and iPadOS

## Visual Design Direction

Neon Vision Editor uses controlled neon accents with restrained contrast.

- dark and light mode support
- modern native look-and-feel
- subtle brand highlights without visual noise

![Neon Vision marketing visual](/media/neon/marketing-visioneditor.png)

## Distribution Channels

- [GitHub Releases](https://github.com/h3pdesign/Neon-Vision-Editor/releases)
- [Homebrew Cask](https://github.com/Homebrew/homebrew-cask/blob/HEAD/Casks/n/neon-vision-editor.rb)
- [App Store](https://apps.apple.com/de/app/neon-vision-editor/id6758950965)
- [TestFlight](https://testflight.apple.com/join/YWB2fGAP)
- [GitHub](https://github.com/h3pdesign/Neon-Vision-Editor)

The direct GitHub release is currently ahead of the App Store version. App Store and TestFlight availability can vary by platform and review state.

## Related Pages

- [Overview](/apps/neon-vision-editor/overview)
- [Launch Story](/apps/neon-vision-editor/launch-story)
- [Features](/apps/neon-vision-editor/features)
- [Gallery](/apps/neon-vision-editor/gallery)
- [Changelog](/apps/neon-vision-editor/changelog)
- [Known Issues](/apps/neon-vision-editor/known-issues)
- [FAQ](/apps/neon-vision-editor/faq)
