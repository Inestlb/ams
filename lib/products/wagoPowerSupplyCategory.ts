export const WAGO_POWER_SUPPLY_CATEGORY = "Système d'alimentation";

export const WAGO_POWER_SUPPLY_CATEGORY_CONTENT = {
  title: "Systèmes d'alimentation WAGO",
  image: '/images/wago/systeme-d-alimentation-clean.png',
  imageAlt: "Systèmes d'alimentation WAGO",
  introduction:
    "Avec le degré croissant d'automatisation, les exigences en matière d'alimentation fiable en tension et en courant augmentent également. Les systèmes d'alimentation innovants et efficaces de WAGO offrent des solutions polyvalentes pour presque toutes les applications, qu'il s'agisse d'alimentations de communication ou de blocs d'alimentation pour applications de base. L'alimentation est complétée par des dispositifs système tels que des fusibles électroniques, des alimentations sans coupure (ASC) ainsi que des modules de redondance. Les appareils adaptés les uns aux autres donnent le système d'alimentation parfait.",
  advantagesTitle: 'Vos avantages',
  advantages: [
    'Variantes de sortie de 5 … 48 V DC et/ou 24 … 960 W (1 … 40 A)',
    'Des approbations valables dans le monde entier pour des applications des plus variées',
    "Système d'alimentation complet grâce aux dispositifs système tels que l'ASC, les modules de secours capacitifs, les disjoncteurs électroniques, les modules de redondance et les convertisseurs DC/DC",
  ],
  contactMessage: 'Pour toute demande de références,',
} as const;

export function isWagoPowerSupplyCategory(brand: string | null, category?: string) {
  return brand === 'wago' && category === WAGO_POWER_SUPPLY_CATEGORY;
}
