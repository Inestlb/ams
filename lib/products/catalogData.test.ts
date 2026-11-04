import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const source = fs.readFileSync(
  path.join(process.cwd(), 'data', 'products.ts'),
  'utf8',
);

assert.match(source, /export async function getProductCatalog/);
assert.match(source, /paginateProducts\(filteredProducts, options\?\.page\)/);
assert.doesNotMatch(source, /ITEMS_PER_PAGE = 8/);
assert.match(source, /getProductCategories\(brand\?: string/);
assert.match(
  source,
  /product\.id\.startsWith\('lenze-'\) \|\| productNameLower\.includes\(options\.brand\.toLowerCase\(\)\)/,
);

const pageSource = fs.readFileSync(
  path.join(process.cwd(), 'app', '(site)', 'products', 'page.tsx'),
  'utf8',
);
assert.match(pageSource, /const isCatalogView = !brand \|\| resolvedSearchParams\.catalog === 'all'/);
assert.match(pageSource, /isCatalogView\s*\? getProductCatalog\(productsOptions\)/);
assert.match(pageSource, /: getProducts\(productsOptions\)/);
