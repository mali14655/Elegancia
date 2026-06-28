const html = await fetch('https://www.elegancia.com.pk/distributors/').then((r) => r.text());

// Split by distributor cards - find image before each h6 name
const names = [
  'Waleed Iqbal', 'Farhad Ullah Khan', 'Muhammad Farooq', 'Abdul Waheed',
  'Muhammad Ibrahim', 'Murad Khan', 'Sajjad Khan', 'Madar Khan',
  'Imran Jamil Khan', 'Muhammad Ijaz Swati', 'Engr Javed Marwat', 'Pervaz Gill',
  'Iftikhar Khan', 'Waseem', 'Muhammad Anees Khan', 'Saddam Khan',
  'Muhammad Sajjad', 'Aqib Ali',
  'Seth Enterprises #0004', 'General Distributors #0005', 'Shahzada Corporation #0006',
];

for (const name of names) {
  const idx = html.indexOf(`>${name}<`);
  if (idx < 0) {
    console.log('NOT FOUND:', name);
    continue;
  }
  const chunk = html.slice(Math.max(0, idx - 1500), idx);
  const imgs = [...chunk.matchAll(/wp-content\/uploads\/2026\/01\/[^"'\s]+\.png/g)];
  const img = imgs.length ? imgs[imgs.length - 1][0] : 'none';
  console.log(name, '=>', img);
}

// also check elementor post-39 css
const css = await fetch('https://www.elegancia.com.pk/wp-content/uploads/elementor/css/post-39.css').then((r) => r.text());
const bg = [...css.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1].replace(/["']/g, ''));
console.log('\npost-39 css images:', [...new Set(bg)].join('\n'));
