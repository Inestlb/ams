# IFM Category Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the IFM product-category filters with a Lenze-style category-card overview while keeping IFM filters hidden on selected category pages.

**Architecture:** Store the ordered IFM category contract in the existing shared types module, add a small pure helper for product-page visibility rules, and render a dedicated `IFMCategoryCards` component from `ProductGrid`. The helper keeps brand/category behavior testable without mounting React, while the component stays visually aligned with `LenzeCategoryCards`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide React, Node assertions.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `lib/types/index.ts` | Define the ordered IFM category contract used by navigation. |
| `lib/products/ifmCategories.test.ts` | Verify the exact 14 IFM labels and their order. |
| `lib/products/categoryPageVisibility.ts` | Compute overview, generic-filter, and product-result visibility from brand/category state. |
| `lib/products/categoryPageVisibility.test.ts` | Verify IFM, Lenze, WAGO, and unbranded visibility rules. |
| `components/products/IFMCategoryCards.tsx` | Render the Lenze-format IFM category-card grid with the neutral logo visual. |
| `lib/products/ifmCategoryCardsStructure.test.ts` | Verify the IFM component's required navigation and presentation contract. |
| `components/products/ProductGrid.tsx` | Select IFM/Lenze category overviews and hide generic IFM filters while preserving product results. |
| `lib/products/ifmProductGridIntegration.test.ts` | Verify that ProductGrid uses the visibility helper and IFM card component. |

### Task 1: Update The IFM Category Contract

**Files:**
- Create: `lib/products/ifmCategories.test.ts`
- Modify: `lib/types/index.ts:39-59`

- [ ] **Step 1: Write the failing ordered-category test**

Create `lib/products/ifmCategories.test.ts`:

```ts
import assert from 'node:assert/strict';

const typesModuleUrl = new URL('../types/index.ts', import.meta.url).href;
const { IFM_CATEGORIES } = await import(typesModuleUrl) as {
  IFM_CATEGORIES: Record<string, string>;
};

const expectedCategories = [
  'Détecteur Inductifs',
  'Détecteurs Capacitifs',
  'Cellule Opto',
  'Détecteurs à ultrasons',
  'Détecteurs pour vannes',
  'Détecteurs pour vérins',
  'Capteurs de pression / Capteurs de dépression',
  'Capteurs de niveau',
  'Capteurs de débit / débitmètres',
  'Capteurs de température',
  'IO LINK',
  'Communication Industrielle ASI BUS',
  'Technologie de sécurité',
  'Technologie de connexion',
];

assert.deepEqual(
  Object.values(IFM_CATEGORIES),
  expectedCategories,
  'IFM categories should match the approved labels and order',
);
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
node lib/products/ifmCategories.test.ts
```

Expected: FAIL because `IFM_CATEGORIES` still contains the previous eight generic IFM categories.

- [ ] **Step 3: Replace the IFM type and category record**

Replace the IFM section in `lib/types/index.ts` with:

```ts
// Types pour les catégories de produits IFM
export const IFM_CATEGORIES = {
  'Détecteur Inductifs': 'Détecteur Inductifs',
  'Détecteurs Capacitifs': 'Détecteurs Capacitifs',
  'Cellule Opto': 'Cellule Opto',
  'Détecteurs à ultrasons': 'Détecteurs à ultrasons',
  'Détecteurs pour vannes': 'Détecteurs pour vannes',
  'Détecteurs pour vérins': 'Détecteurs pour vérins',
  'Capteurs de pression / Capteurs de dépression': 'Capteurs de pression / Capteurs de dépression',
  'Capteurs de niveau': 'Capteurs de niveau',
  'Capteurs de débit / débitmètres': 'Capteurs de débit / débitmètres',
  'Capteurs de température': 'Capteurs de température',
  'IO LINK': 'IO LINK',
  'Communication Industrielle ASI BUS': 'Communication Industrielle ASI BUS',
  'Technologie de sécurité': 'Technologie de sécurité',
  'Technologie de connexion': 'Technologie de connexion',
} as const;

export type IFMCategory = keyof typeof IFM_CATEGORIES;
```

