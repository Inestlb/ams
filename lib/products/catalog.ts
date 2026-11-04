export const PRODUCTS_PER_PAGE = 24;

export function normalizeProductPage(value?: number | string | null): number {
  const parsed = typeof value === 'number' ? value : Number.parseInt(value ?? '', 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function paginateProducts<T>(products: T[], requestedPage?: number) {
  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE));
  const page = Math.min(normalizeProductPage(requestedPage), totalPages);
  const start = (page - 1) * PRODUCTS_PER_PAGE;

  return {
    products: products.slice(start, start + PRODUCTS_PER_PAGE),
    total,
    page,
    totalPages,
  };
}
