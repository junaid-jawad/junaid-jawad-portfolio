// Progressive enhancement: all portfolio content and links work without JavaScript.
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');

function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menu?.removeAttribute('data-open');
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menu.toggleAttribute('data-open', !isOpen);
});
menu?.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

const sections = document.querySelectorAll('main > section[id]');
if ('IntersectionObserver' in window && sections.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  sections.forEach(section => sectionObserver.observe(section));
}

document.querySelector('.print-button')?.addEventListener('click', () => window.print());

// Gentle entrance motion, with reduced-motion preferences respected.
if ('IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('.project-card, .skill-card, .training-panel, .experience-row')
    .forEach(element => revealObserver.observe(element));
}
