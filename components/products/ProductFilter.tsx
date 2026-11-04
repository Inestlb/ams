"use client";

import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getCatalogBrandCategories } from '@/lib/products/catalogFilterCategories';

interface ProductFilterProps {
  categories: string[];
  selectedBrand?: string | null;
  onBrandChange?: (brand?: string) => void;
  selectedCategory?: string;
  onCategoryChange: (category?: string) => void;
  showBrandFilter?: boolean;
}

const brands: Array<{ value?: string; label: string }> = [
  { value: undefined, label: 'Tous les produits' },
  { value: 'lenze', label: 'Lenze' },
  { value: 'ifm', label: 'IFM' },
  { value: 'wago', label: 'WAGO' },
];

function FilterButton({
  label,
  selected,
  onClick,
  catalogStyle,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  catalogStyle: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-none border px-5 py-2.5 text-[13px] font-medium',
        catalogStyle && 'transition-colors',
        selected
          ? 'border-[#e47925] bg-[#e47925] text-white'
          : catalogStyle
            ? 'border-[#cacdcf] bg-white text-[#34383c] hover:border-[#0b2f4f] hover:bg-[#0b2f4f] hover:text-white'
            : 'border-[#cacdcf] bg-white text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]',
      )}
    >
      {label}
    </button>
  );
}

export default function ProductFilter({
  categories,
  selectedBrand,
  onBrandChange,
  selectedCategory,
  onCategoryChange,
  showBrandFilter = false,
}: ProductFilterProps) {
  const searchParams = useSearchParams();
  const brand = selectedBrand ?? searchParams.get('brand');
  const displayCategories = showBrandFilter
    ? getCatalogBrandCategories(brand, categories)
    : brand === 'ifm'
      ? [
          'Capteurs',
          'IO-Link',
          "Traitement d'images",
          'Accessoires',
          'Technologies de sécurité',
          'Alimentation en tension',
          'Technologies de connexion',
          'Interface de câblage capteurs/actionneurs',
        ]
      : brand === 'lenze'
        ? ['Variateurs et servovariateurs', 'Moteurs', 'Motoréducteurs', 'Réducteurs']
        : brand === 'wago'
          ? ['Bornes sur rail', "Système d'alimentation", "Bornes d'installation"]
          : categories;

  return (
    <div className={cn('w-full', showBrandFilter ? 'space-y-6' : '')}>
      {showBrandFilter && (
        <section>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="text-base font-semibold text-[#0b2f4f]">Marques</h2>
            <div className="h-px flex-1 bg-[#0b2f4f] opacity-20" />
          </div>
          <div className="flex flex-wrap gap-2">
            {brands.map((brandOption) => (
              <FilterButton
                key={brandOption.label}
                label={brandOption.label}
                selected={(brandOption.value ?? undefined) === (selectedBrand ?? undefined)}
                onClick={() => onBrandChange?.(brandOption.value)}
                catalogStyle
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-base font-semibold text-[#0b2f4f]">Catégories</h2>
          <div className="h-px flex-1 bg-[#0b2f4f] opacity-20" />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterButton
            label={showBrandFilter ? 'Tous les produits' : 'All'}
            selected={!selectedCategory}
            onClick={() => onCategoryChange(undefined)}
            catalogStyle={showBrandFilter}
          />
          {displayCategories.map((category) => (
            <FilterButton
              key={category}
              label={category}
              selected={category === selectedCategory}
              onClick={() => onCategoryChange(category)}
              catalogStyle={showBrandFilter}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
