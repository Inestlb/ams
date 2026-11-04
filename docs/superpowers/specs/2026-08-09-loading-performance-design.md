# Conception de l’optimisation prudente du chargement

## Contexte

Le site UTC utilise Next.js 15, React 19 et l’App Router. Le build de production de référence du 9 août 2026 est valide et mesure les coûts JavaScript initiaux suivants :

| Route | Taille propre | First Load JS |
| --- | ---: | ---: |
| `/` | 9,12 kB | 163 kB |
| `/products` | 7,91 kB | 125 kB |
| `/contact` | 176 B | 136 kB |
| `/partners` | 495 B | 106 kB |
| `/about` | 146 B | 100 kB |

Le socle partagé représente 100 kB. Les principaux leviers identifiés sont les animations Framer Motion de l’accueil, les mises à jour déclenchées à chaque événement de défilement, la stabilité du contexte de traduction, les ressources de police inutilisées et la précision des indications de taille données à `next/image`.

## Objectif

Réduire le JavaScript initial, le travail d’hydratation et les calculs répétés afin d’accélérer le premier affichage et de fluidifier le défilement et les transitions, sans modifier le contenu, le rendu, les animations, les URL, les données, les formulaires ou les interactions.

## Contraintes et non-objectifs

- Aucun texte, média, ordre de section, style ou comportement visible ne change.
- Les durées, délais, courbes et déclencheurs des animations existantes sont conservés.
- Les traductions française et arabe, la direction RTL et la langue mémorisée restent identiques.
- Les filtres, la recherche, les catégories, les pages produit et les formulaires conservent les mêmes entrées et sorties.
- Aucune mise à niveau de Next.js, React ou d’une autre dépendance n’est incluse.
- Aucun nouveau service, suivi analytique ou cache externe n’est ajouté.
- Une optimisation qui ne produit pas de gain mesurable ou qui crée une différence fonctionnelle ou visuelle est abandonnée.

## Approche retenue

L’intervention combine deux niveaux prudents :

1. des réglages de configuration et de ressources qui n’affectent pas le contenu ;
2. des optimisations ciblées des bundles et des rendus, limitées aux chemins critiques prouvés par l’audit.

Une refonte générale des pages en nouveaux composants serveur est exclue de cette intervention, car son risque de régression dépasse les gains attendus dans le périmètre prudent.

## Architecture des changements

### 1. Ressources globales et configuration

`app/layout.tsx` conserve les mêmes métadonnées, la même langue initiale et la même structure HTML. Les imports `next/font` de Poppins et Playfair Display seront supprimés parce qu’aucune classe ni règle CSS du projet ne consomme leurs variables. Inter et la classe `font-sans` restent en place afin de ne pas changer la typographie réellement utilisée. Les préconnexions Google Fonts, inutiles avec les fichiers auto-hébergés par `next/font`, seront retirées. Le préchargement manuel du logo sera également retiré : le HTML de production de référence confirme que l’image prioritaire de la barre de navigation génère déjà son propre `preload` avec le `srcset` optimisé.

`next.config.mjs` conservera la compression, AVIF/WebP, `optimizePackageImports` et le chargeur d’images actuel. Le cache minimal des transformations d’images locales passera de 60 secondes à 86 400 secondes. Aucun en-tête immuable ne sera appliqué aux chemins de médias éditoriaux afin qu’un fichier remplacé sous le même nom puisse encore être mis à jour après expiration du cache.

Les composants `next/image` dont la largeur rendue dépend du viewport recevront une propriété `sizes` fidèle aux grilles CSS existantes. Les dimensions, classes, priorités et sources ne changeront pas. Cela permet au navigateur de sélectionner un fichier plus petit sans réduire la résolution requise.

### 2. Animations de l’accueil

Les composants d’accueil conserveront toutes leurs propriétés `initial`, `animate`, `whileInView`, `whileHover`, `viewport` et `transition`. Ils utiliseront les composants allégés `m` sous un unique `LazyMotion` configuré avec `domAnimation`, car les fonctions actuellement utilisées ne nécessitent ni glisser-déposer ni projection de layout.

