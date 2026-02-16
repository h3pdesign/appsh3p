# Release Assistant

<img src="/icons/release-assistant.png" alt="Release Assistant icon" width="72" height="72" style="background: transparent; display: block;" />

Release Assistant is a macOS orchestration app for release pipelines in Xcode-based repositories that use `scripts/release_all.sh`.

## What It Manages

- project discovery and switching
- release metadata (version, tag, date, zip path, optional SHA256)
- release context detection (Xcode, VS Code, GitHub host, visibility where available)
- mode selection (full, dry-run, notarized, hosted/self-hosted)
- audit-oriented output and diagnostics

## Core Design Goal

Provide safer release execution with workflow-aware guardrails and clear operational visibility.

## Operational Scope

- pre-release validation
- pipeline execution control
- failure hinting and remediation guidance
- consistent command provenance logging
