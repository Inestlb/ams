"use client";

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface LenzeCategoryCardsProps {
  categories?: string[];
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
}

const lenzeCategories = [
  'Variateurs et servovariateurs',
  'Moteurs',
  'Motoréducteurs',
  'Réducteurs'
] as const;

type LenzeCategory = (typeof lenzeCategories)[number];

const categoryDescriptions: Record<LenzeCategory, string> = {
  'Variateurs et servovariateurs': 'Solutions de contrôle de vitesse et de position haute performance pour applications industrielles.',
  'Moteurs': 'Moteurs électriques fiables et efficaces pour diverses applications industrielles.',
  'Motoréducteurs': 'Combinaisons intégrées de moteurs et réducteurs pour un contrôle précis du mouvement.',
  'Réducteurs': 'Systèmes de transmission de puissance pour ajuster vitesse et couple dans les applications industrielles.'
};

const categoryImages: Record<LenzeCategory, { src: string; alt: string }> = {
  'Variateurs et servovariateurs': {
    src: '/images/products/i550.webp',
    alt: 'Variateur i550 Lenze'
  },
  'Moteurs': {
    src: 'https://www.lenze.com/fileadmin/_processed_/4/2/csm_E02_LAN_m500_IE2_IE3_Drehstrommot_276e45781e.webp',
    alt: 'Moteur triphasé m500 Lenze'
  },
  'Motoréducteurs': {
    src: 'https://www.lenze.com/fileadmin/_processed_/2/f/csm_F03_LAN_g500_B_m500_Kegelrad_Getriebemot_cdfd48ab37.webp',
    alt: 'Motoréducteur g500-B Lenze'
  },
  'Réducteurs': {
    src: 'https://www.lenze.com/fileadmin/_processed_/b/1/csm_D01_LAN_g500_H_Stirnradgetriebe_g500_H_905f19d426.webp',
    alt: 'Réducteur g500-H Lenze'
  }
};

export default function LenzeCategoryCards(_props: LenzeCategoryCardsProps) {
  void _props;
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');

  if (brand !== 'lenze') return null;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xl font-semibold text-[#0b2f4f]">Catégories de produits</h2>
        <div className="h-px flex-1 bg-[#e47925] opacity-40" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {lenzeCategories.map((category) => (
          <Link
            key={category}
            href={`/products?brand=lenze&category=${encodeURIComponent(category)}`}
            className="block hover:no-underline"
          >
            <div className="h-full border border-[#cacdcf] bg-white hover:border-[#0b2f4f] transition-colors flex flex-col group/card">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                <Image
                  src={categoryImages[category].src}
                  alt={categoryImages[category].alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 90vw"
                  className="object-contain p-4 transition-transform duration-300 group-hover/card:scale-[1.03]"
                />
              </div>
              <div className="border-t border-[#cacdcf] p-4 flex flex-col flex-1">
                <h3 className="min-h-10 text-[15px] font-semibold leading-tight text-[#0b2f4f] mb-2 line-clamp-2 group-hover/card:text-[#e47925]">{category}</h3>
                <p className="text-[13px] text-[#6b7280] line-clamp-2">
                  {categoryDescriptions[category]}
                </p>
              </div>
              <div className="border-t border-[#cacdcf] px-4 py-3">
                <span className="inline-flex items-center justify-center w-full rounded-none border border-[#0b2f4f] text-[13px] font-medium py-2.5 px-4 text-[#0b2f4f] group-hover/card:bg-[#e47925] group-hover/card:border-[#e47925] group-hover/card:text-white">
                  Voir les produits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
