const html = await fetch('https://www.elegancia.com.pk/distributors/').then((r) => r.text());
const idx = html.indexOf('Seth Enterprises');
console.log(html.slice(idx - 500, idx + 2500));
