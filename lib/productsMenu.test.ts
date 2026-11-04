import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (...segments: string[]) =>
  fs.readFileSync(path.join(root, ...segments), 'utf8');

const navbarSource = read('components', 'layout', 'Navbar.tsx');
const productsPageSource = read('app', '(site)', 'products', 'page.tsx');
const translationSource = read('lib', 'context', 'TranslationContext.tsx');

assert.match(navbarSource, /const productBrands(?:\:\s*ProductBrand\[\])? = \[/);
assert.match(navbarSource, /logo: '\/images\/logo-Lenze\.svg'/);
assert.match(navbarSource, /logo: '\/images\/logo-ifm\.svg'/);
assert.match(navbarSource, /logo: '\/images\/logo-WAGO\.svg'/);
assert.match(navbarSource, /getTextContent\('nav\.products\.all'\)/);
assert.match(navbarSource, /getTextContent\('nav\.products\.catalogue'\)/);
assert.match(navbarSource, /getTextContent\('nav\.products\.byBrand'\)/);
assert.doesNotMatch(navbarSource, /LayoutGrid/);
assert.doesNotMatch(navbarSource, /border-\[#e47925\]\/30/);
assert.match(productsPageSource, /let pageTitle = 'Tous les produits'/);
assert.match(translationSource, /'nav\.products\.all': \{\s*fr: 'Tous les produits'/);
assert.match(translationSource, /'nav\.products\.catalogue': \{\s*fr: 'Voir l\\'ensemble du catalogue'/);
assert.match(translationSource, /'nav\.products\.byBrand': \{\s*fr: 'PAR MARQUE'/);