- [ ] **Step 4: Run the focused test and TypeScript validation**

Run:

```bash
node lib/products/ifmCategories.test.ts
npx tsc --noEmit
```

Expected: the category test exits 0 and TypeScript reports no errors.

- [ ] **Step 5: Commit the category contract**

```bash
git add lib/types/index.ts lib/products/ifmCategories.test.ts
git commit -m "feat: define IFM product categories"
```

### Task 2: Add Testable Category-Page Visibility Rules

**Files:**
- Create: `lib/products/categoryPageVisibility.test.ts`
- Create: `lib/products/categoryPageVisibility.ts`

- [ ] **Step 1: Write the failing visibility test**

Create `lib/products/categoryPageVisibility.test.ts`:

```ts
import assert from 'node:assert/strict';

interface CategoryPageVisibility {
  showBrandCategoryOverview: boolean;
  showGenericCategoryFilter: boolean;
  showProductResults: boolean;
}

interface VisibilityModule {
  getCategoryPageVisibility(input: {
    brand: string | null;
    category?: string;
  }): CategoryPageVisibility;
}

const moduleUrl = new URL('./categoryPageVisibility.ts', import.meta.url).href;
const { getCategoryPageVisibility } = await import(moduleUrl) as VisibilityModule;

assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm' }),
  {
    showBrandCategoryOverview: true,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The IFM root page should show only category cards',
);

assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Capteurs de niveau' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: true,
  },
  'A selected IFM category should hide generic filters and show results',
);

assert.deepEqual(
  getCategoryPageVisibility({ brand: 'lenze' }),
  {
    showBrandCategoryOverview: true,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The Lenze root page should retain its category-card overview',
);

assert.deepEqual(
  getCategoryPageVisibility({ brand: 'wago' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: true,
    showProductResults: true,
  },
  'WAGO should retain the existing generic filters and product results',
);

assert.deepEqual(
  getCategoryPageVisibility({ brand: null }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: true,
    showProductResults: true,
  },
  'The unbranded products page should retain its existing behavior',
);
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
node lib/products/categoryPageVisibility.test.ts
```

Expected: FAIL with `ERR_MODULE_NOT_FOUND` because `categoryPageVisibility.ts` does not exist.

- [ ] **Step 3: Implement the minimal visibility helper**

Create `lib/products/categoryPageVisibility.ts`:

```ts
interface CategoryPageVisibilityInput {
  brand: string | null;
  category?: string;
}

export interface CategoryPageVisibility {
  showBrandCategoryOverview: boolean;
  showGenericCategoryFilter: boolean;
  showProductResults: boolean;
}

export function getCategoryPageVisibility({
  brand,
  category,
}: CategoryPageVisibilityInput): CategoryPageVisibility {
  const showBrandCategoryOverview =
    !category && (brand === 'lenze' || brand === 'ifm');

  return {
    showBrandCategoryOverview,
    showGenericCategoryFilter:
      !showBrandCategoryOverview && brand !== 'ifm',
    showProductResults: !showBrandCategoryOverview,
  };
}
```

- [ ] **Step 4: Run the focused test and TypeScript validation**

Run:

```bash
node lib/products/categoryPageVisibility.test.ts
npx tsc --noEmit
```

Expected: the visibility test exits 0 and TypeScript reports no errors.

- [ ] **Step 5: Commit the visibility helper**

```bash
git add lib/products/categoryPageVisibility.ts lib/products/categoryPageVisibility.test.ts
git commit -m "test: define product category page visibility"
```

### Task 3: Build The IFM Category Cards

**Files:**
- Create: `lib/products/ifmCategoryCardsStructure.test.ts`
- Create: `components/products/IFMCategoryCards.tsx`

- [ ] **Step 1: Write the failing component-contract test**

Create `lib/products/ifmCategoryCardsStructure.test.ts`:

