"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/context/TranslationContext';

export default function LanguageSelector() {
  const { language, setLanguage, isClient } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // Mark component as mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Static button for server-side rendering
  const staticSwitch = (
    <div className="relative w-[120px] h-10 rounded-none cursor-pointer overflow-hidden border border-white/12 bg-white/8">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-white">FR</span>
          <span className="text-sm font-medium text-white/35">|</span>
          <span className="text-sm font-medium text-white/55">AR</span>
        </div>
      </div>
    </div>
  );

  // Don't render dynamic content until client-side hydration is complete
  if (!isClient || !mounted) {
    return staticSwitch;
  }

  const handleFrClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLanguage('fr');
  };

  const handleArClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLanguage('ar');
  };

  return (
    <div className="relative w-[120px] h-10 rounded-none cursor-pointer select-none border border-white/12 bg-white/8 hover:bg-white/12 transition-colors duration-200 overflow-hidden">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span 
            onClick={handleFrClick}
            className={`text-sm transition-opacity duration-200 hover:opacity-90 ${language === 'fr' ? 'font-semibold text-white' : 'font-medium text-white/55'}`}
          >
            FR
          </span>
          <span className="text-sm font-medium text-white/35">|</span>
          <span 
            onClick={handleArClick}
            className={`text-sm transition-opacity duration-200 hover:opacity-90 ${language === 'ar' ? 'font-semibold text-white' : 'font-medium text-white/55'}`}
          >
            AR
          </span>
        </div>
      </div>
    </div>
  );
}
