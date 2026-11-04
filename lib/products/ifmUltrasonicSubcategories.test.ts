import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

interface IFMUltrasonicModule {
  IFM_ULTRASONIC_SUBCATEGORIES?: Array<{ name: string; image: string }>;
  shouldShowIFMCategorySubcategories?: (brand: string | null, category?: string) => boolean;
}

const ultrasonicModule = await import('./ifmInductiveSubcategories.ts') as IFMUltrasonicModule;
const expectedNames = [
  'Type M18 Cube en boîtier métallique',
  'Boîtier court M18',
  'Boîtier long M18',
  'Boîtier M30',
  'Détecteurs tout inox',
];

assert.deepEqual(
  ultrasonicModule.IFM_ULTRASONIC_SUBCATEGORIES?.map(({ name }) => name),
  expectedNames,
  'Ultrasonic subcategories should match the screenshot order, excluding the all-products tile',
);

assert.equal(ultrasonicModule.IFM_ULTRASONIC_SUBCATEGORIES?.length, 5);
assert(
  !ultrasonicModule.IFM_ULTRASONIC_SUBCATEGORIES?.some(({ name }) =>
    name === 'Tous les détecteurs à ultrasons' || name === 'Tous les détecteurs ultrasons'
  ),
  'The all-ultrasonic-detectors tile should be excluded',
);

for (const subcategory of ultrasonicModule.IFM_ULTRASONIC_SUBCATEGORIES ?? []) {
  assert.match(subcategory.image, /^\/images\/ifm\/ultrasonic-subcategories\/.+\.webp$/);
  assert(
    fs.existsSync(path.join(process.cwd(), 'public', subcategory.image.slice(1))),
    `The screenshot crop for "${subcategory.name}" should exist locally`,
  );
  assert(!('href' in subcategory), 'Ultrasonic subcategories should not have clickable destinations');
}

assert.equal(
  ultrasonicModule.shouldShowIFMCategorySubcategories?.('ifm', 'Détecteurs à ultrasons'),
  true,
  'Ultrasonic subcategories should appear on the IFM ultrasonic-detectors page',
);
assert.equal(
  ultrasonicModule.shouldShowIFMCategorySubcategories?.('ifm', 'Cellule Opto'),
  true,
  'Existing IFM subcategory pages should keep their behavior',
);
assert.equal(
  ultrasonicModule.shouldShowIFMCategorySubcategories?.('lenze', 'Détecteurs à ultrasons'),
  false,
);
assert.equal(
  ultrasonicModule.shouldShowIFMCategorySubcategories?.('ifm', 'Catégorie non prise en charge'),
  false,
);

const visibilityModule = await import('./categoryPageVisibility.ts');
assert.deepEqual(
  visibilityModule.getCategoryPageVisibility({ brand: 'ifm', category: 'Détecteurs à ultrasons' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The ultrasonic-detectors page should show subcategories without product results',
);
assert.equal(
  visibilityModule.getCategoryPageVisibility({ brand: 'ifm', category: 'Cellule Opto' }).showProductResults,
  false,
  'Existing IFM no-products pages should keep their behavior',
);
assert.equal(
  visibilityModule.getCategoryPageVisibility({ brand: 'ifm', category: 'Catégorie non prise en charge' }).showProductResults,
  true,
  'Other IFM category pages should keep showing product results',
);
