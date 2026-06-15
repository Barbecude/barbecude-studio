import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: any;
  onBuyNow: (product: any) => void;
  onAddToCart: (product: any) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function ProductCard({ product, onBuyNow, onAddToCart, className = '', style }: ProductCardProps) {
  return (
    <div 
      className={`bg-bg-panel border border-stone-gray p-4 flex flex-col group rounded-none text-left transition-all hover:border-[#444] hover:shadow-lg ${className}`}
      style={style}
    >
      {/* Product Image Wrapper - Clickable to Detail page */}
      <Link href={`/shop/${product.slug}`} className="block aspect-square relative mb-3 bg-transparent rounded-none overflow-hidden">
        <Image src={product.image} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" />
      </Link>

      <Link href={`/shop/${product.slug}`} className="block hover:text-brand-green transition-colors">
        <h3 className="font-bold text-sm tracking-widest mb-1 leading-tight text-text-primary tracking-tight line-clamp-1">{product.name}</h3>
      </Link>
      <div className="text-text-secondary text-sm tracking-wider mb-4 w-full">Rp {product.price.toLocaleString('id-ID')}</div>

      <div className="mt-auto flex items-center gap-2 w-full">
        <Button
          onClick={() => onBuyNow(product)}
          className="flex-1 rounded-none text-xs tracking-wider font-bold"
        >
          Beli Sekarang
        </Button>
        <Button
          onClick={() => onAddToCart(product)}
          variant="outline"
          size="icon"
          className="rounded-none border-stone-gray text-text-secondary hover:text-white hover:border-primary shrink-0 transition-all"
          title="Tambah ke Keranjang"
        >
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
