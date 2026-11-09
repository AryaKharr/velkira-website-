import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { initialState, noteError, scenarios, statusFor, ticketsFor, workflowReducer as reduce } from '../app/demos/luma-support/workflow.mjs';

test('FAQ completes without tickets; all scenarios have distinct customer and workflow data', () => {
  assert.equal(new Set(scenarios.map(item => item.id)).size, 3);
  for (const item of scenarios) assert.equal(item.steps.length, 4);
  const state = reduce(initialState(), { type: 'finish' });
  assert.equal(statusFor(scenarios[0], state.records.shipping).label, 'Selesai');
  assert.equal(ticketsFor(state).length, 0);
});

test('Tickets appear only at recording, escalation needs admin, resolution and repeated actions are idempotent', () => {
  for (const id of ['late', 'damage']) {
    let state = reduce(initialState(), { type: 'select', id });
    state = reduce(state, { type: 'start' });
    assert.equal(reduce(state, { type: 'start' }), state);
    state = reduce(state, { type: 'tick', run: state.run });
    assert.equal(ticketsFor(state).length, 0);
    state = reduce(state, { type: 'tick', run: state.run });
    assert.equal(ticketsFor(state).length, 1);
    assert.equal(reduce(state, { type: 'resolve' }), state);
    state = reduce(state, { type: 'tick', run: state.run });
    const scenario = scenarios.find(item => item.id === id);
    assert.equal(statusFor(scenario, state.records[id]).label, id === 'damage' ? 'Perlu admin' : 'Menunggu');
    assert.equal(reduce(state, { type: 'resolve' }), state);
    state = reduce(state, { type: 'assign' });
    assert.equal(statusFor(scenario, state.records[id]).label, 'Ditangani');
    state = reduce(state, { type: 'note', value: 'Contoh: admin memeriksa kendala dan mencatat tindak lanjut.' });
    state = reduce(state, { type: 'resolve' });
    state = reduce(state, { type: 'resolve' });
    assert.equal(ticketsFor(state).length, 1);
    assert.equal(statusFor(scenario, state.records[id]).label, 'Selesai');
  }
});

test('Switch, reset and restart invalidate delayed ticks and never leak progress to another scenario', () => {
  let state = reduce(initialState(), { type: 'start' });
  const oldRun = state.run;
  state = reduce(state, { type: 'select', id: 'damage' });
  state = reduce(state, { type: 'tick', run: oldRun });
  assert.equal(state.records.damage.step, 0);
  state = reduce(state, { type: 'start' });
  const nextRun = state.run;
  state = reduce(state, { type: 'reset' });
  state = reduce(state, { type: 'start' });
  assert.equal(reduce(state, { type: 'tick', run: nextRun }), state);
  state = reduce(state, { type: 'select', id: 'damage' });
  state = reduce(state, { type: 'finish' });
  state = reduce(state, { type: 'restart' });
  assert.equal(ticketsFor(state).length, 0);
  assert.equal(state.records.damage.step, 0);
  assert.equal(reduce(state, { type: 'select', id: 'untrusted' }), state);
  assert.equal(reduce(state, { type: 'select', id: 'toString' }), state);
  assert.equal(reduce(state, { type: 'view', view: 'unknown' }), state);
});

test('Assignment and follow-up are required before closure; invalid notes, duplicate closure and FAQ assignment are rejected', () => {
  let state = initialState();
  assert.equal(reduce(reduce(state, { type: 'finish' }), { type: 'assign' }).records.shipping.assigned, false);
  state = reduce(state, { type: 'select', id: 'late' });
  assert.equal(reduce(state, { type: 'assign' }), state);
  state = reduce(state, { type: 'finish' });
  assert.equal(reduce(state, { type: 'note', value: 'Catatan tanpa penanggung jawab.' }), state);
  state = reduce(state, { type: 'assign' });
  assert.equal(reduce(state, { type: 'assign' }), state);
  assert.equal(reduce(state, { type: 'resolve' }), state);
  for (const value of ['', '    ', 'abcd', 'a'.repeat(281), null, 123]) {
    assert.ok(noteError(value));
    assert.equal(reduce(state, { type: 'note', value }), state);
  }
  assert.equal(noteError('a'.repeat(280)), '');
  state = reduce(state, { type: 'note', value: '  Admin meninjau status pengiriman dalam simulasi.  ' });
  assert.equal(state.records.late.followUp, 'Admin meninjau status pengiriman dalam simulasi.');
  const saved = state.records.late.followUp;
  state = reduce(state, { type: 'view', view: 'tickets' });
  assert.equal(state.records.late.followUp, saved);
  state = reduce(state, { type: 'select', id: 'damage' });
  assert.equal(state.records.damage.followUp, '');
  state = reduce(state, { type: 'select', id: 'late' });
  state = reduce(state, { type: 'resolve' });
  assert.equal(reduce(state, { type: 'resolve' }), state);
  assert.equal(reduce(state, { type: 'note', value: 'Mengubah tiket yang sudah selesai.' }), state);
  state = reduce(state, { type: 'restart' });
  assert.equal(state.records.late.assigned, false);
  assert.equal(state.records.late.followUp, '');
});

test('Every workflow can be skipped to its final outcome, and counts survive navigation', () => {
  let state = initialState();
  for (const item of scenarios) {
    state = reduce(state, { type: 'select', id: item.id });
    state = reduce(state, { type: 'finish' });
  }
  assert.equal(ticketsFor(state).length, 2);
  state = reduce(state, { type: 'view', view: 'tickets' });
  assert.equal(ticketsFor(state).length, 2);
  state = reduce(state, { type: 'reset' });
  assert.equal(ticketsFor(state).length, 0);
  assert.equal(state.running, false);
});

test('Static export contains the accessible demo, portfolio link, preview and explicit simulation limits', async () => {
  const html = await readFile(new URL('../out/demos/luma-support/index.html', import.meta.url), 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  for (const text of ['Luma Store', 'Jalankan simulasi', 'Data fiktif', 'Workflow aktif', 'Tanpa AI aktif', 'href="/#portofolio"', '<noscript>']) assert.ok(html.includes(text), text);
  const agency = await readFile(new URL('../out/index.html', import.meta.url), 'utf8');
  assert.ok(agency.includes('href="/demos/luma-support/"'));
  assert.match(agency, /class="atelier-project"[^>]*>[\s\S]*?Luma Support/);
  assert.ok((await readFile(new URL('../out/assets/concepts/luma-support.svg', import.meta.url), 'utf8')).includes('luma.'));
});
