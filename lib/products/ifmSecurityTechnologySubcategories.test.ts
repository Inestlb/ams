import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

interface SecurityGroup {
  title: string;
  subcategories: Array<{ name: string; image: string; href?: string }>;
}

interface SecurityModule {
  IFM_SECURITY_TECHNOLOGY_CATEGORY?: string;
  IFM_SECURITY_TECHNOLOGY_GROUPS?: SecurityGroup[];
  shouldShowIFMCategorySubcategories?: (brand: string | null, category?: string) => boolean;
}

const securityModule = await import('./ifmInductiveSubcategories.ts') as SecurityModule;
const expectedGroups = [
  {
    title: 'Capteurs',
    names: [
      'Détecteurs de sécurité inductifs',
      'Barrages immatériels de sécurité',
      'Barrières de sécurité multifaiseaux',
      'Détecteurs de sécurité à codage magnétique / RFID',
    ],
  },
  {
    title: 'Communication industrielle',
    names: [
      'Systèmes de contrôle-commande de sécurité',
      'AS-Interface Safety at Work',
      'Sécurité machine via IO-Link',
    ],
  },
  {
    title: 'Alimentation en tension',
    names: ['Relais de sécurité'],
  },
];

assert.deepEqual(
  securityModule.IFM_SECURITY_TECHNOLOGY_GROUPS?.map(({ title, subcategories }) => ({
    title,
    names: subcategories.map(({ name }) => name),
  })),
  expectedGroups,
  'Security subcategories should match the three screenshot groups and their order',
);

const subcategories = securityModule.IFM_SECURITY_TECHNOLOGY_GROUPS?.flatMap(
  ({ subcategories: items }) => items,
) ?? [];
assert.equal(subcategories.length, 8, 'The screenshot contains eight security subcategory tiles');

for (const { image, href } of subcategories) {
  assert.match(image, /^\/images\/ifm\/security-technology-subcategories\/security-\d{2}\.webp$/);
  assert.equal(href, undefined, 'Security subcategories should not have clickable destinations');
  assert(
    fs.existsSync(path.join(process.cwd(), 'public', image.slice(1))),
    `The screenshot crop ${image} should exist locally`,
  );
}

assert.equal(securityModule.IFM_SECURITY_TECHNOLOGY_CATEGORY, 'Technologie de sécurité');
assert.equal(
  securityModule.shouldShowIFMCategorySubcategories?.('ifm', 'Technologie de sécurité'),
  true,
  'The security groups should appear on the IFM Technologie de sécurité category',
);
assert.equal(securityModule.shouldShowIFMCategorySubcategories?.('lenze', 'Technologie de sécurité'), false);

const visibilityModule = await import('./categoryPageVisibility.ts');
assert.deepEqual(
  visibilityModule.getCategoryPageVisibility({ brand: 'ifm', category: 'Technologie de sécurité' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The security page should show static subcategories without products',
);

const componentSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'IFMSecurityTechnologySubcategories.tsx'),
  'utf8',
);
assert(!componentSource.includes('<a'), 'Security subcategory cards should not render as links');
assert(!componentSource.includes('href='), 'Security subcategory cards should not expose link destinations');

const productGridSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'ProductGrid.tsx'),
  'utf8',
);
assert(productGridSource.includes("import IFMSecurityTechnologySubcategories from './IFMSecurityTechnologySubcategories';"));
assert(productGridSource.includes('<IFMSecurityTechnologySubcategories />'));
