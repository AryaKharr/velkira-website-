'use client';

import { useEffect, useReducer, useRef, useState } from 'react';
import { initialState, noteError, scenarios, statusFor, ticketsFor, workflowReducer } from './workflow.mjs';
import s from './dashboard.module.css';

function Icon({ name, size = 20 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    inbox: <><path d="M4 4h16l2 12v4H2v-4L4 4Z" /><path d="M2 15h6l2 3h4l2-3h6" /></>,
    ticket: <><path d="M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V6Z" /><path d="M15 6v3m0 2v2m0 2v3" /></>,
    arrow: <><path d="M5 12h14m-5-5 5 5-5 5" /></>,
    reset: <><path d="M3 10a9 9 0 1 1 2 8M3 4v6h6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />,
    chat: <path d="M21 11a9 9 0 0 1-9 9H4l-3 2 2-7a9 9 0 1 1 18-4Z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    hand: <><path d="M8 12V6a2 2 0 0 1 4 0v5-7a2 2 0 0 1 4 0v7-4a2 2 0 0 1 4 0v8c0 5-3 7-7 7-3 0-5-2-6-4l-4-5a2 2 0 0 1 3-3l2 2Z" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.chat}</svg>;
}

function Badge({ scenario, record }) {
  const status = statusFor(scenario, record);
  return <span className={`${s.badge} ${s[status.tone]}`}><i />{status.label}</span>;
}

function Avatar({ scenario, small = false }) {
  return <span className={`${s.avatar} ${s[scenario.color]} ${small ? s.smallAvatar : ''}`} aria-hidden="true">{scenario.initials}</span>;
}

function TicketHandling({ record, dispatch }) {
  const [value, setValue] = useState(record.followUp);
  const [error, setError] = useState('');
  const saved = Boolean(record.followUp) && value.trim() === record.followUp;

  if (!record.assigned) return <div className={s.handling}><strong>Langkah berikutnya: ambil tiket.</strong><p>Tiket sudah tercatat. Sekarang coba peran admin untuk menanganinya.</p><button className={s.primaryButton} onClick={() => dispatch({ type: 'assign' })}><Icon name="hand" size={16} /> Ambil tiket</button></div>;
  if (record.resolved) return <div className={s.handling}><strong className={s.resolvedText}>✓ Penanganan selesai</strong><p>Catatan Admin Demo tersimpan dalam sesi ini. Tidak ada balasan yang dikirim ke pelanggan.</p></div>;

  function saveNote(event) {
    event.preventDefault();
    const message = noteError(value);
    setError(message);
    if (!message) dispatch({ type: 'note', value });
  }

  return <div className={s.handling}><div className={s.handlingTitle}><strong>Penanganan oleh Admin Demo</strong><span className={`${s.badge} ${s.blue}`}>Ditangani</span></div><p>Catat langkah yang akan dilakukan, lalu selesaikan tiket. Gunakan catatan contoh.</p>
    <form onSubmit={saveNote} noValidate>
      <label htmlFor="follow-up">Catatan tindak lanjut</label>
      <textarea id="follow-up" name="followUp" rows={3} maxLength={280} value={value} aria-invalid={Boolean(error)} aria-describedby={`follow-up-help${error ? ' follow-up-error' : ''}`} onChange={event => { setValue(event.target.value); setError(''); }} placeholder="Contoh: Periksa status pengiriman dan siapkan pembaruan untuk pelanggan." />
      <div className={s.noteMeta}><span id="follow-up-help">5–280 karakter · hanya disimpan dalam sesi demo</span><span>{value.length}/280</span></div>
      {error && <p className={s.formError} id="follow-up-error" role="alert">{error}</p>}
      {saved && <p className={s.savedNote} role="status">✓ Catatan tersimpan dalam sesi demo.</p>}
      <div className={s.actionButtons}><button type="submit" className={s.secondaryButton} disabled={saved}>Simpan catatan</button><button type="button" className={s.primaryButton} disabled={!saved} onClick={() => dispatch({ type: 'resolve' })}><Icon name="check" size={16} /> Tandai selesai</button></div>
    </form>
  </div>;
}

export default function Dashboard() {
  const [state, dispatch] = useReducer(workflowReducer, undefined, initialState);
  const detailHeading = useRef(null);
  const scenario = scenarios.find(item => item.id === state.selected);
  const record = state.records[state.selected];
  const tickets = ticketsFor(state);
  const completed = scenarios.filter(item => statusFor(item, state.records[item.id]).label === 'Selesai').length;
  const pending = tickets.filter(item => !state.records[item.id].resolved).length;
  const needsAdmin = tickets.filter(item => item.id === 'damage' && state.records[item.id].step === 3 && !state.records[item.id].assigned).length;

  useEffect(() => {
    if (!state.running) return;
    const timer = setTimeout(() => dispatch({ type: 'tick', run: state.run }), 1000);
    return () => clearTimeout(timer);
  }, [state.running, state.run, record.step]);

  useEffect(() => {
    if (state.mobileDetail) detailHeading.current?.focus({ preventScroll: true });
  }, [state.mobileDetail, state.selected]);

  function startSimulation() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) dispatch({ type: 'finish' });
    else dispatch({ type: 'start' });
  }

  const views = [['overview', 'Ringkasan', 'grid'], ['inbox', 'Inbox', 'inbox'], ['tickets', 'Tiket', 'ticket']];
  const title = { overview: 'Semua terkendali.', inbox: 'Percakapan yang berarti.', tickets: 'Tak ada yang terlewat.' }[state.view];

  return <div className={s.app}>
    <a className={s.skip} href="#luma-main">Lewati ke dashboard</a>
    <aside className={s.sidebar} aria-label="Workspace Luma Support">
      <a className={s.brand} href="/demos/luma-support/" aria-label="Luma Support, kembali ke awal"><span className={s.logo}><Icon name="bolt" size={23} /></span><span>luma<span className={s.brandDot}>.</span><small>SUPPORT WORKSPACE</small></span></a>
      <div className={s.workspace}><span className={s.storeIcon}>L</span><div><strong>Luma Store</strong><small>Workspace contoh</small></div><span className={s.workspaceDot} /></div>
      <p className={s.navLabel}>WORKSPACE</p>
      <nav className={s.nav} aria-label="Navigasi dashboard">
        {views.map(([id, label, icon]) => <button key={id} className={state.view === id ? s.navActive : ''} aria-current={state.view === id ? 'page' : undefined} onClick={() => dispatch({ type: 'view', view: id })}><Icon name={icon} /><span>{label}</span>{id !== 'overview' && <b>{id === 'inbox' ? scenarios.length : pending}</b>}</button>)}
      </nav>
      <div className={s.sidebarBottom}>
        <div className={s.demoCard}><span><i /> DEMO INTERAKTIF</span><p>Alur nyata.<br />Data simulasi.</p><small>Tanpa AI aktif atau pesan yang dikirim ke pelanggan.</small></div>
        <a className={s.backLink} href="/#portofolio">↖ <span>Portfolio VELKIRA</span></a>
        <div className={s.profile}><span>V</span><div><strong>VELKIRA Studio</strong><small>Concept & development</small></div></div>
      </div>
    </aside>

    <div className={s.mainColumn}>
      <div className={s.topbar}><div><span className={s.breadcrumb}>Workspace <span>/</span></span> {views.find(([id]) => id === state.view)[1]}</div><span className={s.topbarRight}><span className={s.liveDot} /> Sandbox mode <span className={s.userDot}>V</span></span></div>
      <main id="luma-main" className={s.main}>
        <div className={s.headingRow}><div><p className={s.eyebrow}>LESS REPETITION. MORE CONNECTION.</p><h1>{title}</h1><p className={s.intro}>Layanan pelanggan toko online: pertanyaan terjawab, keluhan tercatat.</p></div><button className={s.secondaryButton} onClick={() => dispatch({ type: 'reset' })}><Icon name="reset" size={16} /> Ulangi demo</button></div>

        <div className={s.demoGuide}><strong>Mulai dari sini</strong><span>1. Pilih percakapan</span><span>2. Jalankan alurnya</span><span>3. Tindak lanjuti tiket</span><small>Demo untuk berbagai jenis toko online · bukan pencatatan penjualan atau stok</small></div><div className={s.stats} aria-label="Ringkasan data simulasi">
          {[['Percakapan contoh', scenarios.length, '3 skenario untuk dijelajahi', 'chat', 'blue'], ['Tiket terbuka', pending, 'Tercatat dari simulasi', 'ticket', 'violet'], ['Perlu admin', needsAdmin, 'Kasus yang butuh manusia', 'hand', 'amber'], ['Selesai', completed, 'Percakapan atau tiket selesai', 'check', 'green']].map(([label, value, note, icon, color]) => <div className={s.stat} key={label}><div><span>{label}</span><span className={`${s.statIcon} ${s[color]}`}><Icon name={icon} size={18} /></span></div><strong>{String(value).padStart(2, '0')}</strong><small>{note}</small></div>)}
        </div>

        {state.view === 'overview' && <section className={s.overview} aria-labelledby="overview-title"><div className={s.overviewHero}><span className={s.overviewMark}><Icon name="bolt" size={32} /></span><p className={s.eyebrow}>YOUR SUPPORT, CONNECTED.</p><h2 id="overview-title">Satu pesan.<br />Langkah berikutnya jelas.</h2><p>Coba bagaimana pertanyaan sederhana dijawab, kendala dicatat, dan keluhan diteruskan ke orang yang tepat.</p><button className={s.primaryButton} onClick={() => dispatch({ type: 'select', id: 'shipping' })}>Mulai dari inbox <Icon name="arrow" size={17} /></button></div><div className={s.scenarioOverview}><h2>Tiga cara membantu.</h2>{scenarios.map((item, i) => <button key={item.id} onClick={() => dispatch({ type: 'select', id: item.id })}><span className={s.scenarioNumber}>0{i + 1}</span><span><strong>{item.label}</strong><small>{item.category} · {item.ticket ? 'Pencatatan tiket' : 'Jawaban otomatis'}</small></span><Icon name="arrow" size={18} /></button>)}</div></section>}

        {state.view === 'tickets' && <section className={s.ticketSection} aria-labelledby="tickets-title"><div className={s.panelHeading}><div><h2 id="tickets-title">Daftar tiket</h2><p>Setiap kendala punya tempat untuk ditindaklanjuti.</p></div><span className={`${s.badge} ${s.blue}`}>{tickets.length} tiket demo</span></div>{tickets.length === 0 ? <div className={s.emptyState}><span><Icon name="ticket" size={32} /></span><h3>Belum ada tiket. Semua dimulai dari inbox.</h3><p>Jalankan skenario pesanan terlambat atau barang rusak untuk melihat tiket dibuat secara otomatis.</p><button className={s.primaryButton} onClick={() => dispatch({ type: 'select', id: 'late' })}>Coba buat tiket <Icon name="arrow" size={17} /></button></div> : <div className={s.ticketTable}><table><thead><tr><th>Tiket / pelanggan</th><th>Kategori</th><th>Prioritas</th><th>Penanggung jawab</th><th>Status</th><th><span className={s.srOnly}>Tindakan</span></th></tr></thead><tbody>{tickets.map(item => <tr key={item.id}><td><strong>#{item.ticket}</strong><small>{item.name}</small><small>Pesanan #{item.order}</small></td><td>{item.category}</td><td><span className={`${s.badge} ${item.priority === 'Tinggi' ? s.red : s.gray}`}>{item.priority}</span></td><td>{state.records[item.id].assigned ? 'Admin Demo' : 'Belum diambil'}</td><td><Badge scenario={item} record={state.records[item.id]} /></td><td><button className={s.textButton} onClick={() => dispatch({ type: 'select', id: item.id })}>Buka tiket ↗</button></td></tr>)}</tbody></table></div>}</section>}

        {state.view === 'inbox' && <section className={`${s.inboxGrid} ${state.mobileDetail ? s.detailOpen : ''}`} aria-label="Inbox dan simulasi workflow">
          <div className={s.conversationList}>
            <div className={s.listTitle}><h2>Inbox <span>03</span></h2><Icon name="inbox" size={18} /></div>
            <p className={s.listIntro}>Pilih percakapan untuk mencoba alurnya.</p>
            <div className={s.listFilter}><span>Semua percakapan</span><span>3</span></div>
            {scenarios.map(item => <button key={item.id} className={`${s.conversationItem} ${item.id === state.selected ? s.selected : ''}`} onClick={() => dispatch({ type: 'select', id: item.id })} aria-pressed={item.id === state.selected}><div className={s.conversationTop}><Avatar scenario={item} small /><strong>{item.name}</strong><time>{item.time}</time></div><p>{item.title}</p><small>{item.message}</small><div className={s.conversationBottom}><Badge scenario={item} record={state.records[item.id]} /><span>{item.ticket ? 'Tiket & tindak lanjut' : 'Jawaban FAQ'}</span></div></button>)}
            <div className={s.listNote}><Icon name="bolt" size={17} /><p>Respons terstruktur.<br />Tindak lanjut terarah.</p></div>
          </div>

          <div className={s.chatPanel}>
            <button className={s.mobileBack} onClick={() => dispatch({ type: 'back' })}>← Kembali ke inbox</button>
            <div className={s.chatHeader}><Avatar scenario={scenario} /><div><h2 ref={detailHeading} tabIndex={-1}>{scenario.name}</h2><p>Pesanan #{scenario.order} <span>·</span> Pelanggan contoh</p></div><Badge scenario={scenario} record={record} /></div>
            <div className={s.scenarioStrip}><span><Icon name="bolt" size={15} /> SKENARIO</span><strong>{scenario.label}</strong></div>
            <div className={s.messages}>
              <p className={s.dateDivider}>Hari ini <span>· Percakapan simulasi</span></p>
              <div className={s.messageIncoming}><div className={s.messageAuthor}><Avatar scenario={scenario} small /><span>{scenario.name.split(' ')[0]} <time>{scenario.time}</time></span></div><p>{scenario.message}</p></div>
              {record.step >= 1 && <div className={s.systemEvent}><Icon name="bolt" size={13} /> Kategori dikenali: {scenario.category}</div>}
              {record.step >= 2 && scenario.ticket && <div className={s.systemEvent}><Icon name="ticket" size={13} /> Tiket #{scenario.ticket} dibuat · Prioritas {scenario.priority.toLowerCase()}</div>}
              {record.step >= 2 && <div className={s.messageOutgoing}><div className={s.messageAuthor}><span className={s.botAvatar}><Icon name="bolt" size={13} /></span><span>Luma Assistant <small>SIMULASI</small></span></div><p>{scenario.reply}</p><span className={s.messageMeta}>Respons pratulisan <Icon name="check" size={12} /></span></div>}
              {state.running && <div className={s.processing} role="status"><span className={s.processingDot} /> Menjalankan langkah {Math.min(record.step + 1, 3)} dari 3…</div>}
              {record.step === 3 && <div className={s.systemEvent}><Icon name={record.resolved || !scenario.ticket ? 'check' : 'arrow'} size={14} />{record.resolved ? 'Tiket ditandai selesai dalam demo.' : record.assigned ? 'Admin Demo sedang menangani tiket.' : scenario.id === 'damage' ? 'Masuk antrean admin simulasi.' : scenario.ticket ? 'Siap ditindaklanjuti oleh tim simulasi.' : 'FAQ terjawab. Tidak ada tiket baru.'}</div>}
              {record.step === 0 && <div className={s.startHint}><span><Icon name="bolt" size={24} /></span><h3>Biarkan alurnya bekerja.</h3><p>Jalankan simulasi untuk melihat bagaimana pesan ini ditangani.</p></div>}
            </div>
            <div className={s.chatActions}>{scenario.ticket && record.step === 3 && <TicketHandling key={scenario.id} record={record} dispatch={dispatch} />}
              <div className={s.actionButtons}>{record.step < 3 ? <><button className={s.primaryButton} disabled={state.running} onClick={startSimulation}><Icon name="bolt" size={16} />{state.running ? 'Simulasi berjalan…' : record.step > 0 ? 'Lanjutkan simulasi' : 'Jalankan simulasi'}</button><button className={s.textButton} onClick={() => dispatch({ type: 'finish' })}>Tampilkan hasil langsung ↗</button></> : <><button className={s.secondaryButton} onClick={() => dispatch({ type: 'restart' })}><Icon name="reset" size={15} /> Ulangi skenario</button></>}</div>
              <p><span className={s.lockMark}>◇</span> Data fiktif. Tidak ada pesan dikirim atau data disimpan.</p>
            </div>
          </div>

          <aside className={s.workflowPanel} aria-label="Detail alur otomatisasi">
            <div className={s.workflowTitle}><span className={s.workflowIcon}><Icon name="bolt" size={17} /></span><h2>Workflow aktif</h2><span className={s.miniPill}>DEMO</span></div>
            <p className={s.workflowIntro}>Langkah kecil, respons yang tepat.</p>
            <ol className={s.flowSteps}>{scenario.steps.map((step, i) => <li key={step} className={i <= record.step ? s.stepActive : ''} aria-current={i === record.step ? 'step' : undefined}><span className={s.stepCircle}>{i < record.step ? <Icon name="check" size={13} /> : String(i + 1).padStart(2, '0')}</span><div><strong>{step}</strong><small>{i < record.step ? 'Langkah selesai' : i === record.step ? 'Tahap saat ini' : 'Menunggu tahap sebelumnya'}</small></div></li>)}</ol>
            <div className={s.ticketDetail}><span className={s.detailLabel}>RINGKASAN {scenario.ticket ? 'TIKET' : 'PERCAKAPAN'}</span>{scenario.ticket && record.step < 2 ? <><h3>Belum ada tiket</h3><p>Tiket muncul setelah langkah pencatatan dijalankan.</p></> : <><h3>{scenario.ticket ? `#${scenario.ticket}` : 'Jawaban dari FAQ'}</h3><p>{scenario.summary}</p><dl><div><dt>Pelanggan</dt><dd>{scenario.name}</dd></div><div><dt>Pesanan</dt><dd>#{scenario.order}</dd></div><div><dt>Kategori</dt><dd>{scenario.category}</dd></div>{scenario.ticket && <div><dt>Prioritas</dt><dd className={scenario.priority === 'Tinggi' ? s.priorityHigh : ''}>{scenario.priority}</dd></div>}{scenario.ticket && <div><dt>Penanggung jawab</dt><dd>{record.assigned ? 'Admin Demo' : 'Belum diambil'}</dd></div>}<div><dt>Status</dt><dd><Badge scenario={scenario} record={record} /></dd></div></dl></>}</div>
            {scenario.ticket && record.step >= 2 && <div className={s.ticketHistory}><h3>Riwayat penanganan</h3><ol><li><strong>Tiket dicatat</strong><span>{scenario.summary}</span></li>{record.step === 3 && <li><strong>{scenario.id === 'damage' ? 'Diteruskan ke admin' : 'Menunggu pemeriksaan'}</strong><span>Belum ada tindakan nyata ke pesanan.</span></li>}{record.assigned && <li><strong>Diambil oleh Admin Demo</strong><span>Penanggung jawab tiket sudah ditetapkan.</span></li>}{record.followUp && <li><strong>Catatan tindak lanjut</strong><p>{record.followUp}</p></li>}{record.resolved && <li><strong>Tiket selesai</strong><span>Penanganan ditutup dalam simulasi.</span></li>}</ol></div>}<div className={s.humanNote}><Icon name="hand" size={19} /><div><strong>Manusia tetap memegang kendali.</strong><p>{scenario.note}</p></div></div>
          </aside>
        </section>}

        <div className={s.footer}><span><span className={s.footerLogo}>luma.</span> A little flow. A lot of clarity.</span><a href="/#portofolio">A concept by <strong>VELKIRA ↗</strong></a></div>
        <p className={s.srOnly} role="status" aria-live="polite">{scenario.label}: {statusFor(scenario, record).label}. {record.step === 3 ? 'Simulasi selesai.' : scenario.steps[record.step]}</p>
        <noscript><p className={s.noScript}>Demo ini membutuhkan JavaScript untuk menjalankan simulasi. Seluruh percakapan merupakan contoh, bukan layanan pelanggan aktif. <a href="/#portofolio">Kembali ke portfolio VELKIRA</a>.</p></noscript>
      </main>
    </div>
  </div>;
}
