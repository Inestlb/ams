# Catalogue complet et filtres de produits Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Faire de `/products` un catalogue complet, filtrable par marque puis catégorie, avec pagination de 24 produits, compteur exact et état entièrement partageable par URL.

**Architecture:** Le calcul de catalogue sera séparé de la présentation : `data/products.ts` filtrera la liste complète puis exposera une page de résultats et son total, tandis qu’un petit module pur centralisera la pagination et la normalisation de page. Un module de navigation URL sera utilisé par la grille, les filtres et la recherche afin que toutes les interactions conservent ou réinitialisent les bons paramètres. Les composants éditorialisés WAGO et les pages de détail resteront hors de ce flux générique.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Node.js built-in test runner (`node --test`).

**Spec:** `docs/superpowers/specs/2026-11-01-product-catalog-filters-design.md`

## Global Constraints

- Les entrées de l’accueil et du menu restent sur `/products`.
- Les filtres sont pilotés par `brand`, `category`, `subcategory`, `q` et `page` dans l’URL.
- La pagination standard est de 24 produits par page et le compteur utilise le total avant pagination.
- « Tous les produits » efface la marque, la catégorie, la sous-catégorie, la recherche et la page.
- Les pages éditorialisées WAGO et les fiches détaillées restent inchangées.
- Aucun produit, libellé canonique, image, description ou traduction n’est créé ou supprimé.
- Les changements de filtre ramènent à la page 1 ; la pagination conserve les autres filtres.
- Les tests ciblés, le contrôle TypeScript, le build et la vérification navigateur doivent réussir.

---

### Task 1: Centraliser pagination et normalisation de page

**Files:**
- Create: `lib/products/catalog.ts`
- Create: `lib/products/catalog.test.ts`

**Interfaces:**
- Produces `PRODUCTS_PER_PAGE: 24`, `normalizeProductPage(value?: number | string | null): number` et `paginateProducts<T>(products: T[], requestedPage?: number): { products: T[]; total: number; page: number; totalPages: number }`.
- Consumes no application state and imports no React or Next.js code, so the functions are directly testables avec le runner Node existant.

- [ ] **Step 1: Write the failing tests**

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --disable-warning=ExperimentalWarning --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/products/catalog.test.ts`

Expected: FAIL because `lib/products/catalog.ts` does not exist yet.

- [ ] **Step 3: Write the minimal implementation**

```ts
export const PRODUCTS_PER_PAGE = 24;

