import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const levelModule = await import('./ifmLevelSubcategories.ts') as {
  IFM_LEVEL_SUBCATEGORY_GROUPS: Array<{
    title: string;
    subcategories: Array<{ name: string; image: string; href?: string }>;
  }>;
};
const expectedGroups = [
  {
    title: 'Mesure continue',
    names: [
      'Mesure de niveau capacitive sans contact avec le fluide',
      'Utilisation dans le nettoyage et les lubrifiants-réfrigérants et les huiles hydrauliques',
      'Concept de sondes modulaire',
      'Concept de sondes modulaire pour applications aseptiques',
      'Capteurs de pression tout inox affleurants avec afficheur',
      'Manomètres à contact électroniques avec affichage analogique',
      'Transmetteurs de pression affleurants',
      'Sondes de niveau submersibles',
      'Détecteurs de distance laser pour mesure sans contact',
      'Détecteurs à ultrasons',
      'Mesure du niveau sans contact',
      'Mesure du niveau sans contact pour applications aseptiques',
    ],
  },
  {
    title: 'Contrôle de niveau TOR',
    names: [
      'Utilisation dans le nettoyage et les lubrifiants-réfrigérants et les huiles hydrauliques',
      'Utilisation dans des applications industrielles',
      'Utilisation dans des applications aseptiques',
      'Détecteurs capacitifs pour la détection du niveau limite',
      'Boîtiers de contrôle pour régulation de niveau',
      "Utilisation en zones à risque d'explosion",
    ],
  },
];

assert.deepEqual(
  levelModule.IFM_LEVEL_SUBCATEGORY_GROUPS.map(({ title, subcategories }) => ({
    title,
    names: subcategories.map(({ name }) => name),
  })),
  expectedGroups,
  'Level-sensor subcategories should match both screenshot sections and their order',
);

for (const { subcategories } of levelModule.IFM_LEVEL_SUBCATEGORY_GROUPS) {
  for (const { image, href } of subcategories) {
    assert.match(image, /^\/images\/ifm\/level-subcategories\/level-\d{2}\.webp$/);
    assert(
      fs.existsSync(path.join(process.cwd(), 'public', image.slice(1))),
      `The image for ${image} should exist locally`,
    );
    assert.equal(href, undefined, 'Level-sensor subcategories must not have clickable destinations');
  }
}

const { shouldShowIFMCategorySubcategories } = await import('./ifmInductiveSubcategories.ts');
assert.equal(shouldShowIFMCategorySubcategories('ifm', 'Capteurs de niveau'), true);
assert.equal(shouldShowIFMCategorySubcategories('lenze', 'Capteurs de niveau'), false);

const { getCategoryPageVisibility } = await import('./categoryPageVisibility.ts');
assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Capteurs de niveau' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The IFM level-sensors page should only show its category subcategories',
);
