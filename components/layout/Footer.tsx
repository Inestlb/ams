"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/context/TranslationContext';

const staticTranslations: Record<string, string> = {
  'nav.home': 'Accueil',
  'nav.products': 'Produits',
  'nav.about': 'Société',
  'nav.partners': 'Partenaires',
  'nav.contact': 'Contactez-nous',
};

export default function Footer() {
  const { t, dir, isClient } = useTranslation();

  const getTextContent = (key: string) => {
    if (isClient) {
      return t(key);
    }
    return staticTranslations[key] || key;
  };

  return (
    <footer className="bg-gray-900 text-white" dir={dir}>
      <div className="border-t border-white/20" />

      <div className="flex justify-center w-full">
        <div className="w-full max-w-[1600px] px-6 md:px-12 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/LOGO-UTC.svg"
                alt="Logo AMS Algérie"
                width={1200}
                height={276}
                className="h-auto w-[340px] max-w-full"
                quality={100}
              />
            </Link>

            <nav className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
              {[
                { href: '/', key: 'nav.home' },
                { href: '/products', key: 'nav.products' },
                { href: '/about', key: 'nav.about' },
                { href: '/partners', key: 'nav.partners' },
                { href: '/contact', key: 'nav.contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  {getTextContent(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
                <Link href="/legal" className="hover:text-white/80 transition-colors">Mentions légales</Link>
                <span>|</span>
                <Link href="/privacy-policy" className="hover:text-white/80 transition-colors">Confidentialité</Link>
                <span>|</span>
                <Link href="/terms-of-service" className="hover:text-white/80 transition-colors">CGU</Link>
                <span>|</span>
                <Link href="/general" className="hover:text-white/80 transition-colors">Conditions générales</Link>
                <span>|</span>
                <Link href="/cookies" className="hover:text-white/80 transition-colors">Cookies</Link>
                <span>|</span>
                <span>Site réalisé par <a href="https://www.linkedin.com/in/inès-talbi-015b18114" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">Inès Talbi</a></span>
              </div>
              <p className="text-xs text-white/50">
                © {new Date().getFullYear()} AMS Algérie
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
