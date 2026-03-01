---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/metrics/dashboard-ipad-frame.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/metrics/dashboard-ipad-frame.png
---

# Metrics Data Installation

## Open in Xcode

Open project:

- `Metrics.xcodeproj`

Schemes:

- `Metrics` (iOS)
- `Metrics-macOS-AppStore`
- `Metrics-macOS-Direct`

## OAuth Setup

Both iOS and macOS targets use URL scheme redirect handling based on `GOOGLE_REDIRECT_SCHEME`.

Required configuration:

1. Set `GOOGLE_REDIRECT_SCHEME` in target build settings.
2. Update `Metrics/Resources/AppConfig.json`:

```json
{
  "googleClientID": "YOUR_CLIENT_ID.apps.googleusercontent.com",
  "redirectURI": "com.yourcompany.admetrics:/oauth2redirect"
}
```

The redirect URI scheme must match the configured `GOOGLE_REDIRECT_SCHEME` exactly.

## macOS Signing Setup

For App Store distribution:

- target: `Metrics-macOS-AppStore`
- signing identity: Apple Distribution

For direct/notarized distribution:

- target: `Metrics-macOS-Direct`
- signing identity: Developer ID Application
- Hardened Runtime enabled

## Bundle Identifiers

- iOS: `com.h3pdesign.Metrics`
- macOS: `com.h3pdesign.Admetrics.mac`

## Build Verification Commands

```bash
xcodebuild -project "Metrics.xcodeproj" -scheme "Metrics" -configuration Debug -destination "generic/platform=iOS" -derivedDataPath ./.DerivedData CODE_SIGNING_ALLOWED=NO build
xcodebuild -project "Metrics.xcodeproj" -scheme "Metrics-macOS-AppStore" -configuration Debug -destination "platform=macOS" -derivedDataPath ./.DerivedData CODE_SIGNING_ALLOWED=NO build
```

## Related Pages

- [Overview](/apps/metric-data/overview)
- [Installation](/apps/metric-data/installation)
- [Features](/apps/metric-data/features)
- [Gallery](/apps/metric-data/gallery)
- [Known Issues](/apps/metric-data/known-issues)
- [FAQ](/apps/metric-data/faq)
