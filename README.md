# App Documentation Starter

This repository contains a reusable VitePress documentation portal for multiple apps.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Run locally:

```bash
npm run docs:dev
```

3. Build static site:

```bash
npm run docs:build
```

4. Preview production build:

```bash
npm run docs:preview
```

## Customize branding

Edit `docs/.vitepress/config.mts`:

- `title`
- `description`
- `themeConfig.siteTitle`
- `socialLinks`

## Add a new app

1. Create folder: `docs/apps/<your-app-slug>/`
2. Copy structure from `docs/apps/app-one/`
3. Update sidebar links in `docs/.vitepress/config.mts`
4. Optionally start from `docs/templates/app-template.md`

## Deploy

You can deploy the built `docs/.vitepress/dist` folder to:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## Domain setup for apps-h3p.com

This repo is preconfigured for `apps-h3p.com`:

- `docs/.vitepress/config.mts` sets sitemap hostname to `https://apps-h3p.com`
- `docs/public/CNAME` is set to `apps-h3p.com`

Add the domain in your hosting provider first, then create DNS records:

1. `A` record for apex `@` to provider target (or provider-specific `ALIAS/ANAME`).
2. Optional `CNAME` for `www` to `apps-h3p.com` (or provider endpoint).
3. Enable HTTPS in hosting dashboard.

Provider defaults:

- Vercel: point `@` and `www` as shown in Vercel Domains UI.
- Netlify: use Netlify DNS target values shown for your site.
- GitHub Pages: `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
