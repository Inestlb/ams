"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  mainImage: string;
  additionalImages: string[];
  productName: string;
}

export default function ProductGallery({ 
  mainImage, 
  additionalImages, 
  productName
}: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState<string>(mainImage);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    setCurrentImage(mainImage);
  }, [mainImage]);
  
  const handleImageError = (imgSrc: string) => {
    setImageErrors(prev => ({
      ...prev,
      [imgSrc]: true
    }));
    
    if (imgSrc === currentImage) {
      const validImage = additionalImages.find(img => !imageErrors[img]);
      if (validImage) {
        setCurrentImage(validImage);
      }
    }
  };
  
  const isWhiteProduct = 
    mainImage.includes('smvector') || 
    mainImage.includes('8400') ||
    additionalImages.some(img => img.includes('smvector') || img.includes('8400'));
  
  const validAdditionalImages = additionalImages.filter(img => !imageErrors[img]);
  
  const allImages = imageErrors[mainImage] 
    ? [...validAdditionalImages] 
    : [mainImage, ...validAdditionalImages];
  
  const hasNoValidImages = allImages.length === 0 || allImages.every(img => imageErrors[img]);
  
  return (
    <div>
      <div className="mb-6 max-w-[500px] mx-auto">
        <div className="rounded-none bg-[#f8f9fa] border border-[#cacdcf] aspect-square relative overflow-hidden">
          {hasNoValidImages ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#6b7280] text-6xl font-bold">{productName.charAt(0)}</span>
            </div>
          ) : (
            <div className={`absolute inset-0 flex items-center justify-center p-6 ${isWhiteProduct ? 'white-product-image' : ''}`}>
              <Image
                src={currentImage}
                alt={productName}
                width={500}
                height={500}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain max-w-full max-h-full"
                onError={() => handleImageError(currentImage)}
              />
            </div>
          )}
        </div>
      </div>

      {allImages.length > 1 && (
        <>
          <p className="text-[12px] uppercase tracking-wider text-[#0b2f4f] font-medium mb-3 text-center">Vues du produit</p>
          <div className="grid grid-cols-4 gap-3 max-w-[500px] mx-auto">
            {allImages.map((imgSrc, index) => (
              <div
                key={index}
                className={`
                  cursor-pointer rounded-none border border-[#cacdcf] overflow-hidden
                  ${imgSrc === currentImage ? 'ring-2 ring-[#e47925]' : 'hover:border-[#e47925]'}
                `}
                onClick={() => setCurrentImage(imgSrc)}
              >
                <div className="aspect-square relative bg-[#f8f9fa]">
                  <div className={`absolute inset-0 flex items-center justify-center p-3 ${isWhiteProduct ? 'white-product-image' : ''}`}>
                    <Image
                      src={imgSrc}
                      alt={`${productName} - Vue ${index + 1}`}
                      width={120}
                      height={120}
                      sizes="(min-width: 768px) 7.5rem, 25vw"
                      className="object-contain max-w-full max-h-full"
                      onError={() => handleImageError(imgSrc)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
