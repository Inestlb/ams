import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AMS Algérie - Entreprise d'Exportation Industrielle",
  description: "Fournisseur leader de produits industriels de haute qualité pour l'exportation mondiale. Spécialiste en solutions automatisées, capteurs et technologies industrielles.",
  keywords: ["produits industriels", "automatisation", "export", "capteurs", "solutions industrielles", "ifm", "wago", "lenze"],
  authors: [{ name: "AMS Algérie" }],
  creator: "AMS Algérie",
  metadataBase: new URL('https://utc-export.com'),
  openGraph: {
    title: "AMS Algérie - Entreprise d'Exportation Industrielle",
    description: "Fournisseur leader de produits industriels de haute qualité pour l'exportation mondiale.",
    url: 'https://utc-export.com',
    siteName: 'AMS Algérie',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "AMS Algérie - Solutions Industrielles",
    description: "Produits industriels de haute qualité pour l'exportation mondiale",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#F97316" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