```ts
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const componentPath = path.join(
  process.cwd(),
  'components',
  'products',
  'IFMCategoryCards.tsx',
);

assert(
  fs.existsSync(componentPath),
  'IFMCategoryCards should exist as a dedicated component',
);

const source = fs.readFileSync(componentPath, 'utf8');

assert(source.includes('Object.values(IFM_CATEGORIES)'), 'Cards should use the shared ordered category contract');
assert(source.includes('/images/logo-ifm.svg'), 'Cards should use the approved neutral IFM logo visual');
assert(source.includes('brand=ifm&category='), 'Cards should link to IFM category URLs');
assert(source.includes('encodeURIComponent(category)'), 'Category names should be URL encoded');
assert(source.includes('grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'), 'The grid should match the Lenze responsive format');
assert(source.includes('Catégories de produits'), 'The overview should use the Lenze section heading');
assert(source.includes('Voir les produits'), 'Every card should expose the product navigation action');
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
node lib/products/ifmCategoryCardsStructure.test.ts
```

Expected: FAIL with `IFMCategoryCards should exist as a dedicated component`.

- [ ] **Step 3: Implement the IFM category-card component**

Create `components/products/IFMCategoryCards.tsx`:

```tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IFM_CATEGORIES, IFMCategory } from '@/lib/types';

const ifmCategories = Object.values(IFM_CATEGORIES) as IFMCategory[];

const categoryDescriptions: Record<IFMCategory, string> = {
  'Détecteur Inductifs': 'Détection sans contact des objets métalliques pour les applications industrielles.',
  'Détecteurs Capacitifs': 'Détection fiable des matériaux solides, liquides et pulvérulents.',
  'Cellule Opto': 'Détection optique précise des objets, des positions et des contrastes.',
  'Détecteurs à ultrasons': 'Mesure et détection sans contact, indépendamment de la couleur ou de la surface.',
  'Détecteurs pour vannes': 'Surveillance fiable de la position des vannes industrielles.',
  'Détecteurs pour vérins': 'Contrôle de position pour les vérins pneumatiques et hydrauliques.',
  'Capteurs de pression / Capteurs de dépression': 'Surveillance précise des pressions positives et négatives dans les installations.',
  'Capteurs de niveau': 'Contrôle continu ou ponctuel du niveau des liquides et des matières en vrac.',
  'Capteurs de débit / débitmètres': 'Mesure et surveillance du débit dans les circuits et processus industriels.',
  'Capteurs de température': 'Mesure fiable de la température des fluides, machines et installations.',
  'IO LINK': 'Communication intelligente entre les capteurs, les actionneurs et l’automatisation.',
  'Communication Industrielle ASI BUS': 'Solutions de communication AS-Interface pour les équipements de terrain.',
  'Technologie de sécurité': 'Solutions de détection et de contrôle pour la sécurité des machines.',
  'Technologie de connexion': 'Connecteurs, câbles et accessoires pour des raccordements industriels fiables.',
};

export default function IFMCategoryCards() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xl font-semibold text-[#0b2f4f]">Catégories de produits</h2>
        <div className="h-px flex-1 bg-[#e47925] opacity-40" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {ifmCategories.map((category) => (
          <Link
            key={category}
            href={`/products?brand=ifm&category=${encodeURIComponent(category)}`}
            className="block hover:no-underline"
          >
            <div className="h-full border border-[#cacdcf] bg-white hover:border-[#0b2f4f] transition-colors flex flex-col group/card">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f8f9fa]">
                <Image
                  src="/images/logo-ifm.svg"
                  alt="IFM"
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 90vw"
                  className="object-contain p-10 transition-transform duration-300 group-hover/card:scale-[1.03]"
                />
              </div>
              <div className="border-t border-[#cacdcf] p-4 flex flex-col flex-1">
                <h3 className="min-h-10 text-[15px] font-semibold leading-tight text-[#0b2f4f] mb-2 line-clamp-2 group-hover/card:text-[#e47925]">
                  {category}
                </h3>
                <p className="text-[13px] text-[#6b7280] line-clamp-2">
                  {categoryDescriptions[category]}
                </p>
              </div>
              <div className="border-t border-[#cacdcf] px-4 py-3">
                <span className="inline-flex items-center justify-center w-full rounded-none border border-[#0b2f4f] text-[13px] font-medium py-2.5 px-4 text-[#0b2f4f] group-hover/card:bg-[#e47925] group-hover/card:border-[#e47925] group-hover/card:text-white">
                  Voir les produits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the focused test and TypeScript validation**

Run:

```bash
node lib/products/ifmCategoryCardsStructure.test.ts
npx tsc --noEmit
```

Expected: the component-contract test exits 0 and TypeScript reports no errors.

- [ ] **Step 5: Commit the IFM cards**

```bash
git add components/products/IFMCategoryCards.tsx lib/products/ifmCategoryCardsStructure.test.ts
git commit -m "feat: add IFM category cards"
```

### Task 4: Integrate IFM Navigation Into ProductGrid

**Files:**
- Create: `lib/products/ifmProductGridIntegration.test.ts`
- Modify: `components/products/ProductGrid.tsx:1-330`

- [ ] **Step 1: Write the failing ProductGrid integration test**

Create `lib/products/ifmProductGridIntegration.test.ts`:

```ts
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const productGridPath = path.join(
  process.cwd(),
  'components',
  'products',
  'ProductGrid.tsx',
);
const source = fs.readFileSync(productGridPath, 'utf8');

