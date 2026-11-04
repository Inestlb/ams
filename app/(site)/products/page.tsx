import { Suspense } from 'react';
import { getProductCatalog, getProductCategories, getProducts } from '@/data/products';
import type { ProductCatalogResult } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import SearchBar from '@/components/products/SearchBar';
import { Loader2 } from 'lucide-react';
import { normalizeProductPage } from '@/lib/products/catalog';
import { isCompactBrandOverviewPage } from '@/lib/products/productsPageLayout';

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
    brand?: string;
    q?: string;
    page?: string;
    catalog?: string;
  }>;
}

export const metadata = {
  title: 'Tous les produits | Entreprise d\'Exportation Industrielle',
  description: 'Parcourez notre catalogue de produits industriels de haute qualité pour l\'exportation mondiale',
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category;
  const subcategory = resolvedSearchParams.subcategory;
  const brand = resolvedSearchParams.brand;
  const search = resolvedSearchParams.q;
  const page = normalizeProductPage(resolvedSearchParams.page);
  const isCatalogView = !brand || resolvedSearchParams.catalog === 'all';
  const isWagoRailCategory = brand === 'wago' && category === 'Bornes sur rail';
  const isWagoPowerSupplyCategory = brand === 'wago' && category === "Système d'alimentation";
  const isCompactOverview = isCompactBrandOverviewPage({ brand, category, catalogView: isCatalogView });

  const productsOptions: {
    category?: string;
    subcategory?: string;
    brand?: string;
    search?: string;
    page: number;
  } = {
    category,
    brand,
    search,
    page,
  };
  if (
    !(brand === 'lenze' && (
      category === 'Variateurs et servovariateurs' ||
      category === 'Motoréducteurs' ||
      category === 'Moteurs'
    ))
  ) {
    productsOptions.subcategory = subcategory;
  }
  const catalogPromise: Promise<ProductCatalogResult> = isCatalogView
    ? getProductCatalog(productsOptions)
    : getProducts(productsOptions).then((products) => ({
        products,
        total: products.length,
        page: 1,
        totalPages: 1,
      }));
  const categoriesPromise = getProductCategories(brand);
  const [catalog, categories] = await Promise.all([
    catalogPromise,
    categoriesPromise,
  ]);

  let pageTitle = 'Tous les produits';
  if (brand === 'lenze') {
    pageTitle = 'Nos Produits Lenze';
    if (category === 'Variateurs et servovariateurs') {
      pageTitle = 'Variateurs et servovariateurs Lenze';
      if (subcategory) {
        pageTitle = `${subcategory} Lenze`;
      }
    }
  } else if (brand === 'ifm') {
    pageTitle = 'Nos Produits IFM';
  } else if (brand === 'wago') {
    pageTitle = 'Nos Produits WAGO';
  }

  return (
    <div className="bg-white">
      <div className="bg-[#0b2f4f]">
        <div className={`max-w-[1400px] mx-auto px-6 md:px-12 ${isCompactOverview ? 'pt-6 pb-5' : 'pt-10 pb-8'}`}>
          <h1 className={`text-2xl font-semibold text-white ${isCompactOverview ? 'mb-4' : 'mb-6'}`}>{pageTitle}</h1>
          {!isWagoRailCategory && !isWagoPowerSupplyCategory && (
            <SearchBar
              products={catalog.products}
              initialQuery={search || ''}
            />
          )}
        </div>
      </div>

      <div className={`max-w-[1400px] mx-auto px-6 md:px-12 ${isCompactOverview ? 'pt-6' : 'pt-8'} pb-12`}>
        <Suspense fallback={
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[#e47925]" />
          </div>
        }>
          <ProductGrid
            products={catalog.products}
            categories={categories}
            filterOptions={{
              category,
              subcategory,
              brand,
              search,
              page: catalog.page,
            }}
            totalProducts={catalog.total}
            totalPages={catalog.totalPages}
          />
        </Suspense>
      </div>
    </div>
  );
}
