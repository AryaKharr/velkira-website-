import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { contact, navigation, questions, services, whatsappUrl } from '../app/content.mjs';
import { canAutoplay } from '../app/video-policy.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

test('Contact links encode each service and preserve the business number', () => {
  for (const service of ['', ...services.map(item => item.name), 'Website seperti SunDays', 'R&D / Aplikasi + AI']) {
    const link = new URL(whatsappUrl(service));
    assert.equal(link.origin, 'https://wa.me');
    assert.equal(link.pathname, '/' + contact.whatsapp);
    assert.ok(link.searchParams.get('text').includes(service || 'kebutuhan proyek'));
    assert.equal([...link.searchParams].length, 1);
  }
});

test('Autoplay respects motion, data-saving and tab visibility preferences', () => {
  assert.equal(canAutoplay({}), true);
  for (const options of [{ reducedMotion: true }, { saveData: true }, { hidden: true }, { reducedMotion: true, saveData: true, hidden: true }]) {
    assert.equal(canAutoplay(options), false);
  }
});

test('Service, FAQ and navigation content has stable, distinct entries', () => {
  assert.equal(services.length, 3);
  assert.equal(new Set(services.map(item => item.name)).size, services.length);
  assert.ok(questions.some(([question]) => question.includes('SunDays')));
  assert.equal(new Set(navigation.map(([, href]) => href)).size, navigation.length);
});

test('The static export includes the agency, Next assets, working anchors and SunDays', async () => {
  const html = await readFile(path.join(root, 'out/index.html'), 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/data-project="sundays"/g) || []).length, 1);
  assert.ok(html.includes('/_next/'));
  assert.ok(/hero-spark/.test(html));
  assert.ok(/floating-card/.test(html));
  assert.ok(/blue-waves/.test(html));
  assert.ok(/Company Profile/.test(html));
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), id);
  for (const [, reference] of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) {
    if (reference === '/') continue;
    const local = path.join(root, 'out', reference);
    const target = reference.endsWith('/') ? path.join(local, 'index.html') : local;
    assert.ok((await stat(target)).isFile(), reference);
  }
  const demo = await readFile(path.join(root, 'out/demos/sunsdays/index.html'), 'utf8');
  assert.ok(demo.includes('href="../../#portofolio"'));
  assert.ok(demo.includes('Foto konsep dibuat dengan AI'));
  assert.equal((demo.match(/class="menu-card"/g) || []).length, 9);
  assert.ok((await stat(path.join(root, 'out/demos/sunsdays/assets/hero-v1.webm'))).size > 0);
});

test('The exported site serves SunDays and rejects paths outside the build', async () => {
  const server = spawn(process.execPath, ['scripts/preview.mjs'], { cwd: root, env: { ...process.env, PORT: '0' }, stdio: ['ignore', 'pipe', 'pipe'] });
  try {
    const url = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Preview server did not start')), 10000);
      server.stdout.on('data', chunk => {
        const match = String(chunk).match(/http:\/\/127\.0\.0\.1:\d+/);
        if (match) { clearTimeout(timeout); resolve(match[0]); }
      });
      server.once('error', error => { clearTimeout(timeout); reject(error); });
      server.once('exit', code => { clearTimeout(timeout); reject(new Error(`Preview exited ${code}`)); });
    });
    const agency = await fetch(url);
    assert.equal(agency.status, 200);
    assert.match(await agency.text(), /Ide besarmu/);
    const demo = await fetch(url + '/demos/sunsdays/index.html');
    assert.equal(demo.status, 200);
    assert.match(await demo.text(), /SunDays/);
    assert.equal((await fetch(url + '/missing.html')).status, 404);
    assert.equal((await fetch(url + '/..%2fREADME.md')).status, 403);
  } finally { server.kill(); }
});
