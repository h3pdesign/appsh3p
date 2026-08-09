# GitBird Changelog

## 2.1.4 - 2026-08-05

### Security and Reliability

- Stores GitHub and GitLab access tokens in the macOS Keychain and migrates legacy UserDefaults tokens.
- Restricts authenticated API mutations and provider requests to approved HTTPS hosts.
- Prevents stale refresh and bulk-action results from overwriting newer account state.

### Provider Support and Usability

- Uses configured self-hosted GitLab URLs for browser and token-settings links.
- Clarifies GitLab Todo completion actions and provider-neutral settings guidance.
- Improves keyboard activation, accessibility labels, avatar loading, and unread menu-bar counts.

## 2.1.3 - 2026-08-02

- Added GitHub-hosted Developer ID build, notarization, stapling, and release-asset verification workflow.
- Prepared distribution metadata for the notarized macOS app release.

## 2.1.2 - 2026-08-01

- Manual refresh restarts automatic background polling.
- Temporary network failures retry with exponential backoff.
- Refresh interval guidance explains automatic polling and retry behavior.

## Related Pages

- [Overview](/apps/gitbird/overview)
- [Installation](/apps/gitbird/installation)
- [Features](/apps/gitbird/features)
- [Known Issues](/apps/gitbird/known-issues)
- [FAQ](/apps/gitbird/faq)
