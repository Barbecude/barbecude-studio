'use client';

import { useRef, useEffect } from 'react';
import { useProductStore } from '@/lib/productStore';

export function StoreHydrator({ config }: { config: any }) {
  const isHydrated = useRef(false);

  useEffect(() => {
    if (!isHydrated.current) {
      if (config && Object.keys(config).length > 0) {
        // Category Migration for SSR config
        const migratedConfig = { ...config };
        if (migratedConfig.products) {
          migratedConfig.products = migratedConfig.products.map((p: any) => {
            if (p.category === 'Mob' || p.category === 'Item') return { ...p, category: 'Pajangan Meja' };
            if (p.category === 'Flowers') return { ...p, category: 'Hiasan Dinding' };
            return p;
          });
        }
        useProductStore.setState(migratedConfig);
      } else {
        // Fallback to client fetch if SSR config failed
        useProductStore.getState().fetchStoreConfig();
      }
      isHydrated.current = true;
    }
  }, [config]);

  return null;
}
