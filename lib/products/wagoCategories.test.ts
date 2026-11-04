import assert from 'node:assert/strict';
import { WAGO_CATEGORIES } from '../types/index.ts';

assert.deepEqual(
  Object.keys(WAGO_CATEGORIES),
  ['Bornes sur rail', 'Système d\'alimentation', 'Bornes d\'installation'],
  'WAGO should expose the three requested product categories in display order',
);
