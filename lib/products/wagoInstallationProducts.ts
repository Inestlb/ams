import type { Product } from '@/lib/types';

export const WAGO_INSTALLATION_CATEGORY = "Bornes d'installation";

export function isWagoProduct(product: Pick<Product, 'id'>): boolean {
  return product.id.startsWith('wago-');
}

export function isWagoInstallationCategory(
  brand: string | null | undefined,
  category?: string,
): boolean {
  return brand === 'wago' && category === WAGO_INSTALLATION_CATEGORY;
}

export function sortProductResults<T extends Pick<Product, 'name'>>(
  products: T[],
  brand?: string,
  category?: string,
): T[] {
  if (isWagoInstallationCategory(brand, category)) {
    return products;
  }

  return products.sort((a, b) => a.name.localeCompare(b.name));
}

export const WAGO_INSTALLATION_PRODUCTS: Product[] = [
  {
    id: 'wago-221-423',
    name: 'Borne de raccordement avec levier (221-423)',
    category: WAGO_INSTALLATION_CATEGORY,
    subcategory: WAGO_INSTALLATION_CATEGORY,
    description:
      'La borne à levier portant le numéro d’article 221-423, permet un branchement facile et sûr.\n\nPour le raccordement du conducteur, cette borne à levier nécessite des longueurs de dénudage de 11 mm.\n\nCe produit utilise la technologie CAGE CLAMP®. Avec la technologie universelle CAGE CLAMP®, vous disposez d’un raccord fiable et sans entretien pour relier tous les types de conducteurs à l’aide d’une cage à ressort. Ni le prétraitement des conducteurs ni le sertissage d’embouts d’extrémité ne sont requis.\n\nLes dimensions sont de largeur x hauteur x profondeur (18,8 x 8,4 x 18,6) mm. Cette borne à levier est adaptée aux sections de conducteur de 0.2 mm² à 4 mm² en fonction du type de câble.\n\n• connexions durablement sûres • actionnement au moyen d’un levier • la borne est adaptée à chaque tâche de câblage',
    specifications: {},
    image: '/images/wago/installation-products/221-423-1.jpg',
    additionalImages: [
      '/images/wago/installation-products/221-423-2.jpg',
      '/images/wago/installation-products/221-423-3.jpg',
      '/images/wago/installation-products/221-423-4.jpg',
      '/images/wago/installation-products/221-423-5.jpg',
      '/images/wago/installation-products/221-423-6.jpg',
    ],
    featured: false,
  },
  {
    id: 'wago-221-413',
    name: 'Borne de raccordement avec levier (221-413)',
    category: WAGO_INSTALLATION_CATEGORY,
    subcategory: WAGO_INSTALLATION_CATEGORY,
    description:
      'La borne à levier (numéro d’article 221-413) assure une connexion facile et sécurisée.\n\nUne longueur de dénudage de 11 mm est nécessaire pour le raccordement du conducteur de cette borne à levier.\n\nCe produit utilise la technologie CAGE CLAMP®. La connexion universelle CAGE CLAMP® sûre et sans entretien permet de connecter tous types de conducteurs avec une cage à ressort, sans traitement préalable des conducteurs. Il n’est donc plus indispensable de sertir des embouts d’extrémité.\n\nLes dimensions sont de largeur x hauteur x profondeur (18,8 x 8,4 x 18,6) mm. Cette borne à levier est adaptée aux sections de conducteur de 0.2 mm² à 4 mm² en fonction du type de câble.\n\n• actionnement au moyen d’un levier • dimensions compactes • connexions durablement sûres',
    specifications: {},
    image: '/images/wago/installation-products/221-413-1.jpg',
    additionalImages: [
      '/images/wago/installation-products/221-413-2.jpg',
      '/images/wago/installation-products/221-413-3.jpg',
      '/images/wago/installation-products/221-413-4.jpg',
      '/images/wago/installation-products/221-413-5.jpg',
      '/images/wago/installation-products/221-413-6.jpg',
    ],
    featured: false,
  },
  {
    id: 'wago-221-412',
    name: 'Borne de raccordement avec levier (221-412)',
    category: WAGO_INSTALLATION_CATEGORY,
    subcategory: WAGO_INSTALLATION_CATEGORY,
    description:
      'La borne à levier avec le numéro d’article 221-412, permet un branchement facile et fiable.\n\nPour la connexion du conducteur, cette borne à levier nécessite des longueurs de dénudage de 11 mm.\n\nCe produit utilise la technologie CAGE CLAMP®. La connexion universelle, aujourd’hui connue sous le nom de CAGE CLAMP®, répond aux exigences industrielles en matière de connexion électrique et de technologie de raccordement.\n\nLes dimensions sont de largeur x hauteur x profondeur (13,1 x 8,3 x 18,6) mm. Selon le type de câble, cette borne à levier convient aux sections de conducteur allant de 0.2 mm² à 4 mm².\n\n• la borne est adaptée à chaque tâche de câblage • actionnement au moyen d’un levier • montage sûr et rapide',
    specifications: {},
    image: '/images/wago/installation-products/221-412-1.jpg',
    additionalImages: [
      '/images/wago/installation-products/221-412-2.jpg',
      '/images/wago/installation-products/221-412-3.jpg',
      '/images/wago/installation-products/221-412-4.jpg',
      '/images/wago/installation-products/221-412-5.jpg',
      '/images/wago/installation-products/221-412-6.jpg',
    ],
    featured: false,
  },
  {
    id: 'wago-221-415',
    name: 'Borne de raccordement avec levier (221-415)',
    category: WAGO_INSTALLATION_CATEGORY,
    subcategory: WAGO_INSTALLATION_CATEGORY,
    description:
      'La borne à levier (numéro d’article 221-415) assure une connexion facile et sécurisée.\n\nPour la connexion du conducteur, cette borne à levier nécessite des longueurs de dénudage de 11 mm.\n\nCe produit utilise la technologie CAGE CLAMP®. Avec la technologie universelle CAGE CLAMP®, vous disposez d’un raccord fiable et sans entretien pour relier tous les types de conducteurs à l’aide d’une cage à ressort. Ni le prétraitement des conducteurs ni le sertissage d’embouts d’extrémité ne sont nécessaires.\n\nLes dimensions sont de largeur x hauteur x profondeur (30 x 8,4 x 18,6) mm. Cette borne à levier est adaptée aux sections de conducteur de 0.2 mm² à 4 mm² en fonction du type de câble.\n\n• actionnement au moyen d’un levier • montage structuré et rapide • dimensions compactes',
    specifications: {},
    image: '/images/wago/installation-products/221-415-1.jpg',
    additionalImages: [
      '/images/wago/installation-products/221-415-2.jpg',
      '/images/wago/installation-products/221-415-3.jpg',
      '/images/wago/installation-products/221-415-4.jpg',
      '/images/wago/installation-products/221-415-5.jpg',
      '/images/wago/installation-products/221-415-6.jpg',
    ],
    featured: false,
  },
  {
    id: 'wago-2273-203',
    name: 'Connecteur de passage à enficher (2273-203)',
    category: WAGO_INSTALLATION_CATEGORY,
    subcategory: WAGO_INSTALLATION_CATEGORY,
    description:
      'La borne enfichable portant le numéro d’article 2273-203, assure une connexion facile et sécurisée.\n\nCette borne enfichable nécessite une longueur de dénudage de 11 mm pour le raccordement du conducteur.\n\nCe produit utilise la technologie PUSH WIRE®. La connexion à borne enfichable PUSH WIRE® utilise la résistance au pliage du conducteur pour l’insérer simplement en surmontant la force de serrage du contact à ressort.\n\nLes dimensions sont (14 x 5,8 x 16,7) mm en largeur x hauteur x profondeur. Selon le type de câble, cette borne enfichable s’adapte aux sections de conducteur allant de 0.5 mm² à 2.5 mm². La surface des contacts est étamée.\n\n• la borne est adaptée à chaque tâche de câblage • actionnement au moyen de push-in • montage sûr et rapide',
    specifications: {},
    image: '/images/wago/installation-products/2273-203-1.jpg',
    additionalImages: [
      '/images/wago/installation-products/2273-203-2.jpg',
      '/images/wago/installation-products/2273-203-3.jpg',
      '/images/wago/installation-products/2273-203-4.jpg',
      '/images/wago/installation-products/2273-203-5.jpg',
      '/images/wago/installation-products/2273-203-6.jpg',
    ],
    featured: false,
  },
  {
    id: 'wago-221-2411',
    name: 'Borne à leviers Inline (221-2411)',
    category: WAGO_INSTALLATION_CATEGORY,
    subcategory: WAGO_INSTALLATION_CATEGORY,
    description:
      'Avec cet inline splicing connector with levers (numéro d’article 221-2411) l’objectif primordial est de mettre en place une installation électrique sans faille.\n\nCet inline splicing connector with levers nécessite une longueur de dénudage comprise entre 11 mm pour la connexion au conducteur. Cet article utilise la technologie CAGE CLAMP®. La connexion universelle CAGE CLAMP® sûre et sans entretien permet de connecter tous types de conducteurs avec une cage à ressort, sans traitement préalable des conducteurs. Il n’est donc plus indispensable de sertir des embouts d’extrémité.\n\nLes dimensions sont (8,1 x 8,9 x 35,5) mm en largeur x hauteur x profondeur. Cet inline splicing connector with levers est adapté aux sections de conducteur de 0.2 mm² à 4 mm² en fonction du type de câble.\n\nWAGO’s 221 Series Splicing Connector with levers impresses with its innovative design for different conductor cross-sections. That’s why WAGO’s lever-equipped splicing connector holds a unique trademark within electrical interconnection technology.\n\nThe flat levers, which fit seamlessly into the 221’s base, act like a cast when closed and can be positioned neatly in any housing without disturbing edges. Due to the wide design of each leaver, they can all be operated perfectly without tools for convenient conductor terminations.\n\nThe transparent housing displays robust technology and enables immediate visual inspection for the correct contact of solid, stranded and fine-stranded conductors. Resembling piano keys, the levers’ design perfectly combines the functional and aesthetic connection technology "Made by WAGO."',
    specifications: {},
    image: '/images/wago/installation-products/221-2411-1.jpg',
    additionalImages: [
      '/images/wago/installation-products/221-2411-2.jpg',
      '/images/wago/installation-products/221-2411-3.jpg',
      '/images/wago/installation-products/221-2411-4.jpg',
    ],
    featured: false,
  },
  {
    id: 'wago-2273-205',
    name: 'Connecteur de passage à enficher (2273-205)',
    category: WAGO_INSTALLATION_CATEGORY,
    subcategory: WAGO_INSTALLATION_CATEGORY,
    description:
      'La borne enfichable portant le numéro d’article 2273-205, permet un branchement facile et fiable.\n\nCette borne enfichable nécessite une longueur de dénudage de 11 mm pour le raccordement du conducteur.\n\nCe produit utilise la technologie PUSH WIRE®. La connexion à borne enfichable PUSH WIRE® utilise la résistance au pliage du conducteur pour l’insérer simplement en surmontant la force de serrage du contact à ressort.\n\nLes dimensions sont (22 x 5,8 x 16,7) mm en largeur x hauteur x profondeur. Cette borne enfichable est adaptée aux sections de conducteur de 0.5 mm² à 2.5 mm² en fonction du type de câble. La surface des contacts est étamée.\n\n• la borne est adaptée à chaque tâche de câblage • actionnement au moyen de push-in • montage sûr et rapide',
    specifications: {},
    image: '/images/wago/installation-products/2273-205-1.jpg',
    additionalImages: [
      '/images/wago/installation-products/2273-205-2.jpg',
      '/images/wago/installation-products/2273-205-3.jpg',
      '/images/wago/installation-products/2273-205-4.jpg',
      '/images/wago/installation-products/2273-205-5.jpg',
      '/images/wago/installation-products/2273-205-6.jpg',
    ],
    featured: false,
  },
  {
    id: 'wago-221-613',
    name: 'Borne de raccordement avec levier (221-613)',
    category: WAGO_INSTALLATION_CATEGORY,
    subcategory: WAGO_INSTALLATION_CATEGORY,
    description:
      'Avec cette borne à levier (numéro d’article 221-613) la priorité est un raccordement plus simple et sûr.\n\nUne longueur de dénudage de 12 à 14 mm est nécessaire pour le raccordement du conducteur de cette borne à levier.\n\nCe produit utilise la technologie CAGE CLAMP®. La connexion universelle CAGE CLAMP® sûre et sans entretien permet de connecter tous types de conducteurs avec une cage à ressort, sans traitement préalable des conducteurs. Il n’est donc plus indispensable de sertir des embouts d’extrémité.\n\nLes dimensions sont de largeur x hauteur x profondeur (22,9 x 10,1 x 21,1) mm. Selon le type de câble, cette borne à levier est adaptée aux sections de conducteur allant de 0.5 mm² à 6 mm².\n\n• actionnement au moyen d’un levier • connexions durablement sûres • dimensions compactes',
    specifications: {},
    image: '/images/wago/installation-products/221-613-1.jpg',
    additionalImages: [
      '/images/wago/installation-products/221-613-2.jpg',
      '/images/wago/installation-products/221-613-3.jpg',
      '/images/wago/installation-products/221-613-4.jpg',
      '/images/wago/installation-products/221-613-5.jpg',
      '/images/wago/installation-products/221-613-6.jpg',
    ],
    featured: false,
  },
  {
    id: 'wago-221-612',
    name: 'Borne de raccordement avec levier (221-612)',
    category: WAGO_INSTALLATION_CATEGORY,
    subcategory: WAGO_INSTALLATION_CATEGORY,
    description:
      'La borne à levier portant le numéro d’article 221-612, garantit un branchement rapide et fiable.\n\nUne longueur de dénudage de 12 à 14 mm est nécessaire pour la connexion du conducteur de cette borne à levier.\n\nCe produit utilise la technologie CAGE CLAMP®. La connexion universelle, aujourd’hui connue sous le nom de CAGE CLAMP®, représente la norme industrielle en matière de connexion électrique et de technologie de raccordement.\n\nLes dimensions sont de largeur x hauteur x profondeur (16 x 10,1 x 21,1) mm. Cette borne à levier est adaptée aux sections de conducteur de 0.5 mm² à 6 mm² en fonction du type de câble.\n\n• prête à l’installation, immédiatement utilisable • actionnement au moyen d’un levier • dimensions compactes',
    specifications: {},
    image: '/images/wago/installation-products/221-612-1.jpg',
    additionalImages: [
      '/images/wago/installation-products/221-612-2.jpg',
      '/images/wago/installation-products/221-612-3.jpg',
      '/images/wago/installation-products/221-612-4.jpg',
      '/images/wago/installation-products/221-612-5.jpg',
      '/images/wago/installation-products/221-612-6.jpg',
    ],
    featured: false,
  },
  {
    id: 'wago-221-615',
    name: 'Borne de raccordement avec levier (221-615)',
    category: WAGO_INSTALLATION_CATEGORY,
    subcategory: WAGO_INSTALLATION_CATEGORY,
    description:
      'La borne à levier portant le numéro d’article 221-615, permet une connexion rapide et sécurisée.\n\nPour le raccordement du conducteur, cette borne à levier nécessite des longueurs de dénudage entre 12 et 14 mm.\n\nCet article utilise la technologie CAGE CLAMP®. Avec la technologie universelle CAGE CLAMP®, vous disposez d’un raccord fiable et sans entretien pour connecter tous les types de conducteurs à l’aide d’une cage à ressort. Ni le prétraitement des conducteurs ni le sertissage d’embouts d’extrémité ne sont requis.\n\nLes dimensions sont de largeur x hauteur x profondeur (36,7 x 10,1 x 21,1) mm. Selon le type de câble, cette borne à levier s’adapte aux sections de conducteur allant de 0.5 mm² à 6 mm².\n\n• montage sûr et rapide • actionnement au moyen d’un levier • dimensions compactes',
    specifications: {},
    image: '/images/wago/installation-products/221-615-1.jpg',
    additionalImages: [
      '/images/wago/installation-products/221-615-2.jpg',
      '/images/wago/installation-products/221-615-3.jpg',
      '/images/wago/installation-products/221-615-4.jpg',
      '/images/wago/installation-products/221-615-5.jpg',
      '/images/wago/installation-products/221-615-6.jpg',
    ],
    featured: false,
  },
  {
    id: 'wago-887-952',
    name: 'Kit de bornes de connexion (887-952)',
    category: WAGO_INSTALLATION_CATEGORY,
    subcategory: WAGO_INSTALLATION_CATEGORY,
    description: '',
    specifications: {},
    image: '/images/wago/installation-products/887-952-1.jpg',
    additionalImages: ['/images/wago/installation-products/887-952-2.jpg'],
    featured: false,
  },
];
