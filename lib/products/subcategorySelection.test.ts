import assert from 'node:assert/strict';
import { filterProductsForSubcategory, getInitialSelectedSubcategory } from './subcategorySelection.ts';

const lenzeCategories = [
  'Variateurs et servovariateurs',
  'Motoréducteurs',
  'Moteurs',
  'Réducteurs',
];

for (const category of lenzeCategories) {
  assert.equal(
    getInitialSelectedSubcategory({ brand: 'lenze', category, requestedSubCategory: undefined }),
    undefined,
    `Tous les produits doit rester actif pour ${category}`
  );
}

assert.equal(
  getInitialSelectedSubcategory({
    brand: 'lenze',
    category: 'Moteurs',
    requestedSubCategory: 'Servomoteurs',
  }),
  'Servomoteurs'
);

const sampleProducts = [
  { id: '1', name: 'A', category: 'Moteurs', subcategory: 'Moteurs triphasés' },
  { id: '2', name: 'B', category: 'Moteurs', subcategory: 'Servomoteurs' },
  { id: '3', name: 'C', category: 'Moteurs', subcategory: 'Servomoteurs' },
];

const variateurProducts = [
  { id: '1', name: 'A', category: 'Variateurs et servovariateurs', subcategory: 'Variateurs de vitesse' },
  { id: '2', name: 'B', category: 'Variateurs et servovariateurs', subcategory: 'Servovariateurs' },
  { id: '3', name: 'C', category: 'Variateurs et servovariateurs', subcategory: 'Servovariateurs' },
];

assert.deepEqual(
  filterProductsForSubcategory(sampleProducts, 'Moteurs', undefined).map((product) => product.id),
  ['1', '2', '3'],
  'Tous les produits doit renvoyer toute la catégorie sans rendu intermédiaire'
);

assert.deepEqual(
  filterProductsForSubcategory(sampleProducts, 'Moteurs', 'Servomoteurs').map((product) => product.id),
  ['2', '3']
);

assert.deepEqual(
  filterProductsForSubcategory(sampleProducts, 'Moteurs', 'Servo-motoréducteurs').map((product) => product.id),
  ['1', '2', '3'],
  'Une sous-catégorie conservée depuis une autre catégorie ne doit pas vider la liste'
);

assert.deepEqual(
  filterProductsForSubcategory(variateurProducts, 'Variateurs et servovariateurs', undefined).map((product) => product.id),
  ['1', '2', '3'],
  'Tous les produits doit afficher tous les variateurs par défaut'
);

assert.deepEqual(
  filterProductsForSubcategory(variateurProducts, 'Variateurs et servovariateurs', 'Servovariateurs').map((product) => product.id),
  ['2', '3'],
  'Le compteur et la liste doivent suivre le filtre variateurs'
);
