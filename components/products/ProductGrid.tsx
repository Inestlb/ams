"use client";

import { useMemo, useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import LenzeCategoryCards from './LenzeCategoryCards';
import IFMCategoryCards from './IFMCategoryCards';
import WAGOCategoryCards from './WAGOCategoryCards';
import WAGORailCategoryContent from './WAGORailCategoryContent';
import WAGOPowerSupplyCategoryContent from './WAGOPowerSupplyCategoryContent';
import IFMInductiveSubcategories from './IFMInductiveSubcategories';
import IFMCapacitiveSubcategories from './IFMCapacitiveSubcategories';
import IFMPhotoelectricSubcategories from './IFMPhotoelectricSubcategories';
import IFMUltrasonicSubcategories from './IFMUltrasonicSubcategories';
import IFMValveSubcategories from './IFMValveSubcategories';
import IFMCylinderSubcategories from './IFMCylinderSubcategories';
import IFMPressureSubcategories from './IFMPressureSubcategories';
import IFMLevelSubcategories from './IFMLevelSubcategories';
import IFMFlowSubcategories from './IFMFlowSubcategories';
import IFMTemperatureSubcategories from './IFMTemperatureSubcategories';
import IFMIOLinkSubcategories from './IFMIOLinkSubcategories';
import IFMASIBusSubcategories from './IFMASIBusSubcategories';
import IFMSecurityTechnologySubcategories from './IFMSecurityTechnologySubcategories';
import IFMConnectionTechnologySubcategories from './IFMConnectionTechnologySubcategories';
import SubCategoryFilter from './SubCategoryFilter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Grid, List } from 'lucide-react';
import { Product, ProductFilterOptions } from '@/lib/types';
import { filterProductsForSubcategory, getInitialSelectedSubcategory } from '@/lib/products/subcategorySelection';
import { getCategoryPageVisibility } from '@/lib/products/categoryPageVisibility';
import { isWagoPowerSupplyCategory } from '@/lib/products/wagoPowerSupplyCategory';
import { buildProductsUrl, resetProductsUrl, type ProductNavigationChanges } from '@/lib/products/productsPageNavigation';
import {
  IFM_CAPACITIVE_CATEGORY,
  IFM_PHOTOELECTRIC_CATEGORY,
  IFM_ULTRASONIC_CATEGORY,
  IFM_VALVE_CATEGORY,
  IFM_CYLINDER_CATEGORY,
  IFM_PRESSURE_CATEGORY,
  IFM_LEVEL_CATEGORY,
  IFM_FLOW_CATEGORY,
  IFM_TEMPERATURE_CATEGORY,
  IFM_IO_LINK_CATEGORY,
  IFM_ASI_BUS_CATEGORY,
  IFM_SECURITY_TECHNOLOGY_CATEGORY,
  IFM_CONNECTION_TECHNOLOGY_CATEGORY,
  shouldShowIFMCategorySubcategories,
} from '@/lib/products/ifmInductiveSubcategories';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  categories?: string[];
  filterOptions?: ProductFilterOptions;
  onFilterChange?: (filters: Partial<ProductFilterOptions>) => void;
  totalProducts?: number;
  totalPages?: number;
}

