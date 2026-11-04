import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

interface IFMValveModule {
  IFM_VALVE_SUBCATEGORIES?: Array<{ name: string; image: string; href?: string }>;
}

const ifmModule = await import('./ifmValveSubcategories.ts') as IFMValveModule;
const { IFM_VALVE_CATEGORY, shouldShowIFMCategorySubcategories } = await import('./ifmInductiveSubcategories.ts');
const expectedNames = [
  'Détecteur intelligent pour vannes ¼ de tour',
  'Détecteurs pour actionneurs 1/4 de tour',
  'Détecteurs pour vannes et actionneurs 1/4 de tour',
  'Positionneur pour vannes industrielles 1/4 de tour',
  'Détecteurs pour vannes à tige montante',
  'Cames porte-drapeaux pour actionneurs 1/4 de tour',
  'Kits de montage pour vannes manuelles',
  'Vannes',
  'Câbles avec prise mâle pour électrovannes',
  'Prolongateurs avec connecteur pour électrovannes',
];

assert.equal(IFM_VALVE_CATEGORY, 'Détecteurs pour vannes');
assert.deepEqual(
  ifmModule.IFM_VALVE_SUBCATEGORIES?.map(({ name }) => name),
  expectedNames,
  'Valve subcategories should match the screenshot order without an all-products tile',
);

assert.equal(ifmModule.IFM_VALVE_SUBCATEGORIES?.length, 10);
for (const { image, href } of ifmModule.IFM_VALVE_SUBCATEGORIES ?? []) {
  assert.match(image, /^\/images\/ifm\/valve-subcategories\/valve-\d{2}\.webp$/);
  assert(
    fs.existsSync(path.join(process.cwd(), 'public', image.slice(1))),
    `The image for ${image} should exist locally`,
  );
  assert.equal(href, undefined, 'Valve subcategories must not have clickable destinations');
}

assert.equal(shouldShowIFMCategorySubcategories('ifm', 'Détecteurs pour vannes'), true);
assert.equal(shouldShowIFMCategorySubcategories('lenze', 'Détecteurs pour vannes'), false);

const { getCategoryPageVisibility } = await import('./categoryPageVisibility.ts');
assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Détecteurs pour vannes' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The valve-detectors page should hide products and generic filters',
);
assert.equal(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Catégorie non prise en charge' }).showProductResults,
  true,
  'Other IFM categories should retain their product results',
);
