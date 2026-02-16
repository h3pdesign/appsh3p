# Metric Data

<img src="/icons/metric-data.png" alt="Metric Data icon" width="72" height="72" style="background: transparent; display: block;" />

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
