import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const filterSource = fs.readFileSync(path.join(process.cwd(), 'components', 'products', 'ProductFilter.tsx'), 'utf8');
const gridSource = fs.readFileSync(path.join(process.cwd(), 'components', 'products', 'ProductGrid.tsx'), 'utf8');
const searchSource = fs.readFileSync(path.join(process.cwd(), 'components', 'products', 'SearchBar.tsx'), 'utf8');

assert.match(filterSource, /Tous les produits/);
assert.match(filterSource, /Lenze/);
assert.match(filterSource, /IFM/);
assert.match(filterSource, /WAGO/);
assert.match(filterSource, /Catégories/);
assert.match(filterSource, /showBrandFilter/);
assert.match(filterSource, /'All'/);
assert.match(filterSource, /hover:bg-\[#0b2f4f\]/);
assert.match(gridSource, /buildProductsUrl/);
assert.match(gridSource, /totalProducts/);
assert.match(gridSource, /catalogView/);
assert.match(gridSource, /scroll: false/);
assert.match(gridSource, /startTransition/);
assert.match(
  gridSource,
  /isCatalogView && !filterOptions\.category && \(brand === 'ifm' \|\| brand === 'wago'\)/,
  'The catalog should show IFM and WAGO category cards after selecting those brands',
);
assert.match(gridSource, /<IFMCategoryCards[\s\S]*catalogView=\{isCatalogView\}/);
assert.match(gridSource, /<WAGOCategoryCards[\s\S]*catalogView=\{isCatalogView\}/);
assert.match(
  gridSource,
  /shouldShowIFMCategorySubcategories\(brand, filterOptions\.category\) && \(!isCatalogView \|\| brand === 'ifm'\)/,
  'IFM catalog category pages should expose their existing subcategory cards while preserving the filters',
);
assert.match(
  gridSource,
  /\{isWAGORailCategory && \(/,
  'WAGO catalog category pages should preserve their existing category content while keeping the filters',
);
assert.match(
  gridSource,
  /\{isWAGOPowerSupplyCategory && \(/,
  'WAGO catalog power-supply pages should preserve their existing category content while keeping the filters',
);
assert.doesNotMatch(gridSource, /totalPages > 1 && !hasSubcategories/);
assert.match(
  gridSource,
  /applyCatalogFilters\(\{\s*brand: nextBrand,\s*category: undefined,\s*subcategory: undefined,\s*page: 1,?\s*\}\)/,
);
assert.match(searchSource, /useSearchParams/);
assert.match(
  searchSource,
  /useEffect\(\(\) => \{[\s\S]*?setSearchTerm\(initialQuery\);[\s\S]*?setSearchResults\(\[\]\);[\s\S]*?setIsDropdownOpen\(false\);[\s\S]*?\}, \[initialQuery\]\);/,
);
