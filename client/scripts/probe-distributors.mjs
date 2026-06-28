const html = await fetch('https://www.elegancia.com.pk/distributors/').then((r) => r.text());

const all = [...html.matchAll(/https:\/\/www\.elegancia\.com\.pk\/wp-content\/uploads\/[^"'\s<>]+/g)].map((m) => m[0]);
console.log('all unique images:');
console.log([...new Set(all)].join('\n'));

const cssUrls = [...html.matchAll(/elementor\/css\/post-\d+\.css[^"']*/g)].map((m) => 'https://www.elegancia.com.pk/wp-content/uploads/' + m[0]);
for (const url of [...new Set(cssUrls)]) {
  try {
    const css = await fetch(url).then((r) => r.text());
    const imgs = [...css.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1].replace(/["']/g, ''));
    if (imgs.length) {
      console.log('\nCSS', url);
      console.log([...new Set(imgs)].join('\n'));
    }
  } catch {}
}

// distributor section snippet
const idx = html.indexOf('Waleed Iqbal');
if (idx >= 0) console.log('\nSNIPPET:\n', html.slice(idx - 800, idx + 1200));
