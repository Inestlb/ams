# Loading Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Réduire le JavaScript initial et le travail effectué pendant le chargement et le défilement sans modifier le contenu, le rendu ou les fonctionnalités du site UTC.

**Architecture:** Conserver l’architecture Next.js App Router et les composants actuels, mais alléger les ressources globales, charger uniquement les fonctions Framer Motion réellement utilisées et stabiliser les chemins de rendu récurrents. Encadrer chaque optimisation par un test de structure, puis mesurer le build final contre la référence documentée.

**Tech Stack:** Next.js 15.2.1, React 19, TypeScript 5, Framer Motion 12, Node.js 23 test runner, `next/image`, `next/font`.

---

## Carte des fichiers

- `lib/loadingPerformance.test.ts` : garde-fous source pour les optimisations sans changement visuel.
- `package.json`, `tsconfig.json`, `lib/maps.test.ts`, `lib/products/subcategorySelection.test.ts` : rendre la suite TypeScript existante exécutable par une commande unique.
- `app/layout.tsx`, `next.config.mjs` : retirer les ressources globales redondantes et prolonger le cache d’images.
- `components/home/HomeMotionProvider.tsx`, `app/page.tsx`, `components/home/*.tsx` : limiter Framer Motion aux fonctions DOM utilisées sur l’accueil.
- `components/MailButtonFixed.tsx`, `components/layout/Navbar.tsx` : regrouper le travail de scroll à une mise à jour par frame et conserver un seul écouteur.
- `lib/context/TranslationContext.tsx` : stabiliser la fonction et la valeur du contexte.
- `components/products/ProductCard.tsx`, `components/products/ProductGallery.tsx`, `app/(site)/products/[slug]/page.tsx` : fournir des tailles responsives exactes aux images produit.

### Task 1: Rendre la suite de tests reproductible

**Files:**
- Modify: `package.json`
- Modify: `tsconfig.json`
- Modify: `lib/maps.test.ts`
- Modify: `lib/products/subcategorySelection.test.ts`

- [x] **Step 1: Reproduire l’échec actuel du runner Node**

Run:

```bash
node --experimental-strip-types lib/maps.test.ts
```

Expected: FAIL avec `ERR_MODULE_NOT_FOUND` pour `lib/maps`, car Node ESM exige l’extension du module TypeScript.

- [x] **Step 2: Autoriser les extensions TypeScript dans les imports de test**

Ajouter dans `compilerOptions` de `tsconfig.json` :

```json
"allowImportingTsExtensions": true
```

Remplacer les deux imports concernés :

```ts
// lib/maps.test.ts
import { getGoogleMapsEmbedUrl, getGoogleMapsUrl } from './maps.ts';

// lib/products/subcategorySelection.test.ts
import {
  filterProductsForSubcategory,
  getInitialSelectedSubcategory,
} from './subcategorySelection.ts';
```

- [x] **Step 3: Ajouter la commande de test globale**

Ajouter dans `scripts` de `package.json` :

```json
"test": "node --experimental-strip-types --test lib/*.test.ts lib/products/*.test.ts"
```

- [x] **Step 4: Vérifier le runner et le typage**

Run:

```bash
npm test
npm exec -- tsc --noEmit
```

Expected: tous les fichiers de test réussissent et TypeScript termine avec le code 0.

- [x] **Step 5: Commit**

```bash
git add package.json tsconfig.json lib/maps.test.ts lib/products/subcategorySelection.test.ts
git commit -m "test: make TypeScript checks reproducible"
```

### Task 2: Alléger les ressources globales

**Files:**
- Create: `lib/loadingPerformance.test.ts`
- Modify: `app/layout.tsx`
- Modify: `next.config.mjs`

- [x] **Step 1: Écrire le test rouge des ressources globales**

Créer `lib/loadingPerformance.test.ts` :

```ts
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (...segments: string[]) =>
  fs.readFileSync(path.join(root, ...segments), 'utf8');

const layoutSource = read('app', 'layout.tsx');
const nextConfigSource = read('next.config.mjs');

assert.match(layoutSource, /import \{ Inter \} from "next\/font\/google";/);
assert.doesNotMatch(layoutSource, /Poppins|Playfair_Display|--font-poppins|--font-playfair-display/);
assert.doesNotMatch(layoutSource, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
assert.doesNotMatch(layoutSource, /<link rel="preload" as="image" href="\/images\/LOGO-UTC\.svg"/);
assert.match(nextConfigSource, /minimumCacheTTL:\s*86400/);
```

