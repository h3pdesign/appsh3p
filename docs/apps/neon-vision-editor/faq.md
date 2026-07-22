---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/neon-vision-editor-hero.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/neon-vision-editor-hero.png
---

# Neon Vision Editor FAQ

<div class="app-empty-state app-empty-neon">
  <img src="/icons/neon-vision-editor.png?v=20260401-2" alt="Neon Vision Editor" />
  <p>Quick answers for Neon Vision Editor release channels and platform usage.</p>
</div>

## Is Neon Vision Editor available on all Apple platforms?

The current project target covers macOS, iPadOS, iOS, and visionOS / Apple Vision Pro. App Store availability can vary by platform and review state.

## Where can I download it?

- Direct macOS release: [GitHub Releases](https://github.com/h3pdesign/Neon-Vision-Editor/releases)
- Homebrew Cask: [neon-vision-editor](https://github.com/Homebrew/homebrew-cask/blob/HEAD/Casks/n/neon-vision-editor.rb)
- App Store: [App Store](https://apps.apple.com/de/app/neon-vision-editor/id6758950965)
- TestFlight preview: [TestFlight](https://testflight.apple.com/join/YWB2fGAP)

## Why does the App Store version differ from the GitHub release?

Direct GitHub releases can publish faster. App Store and TestFlight builds move through platform-specific review, so public listings can temporarily lag behind the latest GitHub release.

## Does Neon sync my documents through its own cloud?

No. Shared-file refresh uses iCloud Drive, network folders, or another storage provider as the transport. Neon observes open files, refreshes clean tabs, and asks before replacing unsaved edits.

## Is there a command line tool?

The direct macOS build includes an optional `nve` helper for opening files from Terminal. It is not included in the Mac App Store build.

## Is the project open source?

The development is publicly visible on [GitHub](https://github.com/h3pdesign/Neon-Vision-Editor).

## Does AI run all the time?

No. AI assistance is optional and invoked when needed.

## Is this an Electron app?

No. Neon Vision Editor is built natively for Apple platforms.

## How should I submit feedback?

Critical feedback is encouraged. Include platform, app version, and reproduction steps.

## Related Pages

- [Overview](/apps/neon-vision-editor/overview)
- [Launch Story](/apps/neon-vision-editor/launch-story)
- [Features](/apps/neon-vision-editor/features)
- [Gallery](/apps/neon-vision-editor/gallery)
- [Changelog](/apps/neon-vision-editor/changelog)
- [Known Issues](/apps/neon-vision-editor/known-issues)
- [FAQ](/apps/neon-vision-editor/faq)
