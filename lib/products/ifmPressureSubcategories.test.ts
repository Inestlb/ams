import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

interface IFMPressureModule {
  IFM_PRESSURE_SUBCATEGORIES?: Array<{ name: string; image: string; href?: string }>;
}

const pressureModule = await import('./ifmPressureSubcategories.ts') as IFMPressureModule;
const expectedNames = [
  'Capteurs de pression pour applications aseptiques',
  'Capteurs de pression pour applications industrielles',
  'Capteurs de pression pour applications pneumatiques',
  'Capteurs de pression pour engins mobiles',
  'Sondes de niveau submersibles',
  'Capteurs de pression avec signal de température supplémentaire via IO-Link',
];

assert.deepEqual(
  pressureModule.IFM_PRESSURE_SUBCATEGORIES?.map(({ name }) => name),
  expectedNames,
  'Pressure subcategories should match screenshot order and exclude the all-products tile',
);

assert.equal(pressureModule.IFM_PRESSURE_SUBCATEGORIES?.length, 6);
for (const { image, href } of pressureModule.IFM_PRESSURE_SUBCATEGORIES ?? []) {
  assert.match(image, /^\/images\/ifm\/pressure-subcategories\/pressure-\d{2}\.webp$/);
  assert(
    fs.existsSync(path.join(process.cwd(), 'public', image.slice(1))),
    `The image for ${image} should exist locally`,
  );
  assert.equal(href, undefined, 'Pressure subcategories must not have clickable destinations');
}

const {
  IFM_PRESSURE_CATEGORY,
  shouldShowIFMCategorySubcategories,
} = await import('./ifmInductiveSubcategories.ts');
assert.equal(IFM_PRESSURE_CATEGORY, 'Capteurs de pression / Capteurs de dépression');
assert.equal(
  shouldShowIFMCategorySubcategories('ifm', IFM_PRESSURE_CATEGORY),
  true,
  'Pressure subcategories should be shown for the IFM pressure category',
);
assert.equal(shouldShowIFMCategorySubcategories('lenze', IFM_PRESSURE_CATEGORY), false);

const { getCategoryPageVisibility } = await import('./categoryPageVisibility.ts');
assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm', category: IFM_PRESSURE_CATEGORY }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The IFM pressure category should hide products and generic filters',
);
assert.equal(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Catégorie non prise en charge' }).showProductResults,
  true,
  'Other IFM categories should retain their product results',
);
