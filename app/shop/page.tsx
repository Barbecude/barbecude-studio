'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { useProducts, useProductStore } from '@/lib/productStore';

export default function ShopIndex() {
  const products = useProducts();
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
    <div className="pb-16 font-sans text-left">
      {/* Hero Banner - Toko Voxelwood */}
      <div className="relative bg-bg-panel border-b border-stone-gray py-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden mb-12">
         <div className="absolute inset-0 bg-bg-primary pointer-events-none">
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at center, #378B2E 0, transparent 60%)' }} />
            {/* Decorative grid pattern */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
         </div>
         <Image 
           src="https://picsum.photos/seed/woodshop/1200/300" 
           alt="Banner Toko Kayu" 
           fill 
           className="object-cover opacity-10 mix-blend-overlay" 
           referrerPolicy="no-referrer"
         />
         <div className="z-10 relative">
            <span className="text-brand-green text-[10px] tracking-widest  mb-4 block font-bold">Koleksi Buatan Tangan</span>
            <h1 className="font-bold tracking-tight uppercase text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6 ">
               Toko <span className="text-brand-green">Voxelwood</span>
            </h1>
            <p className="text-sm uppercase tracking-widest md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
               Bawa dunia pikselmu ke kenyataan, balok demi balok. Dekorasi balok kayu premium buatan tangan yang terinspirasi dari dunia piksel favoritmu.
            </p>
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
                  className={`px-5 py-2.5 bg-bg-surface border font-bold whitespace-nowrap text-xs uppercase tracking-wider  tracking-wider rounded-none transition-all cursor-pointer
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
           <div className="fixed bottom-6 right-6 z-50 bg-bg-surface border-2 border-brand-green p-4 font-bold text-xs uppercase tracking-wider  tracking-wider text-text-primary shadow-2xl flex items-center gap-3 animate-fade-in">
             <span className="text-brand-green">✦</span> Berhasil ditambahkan ke keranjang!
           </div>
         )}

         {/* Product Grid */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {filteredProducts.map(product => (
             <div key={product.id} className="minecraft-panel p-4 flex flex-col group rounded-none text-left">
               {/* Product Image Wrapper - Clickable to Detail page */}
               <Link href={`/shop/${product.slug}`} className="block aspect-square relative mb-3 bg-bg-panel border border-stone-gray rounded-none overflow-hidden">
                  <Image src={product.image} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" />
               </Link>
               
               <Link href={`/shop/${product.slug}`} className="block hover:text-brand-green transition-colors">
                  <h3 className="font-bold text-sm uppercase tracking-widest mb-1 leading-tight text-text-primary tracking-tight line-clamp-1">{product.name}</h3>
               </Link>
               <div className="font-sans text-text-secondary text-xs uppercase tracking-wider mb-4 w-full">IDR {product.price.toLocaleString('id-ID')}</div>
               
               <div className="mt-auto flex items-center gap-2 w-full">
                 <button
                   onClick={() => handleBuyNow(product)} 
                   className="flex-1 text-center text-xs uppercase tracking-wider py-2 bg-brand-green text-white hover:brightness-110 font-bold tracking-wider rounded-none  block cursor-pointer border-0"
                 >
                    Beli
                 </button>
                 <button
                   onClick={() => handleAddToCart(product)}
                   className="p-2 border border-stone-gray text-text-secondary hover:text-brand-green hover:border-brand-green transition-all bg-transparent rounded-none cursor-pointer flex items-center justify-center aspect-square shrink-0"
                   title="Tambah ke Keranjang"
                 >
                    <ShoppingCart className="w-4 h-4" />
                 </button>
               </div>
             </div>
           ))}
         </div>
       </div>
    </div>
  );
}
