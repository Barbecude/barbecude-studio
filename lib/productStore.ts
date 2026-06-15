/* eslint-disable react-hooks/set-state-in-effect */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, products as initialProducts } from './products';
import { useEffect, useState } from 'react';

export interface FeatureType {
  id: number;
  title: string;
  desc: string;
  icon: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
}

interface ProductState {
  products: Product[];
  brandName: string;
  brandSubtitle: string;
  brandLogo: string;
  brandDescription: string;
  features: FeatureType[];
  cart: CartItem[];
  
  // Product actions
  addProduct: (product: Product) => void;
  updateProduct: (id: number, updated: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  resetToDefault: () => void;

  // Brand & feature actions
  updateBrandName: (name: string, subtitle?: string) => void;
  updateBrandLogo: (logo: string) => void;
  updateBrandDescription: (desc: string) => void;
  updateFeatures: (features: FeatureType[]) => void;
  updateFeature: (id: number, updated: Partial<FeatureType>) => void;

  // Cart actions
  addToCart: (product: { id: number; name: string; price: number; image: string }, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateCartQty: (id: number, qty: number) => void;
  clearCart: () => void;
}

const defaultFeatures: FeatureType[] = [
  {
    id: 1,
    title: '100% Ukiran Tangan',
    desc: 'Setiap sisi dihaluskan secara manual oleh pengrajin lokal berpengalaman dari satu pasang kayu tanpa sambung perekat.',
    icon: 'Package',
  },
  {
    id: 2,
    title: 'Lapisan Pelindung Ganda',
    desc: 'Menggunakan pernis doff khusus tahan air (water-resistant) untuk menjaga serat alami kayu agar tidak berjamur.',
    icon: 'ShieldCheck',
  },
  {
    id: 3,
    title: 'Kotak Kolektor Premium',
    desc: 'Dikirimkan bersama busa pelindung khusus di dalam kotak berlisensi kustom yang siap dipajang atau diberikan sebagai hadiah.',
    icon: 'Cpu',
  },
];

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: initialProducts,
      brandName: 'Barbecude Studio',
      brandSubtitle: 'STUDIO',
      brandLogo: '',
      brandDescription: 'Kerajinan tangan berkualitas tinggi. Bawa dunia pikselmu ke kenyataan, balok demi balok. Dekorasi balok kayu premium buatan tangan yang terinspirasi dari dunia piksel favoritmu.',
      features: defaultFeatures,
      cart: [],

      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updated) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updated } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      resetToDefault: () => set({ products: initialProducts, brandName: 'Barbecude Studio', brandSubtitle: 'STUDIO', brandLogo: '', brandDescription: 'Kerajinan tangan berkualitas tinggi. Bawa dunia pikselmu ke kenyataan, balok demi balok. Dekorasi balok kayu premium buatan tangan yang terinspirasi dari dunia piksel favoritmu.', features: defaultFeatures }),

      updateBrandName: (brandName, brandSubtitle) => set((state) => ({ brandName, brandSubtitle: brandSubtitle !== undefined ? brandSubtitle : state.brandSubtitle })),
      updateBrandLogo: (brandLogo) => set({ brandLogo }),
      updateBrandDescription: (brandDescription) => set({ brandDescription }),
      updateFeatures: (features) => set({ features }),
      updateFeature: (id, updated) => set((state) => ({
        features: state.features.map((f) => f.id === id ? { ...f, ...updated } : f)
      })),

      addToCart: (product, qty = 1) => set((state) => {
        const existing = state.cart.find((item) => item.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, qty: item.qty + qty } : item
            ),
          };
        }
        return {
          cart: [...state.cart, { ...product, qty }],
        };
      }),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      })),
      updateCartQty: (id, qty) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, qty) } : item
        ),
      })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'voxelwood-products-store',
    }
  )
);

// Custom hooks to fetch data safely across SSR/hydration boundary
export function useProducts() {
  const storeProducts = useProductStore((state) => state.products);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? storeProducts : initialProducts;
}

export function useProductBySlug(slug: string) {
  const storeProducts = useProductStore((state) => state.products);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentProducts = mounted ? storeProducts : initialProducts;
  return currentProducts.find((p) => p.slug === slug);
}

export function useCart() {
  const storeCart = useProductStore((state) => state.cart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? storeCart : [];
}

export function useFeatures() {
  const storeFeatures = useProductStore((state) => state.features);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? storeFeatures : defaultFeatures;
}

export function useBrandName() {
  const name = useProductStore((state) => state.brandName);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? name : 'Barbecude Studio';
}

export function useBrandSubtitle() {
  const subtitle = useProductStore((state) => state.brandSubtitle);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? subtitle : 'STUDIO';
}

export function useBrandLogo() {
  const logo = useProductStore((state) => state.brandLogo);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? logo : '';
}

export function useBrandDescription() {
  const desc = useProductStore((state) => state.brandDescription);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? desc : 'Kerajinan tangan berkualitas tinggi. Bawa dunia pikselmu ke kenyataan, balok demi balok. Dekorasi balok kayu premium buatan tangan yang terinspirasi dari dunia piksel favoritmu.';
}
