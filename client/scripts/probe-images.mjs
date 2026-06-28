const urls = [
  'https://www.elegancia.com.pk/wp-content/uploads/2026/01/sss.jpg',
  'https://www.elegancia.com.pk/wp-content/uploads/2025/10/pexels-pixabay-416528.jpg',
  'https://www.elegancia.com.pk/wp-content/uploads/2025/10/pexels-pixabay-416528-600x428.jpg',
];

for (const url of urls) {
  const res = await fetch(url, { method: 'HEAD' });
  console.log(res.status, url);
}

// scan about page for 2026 uploads
const html = await fetch('https://www.elegancia.com.pk/about/').then((r) => r.text());
const y2026 = [...html.matchAll(/2026\/[^"'\s)]+\.(?:jpg|jpeg|png|webp)/gi)].map((m) => m[0]);
console.log('2026:', [...new Set(y2026)]);

// scan whole homepage
const home = await fetch('https://www.elegancia.com.pk/').then((r) => r.text());
const people = [...home.matchAll(/uploads\/[^"'\s)]*(?:team|lead|chair|ceo|founder|arslan|sufyan|zahid|staff|director)[^"'\s)]*\.(?:jpg|jpeg|png|webp)/gi)];
console.log('people refs:', people.map((m) => m[0]));

const all2026 = [...home.matchAll(/wp-content\/uploads\/2026\/[^"'\s)]+\.(?:jpg|jpeg|png|webp)/gi)].map((m) => m[0]);
console.log('home 2026:', [...new Set(all2026)]);
