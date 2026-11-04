import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const searchSource = fs.readFileSync(
  path.join(root, 'components', 'layout', 'NavbarSearch.tsx'),
  'utf8',
);
const languageSource = fs.readFileSync(
  path.join(root, 'components', 'layout', 'LanguageSelector.tsx'),
  'utf8',
);

const occurrences = (source: string, fragment: string) =>
  source.split(fragment).length - 1;

assert.equal(
  occurrences(searchSource, 'rounded-none'),
  5,
  'The two inputs and three icon buttons should use square corners',
);
assert(!searchSource.includes('rounded-lg'), 'NavbarSearch should not retain rounded-lg');
assert(!searchSource.includes('rounded-md'), 'NavbarSearch should not retain rounded-md');
assert(!searchSource.includes('rounded-full'), 'NavbarSearch should not retain rounded-full');
assert.equal(
  occurrences(searchSource, 'placeholder:text-white'),
  2,
  'Both search render paths should use a solid-white placeholder',
);

const searchIconClasses = [...searchSource.matchAll(/<Search className="([^"]+)"/g)]
  .map((match) => match[1]);
assert.equal(searchIconClasses.length, 2, 'NavbarSearch should render two search icons');
assert(
  searchIconClasses.every((className) => className.split(' ').includes('text-white')),
  'Both search icons should use solid white',
);

assert.equal(
  occurrences(languageSource, 'rounded-none'),
  2,
  'Both language-selector render paths should use square corners',
);
assert(!languageSource.includes('rounded-lg'), 'LanguageSelector should not retain rounded-lg');
