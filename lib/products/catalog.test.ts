import assert from 'node:assert/strict';
import {
  PRODUCTS_PER_PAGE,
  normalizeProductPage,
  paginateProducts,
} from './catalog.ts';

assert.equal(PRODUCTS_PER_PAGE, 24);
assert.equal(normalizeProductPage(undefined), 1);
assert.equal(normalizeProductPage('0'), 1);
assert.equal(normalizeProductPage('-2'), 1);
assert.equal(normalizeProductPage('abc'), 1);
assert.equal(normalizeProductPage('3'), 3);

const products = Array.from({ length: 49 }, (_, index) => `product-${index + 1}`);
assert.deepEqual(paginateProducts(products, 1), {
  products: products.slice(0, 24),
  total: 49,
  page: 1,
  totalPages: 3,
});
assert.deepEqual(paginateProducts(products, 3), {
  products: products.slice(48),
  total: 49,
  page: 3,
  totalPages: 3,
});
assert.deepEqual(paginateProducts(products, 99), {
  products: products.slice(48),
  total: 49,
  page: 3,
  totalPages: 3,
});
