(() => {
  'use strict';
  const video = document.querySelector('.hero-video');
  const button = document.querySelector('.video-toggle');
  const source = window.VELKIRA?.heroVideo;
  if (!source || !video || !button) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  video.muted = true;
  video.src = source;
  button.hidden = false;
  function update() {
    button.innerHTML = video.paused ? 'Putar video <span aria-hidden="true">↗</span>' : 'Jeda video <span aria-hidden="true">Ⅱ</span>';
  }
  async function play() {
    try { await video.play(); } catch { update(); }
  }
  video.addEventListener('playing', () => { video.hidden = false; update(); });
  video.addEventListener('pause', update);
  video.addEventListener('error', () => {
    video.hidden = true;
    button.hidden = true;
  });
  button.addEventListener('click', () => video.paused ? play() : video.pause());
  motion.addEventListener('change', () => { if (motion.matches) video.pause(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
  if (!motion.matches && !navigator.connection?.saveData) play();
})();
