const home = await fetch('https://www.elegancia.com.pk/').then((r) => r.text());
for (const term of ['sss.jpg', 'unnamed-2', 'Muhammad Arslan', 'Muhammad Sufyan', 'Muhammad Zahid', 'flip-box']) {
  const idx = home.indexOf(term);
  console.log('\n===', term, 'idx', idx);
  if (idx >= 0) console.log(home.slice(Math.max(0, idx - 400), idx + 600));
}
