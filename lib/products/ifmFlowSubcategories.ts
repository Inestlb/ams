const IFM_FLOW_IMAGE_PATH = '/images/ifm/flow-subcategories';

const flowSubcategoryGroups = [
  {
    title: 'Liquides',
    names: [
      'Débitmètres électromagnétiques',
      'Débitmètres vortex avec afficheur',
      'Capteurs mécatroniques avec afficheur',
      'Capteurs de débit compacts avec afficheur',
      'Capteurs de débit compacts en boîtier inox',
      'Capteurs de débit compacts pour zones aseptiques',
      'Capteurs de débit en concept mécanique modulaire',
      'Capteurs mécatroniques',
      'Débitmètres mécatroniques dans les applications haute pression',
      'Débitmètres vortex',
      'Boîtiers de contrôle',
      'Débitmètres à ultrasons',
      'Débitmètres à pince',
      'Tableau de commande pour eau de refroidissement',
    ],
  },
  {
    title: 'Milieu gazeux',
    names: [
      "Systèmes de mesure de la consommation d'air comprimé et de gaz industriels",
      'Capteurs de débit en concept mécanique modulaire',
      "Capteurs de débit d'air",
      'Boîtiers de contrôle',
      'Capteurs de contrôle de plaquage',
      'Appareil portatif pour la localisation de fuites',
    ],
  },
] as const;

let subcategoryIndex = 0;

export const IFM_FLOW_SUBCATEGORY_GROUPS = flowSubcategoryGroups.map(({ title, names }) => ({
  title,
  subcategories: names.map((name) => {
    subcategoryIndex += 1;

    return {
      name,
      image: `${IFM_FLOW_IMAGE_PATH}/flow-${String(subcategoryIndex).padStart(2, '0')}.webp`,
    };
  }),
}));