export function normalizeProductPage(value?: number | string | null): number {
  const parsed = typeof value === 'number' ? value : Number.parseInt(value ?? '', 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function paginateProducts<T>(products: T[], requestedPage?: number) {
  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE));
  const page = Math.min(normalizeProductPage(requestedPage), totalPages);
  const start = (page - 1) * PRODUCTS_PER_PAGE;

  return {
    products: products.slice(start, start + PRODUCTS_PER_PAGE),
    total,
    page,
    totalPages,
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --disable-warning=ExperimentalWarning --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/products/catalog.test.ts`

Expected: PASS with all pagination and page-normalization assertions passing.

- [ ] **Step 5: Commit**

```bash
git add lib/products/catalog.ts lib/products/catalog.test.ts
git commit -m "feat: centralize product catalog pagination"
```

### Task 2: Exposer le catalogue filtré et les catégories dynamiques

**Files:**
- Modify: `data/products.ts:621-815`
- Modify: `app/(site)/products/page.tsx:1-115`
- Create: `lib/products/catalogData.test.ts`

**Interfaces:**
- Produces `getProductCatalog(options?: ProductQuery): Promise<{ products: Product[]; total: number; page: number; totalPages: number }>` in `data/products.ts`.
- `getProducts` keeps its existing no-`page` behavior for product detail pages and other callers, but paged calls use the shared 24-item pagination.
- `getProductCategories(brand?: string)` returns only categories represented by the complete matching brand result set; omitting `brand` returns all categories.
- Consumes `paginateProducts`, `normalizeProductPage`, `isWagoInstallationCategory`, `isWagoProduct` and the existing `sortProductResults` rules.

- [ ] **Step 1: Write source-level regression tests for the data contract**

```ts
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const source = fs.readFileSync(
  path.join(process.cwd(), 'data', 'products.ts'),
  'utf8',
);

assert.match(source, /export async function getProductCatalog/);
assert.match(source, /paginateProducts\(filteredProducts, options\?\.page\)/);
assert.match(source, /PRODUCTS_PER_PAGE/);
assert.doesNotMatch(source, /ITEMS_PER_PAGE = 8/);
assert.match(source, /getProductCategories\(brand\?: string/);
```

- [ ] **Step 2: Run the regression test to verify it fails**

Run: `node --disable-warning=ExperimentalWarning --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/products/catalogData.test.ts`

Expected: FAIL because the catalog result function and the shared pagination call are not present.

- [ ] **Step 3: Extract the existing filtering into a non-paginated internal path**

In `data/products.ts`, move the current category, subcategory, search, featured, brand and sorting logic into an internal `getFilteredProducts(options)` function. Preserve the current Lenze category ordering, WAGO detection by `isWagoProduct`, WAGO installation order, and the static fallback behavior. Remove the no-op branch that ignores `subcategory` for Lenze motoréducteurs, moteurs and réducteurs so a selected subcategory is applied before pagination.

- [ ] **Step 4: Add the paginated catalog result and preserve `getProducts` compatibility**

```ts
export async function getProductCatalog(
  options: ProductQuery = {},
): Promise<ProductCatalogResult> {
  const filteredProducts = await getFilteredProducts(options);

  if (
    options.brand === 'wago' &&
    options.category === WAGO_INSTALLATION_CATEGORY
  ) {
    return {
      products: filteredProducts,
      total: filteredProducts.length,
      page: 1,
      totalPages: 1,
    };
  }

  return paginateProducts(filteredProducts, options.page);
}

export async function getProducts(options?: ProductQuery): Promise<Product[]> {
  const filteredProducts = await getFilteredProducts(options);
  if (options?.page === undefined) return filteredProducts;

  if (
    options.brand === 'wago' &&
    options.category === WAGO_INSTALLATION_CATEGORY
  ) {
    return filteredProducts;
  }

  return paginateProducts(filteredProducts, options.page).products;
}
```

Use the actual existing `ProductQuery`/result types in the file rather than duplicating inline option shapes. This keeps product detail related-products calls unpaginated while the catalogue page gets an exact total.

- [ ] **Step 5: Make category options derive from matching products**

Implement `getProductCategories(brand?: string)` by obtaining the complete unpaginated result for the brand, collecting unique `category` values, and preserving the existing product order. The no-brand call must continue to return the complete category list. The page should call `getProductCategories(brand)` so its second filter row cannot contain categories with no matching product for the selected brand.

- [ ] **Step 6: Update the products page to consume the result object**

In `app/(site)/products/page.tsx`, import `getProductCatalog` and `normalizeProductPage`, normalize invalid `searchParams.page` values, call `getProductCategories(brand)`, and pass `catalog.products`, `catalog.total`, `catalog.totalPages` and `catalog.page` to the client grid. Always pass the requested `subcategory` into the catalog query so subcategory counts and pages match the visible selection. Keep the WAGO editorial header/search exceptions unchanged.

- [ ] **Step 7: Run the data regression test and the existing product tests**

Run: `npm test -- --test-name-pattern='catalog|categoryPageVisibility|wago|ifm|subcategory'`

Expected: the new source-level assertions and all existing WAGO/IFM/subcategory tests pass; failures must be fixed before committing this task.

- [ ] **Step 8: Commit**

```bash
git add data/products.ts 'app/(site)/products/page.tsx' lib/products/catalogData.test.ts
git commit -m "feat: expose complete paginated product catalog"
```

### Task 3: Centraliser les transitions d’URL du catalogue

**Files:**
- Create: `lib/products/productsPageNavigation.ts`
- Create: `lib/products/productsPageNavigation.test.ts`

**Interfaces:**
- Produces `buildProductsUrl(current: URLSearchParams, changes: ProductNavigationChanges): string` and `resetProductsUrl(): string`.
- `ProductNavigationChanges` accepts `brand`, `category`, `subcategory`, `search`, and `page`; `search` maps to the public `q` query parameter.
- Consumes the URL parameter contract from the spec and returns paths beginning with `/products`.

- [ ] **Step 1: Write the failing URL-transition tests**

```ts
import assert from 'node:assert/strict';
import { buildProductsUrl, resetProductsUrl } from './productsPageNavigation.ts';

const current = new URLSearchParams('brand=ifm&category=Capteurs&page=3');

assert.equal(
  buildProductsUrl(current, { category: 'IO LINK' }),
  '/products?brand=ifm&category=IO+LINK&page=1',
);
assert.equal(
  buildProductsUrl(current, { brand: 'wago' }),
  '/products?brand=wago&page=1',
);
assert.equal(
  buildProductsUrl(current, { search: 'i550' }),
  '/products?brand=ifm&category=Capteurs&q=i550&page=1',
);
assert.equal(
  buildProductsUrl(current, { page: 2 }),
  '/products?brand=ifm&category=Capteurs&page=2',
);
assert.equal(
  buildProductsUrl(current, { category: undefined, subcategory: undefined }),
  '/products?brand=ifm&page=1',
);
assert.equal(resetProductsUrl(), '/products');
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --disable-warning=ExperimentalWarning --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/products/productsPageNavigation.test.ts`

Expected: FAIL because the URL helper module does not exist.

- [ ] **Step 3: Implement the URL helper**

```ts
export interface ProductNavigationChanges {
  brand?: string;
  category?: string;
  subcategory?: string;
  search?: string;
  page?: number;
}

export function buildProductsUrl(
  current: URLSearchParams,
  changes: ProductNavigationChanges,
): string {
  const next = new URLSearchParams(current.toString());
  const hasFilterChange = Object.keys(changes).some((key) => key !== 'page');

  if ('brand' in changes) {
    changes.brand ? next.set('brand', changes.brand) : next.delete('brand');
    next.delete('category');
    next.delete('subcategory');
  }
  if ('category' in changes) {
    changes.category ? next.set('category', changes.category) : next.delete('category');
    next.delete('subcategory');
  }
  if ('subcategory' in changes) {
    changes.subcategory ? next.set('subcategory', changes.subcategory) : next.delete('subcategory');
  }
  if ('search' in changes) {
    changes.search?.trim() ? next.set('q', changes.search.trim()) : next.delete('q');
  }

  if (hasFilterChange) next.set('page', '1');
  else if ('page' in changes) next.set('page', String(changes.page ?? 1));

  const query = next.toString();
  return query ? `/products?${query}` : '/products';
}

export function resetProductsUrl() {
  return '/products';
}
```

- [ ] **Step 4: Run the URL tests to verify they pass**

Run: `node --disable-warning=ExperimentalWarning --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/products/productsPageNavigation.test.ts`

Expected: PASS with brand/category/search/page reset semantics covered.

- [ ] **Step 5: Commit**

```bash
git add lib/products/productsPageNavigation.ts lib/products/productsPageNavigation.test.ts
git commit -m "feat: centralize product catalog URL transitions"
```

### Task 4: Brancher les filtres marque/catégorie et les résultats

**Files:**
- Modify: `components/products/ProductFilter.tsx`
- Modify: `components/products/ProductGrid.tsx`
- Modify: `components/products/SearchBar.tsx`
- Modify: `lib/products/categoryPageVisibility.ts`
- Modify: `lib/products/categoryPageVisibility.test.ts`
- Create: `lib/products/productGridFilters.test.ts`

**Interfaces:**
- `ProductFilter` accepts `selectedBrand?: string | null` and `onBrandChange: (brand?: string) => void` in addition to its category props.
- `ProductGrid` accepts `totalProducts?: number` and uses the URL helper when no parent callback is provided; it continues accepting the existing optional `onFilterChange` for compatibility.
- `SearchBar` preserves existing URL filters when submitting or clearing a query and resets `page` to 1.
- Consumes `buildProductsUrl`/`resetProductsUrl` from Task 3 and the dynamic `categories`/`brand` values from Task 2.

- [ ] **Step 1: Add failing source/integration assertions**

```ts
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const filterSource = fs.readFileSync(path.join(process.cwd(), 'components', 'products', 'ProductFilter.tsx'), 'utf8');
const gridSource = fs.readFileSync(path.join(process.cwd(), 'components', 'products', 'ProductGrid.tsx'), 'utf8');
const searchSource = fs.readFileSync(path.join(process.cwd(), 'components', 'products', 'SearchBar.tsx'), 'utf8');

assert.match(filterSource, /Tous les produits/);
assert.match(filterSource, /Lenze/);
assert.match(filterSource, /IFM/);
assert.match(filterSource, /WAGO/);
assert.match(filterSource, /Catégories/);
assert.match(filterSource, /hover:bg-\[#0b2f4f\]/);
assert.match(gridSource, /buildProductsUrl/);
assert.match(gridSource, /totalProducts/);
assert.match(searchSource, /useSearchParams/);
```

- [ ] **Step 2: Run the assertions to verify they fail**

Run: `node --disable-warning=ExperimentalWarning --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/products/productGridFilters.test.ts lib/products/categoryPageVisibility.test.ts`

Expected: FAIL because the current filter only renders categories, does not navigate, and counts only the current page.

- [ ] **Step 3: Render the two filter rows with canonical labels**

In `ProductFilter.tsx`, render a « Marques » section with the four values `{ value: undefined, label: 'Tous les produits' }`, Lenze, IFM and WAGO. Render the « Catégories » section below from the `categories` prop, with a leading « Tous les produits » button. Use orange for the selected button and a blue hover background/text treatment for unselected buttons, including the brand reset button. Remove the old hardcoded category arrays and the English `All` label; the server-provided category list is the source of truth.

- [ ] **Step 4: Make `ProductGrid` navigate instead of relying on an absent callback**

Add `useRouter`, define a local `applyFilters(changes)` that calls `onFilterChange` when supplied and otherwise calls `router.push(buildProductsUrl(new URLSearchParams(searchParams.toString()), changes))`, and use it for brand, category, subcategory and page actions. The brand action must clear category/subcategory; category must clear subcategory; every filter change must reset page 1. The « Tous les produits » brand action must call `router.push(resetProductsUrl())` and clear all local subcategory state.

- [ ] **Step 5: Show filtered products for brand selections and preserve editorial pages**

Update `getCategoryPageVisibility` so a root brand page keeps its category cards but also allows product results. Keep the WAGO rail/power-supply and IFM static-subcategory exclusions exactly as they are. In `ProductGrid`, render the filter block for the unbranded page and root brand pages, retain the existing category cards as a supplementary overview, and render the paginated products below them for a selected brand. Do not alter `WAGORailCategoryContent`, `WAGOPowerSupplyCategoryContent`, or the product-detail route.

- [ ] **Step 6: Use the server total for the visible counter and pagination**

Add `totalProducts` to `ProductGrid` and display it in « Affichage de X produits ». Keep client-side subcategory selection synchronized with the URL, but rely on the server query from Task 2 for the selected subcategory so the total and page contents describe the same result set. Use the normalized `filterOptions.page` for the active pagination button and `totalPages` from `getProductCatalog`.

- [ ] **Step 7: Preserve filters in search navigation**

In `SearchBar`, read `useSearchParams`, pass the current params through `buildProductsUrl` on submit, and call the same helper with `{ search: undefined }` when clearing. Keep the existing five-result dropdown and product links unchanged. Searching from a branded/category page must retain those filters; submitting or clearing always returns to page 1.

- [ ] **Step 8: Run targeted tests**

Run: `npm test -- --test-name-pattern='productGridFilters|categoryPageVisibility|productsPageLayout|productsMenu'`

Expected: PASS with the updated visibility expectations, filter labels/hover contract, URL integration and existing menu/layout checks.

- [ ] **Step 9: Commit**

```bash
git add components/products/ProductFilter.tsx components/products/ProductGrid.tsx components/products/SearchBar.tsx lib/products/categoryPageVisibility.ts lib/products/categoryPageVisibility.test.ts lib/products/productGridFilters.test.ts
git commit -m "feat: add URL-driven product brand and category filters"
```

### Task 5: Synchroniser les consommateurs secondaires du data layer

**Files:**
- Modify: `lib/hooks/useProducts.ts:1-65`
- Modify: `app/api/products/route.ts:1-55`
- Create: `lib/products/productCatalogConsumers.test.ts`

**Interfaces:**
- `useProducts` consumes `getProductCatalog` and exposes the exact `totalPages` (and `totalItems`) from the catalog result.
- The API accepts `brand` in addition to its existing category/search/featured/page parameters while keeping its JSON array response shape.
- The product detail page continues using unpaginated `getProducts` for related products and requires no behavior change.

- [ ] **Step 1: Write failing consumer-contract assertions**

```ts
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const hook = fs.readFileSync(path.join(process.cwd(), 'lib', 'hooks', 'useProducts.ts'), 'utf8');
const route = fs.readFileSync(path.join(process.cwd(), 'app', 'api', 'products', 'route.ts'), 'utf8');

assert.match(hook, /getProductCatalog/);
assert.match(hook, /totalItems/);
assert.match(route, /const brand = searchParams\.get\('brand'\)/);
assert.match(route, /brand: brand \|\| undefined/);
```

- [ ] **Step 2: Run the assertions to verify they fail**

Run: `node --disable-warning=ExperimentalWarning --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/products/productCatalogConsumers.test.ts`

Expected: FAIL because the hook and API route still call the old page-size assumptions and ignore `brand`.

- [ ] **Step 3: Update `useProducts` to consume the result object**

Replace the `getProducts` call with `getProductCatalog(filterOptions)`, set `products` from `result.products`, set `totalPages` from `result.totalPages`, and add `totalItems` state/return data from `result.total`. Keep its existing loading, error and filter-update behavior.

- [ ] **Step 4: Add brand parsing to the API route**

Read `brand` from `searchParams` and pass it into `getProducts`. Do not change the response shape or the `id`/`categories` branches. The API will therefore expose the same catalog filtering semantics without forcing callers to adopt the page-result envelope.

- [ ] **Step 5: Run the consumer tests and all unit tests**

Run: `npm test`

Expected: PASS with no regressions in existing menu, category, WAGO, IFM, Lenze subcategory or layout tests.

- [ ] **Step 6: Commit**

```bash
git add lib/hooks/useProducts.ts app/api/products/route.ts lib/products/productCatalogConsumers.test.ts
git commit -m "fix: synchronize product catalog consumers"
```

### Task 6: Vérification TypeScript, build et parcours navigateur

**Files:**
- No source changes unless a verification failure identifies a concrete defect.
- Review: `docs/superpowers/specs/2026-11-01-product-catalog-filters-design.md`

**Interfaces:**
- Consumes every implementation delivered by Tasks 1–5.
- Produces evidence for the acceptance criteria: exact counts, 24-item pages, URL persistence, brand/category filtering and preserved editorial pages.

- [ ] **Step 1: Run the complete automated test suite**

Run: `npm test`

Expected: exit code 0 with every test passing.

- [ ] **Step 2: Run the TypeScript check**

Run: `./node_modules/.bin/tsc --noEmit`

Expected: exit code 0 with no TypeScript diagnostics.

- [ ] **Step 3: Run the production build**

Run: `npm run build`

Expected: exit code 0 and a successful Next.js production build for `/products`, product detail routes and existing site pages.

- [ ] **Step 4: Start the local app for browser verification**

Run: `npm run dev`

Expected: the Next.js development server starts without compile errors; use the in-app browser against the reported local URL.

- [ ] **Step 5: Verify the unfiltered catalogue**

Open `/products`. Confirm the brand row appears above the category row, « Tous les produits » is selected, the counter equals the full filtered total, the first page contains at most 24 cards, and pagination exposes the expected number of pages.

- [ ] **Step 6: Verify brand/category/search URL state**

Select IFM, then a category, submit a search, navigate to page 2, reload, and use browser back/forward. Confirm the URL retains all filters, the counter changes to the exact matching total, and each transition returns to page 1 except page navigation.

- [ ] **Step 7: Verify reset and editorial exceptions**

Click « Tous les produits » and confirm the URL is exactly `/products` and the complete catalogue returns. Open WAGO rail terminals, WAGO power supply, WAGO installation, and one IFM/Lenze specialized category; confirm existing editorial/subcategory content remains present and no unrelated generic results are introduced.

- [ ] **Step 8: Commit any verification-only corrections separately**

If a concrete defect is found, add a focused regression test first, apply the smallest fix, rerun the failing test plus `npm test` and `npm run build`, then commit with a message describing that defect. Do not bundle unrelated formatting or pre-existing worktree changes.

## Handoff

After this plan is approved for execution, use either `superpowers:subagent-driven-development` (fresh worker and review per task) or `superpowers:executing-plans` (inline batches with checkpoints). Do not start implementation from this document without selecting one of those execution workflows.
