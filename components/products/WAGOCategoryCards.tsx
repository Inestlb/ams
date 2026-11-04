import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WAGO_CATEGORIES } from '@/lib/types';
import type { WAGOCategory } from '@/lib/types';

const wagoCategories = Object.keys(WAGO_CATEGORIES) as WAGOCategory[];

const categoryDescriptions: Record<WAGOCategory, string> = {
  'Bornes sur rail': 'Bornes modulaires et accessoires pour des raccordements fiables sur rail DIN.',
  'Système d\'alimentation': 'Alimentations compactes et robustes pour les installations industrielles.',
  'Bornes d\'installation': 'Solutions de connexion rapides pour les installations électriques et le bâtiment.',
};

const categoryImages: Record<WAGOCategory, { src: string; alt: string }> = {
  'Bornes sur rail': {
    src: '/images/wago/bornes-sur-rail-clean.png',
    alt: 'Bornes WAGO sur rail',
  },
  'Système d\'alimentation': {
    src: '/images/wago/systeme-d-alimentation-clean.png',
    alt: 'Systèmes d’alimentation WAGO',
  },
  'Bornes d\'installation': {
    src: '/images/wago/bornes-d-installation-clean.png',
    alt: 'Bornes d’installation WAGO',
  },
};

export default function WAGOCategoryCards({ catalogView = false }: { catalogView?: boolean }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xl font-semibold text-[#0b2f4f]">Catégories de produits</h2>
        <div className="h-px flex-1 bg-[#e47925] opacity-40" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {wagoCategories.map((category, index) => (
          <Link
            key={category}
            href={catalogView
              ? `/products?catalog=all&brand=wago&category=${encodeURIComponent(category)}`
              : `/products?brand=wago&category=${encodeURIComponent(category)}`}
            className="block hover:no-underline"
          >
            <div className="h-full border border-[#cacdcf] bg-white hover:border-[#0b2f4f] transition-colors flex flex-col group/card">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                <Image
                  src={categoryImages[category].src}
                  alt={categoryImages[category].alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-contain transition-transform duration-300 group-hover/card:scale-[1.03]"
                />
              </div>
              <div className="border-t border-[#cacdcf] p-4 flex flex-col flex-1">
                <h3 className="min-h-10 text-[15px] font-semibold leading-tight text-[#0b2f4f] mb-2 line-clamp-2 group-hover/card:text-[#e47925]">
                  {category}
                </h3>
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
