# Square Site Buttons Design

**Date:** 2026-07-27

## Goal

Apply square corners to every existing button and button-styled link across the site, while preserving all other visual and functional behavior.

## Scope

- Replace only button-related Tailwind corner-radius classes with `rounded-none`.
- Apply the rule to the shared `Button` primitive, its size variants, native `<button>` elements, `motion.button` elements, existing links styled as actions, and dialog/sheet close buttons.
- Keep the floating e-mail button unchanged with `rounded-full`.
- Keep all content, hrefs, labels, icons, colors, borders, sizes, spacing, shadows, transitions, disabled states, focus styles, and interactions unchanged.

## Exclusions

Do not change corner-radius classes on:

- Inputs, textareas, selects, checkboxes, and other form fields.
- Cards, panels, images, badges, status messages, maps, dialog and sheet containers, dropdown containers, menus, and decorative elements. Their close buttons remain included as buttons.
- The floating e-mail button, including `FloatingMailButton`, `MailButtonFixed`, and `SimpleMailButton`.

## Implementation

- Set the shared `Button` base and `sm`/`lg` size variants to `rounded-none` so all consumers inherit the rule.
- Replace explicit radius utilities only where they are on an existing button or link that is already styled as an action.
- Do not add wrapper elements, change components’ public APIs, or alter click handlers.

## Testing

- Add a source-level test that verifies the shared `Button` primitive and each identified direct action use `rounded-none`.
- Add a guard asserting all three floating e-mail buttons retain `rounded-full`.
- Run the focused test, TypeScript, scoped ESLint, and a production build.
- Visually inspect representative primary, secondary, icon, filter, pagination, and floating e-mail controls in the browser.
