import Script from 'next/script';

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Lewati ke konten</a>
      
      <header>
        <div className="nav wrap">
          <a className="brand" href="#awal" aria-label="Velkira, kembali ke awal">
            <img src="assets/brand/mark.svg" width="34" height="34" alt="" />
            <span>VELKIRA<small>DIGITAL STUDIO</small></span>
          </a>
          
          <button className="menu-toggle" hidden aria-expanded="false" aria-controls="navlinks">
            Menu <span>☰</span>
          </button>
          
          <nav id="navlinks" aria-label="Navigasi utama">
            <a href="#layanan">Layanan</a>
            <a href="#portofolio">Portofolio</a>
            <a href="#tentang">Tentang</a>
            <a href="#cara-kerja">Cara Kerja</a>
            <a href="#faq">FAQ</a>
          </nav>
          
          <a className="button small header-cta" href="#kontak">
            Mulai Diskusi <span>↗</span>
          </a>
        </div>
      </header>

      <main id="main">
        {/* HERO SECTION */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid wrap">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">
                <span className="dot"></span> DIGITAL STUDIO &amp; BESPOKE ENGINEERING
              </p>
              
              <h1 id="hero-title">
                Ide besarmu.<br />
                <span className="hero-gradient">Eksekusi tanpa kompromi.</span>
              </h1>
              
              <p className="lead">
                Kami merancang website berkarakter kuat, sistem otomatisasi cerdas, dan produk digital berkecepatan tinggi yang dibangun khusus untuk mempercepat pertumbuhan bisnismu.
              </p>
              
              <div className="actions">
                <a className="button" href="#kontak">
                  Konsultasi Proyek <span>↗</span>
                </a>
                <a className="text-link" href="#portofolio">
                  Jelajahi Portofolio <span>↓</span>
                </a>
              </div>
              
              <div className="hero-note">
                <span className="note-line"></span>
                <p>
                  Built for performance and conversion.<br />
                  <strong>Zero bloat, instant load, bespoke craftsmanship.</strong>
                </p>
              </div>
            </div>

            <div className="hero-media">
              <div className="video-stage">
                <img 
                  className="video-poster" 
                  src="assets/video/blue-waves.jpg" 
                  width="1280" 
                  height="720" 
                  fetchPriority="high" 
                  alt="" 
                  aria-hidden="true" 
                />
                <video 
                  className="hero-video" 
                  hidden 
                  muted 
                  loop 
                  playsInline 
                  preload="none" 
                  poster="assets/video/blue-waves.jpg" 
                  aria-label="Animasi video showreel studio Velkira"
                ></video>
                
                <div className="stage-top">
                  <span><i></i> VELKIRA IN MOTION</span>
                  <span>STUDIO SHOWCASE</span>
                </div>
                
                <div className="motion-word" aria-hidden="true">
                  Crafting<br />
                  <span>what's next.</span>
                  <svg viewBox="0 0 100 100" fill="none">
                    <path d="M20 80 80 20M20 20h60v60" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                <div className="stage-bottom">
                  <span>VELKIRA DIGITAL 2026</span>
                  <button className="video-toggle" type="button" hidden>
                    Putar video <span aria-hidden="true">▶</span>
                  </button>
                </div>
              </div>

              <div className="floating-card">
                <span className="floating-icon" aria-hidden="true">&#10003;</span>
                <div>
                  <strong>Next.js 16 Production Ready</strong>
                  <span>Lighthouse 100/100 · Mobile-first perfection</span>
                </div>
                <span className="card-spark" aria-hidden="true">&#10035;</span>
              </div>

              <svg className="hero-spark" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                <path d="M50 0 C50 28 28 50 0 50 C28 50 50 72 50 100 C50 72 72 50 100 50 C72 50 50 28 50 0 Z" fill="currentColor" opacity="0.85"/>
              </svg>
            </div>
          </div>

          <div className="hero-bottom wrap">
            <span>CREATIVE DIRECTION &amp; TECHNICAL EXCELLENCE</span>
            <a href="#layanan">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        {/* MARQUEE TRACK */}
        <div className="discipline" aria-label="Keahlian dan layanan Velkira">
          <div className="discipline-track" aria-hidden="true">
            <span>VELKIRA CORE DISCIPLINES</span>
            <span>Bespoke Web Development</span><i>✦</i>
            <span>High-Conversion Landing Pages</span><i>✦</i>
            <span>AI &amp; Workflow Automation</span><i>✦</i>
            <span>Interactive Web Experiences</span><i>✦</i>
            <span>Brand Design Systems</span><i>✦</i>
            <span>Next.js Production Ready</span><i>✦</i>
          </div>
          <div className="discipline-track" aria-hidden="true">
            <span>VELKIRA CORE DISCIPLINES</span>
            <span>Bespoke Web Development</span><i>✦</i>
            <span>High-Conversion Landing Pages</span><i>✦</i>
            <span>AI &amp; Workflow Automation</span><i>✦</i>
            <span>Interactive Web Experiences</span><i>✦</i>
            <span>Brand Design Systems</span><i>✦</i>
            <span>Next.js Production Ready</span><i>✦</i>
          </div>
        </div>

        {/* 01 / LAYANAN */}
        <section id="layanan" className="section wrap">
          <p className="eyebrow">01 / Layanan Unggulan</p>
          <div className="section-heading">
            <h2>
              Solusi digital.<br />
              <span>Standar industri tertinggi.</span>
            </h2>
            <p>
              Kami tidak menggunakan template siap pakai pasaran. Setiap baris kode dan elemen antarmuka dirancang presisi untuk kebutuhan bisnis Anda.
            </p>
          </div>

          <div className="services">
            <article className="service">
              <span className="number">01</span>
              <h3>Website Development <span className="service-label">Layanan Utama</span></h3>
              <div>
                <p>Landing page, company profile, dan situs bisnis interaktif dengan performa sub-detik, tipografi tajam, dan kenyamanan visual maksimal di perangkat ponsel maupun desktop.</p>
                <small>Next.js 16 · Responsif · SEO &amp; Kecepatan 100 · Integrasi Kontak</small>
              </div>
              <a className="context-link" href="#kontak" data-context="Website Development">
                Konsultasikan kebutuhan ini <span>↗</span>
              </a>
            </article>

            <article className="service">
              <span className="number">02</span>
              <h3>AI Automation</h3>
              <div>
                <p>Otomatisasi pemilahan pesan masuk, penanganan FAQ pintar, sinkronisasi formulir ke database/CRM, serta eskalasi otomatis ke tim pengelola saat dibutuhkan.</p>
                <small>WhatsApp API · Smart Triage · Integrasi Data · Notifikasi Otomatis</small>
              </div>
              <a className="context-link" href="#kontak" data-context="AI Automation">
                Konsultasikan kebutuhan ini <span>↗</span>
              </a>
            </article>

            <article className="service">
              <span className="number">03</span>
              <h3>Web/Mobile Solutions</h3>
              <div>
                <p>Dashboard operasional internal, portal manajemen pesanan, prototipe produk interaktif, hingga aplikasi web berfitur lengkap yang siap diuji pengguna nyata.</p>
                <small>Arsitektur Data · Dashboard Interaktif · Desain UI/UX · API Ready</small>
              </div>
              <a className="context-link" href="#kontak" data-context="Web/Mobile Solutions">
                Konsultasikan kebutuhan ini <span>↗</span>
              </a>
            </article>
          </div>

          <p className="cost">Biaya disesuaikan secara transparan berdasarkan lingkup dan kompleksitas fitur.</p>
          <p className="fine">Pengaturan domain, hosting serverless gratis, dan pemeliharaan berkala tercantum detail dalam proposal kerja.</p>
        </section>

        {/* 02 / PORTOFOLIO */}
        <section id="portofolio" className="portfolio section">
          <div className="wrap">
            <p className="eyebrow">02 / Showcase Karya</p>
            <div className="section-heading">
              <h2>
                Karya nyata.<br />
                <span>Eksplorasi tanpa batas.</span>
              </h2>
              <p>
                Jelajahi karya interaktif kami: website kafe SunDays, simulasi CRM otomatis Luma Support, hingga sistem akuntansi modern LabaRapi.
              </p>
            </div>

            <div className="projects">
              {/* Flagship: SunDays */}
              <article className="project sundays-project featured" data-project="sundays">
                <a className="project-visual sundays-visual" href="/demos/sunsdays/" aria-label="Lihat website coffee shop SunDays">
                  <div className="sundays-browser">
                    <div className="sundays-chrome" aria-hidden="true">
                      <span className="sundays-dots"><i></i><i></i><i></i></span>
                      <span>sundays.velkira.site — Specialty Coffee &amp; Slow Living</span>
                      <span>↗</span>
                    </div>
                    <div className="sundays-screen">
                      <img 
                        src="demos/sunsdays/assets/hero-v1.jpg" 
                        width="1536" 
                        height="1024" 
                        loading="lazy" 
                        alt="Visual kopi hangat dari website konsep coffee shop SunDays" 
                      />
                      <div className="sundays-preview-copy" aria-hidden="true">
                        <span className="sundays-wordmark">SunDays <span>✳</span></span>
                        <span className="sundays-preview-title">Kopi nikmat.<br /><em>Ritme sendiri.</em></span>
                        <span className="sundays-preview-cta">Eksplorasi Menu &amp; Ambience ↗</span>
                      </div>
                    </div>
                  </div>
                </a>
                
                <div className="project-info">
                  <div>
                    <span className="badge">Interactive Live Demo</span>
                    <p className="project-category">F&amp;B / Specialty Coffee Experience</p>
                    <h3>SunDays Coffee</h3>
                    <p>
                      Membawa kehangatan suasana cafe fisik ke dalam pengalaman digital yang memikat. Dilengkapi hero video dinamis, penyaring menu interaktif (Coffee, Non-Coffee, Bites), dan tata letak editorial yang nyaman di setiap layar.
                    </p>
                    <ul className="project-scope" aria-label="Fitur website SunDays">
                      <li>Hero Video Ambient</li>
                      <li>Filter Menu Dinamis</li>
                      <li>Mobile Responsive</li>
                      <li>Fluid Typography</li>
                    </ul>
                  </div>
                  <a href="/demos/sunsdays/" className="detail-link">
                    Buka Live Demo <span>↗</span>
                  </a>
                </div>
              </article>

              {/* Luma Support */}
              <article className="project" data-project="luma">
                <a className="project-visual" href="/demos/luma-support/" aria-label="Coba demo Workflow Assistant Luma Support">
                  <img 
                    src="/assets/concepts/luma-support.svg" 
                    width="1200" 
                    height="800" 
                    loading="lazy" 
                    alt="Dashboard Luma Support dengan inbox pelanggan, tiket, dan alur otomatisasi." 
                  />
                </a>
                <div className="project-info">
                  <div>
                    <span className="badge">Interactive Web App</span>
                    <p className="project-category">Customer Care / Automation CRM</p>
                    <h3>Workflow Assistant</h3>
                    <p>
                      Simulasi dashboard triase pelanggan toko online: memilah keluhan secara otomatis, mencatat tiket eskalasi ke tim admin, dan melacak resolusi secara real-time.
                    </p>
                    <ul className="project-scope" aria-label="Fitur demo Luma Support">
                      <li>Smart Triage</li>
                      <li>Pencatatan Tiket</li>
                      <li>Eskalasi Admin</li>
                    </ul>
                  </div>
                  <a href="/demos/luma-support/" className="detail-link">
                    Coba Demo <span>↗</span>
                  </a>
                </div>
              </article>

              {/* LabaRapi */}
              <article className="project labarapi-project" data-project="labarapi">
                <a className="project-visual labarapi-visual" href="#detail-labarapi" data-open="detail-labarapi" aria-label="Lihat detail aplikasi LabaRapi">
                  <img 
                    src="/assets/concepts/labarapi-dashboard.png" 
                    width="1440" 
                    height="1739" 
                    loading="lazy" 
                    alt="Dashboard LabaRapi dengan laporan laba rugi dan ringkasan arus kas." 
                  />
                </a>
                <div className="project-info">
                  <div>
                    <span className="badge">Fintech SaaS Concept</span>
                    <p className="project-category">Finansial / Dashboard Operasional</p>
                    <h3>LabaRapi</h3>
                    <p>
                      Platform pencatatan keuangan dan kalkulasi margin laba bersih bagi pemilik bisnis UMKM. Menghilangkan kompleksitas rumus spreadsheet manual.
                    </p>
                    <ul className="project-scope" aria-label="Fitur konsep LabaRapi">
                      <li>Kalkulasi Otomatis</li>
                      <li>Visualisasi Metrik</li>
                      <li>Ekspor Laporan</li>
                    </ul>
                  </div>
                  <a href="#detail-labarapi" className="detail-link" data-open="detail-labarapi">
                    Lihat Detail <span>↗</span>
                  </a>
                </div>
              </article>

              {/* Company Profile */}
              <article className="project">
                <a className="project-visual" href="#detail-company" data-open="detail-company" aria-label="Lihat detail konsep Company Profile">
                  <img 
                    src="assets/concepts/company.svg" 
                    width="1000" 
                    height="650" 
                    loading="lazy" 
                    alt="Website usaha jasa dengan perkenalan, layanan, dan jalur kontak." 
                  />
                </a>
                <div className="project-info">
                  <div>
                    <span className="badge">Corporate Identity</span>
                    <p className="project-category">Corporate Website / B2B</p>
                    <h3>Company Profile</h3>
                    <p>
                      Membangun reputasi dan kredibilitas institusional dengan arsitektur informasi yang terstruktur rapi, narasi value bisnis yang kuat, dan konversi ke kontak langsung.
                    </p>
                    <ul className="project-scope" aria-label="Lingkup konsep Company Profile">
                      <li>Brand Storytelling</li>
                      <li>Hierarki Layanan</li>
                      <li>High Conversion</li>
                    </ul>
                  </div>
                  <a href="#detail-company" className="detail-link" data-open="detail-company">
                    Lihat Detail <span>↗</span>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 03 / TENTANG */}
        <section id="tentang" className="about section wrap">
          <div>
            <p className="eyebrow">03 / Tentang Velkira</p>
            <h2>
              Desain terarah.<br />
              <em>Teknologi yang andal.</em>
            </h2>
            <p className="lead">
              Velkira lahir untuk menjembatani kesenjangan antara estetika visual modern dan performa teknis tingkat tinggi. Kami fokus pada hasil nyata: website yang cepat, mudah digunakan, dan benar-benar berdampak bagi pertumbuhan bisnis Anda.
            </p>
            
            <div className="principles">
              <p>
                <b>01 / Pahami Kebutuhan</b>
                Mendalami karakter brand dan audiens target sebelum merancang solusi.
              </p>
              <p>
                <b>02 / Lingkup Transparan</b>
                Estimasi biaya, jadwal, dan deliverables disepakati jelas sejak awal.
              </p>
              <p>
                <b>03 / Kualitas Teruji</b>
                Setiap karya melalui uji performa, responsivitas, dan aksesibilitas ketat.
              </p>
            </div>
          </div>

          <aside className="brand-card">
            <span className="eyebrow">STUDIO IDENTITY</span>
            <img src="assets/brand/mark.svg" width="96" height="96" alt="Monogram Velkira" />
            <strong>VELKIRA</strong>
            <span className="tagline">IDEAS MOVE FORWARD</span>
            <div>
              <p>Kemitraan Jangka Panjang</p>
              <p>Setiap proyek kami dampingi dari tahap penentuan konsep hingga peluncuran di domain Anda.</p>
              <a href="#kontak">Diskusikan ide Anda bersama kami ↗</a>
            </div>
          </aside>
        </section>

        {/* 04 / CARA KERJA */}
        <section id="cara-kerja" className="process section">
          <div className="wrap">
            <p className="eyebrow">04 / Metodologi Kerja</p>
            <h2>
              Langkah terstruktur.<br />
              <span>Eksekusi tepat waktu.</span>
            </h2>
            
            <div className="steps">
              <article>
                <span>01</span>
                <h3>Konsultasi &amp; Konsep</h3>
                <p>Diskusi mendalam mengenai visi usaha, target audiens, dan fitur-fitur kunci yang ingin diwujudkan.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Perancangan &amp; Scope</h3>
                <p>Menentukan hierarki informasi, arsitektur teknis, dan timeline transparan sebelum implementasi.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Desain &amp; Koding</h3>
                <p>Pengembangan menggunakan framework Next.js modern dengan animasi halus dan performa optimal.</p>
              </article>
              <article>
                <span>04</span>
                <h3>Uji &amp; Go-Live</h3>
                <p>Pengujian lintas perangkat, penyiapan domain dan SSL, serta serah terima akses penuh ke Anda.</p>
              </article>
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section className="deliverables section wrap" aria-labelledby="deliverables-title">
          <div>
            <p className="eyebrow">Standar Serah Terima</p>
            <h2 id="deliverables-title">
              Jelas apa yang dibuat.<br />
              Pasti apa yang Anda terima.
            </h2>
            <p>
              Kami mengutamakan transparansi tanpa biaya tersembunyi. Seluruh deliverables berikut diserahkan lengkap di akhir proyek.
            </p>
            <a className="text-link" href="#kontak">Bicarakan lingkup proyek Anda <span>↗</span></a>
          </div>

          <dl className="handover-list">
            <div>
              <dt><span>01</span> Source Code Bersih</dt>
              <dd>Kode Next.js yang terstruktur rapi, terdokumentasi, dan 100% milik Anda sepenuhnya.</dd>
            </div>
            <div>
              <dt><span>02</span> Performa &amp; SEO</dt>
              <dd>Optimasi skor Lighthouse 95+, meta tag sosial media (Open Graph), dan sitemap.</dd>
            </div>
            <div>
              <dt><span>03</span> Domain &amp; SSL</dt>
              <dd>Konfigurasi nameserver domain Anda dan penerbitan sertifikat SSL (HTTPS) gratis selamanya.</dd>
            </div>
            <div>
              <dt><span>04</span> Panduan Operasional</dt>
              <dd>Dokumentasi cara memperbarui teks, mengganti foto, dan melakukan deployment ulang kapan saja.</dd>
            </div>
          </dl>
        </section>

        {/* 05 / FAQ */}
        <section id="faq" className="faq section wrap">
          <div>
            <p className="eyebrow">05 / Tanya Jawab</p>
            <h2>
              Pertanyaan yang<br />
              sering diajukan.
            </h2>
            <p>Penjelasan transparan seputar alur kerja, biaya, dan teknologi kami.</p>
          </div>

          <div>
            <details>
              <summary>Apa saja jenis website yang bisa dibuat?<span aria-hidden="true">+</span></summary>
              <p>Kami melayani pembuatan landing page berkonversi tinggi, company profile institusional, portofolio interaktif, katalog digital, hingga portal aplikasi web kustom.</p>
            </details>
            <details>
              <summary>Berapa lama estimasi pengerjaannya?<span aria-hidden="true">+</span></summary>
              <p>Umumnya berkisar antara 5 hingga 14 hari kerja tergantung jumlah halaman, kesiapan aset konten, serta kompleksitas fungsionalitas yang disepakati.</p>
            </details>
            <details>
              <summary>Apakah saya perlu membayar biaya server bulanan mahal?<span aria-hidden="true">+</span></summary>
              <p>Tidak! Dengan arsitektur Next.js Static Export yang kami gunakan, website Anda dapat dihosting di infrastruktur global Vercel atau Cloudflare secara 100% gratis tanpa biaya bulanan.</p>
            </details>
            <details>
              <summary>Apakah domain dan SSL sudah termasuk?<span aria-hidden="true">+</span></summary>
              <p>Domain utama (seperti .com atau .site) dimiliki oleh Anda sendiri. Kami akan bantu setting penuh DNS, nameserver, serta pemasangan enkripsi SSL (HTTPS) gratis hingga website live sempurna.</p>
            </details>
            <details>
              <summary>Bagaimana jika nanti ada revisi atau pembaruan?<span aria-hidden="true">+</span></summary>
              <p>Setiap paket dilengkapi garansi revisi minor pasca-peluncuran dan panduan mudah sehingga Anda atau tim dapat memperbarui konten kapan saja.</p>
            </details>
            <details>
              <summary>Apakah contoh karya di atas adalah proyek klien nyata?<span aria-hidden="true">+</span></summary>
              <p>SunDays dan Luma Support adalah proyek konsep internal Velkira untuk memperlihatkan standar desain dan interaktivitas teknis terbaik kami kepada calon klien.</p>
            </details>
          </div>
        </section>

        {/* 06 / KONTAK */}
        <section id="kontak" className="contact">
          <div className="wrap">
            <p className="eyebrow">06 / Mulai Kolaborasi</p>
            <h2>
              Punya ide besar?<br />
              <em>Mari kita wujudkan.</em>
            </h2>
            <p>
              Ceritakan visi proyek Anda, preferensi gaya, dan target waktu peluncuran. Kami akan bantu merumuskan solusi dan estimasi yang paling efisien.
            </p>

            <div className="brief-guide">
              <p className="brief-title">Hal yang membantu diskusi awal kita:</p>
              <ul>
                <li>Jenis usaha &amp; tujuan website</li>
                <li>Fitur utama yang dibutuhkan</li>
                <li>Referensi visual yang disukai</li>
                <li>Target waktu peluncuran</li>
              </ul>
              <p>Belum ada materi lengkap? Tenang, kita bisa diskusikan konsepnya bersama dari awal.</p>
            </div>

            <div className="context-control">
              <label htmlFor="service-choice">Pilih Fokus Kebutuhan Anda</label>
              <select id="service-choice">
                <option value="">Kebutuhan proyek secara umum</option>
                <option>Website Development</option>
                <option>AI Automation</option>
                <option>Web/Mobile Solutions</option>
                <option>Company Profile</option>
                <option>Workflow Assistant</option>
                <option>LabaRapi</option>
              </select>
            </div>

            <div className="actions">
              <a 
                id="whatsapp" 
                className="button gold" 
                href="https://wa.me/6285704834416?text=Halo%20Velkira%2C%20saya%20ingin%20membahas%20kebutuhan%20proyek%20untuk%20bisnis%20saya." 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Hubungi via WhatsApp Bisnis <span>↗</span>
              </a>
              <a id="email" className="text-link" hidden>Kirim Email ↗</a>
            </div>
            
            <p className="contact-note" id="contact-status">
              +62 857 0483 4416 · Rata-rata respons cepat &lt; 2 jam pada jam kerja.
            </p>
          </div>
        </section>

        {/* CONCEPT MODALS SOURCE */}
        <section className="concept-details wrap" aria-label="Detail konsep">
          <article id="detail-company" className="concept-detail">
            <button className="close-detail" hidden aria-label="Tutup detail konsep">Tutup ×</button>
            <span className="badge">Konsep Internal</span>
            <h2>Company Profile</h2>
            <img src="assets/concepts/company.svg" width="1000" height="650" loading="lazy" alt="Website usaha jasa dengan perkenalan, layanan, dan jalur kontak." />
            <h3>Kebutuhan</h3>
            <p>Website kredibilitas institusional dengan perkenalan layanan, portofolio kerja, dan tombol aksi kontak langsung.</p>
            <a className="button" href="#kontak" data-context="Company Profile">Bahas Kebutuhan Serupa ↗</a>
          </article>

          <article id="detail-workflow" className="concept-detail">
            <button className="close-detail" hidden aria-label="Tutup detail konsep">Tutup ×</button>
            <span className="badge">Konsep Internal</span>
            <h2>Workflow Assistant</h2>
            <img src="assets/concepts/workflow.svg" width="1000" height="650" loading="lazy" alt="Alur untuk memilah pertanyaan berulang dan permintaan khusus." />
            <h3>Kebutuhan</h3>
            <p>Otomatisasi triase pesan masuk, FAQ terverifikasi, dan eskalasi otomatis ke tim support.</p>
            <a className="button" href="#kontak" data-context="Workflow Assistant">Bahas Kebutuhan Serupa ↗</a>
          </article>

          <article id="detail-labarapi" className="concept-detail">
            <button className="close-detail" hidden aria-label="Tutup detail konsep">Tutup ×</button>
            <span className="badge">Konsep Internal</span>
            <h2>LabaRapi</h2>
            <img src="/assets/concepts/labarapi-dashboard.png" width="1440" height="1739" loading="lazy" alt="Dashboard LabaRapi dengan laporan laba rugi dan ringkasan arus kas." />
            <h3>Kebutuhan</h3>
            <p>Aplikasi web akuntansi dan profit tracker UMKM tanpa rumus spreadsheet rumit.</p>
            <a className="button" href="#kontak" data-context="LabaRapi">Bahas Kebutuhan Serupa ↗</a>
          </article>
        </section>
      </main>

      <div className="footer-signature wrap" aria-hidden="true">
        VELKIRA<span>✦</span>
      </div>

      <footer className="wrap">
        <a className="brand" href="#awal" aria-label="Velkira, kembali ke awal">
          <img src="assets/brand/mark.svg" width="34" height="34" alt="" />
          <span>VELKIRA<small>DIGITAL STUDIO</small></span>
        </a>
        <p>
          Ideas Move Forward.
          <small>© <span id="year">2026</span> Velkira Digital Studio. All rights reserved.</small>
        </p>
        <a href="#awal">Kembali ke atas ↑</a>
      </footer>

      <Script src="/legacy.js" strategy="afterInteractive" />
    </>
  );
}
