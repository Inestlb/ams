# IFM Category Cards Design

**Date:** 2026-07-16

## Goal

Replace the IFM category filter buttons with a category overview that uses the same card layout and responsive grid as the Lenze category page.

## Scope

- Change only the IFM product-category navigation and the shared product-grid conditions required to display it.
- Keep the Lenze and WAGO behavior unchanged.
- Keep the existing product search, product cards, pagination, and product-detail pages unchanged.
- Use a neutral visual until category-specific IFM images are available.

## Category Data

The IFM category list and its order are:

1. Détecteur Inductifs
2. Détecteurs Capacitifs
3. Cellule Opto
4. Détecteurs à ultrasons
5. Détecteurs pour vannes
6. Détecteurs pour vérins
7. Capteurs de pression / Capteurs de dépression
8. Capteurs de niveau
9. Capteurs de débit / débitmètres
10. Capteurs de température
11. IO LINK
12. Communication Industrielle ASI BUS
13. Technologie de sécurité
14. Technologie de connexion

The existing IFM category type and exported category record will be updated to this list so the shared data contract matches the navigation shown to users.

## User Experience

### IFM category overview

At `/products?brand=ifm`:

- Do not display the generic category filters.
- Do not display the product count, grid/list selector, product grid, empty state, or pagination.
- Display the heading `Catégories de produits` and the same section divider used by the Lenze cards.
- Display the 14 categories in the same responsive grid format as Lenze: one column on mobile, two on small screens, and four on large screens.
- Each card contains a neutral image area, the category title, a short category description, and the `Voir les produits` action.
- The neutral image area uses the existing `/images/logo-ifm.svg` centered on the same light background for every category.

### Selected IFM category

At `/products?brand=ifm&category=<category>`:

- Do not display the generic category filters.
- Display `Retour aux catégories`, the product count, the grid/list selector, and the matching products or the existing empty state.
- Keep the current product and pagination behavior.
- `Retour aux catégories` links to `/products?brand=ifm`.

### Navigation

Each category card links to:

`/products?brand=ifm&category=${encodeURIComponent(category)}`

The URL remains the source of truth, matching the current Lenze navigation pattern.

## Components

### New `IFMCategoryCards`

Create `components/products/IFMCategoryCards.tsx` as a dedicated client component based on `LenzeCategoryCards`.

Responsibilities:

- Render only when the active brand is `ifm`.
- Own the ordered IFM card content, descriptions, and neutral visual metadata.
- Render links with the existing product-category query-string format.
- Match the Lenze card dimensions, borders, typography, hover behavior, image ratio, and action layout.

### Updated `ProductGrid`

Update `components/products/ProductGrid.tsx` to distinguish three concerns:

- Brand category overview: Lenze or IFM with no selected category.
- Generic category filters: all supported states except IFM pages and the Lenze overview.
- Product results: any page with an active category, including IFM.

The existing `showFilters` behavior will treat both Lenze and IFM brand overviews as navigation-only pages. On a selected IFM category, product results remain visible while the generic `ProductFilter` stays hidden.

## Error And Empty States

- Category cards use the existing local IFM logo, so they do not depend on remote image availability.
- If a selected IFM category has no products, retain the existing `Aucun produit trouvé` state.
- The `Retour aux catégories` link always returns the interface to the IFM category overview.

## Testing

- Add a focused regression test for IFM visibility rules: overview shows cards only; selected category hides generic filters and shows product results.
- Verify the ordered list contains all 14 requested labels.
- Run TypeScript validation, the focused tests, lint if supported by the current Next.js setup, and a production build.
- Start the development server and visually verify the IFM overview and one selected category at desktop and mobile widths.
- Confirm the Lenze category overview still renders unchanged.
