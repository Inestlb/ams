const IFM_TEMPERATURE_IMAGE_PATH = '/images/ifm/temperature-subcategories';

const temperatureSubcategoryNames = [
  "Transmetteurs avec afficheur pour l'industrie agroalimentaire",
  "Transmetteurs compacts pour l'utilisation industrielle",
  "Transmetteurs compacts pour l'industrie agro-alimentaire",
  'Transmetteurs compacts pour les engins mobiles',
  "Capteurs affleurants pour l'industrie agro-alimentaire",
  "Transmetteurs avec auto-contrôle pour l'industrie agro-alimentaire",
  'Sondes à boulonner et à visser',
  'Sondes rigides',
  'Sondes rigides pour applications aseptiques',
  'Boîtiers de contrôle pour capteurs de température',
  'Connecteurs transmetteurs de température',
  'Capteurs avec sonde de température et afficheur',
  'Réglage intuitif du seuil de commutation',
  'Tubes protecteurs',
  'Capteurs de température infrarouge avec afficheur',
  'Capteurs de température infrarouge analogiques avec afficheur',
  'Sondes de température de surface',
] as const;

export const IFM_TEMPERATURE_CATEGORY = 'Capteurs de température';

export const IFM_TEMPERATURE_SUBCATEGORIES = temperatureSubcategoryNames.map((name, index) => ({
  name,
  image: `${IFM_TEMPERATURE_IMAGE_PATH}/temperature-${String(index + 1).padStart(2, '0')}.webp`,
}));
