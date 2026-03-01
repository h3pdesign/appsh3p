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
    - '{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://apps-h3p.com/#organization","name":"H3P","url":"https://apps-h3p.com","sameAs":["https://github.com/h3pdesign"]},{"@type":"SoftwareApplication","@id":"https://apps-h3p.com/apps/metric-data/overview#app","name":"Metric Data","applicationCategory":"BusinessApplication","operatingSystem":"macOS, iPadOS, iOS","url":"https://apps-h3p.com/apps/metric-data/overview","softwareVersion":"docs-sync-2026-02-16","isAccessibleForFree":true,"publisher":{"@id":"https://apps-h3p.com/#organization"}}]}'
---

# Metric Data

<div class="overview-status-pill overview-status-private">Status: Private beta</div>

<p class="overview-last-updated">Last updated: <span data-date="2026-02-16">February 16, 2026</span></p>

## Application Identity

- Application name: **Metric Data**
- Google Cloud project: `pocket-tagging` (`702241209783`)
- OAuth consent screen app name should be **Metric Data** to match this homepage.

## Application Purpose

Metric Data is an analytics app that lets users securely connect their own Google AdSense account and view performance metrics in a focused dashboard.

Primary use:

- sign in with Google OAuth 2.0 (Authorization Code + PKCE)
- fetch AdSense reporting data for authorized users
- display trends, dimensions, and account-level performance summaries
- support daily analytics workflows across macOS, iPadOS, and iOS

This app is not a public data crawler and does not access data outside the Google accounts explicitly authorized by the signed-in user.

<div class="overview-platform-badges overview-reveal" aria-label="supported platforms">
  <span>macOS</span>
  <span>iPadOS</span>
  <span>iOS</span>
</div>

<div class="overview-mini-stats overview-reveal" aria-label="app stats">
  <div><span>latest version</span><strong>docs synced 2026-02-16</strong></div>
  <div><span>platforms</span><strong>macOS / iPadOS / iOS</strong></div>
  <div><span>repo status</span><strong>private</strong></div>
</div>
<div class="overview-hero overview-app-metric overview-reveal">
  <div class="overview-hero-copy">
    <p>Metric Data is a SwiftUI analytics app for Google AdSense across iOS and macOS.</p>
  </div>
  <div class="overview-hero-media">
    <img src="/icons/metric-data.png" alt="Metric Data icon" class="overview-app-icon" />
    <div class="overview-shot-frame">
      <img src="/media/metrics/dashboard-ipad.png" alt="Metric Data iPad screenshot" class="overview-app-shot" />
    </div>
  </div>
</div>

## Quick Links

- [TestFlight](https://testflight.apple.com/join/mMyMAGjE)
- [Code Examples](/apps/code-examples)
- [Privacy Policy](/policies/privacy-policy)

## Core Capability Set

- Google OAuth 2.0 login with Authorization Code + PKCE
- secure token handling with Keychain storage and refresh flow
- account switching for multi-account AdSense use
- date filters for 7D, 30D, 90D, This Month, Last Month
- dimensions including Country, Platform, and Ad Unit
- dashboard visualization built with Swift Charts

## Platform and Build Targets

- iOS app target: `Metrics`
- macOS App Store target: `Metrics-macOS-AppStore`
- macOS direct distribution target: `Metrics-macOS-Direct`

## Data and Privacy Model

- OAuth tokens stored in Apple Keychain
- local app cache stored on-device
- widget snapshots stored via app group container
- HTTPS-only network access to required Google APIs

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
- [Code Examples](/apps/code-examples)
