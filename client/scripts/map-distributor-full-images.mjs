const html = await fetch('https://www.elegancia.com.pk/distributors/').then((r) => r.text());

const names = [
  'Waleed Iqbal', 'Farhad Ullah Khan', 'Muhammad Farooq', 'Abdul Waheed',
  'Muhammad Ibrahim', 'Murad Khan', 'Sajjad Khan', 'Madar Khan',
  'Imran Jamil Khan', 'Muhammad Ijaz Swati', 'Engr Javed Marwat', 'Pervaz Gill',
  'Iftikhar Khan', 'Waseem', 'Muhammad Anees Khan', 'Saddam Khan',
  'Muhammad Sajjad', 'Aqib Ali',
];

const mapping = {};

for (const name of names) {
  const idx = html.indexOf(`>${name}<`);
  const chunk = html.slice(Math.max(0, idx - 2000), idx);
  const srcMatch = chunk.match(/src="(https:\/\/www\.elegancia\.com\.pk\/wp-content\/uploads\/2026\/01\/[^"]+)"/);
  mapping[name] = srcMatch ? srcMatch[1] : null;
  console.log(name, '=>', mapping[name]);
}

// companies section
for (const term of ['Seth Enterprises', 'General Distributors', 'Shahzada Corporation']) {
  const idx = html.indexOf(term);
  const chunk = html.slice(idx - 2000, idx + 500);
  const srcMatch = chunk.match(/src="(https:\/\/www\.elegancia\.com\.pk\/wp-content\/uploads\/[^"]+)"/g);
  console.log('\n', term, srcMatch);
}

console.log('\nJSON:\n', JSON.stringify(mapping, null, 2));
