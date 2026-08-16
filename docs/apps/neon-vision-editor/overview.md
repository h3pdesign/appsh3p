---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/neon/neon-v1.4-hero.webp
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/neon/neon-v1.4-hero.webp
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://apps-h3p.com/#organization","name":"H3P","url":"https://apps-h3p.com","sameAs":["https://github.com/h3pdesign"]},{"@type":"SoftwareApplication","@id":"https://apps-h3p.com/apps/neon-vision-editor/overview#app","name":"Neon Vision Editor","applicationCategory":"DeveloperApplication","operatingSystem":"macOS, iPadOS, iOS, visionOS","url":"https://apps-h3p.com/apps/neon-vision-editor/overview","downloadUrl":"https://github.com/h3pdesign/Neon-Vision-Editor/releases","softwareVersion":"1.4.6","isAccessibleForFree":true,"publisher":{"@id":"https://apps-h3p.com/#organization"}}]}'
---

# Neon Vision Editor

<div class="overview-status-pill overview-status-release">Status: Public release</div>

<p class="overview-last-updated">Last updated: <span data-date="2026-08-16">August 16, 2026</span></p>

<div class="overview-platform-badges overview-reveal" aria-label="supported platforms">
  <span>macOS</span>
  <span>iPadOS</span>
  <span>iOS</span>
  <span>visionOS</span>
</div>

<div class="overview-mini-stats overview-reveal" aria-label="app stats">
  <div><span>latest version</span><strong>v1.4.6</strong></div>
  <div><span>platforms</span><strong>macOS / iPadOS / iOS / visionOS</strong></div>
  <div><span>repo status</span><strong>public</strong></div>
</div>
<figure class="overview-banner overview-neon-banner overview-reveal">
  <img src="/media/neon/neon-v1.4-hero.webp" alt="Neon Vision Editor running on a MacBook" />
</figure>
<div class="overview-hero overview-app-neon overview-reveal">
  <div class="overview-hero-copy">
    <p>Neon Vision Editor is a native editor for markdown, notes, and code across Apple platforms, focused on fast file access, readable text, syntax highlighting, and a minimal editing surface.</p>
  </div>
  <div class="overview-hero-media">
    <img src="/icons/neon-vision-editor.png?v=20260401-2" alt="Neon Vision Editor icon" class="overview-app-icon" />
    <div class="overview-screenshot-gallery" aria-label="Neon Vision Editor screenshots">
      <div class="overview-shot-frame overview-shot-frame-compact">
        <img src="/media/neon/neon-v1.4-editor.webp" alt="Neon Vision Editor editing Swift in the light theme" class="overview-app-shot overview-app-shot-clean overview-app-shot-compact" />
      </div>
      <div class="overview-shot-frame">
        <img src="/media/neon/neon-v1.4-workspace.webp" alt="Neon Vision Editor workspace with project sidebar and code minimap" class="overview-app-shot overview-app-shot-clean" />
      </div>
      <div class="overview-shot-frame">
        <img src="/media/neon/neon-v1.4-preview.webp" alt="Neon Vision Editor with Markdown preview and project sidebar" class="overview-app-shot overview-app-shot-clean" />
      </div>
    </div>
    <div class="overview-download-badges overview-download-badges-hero" aria-label="Download Neon Vision Editor">
      <a class="overview-download-badge overview-download-appstore" href="https://apps.apple.com/de/app/neon-vision-editor/id6758950965" target="_blank" rel="noreferrer noopener">
        <span>Download: </span>
        <strong>App Store</strong>
      </a>
      <a class="overview-download-badge overview-download-github" href="https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.4.6" target="_blank" rel="noreferrer noopener">
        <span>Download: </span>
        <strong>GitHub v1.4.6</strong>
      </a>
    </div>
  </div>
</div>

## Quick Links