- [x] **Step 2: Vérifier que le test échoue avant l’implémentation**

Run:

```bash
node --experimental-strip-types --test lib/loadingPerformance.test.ts
```

Expected: FAIL parce que les deux polices inutilisées, les préconnexions, le preload manuel et le TTL de 60 secondes sont encore présents.

- [x] **Step 3: Réduire les ressources du layout sans changer sa structure**

Remplacer l’import et les déclarations de polices de `app/layout.tsx` par :

```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
```

Utiliser uniquement la variable Inter sur `body` :

```tsx
<body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
```

Le `<head>` doit conserver les deux balises meta existantes et ne plus contenir les trois liens supprimés :

```tsx
<head>
  <meta name="theme-color" content="#F97316" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
</head>
```

- [x] **Step 4: Prolonger le cache des transformations d’images**

Dans `next.config.mjs`, remplacer :

```js
minimumCacheTTL: 60,
```

par :

```js
minimumCacheTTL: 86400,
```

- [x] **Step 5: Vérifier le test et le typage**

Run:

```bash
node --experimental-strip-types --test lib/loadingPerformance.test.ts
npm exec -- tsc --noEmit
```

Expected: PASS et TypeScript termine avec le code 0.

- [x] **Step 6: Commit**

```bash
git add lib/loadingPerformance.test.ts app/layout.tsx next.config.mjs
git commit -m "perf: reduce global loading resources"
```

### Task 3: Alléger le bundle d’animations de l’accueil

**Files:**
- Modify: `lib/loadingPerformance.test.ts`
- Create: `components/home/HomeMotionProvider.tsx`
- Modify: `app/page.tsx`
- Modify: `components/home/HeroSection.tsx`
- Modify: `components/home/SolutionsSection.tsx`
- Modify: `components/home/ExpertiseSection.tsx`
- Modify: `components/home/PartnersSection.tsx`
- Modify: `components/home/ValuePropositionSection.tsx`
- Modify: `components/home/CtaSection.tsx`

- [x] **Step 1: Ajouter les assertions rouges pour LazyMotion**

Ajouter à `lib/loadingPerformance.test.ts` :

```ts
const homePageSource = read('app', 'page.tsx');
const motionProviderSource = read('components', 'home', 'HomeMotionProvider.tsx');
const animatedHomeFiles = [
  'HeroSection.tsx',
  'SolutionsSection.tsx',
  'ExpertiseSection.tsx',
  'PartnersSection.tsx',
  'ValuePropositionSection.tsx',
  'CtaSection.tsx',
];

assert.match(motionProviderSource, /LazyMotion/);
assert.match(motionProviderSource, /features=\{domAnimation\}/);
assert.match(homePageSource, /<HomeMotionProvider>/);

for (const file of animatedHomeFiles) {
  const source = read('components', 'home', file);
  assert.match(source, /import \{ m \} from ["']framer-motion["'];/);
  assert.doesNotMatch(source, /\bmotion\./);
}
```

- [x] **Step 2: Vérifier que le nouveau test échoue**

Run:

```bash
node --experimental-strip-types --test lib/loadingPerformance.test.ts
```

Expected: FAIL parce que `HomeMotionProvider.tsx` n’existe pas encore et que les composants importent `motion`.

- [x] **Step 3: Créer le fournisseur de fonctions d’animation**

Créer `components/home/HomeMotionProvider.tsx` :

```tsx
"use client";

import { LazyMotion, domAnimation } from "framer-motion";

export default function HomeMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
```

- [x] **Step 4: Encadrer uniquement l’accueil avec le fournisseur**

Importer `HomeMotionProvider` dans `app/page.tsx` et conserver les sections dans le même ordre :

```tsx
return (
  <HomeMotionProvider>
    <main>
      <HeroSection />
      <SolutionsSection />
      <ExpertiseSection />
      <PartnersSection partners={partners} />
    </main>
  </HomeMotionProvider>
);
```

- [x] **Step 5: Remplacer uniquement les composants Framer complets**

Dans chacun des six composants listés, utiliser :

```tsx
import { m } from "framer-motion";
```

Puis remplacer chaque balise `motion.element` par `m.element`, sans modifier les propriétés d’animation ou les classes.

- [x] **Step 6: Vérifier tests, typage et build intermédiaire**

Run:

```bash
npm test
npm exec -- tsc --noEmit
npm run build
```

