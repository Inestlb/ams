import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (...segments: string[]) =>
  fs.readFileSync(path.join(root, ...segments), 'utf8');

const heroSource = read('components', 'home', 'HeroSection.tsx');
const translationSource = read('lib', 'context', 'TranslationContext.tsx');

assert.match(heroSource, /className="flex flex-wrap gap-3"/);
assert.match(heroSource, /<Link href="\/contact" className="flex items-center">[\s\S]*?t\('home\.hero\.cta'\)/);
assert.match(heroSource, /<Link href="\/products" className="flex items-center">[\s\S]*?t\('home\.hero\.secondaryCta'\)/);
assert.match(heroSource, /rounded-none bg-\[#e47925\]/);
assert.match(heroSource, /rounded-none border border-white bg-transparent/);
assert.match(translationSource, /'home\.hero\.cta': \{\s*fr: 'Demander un devis'/);
assert.match(translationSource, /'home\.hero\.secondaryCta': \{\s*fr: 'Voir les produits'/);
