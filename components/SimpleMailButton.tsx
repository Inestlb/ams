"use client";

import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/forms/ContactForm';

export default function SimpleMailButton() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Only run on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything on server or on contact page
  if (!isMounted || pathname === '/contact') {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="fixed bottom-10 right-10 bg-orange-500 text-white p-6 rounded-full shadow-lg hover:bg-orange-600 hover:scale-110 hover:shadow-xl active:scale-95 transition-all duration-300 ease-in-out z-50 group"
          aria-label="Ouvrir le formulaire de contact"
        >
          <Mail className="h-8 w-8 group-hover:animate-bounce" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            <span className="text-orange-500">Contactez</span>-Nous
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ContactForm isCompact={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
