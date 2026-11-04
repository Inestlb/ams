"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useTranslation } from '@/lib/context/TranslationContext';

export default function NavbarSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { t, isClient } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Don't render dynamic content until client-side hydration is complete
  if (!isClient) {
    return (
      <form className="relative w-full max-w-[200px] lg:max-w-[250px]">
        <Input
          type="text"
          placeholder="Rechercher..."
          className="pr-16 h-10 text-[15px] bg-white/10 hover:bg-white/15 border-white/15 text-white focus:border-[#e47925] focus:ring-[#e47925]/25 rounded-none transition-colors placeholder:text-white"
          value=""
          readOnly
        />
        <div className="absolute right-0 top-0 h-full flex items-center pr-3">
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 rounded-none">
            <Search className="h-[18px] w-[18px] text-white" />
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-[200px] lg:max-w-[250px]">
      <Input
        type="text"
        placeholder={t('search.placeholder')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pr-16 h-10 text-[15px] bg-white/10 hover:bg-white/15 border-white/15 text-white focus:border-[#e47925] focus:ring-[#e47925]/25 rounded-none transition-colors placeholder:text-white"
      />
      <div className="absolute right-0 top-0 h-full flex items-center pr-3">
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-white/10 rounded-none"
            onClick={clearSearch}
          >
            <X className="h-[18px] w-[18px] text-white/55 hover:text-white" />
          </Button>
        )}
        <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 rounded-none">
          <Search className="h-[18px] w-[18px] text-white" />
        </Button>
      </div>
    </form>
  );
}
