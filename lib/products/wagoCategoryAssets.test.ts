import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const projectRoot = process.cwd();
const componentPath = path.join(
  projectRoot,
  'components',
  'products',
  'WAGOCategoryCards.tsx',
);
const cleanAssetPath = path.join(
  projectRoot,
  'public',
  'images',
  'wago',
  'bornes-d-installation-clean.png',
);

assert(fs.existsSync(cleanAssetPath), 'The installation terminals card should have a cleaned image asset');

const componentSource = fs.readFileSync(componentPath, 'utf8');
assert(
  componentSource.includes('catalogView'),
  'WAGO cards should support catalog-view links without changing brand pages',
);
assert(
  componentSource.includes('/images/wago/bornes-d-installation-clean.png'),
  'The installation terminals card should use the cleaned image asset',
);
