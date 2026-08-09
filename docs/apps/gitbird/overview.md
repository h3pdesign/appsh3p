---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/gitbird/screenshot.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/gitbird/screenshot.png
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://apps-h3p.com/#organization","name":"H3P","url":"https://apps-h3p.com","sameAs":["https://github.com/h3pdesign"]},{"@type":"SoftwareApplication","@id":"https://apps-h3p.com/apps/gitbird/overview#app","name":"GitBird","applicationCategory":"DeveloperApplication","operatingSystem":"macOS","url":"https://apps-h3p.com/apps/gitbird/overview","downloadUrl":"https://github.com/h3pdesign/GitBird/releases","softwareVersion":"2.1.4","isAccessibleForFree":true,"publisher":{"@id":"https://apps-h3p.com/#organization"}}]}'
---

# GitBird

<div class="overview-status-pill overview-status-release">Status: Public release</div>

<p class="overview-last-updated">Last updated: <span data-date="2026-08-05">August 5, 2026</span></p>

<div class="overview-platform-badges overview-reveal" aria-label="supported platforms">
  <span>macOS</span>
</div>

<div class="overview-mini-stats overview-reveal" aria-label="app stats">
  <div><span>latest version</span><strong>2.1.4 (build 181)</strong></div>
  <div><span>platforms</span><strong>macOS 14.6+</strong></div>
  <div><span>repo status</span><strong>public</strong></div>
</div>

<div class="overview-hero overview-app-release overview-reveal">
  <div class="overview-hero-copy">
    <p>GitBird is a native macOS menu bar app for keeping GitHub and GitLab notifications close at hand without leaving the current workflow.</p>
  </div>
  <div class="overview-hero-media">
    <img src="/icons/gitbird.png?v=20260809-1" alt="GitBird icon" class="overview-app-icon" />
    <div class="overview-shot-frame">
      <img src="/media/gitbird/screenshot.png" alt="GitBird notification popover" class="overview-app-shot" />
    </div>
  </div>
</div>

## Application Purpose

GitBird keeps provider notifications in the macOS menu bar and lets users open, inspect, refresh, mark read, or complete notification items from one focused surface.

Primary user outcomes:

- monitor GitHub notifications and GitLab Todos from the menu bar
- use provider-aware token authentication for GitHub, GitLab.com, or self-managed GitLab
- refresh in the background while retaining manual control
- mark individual items or bulk notification sets read or done on the provider

## Release Status

The current local project version is **2.1.4** with build **181**. The release adds Keychain-backed token storage, host restrictions for authenticated provider requests, and reliability fixes for refresh/bulk-action state.

## Related Pages

- [Components Overview](/apps/gitbird/components-overview)
- [Installation](/apps/gitbird/installation)
- [Features](/apps/gitbird/features)
- [Gallery](/apps/gitbird/gallery)
- [Changelog](/apps/gitbird/changelog)
- [Known Issues](/apps/gitbird/known-issues)
- [FAQ](/apps/gitbird/faq)
- [Privacy Policy](/apps/gitbird/privacy-policy)
