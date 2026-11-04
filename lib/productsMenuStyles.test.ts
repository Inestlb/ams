import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const source = fs.readFileSync(
  path.join(process.cwd(), 'components', 'layout', 'Navbar.tsx'),
  'utf8',
);

assert.match(source, /w-\[340px\]/);
assert.match(source, /absolute left-0 top-full w-\[340px\] pt-7/);
assert.match(source, /border border-\[#d9e2e8\] bg-white p-5/);
assert.match(source, /h-10 w-20 object-contain/);
assert.match(source, /h-10 w-20 shrink-0/);
assert.match(source, /className="flex items-center justify-center px-1 py-4/);
assert.match(
  source,
  /href="\/products"\s+className="block border-b border-\[#d9e2e8\] px-1 pb-5 transition-colors duration-200 hover:border-\[#c5d0d9\] hover:bg-\[#f7f9fb\]"/,
);
assert.doesNotMatch(source, /text-\[15px\] font-semibold text-\[#0b2f4f\]/);
assert.match(source, /border border-\[#d9e2e8\] bg-white/);
assert.doesNotMatch(source, /bg-\[#fffaf5\]/);
assert.doesNotMatch(source, /hover:bg-\[#fff8f1\]/);
