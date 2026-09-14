// Retain the existing theme and consent handlers behind accessible radio groups.
(() => {
  const controls = ['themeModeSelect', 'lightVariantSelect'].map(id => {
    const select = document.getElementById(id);
    if (!select) return null;
    const group = document.createElement('fieldset');
    group.className = 'theme-switches';
    const legend = document.createElement('legend');
    legend.textContent = select.getAttribute('aria-label');
    group.append(legend);
    for (const option of select.options) {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `${id}-switch`;
      input.value = option.value;
      const text = document.createElement('span');
      text.textContent = option.textContent;
      label.append(input, text);
      group.append(label);
      input.addEventListener('change', () => {
        select.value = input.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        sync();
      });
    }
    const wrapper = select.closest('.theme-select-wrap');
    wrapper.before(group);
    wrapper.hidden = true;
    return { select, group };
  }).filter(Boolean);

  function sync() {
    for (const { select, group } of controls) {
      group.disabled = select.disabled;
      for (const input of group.querySelectorAll('input')) {
        input.checked = input.value === select.value;
      }
    }
  }

  sync();
  const observer = new MutationObserver(sync);
  observer.observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-theme', 'data-light-variant']
  });
  for (const { select } of controls) {
    observer.observe(select, { attributes: true, attributeFilter: ['disabled'] });
  }
})();
