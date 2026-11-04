"use client";

import { useState, useEffect } from 'react';
import { Product, ProductFilterOptions } from '@/lib/types';
import { getProductCatalog, getProductCategories } from '@/data/products';

export function useProducts(initialOptions?: ProductFilterOptions) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<ProductFilterOptions>(initialOptions || {});
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const [catalog, categoriesData] = await Promise.all([
          getProductCatalog(filterOptions),
          getProductCategories(filterOptions.brand),
        ]);

        setProducts(catalog.products);
        setCategories(categoriesData);
        setTotalPages(catalog.totalPages);
        setTotalItems(catalog.total);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [filterOptions]);

  const updateFilters = (newFilters: Partial<ProductFilterOptions>) => {
    setFilterOptions(prev => ({
      ...prev,
      ...newFilters,
      // Reset to page 1 when filters change
      page: newFilters.page || 1,
    }));
  };

  return {
    products,
    categories,
    isLoading,
    error,
    filterOptions,
    updateFilters,
    totalPages,
    totalItems,
  };
}
