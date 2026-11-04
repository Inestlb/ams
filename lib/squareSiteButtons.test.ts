import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const read = (...segments: string[]) =>
  fs.readFileSync(path.join(root, ...segments), 'utf8');

const buttonSource = read('components', 'ui', 'button.tsx');
assert(!buttonSource.includes('rounded-md'), 'The shared Button primitive should not retain rounded-md');
assert(buttonSource.includes('rounded-none'), 'The shared Button primitive should use square corners');

const expectedSquareActions = [
  ['components/home/HeroSection.tsx', 'rounded-none bg-[#e47925]'],
  ['components/home/PartnersSection.tsx', 'rounded-none border-[#0b2f4f]/20'],
  ['components/maps/MapContainer.tsx', 'rounded-none bg-[#0b2f4f]'],
  ['app/(site)/blog/[slug]/page.tsx', 'className="rounded-none"'],
  ['components/layout/Navbar.tsx', 'rounded-none text-center'],
  ['components/ui/dialog.tsx', 'absolute top-4 right-4 rounded-none'],
  ['components/ui/sheet.tsx', 'absolute top-4 right-4 rounded-none'],
] as const;

for (const [relativePath, fragment] of expectedSquareActions) {
  assert(
    read(...relativePath.split('/')).includes(fragment),
    `${relativePath} should apply square corners to its action control`,
  );
}

for (const relativePath of [
  'components/FloatingMailButton.tsx',
  'components/MailButtonFixed.tsx',
  'components/SimpleMailButton.tsx',
]) {
  assert(
    read(...relativePath.split('/')).includes('rounded-full'),
    `${relativePath} should preserve the floating e-mail button's round shape`,
  );
}
