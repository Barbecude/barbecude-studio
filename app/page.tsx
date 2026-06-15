'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useProducts, useFeatures, useProductStore } from '@/lib/productStore';

export default function Home() {
  const products = useProducts();
  const features = useFeatures();
  const { addToCart } = useProductStore();
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [showToast, setShowToast] = useState(false);
  const [preorderProduct, setPreorderProduct] = useState<any>(null);
  const [showPreorder, setShowPreorder] = useState(false);

  useEffect(() => {
    // Show random preorder toast after 1.5 seconds
    const timer = setTimeout(() => {
      if (products && products.length > 0) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        setPreorderProduct(randomProduct);
        setShowPreorder(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [products]);

  const handleBuyNow = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, 1);
    router.push('/cart');
  };

  const handleAddToCart = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Filter cheapest items (IDR 15.000 - IDR 50.000)
  const cheapestProducts = products.filter(p => p.cheapest);

  // Find products dynamically from the reactive store, with robust fallbacks
  const ironGolem = products.find(p => p.slug === 'figur-iron-golem') || products[0];
  const keychain = products.find(p => p.id === 3 && p.category === 'Gantungan Kunci') || products.find(p => p.category === 'Item') || products[0];
  const enderman = products.find(p => p.slug === 'pajangan-rak-enderman') || products.find(p => p.id === 7) || products[0];
  const sword = products.find(p => p.slug === 'replika-pedang-berlian') || products.find(p => p.id === 8) || products[0];
  const chest = products.find(p => p.slug === 'kotak-peti-voxel') || products.find(p => p.id === 9) || products[0];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-16 pb-24 bg-bg-primary text-text-primary font-sans relative">
      {/* Dynamic Success toast notification for cart */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-bg-surface border-2 border-brand-green p-4 font-bold text-xs uppercase tracking-wider text-text-primary shadow-2xl flex items-center gap-3 animate-fade-in">
          <span className="text-brand-green">✦</span> Berhasil ditambahkan ke keranjang!
        </div>
      )}

      {/* Pre-order Toast Notification */}
      {showPreorder && preorderProduct && (
        <div className="fixed bottom-6 left-6 z-[100] max-w-sm bg-[#1A1A1A] border-t-4 border-black p-6 shadow-2xl animate-fade-in">
          <button 
            onClick={() => setShowPreorder(false)}
            className="absolute top-2 right-2 text-stone-500 hover:text-white"
          >
            <LucideIcons.X className="w-5 h-5" />
          </button>
          
          <h3 className="font-bold text-xl text-white mb-4 font-mono tracking-wide">
            Pre-order now!
          </h3>
          
          <p className="text-sm text-gray-300 mb-6 leading-relaxed">
            Charge into a new adventure with <span className="font-bold text-white">{preorderProduct.name}</span>. Pre-order today and get exclusive early access, special dimensions {preorderProduct.dimensions}, and premium VIP craft treatment!
          </p>

          <button 
            onClick={() => {
              setShowPreorder(false);
              handleAddToCart(preorderProduct);
            }}
            className="bg-[#2D8C28] hover:bg-[#349E2D] border-b-4 border-[#1B5718] active:border-b-0 active:translate-y-1 text-white font-bold py-2.5 px-6 font-mono tracking-widest text-sm flex items-center gap-2 transition-all"
          >
            PRE-ORDER <LucideIcons.ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* 1. HERO SECTION: Split layout, text left with green highlight, product image fully visible */}
      <section className="relative min-h-[640px] flex items-center justify-center overflow-hidden py-16 bg-gradient-to-b from-bg-surface to-bg-primary border-b border-stone-gray">
        {/* Subtle geometric overlay dots for premium craft feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #378B2E 0, transparent 50%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Teks Minimalis & Hijau Konsisten */}
            <div className="flex flex-col items-start text-left max-w-xl">
              <span className="text-brand-green text-xs uppercase tracking-wider font-bold tracking-[0.25em] mb-4  font-mono bg-brand-green/10 px-3 py-1 border border-brand-green/20">
                Edisi Kolektor Utama
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4  leading-[1.05] text-text-primary">
                {ironGolem?.name || 'Figur Iron Golem'}
              </h1>
              <p className="text-base text-text-secondary mb-8 leading-relaxed max-w-md">
                {ironGolem?.description || 'Diukir presisi sepenuhnya dari satu balok kayu pinus padat premium tanpa sambungan. Dirancang minimalis sebagai pelindung elegan meja kerja Anda.'}
              </p>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary  font-mono tracking-wider">Harga Resmi</span>
                  <span className="text-2xl font-bold text-brand-green font-mono">
                    IDR {(ironGolem?.price || 150000).toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="h-8 w-px bg-stone-gray" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary  font-mono tracking-wider">Dimensi</span>
                  <span className="text-sm uppercase tracking-widest font-semibold text-text-primary font-mono">{ironGolem?.dimensions || '12cm x 8cm x 4cm'}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href={`/shop/${ironGolem?.slug || 'figur-iron-golem'}`} className="minecraft-btn text-sm uppercase tracking-widest py-3 px-8 text-center font-bold  tracking-wider flex items-center justify-center gap-2">
                  Beli Sekarang <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Premium Clear & Fully Visible Product Render (Apple Inspired) */}
            <div className="flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-[500px] aspect-square border-2 border-stone-gray bg-bg-panel overflow-hidden group">
                <Image 
                  src={ironGolem?.image || 'https://picsum.photos/seed/craft1/800/800'} 
                  alt={`Pratinjau ${ironGolem?.name || 'Figur Iron Golem'}`} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tombol Lihat Semua Koleksi di ATAS Koleksi Termurah Kami */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 flex justify-center">
        <Link 
          href="/shop" 
          className="minecraft-btn text-sm uppercase tracking-widest font-bold py-3.5 px-10  tracking-widest flex items-center justify-center gap-3 shadow-md hover:brightness-110"
        >
          Lihat Semua Koleksi <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 2. DYNAMIC SLIDESHOW: "Produk Termurah" Slider with Custom Scrollbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight  text-text-primary">
              Koleksi Termurah Kami
            </h2>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button 
              onClick={scrollLeft}
              className="p-3 bg-bg-surface border border-stone-gray text-text-primary hover:border-brand-green hover:text-brand-green transition-all focus:outline-none cursor-pointer"
              aria-label="Geser Kiri"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-3 bg-bg-surface border border-stone-gray text-text-primary hover:border-brand-green hover:text-brand-green transition-all focus:outline-none cursor-pointer"
              aria-label="Geser Kanan"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sliding horizontal container using the gorgeous .custom-scrollbar system */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth custom-scrollbar pb-6 pt-2 px-1"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {cheapestProducts.map((product) => (
            <div 
              key={product.id}
              className="min-w-[280px] sm:min-w-[300px] max-w-[320px] minecraft-panel p-4 flex flex-col group rounded-none text-left scroll-snap-align-start"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Product Image Wrapper - Clickable to Detail page (identical UI) */}
              <Link href={`/shop/${product.slug}`} className="block aspect-square relative mb-3 bg-bg-panel border border-stone-gray rounded-none overflow-hidden">
                 <Image src={product.image} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" />
              </Link>
              
              <Link href={`/shop/${product.slug}`} className="block hover:text-brand-green transition-colors">
                 <h3 className="font-bold text-sm uppercase tracking-widest mb-1 leading-tight text-text-primary tracking-tight line-clamp-1">{product.name}</h3>
              </Link>
              <div className="font-sans text-text-secondary text-xs uppercase tracking-wider mb-4">IDR {product.price.toLocaleString('id-ID')}</div>
              
               <div className="mt-auto flex items-center gap-2 w-full">
                 <button
                   onClick={() => handleBuyNow(product)} 
                   className="flex-1 text-center text-xs uppercase tracking-wider py-2 bg-brand-green text-white hover:brightness-110 font-bold tracking-wider rounded-none  block cursor-pointer border-0"
                 >
                    Beli
                 </button>
                 <button
                   onClick={() => handleAddToCart(product)}
                   className="p-2 border border-stone-gray text-text-secondary hover:text-text-primary hover:border-text-secondary transition-all bg-bg-panel rounded-none cursor-pointer flex items-center justify-center aspect-square shrink-0"
                   title="Tambah ke Keranjang"
                 >
                    <ShoppingCart className="w-4 h-4" />
                 </button>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tombol Lihat Semua Koleksi di atas manfaat utama ("100% Hand-Carved Wood") */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-4 text-center">
        <Link 
          href="/shop" 
          className="minecraft-btn text-sm uppercase tracking-widest font-bold py-3.5 px-10  tracking-widest inline-flex items-center justify-center gap-3 shadow-md hover:brightness-110"
        >
          Lihat Semua Koleksi <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3. CORE BENEFITS SECTION: Clean wood craft features (Dynamic from Admin Store) */}
      <section className="bg-bg-surface border-y border-stone-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat) => {
              const IconComponent = (LucideIcons as any)[feat.icon] || LucideIcons.Package;
              return (
                <div key={feat.id} className="flex items-start gap-4">
                  <IconComponent className="w-10 h-10 text-brand-green shrink-0 mt-1" />
                  <div className="text-left">
                    <h4 className="font-bold  text-sm uppercase tracking-widest mb-1 text-text-primary">{feat.title}</h4>
                    <p className="text-xs uppercase tracking-wider text-text-secondary leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. BENTO SHOWCASE: Consistent Color & Minimal Copy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-green text-xs uppercase tracking-wider font-bold tracking-[0.25em]  font-mono block mb-3">Koleksi Utama</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight  mb-4 text-text-primary leading-none">
             Mahakarya Meja Anda
          </h2>
        </div>

        {/* Minimalized Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Gantungan Kunci */}
          <div className="relative min-h-[420px] bg-bg-surface overflow-hidden group flex flex-col justify-between p-8 border border-stone-gray transition-all">
            <div className="absolute right-0 bottom-0 w-full sm:w-[50%] h-full pointer-events-none z-0">
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-bg-surface via-transparent to-transparent z-10" />
              <Image 
                src={keychain?.image || "https://picsum.photos/seed/craft2/800/800"} 
                alt={keychain?.name || "Gantungan Kunci"} 
                fill 
                className="object-cover opacity-80" 
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="relative z-10 max-w-sm text-left">
              <span className="text-brand-green text-[10px] font-bold  tracking-widest block mb-2 font-mono">Seri Aksesoris</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight  text-text-primary mb-2">
                {keychain?.name || 'Gantungan Kunci Creeper & Wolf'}
              </h3>
              <p className="text-sm uppercase tracking-widest text-text-secondary mb-4 line-clamp-3">
                {keychain?.description || 'Piksel mini pelengkap perjalanan harian Anda.'}
              </p>
              <div className="text-sm uppercase tracking-widest font-mono font-bold text-brand-green">
                IDR {(keychain?.price || 45000).toLocaleString('id-ID')}
              </div>
            </div>

            <div className="relative z-10 self-start mt-4">
              <Link href={`/shop/${keychain?.slug || 'gantungan-kunci-creeper'}`} className="minecraft-btn text-xs uppercase tracking-wider font-bold py-2 px-4  tracking-wider flex items-center gap-1">
                Selengkapnya <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card 2: Enderman */}
          <div className="relative min-h-[420px] bg-bg-surface overflow-hidden group flex flex-col justify-between p-8 border border-stone-gray transition-all">
            <div className="absolute inset-x-0 bottom-0 h-[50%] pointer-events-none z-0">
              <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent z-10" />
              <Image 
                src={enderman?.image || "https://picsum.photos/seed/craft4/800/800"} 
                alt={enderman?.name || "Enderman"} 
                fill 
                className="object-cover opacity-70" 
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative z-10 text-left">
              <span className="text-brand-green text-[10px] font-bold  tracking-widest block mb-2 font-mono">Seri Monster</span>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight  text-text-primary mb-2">
                {enderman?.name || 'Pajangan Rak Enderman'}
              </h3>
              <p className="text-xs uppercase tracking-wider text-text-secondary max-w-xs line-clamp-3">
                {enderman?.description || 'Mata berkilau misterius di atas lapisan kayu obsidian.'}
              </p>
            </div>

            <div className="relative z-10 mt-auto pt-4 flex items-center justify-between">
              <span className="text-sm uppercase tracking-widest font-bold text-brand-green font-mono">
                IDR {(enderman?.price || 120000).toLocaleString('id-ID')}
              </span>
              <Link href={`/shop/${enderman?.slug || 'pajangan-rak-enderman'}`} className="text-xs uppercase tracking-wider text-brand-green hover:text-text-primary transition-colors  font-bold tracking-widest inline-flex items-center gap-1 font-mono">
                 Beli &raquo;
              </Link>
            </div>
          </div>

          {/* Card 3 (Widest, Spans Both Columns): Kotak Penyimpanan Peti */}
          <div className="relative min-h-[380px] bg-bg-surface overflow-hidden group flex flex-col md:flex-row justify-between p-8 border border-stone-gray transition-all md:col-span-2">
            
            {/* Left aligned info */}
            <div className="relative z-10 max-w-sm text-left flex flex-col justify-center h-full">
              <span className="text-brand-green text-[10px] font-bold  tracking-widest block mb-2 font-mono">Set fungsional</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight  text-text-primary mb-2">
                {chest?.name || 'Kotak Peti Voxel'}
              </h3>
              <p className="text-sm uppercase tracking-widest text-text-secondary mb-4 line-clamp-3">
                {chest?.description || 'Penyimpanan serbaguna berlapis kain pelindung lembut.'}
              </p>
              <div className="text-base font-mono font-bold text-brand-green mb-6">
                IDR {(chest?.price || 200000).toLocaleString('id-ID')}
              </div>
              <div className="self-start">
                <Link href={`/shop/${chest?.slug || 'kotak-peti-voxel'}`} className="minecraft-btn text-xs uppercase tracking-wider font-bold py-3 px-6  tracking-wider flex items-center gap-2">
                  Pesan Sekarang <ArrowRight className="w-3" />
                </Link>
              </div>
            </div>

            {/* Right side background image with split effect on desktop */}
            <div className="absolute right-0 bottom-0 w-full md:w-[45%] h-[50%] md:h-full pointer-events-none z-0">
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-bg-surface via-transparent to-transparent z-10" />
              <Image 
                src={chest?.image || "https://picsum.photos/seed/craft5/800/800"} 
                alt={chest?.name || "Kotak Peti"} 
                fill 
                className="object-cover opacity-80" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

        {/* Global CTA: LIHAT SEMUA KOLEKSI */}
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <div className="h-0.5 w-1/4 bg-stone-gray mb-10" />
          <Link 
            href="/shop" 
            className="minecraft-btn text-sm uppercase tracking-widest font-bold py-4 px-10  tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:brightness-110 !bg-brand-green text-white border-0"
          >
            Lihat Semua Koleksi <ArrowRight className="w-5 h-5 animate-pulse" />
          </Link>
        </div>
      </section>

    </div>
  );
}
