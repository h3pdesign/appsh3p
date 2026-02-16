# Metric Data Known Issues

## Google API Availability Dependency

Metric retrieval depends on AdSense API availability and account permission scope.

Impact:

- partial or delayed dashboard updates when API responses are unavailable

## OAuth Redirect Misconfiguration

If `GOOGLE_REDIRECT_SCHEME` and `AppConfig.json` do not match exactly, login callback will fail.

Resolution:

- verify scheme parity between build settings and JSON config

## Distribution-Specific Signing Complexity

macOS App Store and direct distribution targets require distinct signing identities and capabilities.

Resolution:

- validate each target signing profile before archive