Expected: tous les contrôles réussissent et le `First Load JS` de `/` est inférieur à 163 kB.

- [x] **Step 7: Commit**

```bash
git add lib/loadingPerformance.test.ts components/home app/page.tsx
git commit -m "perf: load only required home animation features"
```

### Task 4: Réduire le travail React pendant le scroll et les traductions

**Files:**
- Modify: `lib/loadingPerformance.test.ts`
- Modify: `components/MailButtonFixed.tsx`
- Modify: `components/layout/Navbar.tsx`
- Modify: `lib/context/TranslationContext.tsx`

- [x] **Step 1: Ajouter les assertions rouges de stabilité runtime**

Ajouter à `lib/loadingPerformance.test.ts` :

```ts
const mailButtonSource = read('components', 'MailButtonFixed.tsx');
const navbarSource = read('components', 'layout', 'Navbar.tsx');
const translationSource = read('lib', 'context', 'TranslationContext.tsx');

assert.match(mailButtonSource, /const lastScrollY = useRef\(0\)/);
assert.match(mailButtonSource, /requestAnimationFrame/);
assert.doesNotMatch(mailButtonSource, /const \[lastScrollY, setLastScrollY\]/);
assert.match(navbarSource, /addEventListener\('scroll', handleScroll, \{ passive: true \}\)/);
assert.match(navbarSource, /requestAnimationFrame/);
assert.match(translationSource, /const t = useCallback/);
assert.match(translationSource, /const contextValue = useMemo/);
assert.match(translationSource, /<TranslationContext\.Provider value=\{contextValue\}>/);
```

- [x] **Step 2: Vérifier que le test échoue**

Run:

```bash
node --experimental-strip-types --test lib/loadingPerformance.test.ts
```

Expected: FAIL sur la référence de scroll, `requestAnimationFrame` ou la mémorisation du contexte.

- [x] **Step 3: Stabiliser le scroll du bouton de contact**

Dans `MailButtonFixed.tsx`, importer `useRef`, remplacer l’état `lastScrollY` par les références suivantes :

```tsx
const lastScrollY = useRef(0);
const scrollFrame = useRef<number | null>(null);
```

Remplacer l’effet d’écoute du scroll par :

```tsx
useEffect(() => {
  if (!isMounted) return;

  lastScrollY.current = window.scrollY;

  const handleScroll = () => {
    if (scrollFrame.current !== null) return;

    scrollFrame.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? 1 : -1;

      setScrollDirection(direction);
      setMoveY((previousMoveY) =>
        direction === 1
          ? Math.min(previousMoveY + 2, 12)
          : Math.max(previousMoveY - 4, -48)
      );
      lastScrollY.current = currentScrollY;
      scrollFrame.current = null;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (scrollFrame.current !== null) {
      cancelAnimationFrame(scrollFrame.current);
    }
  };
}, [isMounted]);
```

Toutes les valeurs de spring et les bornes `12`/`-48` restent inchangées.

- [x] **Step 4: Regrouper les contrôles de seuil de la navbar**

Remplacer l’effet de scroll de `Navbar.tsx` par :

```tsx
useEffect(() => {
  let scrollFrame: number | null = null;

  const updateScrolledState = () => {
    const nextIsScrolled = window.scrollY > 10;
    setIsScrolled((currentIsScrolled) =>
      currentIsScrolled === nextIsScrolled ? currentIsScrolled : nextIsScrolled
    );
  };

  const handleScroll = () => {
    if (scrollFrame !== null) return;
    scrollFrame = requestAnimationFrame(() => {
      updateScrolledState();
      scrollFrame = null;
    });
  };

  updateScrolledState();
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (scrollFrame !== null) cancelAnimationFrame(scrollFrame);
  };
}, []);
```

- [x] **Step 5: Stabiliser le contexte de traduction**

Ajouter `useCallback` et `useMemo` aux imports React, puis remplacer `t` et la valeur inline du fournisseur par :

```tsx
const t = useCallback((key: string): string => {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  return translations[key][language];
}, [language]);

const contextValue = useMemo(
  () => ({ language, setLanguage, t, dir, isClient }),
  [language, t, dir, isClient]
);

return (
  <TranslationContext.Provider value={contextValue}>
    {children}
  </TranslationContext.Provider>
);
```

- [x] **Step 6: Vérifier tests et typage**

Run:

```bash
npm test
npm exec -- tsc --noEmit
```

