"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientContactButtonWrapper from "@/components/ClientContactButtonWrapper";
import { TranslationProvider } from "@/lib/context/TranslationContext";
import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <TranslationProvider>
      <Navbar />
      <main className={pathname === '/' ? 'flex-grow' : 'flex-grow pt-20 md:pt-24'}>
        {children}
      </main>
      <Footer />
      <ClientContactButtonWrapper />
    </TranslationProvider>
  );
}
