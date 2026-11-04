import { IFM_CATEGORIES, WAGO_CATEGORIES } from '../types/index.ts';

export function getCatalogBrandCategories(
  brand: string | null | undefined,
  categories: string[],
): string[] {
  if (brand === 'ifm') return Object.values(IFM_CATEGORIES);
  if (brand === 'wago') return Object.keys(WAGO_CATEGORIES);
  return categories;
}
