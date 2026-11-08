const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#main-nav');
if (header && navToggle && nav) {
  header.classList.add('enhanced');
  navToggle.hidden = false;
  const closeNav = () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeNav();
      navToggle.focus();
    }
  });
}

const cards = [...document.querySelectorAll('.menu-card')];
const filters = document.querySelector('.filters');
const result = document.querySelector('.result-count');
if (filters && result) {
  const buttons = [...filters.querySelectorAll('[data-filter]')];
  const allCount = filters.querySelector('[data-filter="all"] span');
  if (allCount) allCount.textContent = String(cards.length).padStart(2, '0');
  result.textContent = cards.length ? `${cards.length} menu untuk dijelajahi` : 'Menu contoh belum tersedia';
  filters.hidden = cards.length === 0;
  buttons.forEach(button => {
    const category = button.dataset.filter;
    button.hidden = category !== 'all' && !cards.some(card => card.dataset.category === category);
    button.addEventListener('click', () => {
      const selected = category === 'all' || cards.some(card => card.dataset.category === category) ? category : 'all';
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.filter === selected)));
      let count = 0;
      cards.forEach(card => {
        card.hidden = selected !== 'all' && card.dataset.category !== selected;
        if (!card.hidden) count++;
      });
      result.textContent = count ? `${count} menu ${selected === 'all' ? 'untuk dijelajahi' : button.textContent.trim()}` : 'Menu contoh belum tersedia';
    });
  });
}
cards.forEach(card => {
  if (card.dataset.available === 'false') {
    const label = document.createElement('span');
    label.className = 'availability';
    label.textContent = 'Belum tersedia';
    card.querySelector('div').append(label);
  }
});

const video = document.querySelector('.hero-video');
const videoToggle = document.querySelector('.video-toggle');
if (video && videoToggle) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const icon = videoToggle.querySelector('.video-icon');
  const label = videoToggle.querySelector('.video-label');
  let userPaused = false;
  let inView = true;
  let failed = false;
  let ready = document.readyState === 'complete';
  let automatic = !motion.matches && !navigator.connection?.saveData;
  let timeout;
  const update = () => {
    const playing = !video.paused && !video.ended;
    label.textContent = playing ? 'Jeda video' : 'Putar video';
    icon.textContent = playing ? 'Ⅱ' : '▶';
    videoToggle.setAttribute('aria-label', playing ? 'Jeda video pembuka' : 'Putar video pembuka');
  };
  const play = async () => {
    if (failed) return;
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      video.pause();
      video.classList.remove('has-frame');
      automatic = false;
      video.removeAttribute('src');
      video.load();
    }, 8000);
    try { await video.play(); } catch { clearTimeout(timeout); automatic = false; update(); }
  };
  videoToggle.hidden = false;
  video.addEventListener('playing', () => { clearTimeout(timeout); video.classList.add('has-frame'); update(); });
  video.addEventListener('pause', update);
  video.addEventListener('error', () => {
    failed = true;
    clearTimeout(timeout);
    video.classList.remove('has-frame');
    videoToggle.hidden = true;
  });
  videoToggle.addEventListener('click', () => {
    if (video.paused) { userPaused = false; void play(); }
    else { userPaused = true; clearTimeout(timeout); video.pause(); }
  });
  const sync = () => {
    if (document.hidden || !inView || motion.matches) { clearTimeout(timeout); video.pause(); }
    else if (ready && automatic && !userPaused && video.paused) void play();
  };
  motion.addEventListener('change', () => { if (motion.matches) automatic = false; sync(); });
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); }, {threshold:0.05}).observe(video);
  }
  const start = () => { ready = true; sync(); };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, {once:true});
}
