---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/neon-vision-editor-hero.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/neon-vision-editor-hero.png
---

# Neon Vision Editor Known Issues

<div class="app-empty-state app-empty-neon">
  <img src="/icons/neon-vision-editor.png?v=20260401-2" alt="Neon Vision Editor" />
  <p>Known limitations are tracked here and updated with each release.</p>
</div>

## UI Layout Differences Across Devices

Some interface elements can wrap differently depending on screen size and dynamic type settings.

Workaround:

- use default text size for most consistent parity checks
- verify behavior on your primary device before final workflows

## App Store and TestFlight Build Divergence

Behavior in [TestFlight](https://testflight.apple.com/join/YWB2fGAP) can differ from [App Store](https://apps.apple.com/de/app/neon-vision-editor/id6758950965) while fixes are being validated.

The direct GitHub macOS release can also be ahead of App Store listings. As of the current README, GitHub Releases track v0.9.4 while public App Store listings vary by platform.

Workaround:

- confirm issue on latest stable build before reporting
- include build number when submitting feedback

## Very Large File Workloads

Large files use bounded editor modes. Files below 100 MB remain editable, while files at 100 MB or more open as a clearly marked, read-only partial preview of the first 4 MB.

Workaround:

- split very large files into smaller modules where practical
- use the partial preview for inspection instead of saving over the original source
- use Plain Text mode for unusually large editable documents when styling is not needed

## External File Refresh Conflicts

When iCloud Drive, a network folder, or another app changes an open file, clean tabs can refresh automatically. Dirty tabs are not replaced automatically.

Workaround:

- choose Keep Local, Reload from Disk, or Compare when a dirty tab needs review
- save or discard local edits before expecting external changes to refresh in place

## Desktop-Only Workflows

Git, the PTY terminal, and SSH-hosted Remote Sessions are macOS-owned workflows. iPhone, iPad, and visionOS can remain editor, preview, and supported Remote Session client surfaces.

## Related Pages

- [Overview](/apps/neon-vision-editor/overview)
- [Launch Story](/apps/neon-vision-editor/launch-story)
- [Features](/apps/neon-vision-editor/features)
- [Gallery](/apps/neon-vision-editor/gallery)
- [Changelog](/apps/neon-vision-editor/changelog)
- [Known Issues](/apps/neon-vision-editor/known-issues)
- [FAQ](/apps/neon-vision-editor/faq)
