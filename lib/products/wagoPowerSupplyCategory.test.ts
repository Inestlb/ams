import assert from 'node:assert/strict';
import {
  WAGO_POWER_SUPPLY_CATEGORY,
  WAGO_POWER_SUPPLY_CATEGORY_CONTENT,
  isWagoPowerSupplyCategory,
} from './wagoPowerSupplyCategory.ts';

assert.equal(WAGO_POWER_SUPPLY_CATEGORY, "Système d'alimentation");
assert.equal(
  isWagoPowerSupplyCategory('wago', WAGO_POWER_SUPPLY_CATEGORY),
  true,
);
assert.equal(
  isWagoPowerSupplyCategory('wago', 'Bornes sur rail'),
  false,
);
assert.equal(
  isWagoPowerSupplyCategory('lenze', WAGO_POWER_SUPPLY_CATEGORY),
  false,
);
assert.equal(
  WAGO_POWER_SUPPLY_CATEGORY_CONTENT.title,
  "Systèmes d'alimentation WAGO",
);
assert.equal(
  WAGO_POWER_SUPPLY_CATEGORY_CONTENT.image,
  '/images/wago/systeme-d-alimentation-clean.png',
);
assert.equal(WAGO_POWER_SUPPLY_CATEGORY_CONTENT.advantages.length, 3);
assert.match(
  WAGO_POWER_SUPPLY_CATEGORY_CONTENT.introduction,
  /degré croissant d'automatisation/i,
);
assert.match(
  WAGO_POWER_SUPPLY_CATEGORY_CONTENT.contactMessage,
  /demande de références/i,
);
assert.doesNotMatch(
  WAGO_POWER_SUPPLY_CATEGORY_CONTENT.contactMessage,
  /contactez-nous/i,
);
