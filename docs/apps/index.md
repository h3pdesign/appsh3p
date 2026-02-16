# All Apps

Use this page as your public app directory. Each card links to that app's full docs.

<div class="apps-grid">
  <a class="app-card" href="/apps/app-one/overview">
    <img src="/icons/app-one.svg" alt="App One icon" class="app-icon" />
    <div>
      <h3>App One</h3>
      <p>Primary productivity app docs, setup, and feature guides.</p>
    </div>
  </a>

  <a class="app-card" href="/apps/app-two/overview">
    <img src="/icons/app-two.svg" alt="App Two icon" class="app-icon" />
    <div>
      <h3>App Two</h3>
      <p>Companion app docs, installation, and workflow references.</p>
    </div>
  </a>

  <a class="app-card" href="/apps/add-new-app">
    <img src="/icons/new-app.svg" alt="New app icon" class="app-icon" />
    <div>
      <h3>Add Next App</h3>
      <p>Starter checklist for plugging a new app into this docs portal.</p>
    </div>
  </a>
</div>

## Replace With Your Real Apps

1. Replace names and descriptions on this page.
2. Replace icon files in `docs/public/icons/`.
3. Update app folders in `docs/apps/`.
4. Update sidebar links in `docs/.vitepress/config.mts`.

<style>
.apps-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  margin-top: 16px;
}

.app-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  gap: 14px;
  align-items: center;
  text-decoration: none;
  background: linear-gradient(180deg, var(--vp-c-bg-soft), var(--vp-c-bg));
  transition: transform 0.15s ease, border-color 0.15s ease;
}

.app-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-1);
}

.app-card h3 {
  margin: 0 0 4px;
  color: var(--vp-c-text-1);
}

.app-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.app-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  flex: 0 0 auto;
  border: 1px solid var(--vp-c-divider);
}
</style>
