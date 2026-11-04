import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (...segments: string[]) =>
  fs.readFileSync(path.join(root, ...segments), 'utf8');

const layoutSource = read('app', 'layout.tsx');
const nextConfigSource = read('next.config.mjs');

assert.match(layoutSource, /import \{ Inter \} from "next\/font\/google";/);
assert.doesNotMatch(layoutSource, /Poppins|Playfair_Display|--font-poppins|--font-playfair-display/);
assert.doesNotMatch(layoutSource, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
assert.doesNotMatch(layoutSource, /<link rel="preload" as="image" href="\/images\/LOGO-UTC\.svg"/);
assert.match(nextConfigSource, /minimumCacheTTL:\s*86400/);

const motionProviderPath = path.join(root, 'components', 'home', 'HomeMotionProvider.tsx');
assert.equal(fs.existsSync(motionProviderPath), true, 'HomeMotionProvider should centralize Framer Motion features');

const homePageSource = read('app', 'page.tsx');
const motionProviderSource = fs.readFileSync(motionProviderPath, 'utf8');
const animatedHomeFiles = [
  'HeroSection.tsx',
  'SolutionsSection.tsx',
  'ExpertiseSection.tsx',
  'PartnersSection.tsx',
  'ValuePropositionSection.tsx',
  'CtaSection.tsx',
];

assert.match(motionProviderSource, /LazyMotion/);
assert.match(motionProviderSource, /features=\{domAnimation\}/);
assert.match(homePageSource, /<HomeMotionProvider>/);

for (const file of animatedHomeFiles) {
  const source = read('components', 'home', file);
  assert.match(source, /import \{ m \} from ["']framer-motion["'];/);
  assert.doesNotMatch(source, /\bmotion\./);
}

const mailButtonSource = read('components', 'MailButtonFixed.tsx');
const navbarSource = read('components', 'layout', 'Navbar.tsx');
const translationSource = read('lib', 'context', 'TranslationContext.tsx');

assert.match(mailButtonSource, /const lastScrollY = useRef\(0\)/);
assert.match(mailButtonSource, /requestAnimationFrame/);
assert.doesNotMatch(mailButtonSource, /const \[lastScrollY, setLastScrollY\]/);
assert.match(navbarSource, /addEventListener\('scroll', handleScroll, \{ passive: true \}\)/);
assert.match(navbarSource, /requestAnimationFrame/);
assert.match(translationSource, /const t = useCallback/);
assert.match(translationSource, /const contextValue = useMemo/);
assert.match(translationSource, /<TranslationContext\.Provider value=\{contextValue\}>/);

const count = (source: string, token: string) => source.split(token).length - 1;
const productCardSource = read('components', 'products', 'ProductCard.tsx');
const productGallerySource = read('components', 'products', 'ProductGallery.tsx');
const productDetailSource = read('app', '(site)', 'products', '[slug]', 'page.tsx');

assert.equal(count(productCardSource, 'sizes='), 2);
assert.equal(count(productGallerySource, 'sizes='), 2);
assert.match(productDetailSource, /sizes="\(min-width: 1024px\) 29vw, \(min-width: 640px\) 44vw, 100vw"/);

const partnersSectionSource = read('components', 'home', 'PartnersSection.tsx');
const ctaSectionSource = partnersSectionSource.split('{/* CTA Section */}')[1] ?? '';
assert.doesNotMatch(ctaSectionSource, /bg-\[#e47925\]/);
assert.match(ctaSectionSource, /underline/);
