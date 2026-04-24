<p align="center">
  <a href="https://apps-h3p.com"><img alt="Docs on h3p apps" src="https://img.shields.io/badge/Docs-h3p%20apps-111827?style=for-the-badge"></a>
  <a href="https://www.patreon.com/h3p"><img alt="Support on Patreon" src="https://img.shields.io/badge/Support%20on-Patreon-F96854?style=for-the-badge&amp;logo=patreon&amp;logoColor=white"></a>
  <a href="https://www.paypal.com/paypalme/HilthartPedersen"><img alt="Support via PayPal" src="https://img.shields.io/badge/Support%20via-PayPal-0070BA?style=for-the-badge&amp;logo=paypal&amp;logoColor=white"></a>
</p>

<p align="center">
  <a href="https://github.com/h3pdesign/appsh3p/commits/main"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/h3pdesign/appsh3p"></a>
  <a href="https://apps-h3p.com"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?logo=github&amp;logoColor=white"></a>
  <a href="https://apps-h3p.com/polymarket-us-politics/conflict-monitor.html"><img alt="Conflict Monitor" src="https://img.shields.io/badge/Live-Conflict%20Monitor-0b7cff"></a>
  <a href="https://apps-h3p.com"><img alt="Apps Hub" src="https://img.shields.io/badge/Live-Apps%20Hub-2563eb"></a>
  <a href="https://vitepress.dev/"><img alt="VitePress" src="https://img.shields.io/badge/VitePress-1.6.4-5c73e7?logo=vite&amp;logoColor=white"></a>
</p>

<h1 align="center">apps-h3p and conflict monitor</h1>

<p align="center">
  <strong>Public documentation, release communication, and live intelligence presentation.</strong><br>
  A single VitePress repository powering the H3P apps hub and the public <code>STATE OF US &amp; WORLD POLITICS</code> monitor.
</p>

<p align="center">
  <a href="https://apps-h3p.com">apps-h3p.com</a> ·
  <a href="https://apps-h3p.com/polymarket-us-politics/conflict-monitor.html">Conflict Monitor</a> ·
  <a href="https://apps-h3p.com/polymarket-us-politics/state-of-us-politics.html">Predictions</a> ·
  <a href="https://apps-h3p.com/support">Support</a> ·
  <a href="https://apps-h3p.com/policies/privacy-policy">Policies</a>
</p>

---

## Overview

This repository publishes two related public surfaces from one deployable codebase.

### H3P Apps Documentation Hub

The apps hub at [apps-h3p.com](https://apps-h3p.com) is the canonical documentation and release-communication layer for current H3P apps.

It provides:

- app overview pages with platform support and status metadata
- installation, feature, FAQ, changelog, and component documentation
- support, legal, privacy, cookie-policy, and trust pages
- app-specific icons, media, screenshots, and release-linked content

### STATE OF US & WORLD POLITICS

The monitor surface combines conflict-monitoring presentation and prediction-market reporting.

Primary entry points:

- [Conflict Monitor](https://apps-h3p.com/polymarket-us-politics/conflict-monitor.html)
- [Predictions](https://apps-h3p.com/polymarket-us-politics/state-of-us-politics.html)

It provides:

- live conflict metric cards and freshness indicators
- map, timeline, ticker, and source-summary views
- prediction-market reporting pages
- generated public data payloads refreshed by scheduled workflows

---

## Screenshots

### Apps Hub

![apps-h3p home](.github/readme-assets/apps-h3p.png)

### Conflict Cards and Live Ticker

![conflict cards and ticker](.github/readme-assets/conflict-monitor003.png)

### Conflict Monitor Overview

![conflict monitor overview](.github/readme-assets/conflict-monitor005.png)

### Conflict Metrics and Map

![conflict metrics and map](.github/readme-assets/conflict-monitor002.png)

---

## Quick Start

```bash
git clone https://github.com/h3pdesign/appsh3p.git
cd appsh3p
npm install
npm run docs:dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173).

Useful commands:

```bash
npm run docs:build
npm run docs:preview
node scripts/validate-polymarket-site.mjs
node scripts/update-iran-war-metrics.mjs
node scripts/update-conflict-news.mjs
node scripts/update-market-id-map.mjs
node scripts/update-social-tracker-metrics.mjs
```

---

## Repository Layout

```text
docs/
  apps/                         App documentation pages
  policies/                     Privacy, cookie, terms, and trust pages
  public/
    icons/                      Public app icons
    media/                      Public screenshots and app artwork
    polymarket-us-politics/     Conflict monitor and prediction portal data
scripts/
  update-iran-war-metrics.mjs   Conflict metrics, map, and timeline payloads
  update-conflict-news.mjs      Live ticker and news payloads
  update-market-id-map.mjs      Prediction-market ID mapping
  update-social-tracker-metrics.mjs
  validate-polymarket-site.mjs  Static validation before publish
.github/workflows/              Scheduled data refresh and GitHub Pages deploys
```

---

## Data and Automation

The monitor pages are generated from public payloads stored under:

```text
docs/public/polymarket-us-politics/data/
```

Scheduled GitHub Actions refresh the public data for:

- conflict metrics, map points, and timeline entries
- conflict news ticker content
- prediction-market mapping and snapshots
- social-attention metrics

Before publishing, validate the generated site payloads:

```bash
node scripts/validate-polymarket-site.mjs
```

---

## Deployment

Production is served by GitHub Pages on the custom domain:

- [https://apps-h3p.com](https://apps-h3p.com)

Deployment-related files:

- `docs/public/CNAME`
- VitePress configuration and sitemap hostname
- GitHub Actions workflows for scheduled refreshes and Pages deployment

Production build output:

```text
docs/.vitepress/dist
```

---

## App Documentation Workflow

When adding or updating an app:

1. Create or update `docs/apps/<slug>/`
2. Add app icons or media under `docs/public/icons/` or `docs/public/media/`
3. Sync release-driven metadata when applicable
4. Build locally
5. Validate generated public data
6. Deploy through the configured GitHub Pages workflow

Typical local preflight:

```bash
npm run docs:build
node scripts/validate-polymarket-site.mjs
```

---

## Project Purpose

This repository is the public-facing operations and documentation layer for:

- H3P app management and release communication
- conflict-monitoring presentation
- prediction-market reporting
- support, policy, and trust content

The goal is one maintainable site that serves product documentation, release communication, and continuously refreshed public intelligence pages from the same VitePress codebase.
