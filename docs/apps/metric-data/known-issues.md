---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/metrics/dashboard-ipad-frame.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/metrics/dashboard-ipad-frame.png
---

# Metric Data Known Issues

<div class="app-empty-state app-empty-metric">
  <img src="/icons/metric-data.png" alt="Metric Data" />
  <p>Current integration and distribution caveats are listed below.</p>
</div>

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

## Related Pages

- [Overview](/apps/metric-data/overview)
- [Installation](/apps/metric-data/installation)
- [Features](/apps/metric-data/features)
- [Gallery](/apps/metric-data/gallery)
- [Known Issues](/apps/metric-data/known-issues)
- [FAQ](/apps/metric-data/faq)
