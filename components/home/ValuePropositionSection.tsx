"use client";

import { Shield, Globe, Headphones } from "lucide-react";
import { useTranslation } from "@/lib/context/TranslationContext";
import { m } from "framer-motion";

const values = [
  { Icon: Shield, title: 'Assurance Qualité', desc: "Tous nos produits subissent des tests rigoureux et un contrôle de qualité pour garantir qu'ils répondent aux normes et spécifications internationales." },
  { Icon: Globe, title: 'Expédition Mondiale', desc: "Nous offrons une expédition mondiale avec des solutions logistiques efficaces, garantissant que vos commandes arrivent à temps et en parfait état." },
  { Icon: Headphones, title: 'Support Technique', desc: "Notre équipe d'experts fournit un support technique complet et des consultations pour tous nos produits et solutions." },
];

export default function ValuePropositionSection() {
  const { dir } = useTranslation();

  return (
    <section className="bg-[#f4f0e8] py-24" dir={dir}>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[1600px] px-6 md:px-12">
          <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#e47925]">Engagement AMS Algérie</p>
              <m.h2
                className="text-4xl md:text-6xl font-semibold tracking-[-0.055em] text-[#0b2f4f]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                Pourquoi nous <span className="text-[#e47925]">choisir</span>
              </m.h2>
            </div>

            <m.p
              className="max-w-2xl border-l border-[#e47925]/50 pl-6 text-lg leading-relaxed text-[#39495a]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              Nous fournissons des solutions industrielles complètes avec un accent sur la qualité,
              la fiabilité et la satisfaction du client.
            </m.p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {values.map((item, i) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                className="group min-h-[315px] rounded-[1.75rem] border border-[#0b2f4f]/10 bg-white p-8 shadow-[0_2px_8px_rgba(3,25,43,0.06)] transition-[border-color,box-shadow] duration-200 ease-out hover:border-[#e47925]/30 hover:shadow-[0_8px_30px_rgba(228,121,37,0.1)]"
              >
                <div className="flex h-full flex-col">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b2f4f] text-[#e47925] transition-colors duration-200 group-hover:bg-[#e47925] group-hover:text-white">
                    <item.Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold tracking-[-0.03em] text-[#0b2f4f]">{item.title}</h3>
                  <p className="text-[#4a6478] leading-relaxed">{item.desc}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
