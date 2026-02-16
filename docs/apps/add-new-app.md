# Add a New App

Use this checklist each time you add another app to your docs portal.

## 1. Create icon

Add icon file to:

- `docs/public/icons/<app-slug>.svg` or
- `docs/public/icons/<app-slug>.png`

## 2. Create pages

Create folder:

- `docs/apps/<app-slug>/`

Add pages:

- `overview.md`
- `installation.md`
- `features.md`

## 3. Register links

Update `docs/.vitepress/config.mts`:

- add app links under sidebar `Apps`
- optionally update top `nav`

## 4. Add card to catalog

Edit `docs/apps/index.md` and add a card with:

- app name
- icon path
- short description
- link to `/apps/<app-slug>/overview`
