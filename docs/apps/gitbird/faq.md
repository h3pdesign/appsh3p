# GitBird FAQ

## What providers does GitBird support?

GitBird supports GitHub notifications and GitLab Todos, including GitLab.com and configured self-managed GitLab HTTPS hosts.

## Where are tokens stored?

Tokens are stored in the macOS Keychain. Legacy UserDefaults tokens are migrated and removed on first launch.

## Does GitBird keep its own read database?

No. The provider is the source of truth for unread, read, pending, and completed state.

## Why does GitLab use done/completed language?

GitLab exposes notification-like work through the Todo API. Marking an item read completes the Todo.

## Where can I download it?

Use [GitHub Releases](https://github.com/h3pdesign/GitBird/releases).

## Related Pages

- [Overview](/apps/gitbird/overview)
- [Installation](/apps/gitbird/installation)
- [Features](/apps/gitbird/features)
- [Changelog](/apps/gitbird/changelog)
- [Known Issues](/apps/gitbird/known-issues)
- [Privacy Policy](/apps/gitbird/privacy-policy)
