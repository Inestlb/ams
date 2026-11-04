import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const productGridPath = path.join(
  process.cwd(),
  'components',
  'products',
  'ProductGrid.tsx',
);
const source = fs.readFileSync(productGridPath, 'utf8');

assert(source.includes("import IFMCategoryCards from './IFMCategoryCards';"), 'ProductGrid should import IFMCategoryCards');
assert(source.includes('getCategoryPageVisibility'), 'ProductGrid should use the tested visibility helper');
assert(source.includes('<IFMCategoryCards />'), 'ProductGrid should render the IFM category overview');
assert(source.includes('showGenericCategoryFilter'), 'ProductGrid should explicitly control generic filter visibility');
assert(source.includes('showProductResults'), 'ProductGrid should keep IFM result visibility independent from filters');
assert(!source.includes('const [showFilters, setShowFilters]'), 'ProductGrid should not couple navigation and results in showFilters state');
