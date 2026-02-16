# Metric Data Installation

## Open in Xcode

Open project:

- `/Users/h3p/Coding/XCode Projects/Metrics/Metrics.xcodeproj`

Schemes:

- `Metrics` (iOS)
- `Metrics-macOS-AppStore`
- `Metrics-macOS-Direct`

## OAuth Setup

Both iOS and macOS targets use URL scheme redirect handling based on `GOOGLE_REDIRECT_SCHEME`.

Required configuration:

1. Set `GOOGLE_REDIRECT_SCHEME` in target build settings.
2. Update `/Users/h3p/Coding/XCode Projects/Metrics/Metrics/Resources/AppConfig.json`:

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
xcodebuild -project "/Users/h3p/Coding/XCode Projects/Metrics/Metrics.xcodeproj" -scheme "Metrics" -configuration Debug -destination "generic/platform=iOS" -derivedDataPath ./.DerivedData CODE_SIGNING_ALLOWED=NO build
xcodebuild -project "/Users/h3p/Coding/XCode Projects/Metrics/Metrics.xcodeproj" -scheme "Metrics-macOS-AppStore" -configuration Debug -destination "platform=macOS" -derivedDataPath ./.DerivedData CODE_SIGNING_ALLOWED=NO build
```
