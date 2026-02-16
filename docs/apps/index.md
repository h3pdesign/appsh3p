# All Apps

This is the central documentation hub for all H3P apps.

<div class="apps-grid">
  <a class="app-card" href="/apps/neon-vision-editor/overview">
    <img src="/icons/neon-vision-editor.png" alt="Neon Vision Editor icon" class="app-icon" />
    <div>
      <h3>Neon Vision Editor</h3>
      <p>Native editor for macOS, iPadOS, and iOS with optional AI assistance and syntax highlighting.</p>
      <span class="chip chip-live">GitHub: public repository</span>
    </div>
  </a>

  <a class="app-card" href="/apps/metric-data/overview">
    <img src="/icons/metric-data.png" alt="Metric Data icon" class="app-icon" />
    <div>
      <h3>Metric Data</h3>
      <p>Google AdSense analytics app with OAuth, multi-account switching, filters, and Swift Charts dashboards.</p>
      <span class="chip">GitHub: repository not public yet</span>
    </div>
  </a>

  <a class="app-card" href="/apps/release-assistant/overview">
    <img src="/icons/release-assistant.png" alt="Release Assistant icon" class="app-icon" />
    <div>
      <h3>Release Assistant</h3>
      <p>macOS orchestration tool for guarded release pipelines, workflow checks, and audit-oriented output.</p>
      <span class="chip">GitHub: repository not public yet</span>
    </div>
  </a>
</div>

## Source Code Repositories

See [GitHub Repositories](/apps/github-repositories) for repository links and current publication status.

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
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
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
  color: #1ec75f;
  border-color: #2e8f52;
  background: rgba(30, 199, 95, 0.12);
}
</style>
