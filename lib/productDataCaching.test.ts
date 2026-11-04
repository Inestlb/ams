import fs from 'fs';
import path from 'path';
import assert from 'assert';

const productsSource = fs.readFileSync(path.join(process.cwd(), 'data', 'products.ts'), 'utf8');

assert(productsSource.includes("import { cache } from 'react';"), 'Product data should use React cache for request-level memoization');
assert(productsSource.includes('export const getAllProducts = cache('), 'getAllProducts should be cached to avoid repeated catalogue parsing per request');
