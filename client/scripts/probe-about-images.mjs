const html = await fetch('https://www.elegancia.com.pk/about/').then((r) => r.text());
const jsonBlocks = [...html.matchAll(/data-settings="([^"]+)"/g)].map((m) => m[1].replace(/&quot;/g, '"'));
for (const block of jsonBlocks) {
  if (block.toLowerCase().includes('background') || block.toLowerCase().includes('image')) {
    console.log(block.slice(0, 500));
    console.log('---');
  }
}

const bg = [...html.matchAll(/background-image:\s*url\(([^)]+)\)/gi)];
console.log('bg urls', [...new Set(bg.map((m) => m[1]))]);

const all = [...html.matchAll(/https:\/\/www\.elegancia\.com\.pk\/wp-content\/uploads\/[^"'\s<>]+/g)].map((m) => m[0]);
console.log('all unique', [...new Set(all)]);
