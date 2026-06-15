'use client';

import { useRef, useEffect } from 'react';
import { useProductStore } from '@/lib/productStore';

export function StoreHydrator({ config }: { config: any }) {
  const isHydrated = useRef(false);

  useEffect(() => {
    if (!isHydrated.current && config) {
      useProductStore.setState(config);
      isHydrated.current = true;
    }
  }, [config]);

  return null;
}
