import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

interface IFMCylinderModule {
  IFM_CYLINDER_SUBCATEGORIES?: Array<{ name: string; image: string; href?: string }>;
}

const cylinderModule = await import('./ifmCylinderSubcategories.ts') as IFMCylinderModule;
const expectedNames = [
  'Appropriés pour vérins à rainure en T',
  'Appropriés pour vérins à rainure en C',
  "Appropriés pour d'autres types de vérin",
  'Détecteurs résistants à la pression pour vérins hydrauliques',
  'Utilisation dans des applications de soudure',
  "Haut courant de sortie pour l'emploi sur vérins à rainure en T",
  'IO-Link - Détecteurs pour vérins',
  'Appropriés pour vérins IMI Norgren à rainure en C',
  'Détecteurs pour vérins avec aide au réglage',
];

assert.deepEqual(
  cylinderModule.IFM_CYLINDER_SUBCATEGORIES?.map(({ name }) => name),
  expectedNames,
  'Cylinder subcategories should match the screenshot order, excluding the all-products tile',
);

assert.equal(cylinderModule.IFM_CYLINDER_SUBCATEGORIES?.length, 9);
for (const { image, href } of cylinderModule.IFM_CYLINDER_SUBCATEGORIES ?? []) {
  assert.match(image, /^\/images\/ifm\/cylinder-subcategories\/cylinder-\d{2}\.webp$/);
  assert(
    fs.existsSync(path.join(process.cwd(), 'public', image.slice(1))),
    `The image for ${image} should exist locally`,
  );
  assert.equal(href, undefined, 'Cylinder subcategories must not have clickable destinations');
}

const { IFM_CYLINDER_CATEGORY, shouldShowIFMCategorySubcategories } = await import('./ifmInductiveSubcategories.ts');
assert.equal(IFM_CYLINDER_CATEGORY, 'Détecteurs pour vérins');
assert.equal(shouldShowIFMCategorySubcategories('ifm', 'Détecteurs pour vérins'), true);
assert.equal(shouldShowIFMCategorySubcategories('lenze', 'Détecteurs pour vérins'), false);

const { getCategoryPageVisibility } = await import('./categoryPageVisibility.ts');
assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Détecteurs pour vérins' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The cylinder-detectors page should hide products and generic filters',
);
assert.equal(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Catégorie non prise en charge' }).showProductResults,
  true,
  'Other IFM categories should retain their product results',
);
