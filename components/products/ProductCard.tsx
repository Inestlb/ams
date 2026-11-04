"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleViewDetails = () => {
    setIsLoading(true);
    router.push(`/products/${product.id}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const isWhiteProduct = product.image && (
    product.image.includes('smvector') ||
    product.image.includes('8400') ||
    product.id === 'lenze-017'
  );

  const displayTitle = product.header_title || product.name;

  return (
    <div className="group h-full border border-[#cacdcf] bg-white hover:border-[#0b2f4f] transition-colors">
      {viewMode === 'list' ? (
        <div className="flex h-full">
          <div
            className="relative w-28 sm:w-36 shrink-0 flex items-center justify-center cursor-pointer bg-[#0b2f4f]"
            onClick={handleViewDetails}
          >
            {(!product.image || imageError) ? (
              <span className="text-white/30 text-2xl font-bold select-none">{displayTitle.charAt(0)}</span>
            ) : (
              <div className={`w-full h-full flex items-center justify-center bg-[#f8f9fa] ${isWhiteProduct ? 'white-product-image' : ''}`}>
                <Image
                  src={product.image}
                  alt={displayTitle}
                  width={200}
                  height={200}
                  sizes="(min-width: 768px) 14rem, 100vw"
                  className="object-contain w-auto h-full max-w-full p-3"
                  onError={handleImageError}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col flex-1 min-w-0 border-l border-[#cacdcf]">
            <div className="p-4 cursor-pointer flex-1" onClick={handleViewDetails}>
              <h3 className="text-[14px] font-semibold text-[#0b2f4f] leading-snug line-clamp-1 mb-1 group-hover:text-[#e47925]">
                {displayTitle}
              </h3>
              <p className="text-[13px] text-[#6b7280] leading-relaxed line-clamp-2">
                {product.description}
              </p>
            </div>
            <div className="px-4 py-3 border-t border-[#cacdcf]">
              <button
                className="flex items-center gap-1.5 text-[12px] font-medium text-[#0b2f4f] hover:text-white hover:bg-[#e47925] border border-[#0b2f4f] py-2 px-3 disabled:opacity-50"
                onClick={handleViewDetails}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Chargement...</span>
                  </>
                ) : (
                  <>
                    <span>Voir les détails</span>
                    <ArrowRight className="h-3 w-3" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="relative aspect-square w-full flex items-center justify-center cursor-pointer bg-[#f8f9fa]"
            onClick={handleViewDetails}
          >
            {(!product.image || imageError) ? (
              <span className="text-[#cacdcf] text-4xl font-bold select-none">{displayTitle.charAt(0)}</span>
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${isWhiteProduct ? 'white-product-image' : ''}`}>
                <Image
                  src={product.image}
                  alt={displayTitle}
                  width={400}
                  height={300}
                  sizes="(min-width: 1024px) 29vw, (min-width: 640px) 44vw, 100vw"
                  className="object-contain w-auto h-full max-w-full p-6"
                  onError={handleImageError}
                />
              </div>
            )}
          </div>
          <div className="border-t border-[#cacdcf] p-5 cursor-pointer flex flex-col flex-1" onClick={handleViewDetails}>
            <h3 className="text-[15px] font-semibold text-[#0b2f4f] leading-snug line-clamp-1 mb-2 group-hover:text-[#e47925]">
              {displayTitle}
            </h3>
            <p className="text-[13px] text-[#6b7280] leading-relaxed line-clamp-2 flex-1">
              {product.description}
            </p>
          </div>
          <div className="border-t border-[#cacdcf] px-5 py-4">
            <button
              className="w-full flex items-center justify-center gap-2 text-[13px] font-medium text-[#0b2f4f] hover:text-white hover:bg-[#e47925] border border-[#0b2f4f] py-2.5 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleViewDetails}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Chargement...</span>
                </>
              ) : (
                <>
                  <span>Voir les détails</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
