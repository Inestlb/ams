const IFM_LEVEL_IMAGE_PATH = '/images/ifm/level-subcategories';

const levelSubcategoryGroups = [
  {
    title: 'Mesure continue',
    names: [
      'Mesure de niveau capacitive sans contact avec le fluide',
      'Utilisation dans le nettoyage et les lubrifiants-réfrigérants et les huiles hydrauliques',
      'Concept de sondes modulaire',
      'Concept de sondes modulaire pour applications aseptiques',
      'Capteurs de pression tout inox affleurants avec afficheur',
      'Manomètres à contact électroniques avec affichage analogique',
      'Transmetteurs de pression affleurants',
      'Sondes de niveau submersibles',
      'Détecteurs de distance laser pour mesure sans contact',
      'Détecteurs à ultrasons',
      'Mesure du niveau sans contact',
      'Mesure du niveau sans contact pour applications aseptiques',
    ],
  },
  {
    title: 'Contrôle de niveau TOR',
    names: [
      'Utilisation dans le nettoyage et les lubrifiants-réfrigérants et les huiles hydrauliques',
      'Utilisation dans des applications industrielles',
      'Utilisation dans des applications aseptiques',
      'Détecteurs capacitifs pour la détection du niveau limite',
      'Boîtiers de contrôle pour régulation de niveau',
      "Utilisation en zones à risque d'explosion",
    ],
  },
] as const;

let subcategoryIndex = 0;

export const IFM_LEVEL_SUBCATEGORY_GROUPS = levelSubcategoryGroups.map(({ title, names }) => ({
  title,
  subcategories: names.map((name) => {
    subcategoryIndex += 1;

    return {
      name,
      image: `${IFM_LEVEL_IMAGE_PATH}/level-${String(subcategoryIndex).padStart(2, '0')}.webp`,
    };
  }),
}));
