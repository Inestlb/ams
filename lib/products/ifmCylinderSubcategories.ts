const IFM_CYLINDER_IMAGE_PATH = '/images/ifm/cylinder-subcategories';

const cylinderSubcategoryNames = [
  'Appropriés pour vérins à rainure en T',
  'Appropriés pour vérins à rainure en C',
  "Appropriés pour d'autres types de vérin",
  'Détecteurs résistants à la pression pour vérins hydrauliques',
  'Utilisation dans des applications de soudure',
  "Haut courant de sortie pour l'emploi sur vérins à rainure en T",
  'IO-Link - Détecteurs pour vérins',
  'Appropriés pour vérins IMI Norgren à rainure en C',
  'Détecteurs pour vérins avec aide au réglage',
] as const;

export const IFM_CYLINDER_SUBCATEGORIES = cylinderSubcategoryNames.map((name, index) => ({
  name,
  image: `${IFM_CYLINDER_IMAGE_PATH}/cylinder-${String(index + 1).padStart(2, '0')}.webp`,
}));
