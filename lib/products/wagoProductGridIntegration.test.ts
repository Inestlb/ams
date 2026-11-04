import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const productGridSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'ProductGrid.tsx'),
  'utf8',
);

assert.match(
  productGridSource,
  /import WAGOCategoryCards from '\.\/WAGOCategoryCards';/,
  'ProductGrid should import the WAGO category-card overview',
);
assert.match(
  productGridSource,
  /<WAGOCategoryCards \/>/,
  'ProductGrid should render the WAGO category-card overview',
);
