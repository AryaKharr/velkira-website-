(() => {
  'use strict';
  if (!window.matchMedia || !window.IntersectionObserver || !Element.prototype.animate) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches) return;
  const running = new Set();
  function enter(element, delay = 0) {
    if (preference.matches) return;
    const animation = element.animate([
      { opacity: 0, transform: 'translateY(22px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 650, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    running.add(animation);
    animation.onfinish = animation.oncancel = () => running.delete(animation);
  }
  function finishMotion() {
    for (const animation of running) animation.finish();
    running.clear();
  }
  document.querySelectorAll('.hero-copy > *').forEach((element, index) => enter(element, index * 75));
  enter(document.querySelector('.hero-art'), 180);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      enter(entry.target);
    });
  }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
  // Content stays visible if animation support or JavaScript is unavailable.
  document.querySelectorAll('.section-heading, .service, .project, .about > div, .brand-card, .steps article, .deliverables > div, .handover-list > div, .faq > div:first-child, .contact h2, .footer-signature').forEach(element => observer.observe(element));
  document.addEventListener('focusin', finishMotion);
  preference.addEventListener('change', () => {
    if (preference.matches) { observer.disconnect(); finishMotion(); }
  });
})();
