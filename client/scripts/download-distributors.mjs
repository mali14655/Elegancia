import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/assets/distributors');
await mkdir(dir, { recursive: true });

const files = [
  ['waleed-iqbal.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-182231.png'],
  ['farhad-ullah-khan.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/2.png'],
  ['muhammad-farooq.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-182523.png'],
  ['abdul-waheed.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-183146.png'],
  ['muhammad-ibrahim.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-183230.png'],
  ['murad-khan.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-183309.png'],
  ['sajjad-khan.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-183411.png'],
  ['madar-khan.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-184251.png'],
  ['imran-jamil-khan.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-184611.png'],
  ['muhammad-ijaz-swati.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-184734.png'],
  ['engr-javed-marwat.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-184815.png'],
  ['pervaz-gill.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-184852.png'],
  ['iftikhar-khan.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-185129.png'],
  ['waseem.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-185202.png'],
  ['muhammad-anees-khan.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-185234.png'],
  ['saddam-khan.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-185324.png'],
  ['muhammad-sajjad.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-185358.png'],
  ['aqib-ali.png', 'https://www.elegancia.com.pk/wp-content/uploads/2026/01/Screenshot-2026-01-30-185430.png'],
];

for (const [name, url] of files) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(dir, name), buf);
  console.log('saved', name, buf.length);
}
