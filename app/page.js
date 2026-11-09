'use client';
import { useState } from 'react';
import './home.css';

const projects = [
  {
    name: 'LabaRapi',
    kind: 'Eksplorasi studio',
    tag: 'Aplikasi finansial',
    image: '/assets/atelier/labarapi-dashboard.png',
    description: 'Rancangan aplikasi untuk membaca penjualan, biaya, dan margin dalam satu alur kerja.',
    href: '#kontak',
    action: 'Bahas aplikasi serupa',
  },
  {
    name: 'Luma Support',
    kind: 'Demo interaktif',
    tag: 'Alur layanan pelanggan',
    image: '/assets/atelier/luma-support.png',
    description: 'Simulasi triase pesan pelanggan, pencatatan tiket, dan eskalasi ke pengelola.',
    href: '/demos/luma-support/',
    action: 'Coba demo',
  },
  {
    name: 'SunDays',
    kind: 'Demo interaktif',
    tag: 'Website hospitality',
    image: '/assets/atelier/sunsdays-hero.jpg',
    description: 'Website kafe dengan suasana editorial dan menu interaktif yang nyaman di ponsel.',
    href: '/demos/sunsdays/',
    action: 'Buka website',
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState('Website & landing page');
  const [stage, setStage] = useState('Versi awal');
  const message = `Halo Velkira, saya ingin membahas proyek.\nKebutuhan: ${service}\nTahap: ${stage}\nMohon bantu tentukan lingkup, waktu, dan estimasi biayanya.`;
  const whatsapp = `https://wa.me/6285704834416?text=${encodeURIComponent(message)}`;
  const links = [['Layanan', '#layanan'], ['Karya', '#portofolio'], ['Estimasi', '#estimasi'], ['Tentang', '#tentang'], ['Kontak', '#kontak']];

  return (
    <div className="atelier" id="awal">
      <a className="atelier-skip" href="#utama">Lewati ke konten</a>

      {/* HEADER */}
      <header className="atelier-header">
        <div className="atelier-wrap atelier-nav">
          <a className="atelier-brand" href="#awal">
            <img src="/assets/atelier/logo-emblem.png" width="40" height="40" alt="" />
            <span>VELKIRA<small>DIGITAL ATELIER &amp; LAB</small></span>
          </a>
          <nav className="atelier-links" aria-label="Navigasi utama">
            {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <a className="atelier-button atelier-nav-cta" href="#kontak">Bahas proyek ↗</a>
          <button
            className="atelier-menu-button"
            type="button"
            aria-label="Buka menu"
            aria-expanded={menuOpen}
            aria-controls="atelier-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
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
            <p className="atelier-eyebrow">✦ VELKIRA STUDIO · IDEAS MOVE FORWARD</p>
            <h1>
              Karya digital berkarakter.<br />
              <em>Dirancang presisi,</em><br />
              dibangun untuk bekerja.
            </h1>
            <p className="atelier-lead">
              Kami merancang website, alur otomatisasi, dan aplikasi bisnis yang jelas kegunaannya serta nyaman dipakai.
            </p>
            <div className="atelier-actions">
              <a className="atelier-button" href="#kontak">Mulai diskusi proyek ↗</a>
              <a className="atelier-button atelier-button-outline" href="#portofolio">Lihat karya ↓</a>
            </div>
            <p className="atelier-hero-note">
              Dari konsep hingga rilis, lingkup dan hasil kerja dibahas langsung dengan studio.
            </p>
          </div>

          {/* SHOWCASE TABS */}
          <div className="atelier-showcase">
            <div className="atelier-showcase-top">
              <span aria-hidden="true">● ● ●</span>
              <span>STUDIO LAB / PREVIEW</span>
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
                <img src={project.image} width="1200" height="720" alt={`Pratinjau ${project.name}`} />
                <div className="atelier-panel-copy">
                  <span>{project.kind} · {project.tag}</span>
                  <strong>{project.name}</strong>
                  <p>{project.description}</p>
                  <a href={project.href}>{project.action} ↗</a>
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
                Teknologi yang tepat.<br />
                <em>Untuk pekerjaan nyata.</em>
              </h2>
              <p>Kami mulai dari kebutuhan bisnis, lalu memilih bentuk produk yang paling masuk akal.</p>
            </div>
            <div className="atelier-service-grid">
              <article>
                <span>01</span>
                <h3>Website &amp; landing page</h3>
                <p>Halaman bisnis dengan pesan yang jelas, tampilan khas brand, dan jalur kontak yang mudah ditemukan.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Otomatisasi alur kerja</h3>
                <p>Alur untuk memilah permintaan, mengurangi pekerjaan berulang, dan meneruskan kasus yang membutuhkan manusia.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Aplikasi web</h3>
                <p>Dashboard dan alat kerja yang mengikuti proses operasional, dari prototipe hingga rilis bertahap.</p>
              </article>
            </div>
          </div>
        </section>

        {/* 02 / PORTOFOLIO */}
        <section className="atelier-section atelier-wrap" id="portofolio">
          <p className="atelier-kicker">02 / KARYA TERPILIH</p>
          <div className="atelier-heading">
            <h2>
              Bukti kerja yang<br />
              <em>bisa kamu jelajahi.</em>
            </h2>
            <p>Eksplorasi studio dan demo fungsional yang memperlihatkan cara kami merancang pengalaman digital.</p>
          </div>
          <div className="atelier-project-grid">
            {projects.map(project => (
              <article className="atelier-project" key={project.name}>
                <img src={project.image} width="1200" height="720" loading="lazy" alt={`Pratinjau ${project.name}`} />
                <div>
                  <span className="atelier-project-kind">{project.kind}</span>
                  <span className="atelier-project-tag">{project.tag}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <a href={project.href}>{project.action} ↗</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 03 / ESTIMASI */}
        <section className="atelier-section atelier-estimate" id="estimasi">
          <div className="atelier-wrap atelier-estimate-grid">
            <div>
              <p className="atelier-kicker">03 / MULAI DARI SINI</p>
              <h2>
                Gambarkan proyekmu.<br />
                <em>Kita tentukan lingkupnya.</em>
              </h2>
              <p>
                Pilih kebutuhan dan tahap pengerjaan. Ringkasannya bisa kamu kirim lewat WhatsApp;
                estimasi biaya dan waktu diberikan setelah kebutuhan dibahas.
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
              <p className="atelier-estimate-summary">{service} · {stage}</p>
              <a className="atelier-button" href={whatsapp} target="_blank" rel="noopener noreferrer">
                Kirim ringkasan ke WhatsApp ↗
              </a>
            </div>
          </div>
        </section>

        {/* 04 / TENTANG */}
        <section className="atelier-section atelier-wrap atelier-about" id="tentang">
          <div>
            <p className="atelier-kicker">04 / TENTANG STUDIO</p>
            <h2>
              Ruang untuk ide yang<br />
              <em>perlu diwujudkan.</em>
            </h2>
            <p>
              Velkira menggabungkan arah visual dan rekayasa produk dalam satu proses kerja.
              Kami menjelaskan keputusan desain, menyepakati lingkup, lalu menguji hasilnya sebelum rilis.
            </p>
          </div>
          <div className="atelier-about-card">
            <img src="/assets/atelier/logo-emblem.png" width="64" height="64" alt="Monogram Velkira" />
            <strong>VELKIRA</strong>
            <span>Ideas move forward.</span>
            <p>Diskusikan kebutuhan, jadwal, dan bentuk kerja sama yang sesuai untuk proyekmu.</p>
          </div>
        </section>

        {/* 05 / KONTAK */}
        <section className="atelier-section atelier-contact" id="kontak">
          <div className="atelier-wrap">
            <p className="atelier-kicker">05 / KONTAK</p>
            <h2>
              Punya ide?<br />
              <em>Mari buat langkah pertama.</em>
            </h2>
            <p>Ceritakan usaha dan hasil yang ingin dicapai. Kami bantu memperjelas lingkupnya.</p>
            <a
              className="atelier-button atelier-button-light"
              href="https://wa.me/6285704834416?text=Halo%20Velkira%2C%20saya%20ingin%20membahas%20proyek%20digital."
              target="_blank"
              rel="noopener noreferrer"
            >
              Hubungi lewat WhatsApp ↗
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="atelier-footer">
        <div className="atelier-wrap">
          <span>VELKIRA · DIGITAL ATELIER &amp; LAB</span>
          <span>© 2026 Velkira</span>
        </div>
      </footer>
    </div>
  );
}
