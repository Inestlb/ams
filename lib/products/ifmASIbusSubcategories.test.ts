import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

interface ASIBusGroup {
  title: string;
  subcategories: Array<{ name: string; image: string; href?: string }>;
}

interface ASIBusModule {
  IFM_ASI_BUS_CATEGORY?: string;
  IFM_ASI_BUS_GROUPS?: ASIBusGroup[];
  shouldShowIFMCategorySubcategories?: (brand: string | null, category?: string) => boolean;
}

const asiBusModule = await import('./ifmInductiveSubcategories.ts') as ASIBusModule;
const expectedGroups = [
  {
    title: 'Systèmes de contrôle-commande',
    names: ['Maîtres AS-Interface', 'Systèmes de commande industriels SmartPLC'],
  },
  {
    title: 'Module / maître',
    names: [
      'Modules de terrain Ethernet',
      'Modules E/S AS-Interface',
      'Composants pour bus de terrain',
    ],
  },
  {
    title: 'Systèmes / capteurs',
    names: ['Systèmes et capteurs AS-Interface'],
  },
  {
    title: 'Alimentation en tension',
    names: ['Alimentations et contrôleurs AS-Interface'],
  },
  {
    title: "Domaines d'application",
    names: [
      'AS-Interface Safety at Work',
      'AS-Interface pour applications en zones explosibles',
    ],
  },
];

assert.deepEqual(
  asiBusModule.IFM_ASI_BUS_GROUPS?.map(({ title, subcategories }) => ({
    title,
    names: subcategories.map(({ name }) => name),
  })),
  expectedGroups,
  'AS-Interface subcategories should match the five screenshot groups and their order',
);

const subcategories = asiBusModule.IFM_ASI_BUS_GROUPS?.flatMap(({ subcategories: items }) => items) ?? [];
assert.equal(subcategories.length, 9, 'The visible screenshot should provide nine AS-Interface tiles');

for (const { image, href } of subcategories) {
  assert.match(image, /^\/images\/ifm\/asi-bus-subcategories\/asi-bus-\d{2}\.webp$/);
  assert.equal(href, undefined, 'AS-Interface subcategories should not have clickable destinations');
  assert(
    fs.existsSync(path.join(process.cwd(), 'public', image.slice(1))),
    `The screenshot crop ${image} should exist locally`,
  );
}

assert.equal(asiBusModule.IFM_ASI_BUS_CATEGORY, 'Communication Industrielle ASI BUS');
assert.equal(
  asiBusModule.shouldShowIFMCategorySubcategories?.('ifm', 'Communication Industrielle ASI BUS'),
  true,
  'The AS-Interface groups should appear on the IFM Communication Industrielle ASI BUS category',
);
assert.equal(asiBusModule.shouldShowIFMCategorySubcategories?.('lenze', 'Communication Industrielle ASI BUS'), false);

const visibilityModule = await import('./categoryPageVisibility.ts');
assert.deepEqual(
  visibilityModule.getCategoryPageVisibility({ brand: 'ifm', category: 'Communication Industrielle ASI BUS' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The AS-Interface page should show static subcategories without products',
);

const componentSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'IFMASIBusSubcategories.tsx'),
  'utf8',
);
assert(!componentSource.includes('<a'), 'AS-Interface subcategory cards should not render as links');
assert(!componentSource.includes('href='), 'AS-Interface subcategory cards should not expose link destinations');

const productGridSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'ProductGrid.tsx'),
  'utf8',
);
assert(productGridSource.includes("import IFMASIBusSubcategories from './IFMASIBusSubcategories';"));
assert(productGridSource.includes('<IFMASIBusSubcategories />'));
