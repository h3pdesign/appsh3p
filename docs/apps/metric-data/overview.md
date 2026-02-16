---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/metrics/dashboard-iphone-frame.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/metrics/dashboard-iphone-frame.png
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@graph":[{"@type":"Organization","name":"H3P","url":"https://apps-h3p.com","sameAs":["https://github.com/h3pdesign"]},{"@type":"SoftwareApplication","name":"Metric Data","applicationCategory":"BusinessApplication","operatingSystem":"iOS, macOS","url":"https://apps-h3p.com/apps/metric-data/overview","publisher":{"@type":"Organization","name":"H3P"}}]}'
---

# Metric Data

<div class="overview-media-stack">
  <img src="/icons/metric-data.png" alt="Metric Data icon" class="overview-app-icon" />
  <img src="/media/metrics/dashboard-iphone-frame.png" alt="Metric Data screenshot" class="overview-app-shot" />
</div>

Metric Data is a SwiftUI analytics app for Google AdSense across iOS and macOS.

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

- `/Users/h3p/Coding/XCode Projects/Metrics/README.md`
- `/Users/h3p/Coding/XCode Projects/Metrics/PRIVACY.md`
- `/Users/h3p/Coding/XCode Projects/Metrics/TERMS.md`

## Related Pages

- [Installation](/apps/metric-data/installation)
- [Features](/apps/metric-data/features)
- [Gallery](/apps/metric-data/gallery)
- [Known Issues](/apps/metric-data/known-issues)
- [FAQ](/apps/metric-data/faq)
