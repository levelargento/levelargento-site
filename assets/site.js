const menu = document.querySelector('.menu-button');
const links = document.querySelector('.nav-links');
if (menu && links) {
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
}
const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
