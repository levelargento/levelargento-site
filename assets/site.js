const menu = document.querySelector('.menu-button');
const links = document.querySelector('.nav-links');
if (menu && links) {
  document.body.classList.add('has-navigation-js');
  links.id = links.id || 'main-navigation';
  menu.setAttribute('aria-controls', links.id);
  const setOpen = (open) => {
    links.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  menu.addEventListener('click', () => setOpen(!links.classList.contains('open')));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && links.classList.contains('open')) {
      setOpen(false);
      menu.focus();
    }
  });
  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  window.matchMedia('(max-width: 880px)').addEventListener('change', () => setOpen(false));
}
const main = document.querySelector('main');
if (main && !document.querySelector('.skip-link')) {
  main.id = main.id || 'main-content';
  main.setAttribute('tabindex', '-1');
  const skip = document.createElement('a');
  skip.className = 'skip-link';
  skip.href = '#' + main.id;
  skip.textContent = 'Skip to content';
  document.body.prepend(skip);
}
const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
