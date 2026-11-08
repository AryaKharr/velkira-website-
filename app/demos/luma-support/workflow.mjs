export const scenarios = [
  {
    id: 'shipping', name: 'Alya Putri', initials: 'AP', color: 'violet',
    title: 'Informasi pengiriman', label: 'Tanya pengiriman', category: 'FAQ pengiriman', order: 'LM-2401', time: '09.12',
    message: 'Halo! Biasanya pengiriman pesanan membutuhkan waktu berapa lama, ya?',
    reply: 'Hai Alya! Dalam contoh kebijakan Luma Store, pengiriman reguler membutuhkan 2–4 hari kerja setelah pesanan diproses. Ini jawaban FAQ simulasi, bukan estimasi pengiriman nyata.',
    summary: 'Pertanyaan estimasi pengiriman dijawab menggunakan FAQ yang telah disiapkan.',
    steps: ['Pesan diterima', 'Kenali pertanyaan', 'Jawab dari FAQ', 'Percakapan selesai'],
    note: 'Pertanyaan umum cukup dijawab dari informasi yang sudah disetujui. Tidak perlu membuat tiket.',
  },
  {
    id: 'late', name: 'Bima Aditya', initials: 'BA', color: 'blue',
    title: 'Pesanan belum sampai', label: 'Pesanan terlambat', category: 'Kendala pengiriman', order: 'LM-2402', time: '09.18',
    message: 'Pesanan LM-2402 belum sampai, padahal sudah melewati estimasi. Bisa dibantu cek?',
    reply: 'Hai Bima, kendala pesanan LM-2402 sudah dicatat dalam tiket demo LM-002. Pada alur layanan nyata, tim akan memeriksa pengiriman dan memberikan tindak lanjut.',
    summary: 'Pesanan melewati estimasi. Perlu pemeriksaan status pengiriman oleh tim layanan.',
    ticket: 'LM-002', priority: 'Normal',
    steps: ['Pesan diterima', 'Kenali kendala', 'Catat tiket', 'Menunggu tindak lanjut'],
    note: 'Permintaan yang membutuhkan pemeriksaan dicatat agar tidak terlewat saat pergantian petugas.',
  },
  {
    id: 'damage', name: 'Citra Maharani', initials: 'CM', color: 'rose',
    title: 'Barang diterima rusak', label: 'Barang rusak', category: 'Keluhan produk', order: 'LM-2403', time: '09.24',
    message: 'Paket LM-2403 sudah diterima, tetapi barangnya rusak. Bagaimana proses penanganannya?',
    reply: 'Hai Citra, keluhan pesanan LM-2403 sudah dirangkum dalam tiket demo LM-003 dan masuk antrean admin. Keputusan penggantian atau pengembalian dana tetap perlu ditinjau petugas.',
    summary: 'Pelanggan melaporkan barang rusak. Admin perlu meninjau keluhan dan menentukan penanganan.',
    ticket: 'LM-003', priority: 'Tinggi',
    steps: ['Pesan diterima', 'Kenali keluhan', 'Buat tiket prioritas', 'Eskalasi ke admin'],
    note: 'Kasus khusus diteruskan ke manusia. Asisten tidak menjanjikan refund atau penggantian otomatis.',
  },
];

export const initialState = () => ({
  view: 'inbox', selected: 'shipping', mobileDetail: false, running: false, run: 0,
  records: Object.fromEntries(scenarios.map(item => [item.id, emptyRecord()])),
});

const emptyRecord = () => ({ step: 0, resolved: false, assigned: false, followUp: '' });

export function noteError(value) {
  if (typeof value !== 'string' || value.trim().length < 5) return 'Tulis catatan tindak lanjut minimal 5 karakter.';
  if (value.trim().length > 280) return 'Catatan maksimal 280 karakter.';
  return '';
}

export function workflowReducer(state, action) {
  const record = state.records[state.selected];
  switch (action.type) {
    case 'view':
      return ['overview', 'inbox', 'tickets'].includes(action.view)
        ? { ...state, view: action.view, mobileDetail: false, running: false, run: state.run + 1 } : state;
    case 'select':
      return Object.hasOwn(state.records, action.id) ? { ...state, selected: action.id, view: 'inbox', mobileDetail: true, running: false, run: state.run + 1 } : state;
    case 'back': return { ...state, mobileDetail: false, running: false, run: state.run + 1 };
    case 'start':
      return record.step < 3 && !state.running ? { ...state, running: true, run: state.run + 1 } : state;
    case 'tick':
      if (!state.running || action.run !== state.run) return state;
      return { ...state, running: record.step + 1 < 3, records: { ...state.records, [state.selected]: { ...record, step: Math.min(3, record.step + 1) } } };
    case 'finish':
      return { ...state, running: false, run: state.run + 1, records: { ...state.records, [state.selected]: { ...record, step: 3 } } };
    case 'assign':
      if (!scenarios.find(item => item.id === state.selected)?.ticket || record.step < 3) return state;
      if (record.assigned || record.resolved) return state;
      return { ...state, records: { ...state.records, [state.selected]: { ...record, assigned: true } } };
    case 'note':
      if (!record.assigned || record.resolved || noteError(action.value)) return state;
      return { ...state, records: { ...state.records, [state.selected]: { ...record, followUp: action.value.trim() } } };
    case 'resolve':
      if (!record.assigned || record.resolved || noteError(record.followUp)) return state;
      return { ...state, records: { ...state.records, [state.selected]: { ...record, resolved: true } } };
    case 'restart':
      return { ...state, running: false, run: state.run + 1, records: { ...state.records, [state.selected]: emptyRecord() } };
    case 'reset': return { ...initialState(), run: state.run + 1 };
    default: return state;
  }
}

export function statusFor(scenario, record) {
  if (record.resolved || (scenario.id === 'shipping' && record.step === 3)) return { label: 'Selesai', tone: 'green' };
  if (record.assigned) return { label: 'Ditangani', tone: 'blue' };
  if (record.step === 3) return { label: scenario.id === 'damage' ? 'Perlu admin' : 'Menunggu', tone: scenario.id === 'damage' ? 'red' : 'amber' };
  if (record.step > 0) return { label: 'Diproses', tone: 'blue' };
  return { label: 'Baru', tone: 'gray' };
}

export function ticketsFor(state) {
  return scenarios.filter(item => item.ticket && state.records[item.id].step >= 2);
}
