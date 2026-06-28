const cssUrls = [
  'https://www.elegancia.com.pk/wp-content/uploads/elementor/css/post-111.css',
  'https://www.elegancia.com.pk/wp-content/uploads/elementor/css/post-41.css',
  'https://www.elegancia.com.pk/wp-content/uploads/elementor/css/post-438.css',
];
for (const url of cssUrls) {
  const css = await fetch(url).then((r) => r.text());
  const imgs = [...css.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1].replace(/["']/g, ''));
  console.log('\n', url);
  console.log([...new Set(imgs)].join('\n'));
}
