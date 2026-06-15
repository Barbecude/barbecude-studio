'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { useProducts, useProductStore, useHeroSettings } from '@/lib/productStore';
import { ProductCard } from '@/components/ProductCard';

export default function ShopIndex() {
  const products = useProducts();
  const heroSettings = useHeroSettings();
  const { addToCart } = useProductStore();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [showToast, setShowToast] = useState(false);

  const categories = ['Semua', 'Gantungan Kunci', 'Mob', 'Item', 'Flowers'];

  const filteredProducts = activeCategory === 'Semua'
    ? products
    : products.filter(product => product.category.toLowerCase() === activeCategory.toLowerCase());

  const handleBuyNow = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, 1);
    router.push('/cart');
  };

  const handleAddToCart = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="pb-16 text-left">
      {/* Hero Banner - Toko Voxelwood */}
      <div className="relative bg-bg-panel border-b border-stone-gray py-5 md:py-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden mb-12">
        <div className="absolute inset-0 bg-bg-primary pointer-events-none">
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at center, #378B2E 0, transparent 60%)' }} />
          {/* Decorative grid pattern */}
          
        </div>
        <div className="z-10 relative">
    
          <h1 className="font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
            Semua produk
          </h1>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Filters & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 bg-bg-surface border font-bold whitespace-nowrap text-xs  tracking-wider  tracking-wider rounded-none transition-all cursor-pointer
                    ${cat === activeCategory
                    ? 'border-brand-green text-brand-green'
                    : 'border-stone-gray text-text-secondary hover:text-text-primary hover:border-brand-green'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Success toast notification for cart */}
        {showToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-bg-surface border-2 border-brand-green p-4 font-bold text-xs tracking-wider tracking-wider text-text-primary shadow-2xl flex items-center gap-3 animate-fade-in">
            <span className="text-brand-green">✦</span> Berhasil ditambahkan ke keranjang!
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
