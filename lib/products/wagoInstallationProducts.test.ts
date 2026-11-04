import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {
  isWagoProduct,
  sortProductResults,
  WAGO_INSTALLATION_PRODUCTS,
} from './wagoInstallationProducts.ts';

const expectedIds = [
  'wago-221-423',
  'wago-221-413',
  'wago-221-412',
  'wago-221-415',
  'wago-2273-203',
  'wago-221-2411',
  'wago-2273-205',
  'wago-221-613',
  'wago-221-612',
  'wago-221-615',
  'wago-887-952',
];

const expectedNames = [
  'Borne de raccordement avec levier (221-423)',
  'Borne de raccordement avec levier (221-413)',
  'Borne de raccordement avec levier (221-412)',
  'Borne de raccordement avec levier (221-415)',
  'Connecteur de passage à enficher (2273-203)',
  'Borne à leviers Inline (221-2411)',
  'Connecteur de passage à enficher (2273-205)',
  'Borne de raccordement avec levier (221-613)',
  'Borne de raccordement avec levier (221-612)',
  'Borne de raccordement avec levier (221-615)',
  'Kit de bornes de connexion (887-952)',
];

assert.deepEqual(
  WAGO_INSTALLATION_PRODUCTS.map((product) => product.id),
  expectedIds,
  'The installation category should contain the 11 requested WAGO references in order',
);
assert.deepEqual(
  WAGO_INSTALLATION_PRODUCTS.map((product) => product.name),
  expectedNames,
  'The installation references should use the corresponding WAGO page titles',
);

assert.equal(
  isWagoProduct({ id: 'wago-221-423' }),
  true,
  'WAGO products should be recognized by their catalogue IDs even when the title omits the brand',
);
assert.equal(
  isWagoProduct({ id: 'other-221-423' }),
  false,
  'Non-WAGO catalogue IDs should not be classified as WAGO products',
);

const requestedProductOrder = [{ name: 'Z - first in request' }, { name: 'A - second in request' }];
assert.deepEqual(
  sortProductResults(requestedProductOrder, 'wago', "Bornes d'installation"),
  requestedProductOrder,
  'The installation category should retain the order in which references were requested',
);
assert.deepEqual(
  sortProductResults(requestedProductOrder, 'wago', "Système d'alimentation"),
  [{ name: 'A - second in request' }, { name: 'Z - first in request' }],
  'Other product result sets should keep their alphabetical sort',
);

for (const product of WAGO_INSTALLATION_PRODUCTS) {
  assert.ok(product.id.startsWith('wago-'));
  assert.equal(product.category, "Bornes d'installation");
  assert.ok(product.name.trim(), `${product.id} should have a title`);
  assert.equal(typeof product.description, 'string');
  if (product.id !== 'wago-887-952') {
    assert.ok(product.description.trim(), `${product.id} should have the WAGO description`);
    assert.ok(
      product.description.includes('\n\n'),
      `${product.id} description should be split into readable paragraphs`,
    );
  }
  assert.doesNotMatch(product.description, /<[^>]+>/, `${product.id} description should be plain text`);
  assert.deepEqual(product.specifications, {}, `${product.id} should not add specifications`);

  for (const image of [product.image, ...(product.additionalImages ?? [])]) {
    assert.match(image, /^\/images\/wago\/installation-products\//);
    assert.ok(
      fs.existsSync(path.join(process.cwd(), 'public', image.slice(1))),
      `${product.id} image should exist locally: ${image}`,
    );
  }
}

assert.equal(
  WAGO_INSTALLATION_PRODUCTS.find((product) => product.id === 'wago-887-952')?.description,
  '',
  'The kit reference should not have an invented description when WAGO provides none',
);
assert.ok(
  WAGO_INSTALLATION_PRODUCTS.find((product) => product.id === 'wago-221-423')?.description.startsWith(
    'La borne à levier portant le numéro d’article 221-423, permet un branchement facile et sûr.',
  ),
  'WAGO descriptions should use the source product copy without adding a separate editorial intro',
);
assert.ok(
  WAGO_INSTALLATION_PRODUCTS.find((product) => product.id === 'wago-221-2411')?.description.includes(
    'WAGO’s 221 Series Splicing Connector with levers impresses with its innovative design',
  ),
  'The full source description should be retained when WAGO provides French and English copy',
);
