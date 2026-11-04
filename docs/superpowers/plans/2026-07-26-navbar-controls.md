# Navbar Controls Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the navbar search and language controls the same square corners as `Voir les produits`, with a solid-white search placeholder and icon.

**Architecture:** Make class-only changes in the two existing navbar control components so SSR and hydrated markup remain visually consistent. Protect the requested visual contract with a focused source-level regression test, then verify the real page through the in-app browser.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Node assertions.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `components/layout/NavbarSearch.tsx` | Search input, clear action, and search action styling in SSR and hydrated states. |
| `components/layout/LanguageSelector.tsx` | Language-control styling in SSR and hydrated states. |
| `lib/navbarControlsStyles.test.ts` | Regression checks for square corners and white search content. |

### Task 1: Style And Test The Navbar Controls

**Files:**
- Create: `lib/navbarControlsStyles.test.ts`
- Modify: `components/layout/NavbarSearch.tsx`
- Modify: `components/layout/LanguageSelector.tsx`

- [ ] **Step 1: Write the failing style-contract test**

Create `lib/navbarControlsStyles.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```bash
node --no-warnings lib/navbarControlsStyles.test.ts
```

Expected: FAIL because `NavbarSearch` has no `rounded-none` classes and still uses translucent placeholder/search-icon colors.

- [ ] **Step 3: Update `NavbarSearch` with square corners and white search content**

In both `Input` class strings in `components/layout/NavbarSearch.tsx`:

```tsx
className="pr-16 h-10 text-[15px] bg-white/10 hover:bg-white/15 border-white/15 text-white focus:border-[#e47925] focus:ring-[#e47925]/25 rounded-none transition-colors placeholder:text-white"
```

Use this class on the pre-hydration search button:

```tsx
className="h-8 w-8 hover:bg-white/10 rounded-none"
```

Use this class on both hydrated icon buttons:

```tsx
className="h-8 w-8 hover:bg-white/10 rounded-none"
```

Use this class on both `Search` icons:

```tsx
className="h-[18px] w-[18px] text-white"
```

Keep the `X` icon's existing muted-to-white class unchanged.

- [ ] **Step 4: Update both `LanguageSelector` render paths**

In `components/layout/LanguageSelector.tsx`, replace `rounded-lg` with `rounded-none` in the static and hydrated outer containers. Keep every other class and interaction unchanged.

- [ ] **Step 5: Run the focused test and static validation**

Run:

```bash
node --no-warnings lib/navbarControlsStyles.test.ts
npx tsc --noEmit
npx eslint components/layout/NavbarSearch.tsx components/layout/LanguageSelector.tsx lib/navbarControlsStyles.test.ts
```

Expected: the regression test, TypeScript, and scoped ESLint all exit 0.

- [ ] **Step 6: Commit the navbar styling**

```bash
git add components/layout/NavbarSearch.tsx components/layout/LanguageSelector.tsx lib/navbarControlsStyles.test.ts
git commit -m "style: square navbar controls"
```

### Task 2: Production And Visual Verification

**Files:**
- Verify: `components/layout/NavbarSearch.tsx`
- Verify: `components/layout/LanguageSelector.tsx`

- [ ] **Step 1: Run final repository checks**

Run:

```bash
git diff --check
node --no-warnings lib/navbarControlsStyles.test.ts
npx tsc --noEmit
npx eslint components/layout/NavbarSearch.tsx components/layout/LanguageSelector.tsx lib/navbarControlsStyles.test.ts
npm run build
```

Expected: every command exits 0 and the build reports `Compiled successfully`.

- [ ] **Step 2: Start the application**

Run:

```bash
npm run dev
```

Expected: Next.js reports a local URL and reaches `Ready`.

- [ ] **Step 3: Verify the navbar in the in-app browser**

Open `/products?brand=ifm` at desktop width and confirm:

- The page title and product content render without a framework overlay.
- The search input and language selector have computed `border-radius: 0px`.
- The hydrated placeholder color and search-icon color are solid white.
- Search and language-control dimensions and spacing are unchanged.
- The console contains no relevant errors.

- [ ] **Step 4: Exercise the search control**

Enter a short query in the navbar search input and verify the entered text remains white. Clear the query and confirm the white placeholder and search icon return without layout shift.

- [ ] **Step 5: Capture screenshot evidence and stop the development server**

Capture a desktop viewport screenshot outside the repository, then stop the running development server. Reset any temporary viewport override before finishing.
