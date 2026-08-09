# GitBird Privacy Policy

GitBird is a local macOS menu bar app for GitHub and GitLab notification workflows.

## Data Access

- GitBird uses the personal access token supplied by the user for the selected provider.
- GitHub tokens are used for GitHub API URLs.
- GitLab tokens are used only with the configured HTTPS GitLab host.
- Provider requests are sent over HTTPS.

## Credential Storage

Provider tokens are stored in the macOS Keychain. Legacy tokens previously stored in UserDefaults are migrated and removed on first launch.

## Local State

GitBird stores app preferences such as selected provider, refresh interval, page size, host, and read-filter settings locally on the Mac.

## Related Pages

- [Overview](/apps/gitbird/overview)
- [Installation](/apps/gitbird/installation)
- [FAQ](/apps/gitbird/faq)
