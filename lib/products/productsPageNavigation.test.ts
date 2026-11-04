import assert from 'node:assert/strict';
import { buildProductsUrl, resetProductsUrl } from './productsPageNavigation.ts';

const current = new URLSearchParams('brand=ifm&category=Capteurs&page=3');
const currentWithUnsupportedParameter = new URLSearchParams(
  'brand=ifm&foo=bar&category=Capteurs&page=3',
);

assert.equal(
  buildProductsUrl(current, { category: 'IO LINK' }),
  '/products?brand=ifm&category=IO+LINK&page=1',
);
assert.equal(
  buildProductsUrl(current, { brand: 'wago', catalog: true }),
  '/products?brand=wago&catalog=all&page=1',
);
assert.equal(
  buildProductsUrl(current, { brand: 'wago' }),
  '/products?brand=wago&page=1',
);
assert.equal(
  buildProductsUrl(current, { search: 'i550' }),
  '/products?brand=ifm&category=Capteurs&q=i550&page=1',
);
assert.equal(
  buildProductsUrl(current, { page: 2 }),
  '/products?brand=ifm&category=Capteurs&page=2',
);
assert.equal(
  buildProductsUrl(currentWithUnsupportedParameter, { page: 2 }),
  '/products?brand=ifm&category=Capteurs&page=2',
);
assert.equal(
  buildProductsUrl(current, { category: undefined, subcategory: undefined }),
  '/products?brand=ifm&page=1',
);
assert.equal(
  buildProductsUrl(
    new URLSearchParams('brand=ifm&category=Capteurs&subcategory=IO&page=4&q=i550'),
    { brand: '', category: '', subcategory: '', search: '' },
  ),
  '/products?page=1',
);
assert.equal(resetProductsUrl(), '/products');
