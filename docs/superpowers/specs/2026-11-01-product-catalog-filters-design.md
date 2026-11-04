# Conception du catalogue complet et de ses filtres

## Contexte

Les actions « Voir les produits » sur l’accueil et « Tous les produits » dans le menu pointent déjà vers `/products`. Cependant, la page ne présente actuellement qu’un petit extrait du catalogue dans certains cas : `getProducts` applique une pagination de huit produits par défaut, le filtre de marque n’est pas intégré à l’interface générale, et les vues de marque affichent principalement des vignettes de catégories. Les contrôles existants ne pilotent pas tous les paramètres de recherche et de pagination de façon cohérente.

Le catalogue rassemble les données déjà chargées par `getAllProducts` (données statiques et catalogues Lenze, IFM et WAGO). Cette intervention ne crée ni ne remplace aucune donnée produit.

## Objectif

Faire de `/products` une entrée unique vers l’ensemble du catalogue : les deux actions de navigation existantes ouvrent le même catalogue complet, l’utilisateur peut le filtrer par marque puis par catégorie, et toutes les pages de résultats restent accessibles avec un compteur et une pagination exacts.

## Expérience attendue

- La page `/products` sans filtres affiche les produits de toutes les marques et sources actuellement présentes dans le catalogue, pas seulement les huit premiers.
- Les filtres sont présentés en deux niveaux : une première rangée « Marques » avec « Tous les produits », Lenze, IFM et WAGO ; une seconde rangée « Catégories » avec les catégories pertinentes pour la sélection courante. Sans marque sélectionnée, les catégories pertinentes à l’ensemble du catalogue sont disponibles.
- Sélectionner une marque affiche les produits de cette marque, en plus des catégories qui lui correspondent. La vue ne se limite pas aux vignettes de catégories.
- « Tous les produits » efface la marque, la catégorie, la sous-catégorie, la recherche et le numéro de page, et revient à `/products` sans filtres.
- Les filtres s’appliquent à l’ensemble des résultats avant pagination. La pagination standard contient 24 produits par page ; le compteur indique le nombre exact de résultats correspondant aux filtres, indépendamment du nombre de produits de la page courante.
- Changer de marque, de catégorie, de sous-catégorie ou de recherche revient à la première page. La navigation entre pages conserve les autres filtres.
- Les filtres, la recherche et la page courante sont reflétés dans l’URL afin que rechargement, navigation précédent/suivant et partage d’un lien restituent le même état.
- Les libellés et catégories restent dans les formes canoniques déjà utilisées par le catalogue ; aucune traduction ou donnée n’est ajoutée dans le cadre de cette fonctionnalité.

## Conception retenue

### Navigation et état URL

Les deux entrées existantes — le CTA de l’accueil et l’entrée « Tous les produits » du menu — restent liées à `/products`. La page lit les paramètres `brand`, `category`, `subcategory`, `q` et `page`. Les contrôles de marque et de catégorie mettent à jour ces paramètres via la navigation Next.js, sans créer une deuxième route de catalogue ni un état client distinct.

Un changement de filtre supprime les paramètres devenus incompatibles et remet `page` à 1. « Tous les produits » supprime tous les paramètres de filtre et de pagination. Les liens de pagination ne modifient que `page`. Les valeurs de page absentes ou invalides sont normalisées vers la première page.

### Résolution des résultats

Les filtres de marque, catégorie, sous-catégorie et recherche sont appliqués sur la liste complète issue de `getAllProducts`, dans cet ordre logique, puis les résultats sont paginés. Le filtrage de marque utilise les règles déjà présentes pour identifier Lenze, IFM et WAGO ; la catégorie provient des catégories déjà associées aux produits. La pagination standard utilise une constante partagée de 24 produits par page afin que le nombre de résultats et les limites de pages soient calculés à partir de la même sélection complète.

La page doit transmettre à la grille le total non paginé en plus des produits de la page courante. Le compteur et le nombre de pages sont calculés à partir de ce total, pas de la tranche retournée. Une page sans résultat présente l’état vide existant, avec une action permettant de supprimer les filtres.

### Organisation des filtres et des résultats

Le filtre de marque est ajouté au-dessus du filtre de catégorie. La marque et les catégories sélectionnées sont visuellement identifiables. Les catégories proposées changent selon la marque choisie et ne doivent pas inclure des catégories sans produit correspondant. La grille affiche les résultats filtrés pour la vue générale et les vues de marque ; elle ne remplace pas les pages de catégorie spécialisées déjà en place.

Les vues éditorialisées et les composants dédiés aux pages détaillées, notamment les contenus WAGO pour les bornes sur rail, le système d’alimentation et les bornes d’installation, restent inchangés. Les vues spécialisées IFM/Lenze et leurs sous-catégories conservent leur présentation existante, tout en respectant les filtres et le total exacts lorsque ces vues affichent une liste paginée de produits.

## Hors périmètre

- Modifier le contenu, l’ordre, les images, les descriptions ou les fiches des produits.
- Créer une route ou une source de données catalogue supplémentaire.
- Modifier les pages d’accueil, le menu ou les pages détaillées au-delà de vérifier que leurs liens de catalogue convergent vers `/products`.
- Reconcevoir les pages éditorialisées WAGO ou les composants de sous-catégories existants.
- Ajouter une nouvelle stratégie de recherche, un tri configurable ou des filtres techniques qui ne correspondent pas aux catégories déjà présentes dans les données.

## Stratégie de vérification

### Tests automatisés

- Vérifier que l’appel sans filtres renvoie l’ensemble du catalogue et qu’un filtre de marque retourne uniquement les produits de cette marque.
- Vérifier le filtrage combiné marque/catégorie/sous-catégorie/recherche, le calcul du total non paginé et les tranches de 24 produits sans doublon ni omission.
- Vérifier les paramètres URL : sélection des filtres, remise de la page à 1, conservation des filtres lors d’un changement de page, normalisation des pages invalides et remise à zéro de « Tous les produits ».
- Vérifier que les catégories proposées correspondent à la marque et aux produits disponibles.
- Vérifier que les exceptions éditoriales WAGO et les pages de catégorie dédiées gardent leur rendu et leur comportement existants.
- Vérifier que les CTA de l’accueil et du menu continuent de cibler `/products`.

### Vérification dans le navigateur

- Ouvrir `/products`, puis chaque marque ; confirmer que le nombre total est cohérent et que les produits, filtres et pages suivants sont accessibles.
- Combiner une marque avec une catégorie et parcourir plusieurs pages ; vérifier qu’un rafraîchissement et précédent/suivant conservent l’état.
- Effacer les filtres avec « Tous les produits » et confirmer le retour à l’intégralité du catalogue.
- Contrôler une catégorie détaillée WAGO et une catégorie spécialisée IFM/Lenze pour détecter toute régression visuelle ou fonctionnelle.

## Critères d’acceptation

- L’accueil et le menu ouvrent le même catalogue complet sur `/products`.
- Aucun filtre « Tous les produits » ne se limite à huit éléments : le total représente toutes les données présentes.
- Les filtres de marque précèdent les catégories pertinentes, et la sélection d’une marque affiche ses produits.
- Le découpage standard est de 24 résultats par page, avec un total exact et des paramètres d’URL partageables.
- Les filtres et la pagination fonctionnent ensemble et restent cohérents après rechargement.
- Les pages éditorialisées et détaillées hors périmètre restent inchangées.
- Les tests ciblés, le contrôle TypeScript, le build et la vérification navigateur réussissent.
