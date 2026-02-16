---
head:
  - - meta
    - property: og:image
      content: https://apps-h3p.com/media/release-assistant/main-window.png
  - - meta
    - name: twitter:image
      content: https://apps-h3p.com/media/release-assistant/main-window.png
---

# Release Assistant Installation

## Expected Repository Layout

Release Assistant is optimized for repositories that include:

- `scripts/release_all.sh`
- `scripts/release_prep.sh` (optional but expected)
- `scripts/setup_release_workflows.sh` (optional)
- `.github/workflows/*` aligned with selected mode

## App Setup Flow

1. Launch Release Assistant.
2. Select project repository path.
3. Validate release context and workflow readiness.
4. Fill release metadata (version/tag/date/zip/SHA256 as needed).
5. Run preflight or dry-run first.
6. Run full automated release when checks pass.

## Host-Specific Defaults

GitHub.com default:

- hosted notarized workflow preferred

Enterprise default:

- self-hosted notarized workflow with enterprise templates

## Recommended First Run

- run dry-run mode
- resolve workflow/auth warnings
- confirm audit header is present in output

## Related Pages

- [Overview](/apps/release-assistant/overview)
- [Installation](/apps/release-assistant/installation)
- [Features](/apps/release-assistant/features)
- [Gallery](/apps/release-assistant/gallery)
- [Known Issues](/apps/release-assistant/known-issues)
- [FAQ](/apps/release-assistant/faq)
