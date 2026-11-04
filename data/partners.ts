import { Partner } from "@/lib/types";

export const partners: Partner[] = [
  {
    id: "partner-001",
    name: "Lenze",
    logo: "/images/partner-lenze.svg",
    description: "Spécialiste mondial des solutions d'entraînement et d'automatisation pour machines et équipements industriels.",
    website: "https://www.lenze.com",
  },
  {
    id: "partner-002",
    name: "Wago",
    logo: "/images/partner-wago.svg",
    description: "Leader dans les technologies de connexion et d'automatisation, offrant des solutions innovantes pour l'industrie électrique et électronique.",
    website: "https://www.wago.com",
  },
  {
    id: "partner-003",
    name: "IFM",
    logo: "/images/partner-ifm.svg",
    description: "Fabricant de capteurs, systèmes de contrôle et solutions pour l'automatisation industrielle et la digitalisation des processus.",
    website: "https://www.ifm.com",
  },
];

export async function getPartners(): Promise<Partner[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return partners;
}

export async function getPartnerById(id: string): Promise<Partner | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return partners.find(partner => partner.id === id);
}
