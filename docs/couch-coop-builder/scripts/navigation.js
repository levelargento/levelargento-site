/* Native keyboard-operable controls for the Couch documentation drawer/search.
   Material's original labels remain the no-JavaScript fallback. */
for (const [toggleId, label, targetSelector, targetId] of [
  ['__drawer', 'Open documentation navigation', '.md-sidebar--primary', 'couch-documentation-navigation'],
  ['__search', 'Open documentation search', '[data-md-component="search"]', 'couch-documentation-search']
]) {
  const original = document.querySelector(`.md-header label[for="${toggleId}"]`);
  const toggle = document.getElementById(toggleId);
  const target = document.querySelector(targetSelector);
  if (!original || !toggle || !target) continue;
  target.id = targetId;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `${original.className} couch-doc-toggle`;
  button.innerHTML = original.innerHTML;
  button.setAttribute('aria-label', label);
  button.setAttribute('aria-controls', targetId);
  button.dataset.couchToggle = toggleId;
  const sync = () => button.setAttribute('aria-expanded', String(toggle.checked));
  toggle.addEventListener('change', sync);
  button.addEventListener('click', () => {
    original.click(); sync();
    if (toggle.checked && toggleId === '__search') target.querySelector('input')?.focus();
  });
  if (toggleId === '__drawer') document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.checked) {
      toggle.click(); sync(); button.focus();
    }
  });
  // Keep the original label for Material's existing search event subscription.
  original.insertAdjacentElement('beforebegin', button);
  original.style.display = 'none'; sync();
}

// Retain Material's mobile nested-menu layout while making its group toggles keyboard operable.
for (const label of document.querySelectorAll('.md-nav__link[for], .md-nav__title[for]')) {
  const toggle = document.getElementById(label.htmlFor);
  if (!toggle || label.htmlFor === '__drawer') continue;
  label.tabIndex = 0;
  label.setAttribute('role', 'button');
  const sync = () => label.setAttribute('aria-expanded', String(toggle.checked));
  toggle.addEventListener('change', sync);
  label.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); event.stopPropagation(); label.click(); sync();
    }
  });
  sync();
}
