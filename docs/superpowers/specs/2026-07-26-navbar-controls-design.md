# Navbar Controls Design

**Date:** 2026-07-26

## Goal

Align the desktop and mobile navbar search and language controls with the square-corner format of the `Voir les produits` action, and improve search contrast by rendering its text and search icon in white.

## Scope

- Modify only `components/layout/NavbarSearch.tsx` and `components/layout/LanguageSelector.tsx`.
- Keep the controls' dimensions, background colors, borders, interactions, responsive placement, translations, and navigation behavior unchanged.
- Do not change the navbar links, product dropdown, mobile menu button, or product-card buttons.

## Visual Rules

### Search control

- Replace the input's `rounded-lg` class with `rounded-none` in both the pre-hydration and interactive render paths.
- Replace the submit, clear, and pre-hydration icon-button rounding with `rounded-none`.
- Render the input value and placeholder in solid white.
- Render the search icon in solid white in both render paths.
- Keep the clear icon's existing muted-to-white hover treatment.

### Language control

- Replace the outer container's `rounded-lg` class with `rounded-none` in both the pre-hydration and interactive render paths.
- Keep the FR/AR typography, active-language emphasis, divider, sizing, colors, and click behavior unchanged.

## Testing

- Add a source-level regression test that checks both navbar components use `rounded-none` in every required render path and no longer use `rounded-lg`, `rounded-md`, or `rounded-full` for the affected controls.
- Verify the search input includes `text-white` and `placeholder:text-white`, and both search icons include `text-white`.
- Run the focused regression test, TypeScript, scoped ESLint, and the production build.
- Visually verify the navbar on a product page at desktop width, including the hydrated search placeholder, white search icon, square language selector, and absence of console errors.
