import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import SolutionsSection from "@/components/home/SolutionsSection";
import ExpertiseSection from "@/components/home/ExpertiseSection";
import PartnersSection from "@/components/home/PartnersSection";
import HomeMotionProvider from "@/components/home/HomeMotionProvider";
import { getPartners } from "@/data/partners";

export const metadata: Metadata = {
  title: "AMS Algérie - Solutions Industrielles",
  description: "Découvrez nos solutions industrielles innovantes pour optimiser vos processus de production.",
};

export default async function Home() {
  const partners = await getPartners();

  return (
    <HomeMotionProvider>
      <main>
        <HeroSection />
        <SolutionsSection />
        <ExpertiseSection />
        <PartnersSection partners={partners} />
      </main>
    </HomeMotionProvider>
  );
}
