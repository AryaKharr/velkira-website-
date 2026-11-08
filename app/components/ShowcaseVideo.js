'use client';

import { useEffect, useRef, useState } from 'react';
import { canAutoplay } from '../video-policy.mjs';

export default function ShowcaseVideo() {
  const video = useRef(null);
  const requested = useRef(false);
  const inView = useRef(true);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const playback = useRef(null);

  useEffect(() => {
    setEnhanced(true);
    const element = video.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timeout;
    let disposed = false;
    element.muted = true;

    function stop() { clearTimeout(timeout); element.pause(); }
    async function play() {
      if (!element.src) { element.src = '/demos/sunsdays/assets/hero-v1.webm'; }
      clearTimeout(timeout);
      timeout = setTimeout(() => { requested.current = false; stop(); setReady(false); }, 8000);
      try { await element.play(); }
      catch { if (!disposed) { clearTimeout(timeout); requested.current = false; setPlaying(false); } }
    }
    playback.current = { play, stop };
    function updateVisibility() {
      if (document.hidden || !inView.current || preference.matches) stop();
      else if (requested.current) play();
    }
    function preferenceChanged() {
      if (preference.matches) { requested.current = false; stop(); }
    }
    function playingStarted() { clearTimeout(timeout); setReady(true); setPlaying(true); }
    function paused() { setPlaying(false); }
    function error() { clearTimeout(timeout); requested.current = false; element.pause(); setFailed(true); setReady(false); }
    element.addEventListener('playing', playingStarted);
    element.addEventListener('pause', paused);
    element.addEventListener('error', error);
    document.addEventListener('visibilitychange', updateVisibility);
    preference.addEventListener('change', preferenceChanged);
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => { inView.current = entry.isIntersecting; updateVisibility(); }, { threshold: 0.1 }) : null;
    observer?.observe(element);
    requested.current = canAutoplay({ reducedMotion: preference.matches, saveData: navigator.connection?.saveData, hidden: document.hidden });
    if (requested.current) play();

    return () => {
      disposed = true;
      clearTimeout(timeout);
      observer?.disconnect();
      element.removeEventListener('playing', playingStarted);
      element.removeEventListener('pause', paused);
      element.removeEventListener('error', error);
      document.removeEventListener('visibilitychange', updateVisibility);
      preference.removeEventListener('change', preferenceChanged);
      element.pause();
      element.removeAttribute('src');
      element.load();
      playback.current = null;
    };
  }, []);

  function toggle() {
    if (!video.current.paused) { requested.current = false; playback.current?.stop(); }
    else { requested.current = true; playback.current?.play(); }
  }

  return <div className="showcase-video">
    <img className="showcase-poster" src="/demos/sunsdays/assets/hero-v1.jpg" width="1536" height="1024" fetchPriority="high" alt="Kopi dengan susu di atas meja cafe, visual konsep SunDays" />
    <video ref={video} className={ready ? 'has-frame' : ''} muted loop playsInline preload="none" poster="/demos/sunsdays/assets/hero-v1.jpg" aria-hidden="true" tabIndex={-1} />
    <div className="showcase-wordmark" aria-hidden="true">SunDays</div>
    <p className="showcase-caption">Proyek konsep / Coffee shop</p>
    {enhanced && !failed && <button className="video-toggle" type="button" aria-label={playing ? 'Jeda video SunDays' : 'Putar video SunDays'} onClick={toggle}>{playing ? 'Jeda' : 'Putar'}<span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span></button>}
  </div>;
}
