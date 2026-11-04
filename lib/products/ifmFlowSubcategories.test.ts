import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const flowModule = await import('./ifmFlowSubcategories.ts') as {
  IFM_FLOW_SUBCATEGORY_GROUPS: Array<{
    title: string;
    subcategories: Array<{ name: string; image: string; href?: string }>;
  }>;
};
const expectedGroups = [
  {
    title: 'Liquides',
    names: [
      'Débitmètres électromagnétiques',
      'Débitmètres vortex avec afficheur',
      'Capteurs mécatroniques avec afficheur',
      'Capteurs de débit compacts avec afficheur',
      'Capteurs de débit compacts en boîtier inox',
      'Capteurs de débit compacts pour zones aseptiques',
      'Capteurs de débit en concept mécanique modulaire',
      'Capteurs mécatroniques',
      'Débitmètres mécatroniques dans les applications haute pression',
      'Débitmètres vortex',
      'Boîtiers de contrôle',
      'Débitmètres à ultrasons',
      'Débitmètres à pince',
      'Tableau de commande pour eau de refroidissement',
    ],
  },
  {
    title: 'Milieu gazeux',
    names: [
      "Systèmes de mesure de la consommation d'air comprimé et de gaz industriels",
      'Capteurs de débit en concept mécanique modulaire',
      "Capteurs de débit d'air",
      'Boîtiers de contrôle',
      'Capteurs de contrôle de plaquage',
      'Appareil portatif pour la localisation de fuites',
    ],
  },
];

assert.deepEqual(
  flowModule.IFM_FLOW_SUBCATEGORY_GROUPS.map(({ title, subcategories }) => ({
    title,
    names: subcategories.map(({ name }) => name),
  })),
  expectedGroups,
  'Flow subcategories should match both screenshot sections and their order',
);

let imageIndex = 0;
for (const { subcategories } of flowModule.IFM_FLOW_SUBCATEGORY_GROUPS) {
  for (const { image, href } of subcategories) {
    imageIndex += 1;
    assert.equal(
      image,
      `/images/ifm/flow-subcategories/flow-${String(imageIndex).padStart(2, '0')}.webp`,
    );
    assert(
      fs.existsSync(path.join(process.cwd(), 'public', image.slice(1))),
      `The screenshot crop ${image} should exist locally`,
    );
    assert.equal(href, undefined, 'Flow subcategories must not have clickable destinations');
  }
}
assert.equal(imageIndex, 20, 'The two flow categories should contain 20 subcategory tiles');

const { IFM_FLOW_CATEGORY, shouldShowIFMCategorySubcategories } = await import('./ifmInductiveSubcategories.ts');
assert.equal(IFM_FLOW_CATEGORY, 'Capteurs de débit / débitmètres');
assert.equal(shouldShowIFMCategorySubcategories('ifm', IFM_FLOW_CATEGORY), true);
assert.equal(shouldShowIFMCategorySubcategories('lenze', IFM_FLOW_CATEGORY), false);

const { getCategoryPageVisibility } = await import('./categoryPageVisibility.ts');
assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm', category: IFM_FLOW_CATEGORY }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The IFM flow-sensors page should only show its static subcategories',
);
