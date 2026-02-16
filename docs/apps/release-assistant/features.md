---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/release-assistant/main-window.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/release-assistant/main-window.png
---

# Release Assistant Features

## Context Detection

Release Assistant detects release environment context before execution.

- repository path and workflow readiness
- host mode (`github.com` vs enterprise)
- visibility signals where available

## Guardrails and Validation

Input and mode guardrails are enforced before release commands run.

- invalid path/tag/date rejection
- release date format enforcement (`YYYY-MM-DD`)
- required workflow presence checks
- self-hosted policy guard for public repos

## Authentication-Aware Execution

GitHub CLI auth is validated for notarized flow requirements.

- `gh auth status` on GitHub.com
- `gh auth status --hostname <host>` on enterprise hosts

## Workflow Modes

- full release
- dry-run validation
- hosted notarized flow
- enterprise self-hosted notarized flow

## Audit Logging

Each run emits structured audit context in the output stream.

- timestamp
- repo path
- host
- tag
- mode
- effective command

## Advanced Actions

- Homebrew cask update path
- manual release creation via `gh release`

## Product UI Screenshot

![Release Assistant main window](/media/release-assistant/main-window.png)

## Related Pages

- [Overview](/apps/release-assistant/overview)
- [Installation](/apps/release-assistant/installation)
- [Features](/apps/release-assistant/features)
- [Gallery](/apps/release-assistant/gallery)
- [Known Issues](/apps/release-assistant/known-issues)
- [FAQ](/apps/release-assistant/faq)
