# Release Assistant Known Issues

## Missing Workflow Files Blocks Full Release

If required workflow files are absent for selected mode, release is blocked by design.

Resolution:

- install workflow templates from app action, or
- add required files manually under `.github/workflows`

## GitHub CLI Authentication Missing

Notarized flows require authenticated `gh` state.

Resolution:

- `gh auth login` for GitHub.com
- `gh auth login --hostname <enterprise-host>` for enterprise

## Hosted/Self-Hosted Mode Mismatch

Using self-hosted mode for public repos is intentionally blocked.

Resolution:

- use hosted notarized mode for public repositories
