"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/context/TranslationContext";
import { Partner } from "@/lib/types";
import { m } from "framer-motion";

interface PartnersSectionProps {
  partners: Partner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  const { t, dir } = useTranslation();

  return (
    <>
      <section className="bg-[#f4f0e8] py-24" dir={dir}>
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[1600px] px-6 md:px-12">
            <div className="mb-12 max-w-3xl">
              <m.h2
                className="text-4xl md:text-6xl font-semibold tracking-[-0.055em] text-[#0b2f4f]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {t('partners.title')}
              </m.h2>

              <m.p
                className="mt-6 text-lg leading-relaxed text-[#39495a]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {t('partners.subtitle')}
              </m.p>
            </div>

            <div className="flex justify-center items-center py-6">
              <div className="w-full grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
                {partners.map((partner, index) => (
                  <m.div
                    key={partner.id}
                    className="group flex min-h-56 flex-col items-center justify-center rounded-[1.75rem] border border-[#0b2f4f]/10 bg-white p-10 shadow-[0_22px_60px_rgba(3,25,43,0.08)] transition-colors hover:bg-[#0b2f4f]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.6, 
                        delay: index * 0.15,
                        ease: [0.25, 0.1, 0.25, 1.0]
                      }
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ 
                      scale: 1.03, 
                      boxShadow: "0 24px 70px -22px rgba(7, 24, 39, 0.36)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    {partner.name === "IFM" ? (
                      <Image
                        src="/images/logo-ifm.svg"
                        alt="IFM"
                        width={150}
                        height={150}
                        className="object-contain"
                      />
                    ) : partner.name === "Lenze" ? (
                      <Image
                        src="/images/logo-Lenze.svg"
                        alt="Lenze"
                        width={180}
                        height={55}
                        className="object-contain transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert"
                      />
                    ) : partner.name === "Wago" ? (
                      <Image
                        src="/images/logo-WAGO.svg"
                        alt="Wago"
                        width={180}
                        height={65}
                        className="object-contain transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert"
                      />
                    ) : (
                      <div className="font-bold text-4xl text-gray-800 group-hover:text-white transition-colors">{partner.name}</div>
                    )}
                  </m.div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Button asChild variant="outline" className="rounded-none border-[#0b2f4f]/20 px-6 text-[#0b2f4f] hover:border-[#e47925] hover:text-[#e47925]">
                  <Link href="/partners">
                    {t('button.readMore')}
                    <ArrowRight className="ml-1 h-4 w-4"/>
                  </Link>
                </Button>
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0b2f4f] py-20 text-white" dir={dir}>
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[1600px] px-6 md:px-12">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 md:p-12 lg:flex lg:items-center lg:justify-between">
              <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.055em] mb-5">Prêt à commencer?</h2>
            <p className="text-lg mb-8 max-w-2xl text-[#c7d3dc] lg:mb-0">
              Contactez notre équipe dès aujourd'hui pour discuter de vos besoins en équipement industriel et découvrir
              comment nous pouvons aider votre entreprise à réussir.
            </p>
              </div>
            <Link
              href="/contact"
              className="group inline-flex items-center text-lg font-medium text-white underline decoration-[#e47925] decoration-1 underline-offset-8 transition-colors hover:text-[#e47925]"
            >
              {t('button.contact')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
