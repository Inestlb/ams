export interface ProductNavigationChanges {
  brand?: string;
  category?: string;
  subcategory?: string;
  search?: string;
  page?: number;
  catalog?: boolean;
}

export function buildProductsUrl(
  current: URLSearchParams,
  changes: ProductNavigationChanges,
): string {
  const next = new URLSearchParams();
  const allowedParameters = new Set(['brand', 'category', 'subcategory', 'q', 'page', 'catalog']);
  current.forEach((value, key) => {
    if (allowedParameters.has(key)) next.append(key, value);
  });
  const hasFilterChange = Object.keys(changes).some((key) => key !== 'page');

  if ('brand' in changes) {
    if (changes.brand) {
      next.set('brand', changes.brand);
    } else {
      next.delete('brand');
    }
    next.delete('category');
    next.delete('subcategory');
  }
  if ('category' in changes) {
    if (changes.category) {
      next.set('category', changes.category);
    } else {
      next.delete('category');
    }
    next.delete('subcategory');
  }
  if ('subcategory' in changes) {
    if (changes.subcategory) {
      next.set('subcategory', changes.subcategory);
    } else {
      next.delete('subcategory');
    }
  }
  if ('search' in changes) {
    if (changes.search?.trim()) {
      next.set('q', changes.search.trim());
    } else {
      next.delete('q');
    }
  }

  if ('catalog' in changes) {
    if (changes.catalog) {
      next.set('catalog', 'all');
    } else {
      next.delete('catalog');
    }
  }

  if (hasFilterChange) {
    next.delete('page');
    next.set('page', '1');
  }
  else if ('page' in changes) next.set('page', String(changes.page ?? 1));

  const query = next.toString();
  return query ? `/products?${query}` : '/products';
}

export function resetProductsUrl() {
  return '/products';
}
