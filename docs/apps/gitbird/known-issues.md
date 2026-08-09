# GitBird Known Issues

## Current Notes

- GitBird requires provider network access; offline mode cannot refresh or mutate provider state.
- GitLab read/done language maps to GitLab Todos because GitLab does not expose a separate notification read state for Todos.
- Self-managed GitLab instances must be configured with an HTTPS host before token verification and browser shortcuts are reliable.
- Intel Mac notarization and runtime coverage should be verified separately from Apple Silicon testing when preparing public releases.

## Troubleshooting

- If notifications do not appear, verify the selected provider, token permissions, and host URL.
- If read items still appear, check whether **Hide read notifications** is enabled and refresh provider state.
- If browser shortcuts open the wrong GitLab page, confirm the configured GitLab host.

## Related Pages

- [Overview](/apps/gitbird/overview)
- [Installation](/apps/gitbird/installation)
- [FAQ](/apps/gitbird/faq)
- [Privacy Policy](/apps/gitbird/privacy-policy)
