"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/context/TranslationContext";
import { m } from "framer-motion";

const brands = [
  { labelKey: 'home.hero.motorization' as const, name: 'Lenze', logo: '/images/logo-Lenze.svg', width: 96, height: 30, href: '/products?brand=lenze' },
  { labelKey: 'home.hero.detection' as const, name: 'IFM', logo: '/images/logo-ifm.svg', width: 82, height: 82, href: '/products?brand=ifm' },
  { labelKey: 'home.hero.connectivity' as const, name: 'WAGO', logo: '/images/logo-WAGO.svg', width: 102, height: 38, href: '/products?brand=wago' },
];

export default function HeroSection() {
  const { t } = useTranslation();
  const heroTitle = t('home.hero.title');
  const titleParts = heroTitle.split('UTC');

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b2f4f] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0b2f4f_0%,#0e3a61_50%,#082742_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative flex justify-center w-full">
        <div className="w-full max-w-[1600px] px-6 md:px-12 grid min-h-screen grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-12 pt-28 pb-20">
          <div className="max-w-3xl">
            <m.h1
              className="text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.07em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {titleParts.length > 1 ? (
                <>
                  {titleParts[0]}<span className="text-[#e47925]">UTC</span>{titleParts.slice(1).join('UTC')}
                </>
              ) : (
                heroTitle
              )}
            </m.h1>

            <m.div
              className="my-8 h-px w-full max-w-xl bg-gradient-to-r from-[#e47925] via-white/30 to-transparent"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '100%' }}
              transition={{ duration: 0.7, delay: 0.2 }}
            ></m.div>

            <m.p
              className="max-w-2xl text-lg md:text-xl mb-9 text-[#d7e2eb] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {t('home.hero.subtitle')}
            </m.p>

            <m.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <Button asChild size="lg" className="rounded-none bg-[#e47925] px-7 py-6 text-base font-semibold text-white hover:bg-[#f18a3d]">
                <Link href="/contact" className="flex items-center">
                  {t('home.hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="rounded-none border border-white bg-transparent px-7 py-6 text-base font-semibold text-white hover:bg-white hover:text-[#0b2f4f]">
                <Link href="/products" className="flex items-center">
                  {t('home.hero.secondaryCta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </m.div>
          </div>

          <m.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative ml-auto max-w-xl overflow-hidden rounded-[2rem] border border-white/14 bg-[#103d64]/92 p-6 shadow-[0_30px_100px_rgba(3,25,43,0.34)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(228,121,37,0.17),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
              <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full border border-white/12" />
              <div className="relative">
                <div className="grid grid-cols-3 gap-3">
                  {brands.map((item) => (
                    <Link key={item.name} href={item.href} className="group flex min-h-[178px] flex-col items-center justify-between rounded-2xl bg-white/[0.92] p-5 shadow-[0_18px_45px_rgba(3,25,43,0.18)] transition-colors duration-200 hover:bg-[#0b2f4f]">
                      <div className="flex flex-1 items-center justify-center">
                        <Image
                          src={item.logo}
                          alt={item.name}
                          width={item.width}
                          height={item.height}
                          className={`max-h-14 w-auto object-contain transition-[filter] duration-200 ${item.name === 'IFM' ? '!max-h-[72px]' : 'group-hover:brightness-0 group-hover:invert'}`}
                        />
                      </div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#5d7081] transition-colors duration-200 group-hover:text-white/60">{t(item.labelKey)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
