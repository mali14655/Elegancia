import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/assets/leadership');
await mkdir(dir, { recursive: true });

const files = [
  ['chairman.jpg', 'https://www.elegancia.com.pk/wp-content/uploads/2025/10/arslan.jpg'],
  ['ceo.jpg', 'https://www.elegancia.com.pk/wp-content/uploads/2025/10/SUFYAN.jpg'],
  ['zahid.jpg', 'https://www.elegancia.com.pk/wp-content/uploads/2025/10/ZAHID.jpg'],
];

for (const [name, url] of files) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(dir, name), buf);
  console.log('saved', name, buf.length);
}
