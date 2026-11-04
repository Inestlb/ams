import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

interface IOLinkGroup {
  title: string;
  subcategories: Array<{ name: string; image: string; href?: string }>;
}

interface IOLinkModule {
  IFM_IO_LINK_CATEGORY?: string;
  IFM_IO_LINK_GROUPS?: IOLinkGroup[];
  shouldShowIFMCategorySubcategories?: (brand: string | null, category?: string) => boolean;
}

const iOLinkModule = await import('./ifmInductiveSubcategories.ts') as IOLinkModule;
const expectedGroups = [
  {
    title: 'Maîtres / modules',
    names: ['Maître IO-Link', 'Modules IO-Link'],
  },
  {
    title: 'Capteurs / identification',
    names: [
      'Détecteurs de position IO-Link',
      'Capteurs process IO-Link',
      'Détecteurs IO-Link pour le contrôle de mouvements',
      "Systèmes d'identification IO-Link",
    ],
  },
  {
    title: 'Accessoires',
    names: [
      'Accessoires IO-Link / technologie de connexion',
      'IO-Link - alimentation en tension',
      'Affichages / signalisation IO-Link',
      'Convertisseurs IO-Link',
    ],
  },
  {
    title: 'Paramétrage / kits de démarrage',
    names: ['Kits de démarrage IO-Link'],
  },
];

assert.deepEqual(
  iOLinkModule.IFM_IO_LINK_GROUPS?.map(({ title, subcategories }) => ({
    title,
    names: subcategories.map(({ name }) => name),
  })),
  expectedGroups,
  'IO-Link subcategories should match the four screenshot groups and their order',
);

const subcategories = iOLinkModule.IFM_IO_LINK_GROUPS?.flatMap(({ subcategories: items }) => items) ?? [];
assert.equal(subcategories.length, 11, 'Only the 11 fully visible IO-Link subcategories should be included');

for (const { image, href } of subcategories) {
  assert.match(image, /^\/images\/ifm\/io-link-subcategories\/io-link-\d{2}\.webp$/);
  assert.equal(href, undefined, 'IO-Link subcategories should not have clickable destinations');
  assert(
    fs.existsSync(path.join(process.cwd(), 'public', image.slice(1))),
    `The screenshot crop ${image} should exist locally`,
  );
}

assert.equal(iOLinkModule.IFM_IO_LINK_CATEGORY, 'IO LINK');
assert.equal(
  iOLinkModule.shouldShowIFMCategorySubcategories?.('ifm', 'IO LINK'),
  true,
  'The static IO-Link groups should appear only on the IFM IO LINK category',
);
assert.equal(iOLinkModule.shouldShowIFMCategorySubcategories?.('lenze', 'IO LINK'), false);

const visibilityModule = await import('./categoryPageVisibility.ts');
assert.deepEqual(
  visibilityModule.getCategoryPageVisibility({ brand: 'ifm', category: 'IO LINK' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The IO LINK page should show static subcategories without products',
);

const componentSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'IFMIOLinkSubcategories.tsx'),
  'utf8',
);
assert(!componentSource.includes('<a'), 'IO-Link subcategory cards should not render as links');
assert(!componentSource.includes('href='), 'IO-Link subcategory cards should not expose link destinations');

const productGridSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'ProductGrid.tsx'),
  'utf8',
);
assert(productGridSource.includes("import IFMIOLinkSubcategories from './IFMIOLinkSubcategories';"));
assert(productGridSource.includes('<IFMIOLinkSubcategories />'));