assert(source.includes("import IFMCategoryCards from './IFMCategoryCards';"), 'ProductGrid should import IFMCategoryCards');
assert(source.includes('getCategoryPageVisibility'), 'ProductGrid should use the tested visibility helper');
assert(source.includes('<IFMCategoryCards />'), 'ProductGrid should render the IFM category overview');
assert(source.includes('showGenericCategoryFilter'), 'ProductGrid should explicitly control generic filter visibility');
assert(source.includes('showProductResults'), 'ProductGrid should keep IFM result visibility independent from filters');
assert(!source.includes('const [showFilters, setShowFilters]'), 'ProductGrid should not couple navigation and results in showFilters state');
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
node lib/products/ifmProductGridIntegration.test.ts
```

Expected: FAIL because ProductGrid does not import or render `IFMCategoryCards`.

- [ ] **Step 3: Update imports and remove derived `showFilters` state**

In `components/products/ProductGrid.tsx`:

```tsx
import { useMemo, useState, useEffect } from 'react';
import IFMCategoryCards from './IFMCategoryCards';
import { getCategoryPageVisibility } from '@/lib/products/categoryPageVisibility';
```

Remove:

```tsx
const [showFilters, setShowFilters] = useState(true);
```

Remove the effect that calls `setShowFilters` from `brand` and `filterOptions.category`. Keep the effect that synchronizes `selectedSubCategory`.

Remove both remaining `setShowFilters(...)` calls from `handleCategorySelect` and the empty-state reset button.

- [ ] **Step 4: Derive navigation and result visibility**

Immediately after `hasSubcategories` is calculated, add:

```tsx
const {
  showBrandCategoryOverview,
  showGenericCategoryFilter,
  showProductResults,
} = getCategoryPageVisibility({
  brand,
  category: filterOptions.category,
});
```

- [ ] **Step 5: Replace the category-navigation block**

Replace the current `!hasSubcategories` block with:

```tsx
{!hasSubcategories &&
  (showBrandCategoryOverview || showGenericCategoryFilter) && (
    <div className="w-full mb-10">
      {showBrandCategoryOverview ? (
        brand === 'ifm' ? (
          <IFMCategoryCards />
        ) : (
          <LenzeCategoryCards
            categories={categories}
            selectedCategory={filterOptions.category}
            onCategorySelect={handleCategorySelect}
          />
        )
      ) : (
        <ProductFilter
          categories={categories}
          selectedCategory={filterOptions.category}
          onCategoryChange={(category) => {
            setSelectedSubCategory(undefined);
            onFilterChange?.({
              category,
              subcategory: undefined,
              page: 1,
            });
          }}
        />
      )}
    </div>
  )}