Le fournisseur de mouvement sera limité à l’accueil. Le bouton de contact global restera indépendant afin de ne pas déplacer le coût des animations de l’accueil vers toutes les routes. Le résultat sera conservé uniquement si le build montre une baisse du bundle de `/` et si les animations se déclenchent avec les mêmes paramètres.

### 3. Fluidité du défilement global

`MailButtonFixed` conservera la même position, la même amplitude calculée et la même animation spring. Les valeurs qui servent uniquement à comparer deux positions de défilement seront stockées dans des références plutôt que dans l’état React. Un seul écouteur passif sera enregistré pendant la durée de vie du composant, et les mises à jour visuelles seront regroupées au maximum une fois par frame avec `requestAnimationFrame`.

La barre de navigation conservera son seuil de 10 pixels, ses hauteurs et ses classes. Son écouteur de défilement deviendra passif et ne demandera une mise à jour React que lorsque l’état au-dessus/en dessous du seuil change.

Ces changements suppriment les réabonnements d’écouteurs et les rendus sans effet tout en gardant exactement les mêmes états visibles.

### 4. Stabilité du contexte de traduction

La fonction `t` et l’objet exposé par `TranslationProvider` seront stabilisés avec `useCallback` et `useMemo`. Les consommateurs ne seront ainsi pas notifiés lorsque les valeurs publiques du contexte n’ont pas changé. La détection de langue, `localStorage`, les attributs `lang` et `dir`, la classe arabe et la valeur de repli française restent inchangés.

Le dictionnaire et ses clés ne seront ni déplacés ni modifiés dans cette intervention, afin d’éviter tout risque sur le contenu traduit.

### 5. Catalogue et recherche

Le catalogue est déjà obtenu côté serveur sur `/products`, les données et catégories sont déjà résolues en parallèle, et les données statiques disposent d’une mémorisation par requête. Cette structure sera conservée.

Les calculs client existants ne seront mémorisés ou regroupés que lorsque les dépendances sont stables et que le résultat reste strictement identique. Le hook générique Fuse.js, actuellement non utilisé par les pages rendues, ne sera pas inclus artificiellement dans le périmètre. Aucun changement d’algorithme de recherche, de classement ou de filtrage n’est autorisé.

## Stratégie de tests

### Tests automatisés

- Ajouter des tests de structure ciblés pour empêcher le retour des polices inutilisées, des imports Framer Motion complets dans l’accueil et des écouteurs de défilement réabonnés à chaque événement.
- Exécuter tous les tests TypeScript existants avec le runtime Node compatible du projet.
- Exécuter le contrôle TypeScript et le build Next.js de production.

### Vérification fonctionnelle et visuelle

- Ouvrir `/`, `/products`, une catégorie Lenze, une catégorie IFM, une fiche produit, `/about`, `/partners`, `/contact` et un article de blog.
- Vérifier la navigation desktop/mobile, les menus, le changement de langue et la direction RTL.
- Vérifier la recherche, les filtres, les sous-catégories, les vues grille/liste et les liens produits.
- Vérifier les animations d’entrée de l’accueil et le déplacement du bouton de contact pendant le défilement.
- Comparer les captures avant/après aux mêmes largeurs desktop et mobile, en acceptant uniquement les différences liées au temps de capture d’une animation en cours.

## Mesures et critères d’acceptation

Le build de référence ci-dessus sert de point de comparaison. L’intervention est acceptée si :

- le build de production et tous les tests réussissent ;
- aucune route n’augmente son `First Load JS` de plus de 1 kB ;
- le `First Load JS` de l’accueil baisse par rapport à 163 kB ;
- le nombre d’abonnements au scroll reste constant pendant le défilement ;
- le cache minimal des images optimisées vaut 86 400 secondes ;
- les contrôles fonctionnels et visuels ne révèlent aucune régression ;
- aucun texte, donnée produit, traduction, classe de style ou paramètre d’animation n’a été modifié.

Les chiffres finaux seront consignés dans le compte rendu de livraison avec l’écart par rapport à cette référence.
