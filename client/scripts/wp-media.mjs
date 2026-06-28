const searches = ['arslan', 'sufyan', 'zahid', 'leadership', 'chairman', 'ceo', 'team', 'founder'];
for (const q of searches) {
  const res = await fetch(`https://www.elegancia.com.pk/wp-json/wp/v2/media?search=${q}&per_page=20`);
  if (!res.ok) { console.log(q, res.status); continue; }
  const data = await res.json();
  if (data.length) {
    console.log('\n', q, ':');
    for (const item of data) console.log(item.title?.rendered, item.source_url);
  }
}

const recent = await fetch('https://www.elegancia.com.pk/wp-json/wp/v2/media?per_page=50&orderby=date').then((r) => r.json());
console.log('\nRecent media:');
for (const item of recent) console.log(item.title?.rendered, item.source_url);
