# GitBird Components Overview

| Area | Responsibility |
| --- | --- |
| Menu bar app shell | Keeps the notification popover available from the macOS menu bar. |
| Provider account settings | Stores selected provider, host, token state, refresh interval, and read-filter preference. |
| GitHub provider | Reads notifications and applies provider-backed read/done actions through approved GitHub API URLs. |
| GitLab provider | Reads GitLab Todos and completes Todos through the configured HTTPS GitLab host. |
| Refresh coordinator | Runs manual refresh, background polling, pagination, retry, and stale-result protection. |
| Credential storage | Stores provider tokens in the macOS Keychain and migrates legacy UserDefaults tokens. |
| Notification list | Presents unread/read state, avatars, subject metadata, row actions, and accessibility labels. |

## Provider State

The provider is the source of truth. GitBird does not maintain a separate local read database. When read notifications are hidden, GitBird requests only items the selected provider still considers unread or pending.

## Related Pages

- [Overview](/apps/gitbird/overview)
- [Features](/apps/gitbird/features)
- [Installation](/apps/gitbird/installation)
- [Changelog](/apps/gitbird/changelog)
- [FAQ](/apps/gitbird/faq)
