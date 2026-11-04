# Product Pages Industrial Premium Redesign

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the product listing page, product detail page, and all product components to match the industrial premium aesthetic established on the home page.

**Architecture:** Visual-only refactor of existing product components. No changes to data layer, product content, filtering logic, or URL structure. Palette: blue `#0b2f4f`/`#103d64`, orange accent `#e47925`, cream `#f4f0e8`. Cards use rounded corners, subtle shadows, border/shadow hover transitions (no translate jumps). Remove console.logs from data layer.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, Framer Motion, Lucide icons.

**Constraints:**
- Do NOT modify product text content, descriptions, or image references in `data/products.ts` JSON loaders
- Do NOT modify filtering logic or URL param handling in `ProductGrid`, `ProductFilter`, `SubCategoryFilter`
- Do NOT modify data types or category enums in `lib/types/index.ts`
- Keep all existing component props interfaces unchanged
- Keep `data/products.ts` console.log removal as the ONLY data layer change

---

## File Structure

### Modified files
| File | Responsibility |
|------|---------------|
| `app/(site)/products/page.tsx` | Listing page header redesign |
| `app/(site)/products/[slug]/page.tsx` | Detail page layout redesign |
| `components/products/ProductCard.tsx` | Card visual redesign |
| `components/products/ProductGrid.tsx` | Grid container, pagination, view modes styling |
| `components/products/ProductFilter.tsx` | Filter pills restyling |
| `components/products/SubCategoryFilter.tsx` | Sub-category filter restyling |
| `components/products/LenzeCategoryCards.tsx` | Category cards restyling |
| `components/products/ProductGallery.tsx` | Gallery restyling |
| `components/products/SearchBar.tsx` | Search bar restyling |
| `data/products.ts` | Remove console.log statements only |

---

### Task 1: Remove console.logs from data layer

**Files:**
- Modify: `data/products.ts`

- [ ] **Step 1:** Remove all `console.log` and `console.error` statements from `data/products.ts`. Keep all data logic, JSON reading, and product mapping unchanged.

- [ ] **Step 2:** Run verification

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: All pass.

---

### Task 2: Redesign ProductCard

**Files:**
- Modify: `components/products/ProductCard.tsx`

**Design:**
- Card: `rounded-[1.75rem] border border-[#0b2f4f]/8 bg-white overflow-hidden`, no border by default
- Image zone: `h-56 bg-[#f4f0e8]` with product image centered, `object-contain`
- Content: padding, title `text-[#0b2f4f]`, description `text-[#4a6478]`
- Hover: `transition-[border-color,box-shadow] duration-200 ease-out hover:border-[#e47925]/30 hover:shadow-[0_8px_30px_rgba(228,121,37,0.1)]`
- Icon container: `bg-[#0b2f4f] text-[#e47925]` -> `group-hover:bg-[#e47925] group-hover:text-white`
- Button: subtle outline, `group-hover:bg-[#e47925] group-hover:text-white group-hover:border-[#e47925]`
- No translate/jump on hover
- Keep existing props, loading state, image error handling, white product detection

- [ ] **Step 1:** Rewrite ProductCard with the industrial premium styling above while keeping all existing behavior (click handler, loading state, image fallback, white product detection)

- [ ] **Step 2:** Run verification

```bash
npx tsc --noEmit && npm run lint
```

---

### Task 3: Redesign ProductFilter

**Files:**
- Modify: `components/products/ProductFilter.tsx`

**Design:**
- Active pill: `bg-[#0b2f4f] text-white rounded-full px-5 py-3 text-sm font-medium`
- Inactive pill: `bg-white border border-[#0b2f4f]/10 rounded-full px-5 py-3 text-sm font-medium text-[#0b2f4f] hover:border-[#e47925]/30 hover:text-[#e47925]`
- Keep all existing category ordering logic, brand detection, and onCategoryChange callback

- [ ] **Step 1:** Update pill styles to match home page rounded-full aesthetic

- [ ] **Step 2:** Run verification

```bash
npx tsc --noEmit && npm run lint
```

---

### Task 4: Redesign SubCategoryFilter

**Files:**
- Modify: `components/products/SubCategoryFilter.tsx`

**Design:**
- Title: `text-xl font-semibold text-[#0b2f4f]`
- Subtitle: `text-sm text-[#4a6478]`
- Active button: `bg-[#e47925] text-white rounded-full`
- Inactive button: `bg-white border border-[#0b2f4f]/10 rounded-full text-[#0b2f4f] hover:border-[#e47925]/30 hover:text-[#e47925]`
- "Tous les produits" button: same style as active when selected
- Keep all existing subcategory loading logic and onSubCategoryChange callback

- [ ] **Step 1:** Update all button styles to rounded-full industrial premium

- [ ] **Step 2:** Run verification

```bash
npx tsc --noEmit && npm run lint
```

---

### Task 5: Redesign LenzeCategoryCards

**Files:**
- Modify: `components/products/LenzeCategoryCards.tsx`

**Design:**
- Grid: `gap-5`
- Cards: `rounded-[1.75rem] bg-white border border-[#0b2f4f]/10 p-8 shadow-[0_2px_8px_rgba(3,25,43,0.06)] hover:bg-[#0b2f4f] hover:text-white transition-colors duration-200`
- Image zone: `h-40 bg-[#f4f0e8] rounded-2xl flex items-center justify-center` with placeholder
- Title: `text-xl font-semibold text-[#0b2f4f] group-hover:text-white`
- Description: `text-sm text-[#4a6478] group-hover:text-[#d7e2eb]`
- Button: outline `group-hover:bg-[#e47925] group-hover:text-white group-hover:border-[#e47925]`
- Keep all existing Link hrefs and category data

