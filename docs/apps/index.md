# All Apps

This is the central documentation hub for all H3P apps.

<div class="apps-grid">
  <a class="app-card" href="/apps/neon-vision-editor/overview">
    <img src="/icons/neon-vision-editor.png" alt="Neon Vision Editor icon" class="app-icon" />
    <div>
      <h3>Neon Vision Editor</h3>
      <p>Editing workflows, project setup, exports, and release notes.</p>
      <span class="chip chip-live">GitHub: Live</span>
    </div>
  </a>

  <a class="app-card" href="/apps/metric-data/overview">
    <img src="/icons/metric-data.png" alt="Metric Data icon" class="app-icon" />
    <div>
      <h3>Metric Data</h3>
      <p>Metrics setup, dashboard usage, and operations guidelines.</p>
      <span class="chip">GitHub: Pending</span>
    </div>
  </a>

  <a class="app-card" href="/apps/release-assistant/overview">
    <img src="/icons/release-assistant.png" alt="Release Assistant icon" class="app-icon" />
    <div>
      <h3>Release Assistant</h3>
      <p>Preflight checks, packaging pipeline, and release operations.</p>
      <span class="chip">GitHub: Pending</span>
    </div>
  </a>
</div>

## Source Code Repositories

See [GitHub Repositories](/apps/github-repositories) for repository links and publication status.

<style>
.apps-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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
  margin: 0 0 8px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.app-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  flex: 0 0 auto;
  border: none;
  background: transparent;
  object-fit: contain;
}

.chip {
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  padding: 6px 8px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.chip-live {
  color: #0e8a2d;
  border-color: #7ddf95;
  background: #f1fff5;
}
</style>
