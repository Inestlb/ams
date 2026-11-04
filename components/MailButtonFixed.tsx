"use client";

import { useState, useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';

export default function MailButtonFixed() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const scrollFrame = useRef<number | null>(null);
  const [moveY, setMoveY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);

  // Only run on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (scrollFrame.current !== null) return;

      scrollFrame.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const direction = currentScrollY > lastScrollY.current ? 1 : -1;

        setScrollDirection(direction);
        setMoveY((previousMoveY) =>
          direction === 1
            ? Math.min(previousMoveY + 2, 12)
            : Math.max(previousMoveY - 4, -48)
        );
        lastScrollY.current = currentScrollY;
        scrollFrame.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrame.current !== null) {
        cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, [isMounted]);

  // Effet pour réinitialiser progressivement la position du bouton
  useEffect(() => {
    if (!scrollDirection) return;

    const timer = setTimeout(() => {
      setMoveY(prev => {
        if (Math.abs(prev) < 1) return 0;
        return prev * 0.9;
      });
    }, 80);

    return () => clearTimeout(timer);
  }, [moveY, scrollDirection]);

  // Don't render anything on server or on contact page
  if (!isMounted || pathname === '/contact') {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className="group fixed bottom-8 right-6 md:bottom-12 md:right-10 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#e47925] text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-[#f18a3d] active:scale-95"
          animate={{
            y: moveY
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 28,
            mass: 0.8
          }}
          aria-label="Ouvrir le formulaire de contact"
        >
          <Mail className="h-7 w-7 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#0b2f4f]">
            <span className="text-[#e47925]">Contactez</span>-nous
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ContactForm isCompact={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
