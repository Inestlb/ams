"use client";

import { useState, useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/forms/ContactForm';

export default function FloatingMailButton() {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [moveY, setMoveY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const lastScrollY = useRef(0);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Only run on client side
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      lastScrollY.current = window.scrollY;
    }
  }, []);

  // Add dynamic movement on scroll
  useEffect(() => {
    if (!isMounted || pathname === '/contact') return;

    const handleScroll = () => {
      setIsScrolling(true);
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);

      // Calculate movement based on scroll direction and speed
      let intensity = 8; // default low intensity

      if (scrollDifference > 50) {
        intensity = 16; // high intensity
      } else if (scrollDifference > 20) {
        intensity = 12; // medium intensity
      }

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setMoveY(intensity);
        setRotation(intensity / 2);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setMoveY(-intensity);
        setRotation(-intensity / 2);
      }

      lastScrollY.current = currentScrollY;

      // Clear any existing timer
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }

      // Reset movement after a delay
      scrollTimer.current = setTimeout(() => {
        setMoveY(0);
        setRotation(0);
        setIsScrolling(false);
      }, 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, [isMounted, pathname]);

  // Don't render anything on server or on contact page
  if (!isMounted || pathname === '/contact') {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="fixed bottom-10 right-10 bg-orange-500 text-white p-6 rounded-full shadow-lg hover:bg-orange-600 hover:scale-110 hover:shadow-xl active:scale-95 transition-all duration-300 ease-in-out z-50 group"
          style={{
            transform: `translateY(${moveY}px) rotate(${rotation}deg)`
          }}
          aria-label="Ouvrir le formulaire de contact"
        >
          <Mail
            className="h-8 w-8 group-hover:animate-bounce"
            style={{
              animation: isScrolling ? 'pulse 1.5s infinite' : 'none'
            }}
          />
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
