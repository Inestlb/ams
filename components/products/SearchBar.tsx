"use client";

import { useState, useEffect, useRef, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Loader2 } from 'lucide-react';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { Product } from '@/lib/types';
import Link from 'next/link';
import { buildProductsUrl } from '@/lib/products/productsPageNavigation';

interface SearchBarProps {
  products: Product[];
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  products,
  initialQuery = '',
  onSearch
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [, startTransition] = useTransition();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSearchTerm(initialQuery);
    setSearchResults([]);
    setIsDropdownOpen(false);
  }, [initialQuery]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const results = products.filter(product =>
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ).slice(0, 5);

    setSearchResults(results);
    setIsSearching(false);
    setIsDropdownOpen(true);
  }, [debouncedSearchTerm, products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (onSearch) {
        onSearch(searchTerm);
      } else {
        startTransition(() => {
          router.push(
            buildProductsUrl(new URLSearchParams(searchParams.toString()), {
              search: searchTerm.trim(),
            }),
            { scroll: false },
          );
        });
      }
      setIsDropdownOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsDropdownOpen(false);
    if (onSearch) {
      onSearch('');
    } else {
      startTransition(() => {
        router.push(
          buildProductsUrl(new URLSearchParams(searchParams.toString()), {
            search: undefined,
          }),
          { scroll: false },
        );
      });
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#e47925]">
          <Search className="h-4 w-4" />
        </div>
        <Input
          type="text"
          placeholder="Rechercher des produits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-none border-[#e47925] bg-white text-[#e47925] py-3 pl-10 pr-10 text-[15px] focus:border-[#e47925] focus:ring-1 focus:ring-[#e47925] placeholder:text-[#9ca3af]"
          onFocus={() => {
            setIsDropdownOpen(!!searchTerm);
          }}
        />
        <div className="absolute right-0 top-0 h-full flex items-center pr-2">
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 mr-0.5 text-[#e47925]/60 hover:text-[#e47925]"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {searchTerm && (
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#e47925] hover:text-[#c4621a]"
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </form>

      {isDropdownOpen && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[#cacdcf] shadow-lg">
          <ul className="py-1">
            {searchResults.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/products/${product.id}`}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f8f9fa] text-[15px] border-l-2 border-transparent hover:border-[#e47925]"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#34383c] truncate">{product.name}</div>
                    <div className="text-[12px] text-[#0b2f4f] mt-0.5">{product.category}</div>
                  </div>
                  <span className="text-[11px] text-[#e47925] font-medium shrink-0">
                    {product.subcategory}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#cacdcf]">
            <Button
              variant="ghost"
              className="w-full justify-center px-4 py-2.5 text-[13px] font-medium text-white bg-[#0b2f4f] hover:bg-[#e47925] rounded-none"
              onClick={handleSubmit}
            >
              Voir tous les résultats pour &quot;{searchTerm}&quot;
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
