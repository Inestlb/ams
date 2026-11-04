import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { shouldShowIFMCategorySubcategories } from './ifmInductiveSubcategories.ts';
import { getCategoryPageVisibility } from './categoryPageVisibility.ts';

interface ConnectionGroup {
  title: string;
  subcategories: Array<{ name: string; image: string; href?: string }>;
}

interface ConnectionModule {
  IFM_CONNECTION_TECHNOLOGY_CATEGORY?: string;
  IFM_CONNECTION_TECHNOLOGY_GROUPS?: ConnectionGroup[];
}

const expectedGroups = [
  {
    title: 'Câbles prêts à l’emploi / au mètre',
    names: [
      'Câbles de raccordement, extrémité du câble ouverte',
      'Prolongateurs',
      'Câbles de raccordement pour systèmes de contrôle-commande',
      'Câbles de programmation et de communication',
      'Câble au mètre',
    ],
  },
  {
    title: 'Connecteurs',
    names: ['À câbler', 'Bornes', 'Connecteurs intégrés'],
  },
  {
    title: 'Répartiteurs',
    names: ['Répartiteur', 'Répartiteurs en Y'],
  },
];

assert.equal(
  shouldShowIFMCategorySubcategories('ifm', 'Technologie de connexion'),
  true,
  'The IFM connection-technology category should display its static subcategories',
);
assert.equal(
  shouldShowIFMCategorySubcategories('lenze', 'Technologie de connexion'),
  false,
  'Connection-technology subcategories should only appear for IFM',
);
assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Technologie de connexion' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The connection-technology page should show static subcategories without product results',
);

const connectionModule = await import('./ifmConnectionTechnologySubcategories.ts') as ConnectionModule;
assert.deepEqual(
  connectionModule.IFM_CONNECTION_TECHNOLOGY_GROUPS?.map(({ title, subcategories }) => ({
    title,
    names: subcategories.map(({ name }) => name),
  })),
  expectedGroups,
  'Connection-technology subcategories should match the screenshot groups and order',
);
assert.equal(connectionModule.IFM_CONNECTION_TECHNOLOGY_CATEGORY, 'Technologie de connexion');

const subcategories = connectionModule.IFM_CONNECTION_TECHNOLOGY_GROUPS?.flatMap(
  ({ subcategories: items }) => items,
) ?? [];
assert.equal(subcategories.length, 10, 'The screenshot contains ten connection-technology tiles');
for (const { image, href } of subcategories) {
  assert.match(image, /^\/images\/ifm\/connection-technology-subcategories\/connection-\d{2}\.png$/);
  assert.equal(href, undefined, 'Connection-technology subcategories should not have link destinations');
  assert(
    fs.existsSync(path.join(process.cwd(), 'public', image.slice(1))),
    `The local subcategory image ${image} should exist`,
  );
}

const componentSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'IFMConnectionTechnologySubcategories.tsx'),
  'utf8',
);
assert(!componentSource.includes('<a'), 'Connection-technology subcategory cards should not render as links');
assert(!componentSource.includes('href='), 'Connection-technology subcategory cards should not expose link destinations');

const productGridSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'ProductGrid.tsx'),
  'utf8',
);
assert(productGridSource.includes("import IFMConnectionTechnologySubcategories from './IFMConnectionTechnologySubcategories';"));
assert(productGridSource.includes('<IFMConnectionTechnologySubcategories />'));
