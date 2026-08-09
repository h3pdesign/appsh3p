# GitBird Features

## Provider Notifications

- GitHub Notifications API support.
- GitLab Todo API support for GitLab.com and self-managed GitLab hosts.
- Provider-specific browser shortcuts for notification pages and token settings.
- Pagination, manual refresh, and automatic background polling.

## Notification Actions

- Hide read notifications by default using provider state.
- Mark individual items read or done on the provider.
- Mark all visible notifications read where the provider supports it.
- Keep GitLab completion behavior aligned with the GitLab Todo API.

## Security and Credentials

- Store GitHub and GitLab access tokens in the macOS Keychain.
- Migrate legacy UserDefaults tokens and remove the old local value.
- Restrict authenticated requests and mutations to approved HTTPS provider hosts.

## macOS Experience

- Native menu bar app behavior.
- Liquid Glass styling on supported systems.
- Keyboard activation, accessibility labels, avatar loading, and unread menu-bar counts.
- Swift 6 with complete strict-concurrency checking.

## Related Pages

- [Overview](/apps/gitbird/overview)
- [Components Overview](/apps/gitbird/components-overview)
- [Installation](/apps/gitbird/installation)
- [Gallery](/apps/gitbird/gallery)
- [Changelog](/apps/gitbird/changelog)
- [Known Issues](/apps/gitbird/known-issues)
- [FAQ](/apps/gitbird/faq)
- [Privacy Policy](/apps/gitbird/privacy-policy)
