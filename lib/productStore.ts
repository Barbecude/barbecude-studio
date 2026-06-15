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

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  orderId: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  detailAddress: string;
  latitude?: number;
  longitude?: number;
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  qrisCode?: string;
  createdAt: number;
  updatedAt: number;
}

interface ProductState {
  products: Product[];
  brandName: string;
  brandSubtitle: string;
  brandLogo: string;
  brandDescription: string;
  features: FeatureType[];
  cart: CartItem[];
  orders: Order[];

  // Hero settings
  heroLabel: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroPrice: number;
  heroDimensions: string;
  heroLinkSlug: string;

  // Preorder settings
  preorderTitle: string;
  preorderDescription: string;
  preorderLinkSlug: string;
  preorderImage: string;

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
  updateHeroSettings: (hero: Partial<{ heroLabel: string, heroTitle: string, heroDescription: string, heroImage: string, heroPrice: number, heroDimensions: string, heroLinkSlug: string }>) => void;
  updatePreorderSettings: (preorder: Partial<{ preorderTitle: string, preorderDescription: string, preorderLinkSlug: string, preorderImage: string }>) => void;

  // Cart actions
  addToCart: (product: { id: number; name: string; price: number; image: string }, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateCartQty: (id: number, qty: number) => void;
  clearCart: () => void;

  // Order actions
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getAllOrders: () => Order[];
}

import defaultStoreConfig from '../data/storeConfig.json';

const defaultFeatures: FeatureType[] = defaultStoreConfig.features || [
  { id: 1, title: '100% Handmade', desc: 'Semua kerajinan dibuat dengan tangan degan hati - hati dan memerhatikan detail kecil untuk hasil yang berkualitas.', icon: 'HandHeart' },
  { id: 2, title: 'Lapisan Pelindung', desc: 'Untuk kerajinan kayu, digunakan pernis mengkilap tahan air yang menjaga serat alami kayu tetap awet dan terlindungi dari jamur.', icon: 'ShieldCheck' },
  { id: 3, title: 'Pengiriman aman', desc: 'Dikirimkan dengan pelindung khusus agar produk tetap utuh sampai tujuan', icon: 'Truck' }
];

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      brandName: defaultStoreConfig.brandName || '',
      brandSubtitle: defaultStoreConfig.brandSubtitle || '',
      brandLogo: defaultStoreConfig.brandLogo || '',
      brandDescription: defaultStoreConfig.brandDescription || '',
      features: defaultFeatures,
      cart: [],
      orders: [],
      heroLabel: defaultStoreConfig.heroLabel || '',
      heroTitle: defaultStoreConfig.heroTitle || '',
      heroDescription: defaultStoreConfig.heroDescription || '',
      heroImage: defaultStoreConfig.heroImage || '',
      heroPrice: defaultStoreConfig.heroPrice || 0,
      heroDimensions: defaultStoreConfig.heroDimensions || '',
      heroLinkSlug: defaultStoreConfig.heroLinkSlug || '',

      preorderTitle: defaultStoreConfig.preorderTitle || '',
      preorderDescription: defaultStoreConfig.preorderDescription || '',
      preorderLinkSlug: defaultStoreConfig.preorderLinkSlug || '',
      preorderImage: defaultStoreConfig.preorderImage || '',

      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updated) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updated } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      resetToDefault: () => set({ products: initialProducts, brandName: '', brandSubtitle: '', brandLogo: '', brandDescription: '', features: defaultFeatures, heroLabel: '', heroTitle: '', heroDescription: '', heroImage: '', heroPrice: 0, heroDimensions: '', heroLinkSlug: '', preorderTitle: '', preorderDescription: '', preorderLinkSlug: '', preorderImage: '' }),

      updateBrandName: (brandName, brandSubtitle) => set((state) => ({ brandName, brandSubtitle: brandSubtitle !== undefined ? brandSubtitle : state.brandSubtitle })),
      updateBrandLogo: (brandLogo) => set({ brandLogo }),
      updateBrandDescription: (brandDescription) => set({ brandDescription }),
      updateFeatures: (features) => set({ features }),
      updateFeature: (id, updated) => set((state) => ({
        features: state.features.map((f) => f.id === id ? { ...f, ...updated } : f)
      })),
      updateHeroSettings: (hero) => set((state) => ({ ...state, ...hero })),
      updatePreorderSettings: (preorder) => set((state) => ({ ...state, ...preorder })),

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

      addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map((order) =>
          order.orderId === orderId
            ? { ...order, status, updatedAt: Date.now() }
            : order
        ),
      })),
      getOrderById: (orderId) => {
        const state = get();
        return state.orders.find((order) => order.orderId === orderId);
      },
      getAllOrders: () => {
        const state = get();
        return state.orders;
      },
    }),
    {
      name: 'voxelwood-products-store',
      storage: {
        getItem: async (name) => {
          if (typeof window === 'undefined') return null;
          try {
            const { get, set } = await import('idb-keyval');
            const value = await get(name);
            if (value) {
              return typeof value === 'string' ? JSON.parse(value) : value;
            }
            
            const localValue = localStorage.getItem(name);
            if (localValue) {
              const parsed = JSON.parse(localValue);
              await set(name, localValue);
              return parsed;
            }
          } catch (e) {
            console.error('Error reading from IDB:', e);
          }
          return null;
        },
        setItem: async (name, value) => {
          if (typeof window === 'undefined') return;
          try {
            const { set } = await import('idb-keyval');
            await set(name, JSON.stringify(value));
            localStorage.removeItem(name);
          } catch (e) {
            console.error('Error writing to IDB:', e);
          }
        },
        removeItem: async (name) => {
          if (typeof window === 'undefined') return;
          try {
            const { del } = await import('idb-keyval');
            await del(name);
            localStorage.removeItem(name);
          } catch (e) {
            console.error('Error removing from IDB:', e);
          }
        },
      },
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

  return mounted ? name : '';
}

export function useBrandSubtitle() {
  const subtitle = useProductStore((state) => state.brandSubtitle);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? subtitle : '';
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

  return mounted ? desc : '';
}

export function useHeroSettings() {
  const heroLabel = useProductStore((state) => state.heroLabel);
  const heroTitle = useProductStore((state) => state.heroTitle);
  const heroDescription = useProductStore((state) => state.heroDescription);
  const heroImage = useProductStore((state) => state.heroImage);
  const heroPrice = useProductStore((state) => state.heroPrice);
  const heroDimensions = useProductStore((state) => state.heroDimensions);
  const heroLinkSlug = useProductStore((state) => state.heroLinkSlug);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? { heroLabel, heroTitle, heroDescription, heroImage, heroPrice, heroDimensions, heroLinkSlug } : {
    heroLabel: '',
    heroTitle: '',
    heroDescription: '',
    heroImage: '',
    heroPrice: 0,
    heroDimensions: '',
    heroLinkSlug: '',
  };
}

export function useOrders() {
  const storeOrders = useProductStore((state) => state.orders);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? storeOrders : [];
}

export function usePreorderSettings() {
  const preorderTitle = useProductStore((state) => state.preorderTitle);
  const preorderDescription = useProductStore((state) => state.preorderDescription);
  const preorderLinkSlug = useProductStore((state) => state.preorderLinkSlug);
  const preorderImage = useProductStore((state) => state.preorderImage);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? { preorderTitle, preorderDescription, preorderLinkSlug, preorderImage } : {
    preorderTitle: '',
    preorderDescription: '',
    preorderLinkSlug: '',
    preorderImage: '',
  };
}