- [ ] **Step 1:** Restyle LenzeCategoryCards with home-page partner-card aesthetic

- [ ] **Step 2:** Run verification

```bash
npx tsc --noEmit && npm run lint
```

---

### Task 6: Redesign ProductGallery

**Files:**
- Modify: `components/products/ProductGallery.tsx`

**Design:**
- Main image container: `rounded-[1.75rem] bg-[#f4f0e8] border border-[#0b2f4f]/8`
- Thumbnails: `rounded-xl border border-[#0b2f4f]/8`, active: `ring-2 ring-[#e47925]`
- "Vues du produit" label: `text-sm uppercase tracking-[0.18em] text-[#4a6478]`
- Keep all existing image switching, error handling, white product detection

- [ ] **Step 1:** Restyle gallery with rounded premium aesthetic

- [ ] **Step 2:** Run verification

```bash
npx tsc --noEmit && npm run lint
```

---

### Task 7: Redesign SearchBar

**Files:**
- Modify: `components/products/SearchBar.tsx`

**Design:**
- Input: `rounded-full border-[#0b2f4f]/15 py-4 focus:border-[#e47925] focus:ring-[#e47925]/20`
- Dropdown: `rounded-2xl border border-[#0b2f4f]/10 shadow-[0_18px_45px_rgba(3,25,43,0.12)]`
- Result items: `hover:bg-[#f4f0e8] rounded-xl`
- "Voir tous les résultats": `text-[#e47925]`
- Keep all existing search logic, debounce, and result handling

- [ ] **Step 1:** Restyle search bar with rounded premium aesthetic

- [ ] **Step 2:** Run verification

```bash
npx tsc --noEmit && npm run lint
```

---

### Task 8: Redesign ProductGrid container

**Files:**
- Modify: `components/products/ProductGrid.tsx`

**Design:**
- View toggle buttons: `rounded-full` pills matching filter style
- Results count: `text-sm text-[#4a6478]`
- Grid: `gap-5 lg:gap-7` matching home
- Pagination buttons: `rounded-full bg-[#0b2f4f] text-white` active, `rounded-full border border-[#0b2f4f]/10 text-[#0b2f4f]` inactive, `hover:border-[#e47925]/30 hover:text-[#e47925]`
- Empty state: clean, `text-[#4a6478]`
- "Effacer les filtres" button: `rounded-full text-[#e47925]`
- Subcategory group headings: `text-[#0b2f4f] border-l-[#e47925]` instead of `border-orange-500 text-orange-700`
- Keep ALL existing filtering, view mode, pagination, subcategory selection, URL update logic

- [ ] **Step 1:** Update grid container styles: view toggle, pagination, empty state, group headings

- [ ] **Step 2:** Run verification

```bash
npx tsc --noEmit && npm run lint
```

---

### Task 9: Redesign product listing page

**Files:**
- Modify: `app/(site)/products/page.tsx`

**Design:**
- Header section: `bg-[#0b2f4f] py-16 text-white` with radial gradient overlay (same as home hero)
- Title: `text-4xl md:text-5xl font-semibold tracking-[-0.055em] text-white`
- Subtitle: `text-lg text-[#d7e2eb]`
- SearchBar placed inside the blue header
- Content section below: `bg-[#f4f0e8] py-12` with `max-w-[1600px]`
- Keep all existing data fetching, search params, title logic

- [ ] **Step 1:** Restructure page layout: blue header with title/search, cream content area with grid

- [ ] **Step 2:** Run verification

```bash
npx tsc --noEmit && npm run lint
```

---

### Task 10: Redesign product detail page

**Files:**
- Modify: `app/(site)/products/[slug]/page.tsx`

**Design:**
- Top section: `bg-[#0b2f4f] py-10 text-white` for breadcrumb + back button
- Breadcrumb: `text-white/60` links, `hover:text-[#e47925]`, current page `text-white`
- Back button: `rounded-full border-white/20 text-white hover:bg-white/10`
- Content: `bg-[#f4f0e8]` below
- Two-column layout: gallery left, info right
- Title: `text-3xl font-semibold text-[#0b2f4f]`
- Description: `text-[#4a6478] leading-relaxed`
- Specs table: `rounded-[1.25rem] border border-[#0b2f4f]/8 overflow-hidden`, alternating `bg-white` / `bg-[#f4f0e8]`, labels `text-[#4a6478]`, values `text-[#0b2f4f] font-medium`
- Contact CTA: `rounded-full bg-[#e47925] text-white hover:bg-[#f18a3d]` with shadow
- Related products section: `text-[#0b2f4f]` heading, cards same style as ProductCard
- Keep all existing data fetching, breadcrumb logic, related products logic, metadata

- [ ] **Step 1:** Restructure detail page: blue top bar, cream content, premium specs, related products

- [ ] **Step 2:** Run verification

```bash
npx tsc --noEmit && npm run lint
```

---

### Task 11: Final verification

- [ ] **Step 1:** Run full verification suite

```bash
git diff --check
npx tsc --noEmit
npm run lint
npm run build
```

Expected: All pass with 0 errors.

- [ ] **Step 2:** Visual spot-check — verify no product content was altered, all filters still work, no regressions in data display.
