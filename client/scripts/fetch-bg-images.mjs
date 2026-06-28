const html = await fetch('https://www.elegancia.com.pk/about/').then((r) => r.text());
const imgs = [...html.matchAll(/url\(([^)]+)\)/gi)].map((m) => m[1].replace(/['"]/g, ''));
const unique = [...new Set(imgs)].filter((u) => u.includes('upload') || u.includes('http'));
console.log(unique.join('\n'));
