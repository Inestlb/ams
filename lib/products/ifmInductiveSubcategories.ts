export const IFM_INDUCTIVE_CATEGORY = 'Détecteur Inductifs';
export const IFM_CAPACITIVE_CATEGORY = 'Détecteurs Capacitifs';
export const IFM_PHOTOELECTRIC_CATEGORY = 'Cellule Opto';
export const IFM_ULTRASONIC_CATEGORY = 'Détecteurs à ultrasons';
export const IFM_VALVE_CATEGORY = 'Détecteurs pour vannes';
export const IFM_CYLINDER_CATEGORY = 'Détecteurs pour vérins';
export const IFM_PRESSURE_CATEGORY = 'Capteurs de pression / Capteurs de dépression';
export const IFM_LEVEL_CATEGORY = 'Capteurs de niveau';
export const IFM_FLOW_CATEGORY = 'Capteurs de débit / débitmètres';
export const IFM_TEMPERATURE_CATEGORY = 'Capteurs de température';
export const IFM_IO_LINK_CATEGORY = 'IO LINK';
export const IFM_ASI_BUS_CATEGORY = 'Communication Industrielle ASI BUS';
export const IFM_SECURITY_TECHNOLOGY_CATEGORY = 'Technologie de sécurité';
export const IFM_CONNECTION_TECHNOLOGY_CATEGORY = 'Technologie de connexion';

const IFM_IMAGE_PATH = '/images/ifm/inductive-subcategories';
const IFM_CAPACITIVE_IMAGE_PATH = '/images/ifm/capacitive-subcategories';
const IFM_PHOTOELECTRIC_IMAGE_PATH = '/images/ifm/photoelectric-subcategories';
const IFM_ULTRASONIC_IMAGE_PATH = '/images/ifm/ultrasonic-subcategories';
const IFM_IO_LINK_IMAGE_PATH = '/images/ifm/io-link-subcategories';
const IFM_ASI_BUS_IMAGE_PATH = '/images/ifm/asi-bus-subcategories';
const IFM_SECURITY_TECHNOLOGY_IMAGE_PATH = '/images/ifm/security-technology-subcategories';

const subcategoryIdsAndNames = [
  ['210', 'Détecteurs de distance haute précision / PProx'],
  ['010', 'Distance de commutation égale sur tous les métaux'],
  ['020', 'Applications industrielles, mobiles, de lubrifiants-réfrigérants'],
  ['030', 'Avec IO-Link'],
  ['040', 'Détecteurs tout inox'],
  ['050', 'Pour utilisation en zones aseptiques'],
  ['060', 'Utilisation dans des lubrifiants-réfrigérants'],
  ['070', 'Utilisation dans des engins mobiles'],
  ['080', 'Utilisation dans des applications de soudure'],
  ['090', 'Détecteur de sécurité'],
  ['100', 'Utilisation en zones explosibles'],
  ['110', 'Détecteurs pour espaces réduits'],
  ['120', 'Détecteurs analogiques'],
  ['130', 'Utilisation dans des fluides agressifs'],
  ['140', 'Détecteurs AC/DC et AC'],
  ['150', 'Détecteurs à grande portée'],
  ['160', "Utilisation pour des températures ambiantes élevées jusqu'à 180 °C"],
  ['170', 'Détecteurs annulaires et détecteurs de petites pièces dans un tube'],
  ['180', 'Détecteurs à fente'],
  ['190', 'Détection sélective de métaux ferreux'],
  ['200', 'Détecteurs résistants à la pression'],
] as const;

export const IFM_INDUCTIVE_SUBCATEGORIES = subcategoryIdsAndNames.map(([id, name]) => ({
  id,
  name,
  image: `${IFM_IMAGE_PATH}/200_010_010_${id}.jpg`,
}));

const capacitiveSubcategoryIdsAndNames = [
  ['010', 'Détection à travers de parois non métalliques'],
  ['020', 'Mesure de niveau capacitive sans contact avec le fluide'],
  ['030', 'Utilisation dans l’industrie plastique'],
  ['040', 'Utilisation en zones explosibles'],
  ['050', 'Utilisation dans les industrie électroniques et du semiconducteur'],
  ['060', 'Petits boîtiers parallélépipédiques'],
  ['070', 'Boîtier M12'],
  ['080', 'Avec IO-Link'],
  ['090', 'Portée augmentée pour le convoyage'],
  ['100', 'Détecteurs AC/DC'],
  ['110', 'Avec rampe de LED indiquant le seuil de commutation'],
  ['120', 'Détecteurs sensitifs à diamètre de 100 mm'],
  ['160', 'Détecteurs sensitifs capacitifs en boîtier M22'],
  ['140', "Utilisation pour des températures de fluide élevées jusqu'à 250 °C"],
  ['150', 'Boîtier métallique'],
] as const;

