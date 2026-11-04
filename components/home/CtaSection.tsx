"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/context/TranslationContext";
import { m } from "framer-motion";

export default function CtaSection() {
  const { dir } = useTranslation();

  return (
    <section className="py-16 bg-orange-500 text-white" dir={dir}>
      <div className="container mx-auto px-2 sm:px-3 lg:px-4 max-w-[1400px] text-center">
        <m.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Besoin de Solutions Industrielles?
        </m.h2>

        <m.p
          className="text-lg mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Contactez-nous dès aujourd&apos;hui pour découvrir comment nos solutions peuvent vous aider à optimiser vos processus industriels et à améliorer votre productivité.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button asChild size="lg" className="bg-white text-orange-500 hover:bg-gray-100 transition-colors duration-300">
            <Link href="/contact" className="flex items-center">
              Demander un Devis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </m.div>
      </div>
    </section>
  );
}
