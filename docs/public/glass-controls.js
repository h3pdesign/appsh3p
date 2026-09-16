(() => {
  if (window.h3pGlassControls) return;
  window.h3pGlassControls = true;
  const selector = 'button, input[type="button"], input[type="submit"], a[role="button"], .VPButton, .h3p-button, .chip-link, .h3p-app-action-links a, .h3p-page-feedback-actions a, .h3p-back-apps-fab, .h3p-aside-cmd-cta, .startpage-hero-secondary-cta, .startpage-testimonial-cta, .h3p-nav-search-hint, .apps-slide-cta, .theme-switches span, .leaflet-bar a';
  const excluded = '.leaflet-marker-icon, .leaflet-interactive, [data-glass="off"], .VPSwitch, .VPNavBarHamburger';
  function decorate(root) {
    if (!(root instanceof Element || root instanceof Document)) return;
    const controls = [...root.querySelectorAll(selector)];
    if (root instanceof Element && root.matches(selector)) controls.push(root);
    for (const control of controls) {
      if (!control.matches(excluded)) control.classList.add('glass-control');
    }
  }
  // Child-list observation handles Vue navigation and dynamically generated map controls.
  decorate(document);
  new MutationObserver(records => {
    for (const record of records) for (const node of record.addedNodes) decorate(node);
  }).observe(document.body, { childList: true, subtree: true });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const transparent = matchMedia('(prefers-reduced-transparency: reduce)');
  let frame = 0;
  let active;
  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    active?.style.removeProperty('--glass-x');
    active?.style.removeProperty('--glass-y');
    active = null;
  }
  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reduced.matches || transparent.matches || document.documentElement.classList.contains('no-hero-fx')) return reset();
    const control = event.target.closest('.glass-control');
    if (!control || control.matches(':disabled, [aria-disabled="true"]')) return reset();
    if (active !== control) reset();
    active = control;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const rect = control.getBoundingClientRect();
      control.style.setProperty('--glass-x', `${Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100))}%`);
      control.style.setProperty('--glass-y', `${Math.max(0, Math.min(100, (event.clientY - rect.top) / rect.height * 100))}%`);
    });
  }, { passive: true });
  document.addEventListener('pointerout', event => {
    if (active && !active.contains(event.relatedTarget)) reset();
  });
  window.addEventListener('blur', reset);
  reduced.addEventListener('change', reset);
  transparent.addEventListener('change', reset);
})();
