import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IFM_CATEGORIES } from '@/lib/types';
import type { IFMCategory } from '@/lib/types';

const ifmCategories = Object.values(IFM_CATEGORIES) as IFMCategory[];

const categoryDescriptions: Record<IFMCategory, string> = {
  'Détecteur Inductifs': 'Détection sans contact des objets métalliques pour les applications industrielles.',
  'Détecteurs Capacitifs': 'Détection fiable des matériaux solides, liquides et pulvérulents.',
  'Cellule Opto': 'Détection optique précise des objets, des positions et des contrastes.',
  'Détecteurs à ultrasons': 'Mesure et détection sans contact, indépendamment de la couleur ou de la surface.',
  'Détecteurs pour vannes': 'Surveillance fiable de la position des vannes industrielles.',
  'Détecteurs pour vérins': 'Contrôle de position pour les vérins pneumatiques et hydrauliques.',
  'Capteurs de pression / Capteurs de dépression': 'Surveillance précise des pressions positives et négatives dans les installations.',
  'Capteurs de niveau': 'Contrôle continu ou ponctuel du niveau des liquides et des matières en vrac.',
  'Capteurs de débit / débitmètres': 'Mesure et surveillance du débit dans les circuits et processus industriels.',
  'Capteurs de température': 'Mesure fiable de la température des fluides, machines et installations.',
  'IO LINK': 'Communication intelligente entre les capteurs, les actionneurs et l’automatisation.',
  'Communication Industrielle ASI BUS': 'Solutions de communication AS-Interface pour les équipements de terrain.',
  'Technologie de sécurité': 'Solutions de détection et de contrôle pour la sécurité des machines.',
  'Technologie de connexion': 'Connecteurs, câbles et accessoires pour des raccordements industriels fiables.',
};

export default function IFMCategoryCards({ catalogView = false }: { catalogView?: boolean }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xl font-semibold text-[#0b2f4f]">Catégories de produits</h2>
        <div className="h-px flex-1 bg-[#e47925] opacity-40" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {ifmCategories.map((category) => (
          <Link
            key={category}
            href={catalogView
              ? `/products?catalog=all&brand=ifm&category=${encodeURIComponent(category)}`
              : `/products?brand=ifm&category=${encodeURIComponent(category)}`}
            className="block hover:no-underline"
          >
            <div className="h-full border border-[#cacdcf] bg-white hover:border-[#0b2f4f] transition-colors flex flex-col group/card">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f8f9fa]">
                <Image
                  src="/images/logo-ifm.svg"
                  alt="IFM"
                  fill
                  priority={category === ifmCategories[0]}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 90vw"
                  className="object-contain p-10 transition-transform duration-300 group-hover/card:scale-[1.03]"
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
