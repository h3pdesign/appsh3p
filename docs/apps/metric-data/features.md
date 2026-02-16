---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/metrics/dashboard-ipad-frame.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/metrics/dashboard-ipad-frame.png
---

# Metric Data Features

## Authentication and Account Handling

- Google OAuth 2.0 Authorization Code + PKCE flow
- secure token persistence in Keychain
- refresh-token based re-auth sessions
- account switching for multi-account analytics review

## Dashboard and Analytics

- key metrics visualized in a SwiftUI dashboard
- date windows: 7D, 30D, 90D, This Month, Last Month
- additional report dimensions:
  - Country
  - Platform
  - Ad Unit

![Metric Data iPhone dashboard](/media/metrics/dashboard-iphone-frame.png)

## iPad and Large-Screen Usage

The dashboard scales to iPad form factors for broader analytics visibility.

![Metric Data iPad dashboard](/media/metrics/dashboard-ipad-frame.png)

## Widget Data Flow

Widget rendering uses shared data snapshots in the app group container.

Related implementation references:

- `Metrics/Shared/WidgetDataStore.swift`
- `MetricsWidget/MetricsWidget.swift`

## Distribution Paths

- iOS build target
- macOS App Store distribution target
- macOS direct/notarized distribution target

## Related Pages

- [Overview](/apps/metric-data/overview)
- [Installation](/apps/metric-data/installation)
- [Features](/apps/metric-data/features)
- [Gallery](/apps/metric-data/gallery)
- [Known Issues](/apps/metric-data/known-issues)
- [FAQ](/apps/metric-data/faq)
