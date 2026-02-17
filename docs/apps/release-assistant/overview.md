---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/release-assistant/main-window.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/release-assistant/main-window.png
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@graph":[{"@type":"Organization","name":"H3P","url":"https://apps-h3p.com","sameAs":["https://github.com/h3pdesign"]},{"@type":"SoftwareApplication","name":"Release Assistant","applicationCategory":"DeveloperApplication","operatingSystem":"macOS","url":"https://apps-h3p.com/apps/release-assistant/overview","publisher":{"@type":"Organization","name":"H3P"}}]}'
---

# Release Assistant

<div class="overview-status-pill overview-status-alpha">Status: Internal alpha</div>

<p class="overview-last-updated">Last updated: February 16, 2026</p>

<div class="overview-platform-badges overview-reveal" aria-label="supported platforms">
  <span>macOS</span>
</div>

<div class="overview-mini-stats overview-reveal" aria-label="app stats">
  <div><span>latest version</span><strong>docs synced 2026-02-16</strong></div>
  <div><span>platforms</span><strong>macOS</strong></div>
  <div><span>repo status</span><strong>private</strong></div>
</div>
<div class="overview-hero overview-app-release overview-reveal">
  <div class="overview-hero-copy">
    <p>Release Assistant is a macOS orchestration app for release pipelines in Xcode-based repositories that use <code>scripts/release_all.sh</code>.</p>
  </div>
  <div class="overview-hero-media">
    <img src="/icons/release-assistant.png" alt="Release Assistant icon" class="overview-app-icon" />
    <div class="overview-shot-frame">
      <img src="/media/release-assistant/main-window.png" alt="Release Assistant screenshot" class="overview-app-shot" />
    </div>
  </div>
</div>

## What It Manages

- project discovery and switching
- release metadata (version, tag, date, zip path, optional SHA256)
- release context detection (Xcode, VS Code, GitHub host, visibility where available)
- mode selection (full, dry-run, notarized, hosted/self-hosted)
- audit-oriented output and diagnostics

## Core Design Goal

Provide safer release execution with workflow-aware guardrails and clear operational visibility.

## Operational Scope

- pre-release validation
- pipeline execution control
- failure hinting and remediation guidance
- consistent command provenance logging

## Related Pages

- [Installation](/apps/release-assistant/installation)
- [Features](/apps/release-assistant/features)
- [Gallery](/apps/release-assistant/gallery)
- [Known Issues](/apps/release-assistant/known-issues)
- [FAQ](/apps/release-assistant/faq)
