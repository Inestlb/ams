export const WAGO_RAIL_CATEGORY = 'Bornes sur rail';

export const WAGO_RAIL_CATEGORY_CONTENT = {
  title: WAGO_RAIL_CATEGORY,
  image: '/images/wago/bornes-sur-rail-clean.png',
  imageAlt: 'Bornes WAGO sur rail',
  introduction:
    'Le plus grand choix de bornes sur rail par le leader du marché. Vous trouverez ici les meilleures bornes sur rail pour toutes les applications et des informations sur les questions fréquemment posées ! Le portefeuille de produits complet et puissant vous offre la base pour votre solution.',
  advantagesTitle: 'Vos avantages :',
  advantages: [
    "Variante de manipulation appropriée disponible selon l'application",
    'Un portefeuille de produits complet et puissant pour chaque application',
    'Sécurité maximale : essais au-delà des exigences des normes',
    'Technologie de serrage à ressort éprouvée : rapide, résistante aux vibrations et sans entretien',
    "Réduction des coûts grâce à des temps de câblage plus courts, une mise en service plus rapide et l'élimination des coûts de service",
    "Aucun pré-traitement des conducteurs requis - économisez les embouts d'extrémité et le processus de sertissage.",
  ],
  closing:
    'Réponses aux questions fréquemment posées telles que la connexion/le câblage des bornes sur rail, le repérage, le pontage ou les réglementations dans les conseils pratiques.',
  contactMessage: 'Pour toute demande de références,',
} as const;

export function isWagoRailCategory(brand: string | null, category?: string) {
  return brand === 'wago' && category === WAGO_RAIL_CATEGORY;
}
