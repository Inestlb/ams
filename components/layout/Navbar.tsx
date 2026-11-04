"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import NavbarSearch from './NavbarSearch';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '@/lib/context/TranslationContext';

// Type pour les liens de navigation
interface NavLink {
  key: string;
  href: string;
  highlight?: boolean;
  hasSubmenu?: boolean;
}

interface ProductBrand {
  name: string;
  href: string;
  logo: string;
  width: number;
  height: number;
}

const productBrands: ProductBrand[] = [
  { name: 'Lenze', href: '/products?brand=lenze', logo: '/images/logo-Lenze.svg', width: 96, height: 30 },
  { name: 'IFM', href: '/products?brand=ifm', logo: '/images/logo-ifm.svg', width: 82, height: 82 },
  { name: 'WAGO', href: '/products?brand=wago', logo: '/images/logo-WAGO.svg', width: 102, height: 38 },
];

// Liens de navigation principaux
const mainNavLinks: NavLink[] = [
  {
    key: 'nav.products',
    href: '/products',
    hasSubmenu: true,
  },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.partners', href: '/partners' },
  { key: 'nav.contact', href: '/contact' },
];

// Tous les liens pour le menu mobile
const allNavLinks: NavLink[] = [...mainNavLinks];

// Static French translations for server-side rendering
const staticTranslations: Record<string, string> = {
  'nav.home': 'Accueil',
  'nav.products': 'Produits',
  'nav.products.all': 'Tous les produits',
  'nav.products.catalogue': "Voir l'ensemble du catalogue",
  'nav.products.byBrand': 'PAR MARQUE',
  'nav.about': 'Société',
  'nav.partners': 'Partenaires',
  'nav.contact': 'Contact',
};

interface ProductMenuContentProps {
  getTextContent: (key: string) => string;
}

