# Release Notes Workflow

## Automatic docs sync on release

This docs site is configured to auto-sync version references from GitHub Releases.

### Sync modes

1. Event-driven: app repository publishes a release and sends `repository_dispatch`.
2. Scheduled fallback: docs repo polls all tracked apps every 4 hours.
3. Manual trigger: run workflow `Sync app release versions` with `app` and optional `repo`.

### Required docs repo secret

For private app repositories, add this secret in `h3pdesign/appsh3p`:

- `APP_RELEASES_PAT`: Personal Access Token with read access to release metadata for private repos.

If all repos are public, default `GITHUB_TOKEN` is enough.

### App repo webhook workflow template

Add this workflow to each app repo to notify docs on release publish:

```yaml
name: Notify docs on release

on:
  release:
    types: [published]

jobs:
  dispatch:
    runs-on: ubuntu-latest
    steps:
      - name: Dispatch docs sync
        env:
          GH_TOKEN: ${{ secrets.DOCS_REPO_PAT }}
        run: |
          curl -fsSL -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer ${GH_TOKEN}" \
            https://api.github.com/repos/h3pdesign/appsh3p/dispatches \
            -d '{"event_type":"<app>_release_published","client_payload":{"app":"<app-key>","repo":"<owner/repo>"}}'
```

Use event/app values:

- Neon Vision Editor: `event_type=neon_release_published`, `app-key=neon`, `repo=h3pdesign/Neon-Vision-Editor`
- Metric Data: `event_type=metric_release_published`, `app-key=metric`, `repo=h3pdesign/Metrics`
- Release Assistant: `event_type=release_assistant_release_published`, `app-key=release-assistant`, `repo=h3pdesign/Release-Assistant`

## Release content checklist

For each app release:

1. Document breaking changes first.
2. Link migration steps when needed.
3. Mark deprecated APIs with target removal version.
4. Update support notes and FAQ if behavior changed.
5. Verify overview page version and changelog headline are updated.
