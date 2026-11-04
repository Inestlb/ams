import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const hook = fs.readFileSync(path.join(process.cwd(), 'lib', 'hooks', 'useProducts.ts'), 'utf8');
const route = fs.readFileSync(path.join(process.cwd(), 'app', 'api', 'products', 'route.ts'), 'utf8');

assert.match(hook, /getProductCatalog/);
assert.match(hook, /totalItems/);
assert.match(hook, /getProductCategories\(filterOptions\.brand\)/);
assert.match(route, /const brand = searchParams\.get\('brand'\)/);
assert.match(route, /brand: brand \|\| undefined/);
