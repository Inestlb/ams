import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const temperatureModule = await import('./ifmTemperatureSubcategories.ts') as {
  IFM_TEMPERATURE_CATEGORY: string;
  IFM_TEMPERATURE_SUBCATEGORIES: Array<{ name: string; image: string; href?: string }>;
};
const expectedNames = [
  "Transmetteurs avec afficheur pour l'industrie agroalimentaire",
  "Transmetteurs compacts pour l'utilisation industrielle",
  "Transmetteurs compacts pour l'industrie agro-alimentaire",
  'Transmetteurs compacts pour les engins mobiles',
  "Capteurs affleurants pour l'industrie agro-alimentaire",
  "Transmetteurs avec auto-contrôle pour l'industrie agro-alimentaire",
  'Sondes à boulonner et à visser',
  'Sondes rigides',
  'Sondes rigides pour applications aseptiques',
  'Boîtiers de contrôle pour capteurs de température',
  'Connecteurs transmetteurs de température',
  'Capteurs avec sonde de température et afficheur',
  'Réglage intuitif du seuil de commutation',
  'Tubes protecteurs',
  'Capteurs de température infrarouge avec afficheur',
  'Capteurs de température infrarouge analogiques avec afficheur',
  'Sondes de température de surface',
];

assert.equal(temperatureModule.IFM_TEMPERATURE_CATEGORY, 'Capteurs de température');
assert.deepEqual(
  temperatureModule.IFM_TEMPERATURE_SUBCATEGORIES.map(({ name }) => name),
  expectedNames,
  'Temperature subcategories should match the screenshot order and exclude the all-products tile',
);
assert.equal(temperatureModule.IFM_TEMPERATURE_SUBCATEGORIES.length, 17);

for (const [index, { image, href }] of temperatureModule.IFM_TEMPERATURE_SUBCATEGORIES.entries()) {
  assert.equal(
    image,
    `/images/ifm/temperature-subcategories/temperature-${String(index + 1).padStart(2, '0')}.webp`,
  );
  assert(
    fs.existsSync(path.join(process.cwd(), 'public', image.slice(1))),
    `The screenshot crop ${image} should exist locally`,
  );
  assert.equal(href, undefined, 'Temperature subcategories must not have clickable destinations');
}

const { shouldShowIFMCategorySubcategories } = await import('./ifmInductiveSubcategories.ts');
assert.equal(shouldShowIFMCategorySubcategories('ifm', 'Capteurs de température'), true);
assert.equal(shouldShowIFMCategorySubcategories('lenze', 'Capteurs de température'), false);

const { getCategoryPageVisibility } = await import('./categoryPageVisibility.ts');
assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Capteurs de température' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The IFM temperature page should only show static subcategories',
);
