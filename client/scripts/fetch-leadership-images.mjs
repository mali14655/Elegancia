const html = await fetch('https://www.elegancia.com.pk/about/').then((r) => r.text());
const paths = [...html.matchAll(/wp-content\/uploads\/[^"'\s)]+\.(?:jpg|jpeg|png|webp)/gi)].map((m) => m[0]);
const unique = [...new Set(paths)];
console.log(unique.join('\n'));
