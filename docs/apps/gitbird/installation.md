# GitBird Installation

## Requirements

- macOS 14.6 or later.
- A GitHub or GitLab account.
- A personal access token for the selected provider.
- Network access to GitHub, GitLab.com, or the configured self-managed GitLab host.

## Install

1. Download the latest signed build from [GitHub Releases](https://github.com/h3pdesign/GitBird/releases).
2. Move GitBird to `/Applications`.
3. Launch GitBird.
4. Open the menu bar icon to configure the provider account.

## Configure GitHub

1. Open GitBird Settings.
2. Select **Account** and choose **GitHub**.
3. Create a GitHub personal access token from the linked token settings page.
4. Paste the token into GitBird and choose **Verify token**.
5. Adjust refresh interval, page size, and read-notification visibility under **General**.

## Configure GitLab

1. Open Settings and choose **GitLab** under **Account**.
2. Enter `https://gitlab.com` or the self-managed GitLab HTTPS host.
3. Create a GitLab personal access token from the linked token settings page.
4. Paste the token into GitBird and choose **Verify token**.

## Build from Source

```sh
DEVELOPER_DIR=/Applications/Xcode-beta.app/Contents/Developer \
xcodebuild -project GitBird.xcodeproj \
  -scheme GitBird \
  -configuration Debug \
  -derivedDataPath /tmp/GitBird-derived \
  CODE_SIGNING_ALLOWED=NO build
```

## Related Pages

- [Overview](/apps/gitbird/overview)
- [Features](/apps/gitbird/features)
- [Changelog](/apps/gitbird/changelog)
- [Known Issues](/apps/gitbird/known-issues)
- [FAQ](/apps/gitbird/faq)
