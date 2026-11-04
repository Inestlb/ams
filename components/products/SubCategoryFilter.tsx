"use client";

import { useState, useEffect } from 'react';
import { 
  LENZE_VARIATEUR_SUBCATEGORIES, 
  LENZE_MOTOREDUCTEUR_SUBCATEGORIES,
  LENZE_MOTEUR_SUBCATEGORIES,
  LENZE_REDUCTEUR_SUBCATEGORIES,
} from '@/lib/types';

interface SubCategoryFilterProps {
  mainCategory: string;
  selectedSubCategory?: string;
  onSubCategoryChange: (subCategory?: string) => void;
}

export default function SubCategoryFilter({
  mainCategory,
  selectedSubCategory,
  onSubCategoryChange
}: SubCategoryFilterProps) {
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    if (mainCategory === 'Variateurs et servovariateurs') {
      setSubCategories(Object.keys(LENZE_VARIATEUR_SUBCATEGORIES));
    } else if (mainCategory === 'Motoréducteurs') {
      setSubCategories(Object.keys(LENZE_MOTOREDUCTEUR_SUBCATEGORIES));
    } else if (mainCategory === 'Moteurs') {
      setSubCategories(Object.keys(LENZE_MOTEUR_SUBCATEGORIES));
    } else if (mainCategory === 'Réducteurs') {
      setSubCategories(Object.keys(LENZE_REDUCTEUR_SUBCATEGORIES));
    } else {
      setSubCategories([]);
    }
  }, [mainCategory]);

  useEffect(() => {
    setShowAll(false);
  }, [mainCategory, selectedSubCategory]);

  const handleShowAll = () => {
    setShowAll(true);
    onSubCategoryChange(undefined);
  };
  
  if (subCategories.length === 0) {
    return null;
  }

  let title = '';
  let buttons = null;
  
  if (mainCategory === 'Variateurs et servovariateurs') {
    title = 'Types de variateurs';
    buttons = (
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={handleShowAll}
          className={`px-4 py-2 text-[13px] font-medium rounded-none ${
            showAll || !selectedSubCategory
              ? "bg-[#e47925] text-white border border-[#e47925]"
              : "bg-white border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]"
          }`}
        >
          Tous les produits
        </button>
        {subCategories.map((subCategory) => (
          <button
            key={subCategory}
            onClick={() => {
              onSubCategoryChange(subCategory);
            }}
            className={`px-4 py-2 text-[13px] font-medium rounded-none ${
              selectedSubCategory === subCategory
                ? "bg-[#e47925] text-white border border-[#e47925]"
                : "bg-white border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]"
            }`}
          >
            {(LENZE_VARIATEUR_SUBCATEGORIES as Record<string, string>)[subCategory]}
          </button>
        ))}
      </div>
    );
  } else if (mainCategory === 'Motoréducteurs') {
    title = 'Types de motoréducteurs';
    buttons = (
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={handleShowAll}
          className={`px-4 py-2 text-[13px] font-medium rounded-none ${
            showAll || !selectedSubCategory
              ? "bg-[#e47925] text-white border border-[#e47925]"
              : "bg-white border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]"
          }`}
        >
          Tous les produits
        </button>
        {subCategories.map((subCategory) => (
          <button
            key={subCategory}
            onClick={() => {
              onSubCategoryChange(subCategory);
            }}
            className={`px-4 py-2 text-[13px] font-medium rounded-none ${
              selectedSubCategory === subCategory
                ? "bg-[#e47925] text-white border border-[#e47925]"
                : "bg-white border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]"
            }`}
          >
            {(LENZE_MOTOREDUCTEUR_SUBCATEGORIES as Record<string, string>)[subCategory]}
          </button>
        ))}
      </div>
    );
  } else if (mainCategory === 'Moteurs') {
    title = 'Types de moteurs';
    buttons = (
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={handleShowAll}
          className={`px-4 py-2 text-[13px] font-medium rounded-none ${
            showAll || !selectedSubCategory
              ? "bg-[#e47925] text-white border border-[#e47925]"
              : "bg-white border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]"
          }`}
        >
          Tous les produits
        </button>
        {subCategories.map((subCategory) => (
          <button
            key={subCategory}
            onClick={() => {
              onSubCategoryChange(subCategory);
            }}
            className={`px-4 py-2 text-[13px] font-medium rounded-none ${
              selectedSubCategory === subCategory
                ? "bg-[#e47925] text-white border border-[#e47925]"
                : "bg-white border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]"
            }`}
          >
            {(LENZE_MOTEUR_SUBCATEGORIES as Record<string, string>)[subCategory]}
          </button>
        ))}
      </div>
    );
  } else if (mainCategory === 'Réducteurs') {
    title = 'Types de réducteurs';
    buttons = (
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={handleShowAll}
          className={`px-4 py-2 text-[13px] font-medium rounded-none ${
            showAll || !selectedSubCategory
              ? "bg-[#e47925] text-white border border-[#e47925]"
              : "bg-white border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]"
          }`}
        >
          Tous les produits
        </button>
        {subCategories.map((subCategory) => (
          <button
            key={subCategory}
            onClick={() => {
              onSubCategoryChange(subCategory);
            }}
            className={`px-4 py-2 text-[13px] font-medium rounded-none ${
              selectedSubCategory === subCategory
                ? "bg-[#e47925] text-white border border-[#e47925]"
                : "bg-white border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]"
            }`}
          >
            {(LENZE_REDUCTEUR_SUBCATEGORIES as Record<string, string>)[subCategory]}
          </button>
        ))}
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-[#0b2f4f]">{title}</h2>
        <div className="h-px flex-1 bg-[#e47925] opacity-30" />
      </div>
      <p className="text-[13px] text-[#6b7280] mt-1 mb-1">Sélectionnez une catégorie pour filtrer les produits</p>
      {buttons}
    </div>
  );
}
