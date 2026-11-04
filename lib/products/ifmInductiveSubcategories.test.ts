import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  IFM_INDUCTIVE_SUBCATEGORIES,
  shouldShowIFMInductiveSubcategories,
} from './ifmInductiveSubcategories.ts';

const expectedNames = [
  'Détecteurs de distance haute précision / PProx',
  'Distance de commutation égale sur tous les métaux',
  'Applications industrielles, mobiles, de lubrifiants-réfrigérants',
  'Avec IO-Link',
  'Détecteurs tout inox',
  'Pour utilisation en zones aseptiques',
  'Utilisation dans des lubrifiants-réfrigérants',
  'Utilisation dans des engins mobiles',
  'Utilisation dans des applications de soudure',
  'Détecteur de sécurité',
  'Utilisation en zones explosibles',
  'Détecteurs pour espaces réduits',
  'Détecteurs analogiques',
  'Utilisation dans des fluides agressifs',
  'Détecteurs AC/DC et AC',
  'Détecteurs à grande portée',
  "Utilisation pour des températures ambiantes élevées jusqu'à 180 °C",
  'Détecteurs annulaires et détecteurs de petites pièces dans un tube',
  'Détecteurs à fente',
  'Détection sélective de métaux ferreux',
  'Détecteurs résistants à la pression',
];

interface IFMSubcategoriesModule {
  IFM_CAPACITIVE_SUBCATEGORIES: Array<{ id: string; name: string; image: string }>;
  shouldShowIFMCategorySubcategories: (brand: string | null, category?: string) => boolean;
}

const ifmSubcategoriesModule = await import('./ifmInductiveSubcategories.ts') as IFMSubcategoriesModule;

const expectedCapacitiveNames = [
  'Détection à travers de parois non métalliques',
  'Mesure de niveau capacitive sans contact avec le fluide',
  'Utilisation dans l’industrie plastique',
  'Utilisation en zones explosibles',
  'Utilisation dans les industrie électroniques et du semiconducteur',
  'Petits boîtiers parallélépipédiques',
  'Boîtier M12',
  'Avec IO-Link',
  'Portée augmentée pour le convoyage',
  'Détecteurs AC/DC',
  'Avec rampe de LED indiquant le seuil de commutation',
  'Détecteurs sensitifs à diamètre de 100 mm',
  'Détecteurs sensitifs capacitifs en boîtier M22',
  "Utilisation pour des températures de fluide élevées jusqu'à 250 °C",
  'Boîtier métallique',
];
const expectedCapacitiveIds = [
  '010', '020', '030', '040', '050', '060', '070', '080', '090', '100', '110', '120', '160', '140', '150',
];

assert.deepEqual(
  ifmSubcategoriesModule.IFM_CAPACITIVE_SUBCATEGORIES.map(({ name }) => name),
  expectedCapacitiveNames,
  'The IFM capacitive subcategories should match the source labels and order, excluding the all-products tile',
);
assert.deepEqual(
  ifmSubcategoriesModule.IFM_CAPACITIVE_SUBCATEGORIES.map(({ id }) => id),
  expectedCapacitiveIds,
  'The capacitive subcategory images should follow the matching IFM category ids and source order',
);

for (const subcategory of ifmSubcategoriesModule.IFM_CAPACITIVE_SUBCATEGORIES) {
  assert.match(subcategory.id, /^\d{3}$/);
  assert.match(subcategory.image, /^\/images\/ifm\/capacitive-subcategories\/.+\.avif$/);
  assert(!('href' in subcategory), 'Subcategories should not have clickable destinations');
  assert(
    fs.existsSync(path.join(process.cwd(), 'public', subcategory.image.slice(1))),
    `The image for "${subcategory.name}" should exist locally`,
  );
}

assert(
  !ifmSubcategoriesModule.IFM_CAPACITIVE_SUBCATEGORIES.some(({ name }) => name === 'Tous les détecteurs capacitifs'),
  'The all-capacitive-detectors tile should be excluded',
);

assert.equal(
  ifmSubcategoriesModule.shouldShowIFMCategorySubcategories('ifm', 'Détecteurs Capacitifs'),
  true,
  'The capacitive subcategories should appear only on the IFM capacitive-detectors category',
);
assert.equal(
  ifmSubcategoriesModule.shouldShowIFMCategorySubcategories('ifm', 'Détecteur Inductifs'),
  true,
);
assert.equal(
  ifmSubcategoriesModule.shouldShowIFMCategorySubcategories('ifm', 'Catégorie non prise en charge'),
  false,
);
assert.equal(
  ifmSubcategoriesModule.shouldShowIFMCategorySubcategories('lenze', 'Détecteurs Capacitifs'),
  false,
);

assert.deepEqual(
  IFM_INDUCTIVE_SUBCATEGORIES.map(({ name }) => name),
  expectedNames,
  'The IFM inductive subcategories should match the source labels and order',
);

for (const subcategory of IFM_INDUCTIVE_SUBCATEGORIES) {
  assert.match(subcategory.id, /^\d{3}$/);
  assert.match(subcategory.image, /^\/images\/ifm\/inductive-subcategories\/.+\.jpg$/);
  assert(!('href' in subcategory), 'Subcategories should not have clickable destinations');
  assert(
    fs.existsSync(path.join(process.cwd(), 'public', subcategory.image.slice(1))),
    `The image for "${subcategory.name}" should exist locally`,
  );
}

const subcategoryNames: readonly string[] = IFM_INDUCTIVE_SUBCATEGORIES.map(({ name }) => name);
assert(
  !subcategoryNames.includes('Tous les détecteurs inductifs'),
  'The all-inductive-detectors tile should be excluded',
);

assert.equal(
  shouldShowIFMInductiveSubcategories('ifm', 'Détecteur Inductifs'),
  true,
  'The subcategories should appear within the IFM inductive-detectors category',
);
assert.equal(shouldShowIFMInductiveSubcategories('ifm', 'Capteurs de température'), false);
assert.equal(shouldShowIFMInductiveSubcategories('lenze', 'Détecteur Inductifs'), false);
assert.equal(shouldShowIFMInductiveSubcategories('ifm', undefined), false);

const componentSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'IFMInductiveSubcategories.tsx'),
  'utf8',
);
assert(!componentSource.includes('<a'), 'Subcategory tiles should not render as links');
assert(!componentSource.includes('href='), 'Subcategory tiles should not expose link destinations');

const capacitiveComponentSource = fs.readFileSync(
  path.join(process.cwd(), 'components', 'products', 'IFMCapacitiveSubcategories.tsx'),
  'utf8',
);
assert(!capacitiveComponentSource.includes('<a'), 'Capacitive subcategory tiles should not render as links');
assert(!capacitiveComponentSource.includes('href='), 'Capacitive subcategory tiles should not expose link destinations');