function ProductMenuContent({ getTextContent }: ProductMenuContentProps) {
  return (
    <div className="w-full">
      <Link
        href="/products"
        className="block border-b border-[#d9e2e8] px-1 pb-5 transition-colors duration-200 hover:border-[#c5d0d9] hover:bg-[#f7f9fb]"
      >
        <span className="min-w-0 text-left">
          <span className="block text-base font-semibold text-[#e47925]">
            {getTextContent('nav.products.all')}
          </span>
          <span className="mt-1.5 block text-[13px] text-[#526578]">
            {getTextContent('nav.products.catalogue')}
          </span>
        </span>
      </Link>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7d8f]">
          {getTextContent('nav.products.byBrand')}
        </p>
        <div className="mt-1 divide-y divide-[#d9e2e8]">
          {productBrands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.href}
              className="flex items-center justify-center px-1 py-4 transition-colors duration-200 hover:bg-[#f7f9fb]"
            >
              <span className="flex h-10 w-20 shrink-0 items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={brand.width}
                  height={brand.height}
                  className="h-10 w-20 object-contain"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t, isClient } = useTranslation();
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const productsMenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHomeTop = pathname === '/' && !isScrolled;

  // Handle transparent navbar on scroll
  useEffect(() => {
    let scrollFrame: number | null = null;

    const updateScrolledState = () => {
      const nextIsScrolled = window.scrollY > 10;
      setIsScrolled((currentIsScrolled) =>
        currentIsScrolled === nextIsScrolled ? currentIsScrolled : nextIsScrolled
      );
    };

    const handleScroll = () => {
      if (scrollFrame !== null) return;
      scrollFrame = requestAnimationFrame(() => {
        updateScrolledState();
        scrollFrame = null;
      });
    };

    updateScrolledState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrame !== null) cancelAnimationFrame(scrollFrame);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (productsMenuCloseTimer.current) {
        clearTimeout(productsMenuCloseTimer.current);
      }
    };
  }, []);

  // Helper function to get text content safely during SSR
  const getTextContent = (key: string) => {
    if (isClient) {
      return t(key);
    }
    return staticTranslations[key] || key;
  };

  const openProductsMenu = () => {
    if (productsMenuCloseTimer.current) {
      clearTimeout(productsMenuCloseTimer.current);
      productsMenuCloseTimer.current = null;
    }
    setIsProductsHovered(true);
  };

  const closeProductsMenu = () => {
    productsMenuCloseTimer.current = setTimeout(() => {
      setIsProductsHovered(false);
      productsMenuCloseTimer.current = null;
    }, 120);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isHomeTop
          ? 'bg-transparent border-transparent'
          : 'bg-[#0b2f4f]/95 border-b border-white/10 shadow-[0_18px_60px_rgba(3,25,43,0.28)] backdrop-blur-xl'
      }`}
    >
      <div className="flex justify-center w-full">
        <div className={`w-full max-w-[1600px] flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${isScrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'}`}>
          {/* Left section: Logo and main navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center mr-12">
              <div className="flex items-center justify-center -mt-2">
                <Image
                  src="/images/LOGO-UTC.svg"
                  alt="UTC Logo"
                  width={200}
                  height={200}
                  priority={true}
                  className={`w-auto transition-all duration-500 ${isScrolled ? 'h-[81px]' : 'h-[98px]'}`}
                />
              </div>
            </Link>

            {/* Main navigation links (desktop only) */}
            <nav className="hidden md:flex items-center space-x-10">
              {mainNavLinks.map((link) => (
                link.hasSubmenu ? (
                  <div
                    key={link.href}
                    className="relative group"
                    onMouseLeave={closeProductsMenu}
                    onBlur={closeProductsMenu}
                  >
                    <button
                      type="button"
                      onMouseEnter={openProductsMenu}
                      onFocus={openProductsMenu}
                      className={`text-[15px] tracking-wide font-medium transition-colors hover:text-[#e47925] flex items-center gap-2 ${
                        pathname.startsWith(link.href)
                          ? 'text-[#e47925] font-semibold'
                          : 'text-white/88'
                      }`}
                    >
                      {getTextContent(link.key)}
                      <ChevronDown className={`h-4 w-4 opacity-70 transition-transform duration-500 ${isProductsHovered ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Conteneur du menu déroulant avec une grande zone de détection */}
                    <div
                      className={`absolute left-0 top-full w-[340px] pt-7 transition-all duration-200 ${
                        isProductsHovered 
                          ? 'translate-y-0 opacity-100 pointer-events-auto'
                          : '-translate-y-2 opacity-0 pointer-events-none'
                      }`}
                      onMouseEnter={openProductsMenu}
                      onMouseLeave={closeProductsMenu}
                      onFocus={openProductsMenu}
                    >
                      <div className="relative overflow-hidden rounded-[4px] border border-[#d9e2e8] bg-white p-5 shadow-[0_28px_70px_rgba(3,25,43,0.28)] ring-1 ring-[#0b2f4f]/5">
                        <ProductMenuContent getTextContent={getTextContent} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[15px] tracking-wide font-medium transition-colors hover:text-[#e47925] relative inline-flex group ${
                      pathname === link.href
                        ? 'text-[#e47925] font-semibold'
                        : 'text-white/88'
                    }`}
                  >
                    <span className="relative">
                      {getTextContent(link.key)}
                      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#e47925] opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-300 ease-out"></span>
                    </span>
                  </Link>
                )
              ))}
            </nav>
          </div>

          {/* Right section: Search, Language */}
          <div className="hidden md:flex items-center space-x-6">
            <NavbarSearch />
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu" className="text-white hover:text-[#e47925] hover:bg-white/10 transition-colors duration-300">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l-[#e47925] bg-[#0b2f4f] text-white w-[85vw] max-w-[350px]">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Search Bar */}
                  <div className="mb-2">
                    <NavbarSearch />
                  </div>

                  {/* Mobile Language Selector */}
                  <div className="mb-2">
                    <LanguageSelector />
                  </div>

                  {/* Mobile navigation links */}
                  <div className="space-y-4">
                    {allNavLinks.map((link) => (
                      <div key={link.href} className="border-b border-gray-100 pb-3">
                        {link.hasSubmenu ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center justify-between w-full text-left">
                              <span className={`text-lg font-medium ${pathname.startsWith(link.href) ? 'text-[#e47925]' : 'text-white'}`}>
                                {getTextContent(link.key)}
                              </span>
                              <ChevronDown className="h-4 w-4 opacity-70" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="start"
                              className="w-[calc(85vw-2rem)] max-w-[318px] border-[#d9e2e8] bg-white p-3 shadow-[0_28px_70px_rgba(3,25,43,0.28)]"
                            >
                              <ProductMenuContent getTextContent={getTextContent} />
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Link
                            href={link.href}
                            className={`block text-lg font-medium transition-colors hover:text-[#e47925] ${
                              pathname === link.href ? 'text-[#e47925]' : 'text-white'
                            } ${link.highlight ? 'mt-6 bg-[#e47925] text-white hover:text-white px-4 py-2 rounded-none text-center' : ''}`}
                          >
                            {getTextContent(link.key)}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
