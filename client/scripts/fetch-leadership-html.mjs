const html = await fetch('https://www.elegancia.com.pk/about/').then((r) => r.text());
const idx = html.toLowerCase().indexOf('meet the leadership');
if (idx >= 0) {
  console.log(html.slice(idx, idx + 8000));
} else {
  console.log('not found');
  const arslan = html.indexOf('Muhammad Arslan');
  console.log(html.slice(Math.max(0, arslan - 500), arslan + 2000));
}
