'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, CaretLeft, CaretRight, ShoppingCart } from '@phosphor-icons/react';
import * as PhosphorIcons from '@phosphor-icons/react';
import { useProducts, useFeatures, useProductStore, useHeroSettings, usePreorderSettings } from '@/lib/productStore';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/ProductCard';
import { ViewAllCollectionsButton } from '@/components/ViewAllCollectionsButton';

export default function Home() {
  const products = useProducts();
  const features = useFeatures();
  const heroSettings = useHeroSettings();
  const { addToCart } = useProductStore();
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [showToast, setShowToast] = useState(false);
  const [preorderProduct, setPreorderProduct] = useState<any>(null);
  const [showPreorder, setShowPreorder] = useState(false);
  const { preorderTitle, preorderDescription, preorderLinkSlug, preorderImage } = usePreorderSettings();

  useEffect(() => {
    if (!preorderTitle) return;
    const timer = setTimeout(() => {
      setShowPreorder(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [preorderTitle]);

  const handleBuyNow = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, 1);
    router.push('/cart');
  };

  const handleAddToCart = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const cheapestProducts = products.filter(p => p.cheapest);

  const [bentoProducts, setBentoProducts] = useState<any[]>([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setBentoProducts(shuffled.slice(0, 3));
    }
  }, [products]);

  const keychain = bentoProducts[0] || products[0];
  const enderman = bentoProducts[1] || products[1] || products[0];
  const chest = bentoProducts[2] || products[2] || products[0];

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
    <div className="flex flex-col gap-16 pb-24 bg-background text-foreground relative min-h-screen">
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-card border-2 border-primary p-4 font-bold text-xs tracking-wider text-card-foreground shadow-2xl flex items-center gap-3 animate-fade-in rounded-md">
          <span className="text-primary">✦</span> Berhasil ditambahkan ke keranjang!
        </div>
      )}

      {/* Beli sekarang Toast */}
      {showPreorder && preorderTitle && (
        <div className="fixed bottom-6 left-6 z-[100] max-w-sm bg-card border border-border p-6 shadow-2xl animate-fade-in rounded-lg flex gap-4">
          {preorderImage && (
            <div className="w-20 h-20 relative shrink-0 rounded-md overflow-hidden border border-border block">
              <Image src={preorderImage} alt={preorderTitle} fill className="object-cover" />
            </div>
          )}
          <div className="flex-1">
            <button
              onClick={() => setShowPreorder(false)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <PhosphorIcons.X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-xl mb-2 tracking-tight text-foreground">
              {preorderTitle}
            </h3>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed hidden sm:block">
              {preorderDescription}
            </p>

            <Link
              href={`/shop/${preorderLinkSlug}`}
              onClick={() => setShowPreorder(false)}
              className={cn(buttonVariants({ variant: 'default' }), "w-full gap-2")}
            >
              Beli sekarang <PhosphorIcons.CaretRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen flex items-center justify-start overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          {heroSettings.heroImage && heroSettings.heroImage.trim() !== '' ? (
            <Image
              src={heroSettings.heroImage}
              alt={`Hero - ${heroSettings.heroTitle}`}
              fill
              className="object-cover object-center"
              referrerPolicy="no-referrer"
              priority
              unoptimized={true}
              quality={100}
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent w-full" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 flex flex-col items-start text-left">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05] text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
            {(heroSettings.heroTitle || "")
              .split(" ")
              .map((word, i) => (
                <span key={i}>
                  {word}{" "}
                  {i === 1 && <br />}
                </span>
              ))}
          </h1>

          <p className="text-base sm:text-lg text-white font-medium mb-10 leading-relaxed max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-pre-wrap">
            {heroSettings.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 mb-10 bg-card/60 backdrop-blur-md px-8 py-5 border border-border rounded-xl shadow-xl">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground tracking-wider  mb-1">Harga</span>
              <span className="text-3xl sm:text-5xl font-bold text-white drop-shadow-md">
                Rp {(heroSettings.heroPrice).toLocaleString('id-ID')}
              </span>
            </div>

            <div className="h-px w-20 sm:h-12 sm:w-px bg-border" />

            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground tracking-wider  mb-1">Ukuran</span>
              <span className="text-sm sm:text-base tracking-widest font-semibold text-foreground">{heroSettings.heroDimensions}</span>
            </div>
          </div>

          <Link href={`/shop/${heroSettings.heroLinkSlug}`} className={cn(buttonVariants({ size: "lg" }), "px-12 py-6 text-base font-bold transition-all")}>
            Beli Sekarang <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Button Lihat Semua Koleksi */}
      <div className="max-w-7xl mx-auto px-4 w-full pt-10 flex justify-center">
        <ViewAllCollectionsButton />
      </div>

      {/* 4. BENTO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Keychain */}
    <Link
      href={`/shop/${keychain?.slug || 'gantungan-kunci-creeper-wolf'}`}
      className="bg-card overflow-hidden group flex flex-col border border-border rounded-2xl shadow-sm hover:shadow-md transition-all"
    >
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-2">
          {keychain?.name || 'Gantungan Kunci Creeper & Wolf'}
        </h3>

        <div className="text-2xl font-bold text-muted-foreground mb-6">
          Rp {(keychain?.price || 45000).toLocaleString('id-ID')}
        </div>

        <div className="mt-auto">
          <div
            className={cn(
              buttonVariants({ size: "sm" }),
              "font-bold gap-2"
            )}
          >
            Beli Sekarang <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-square">
        <Image
          src={keychain?.image || "https://picsum.photos/seed/craft2/800/800"}
          alt={keychain?.name || "Gantungan Kunci"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
    </Link>

    {/* Enderman */}
    <Link
      href={`/shop/${enderman?.slug || 'pajangan-rak-enderman'}`}
      className="bg-card overflow-hidden group flex flex-col border border-border rounded-2xl shadow-sm hover:shadow-md transition-all"
    >
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-2">
          {enderman?.name || 'Pajangan Rak Enderman'}
        </h3>

        <div className="text-2xl font-bold text-muted-foreground mb-6">
          Rp {(enderman?.price || 120000).toLocaleString('id-ID')}
        </div>

        <div className="mt-auto">
          <div
            className={cn(
              buttonVariants({ size: "sm" }),
              "font-bold gap-2"
            )}
          >
            Beli Sekarang <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-square">
        <Image
          src={enderman?.image || "https://picsum.photos/seed/craft4/800/800"}
          alt={enderman?.name || "Enderman"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
    </Link>

    {/* Chest */}
    <Link
      href={`/shop/${chest?.slug || 'kotak-peti-voxel'}`}
      className="bg-card overflow-hidden group flex flex-col md:flex-row md:col-span-2 border border-border rounded-2xl shadow-sm hover:shadow-md transition-all"
    >
      <div className="p-6 sm:p-8 w-full md:w-1/2 flex flex-col justify-center">
        <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-2">
          {chest?.name || 'Kotak Peti Voxel'}
        </h3>

        <div className="text-2xl font-bold text-muted-foreground mb-6">
          Rp {(chest?.price || 200000).toLocaleString('id-ID')}
        </div>

        <div className="self-start mt-auto">
          <div
            className={cn(
              buttonVariants({ size: "sm" }),
              "font-bold gap-2"
            )}
          >
            Beli Sekarang <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto min-h-[320px]">
        <Image
          src={chest?.image || "https://picsum.photos/seed/craft5/800/800"}
          alt={chest?.name || "Kotak Peti"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
    </Link>

  </div>

  <div className="mt-20 flex flex-col items-center justify-center text-center">
    <div className="h-0.5 w-1/4 bg-border mb-10 rounded-full" />
    <ViewAllCollectionsButton animatePulse />
  </div>
</section>
      {/* 2. DYNAMIC SLIDESHOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Koleksi Termurah
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Button variant="outline" size="icon" onClick={scrollLeft} aria-label="Geser Kiri">
              <CaretLeft className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollRight} aria-label="Geser Kanan">
              <CaretRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 px-1 custom-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {cheapestProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
              className="min-w-[280px] sm:min-w-[300px] max-w-[320px] scroll-snap-align-start shadow-sm transition-all hover:shadow-md"
              style={{ scrollSnapAlign: 'start' }}
            />
          ))}
        </div>
      </section>

      {/* 3. CORE BENEFITS SECTION */}
      <section className="bg-card border-y border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat) => {
              let iconName = feat.icon;
              if (feat.title.toLowerCase().includes('handmade')) {
                iconName = 'HandHeart';
              } else if (feat.title.toLowerCase().includes('pelindung')) {
                iconName = 'ShieldCheck';
              } else if (feat.title.toLowerCase().includes('pengiriman')) {
                iconName = 'Truck';
              }

              const IconComponent = (PhosphorIcons as any)[iconName] || PhosphorIcons.Package;
              return (
                <div key={feat.id} className="flex items-start gap-4">
                  <div className="bg-primary p-3 rounded-lg shadow-sm">
                    <IconComponent weight="duotone" className="w-8 h-8 text-white shrink-0" />
                  </div>
                  <div className="text-left mt-1">
                    <h4 className="font-bold text-sm tracking-wide mb-2 text-foreground">{feat.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



    </div>
  );
}
