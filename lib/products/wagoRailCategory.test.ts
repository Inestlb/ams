import assert from 'node:assert/strict';
import {
  WAGO_RAIL_CATEGORY,
  WAGO_RAIL_CATEGORY_CONTENT,
  isWagoRailCategory,
} from './wagoRailCategory.ts';

assert.equal(WAGO_RAIL_CATEGORY, 'Bornes sur rail');
assert.equal(isWagoRailCategory('wago', WAGO_RAIL_CATEGORY), true);
assert.equal(isWagoRailCategory('lenze', WAGO_RAIL_CATEGORY), false);
assert.equal(isWagoRailCategory('wago', 'Bornes d\'installation'), false);
assert.equal(WAGO_RAIL_CATEGORY_CONTENT.title, 'Bornes sur rail');
assert.equal(
  WAGO_RAIL_CATEGORY_CONTENT.image,
  '/images/wago/bornes-sur-rail-clean.png',
);
assert.equal(WAGO_RAIL_CATEGORY_CONTENT.advantages.length, 6);
assert.match(
  WAGO_RAIL_CATEGORY_CONTENT.contactMessage,
  /demande de références/i,
);
assert.doesNotMatch(
  WAGO_RAIL_CATEGORY_CONTENT.contactMessage,
  /contactez-nous/i,
);
