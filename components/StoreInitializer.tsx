'use client';

import { useEffect } from 'react';
import { useProductStore } from '@/lib/productStore';

export function StoreInitializer() {
  const fetchStoreConfig = useProductStore((state) => state.fetchStoreConfig);

  useEffect(() => {
    fetchStoreConfig();
  }, [fetchStoreConfig]);

  return null;
}
