import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const componentPath = path.join(
  process.cwd(),
  'components',
  'products',
  'IFMCategoryCards.tsx',
);

assert(
  fs.existsSync(componentPath),
  'IFMCategoryCards should exist as a dedicated component',
);

const source = fs.readFileSync(componentPath, 'utf8');

assert(source.includes('Object.values(IFM_CATEGORIES)'), 'Cards should use the shared ordered category contract');
assert(source.includes('/images/logo-ifm.svg'), 'Cards should use the approved neutral IFM logo visual');
assert(source.includes('priority={category === ifmCategories[0]}'), 'Only the first IFM logo should receive LCP loading priority');
assert(source.includes('brand=ifm&category='), 'Cards should link to IFM category URLs');
assert(source.includes('catalogView'), 'IFM cards should support catalog-view links without changing brand pages');
assert(source.includes('encodeURIComponent(category)'), 'Category names should be URL encoded');
assert(source.includes('grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'), 'The grid should match the Lenze responsive format');
assert(source.includes('Catégories de produits'), 'The overview should use the Lenze section heading');
assert(source.includes('Voir les produits'), 'Every card should expose the product navigation action');
