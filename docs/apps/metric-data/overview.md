---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/metrics/dashboard-ipad.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/metrics/dashboard-ipad.png
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://apps-h3p.com/#organization","name":"H3P","url":"https://apps-h3p.com","sameAs":["https://github.com/h3pdesign"]},{"@type":"SoftwareApplication","@id":"https://apps-h3p.com/apps/metric-data/overview#app","name":"Metrics Data","applicationCategory":"BusinessApplication","operatingSystem":"macOS, iPadOS, iOS, visionOS, watchOS","url":"https://apps-h3p.com/apps/metric-data/overview","downloadUrl":"https://apps.apple.com/us/app/metrics-data/id6758959570","softwareVersion":"0.2.6","isAccessibleForFree":true,"publisher":{"@id":"https://apps-h3p.com/#organization"}}]}'
---

# Metrics Data

<div class="overview-status-pill overview-status-release">Status: App Store release</div>

<p class="overview-last-updated">Last updated: <span data-date="2026-06-11">June 11, 2026</span></p>

## Application Identity

- Application name: **Metrics Data**
- Google Cloud project: `pocket-tagging` (`702241209783`)
- OAuth consent screen app name should be **Metrics Data** to match this homepage.

## Application Purpose

Metrics Data is an analytics app that lets users securely connect their own Google AdSense and GA4 accounts and view performance metrics in a focused dashboard.

Primary use:

- sign in with Google OAuth 2.0 (Authorization Code + PKCE)
- fetch AdSense reporting data for authorized users
- display trends, dimensions, and account-level performance summaries
- support daily analytics workflows across macOS, iPadOS, and iOS

This app is not a public data crawler and does not access data outside the Google accounts explicitly authorized by the signed-in user.

<div class="overview-platform-badges overview-reveal" aria-label="supported platforms">
  <span>iOS</span>
  <span>iPadOS</span>
  <span>macOS</span>
  <span>visionOS</span>
  <span>watchOS</span>
</div>

<div class="overview-mini-stats overview-reveal" aria-label="app stats">
  <div><span>latest version</span><strong>0.2.6</strong></div>
  <div><span>platforms</span><strong>iOS / iPadOS / macOS / visionOS / watchOS</strong></div>
  <div><span>distribution</span><strong>App Store</strong></div>
</div>
<div class="overview-hero overview-app-metric overview-reveal">
  <div class="overview-hero-copy">
    <p>Metrics Data is a SwiftUI analytics app for Google AdSense and GA4 across Apple platforms.</p>
  </div>
  <div class="overview-hero-media">
    <img src="/icons/metric-data.png?v=20260430-1" alt="Metrics Data icon" class="overview-app-icon" />
    <div class="overview-shot-frame">
      <img src="/media/metrics/dashboard-ipad.png" alt="Metrics Data iPad screenshot" class="overview-app-shot" />
    </div>
  </div>
</div>

## Quick Links

- [App Store](https://apps.apple.com/us/app/metrics-data/id6758959570)
- [Code Examples](/apps/code-examples)
- [Metrics Data Privacy Policy](/apps/metric-data/privacy-policy)
- [Site Privacy Policy](/policies/privacy-policy)

## Core Capability Set

- Google OAuth 2.0 login with Authorization Code + PKCE
- secure token handling with Keychain storage and refresh flow
- account switching for multi-account AdSense use
- date filters for 7D, 30D, 90D, This Month, Last Month
- dimensions including Country, Platform, and Ad Unit
- dashboard visualization built with Swift Charts

## Platform and Build Targets

- iOS app target: `Metrics`
- public App Store listing: [Metrics Data](https://apps.apple.com/us/app/metrics-data/id6758959570)
- macOS App Store target: `Metrics-macOS-AppStore`
- macOS direct distribution target: `Metrics-macOS-Direct`

## Data and Privacy Model

- OAuth tokens stored in Apple Keychain
- local app cache stored on-device
- widget snapshots stored via app group container
- HTTPS-only network access to required Google APIs

See [Metrics Data Privacy Policy](/apps/metric-data/privacy-policy) for Google user data handling and OAuth scope details.

## Project Documentation Sources

The details here align with:

- `README.md`
- `PRIVACY.md`
- `TERMS.md`

## Related Pages

- [Components Overview](/apps/metric-data/components-overview)
- [Installation](/apps/metric-data/installation)
- [Features](/apps/metric-data/features)
- [Gallery](/apps/metric-data/gallery)
- [Known Issues](/apps/metric-data/known-issues)
- [FAQ](/apps/metric-data/faq)
- [Privacy Policy](/apps/metric-data/privacy-policy)
- [Code Examples](/apps/code-examples)
