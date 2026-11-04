interface SubcategorySelectionInput {
  brand?: string | null;
  category?: string;
  requestedSubCategory?: string;
}

interface ProductWithSubcategory {
  name: string;
  subcategory: string;
}

export function getInitialSelectedSubcategory({
  brand,
  category,
  requestedSubCategory,
}: SubcategorySelectionInput) {
  if (brand === 'lenze' && category) {
    return requestedSubCategory;
  }

  return requestedSubCategory;
}

export function filterProductsForSubcategory<TProduct extends ProductWithSubcategory>(
  products: TProduct[],
  category?: string,
  selectedSubCategory?: string
) {
  const clientFilteredCategories = [
    'Variateurs et servovariateurs',
    'Motoréducteurs',
    'Moteurs',
    'Réducteurs',
  ];

  if (!clientFilteredCategories.includes(category || '') || !selectedSubCategory) {
    return products;
  }

  if (!products.some((product) => product.subcategory === selectedSubCategory)) {
    return products;
  }

  return products
    .filter((product) => product.subcategory === selectedSubCategory)
    .sort((a, b) => a.name.localeCompare(b.name));
}
