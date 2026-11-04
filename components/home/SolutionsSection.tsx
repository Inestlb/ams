"use client";

import { useTranslation } from "@/lib/context/TranslationContext";
import { m } from "framer-motion";
import { Cpu, Cog, Wrench } from "lucide-react";

const solutions = [
  { Icon: Cpu, titleKey: '', title: 'Automatismes', desc: "Solutions d'automatisation industrielle complètes pour optimiser vos processus de production et améliorer l'efficacité opérationnelle." },
  { Icon: Cog, titleKey: '', title: 'Entraînements', desc: "Composants et pièces d'entraînement de haute qualité pour assurer la performance et la fiabilité de vos équipements industriels." },
  { Icon: Wrench, titleKey: '', title: 'Sur Mesure', desc: "Solutions sur mesure adaptées à vos besoins spécifiques, conçues pour répondre aux défis uniques de votre industrie." },
];

export default function SolutionsSection() {
  const { t, dir } = useTranslation();

  return (
    <section className="bg-[#f4f0e8] py-24" dir={dir}>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[1600px] px-6 md:px-12">
          <div className="mb-16 grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-end">
            <div>
              <m.h2
                className="text-4xl md:text-6xl font-semibold tracking-[-0.055em] text-[#0b2f4f]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                {t('home.solutions.title')}
              </m.h2>
            </div>

          </div>

          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 lg:gap-7">
            {solutions.map((item, i) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                className="group relative min-h-[300px] overflow-hidden rounded-[1.75rem] border border-[#0b2f4f]/10 bg-white p-8 text-[#0b2f4f] shadow-[0_2px_8px_rgba(3,25,43,0.06)] transition-[border-color,box-shadow] duration-200 ease-out hover:border-[#e47925]/30 hover:shadow-[0_8px_30px_rgba(228,121,37,0.1)]"
              >
                <div className="relative flex h-full flex-col">
                  <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b2f4f] text-[#e47925] transition-colors duration-200 group-hover:bg-[#e47925] group-hover:text-white">
                    <item.Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
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