- [App Store](https://apps.apple.com/de/app/neon-vision-editor/id6758950965)
- [App Clip](/apps/neon-vision-editor/app-clip)
- [TestFlight](https://testflight.apple.com/join/YWB2fGAP)
- [GitHub](https://github.com/h3pdesign/Neon-Vision-Editor)
- [Latest GitHub Release (v1.4.6)](https://github.com/h3pdesign/Neon-Vision-Editor/releases/tag/v1.4.6)
- [Homebrew Cask](https://github.com/Homebrew/homebrew-cask/blob/HEAD/Casks/n/neon-vision-editor.rb)
- [Code Examples](/apps/code-examples)

<a href="https://www.producthunt.com/products/neon-vision-editor?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-neon-vision-editor" target="_blank" rel="noopener noreferrer" aria-label="Neon Vision Editor on Product Hunt">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1079678&theme=dark&t=1772536380711" />
    <img alt="Neon Vision Editor - A lightweight and modern text editor for MacOS | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1079678&theme=light&t=1772536380711" />
  </picture>
</a>

## Application Purpose

Neon Vision Editor is a native writing and coding editor for Apple platforms. Its purpose is to provide a fast, distraction-light editing environment with syntax highlighting, optional AI assistance, shared-file refresh for open tabs, and consistent behavior across macOS, iPadOS, iOS, and visionOS.

Primary user outcomes:

- create and edit plain text, markdown, and code with low-latency input handling
- review and organize content in focused document workflows
- maintain consistent editing behavior across desktop, mobile, and spatial devices
- keep clean open tabs current when iCloud Drive, network folders, or another app delivers external file changes

## Large-Document Architecture

Version 1.4 reworks macOS large-document editing around a file-backed document model and a bounded virtual viewport. Instead of recreating a complete in-memory editor buffer for every edit, Neon keeps the active window around the scroll position live and preserves caret and selection state as that window changes.

- scrolling, editing, selection, and save operations stay focused on the active document region
- visible line layout and syntax work are bounded rather than scaled to the whole file on every interaction
- encoding, line endings, external-change handling, and atomic saves remain part of the same file workflow
- files below 100 MB stay editable; files at or above 100 MB open as a clearly labelled, read-only partial preview of the first 4 MB

## GitHub Snapshot (live)

Live repository metrics (auto-updated by GitHub):

<div class="overview-live-metrics" data-github-repo="h3pdesign/Neon-Vision-Editor" aria-label="Live GitHub repository metrics">
  <a class="overview-live-metric" href="https://github.com/h3pdesign/Neon-Vision-Editor/stargazers" target="_blank" rel="noreferrer noopener" data-github-metric="stars">
    <span>Stars: </span>
    <strong>GitHub</strong>
  </a>
  <a class="overview-live-metric" href="https://github.com/h3pdesign/Neon-Vision-Editor/forks" target="_blank" rel="noreferrer noopener" data-github-metric="forks">
    <span>Forks: </span>
    <strong>GitHub</strong>
  </a>
  <a class="overview-live-metric" href="https://github.com/h3pdesign/Neon-Vision-Editor/issues" target="_blank" rel="noreferrer noopener" data-github-metric="issues">
    <span>Open issues: </span>
    <strong>GitHub</strong>
  </a>
  <a class="overview-live-metric" href="https://github.com/h3pdesign/Neon-Vision-Editor/commits/main" target="_blank" rel="noreferrer noopener" data-github-metric="pushed">
    <span>Last commit: </span>
    <strong>GitHub</strong>
  </a>
  <a class="overview-live-metric" href="https://github.com/h3pdesign/Neon-Vision-Editor/search?l=swift" target="_blank" rel="noreferrer noopener" data-github-metric="language">
    <span>Language: </span>
    <strong>Swift</strong>
  </a>
  <a class="overview-live-metric" href="https://github.com/h3pdesign/Neon-Vision-Editor/tree/main" target="_blank" rel="noreferrer noopener" data-github-metric="branch">
    <span>Default branch: </span>
    <strong>main</strong>
  </a>
</div>

## Platform Availability

- macOS
- iPadOS
- iOS
- visionOS

Direct GitHub releases currently track v1.4.6. App Store and TestFlight availability can vary by platform and review state.

## Why It Exists

This started as a personal project to build a writing tool that feels:

- native
- fast
- minimal
- not Electron
- not bloated with dashboard noise
- pleasant to use every day

## Product Focus

Neon Vision Editor keeps the interface out of your way so writing stays central.

- AI is optional and on-demand.
- Shared storage remains the transport for file sync; Neon observes open files and protects dirty buffers instead of uploading document contents to its own service.
- Git, terminal, and SSH-hosted Remote Sessions are macOS-owned workflows; iPhone, iPad, and visionOS attach as clients where supported.
- No forced accounts, telemetry, or subscription maze.

## Development Approach

- Fully native Apple stack
- Modern Apple frameworks
- Consistent behavior across devices
- Open development with public source visibility

## Related Pages

- [Components Overview](/apps/neon-vision-editor/components-overview)
- [Features](/apps/neon-vision-editor/features)
- [Gallery](/apps/neon-vision-editor/gallery)
- [Changelog](/apps/neon-vision-editor/changelog)
- [Known Issues](/apps/neon-vision-editor/known-issues)
- [FAQ](/apps/neon-vision-editor/faq)
- [Code Examples](/apps/code-examples)
