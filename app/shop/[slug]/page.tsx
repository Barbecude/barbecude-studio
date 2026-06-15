'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ArrowLeft, Check, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { useProductBySlug, useProductStore } from '@/lib/productStore';
import { Button } from '@/components/ui/button';

export default function ShopProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = use(params);
  const product = useProductBySlug(awaitedParams.slug);
  const router = useRouter();
  const addToCart = useProductStore((state) => state.addToCart);

  const [successMsg, setSuccessMsg] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product?.image);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-xl font-bold mb-4">Produk tidak ditemukan</h2>
        <Link href="/shop" className="text-brand-green underline font-bold">
          Kembali ke Toko
        </Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    if (product.stock > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }, 1);
      router.push('/cart');
    }
  };

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }, 1);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-left animate-fade-in">
      <Link href="/shop" className="text-text-secondary hover:text-text-primary text-sm tracking-widest font-bold flex items-center gap-2 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Toko
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Galeri Gambar */}
        <div className="flex flex-col gap-4">
          <div className="minecraft-panel p-2 aspect-square bg-bg-panel relative rounded-none border-t-0">
            <Image src={selectedImage || product.image} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" priority />
          </div>
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`minecraft-panel p-1 aspect-square relative cursor-pointer rounded-none border-t-0 transition-colors ${selectedImage === img ? 'border-brand-green border-[3px]' : 'hover:border-brand-green/70 border-stone-700 border-2'}`}
                >
                  <Image src={img} alt={`Pratinjau ${idx + 1}`} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Sisi Kanan */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Note: "hapus badge PILIHAN TERMURAH di detail product" - Completed! */}

            <h1 className="font-bold tracking-tight text-4xl md:text-5xl mb-4 text-text-primary leading-tight">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-stone-gray">
              <span className="text-4xl font-bold text-muted-foreground ">Rp {product.price.toLocaleString('id-ID')}</span>
              {product.stock === 0 ? (
                <span className="bg-red-500/20 text-red-400 px-2.5 py-1 text-xs tracking-wider border border-red-500 font-bold tracking-wider">
                  HABIS
                </span>
              ) : (
                <span className="bg-brand-green/20 text-brand-green px-2.5 py-1 text-xs tracking-wider border border-brand-green font-bold tracking-wider">
                  STOK: {product.stock}
                </span>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-text-primary mb-2 tracking-wider text-sm tracking-widest tracking-wider">Deskripsi Produk</h3>
              <p className="text-text-secondary leading-relaxed text-sm tracking-widest">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-y-4 mb-6 text-xs tracking-wider border border-stone-gray p-4 bg-bg-surface/60">
              <div>
                <span className="text-text-secondary font-bold block mb-1 tracking-wider">Dimensi</span>
                <span className="text-text-primary">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-text-secondary font-bold block mb-1 tracking-wider">Bahan Baku</span>
                <span className="text-text-primary">{product.material}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {successMsg && (
              <div className="p-3 bg-brand-green/10 text-brand-green text-xs tracking-wider font-semibold flex items-center gap-2 border border-brand-green/30 animate-fade-in">
                <Check className="w-4 h-4" /> Berhasil ditambahkan ke keranjang belanja kamu!
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {product.stock === 0 ? (
                <Button
                  disabled
                  size="lg"
                  className="flex-1 text-sm tracking-widest font-bold flex items-center justify-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" /> Stok Habis
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleBuyNow}
                    size="lg"
                    className="flex-1 text-xs font-bold tracking-widest "
                  >
                    BELI SEKARANG
                  </Button>

                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    variant="outline"
                    className="px-4 aspect-square shrink-0 border-stone-gray text-stone-400 hover:text-stone-200 bg-transparent hover:bg-stone-800/50"
                    title="Tambah ke Keranjang"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                </>
              )}
            </div>

            {product.shopee_link && (
              <div className="pt-2 text-center sm:text-left">
                <a
                  href={product.shopee_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#EE4D2D] hover:text-[#d74326] transition-colors hover:underline"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Beli di Shopee
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