export const IFM_CAPACITIVE_SUBCATEGORIES = capacitiveSubcategoryIdsAndNames.map(([id, name]) => ({
  id,
  name,
  image: `${IFM_CAPACITIVE_IMAGE_PATH}/200_010_030_${id}.avif`,
}));

const photoelectricSubcategoryGroups = [
  {
    title: 'Capteurs photoélectriques',
    names: [
      "Boîtier M18 pour l'automatisation industrielle",
      'Boîtier M18 pour zones humides',
      "Boîtier M18 Cube pour l'automatisation industrielle",
      'Boîtier M18 Cube pour zones humides',
      "Boîtier parallélépipédique O5 pour l'automatisation industrielle",
      'Boîtier parallélépipédique O4 très grande portée',
      'Petit boîtier parallélépipédique O6',
      'Petit boîtier parallélépipédique O6 pour zones humides',
      'Utilisation dans la technologie du montage et de la manutention',
      'Utilisation dans des lubrifiants-réfrigérants',
      'Petit boîtier parallélépipédique O7',
      'Boîtier miniature O8',
      "Petit boîtier parallélépipédique OJ pour l'automatisation industrielle",
      'Type M18 en boîtier plastique',
      'Boîtier M18 avec émission de lumière latérale',
      'Utilisation en zones explosibles',
      'Détecteurs de distance type O1D',
      'Détecteurs de distance type O1D avec une portée de 75 m',
      'Détecteurs de distance type OMH',
      'Détecteurs de distance boîtier M30 avec utilisation intuitive',
      'Détecteurs de distance boîtier M30',
      'Détecteurs de distance type O5 avec afficheur',
      'Fourniture de la valeur de distance via IO-Link',
      "PMD Profiler pour la détection de profils d'objets",
      'Barrières de mesure',
    ],
  },
  {
    title: 'Fourches optiques / fourches optiques à 90°',
    names: ['Fourches optiques', 'Fourches optiques à 90°'],
  },
  {
    title: 'Fibres optiques et amplificateurs',
    names: [
      'Amplificateurs pour fibres optiques acryliques',
      'Amplificateurs pour fibres optiques verre',
      'Amplificateurs pour fibres optiques plastiques multivoies',
      'Amplificateurs pour fibres optiques multivoies en verre',
      'Toutes les fibres optiques',
      'Fibres optiques plastiques',
      'Fibres optiques verre',
      'Fibres optiques pour les zones à hautes températures',
    ],
  },
  {
    title: 'Capteurs photoélectriques pour applications spécifiques',
    names: [
      'Détecteurs de couleurs haute résolution',
      'Détecteurs de contraste',
      'Détection de verre et de film transparent',
      'Détection de niveau sans contact',
    ],
  },
] as const;

let photoelectricSubcategoryIndex = 0;

export const IFM_PHOTOELECTRIC_GROUPS = photoelectricSubcategoryGroups.map(({ title, names }) => ({
  title,
  subcategories: names.map((name) => {
    photoelectricSubcategoryIndex += 1;
    const imageIndex = String(photoelectricSubcategoryIndex).padStart(2, '0');

    return {
      name,
      image: `${IFM_PHOTOELECTRIC_IMAGE_PATH}/cellule-opto-${imageIndex}.webp`,
    };
  }),
}));

const ultrasonicSubcategoryNames = [
  'Type M18 Cube en boîtier métallique',
  'Boîtier court M18',
  'Boîtier long M18',
  'Boîtier M30',
  'Détecteurs tout inox',
] as const;

export const IFM_ULTRASONIC_SUBCATEGORIES = ultrasonicSubcategoryNames.map((name, index) => ({
  name,
  image: `${IFM_ULTRASONIC_IMAGE_PATH}/ultrasonic-${String(index + 1).padStart(2, '0')}.webp`,
}));

const ioLinkSubcategoryGroups = [
  {
    title: 'Maîtres / modules',
    names: ['Maître IO-Link', 'Modules IO-Link'],
  },
  {
    title: 'Capteurs / identification',
    names: [
      'Détecteurs de position IO-Link',
      'Capteurs process IO-Link',
      'Détecteurs IO-Link pour le contrôle de mouvements',
      "Systèmes d'identification IO-Link",
    ],
  },
  {
    title: 'Accessoires',
    names: [
      'Accessoires IO-Link / technologie de connexion',
      'IO-Link - alimentation en tension',
      'Affichages / signalisation IO-Link',
      'Convertisseurs IO-Link',
    ],
  },
  {
    title: 'Paramétrage / kits de démarrage',
    names: ['Kits de démarrage IO-Link'],
  },
] as const;

