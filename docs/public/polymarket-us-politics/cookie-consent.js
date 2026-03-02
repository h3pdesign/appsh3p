(() => {
  const CONSENT_KEY = 'pmir-cookie-consent-v1';
  const CHANGE_EVENT = 'pmir-cookie-consent-change';

  const DEFAULT_PREFS = {
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false
  };

  function readConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      return {
        version: 1,
        updatedAt: parsed.updatedAt || null,
        preferences: {
          necessary: true,
          preferences: Boolean(parsed.preferences?.preferences),
          analytics: Boolean(parsed.preferences?.analytics),
          marketing: Boolean(parsed.preferences?.marketing)
        }
      };
    } catch {
      return null;
    }
  }

  function persistConsent(preferences) {
    const payload = {
      version: 1,
      updatedAt: new Date().toISOString(),
      preferences: {
        necessary: true,
        preferences: Boolean(preferences.preferences),
        analytics: Boolean(preferences.analytics),
        marketing: Boolean(preferences.marketing)
      }
    };

    localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
    document.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: payload }));
    return payload;
  }

  function hasConsent(category) {
    const current = readConsent();
    if (!current) return false;
    if (category === 'necessary') return true;
    return Boolean(current.preferences?.[category]);
  }

  function ensureStyles() {
    if (document.getElementById('pmir-cookie-style')) return;
    const style = document.createElement('style');
    style.id = 'pmir-cookie-style';
    style.textContent = `
      .pmir-cookie-banner {
        position: fixed;
        left: 16px;
        right: 16px;
        bottom: 16px;
        z-index: 1600;
        max-width: 860px;
        margin: 0 auto;
        border: 1px solid rgba(148,163,184,0.35);
        border-radius: 14px;
        background: rgba(8,12,28,0.96);
        color: #e5e7eb;
        padding: 0.9rem 1rem;
        box-shadow: 0 18px 46px rgba(2,6,23,0.45);
        font-family: "IBM Plex Sans", system-ui, sans-serif;
      }
      :root[data-theme='light'] .pmir-cookie-banner {
        background: rgba(255,255,255,0.98);
        color: #111827;
        border-color: rgba(71,85,105,0.28);
        box-shadow: 0 12px 36px rgba(15,23,42,0.16);
      }
      .pmir-cookie-title {
        margin: 0 0 0.35rem;
        font-size: 0.9rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .pmir-cookie-text {
        margin: 0;
        font-size: 0.85rem;
        line-height: 1.45;
      }
      .pmir-cookie-text a { color: inherit; text-decoration: underline; }
      .pmir-cookie-actions {
        margin-top: 0.72rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
      }
      .pmir-cookie-btn {
        border-radius: 999px;
        border: 1px solid rgba(148,163,184,0.42);
        background: transparent;
        color: inherit;
        font-size: 0.78rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 0.42rem 0.78rem;
        cursor: pointer;
      }
      .pmir-cookie-btn.primary {
        background: #16a34a;
        border-color: #16a34a;
        color: #f8fafc;
      }
      .pmir-cookie-btn.primary.secondary {
        background: #2563eb;
        border-color: #2563eb;
      }
      .pmir-cookie-manage {
        position: fixed;
        right: 12px;
        bottom: 12px;
        z-index: 1500;
        border-radius: 999px;
        border: 1px solid rgba(148,163,184,0.45);
        background: rgba(8,12,28,0.88);
        color: #e5e7eb;
        font-size: 0.72rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 0.35rem 0.62rem;
        cursor: pointer;
      }
      :root[data-theme='light'] .pmir-cookie-manage {
        background: rgba(255,255,255,0.95);
        color: #1f2937;
      }
      .pmir-cookie-modal {
        position: fixed;
        inset: 0;
        z-index: 1700;
        display: none;
        align-items: center;
        justify-content: center;
        background: rgba(2,6,23,0.62);
        padding: 1rem;
      }
      .pmir-cookie-modal.open { display: flex; }
      .pmir-cookie-dialog {
        width: min(620px, 100%);
        border-radius: 14px;
        border: 1px solid rgba(148,163,184,0.35);
        background: #0b1227;
        color: #e5e7eb;
        padding: 1rem;
      }
      :root[data-theme='light'] .pmir-cookie-dialog {
        background: #ffffff;
        color: #111827;
      }
      .pmir-cookie-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.52rem 0;
        border-top: 1px solid rgba(148,163,184,0.2);
      }
      .pmir-cookie-row:first-of-type { border-top: 0; }
      .pmir-cookie-row label { font-size: 0.88rem; }
      .pmir-cookie-row small { display: block; opacity: 0.8; font-size: 0.75rem; margin-top: 0.2rem; }
      .pmir-cookie-modal-actions {
        margin-top: 0.8rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.42rem;
      }
    `;
    document.head.appendChild(style);
  }

  function createBanner() {
    const node = document.createElement('div');
    node.className = 'pmir-cookie-banner';
    node.innerHTML = `
      <h3 class="pmir-cookie-title">Privacy & Cookie Settings (EU)</h3>
      <p class="pmir-cookie-text">This site uses essential storage for core functionality and optional storage for preferences/analytics only with your choice. You can change settings at any time. <a href="/polymarket-us-politics/cookie-policy.html" target="_blank" rel="noopener">Cookie Policy</a></p>
      <div class="pmir-cookie-actions">
        <button type="button" class="pmir-cookie-btn" data-action="essential">Essential only</button>
        <button type="button" class="pmir-cookie-btn" data-action="manage">Manage</button>
        <button type="button" class="pmir-cookie-btn primary" data-action="all">Accept all</button>
      </div>
    `;
    return node;
  }

  function createManageButton() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pmir-cookie-manage';
    btn.textContent = 'Cookie settings';
    btn.setAttribute('aria-label', 'Open cookie settings');
    return btn;
  }

  function createModal() {
    const node = document.createElement('div');
    node.className = 'pmir-cookie-modal';
    node.innerHTML = `
      <div class="pmir-cookie-dialog" role="dialog" aria-modal="true" aria-label="Cookie settings">
        <h3 class="pmir-cookie-title">Cookie Preferences</h3>
        <div class="pmir-cookie-row">
          <label>Strictly necessary
            <small>Required for security, page rendering and consent storage.</small>
          </label>
          <input type="checkbox" checked disabled>
        </div>
        <div class="pmir-cookie-row">
          <label>Preferences
            <small>Theme and UI preferences (for example light/dark mode choice).</small>
          </label>
          <input id="pmir-consent-preferences" type="checkbox">
        </div>
        <div class="pmir-cookie-row">
          <label>Analytics
            <small>Usage measurement (currently not active by default).</small>
          </label>
          <input id="pmir-consent-analytics" type="checkbox">
        </div>
        <div class="pmir-cookie-row">
          <label>Marketing
            <small>Advertising or cross-site tracking (currently not active).</small>
          </label>
          <input id="pmir-consent-marketing" type="checkbox">
        </div>
        <div class="pmir-cookie-modal-actions">
          <button type="button" class="pmir-cookie-btn" data-action="cancel">Cancel</button>
          <button type="button" class="pmir-cookie-btn" data-action="essential">Essential only</button>
          <button type="button" class="pmir-cookie-btn primary secondary" data-action="save">Save preferences</button>
        </div>
      </div>
    `;
    return node;
  }

  function applyConsentDefaultsToModal(modal, consent) {
    const prefs = consent?.preferences || DEFAULT_PREFS;
    const pref = modal.querySelector('#pmir-consent-preferences');
    const analytics = modal.querySelector('#pmir-consent-analytics');
    const marketing = modal.querySelector('#pmir-consent-marketing');
    if (pref) pref.checked = Boolean(prefs.preferences);
    if (analytics) analytics.checked = Boolean(prefs.analytics);
    if (marketing) marketing.checked = Boolean(prefs.marketing);
  }

  function init() {
    ensureStyles();

    const current = readConsent();
    const banner = createBanner();
    const modal = createModal();
    const manage = createManageButton();

    function isMobileViewport() {
      return window.matchMedia('(max-width: 1024px), (pointer: coarse)').matches;
    }

    function updateManageVisibility() {
      const hasChoice = Boolean(readConsent());
      manage.style.display = (isMobileViewport() && hasChoice) ? 'none' : '';
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function openModal() {
      applyConsentDefaultsToModal(modal, readConsent());
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function removeBanner() {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }

    function saveEssentialOnly() {
      persistConsent({ ...DEFAULT_PREFS, preferences: false, analytics: false, marketing: false });
      removeBanner();
      closeModal();
      updateManageVisibility();
    }

    function saveAll() {
      persistConsent({ ...DEFAULT_PREFS, preferences: true, analytics: true, marketing: true });
      removeBanner();
      closeModal();
      updateManageVisibility();
    }

    function saveFromModal() {
      const pref = modal.querySelector('#pmir-consent-preferences')?.checked;
      const analytics = modal.querySelector('#pmir-consent-analytics')?.checked;
      const marketing = modal.querySelector('#pmir-consent-marketing')?.checked;
      persistConsent({ ...DEFAULT_PREFS, preferences: Boolean(pref), analytics: Boolean(analytics), marketing: Boolean(marketing) });
      removeBanner();
      closeModal();
      updateManageVisibility();
    }

    banner.addEventListener('click', event => {
      const action = event.target?.getAttribute?.('data-action');
      if (!action) return;
      if (action === 'essential') saveEssentialOnly();
      if (action === 'all') saveAll();
      if (action === 'manage') openModal();
    });

    modal.addEventListener('click', event => {
      if (event.target === modal) {
        closeModal();
        return;
      }
      const action = event.target?.getAttribute?.('data-action');
      if (!action) return;
      if (action === 'cancel') closeModal();
      if (action === 'essential') saveEssentialOnly();
      if (action === 'save') saveFromModal();
    });

    manage.addEventListener('click', openModal);

    document.body.appendChild(modal);
    document.body.appendChild(manage);
    updateManageVisibility();
    window.addEventListener('resize', updateManageVisibility);

    if (!current) {
      document.body.appendChild(banner);
    }

    window.PMIRCookieConsent = {
      read: readConsent,
      hasConsent,
      openPreferences: openModal,
      onChange(handler) {
        if (typeof handler !== 'function') return () => {};
        const wrapped = event => handler(event.detail || readConsent());
        document.addEventListener(CHANGE_EVENT, wrapped);
        return () => document.removeEventListener(CHANGE_EVENT, wrapped);
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
