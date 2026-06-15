export interface Product {
  id: number;
  name: string;
  price: number;
  slug: string;
  image: string; // Keep as primary/thumbnail for backward compatibility
  images?: string[]; // Array of up to 4 images for gallery
  // Cache busting comment
  description: string;
  dimensions: string;
  material: string;
  stock: number; // 0 means Out of Stock (Kosong)
  category: 'Gantungan Kunci' | 'Pajangan Meja' | 'Hiasan Dinding';
  cheapest: boolean;
  shopee_link?: string; // Link to Shopee product
}

import defaultStoreConfig from '../data/storeConfig.json';

export const products: Product[] = (defaultStoreConfig as any).products || [];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