let ioLinkSubcategoryIndex = 0;

export const IFM_IO_LINK_GROUPS = ioLinkSubcategoryGroups.map(({ title, names }) => ({
  title,
  subcategories: names.map((name) => {
    ioLinkSubcategoryIndex += 1;

    return {
      name,
      image: `${IFM_IO_LINK_IMAGE_PATH}/io-link-${String(ioLinkSubcategoryIndex).padStart(2, '0')}.webp`,
    };
  }),
}));

const asiBusSubcategoryGroups = [
  {
    title: 'Systèmes de contrôle-commande',
    names: ['Maîtres AS-Interface', 'Systèmes de commande industriels SmartPLC'],
  },
  {
    title: 'Module / maître',
    names: [
      'Modules de terrain Ethernet',
      'Modules E/S AS-Interface',
      'Composants pour bus de terrain',
    ],
  },
  {
    title: 'Systèmes / capteurs',
    names: ['Systèmes et capteurs AS-Interface'],
  },
  {
    title: 'Alimentation en tension',
    names: ['Alimentations et contrôleurs AS-Interface'],
  },
  {
    title: "Domaines d'application",
    names: [
      'AS-Interface Safety at Work',
      'AS-Interface pour applications en zones explosibles',
    ],
  },
] as const;

let asiBusSubcategoryIndex = 0;

export const IFM_ASI_BUS_GROUPS = asiBusSubcategoryGroups.map(({ title, names }) => ({
  title,
  subcategories: names.map((name) => {
    asiBusSubcategoryIndex += 1;

    return {
      name,
      image: `${IFM_ASI_BUS_IMAGE_PATH}/asi-bus-${String(asiBusSubcategoryIndex).padStart(2, '0')}.webp`,
    };
  }),
}));

const securityTechnologySubcategoryGroups = [
  {
    title: 'Capteurs',
    names: [
      'Détecteurs de sécurité inductifs',
      'Barrages immatériels de sécurité',
      'Barrières de sécurité multifaiseaux',
      'Détecteurs de sécurité à codage magnétique / RFID',
    ],
  },
  {
    title: 'Communication industrielle',
    names: [
      'Systèmes de contrôle-commande de sécurité',
      'AS-Interface Safety at Work',
      'Sécurité machine via IO-Link',
    ],
  },
  {
    title: 'Alimentation en tension',
    names: ['Relais de sécurité'],
  },
] as const;

let securityTechnologySubcategoryIndex = 0;

export const IFM_SECURITY_TECHNOLOGY_GROUPS = securityTechnologySubcategoryGroups.map(({ title, names }) => ({
  title,
  subcategories: names.map((name) => {
    securityTechnologySubcategoryIndex += 1;

    return {
      name,
      image: `${IFM_SECURITY_TECHNOLOGY_IMAGE_PATH}/security-${String(securityTechnologySubcategoryIndex).padStart(2, '0')}.webp`,
    };
  }),
}));

export function shouldShowIFMCategorySubcategories(
  brand: string | null,
  category?: string,
): boolean {
  return brand === 'ifm' && (
    category === IFM_INDUCTIVE_CATEGORY ||
    category === IFM_CAPACITIVE_CATEGORY ||
    category === IFM_PHOTOELECTRIC_CATEGORY ||
    category === IFM_ULTRASONIC_CATEGORY ||
    category === IFM_VALVE_CATEGORY ||
    category === IFM_CYLINDER_CATEGORY ||
    category === IFM_PRESSURE_CATEGORY ||
    category === IFM_LEVEL_CATEGORY ||
    category === IFM_FLOW_CATEGORY ||
    category === IFM_TEMPERATURE_CATEGORY ||
    category === IFM_IO_LINK_CATEGORY ||
    category === IFM_ASI_BUS_CATEGORY ||
    category === IFM_SECURITY_TECHNOLOGY_CATEGORY ||
    category === IFM_CONNECTION_TECHNOLOGY_CATEGORY
  );
}

export function shouldShowIFMInductiveSubcategories(
  brand: string | null,
  category?: string,
): boolean {
  return brand === 'ifm' && category === IFM_INDUCTIVE_CATEGORY;
}
