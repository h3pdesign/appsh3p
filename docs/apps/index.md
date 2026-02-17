# All Apps

<div class="apps-top-row">
  <p class="apps-intro">This is the central documentation hub for all H3P apps.</p>
  <div class="apps-avatar-card">
    <img src="/brand/avatar.png" alt="H3P avatar" class="apps-avatar" />
    <div class="apps-avatar-meta">
      <strong>h3p</strong>
      <span>app creator</span>
    </div>
  </div>
</div>

<div class="apps-whats-new" aria-label="Latest updates">
  <div class="apps-whats-new-title">What's new</div>
  <div class="apps-whats-new-items">
    <span>Neon Vision Editor docs expanded with changelog, known issues, and FAQ.</span>
    <span>Metric Data overview refreshed with iPad-first screenshots and SEO metadata.</span>
    <span>Release Assistant now includes structured install, gallery, and changelog docs.</span>
  </div>
</div>

<div class="apps-carousel" aria-label="Featured screenshots carousel">
  <div class="apps-carousel-track">
    <a class="apps-slide neon" href="/apps/neon-vision-editor/gallery">
      <img src="/media/neon/editing-mac-frame.png" alt="Neon Vision Editor screenshot" />
      <span>Neon Vision Editor</span>
    </a>
    <a class="apps-slide metric" href="/apps/metric-data/gallery">
      <img src="/media/metrics/dashboard-ipad-frame.png" alt="Metric Data screenshot" />
      <span>Metric Data</span>
    </a>
    <a class="apps-slide release" href="/apps/release-assistant/gallery">
      <img src="/media/release-assistant/main-window.png" alt="Release Assistant screenshot" />
      <span>Release Assistant</span>
    </a>
  </div>
</div>

<div class="apps-grid">
  <a class="app-card app-card-neon" data-changelog="/apps/neon-vision-editor/changelog" href="/apps/neon-vision-editor/overview">
    <img src="/icons/neon-vision-editor.png" alt="Neon Vision Editor icon" class="app-icon" />
    <div>
      <h3>Neon Vision Editor</h3>
      <div class="app-card-meta-row">
        <div class="app-platform-pills">
          <span>macOS</span><span>iPadOS</span><span>iOS</span>
        </div>
        <span class="app-updated-badge">updated recently</span>
      </div>
      <p>Native editor for macOS, iPadOS, and iOS with optional AI assistance and syntax highlighting.</p>
      <span class="chip chip-live">GitHub: public repository</span>
      <span class="chip"><a href="https://testflight.apple.com/join/YWB2fGAP" target="_blank" rel="noreferrer">TestFlight</a></span>
    </div>
  </a>

  <a class="app-card app-card-metric" data-changelog="/apps/metric-data/changelog" href="/apps/metric-data/overview">
    <img src="/icons/metric-data.png" alt="Metric Data icon" class="app-icon" />
    <div>
      <h3>Metric Data</h3>
      <div class="app-card-meta-row">
        <div class="app-platform-pills">
          <span>macOS</span><span>iPadOS</span><span>iOS</span>
        </div>
        <span class="app-updated-badge">updated recently</span>
      </div>
      <p>Google AdSense analytics app with OAuth, multi-account switching, filters, and Swift Charts dashboards.</p>
      <span class="chip">GitHub: repository not public yet</span>
      <span class="chip"><a href="https://testflight.apple.com/join/mMyMAGjE" target="_blank" rel="noreferrer">TestFlight</a></span>
    </div>
  </a>

  <a class="app-card app-card-release" data-changelog="/apps/release-assistant/changelog" href="/apps/release-assistant/overview">
    <img src="/icons/release-assistant.png" alt="Release Assistant icon" class="app-icon" />
    <div>
      <h3>Release Assistant</h3>
      <div class="app-card-meta-row">
        <div class="app-platform-pills">
          <span>macOS</span>
        </div>
        <span class="app-updated-badge">updated recently</span>
      </div>
      <p>macOS orchestration tool for guarded release pipelines, workflow checks, and audit-oriented output.</p>
      <span class="chip">GitHub: repository not public yet</span>
    </div>
  </a>
</div>

## Source Code Repositories

See [GitHub Repositories](/apps/github-repositories) for repository links and current publication status.

<style>
.apps-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.apps-intro {
  margin: 0;
}

.apps-whats-new {
  margin-top: 14px;
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: linear-gradient(120deg, rgba(64, 160, 255, 0.12), rgba(115, 133, 255, 0.08));
}

.apps-whats-new-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  font-weight: 700;
}

.apps-whats-new-items {
  display: grid;
  gap: 6px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.apps-carousel {
  margin-top: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 10px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  overflow: hidden;
}

.apps-carousel-track {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.apps-slide {
  display: grid;
  gap: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  border-radius: 10px;
  padding: 8px;
  border: 1px solid transparent;
}

.apps-slide img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.apps-slide span {
  font-size: 12px;
  font-weight: 700;
}

.apps-slide:hover {
  border-color: var(--vp-c-brand-1);
}

.apps-slide.neon span { color: #b682ff; }
.apps-slide.metric span { color: #57d17f; }
.apps-slide.release span { color: #63d4ff; }

.apps-avatar-card {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
}

.apps-avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  object-fit: cover;
}

.apps-avatar-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.apps-avatar-meta span {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.apps-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  margin-top: 16px;
}

.app-card {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  gap: 14px;
  align-items: center;
  text-decoration: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
}

.app-card::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 8px;
  bottom: 12px;
  width: 3px;
  border-radius: 4px;
  opacity: 0.9;
}

.app-card-neon::before { background: linear-gradient(180deg, #8f4dff, #b682ff); }
.app-card-metric::before { background: linear-gradient(180deg, #39b66b, #8be5aa); }
.app-card-release::before { background: linear-gradient(180deg, #2dc0ff, #74e0ff); }

.app-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 10px 24px rgba(14, 143, 255, 0.15);
}

.app-card h3 {
  margin: 0 0 6px;
  color: var(--vp-c-text-1);
}

.app-card-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.app-platform-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.app-platform-pills span {
  display: inline-block;
  font-size: 11px;
  line-height: 1;
  padding: 5px 8px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: rgba(83, 210, 255, 0.1);
  font-weight: 700;
}

.app-updated-badge {
  font-size: 10px;
  line-height: 1;
  padding: 5px 7px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  background: rgba(255, 255, 255, 0.02);
  text-transform: lowercase;
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

@media (max-width: 980px) {
  .apps-carousel-track {
    grid-template-columns: 1fr;
  }

  .apps-slide img {
    height: 160px;
  }
}

@media (max-width: 768px) {
  .apps-top-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .app-card-meta-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
