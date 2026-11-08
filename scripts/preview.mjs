import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../out/', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webm': 'video/webm', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };

const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + pathname, pathname.endsWith('/') ? 'index.html' : '');
    if (!file.startsWith(root)) { response.writeHead(403).end(); return; }
    const data = await readFile(file);
    const headers = { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Content-Length': data.length, 'Cache-Control': 'no-store' };
    response.writeHead(200, headers);
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Halaman tidak ditemukan. Jalankan npm run build terlebih dahulu.');
  }
});
server.listen(Number(process.env.PORT || 4175), '127.0.0.1', () => console.log(`Velkira static export: http://127.0.0.1:${server.address().port}`));
