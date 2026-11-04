import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const productGridSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'ProductGrid.tsx'),
  'utf8',
);
const productsPageSource = fs.readFileSync(
  path.join(process.cwd(), 'app', '(site)', 'products', 'page.tsx'),
  'utf8',
);
const railContentSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'WAGORailCategoryContent.tsx'),
  'utf8',
);
const powerSupplyContentSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'WAGOPowerSupplyCategoryContent.tsx'),
  'utf8',
);

assert.match(
  productGridSource,
  /import WAGORailCategoryContent from '\.\/WAGORailCategoryContent';/,
  'ProductGrid should import the WAGO rail-terminal editorial content',
);
assert.match(
  productGridSource,
  /<WAGORailCategoryContent \/>/,
  'ProductGrid should render the WAGO rail-terminal editorial content',
);
assert.match(
  productsPageSource,
  /const isWagoRailCategory = brand === 'wago' && category === 'Bornes sur rail';/,
  'The products page should identify the WAGO rail-terminal editorial view',
);
assert.match(
  productsPageSource,
  /\{!isWagoRailCategory && !isWagoPowerSupplyCategory && \(/,
  'WAGO editorial views should omit the product search bar',
);
assert.match(
  railContentSource,
  /\n\s+contactez-nous\n/,
  'The WAGO rail-terminal contact link should use lowercase text',
);
assert.doesNotMatch(
  railContentSource,
  /\n\s+Contactez-nous\n/,
  'The WAGO rail-terminal contact link should not use title case text',
);
assert.match(
  productGridSource,
  /import WAGOPowerSupplyCategoryContent from '\.\/WAGOPowerSupplyCategoryContent';/,
  'ProductGrid should import the WAGO power-supply editorial content',
);
assert.match(
  productGridSource,
  /<WAGOPowerSupplyCategoryContent \/>/,
  'ProductGrid should render the WAGO power-supply editorial content',
);
assert.match(
  productsPageSource,
  /const isWagoPowerSupplyCategory = brand === 'wago' && category === "Système d'alimentation";/,
  'The products page should identify the WAGO power-supply editorial view',
);
assert.match(
  productsPageSource,
  /\{!isWagoRailCategory && !isWagoPowerSupplyCategory && \(/,
  'The WAGO power-supply editorial view should omit the product search bar',
);
assert.match(
  powerSupplyContentSource,
  /\n\s+contactez-nous\n/,
  'The WAGO power-supply contact link should use lowercase text',
);
