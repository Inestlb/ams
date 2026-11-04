import {
  IFM_ASI_BUS_CATEGORY,
  IFM_CONNECTION_TECHNOLOGY_CATEGORY,
  IFM_IO_LINK_CATEGORY,
  IFM_SECURITY_TECHNOLOGY_CATEGORY,
} from './ifmInductiveSubcategories.ts';
import { isWagoRailCategory } from './wagoRailCategory.ts';
import { isWagoPowerSupplyCategory } from './wagoPowerSupplyCategory.ts';
import { isWagoInstallationCategory } from './wagoInstallationProducts.ts';

interface CategoryPageVisibilityInput {
  brand: string | null;
  category?: string;
  catalogView?: boolean;
}

export interface CategoryPageVisibility {
  showBrandCategoryOverview: boolean;
  showGenericCategoryFilter: boolean;
  showProductResults: boolean;
}

export function getCategoryPageVisibility({
  brand,
  category,
  catalogView = false,
}: CategoryPageVisibilityInput): CategoryPageVisibility {
  const showBrandCategoryOverview =
    !catalogView && !category && (brand === 'lenze' || brand === 'ifm' || brand === 'wago');
  const isIFMInductiveCategory =
    brand === 'ifm' && category === 'Détecteur Inductifs';
  const isIFMCapacitiveCategory =
    brand === 'ifm' && category === 'Détecteurs Capacitifs';
  const isIFMPhotoelectricCategory =
    brand === 'ifm' && category === 'Cellule Opto';
  const isIFMUltrasonicCategory =
    brand === 'ifm' && category === 'Détecteurs à ultrasons';
  const isIFMValveCategory =
    brand === 'ifm' && category === 'Détecteurs pour vannes';
  const isIFMCylinderCategory =
    brand === 'ifm' && category === 'Détecteurs pour vérins';
  const isIFMPressureCategory =
    brand === 'ifm' && category === 'Capteurs de pression / Capteurs de dépression';
  const isIFMLevelCategory = brand === 'ifm' && category === 'Capteurs de niveau';
  const isIFMFlowCategory = brand === 'ifm' && category === 'Capteurs de débit / débitmètres';
  const isIFMTemperatureCategory = brand === 'ifm' && category === 'Capteurs de température';
  const isIFMIOLinkCategory = brand === 'ifm' && category === IFM_IO_LINK_CATEGORY;
  const isIFMASIBusCategory = brand === 'ifm' && category === IFM_ASI_BUS_CATEGORY;
  const isIFMSecurityTechnologyCategory =
    brand === 'ifm' && category === IFM_SECURITY_TECHNOLOGY_CATEGORY;
  const isIFMConnectionTechnologyCategory =
    brand === 'ifm' && category === IFM_CONNECTION_TECHNOLOGY_CATEGORY;
  const isWAGORailCategory = isWagoRailCategory(brand, category);
  const isWAGOPowerSupplyCategory = isWagoPowerSupplyCategory(brand, category);
  const isWAGOInstallationCategoryPage = isWagoInstallationCategory(brand, category);
  const isCatalogSubcategoryOverview = catalogView && (
    isIFMInductiveCategory ||
    isIFMCapacitiveCategory ||
    isIFMPhotoelectricCategory ||
    isIFMUltrasonicCategory ||
    isIFMValveCategory ||
    isIFMCylinderCategory ||
    isIFMPressureCategory ||
    isIFMLevelCategory ||
    isIFMFlowCategory ||
    isIFMTemperatureCategory ||
    isIFMIOLinkCategory ||
    isIFMASIBusCategory ||
    isIFMSecurityTechnologyCategory ||
    isIFMConnectionTechnologyCategory ||
    isWAGORailCategory ||
    isWAGOPowerSupplyCategory
  );

  return {
    showBrandCategoryOverview,
    showGenericCategoryFilter:
      catalogView || (
      !showBrandCategoryOverview &&
      brand !== 'ifm' &&
      !isWAGORailCategory &&
      !isWAGOPowerSupplyCategory &&
      !isWAGOInstallationCategoryPage),
    showProductResults:
      !isCatalogSubcategoryOverview && (catalogView || (
      !showBrandCategoryOverview &&
      !isWAGORailCategory &&
      !isWAGOPowerSupplyCategory &&
      !isIFMInductiveCategory &&
      !isIFMCapacitiveCategory &&
      !isIFMPhotoelectricCategory &&
      !isIFMUltrasonicCategory &&
      !isIFMValveCategory &&
      !isIFMCylinderCategory &&
      !isIFMPressureCategory &&
      !isIFMLevelCategory &&
      !isIFMFlowCategory &&
      !isIFMTemperatureCategory &&
      !isIFMIOLinkCategory &&
      !isIFMASIBusCategory &&
      !isIFMSecurityTechnologyCategory &&
      !isIFMConnectionTechnologyCategory)),
  };
}
