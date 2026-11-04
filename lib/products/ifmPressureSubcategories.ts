const IFM_PRESSURE_IMAGE_PATH = '/images/ifm/pressure-subcategories';

const pressureSubcategoryNames = [
  'Capteurs de pression pour applications aseptiques',
  'Capteurs de pression pour applications industrielles',
  'Capteurs de pression pour applications pneumatiques',
  'Capteurs de pression pour engins mobiles',
  'Sondes de niveau submersibles',
  'Capteurs de pression avec signal de température supplémentaire via IO-Link',
] as const;

export const IFM_PRESSURE_SUBCATEGORIES = pressureSubcategoryNames.map((name, index) => ({
  name,
  image: `${IFM_PRESSURE_IMAGE_PATH}/pressure-${String(index + 1).padStart(2, '0')}.webp`,
}));