```

- [ ] **Step 6: Decouple product results from generic filters**

Replace every remaining JSX condition that begins with `showFilters` with the corresponding `showProductResults` condition:

```tsx
{showProductResults && (
  // Product count and view selector
)}

{showProductResults && isLoading && (
  // Loading state
)}

{showProductResults && !isLoading && filteredProducts.length === 0 && (
  // Existing empty state
)}

{showProductResults && !isLoading && filteredProducts.length > 0 && (
  // Existing product grid
)}

{showProductResults && totalPages > 1 && !hasSubcategories && (
  // Existing pagination
)}
```

Do not change the contents or styling inside these existing blocks.

- [ ] **Step 7: Run focused tests and validation**

Run:

```bash
node lib/products/ifmProductGridIntegration.test.ts
node lib/products/categoryPageVisibility.test.ts
node lib/products/ifmCategoryCardsStructure.test.ts
node lib/products/ifmCategories.test.ts
npx tsc --noEmit
```

Expected: all four focused tests exit 0 and TypeScript reports no errors.

- [ ] **Step 8: Commit the ProductGrid integration**

```bash
git add components/products/ProductGrid.tsx lib/products/ifmProductGridIntegration.test.ts
git commit -m "feat: show IFM category navigation"
```

### Task 5: Full Verification And Visual QA

**Files:**
- Verify: `components/products/IFMCategoryCards.tsx`
- Verify: `components/products/ProductGrid.tsx`
- Verify: `lib/types/index.ts`

- [ ] **Step 1: Run repository checks**

Run:

```bash
git diff --check
node lib/products/ifmCategories.test.ts
node lib/products/categoryPageVisibility.test.ts
node lib/products/ifmCategoryCardsStructure.test.ts
node lib/products/ifmProductGridIntegration.test.ts
npx tsc --noEmit
npx eslint .
npm run build
```

Expected: `git diff --check` is silent; all focused tests, TypeScript, ESLint, and the production build exit 0.

- [ ] **Step 2: Start the development server**

Run:

```bash
npm run dev
```

Expected: Next.js reports a local URL. Keep the server running for browser verification.

- [ ] **Step 3: Verify the IFM overview in the browser**

Open `/products?brand=ifm` at desktop and mobile widths and confirm:

- Exactly 14 category cards appear in the approved order.
- The layout uses four columns on large desktop, two on small/tablet widths, and one on mobile.
- Every card uses the neutral IFM logo visual and matches Lenze card dimensions and styling.
- Generic filters, product count, grid/list selector, products, empty state, and pagination are absent.
- Long category names wrap without overlapping descriptions or buttons.

- [ ] **Step 4: Verify a selected IFM category**

Open `/products?brand=ifm&category=Capteurs%20de%20niveau` and confirm:

- `Retour aux catégories` is visible and returns to `/products?brand=ifm`.
- Generic category filters remain absent.
- Product count and grid/list selector are visible.
- Products render if available; otherwise the existing empty state renders without layout overlap.

- [ ] **Step 5: Verify Lenze regression coverage**

Open `/products?brand=lenze` and confirm:

- The four existing Lenze cards render unchanged.
- No generic filters, product toolbar, or product results appear on the Lenze overview.
- Opening a Lenze category still shows its existing subcategory navigation and products.

- [ ] **Step 6: Review the final diff**

Run:

```bash
git status --short
git diff --stat HEAD~4..HEAD
git diff HEAD~4..HEAD -- components/products/ProductGrid.tsx components/products/IFMCategoryCards.tsx lib/products/categoryPageVisibility.ts lib/types/index.ts
```

Expected: only the planned IFM category files, focused tests, shared visibility helper, and ProductGrid integration are changed.
