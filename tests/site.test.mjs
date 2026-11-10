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

test('The static export includes the atelier landing page, working anchors and SunDays', async () => {
  const html = await readFile(path.join(root, 'out/index.html'), 'utf8');

  // One h1
  assert.equal((html.match(/<h1\b/g) || []).length, 1);

  // Next.js assets present
  assert.ok(html.includes('/_next/'));

  // Atelier hero content
  assert.ok(/atelier-hero/i.test(html), 'Hero section should have atelier-hero class');
  assert.ok(/atelier-showcase/i.test(html), 'Showcase tabs should be present');
  assert.ok(/LabaRapi/.test(html), 'LabaRapi project should appear');
  assert.ok(/Luma Support/.test(html), 'Luma Support project should appear');
  assert.ok(/SunDays/.test(html), 'SunDays project should appear');
  assert.ok(/id="cara-kerja"/.test(html) && /Hasil: lingkup dan penawaran/.test(html), 'Process steps and their outcomes should appear');
  assert.ok(/id="pertanyaan"/.test(html) && /Apakah domain dan hosting termasuk/.test(html), 'Practical FAQ should appear');

  // No Lighthouse 100/100 claims or unproven duration promises
  assert.ok(!/Lighthouse\s*100\/100/i.test(html), 'Should not claim Lighthouse 100/100');
  assert.ok(!/sub-detik/i.test(html), 'Should not claim sub-second load');
  assert.ok(!/5 hingga 14 hari kerja/i.test(html), 'Should not promise specific project duration');
  assert.ok(!/garansi revisi/i.test(html), 'Should not promise revision guarantee');

  // Portofolio distinguishes kinds
  assert.ok(/Eksplorasi studio/.test(html), 'Should label studio explorations');
  assert.ok(/Demo interaktif/.test(html), 'Should label interactive demos');

  // No duplicate IDs
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'IDs must be unique');

  // Anchor targets resolve
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(id), `Anchor #${id} must have a target`);
  }

  // Local asset references resolve
  for (const [, reference] of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) {
    if (reference === '/') continue;
    const local = path.join(root, 'out', reference);
    const target = reference.endsWith('/') ? path.join(local, 'index.html') : local;
    assert.ok((await stat(target)).isFile(), `Asset ${reference} must exist`);
  }

  // SunDays demo
  const demo = await readFile(path.join(root, 'out/demos/sunsdays/index.html'), 'utf8');
  assert.ok(demo.includes('href="../../#portofolio"'));
  assert.ok(demo.includes('Foto konsep dibuat dengan AI'));
  assert.equal((demo.match(/class="menu-card"/g) || []).length, 9);
  assert.ok((await stat(path.join(root, 'out/demos/sunsdays/assets/hero-v1.webm'))).size > 0);
});

test('The exported site serves pages and rejects paths outside the build', async () => {
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

    // Agency landing page
    const agency = await fetch(url);
    assert.equal(agency.status, 200);
    const agencyHtml = await agency.text();
    assert.match(agencyHtml, /atelier-hero/);
    assert.match(agencyHtml, /Velkira/);

    // SunDays demo
    const demoRes = await fetch(url + '/demos/sunsdays/index.html');
    assert.equal(demoRes.status, 200);
    assert.match(await demoRes.text(), /SunDays/);

    // 404 for missing
    assert.equal((await fetch(url + '/missing.html')).status, 404);

    // Path traversal blocked
    assert.equal((await fetch(url + '/..%2fREADME.md')).status, 403);
  } finally { server.kill(); }
});
