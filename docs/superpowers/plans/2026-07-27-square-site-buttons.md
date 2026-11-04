# Square Site Buttons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every site button and button-styled action link square corners while preserving the three floating e-mail buttons as round controls.

**Architecture:** Change only Tailwind radius utilities on existing action controls. The shared `Button` primitive covers most controls; a small set of explicit CTA, action-link, and close-button overrides receives the same `rounded-none` class. A source-level test enumerates every intentional exception and guards the floating e-mail controls.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Node assertions.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `components/ui/button.tsx` | Establish square corners as the shared Button default and size-variant behavior. |
| `components/home/HeroSection.tsx` | Square the hero CTA override. |
| `components/home/PartnersSection.tsx` | Square the partner and contact CTA overrides. |
| `components/maps/MapContainer.tsx` | Square the Google Maps action link. |
| `app/(site)/blog/[slug]/page.tsx` | Square the share icon action. |
| `components/layout/Navbar.tsx` | Square the optional highlighted mobile action link. |
| `components/ui/dialog.tsx` | Square the dialog close button only, not dialog content. |
| `components/ui/sheet.tsx` | Square the sheet close button only, not sheet content. |
| `lib/squareSiteButtons.test.ts` | Verify all targeted actions are square and the floating e-mail controls remain round. |

### Task 1: Lock The Radius Contract With A Failing Test

**Files:**
- Create: `lib/squareSiteButtons.test.ts`

- [ ] **Step 1: Write the failing source-level regression test**

Create `lib/squareSiteButtons.test.ts`:

```ts
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
  ['components/home/PartnersSection.tsx', 'rounded-none bg-[#e47925]'],
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
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```bash
node --no-warnings lib/squareSiteButtons.test.ts
```

Expected: FAIL because `components/ui/button.tsx` still uses `rounded-md` and several direct action controls retain their previous radius classes.

### Task 2: Apply Square Corners Without Changing Any Other Style

**Files:**
- Modify: `components/ui/button.tsx:8-26`
- Modify: `components/home/HeroSection.tsx:66`
- Modify: `components/home/PartnersSection.tsx:107,131`
- Modify: `components/maps/MapContainer.tsx:59`
- Modify: `app/(site)/blog/[slug]/page.tsx:229`
- Modify: `components/layout/Navbar.tsx:271`
- Modify: `components/ui/dialog.tsx:66`
- Modify: `components/ui/sheet.tsx:75`

- [ ] **Step 1: Update the shared Button primitive**

In `components/ui/button.tsx`, make these exact substitutions:

```ts
// Base class: rounded-md -> rounded-none
"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium ..."

// sm variant: rounded-md -> rounded-none
sm: "h-8 rounded-none gap-1.5 px-3 has-[>svg]:px-2.5",

// lg variant: rounded-md -> rounded-none
lg: "h-10 rounded-none px-6 has-[>svg]:px-4",
```

- [ ] **Step 2: Update direct CTA and action-link overrides**

Make only these radius substitutions, preserving each adjacent class exactly:

```tsx
// components/home/HeroSection.tsx
className="rounded-none bg-[#e47925] px-7 py-6 text-base font-semibold text-white hover:bg-[#f18a3d]"

// components/home/PartnersSection.tsx
className="rounded-none border-[#0b2f4f]/20 px-6 text-[#0b2f4f] hover:border-[#e47925] hover:text-[#e47925]"
className="rounded-none bg-[#e47925] px-7 py-6 text-white hover:bg-[#f18a3d]"

// components/maps/MapContainer.tsx
className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-none bg-[#0b2f4f] px-3 py-2 text-xs font-medium text-white shadow-md transition-colors hover:bg-[#e47925]"

// app/(site)/blog/[slug]/page.tsx
<Button variant="outline" size="icon" className="rounded-none">

// components/layout/Navbar.tsx
rounded-none text-center
```

- [ ] **Step 3: Update close-button corners only**

In both `components/ui/dialog.tsx` and `components/ui/sheet.tsx`, replace `rounded-xs` with `rounded-none` on the `DialogPrimitive.Close` and `SheetPrimitive.Close` class strings. Do not change the `rounded-lg` dialog content container or any sheet container class.

- [ ] **Step 4: Verify protected exclusions before running tests**

Confirm that these exact class fragments remain unchanged:

```tsx
// components/FloatingMailButton.tsx and components/SimpleMailButton.tsx
rounded-full shadow-lg

// components/MailButtonFixed.tsx
rounded-full bg-[#e47925]
```

- [ ] **Step 5: Run focused checks**

Run:

```bash
node --no-warnings lib/squareSiteButtons.test.ts
npx tsc --noEmit
npx eslint components/ui/button.tsx components/home/HeroSection.tsx components/home/PartnersSection.tsx components/maps/MapContainer.tsx app/(site)/blog/[slug]/page.tsx components/layout/Navbar.tsx components/ui/dialog.tsx components/ui/sheet.tsx lib/squareSiteButtons.test.ts
```

Expected: every command exits 0.

- [ ] **Step 6: Commit the radius-only change**

```bash
git add components/ui/button.tsx components/home/HeroSection.tsx components/home/PartnersSection.tsx components/maps/MapContainer.tsx app/(site)/blog/[slug]/page.tsx components/layout/Navbar.tsx components/ui/dialog.tsx components/ui/sheet.tsx lib/squareSiteButtons.test.ts
git commit -m "style: square site buttons"
```

### Task 3: Full Verification And Visual QA

**Files:**
- Verify: all files listed in Tasks 1 and 2

- [ ] **Step 1: Run production validation**

Run:

```bash
git diff --check
node --no-warnings lib/squareSiteButtons.test.ts
npx tsc --noEmit
npx eslint components/ui/button.tsx components/home/HeroSection.tsx components/home/PartnersSection.tsx components/maps/MapContainer.tsx app/(site)/blog/[slug]/page.tsx components/layout/Navbar.tsx components/ui/dialog.tsx components/ui/sheet.tsx lib/squareSiteButtons.test.ts
npm run build
```

Expected: all commands exit 0 and the build reports `Compiled successfully`.

- [ ] **Step 2: Start the local application**

Run:

```bash
npm run dev
```

Expected: Next.js reports a local URL and reaches `Ready`.

- [ ] **Step 3: Verify representative square controls in the browser**

At desktop width, verify:

- `/` shows square hero and partner CTA buttons.
- `/products?brand=ifm` shows square category actions and product-grid controls.
- `/blog/<existing-slug>` shows a square share icon button when a blog article is available.
- A dialog or sheet close control has square corners.
- The floating e-mail button remains visibly round.
- Pages contain no framework error overlay and no relevant console errors.

- [ ] **Step 4: Capture evidence and clean up**

Save desktop screenshots outside the repository, reset any viewport override, finalize browser tabs, and stop the development server.