export default function ProductGrid({
  products,
  isLoading = false,
  categories = [],
  filterOptions = {},
  onFilterChange,
  totalProducts,
  totalPages = 1,
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const brand = searchParams.get('brand');
  const isCatalogView = searchParams.get('catalog') === 'all' || !brand;
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>(
    getInitialSelectedSubcategory({
      brand,
      category: filterOptions.category,
      requestedSubCategory: filterOptions.subcategory,
    })
  );
  useEffect(() => {
    setSelectedSubCategory(
      getInitialSelectedSubcategory({
        brand,
        category: filterOptions.category,
        requestedSubCategory: filterOptions.subcategory,
      })
    );
  }, [brand, filterOptions.category, filterOptions.subcategory]);

  const applyFilters = (changes: ProductNavigationChanges) => {
    const navigate = () => {
      if (onFilterChange) {
        onFilterChange(changes);
        return;
      }
      router.push(
        buildProductsUrl(new URLSearchParams(searchParams.toString()), changes),
        { scroll: false },
      );
    };

    startTransition(navigate);
  };

  const applyCatalogFilters = (changes: ProductNavigationChanges) => {
    applyFilters({ ...changes, catalog: true });
  };

  const handlePageChange = (page: number) => applyFilters({ page });
  
  const handleCategorySelect = (category: string) => {
    setSelectedSubCategory(undefined);
    applyFilters({ category, subcategory: undefined, page: 1 });
  };
  
  const handleSubCategoryChange = (subCategory?: string) => {
    setSelectedSubCategory(subCategory);
    if (isCatalogView) {
      applyCatalogFilters({ subcategory: subCategory, page: 1 });
    } else {
      applyFilters({ subcategory: subCategory, page: 1 });
    }
  };

  const isVariateurPage = brand === 'lenze' && filterOptions.category === 'Variateurs et servovariateurs';
  const isMotoreducteurPage = brand === 'lenze' && filterOptions.category === 'Motoréducteurs';
  const isMoteursPage = brand === 'lenze' && filterOptions.category === 'Moteurs';
  const isReducteurPage = brand === 'lenze' && filterOptions.category === 'Réducteurs';
  const hasSubcategories = isVariateurPage || isMotoreducteurPage || isMoteursPage || isReducteurPage;
  const {
    showBrandCategoryOverview,
    showGenericCategoryFilter,
    showProductResults,
  } = getCategoryPageVisibility({
    brand,
    category: filterOptions.category,
    catalogView: isCatalogView,
  });
  const isWAGORailCategory = brand === 'wago' && filterOptions.category === 'Bornes sur rail';
  const isWAGOPowerSupplyCategory = isWagoPowerSupplyCategory(brand, filterOptions.category);
  const backToCategoriesHref = isCatalogView
    ? brand
      ? `/products?catalog=all&brand=${encodeURIComponent(brand)}`
      : '/products'
    : brand
      ? `/products?brand=${encodeURIComponent(brand)}`
      : '/products';
  const showBackToCategories = Boolean(filterOptions.category);
  const filteredProducts = useMemo(
    () => isCatalogView
      ? products
      : filterProductsForSubcategory(products, filterOptions.category, selectedSubCategory),
    [isCatalogView, products, filterOptions.category, selectedSubCategory],
  );
  const visibleTotal = isCatalogView ? (totalProducts ?? products.length) : filteredProducts.length;

  return (
    <div className="w-full">
      {showBackToCategories && (
        <div className="px-6 md:px-12 mb-6">
          <Link
            href={backToCategoriesHref}
            className="inline-flex items-center gap-2 border border-[#0b2f4f] bg-[#0b2f4f] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:border-[#e47925] hover:bg-[#e47925]"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux catégories
          </Link>
        </div>
      )}

      {(isCatalogView || (!hasSubcategories && (showBrandCategoryOverview || showGenericCategoryFilter))) && (
          <div className="w-full mb-10">
            {!isCatalogView && showBrandCategoryOverview && (
              <div className="mb-10">
                {brand === 'ifm' ? (
                  <IFMCategoryCards />
                ) : brand === 'wago' ? (
                  <WAGOCategoryCards />
                ) : (
                  <LenzeCategoryCards
                    categories={categories}
                    selectedCategory={filterOptions.category}
                    onCategorySelect={handleCategorySelect}
                  />
                )}
              </div>
            )}
            {isCatalogView && !filterOptions.category && (brand === 'ifm' || brand === 'wago') && (
              <div className="mb-10">
                {brand === 'ifm' ? (
                  <IFMCategoryCards catalogView={isCatalogView} />
                ) : (
                  <WAGOCategoryCards catalogView={isCatalogView} />
                )}
              </div>
            )}
            {(isCatalogView || showGenericCategoryFilter) && (
              <ProductFilter
                categories={categories}
                selectedBrand={brand}
                showBrandFilter={isCatalogView}
                onBrandChange={(nextBrand) => {
                  setSelectedSubCategory(undefined);
                  if (nextBrand) {
                    applyCatalogFilters({
                      brand: nextBrand,
                      category: undefined,
                      subcategory: undefined,
                      page: 1,
                    });
                  } else {
                    startTransition(() => {
                      router.push(resetProductsUrl(), { scroll: false });
                    });
                  }
                }}
                selectedCategory={filterOptions.category}
                onCategoryChange={(category) => {
                  setSelectedSubCategory(undefined);
                  if (isCatalogView) {
                    applyCatalogFilters({ category, subcategory: undefined, page: 1 });
                  } else {
                    applyFilters({ category, subcategory: undefined, page: 1 });
                  }
                }}
              />
            )}
          </div>
        )}

      {isWAGORailCategory && (
        <div className="mb-10">
          <WAGORailCategoryContent />
        </div>
      )}

      {isWAGOPowerSupplyCategory && (
        <div className="mb-10">
          <WAGOPowerSupplyCategoryContent />
        </div>
      )}

      {shouldShowIFMCategorySubcategories(brand, filterOptions.category) && (!isCatalogView || brand === 'ifm') && (
        <div className="px-6 md:px-12 mb-10">
          {filterOptions.category === IFM_CAPACITIVE_CATEGORY ? (
            <IFMCapacitiveSubcategories />
          ) : filterOptions.category === IFM_PHOTOELECTRIC_CATEGORY ? (
            <IFMPhotoelectricSubcategories />
          ) : filterOptions.category === IFM_ULTRASONIC_CATEGORY ? (
            <IFMUltrasonicSubcategories />
          ) : filterOptions.category === IFM_VALVE_CATEGORY ? (
            <IFMValveSubcategories />
          ) : filterOptions.category === IFM_CYLINDER_CATEGORY ? (
            <IFMCylinderSubcategories />
          ) : filterOptions.category === IFM_PRESSURE_CATEGORY ? (
            <IFMPressureSubcategories />
          ) : filterOptions.category === IFM_LEVEL_CATEGORY ? (
            <IFMLevelSubcategories />
          ) : filterOptions.category === IFM_FLOW_CATEGORY ? (
            <IFMFlowSubcategories />
          ) : filterOptions.category === IFM_TEMPERATURE_CATEGORY ? (
            <IFMTemperatureSubcategories />
          ) : filterOptions.category === IFM_IO_LINK_CATEGORY ? (
            <IFMIOLinkSubcategories />
          ) : filterOptions.category === IFM_ASI_BUS_CATEGORY ? (
            <IFMASIBusSubcategories />
          ) : filterOptions.category === IFM_SECURITY_TECHNOLOGY_CATEGORY ? (
            <IFMSecurityTechnologySubcategories />
          ) : filterOptions.category === IFM_CONNECTION_TECHNOLOGY_CATEGORY ? (
            <IFMConnectionTechnologySubcategories />
          ) : (
            <IFMInductiveSubcategories />
          )}
        </div>
      )}
      
      {hasSubcategories && (
        <div className="px-6 md:px-12 mb-8">
          <SubCategoryFilter
            mainCategory={filterOptions.category || ''}
            selectedSubCategory={selectedSubCategory}
            onSubCategoryChange={handleSubCategoryChange}
          />
        </div>
      )}
      
      {showProductResults && (
        <div className="flex justify-between items-center mb-8 px-6 md:px-12">
          <p className="text-[13px] text-[#0b2f4f] font-medium">
            {isLoading ? 'Chargement des produits...' : (
              <>
                Affichage de <span className="text-[#e47925]">{visibleTotal}</span> produits
              </>
            )}
          </p>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
              aria-label="Vue en grille"
              className={`rounded-none ${
                viewMode === 'grid'
                  ? 'bg-[#e47925] text-white border-[#e47925]'
                  : 'bg-white border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]'
              }`}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
              aria-label="Vue en liste"
              className={`rounded-none ${
                viewMode === 'list'
                  ? 'bg-[#e47925] text-white border-[#e47925]'
                  : 'bg-white border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]'
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {showProductResults && isLoading && (
        <div className="flex flex-col justify-center items-center py-16 px-6 md:px-12">
          <div className="w-6 h-6 border-2 border-[#cacdcf] border-t-[#e47925] animate-spin"></div>
          <p className="mt-4 text-[13px] text-[#6b7280]">Chargement des produits...</p>
        </div>
      )}

      {showProductResults && !isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-[#f8f9fa] mx-6 md:mx-12">
          <h3 className="text-lg font-semibold text-[#34383c]">Aucun produit trouvé</h3>
          <p className="mt-3 text-[13px] text-[#6b7280]">
            Essayez d&apos;ajuster votre recherche ou vos filtres pour trouver ce que vous cherchez.
          </p>
          <Button
            className="mt-6 rounded-none text-[#e47925] text-[13px] py-2 px-4 border border-[#e47925] bg-white hover:bg-[#e47925] hover:text-white"
            onClick={() => {
              setSelectedSubCategory(undefined);
              startTransition(() => {
                router.push(resetProductsUrl(), { scroll: false });
              });
            }}
          >
            Effacer les filtres
          </Button>
        </div>
      )}

      {showProductResults && !isLoading && filteredProducts.length > 0 && (
        <div className="px-6 md:px-12">
          {hasSubcategories ? (
            <div className="space-y-10">
              {!selectedSubCategory && (
                <div className="mb-4 border-l-[3px] border-[#0b2f4f] pl-4">
                  <h2 className="text-lg font-semibold text-[#0b2f4f]">Nos {filterOptions.category} par catégorie</h2>
                  <p className="text-[13px] text-[#6b7280] mt-1">Sélectionnez une catégorie ci-dessus pour filtrer les produits</p>
                </div>
              )}
              
              {(selectedSubCategory ? [selectedSubCategory] : [...new Set(filteredProducts.map(p => p.subcategory))]).map(subcategory => {
                const subcategoryProducts = filteredProducts.filter(p => p.subcategory === subcategory);
                
                if (subcategoryProducts.length === 0) return null;
                
                return (
                  <div key={subcategory} className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className={`text-base font-semibold border-l-[3px] pl-3 py-0.5 ${
                        subcategory === selectedSubCategory
                          ? 'border-[#e47925] text-[#0b2f4f]'
                          : 'border-[#0b2f4f] text-[#0b2f4f]'
                      }`}>
                        {subcategory}
                      </h3>
                      <span className="text-[12px] text-[#e47925] font-medium bg-[#fef3e8] px-2 py-0.5">
                        {subcategoryProducts.length} produits
                      </span>
                    </div>
                    <div className={`${
                      viewMode === 'grid'
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        : "space-y-4"
                    }`}>
                      {subcategoryProducts.map((product) => (
                        <div 
                          key={product.id} 
                        >
                          <ProductCard product={product} viewMode={viewMode} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={`${
              viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-4"
            }`}>
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                >
                  <ProductCard product={product} viewMode={viewMode} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showProductResults && totalPages > 1 && (isCatalogView || !hasSubcategories) && (
        <div className="flex justify-center mt-12 px-6 md:px-12">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === filterOptions.page ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={`rounded-none py-2 px-4 text-[13px] ${
                  page === filterOptions.page 
                    ? "bg-[#e47925] text-white border-[#e47925]"
                    : "border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925] bg-white"
                }`}
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
