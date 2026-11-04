"use client";

import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useDebounce } from './useDebounce';

interface UseSearchOptions<T> {
  data: T[];
  keys: string[];
  threshold?: number;
  debounceMs?: number;
}

export function useSearch<T>({
  data,
  keys,
  threshold = 0.4,
  debounceMs = 300
}: UseSearchOptions<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const fuse = new Fuse(data, {
      keys,
      threshold,
      includeScore: true,
    });

    const results = fuse.search(debouncedSearchTerm).map(result => result.item);
    setSearchResults(results);
    setIsSearching(false);
  }, [debouncedSearchTerm, data, keys, threshold]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
  };
}
