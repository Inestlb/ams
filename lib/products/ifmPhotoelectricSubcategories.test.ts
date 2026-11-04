import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

interface PhotoelectricGroup {
  title: string;
  subcategories: Array<{ name: string; image: string }>;
}

interface IFMPhotoelectricModule {
  IFM_PHOTOELECTRIC_GROUPS?: PhotoelectricGroup[];
  shouldShowIFMCategorySubcategories?: (brand: string | null, category?: string) => boolean;
}

const photoelectricModule = await import('./ifmInductiveSubcategories.ts') as IFMPhotoelectricModule;

const expectedGroups = [
  {
    title: 'Capteurs photoélectriques',
    names: [
      "Boîtier M18 pour l'automatisation industrielle",
      'Boîtier M18 pour zones humides',
      "Boîtier M18 Cube pour l'automatisation industrielle",
      'Boîtier M18 Cube pour zones humides',
      "Boîtier parallélépipédique O5 pour l'automatisation industrielle",
      'Boîtier parallélépipédique O4 très grande portée',
      'Petit boîtier parallélépipédique O6',
      'Petit boîtier parallélépipédique O6 pour zones humides',
      'Utilisation dans la technologie du montage et de la manutention',
      'Utilisation dans des lubrifiants-réfrigérants',
      'Petit boîtier parallélépipédique O7',
      'Boîtier miniature O8',
      "Petit boîtier parallélépipédique OJ pour l'automatisation industrielle",
      'Type M18 en boîtier plastique',
      'Boîtier M18 avec émission de lumière latérale',
      'Utilisation en zones explosibles',
      'Détecteurs de distance type O1D',
      'Détecteurs de distance type O1D avec une portée de 75 m',
      'Détecteurs de distance type OMH',
      'Détecteurs de distance boîtier M30 avec utilisation intuitive',
      'Détecteurs de distance boîtier M30',
      'Détecteurs de distance type O5 avec afficheur',
      'Fourniture de la valeur de distance via IO-Link',
      "PMD Profiler pour la détection de profils d'objets",
      'Barrières de mesure',
    ],
  },
  {
    title: 'Fourches optiques / fourches optiques à 90°',
    names: ['Fourches optiques', 'Fourches optiques à 90°'],
  },
  {
    title: 'Fibres optiques et amplificateurs',
    names: [
      'Amplificateurs pour fibres optiques acryliques',
      'Amplificateurs pour fibres optiques verre',
      'Amplificateurs pour fibres optiques plastiques multivoies',
      'Amplificateurs pour fibres optiques multivoies en verre',
      'Toutes les fibres optiques',
      'Fibres optiques plastiques',
      'Fibres optiques verre',
      'Fibres optiques pour les zones à hautes températures',
    ],
  },
  {
    title: 'Capteurs photoélectriques pour applications spécifiques',
    names: [
      'Détecteurs de couleurs haute résolution',
      'Détecteurs de contraste',
      'Détection de verre et de film transparent',
      'Détection de niveau sans contact',
    ],
  },
];

assert.deepEqual(
  photoelectricModule.IFM_PHOTOELECTRIC_GROUPS?.map(({ title, subcategories }) => ({
    title,
    names: subcategories.map(({ name }) => name),
  })),
  expectedGroups,
  'The Cellule Opto subcategories should match the four screenshot groups, order, and exclusions',
);

const allPhotoelectricSubcategories = photoelectricModule.IFM_PHOTOELECTRIC_GROUPS?.flatMap(
  ({ subcategories }) => subcategories,
) ?? [];

assert.equal(allPhotoelectricSubcategories.length, 39);
assert(
  !allPhotoelectricSubcategories.some(({ name }) =>
    name === 'Tous les capteurs photoélectriques' ||
    name === 'Tous les amplificateurs pour fibres optiques'
  ),
  'The two excluded all-products tiles should not be present',
);

for (const { image } of allPhotoelectricSubcategories) {
  assert.match(image, /^\/images\/ifm\/photoelectric-subcategories\/.+\.(?:webp|avif|png)$/);
  assert(
    fs.existsSync(path.join(process.cwd(), 'public', image.slice(1))),
    `The screenshot crop ${image} should exist locally`,
  );
}

assert.equal(
  photoelectricModule.shouldShowIFMCategorySubcategories?.('ifm', 'Cellule Opto'),
  true,
  'The grouped subcategories should appear on the IFM Cellule Opto page',
);
assert.equal(photoelectricModule.shouldShowIFMCategorySubcategories?.('ifm', 'Détecteur Inductifs'), true);
assert.equal(photoelectricModule.shouldShowIFMCategorySubcategories?.('ifm', 'Détecteurs Capacitifs'), true);
assert.equal(photoelectricModule.shouldShowIFMCategorySubcategories?.('lenze', 'Cellule Opto'), false);
assert.equal(photoelectricModule.shouldShowIFMCategorySubcategories?.('ifm', 'Catégorie non prise en charge'), false);

const visibilityModule = await import('./categoryPageVisibility.ts');
assert.deepEqual(
  visibilityModule.getCategoryPageVisibility({ brand: 'ifm', category: 'Cellule Opto' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'Cellule Opto should show the grouped subcategories without product results',
);
assert.equal(
  visibilityModule.getCategoryPageVisibility({ brand: 'ifm', category: 'Catégorie non prise en charge' }).showProductResults,
  true,
  'Other IFM categories should keep their product results',
);
