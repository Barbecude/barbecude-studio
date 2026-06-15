'use client';

import { useRef } from 'react';
import { useProductStore } from '@/lib/productStore';

export function StoreHydrator({ config }: { config: any }) {
  const isHydrated = useRef(false);

  if (!isHydrated.current) {
    if (config) {
      useProductStore.setState(config);
    }
    isHydrated.current = true;
  }

  return null;
}
