const IFM_VALVE_IMAGE_PATH = '/images/ifm/valve-subcategories';

const valveSubcategoryNames = [
  'Détecteur intelligent pour vannes ¼ de tour',
  'Détecteurs pour actionneurs 1/4 de tour',
  'Détecteurs pour vannes et actionneurs 1/4 de tour',
  'Positionneur pour vannes industrielles 1/4 de tour',
  'Détecteurs pour vannes à tige montante',
  'Cames porte-drapeaux pour actionneurs 1/4 de tour',
  'Kits de montage pour vannes manuelles',
  'Vannes',
  'Câbles avec prise mâle pour électrovannes',
  'Prolongateurs avec connecteur pour électrovannes',
] as const;

export const IFM_VALVE_SUBCATEGORIES = valveSubcategoryNames.map((name, index) => ({
  name,
  image: `${IFM_VALVE_IMAGE_PATH}/valve-${String(index + 1).padStart(2, '0')}.webp`,
}));
