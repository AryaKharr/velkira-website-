'use client';
import { useEffect, useRef, useState } from 'react';
import { contact, process, questions } from './content.mjs';
import './home.css';

const projects = [
  {
    name: 'LabaRapi',
    kind: 'Eksplorasi studio',
    tag: 'Aplikasi pengelolaan usaha',
    image: '/assets/atelier/labarapi-dashboard.png',
    alt: 'Tampilan contoh ringkasan penjualan LabaRapi',
    description: 'Konsep aplikasi yang menyatukan penjualan, biaya, dan margin agar pemilik usaha lebih mudah membaca kondisi bisnisnya.',
    href: '#kontak',
    action: 'Bahas kebutuhan aplikasi',
  },
  {
    name: 'Luma Support',
    kind: 'Demo interaktif',
    tag: 'Alur layanan pelanggan',
    image: '/assets/atelier/luma-support.png',
    alt: 'Tampilan demo percakapan pelanggan Luma Support',
    description: 'Demo bagaimana pertanyaan pelanggan dijawab, keluhan dicatat, lalu diteruskan kepada pengelola.',
    href: '/demos/luma-support/',
    action: 'Coba demo Luma',
  },
  {
    name: 'SunDays',
    kind: 'Demo interaktif',
    tag: 'Website kafe',
    image: '/assets/atelier/sunsdays-hero.jpg',
    alt: 'Foto kopi pada konsep website SunDays',
    description: 'Konsep website kafe dengan cerita visual, pilihan menu, dan tampilan yang dirancang untuk ponsel.',
    href: '/demos/sunsdays/',
    action: 'Lihat demo SunDays',
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const [service, setService] = useState('Website & landing page');
  const [stage, setStage] = useState('Versi awal');
  const message = `Halo Velkira, saya ingin membahas proyek.\nKebutuhan: ${service}\nTahap: ${stage}\nMohon bantu tentukan lingkup, waktu, dan perkiraan biayanya.`;
  const whatsapp = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
  const links = [['Layanan', '#layanan'], ['Karya', '#portofolio'], ['Cara kerja', '#cara-kerja'], ['Rencanakan proyek', '#estimasi'], ['Tentang', '#tentang'], ['Kontak', '#kontak']];

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event) {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <div className="atelier" id="awal">
      <a className="atelier-skip" href="#utama">Lewati ke konten</a>

      {/* HEADER */}
      <header className="atelier-header">
        <div className="atelier-wrap atelier-nav">
          <a className="atelier-brand" href="#awal">
            <img src="/assets/brand/mark.svg" width="40" height="40" alt="" />
            <span>VELKIRA<small>DIGITAL CREATIVE &amp; TECHNOLOGY STUDIO</small></span>
          </a>
          <nav className="atelier-links" aria-label="Navigasi utama">
            {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <a className="atelier-button atelier-nav-cta" href="#kontak">Bahas proyek <span aria-hidden="true">↗</span></a>
          <button
            ref={menuButton}
            className="atelier-menu-button"
            type="button"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            aria-controls="atelier-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
        <nav
          id="atelier-mobile-menu"
          className="atelier-mobile-menu"
          hidden={!menuOpen}
          aria-label="Navigasi ponsel"
        >
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      </header>

      {/* MAIN */}
      <main id="utama">

        {/* HERO */}
        <section className="atelier-hero atelier-wrap">
          <div className="atelier-hero-copy">
            <p className="atelier-eyebrow">STUDIO KREATIF &amp; TEKNOLOGI</p>
            <h1>
              Digital yang memudahkan <em>bisnis Anda.</em>
            </h1>
            <p className="atelier-lead">
              Website, otomatisasi alur kerja, dan aplikasi web yang dirancang sesuai kebutuhan usaha Anda.
            </p>
            <div className="atelier-actions">
              <a className="atelier-button" href="#kontak">Bahas proyek <span aria-hidden="true">↗</span></a>
              <a className="atelier-button atelier-button-outline" href="#portofolio">Lihat karya <span aria-hidden="true">↓</span></a>
            </div>
            <p className="atelier-hero-note">
              We turn ideas into digital experiences.
            </p>
          </div>

          {/* SHOWCASE TABS */}
          <div className="atelier-showcase">
            <div className="atelier-showcase-top">
              <span>VELKIRA / KARYA STUDIO</span>
              <span>01 — 03</span>
            </div>
            <div className="atelier-tabs" role="tablist" aria-label="Pilih karya unggulan">
              {projects.map((project, i) => (
                <button
                  key={project.name}
                  role="tab"
                  id={`atelier-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls={`atelier-panel-${i}`}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={event => {
                    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                      event.preventDefault();
                      const next = (i + (event.key === 'ArrowRight' ? 1 : projects.length - 1)) % projects.length;
                      setActive(next);
                      document.getElementById(`atelier-tab-${next}`).focus();
                    }
                  }}
                >
                  {project.name}
                </button>
              ))}
            </div>
            {projects.map((project, i) => (
              <div
                key={project.name}
                role="tabpanel"
                id={`atelier-panel-${i}`}
                aria-labelledby={`atelier-tab-${i}`}
                hidden={active !== i}
              >
                <img src={project.image} width="1200" height="720" alt={project.alt} />
                <div className="atelier-panel-copy">
                  <span>{project.kind} · {project.tag}</span>
                  <strong>{project.name}</strong>
                  <p>{project.description}</p>
                  <a href={project.href}>{project.action} <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 01 / LAYANAN */}
        <section className="atelier-section atelier-services" id="layanan">
          <div className="atelier-wrap">
            <p className="atelier-kicker">01 / LAYANAN</p>
            <div className="atelier-heading">
              <h2>
                Bentuk digital yang tepat.<br />
                <em>Untuk kebutuhan nyata.</em>
              </h2>
              <p>Setiap usaha punya cara kerja sendiri. Kami mulai dari tujuan Anda, lalu merancang solusi yang sesuai.</p>
            </div>
            <div className="atelier-service-grid">
              <article>
                <span>01</span>
                <h3>Website &amp; landing page</h3>
                <p>Jelaskan usaha Anda dengan baik dan bantu calon pelanggan menemukan cara menghubungi Anda.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Otomatisasi alur kerja</h3>
                <p>Catat permintaan masuk, kurangi pekerjaan berulang, dan teruskan hal penting kepada orang yang tepat.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Aplikasi web</h3>
                <p>Satukan informasi dan pekerjaan harian dalam aplikasi yang mengikuti cara kerja tim Anda.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="atelier-section atelier-process" id="cara-kerja">
          <div className="atelier-wrap">
            <p className="atelier-kicker">CARA KERJA</p>
            <div className="atelier-heading">
              <h2>Jelas sejak<br /><em>percakapan pertama.</em></h2>
              <p>Lihat apa yang dibahas dan hasil yang bisa Anda periksa di setiap tahap.</p>
            </div>
            <div className="atelier-process-list">
              {process.map((step, i) => (
                <details key={step.title} open={i === 0}>
                  <summary><span>0{i + 1}</span><strong>{step.title}</strong><span className="atelier-process-icon" aria-hidden="true">＋</span></summary>
                  <p>{step.text}</p>
                  <p className="atelier-process-result">{step.result}</p>
                </details>
              ))}
            </div>
            <p className="atelier-process-note">Lingkup, biaya, jadwal, dan batas dukungan disepakati sebelum pekerjaan dimulai.</p>
          </div>
        </section>

        {/* 02 / PORTOFOLIO */}
        <section className="atelier-section atelier-wrap" id="portofolio">
          <p className="atelier-kicker">02 / KARYA TERPILIH</p>
          <div className="atelier-heading">
            <h2>
              Lihat bagaimana ide<br />
              <em>menjadi pengalaman.</em>
            </h2>
            <p>Eksplorasi studio dan demo interaktif. Semuanya contoh pekerjaan, bukan klaim hasil proyek klien.</p>
          </div>
          <div className="atelier-project-grid">
            {projects.map(project => (
              <article className="atelier-project" key={project.name}>
                <img src={project.image} width="1200" height="720" loading="lazy" alt={project.alt} />
                <div>
                  <span className="atelier-project-kind">{project.kind}</span>
                  <span className="atelier-project-tag">{project.tag}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <a href={project.href}>{project.action} <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 03 / ESTIMASI */}
        <section className="atelier-section atelier-estimate" id="estimasi">
          <div className="atelier-wrap atelier-estimate-grid">
            <div>
              <p className="atelier-kicker">03 / RENCANAKAN PROYEK</p>
              <h2>
                Mulai dari yang<br />
                <em>sudah Anda tahu.</em>
              </h2>
              <p>
                Pilih jenis kebutuhan dan tahap proyek Anda. Kirim ringkasannya lewat WhatsApp;
                perkiraan biaya dan waktu kami bahas setelah lingkup pekerjaan jelas.
              </p>
            </div>
            <div className="atelier-estimate-card">
              <label htmlFor="atelier-service">Jenis kebutuhan</label>
              <select id="atelier-service" value={service} onChange={event => setService(event.target.value)}>
                <option>Website &amp; landing page</option>
                <option>Otomatisasi alur kerja</option>
                <option>Aplikasi web</option>
              </select>
              <label htmlFor="atelier-stage">Tahap pengerjaan</label>
              <select id="atelier-stage" value={stage} onChange={event => setStage(event.target.value)}>
                <option>Versi awal</option>
                <option>Pengembangan lanjutan</option>
                <option>Belum yakin</option>
              </select>
              <p className="atelier-estimate-summary">{service} <span aria-hidden="true">·</span> {stage}</p>
              <p className="atelier-estimate-help">Belum perlu brief lengkap. Ceritakan usaha dan tujuan utama Anda dalam percakapan.</p>
              <a className="atelier-button" href={whatsapp} target="_blank" rel="noopener noreferrer">
                Bahas proyek lewat WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* 04 / TENTANG */}
        <section className="atelier-section atelier-wrap atelier-about" id="tentang">
          <div>
            <p className="atelier-kicker">04 / TENTANG STUDIO</p>
            <h2>
              Satu proses kerja.<br />
              <em>Keputusan yang jelas.</em>
            </h2>
            <p>
              Di Velkira, desain dan pengembangan dibahas bersama sejak awal.
              Anda dapat meninjau lingkup, rancangan, dan hasil pengujian sebelum produk dirilis.
            </p>
          </div>
          <div className="atelier-about-card">
            <img src="/assets/brand/mark.svg" width="64" height="64" alt="" />
            <strong>VELKIRA</strong>
            <span>We turn ideas into digital experiences.</span>
            <p>Digital Creative &amp; Technology Studio</p>
          </div>
        </section>

        <section className="atelier-section atelier-faq atelier-wrap" id="pertanyaan">
          <p className="atelier-kicker">PERTANYAAN UMUM</p>
          <div className="atelier-heading">
            <h2>Sebelum mulai,<br /><em>ketahui hal pentingnya.</em></h2>
            <p>Jawaban ringkas untuk membantu Anda menyiapkan percakapan pertama.</p>
          </div>
          <div className="atelier-process-list">
            {[questions[0], questions[2], questions[3], questions[5]].map(([question, answer]) => (
              <details key={question}>
                <summary><strong>{question}</strong><span className="atelier-process-icon" aria-hidden="true">＋</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 05 / KONTAK */}
        <section className="atelier-section atelier-contact" id="kontak">
          <div className="atelier-wrap">
            <p className="atelier-kicker">05 / KONTAK</p>
            <h2>
              Ada yang ingin<br />
              <em>Anda wujudkan?</em>
            </h2>
            <p>Ceritakan usaha dan tujuan Anda. Kami bantu menentukan langkah digital yang masuk akal.</p>
            <a
              className="atelier-button atelier-button-light"
              href={`https://wa.me/${contact.whatsapp}?text=Halo%20Velkira%2C%20saya%20ingin%20membahas%20proyek%20digital.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Bahas proyek lewat WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="atelier-footer">
        <div className="atelier-wrap">
          <div><strong>VELKIRA</strong><span>Digital Creative &amp; Technology Studio</span></div>
          <a href="#awal">Kembali ke atas <span aria-hidden="true">↑</span></a>
          <span>© 2026 Velkira</span>
        </div>
      </footer>
    </div>
  );
}
