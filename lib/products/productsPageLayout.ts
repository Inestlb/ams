export function isCompactBrandOverviewPage({
  brand,
  category,
  catalogView = false,
}: {
  brand: string | null | undefined;
  category?: string;
  catalogView?: boolean;
}): boolean {
  return !catalogView && (brand === 'wago' || brand === 'ifm' || brand === 'lenze') && !category;
}