Expected: tous les contrôles réussissent.

- [x] **Step 7: Commit**

```bash
git add lib/loadingPerformance.test.ts components/MailButtonFixed.tsx components/layout/Navbar.tsx lib/context/TranslationContext.tsx
git commit -m "perf: reduce global rerenders during scroll"
```

### Task 5: Servir des images produit adaptées au viewport

**Files:**
- Modify: `lib/loadingPerformance.test.ts`
- Modify: `components/products/ProductCard.tsx`
- Modify: `components/products/ProductGallery.tsx`
- Modify: `app/(site)/products/[slug]/page.tsx`

- [x] **Step 1: Ajouter les assertions rouges sur les tailles d’image**

Ajouter à `lib/loadingPerformance.test.ts` :

```ts
const count = (source: string, token: string) => source.split(token).length - 1;
const productCardSource = read('components', 'products', 'ProductCard.tsx');
const productGallerySource = read('components', 'products', 'ProductGallery.tsx');
const productDetailSource = read('app', '(site)', 'products', '[slug]', 'page.tsx');

assert.equal(count(productCardSource, 'sizes='), 2);
assert.equal(count(productGallerySource, 'sizes='), 2);
assert.match(productDetailSource, /sizes="\(min-width: 1024px\) 29vw, \(min-width: 640px\) 44vw, 100vw"/);
```

- [x] **Step 2: Vérifier que le test échoue**

Run:

```bash
node --experimental-strip-types --test lib/loadingPerformance.test.ts
```

Expected: FAIL parce que ces cinq images n’ont pas encore de propriété `sizes`.

- [x] **Step 3: Décrire les largeurs réellement rendues**

Ajouter aux deux images de `ProductCard.tsx` :

```tsx
// Vue liste
sizes="(min-width: 768px) 14rem, 100vw"

// Vue grille
sizes="(min-width: 1024px) 29vw, (min-width: 640px) 44vw, 100vw"
```

Ajouter aux deux images de `ProductGallery.tsx` :

```tsx
// Image principale
sizes="(min-width: 1024px) 40vw, 100vw"

// Miniatures
sizes="(min-width: 768px) 7.5rem, 25vw"
```

Ajouter à l’image du produit associé dans `app/(site)/products/[slug]/page.tsx` :

```tsx
sizes="(min-width: 1024px) 29vw, (min-width: 640px) 44vw, 100vw"
```

Ne modifier ni `src`, ni `alt`, ni `width`, ni `height`, ni `className`, ni la priorité.

- [x] **Step 4: Vérifier tests et typage**

Run:

```bash
npm test
npm exec -- tsc --noEmit
```

Expected: tous les contrôles réussissent.

- [x] **Step 5: Commit**

```bash
git add lib/loadingPerformance.test.ts components/products/ProductCard.tsx components/products/ProductGallery.tsx 'app/(site)/products/[slug]/page.tsx'
git commit -m "perf: serve responsive product images"
```

### Task 6: Mesurer et contrôler l’absence de régression

**Files:**
- Modify: `docs/superpowers/plans/2026-08-09-loading-performance.md` uniquement pour cocher les étapes exécutées.

- [x] **Step 1: Exécuter la vérification automatisée complète**

Run:

```bash
npm test
npm exec -- tsc --noEmit
npm run build
git diff --check
```

Expected: toutes les commandes terminent avec le code 0.

- [x] **Step 2: Comparer les métriques du build**

Comparer la table finale aux références : `/` 163 kB, `/products` 125 kB, `/contact` 136 kB, `/partners` 106 kB, `/about` 100 kB. Rejeter toute hausse supérieure à 1 kB et conserver uniquement les optimisations qui réduisent la métrique ciblée ou le travail runtime démontré.

- [x] **Step 3: Tester les routes et interactions dans le navigateur**

Vérifier en desktop et mobile :

```text
/
/products
/products?brand=lenze
/products?brand=ifm
/products/[slug valide]
/about
/partners
/contact
/blog/[slug valide]
```

Contrôler les animations, la navbar au scroll, le bouton de contact, les menus, la recherche, les catégories, grille/liste, le changement FR/AR et le RTL. Aucun texte, classe ou paramètre d’animation ne doit différer.

- [x] **Step 4: Examiner les changements finaux**

Run:

```bash
git status --short
git diff HEAD~4 --stat
git log -6 --oneline
```

Expected: seuls les fichiers listés dans ce plan et la documentation sont modifiés ou commités.
