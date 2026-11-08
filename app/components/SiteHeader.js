'use client';

import { useEffect, useRef, useState } from 'react';
import { navigation } from '../content.mjs';

export function Brand() {
  return <a className="brand" href="#awal" aria-label="Velkira, kembali ke awal"><img src="/assets/brand/mark.svg" width="34" height="34" alt="" /><span>velkira<span className="brand-period">.</span></span></a>;
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const button = useRef(null);

  useEffect(() => { setEnhanced(true); }, []);
  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event) {
      if (event.key === 'Escape') { setOpen(false); button.current?.focus(); }
    }
    function closeOnWideScreen() { if (window.innerWidth > 760) setOpen(false); }
    document.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnWideScreen);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnWideScreen);
    };
  }, [open]);

  return <header className={`site-header${enhanced ? ' enhanced' : ''}`}>
    <div className="nav wrap">
      <Brand />
      <button ref={button} className="menu-toggle" type="button" hidden={!enhanced} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? 'Tutup' : 'Menu'}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
      <nav id="navigation" className={open ? 'open' : ''} aria-label="Navigasi utama" onClick={event => { if (event.target.closest('a')) setOpen(false); }}>
        {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <a className="header-contact" href="#kontak">Bahas proyek <span aria-hidden="true">↗</span></a>
    </div>
  </header>;
}
