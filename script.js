const menuStyles = document.createElement('link');
menuStyles.rel = 'stylesheet';
menuStyles.href = '/menu.css';
document.head.append(menuStyles);

const originalStyles = document.createElement('link');
originalStyles.rel = 'stylesheet';
originalStyles.href = '/original.css';
document.head.append(originalStyles);

const fidelityStyles = document.createElement('link');
fidelityStyles.rel = 'stylesheet';
fidelityStyles.href = '/fidelity.css';
document.head.append(fidelityStyles);

const header = document.querySelector('.floating-header');
const updateHeader = () => header?.classList.toggle('is-sticky', window.scrollY > 36);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  });
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
}
