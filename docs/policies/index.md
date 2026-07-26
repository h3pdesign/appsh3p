# Policies

_Last updated: May 7, 2026_

This page is the central policy index for apps-h3p.com. It separates general website policies from app-specific privacy policies.

## Website Policies

<div class="policy-grid" aria-label="Website policies">
  <a class="policy-card" href="/policies/privacy-policy">
    <span>Website Privacy</span>
    <strong>General data handling, logs, cookies, third-party services, and user rights.</strong>
  </a>
  <a class="policy-card" href="/policies/eu-cookie-notice">
    <span>EU Cookie Notice</span>
    <strong>Cookie and browser storage handling for EU/EEA visitors.</strong>
  </a>
  <a class="policy-card" href="/policies/terms-of-service">
    <span>Terms of Service</span>
    <strong>Use of the documentation site and h3p app references.</strong>
  </a>
  <a class="policy-card" href="/policies/security-and-trust">
    <span>Security and Trust</span>
    <strong>Domain, TLS, Safe Browsing, security files, and reporting guidance.</strong>
  </a>
  <a class="policy-card" href="/policies/api-stability">
    <span>API Stability</span>
    <strong>Documentation and integration stability expectations.</strong>
  </a>
  <a class="policy-card" href="/policies/license">
    <span>License</span>
    <strong>Content and source licensing information.</strong>
  </a>
  <a class="policy-card" href="/policies/ai-and-data">
    <span>AI and Data</span>
    <strong>Source boundaries, consent, and safe handling for AI-assisted features.</strong>
  </a>
</div>

## App Privacy Policies

These app-specific policies document data handling where an app has its own privacy surface beyond the general website policy.

<div class="policy-grid" aria-label="App privacy policies">
  <a class="policy-card policy-card-primary" href="/apps/metric-data/privacy-policy">
    <span>Metrics Data Privacy Policy</span>
    <strong>Google Analytics and AdSense read-only scopes, OAuth token handling, local app data, and deletion controls.</strong>
  </a>
  <a class="policy-card policy-card-primary" href="/apps/lingua-latina/privacy-policy">
    <span>Lingua Latina Privacy Policy</span>
    <strong>Local-first learning data, optional synced data, purchases, diagnostics, and deletion rights.</strong>
  </a>
</div>

## App Privacy Status

| App | Privacy policy status | Notes |
| --- | --- | --- |
| Metrics Data | [Dedicated app policy](/apps/metric-data/privacy-policy) | Includes Google User Data handling for Google Analytics and AdSense OAuth scopes. |
| Lingua Latina | [Dedicated app policy](/apps/lingua-latina/privacy-policy) | Covers dictionary, grammar, study progress, and optional app data handling. |
| Neon Vision Editor | Covered by [Website Privacy Policy](/policies/privacy-policy) and app documentation | No dedicated app privacy page is currently published on this site. |
| Release Assistant | Covered by [Website Privacy Policy](/policies/privacy-policy) and app documentation | No dedicated app privacy page is currently published on this site. |
| X-Newsbook | Covered by [Website Privacy Policy](/policies/privacy-policy) and app documentation | No dedicated app privacy page is currently published on this site. |
| Image Sorter | Covered by [Website Privacy Policy](/policies/privacy-policy) and app documentation | No dedicated app privacy page is currently published on this site. |
| Vistral | Covered by [Website Privacy Policy](/policies/privacy-policy) and app documentation | No dedicated app privacy page is currently published on this site. |
| History Vision | Covered by [Website Privacy Policy](/policies/privacy-policy) and app documentation | No dedicated app privacy page is currently published on this site. |

## Privacy Request Path

For privacy, deletion, or access requests, use [Support and Feedback](/support/support-and-feedback).

<style>
.policy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
  margin: 14px 0 22px;
}

.policy-card {
  display: grid;
  gap: 8px;
  text-decoration: none !important;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 14px 15px;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 84%, var(--vp-c-bg) 16%);
  color: var(--vp-c-text-1);
}

.policy-card:hover,
.policy-card:focus-visible {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.policy-card span {
  font-weight: 760;
  text-decoration: none;
}

.policy-card strong {
  font-size: 13px;
  line-height: 1.45;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.policy-card-primary {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 34%, var(--vp-c-divider) 66%);
}
</style>
