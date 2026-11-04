"use client";

import { Apple, Droplet, Beaker, Factory, Building2 } from "lucide-react";
import { useTranslation } from "@/lib/context/TranslationContext";
import { m } from "framer-motion";

export default function ExpertiseSection() {
  const { t, dir } = useTranslation();

  return (
    <section className="bg-[#0b2f4f] py-24 text-white" dir={dir}>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[1600px] px-6 md:px-12">
          <div className="mb-14 max-w-4xl">
            <m.h2
              className="text-4xl md:text-6xl font-semibold tracking-[-0.055em]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t('expertise.title')}
            </m.h2>

            <m.p
              className="mt-6 max-w-2xl text-lg leading-relaxed text-[#c7d3dc]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t('expertise.description')}
            </m.p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-5">
            {/* Secteur 1: Agroalimentaire */}
            <div className="group flex min-h-[280px] flex-col bg-[#103d64] p-8 transition-colors hover:bg-[#164a76]">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-[#e47925]">
                <Apple className="h-7 w-7" />
              </div>
              <h3 className="mb-4 text-xl font-semibold tracking-[-0.02em] group-hover:text-[#e47925]">
                {t('expertise.food.title')}
              </h3>
              <p className="text-sm leading-relaxed text-[#c7d3dc]">
                {t('expertise.food.description')}
              </p>
            </div>

            {/* Secteur 2: Hygiène */}
            <div className="group flex min-h-[280px] flex-col bg-[#103d64] p-8 transition-colors hover:bg-[#164a76]">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-[#e47925]">
                <Droplet className="h-7 w-7" />
              </div>
              <h3 className="mb-4 text-xl font-semibold tracking-[-0.02em] group-hover:text-[#e47925]">
                {t('expertise.hygiene.title')}
              </h3>
              <p className="text-sm leading-relaxed text-[#c7d3dc]">
                {t('expertise.hygiene.description')}
              </p>
            </div>

            {/* Secteur 3: Pharmaceutique */}
            <div className="group flex min-h-[280px] flex-col bg-[#103d64] p-8 transition-colors hover:bg-[#164a76]">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-[#e47925]">
                <Beaker className="h-7 w-7" />
              </div>
              <h3 className="mb-4 text-xl font-semibold tracking-[-0.02em] group-hover:text-[#e47925]">
                {t('expertise.pharmaceutical.title')}
              </h3>
              <p className="text-sm leading-relaxed text-[#c7d3dc]">
                {t('expertise.pharmaceutical.description')}
              </p>
            </div>

            {/* Secteur 4: Cimenterie */}
            <div className="group flex min-h-[280px] flex-col bg-[#103d64] p-8 transition-colors hover:bg-[#164a76]">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-[#e47925]">
                <Factory className="h-7 w-7" />
              </div>
              <h3 className="mb-4 text-xl font-semibold tracking-[-0.02em] group-hover:text-[#e47925]">
                {t('expertise.cement.title')}
              </h3>
              <p className="text-sm leading-relaxed text-[#c7d3dc]">
                {t('expertise.cement.description')}
              </p>
            </div>

            {/* Secteur 5: Briquerie et produits rouges */}
            <div className="group flex min-h-[280px] flex-col bg-[#103d64] p-8 transition-colors hover:bg-[#164a76]">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-[#e47925]">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="mb-4 text-xl font-semibold tracking-[-0.02em] group-hover:text-[#e47925]">
                {t('expertise.brick.title')}
              </h3>
              <p className="text-sm leading-relaxed text-[#c7d3dc]">
                {t('expertise.brick.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
