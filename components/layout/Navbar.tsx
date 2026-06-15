'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Menu, Box, Server, Gamepad2 } from 'lucide-react';
import { useBrandName, useBrandSubtitle, useBrandLogo, useCart } from '@/lib/productStore';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isLinkActive = (path: string) => pathname === path;
  const brandName = useBrandName();
  const brandSubtitle = useBrandSubtitle();
  const brandLogo = useBrandLogo();
  const cart = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    let keys: string[] = [];
    const target = ['ArrowUp', 'd', 'u', 'd', 'e', 'b', 'a', 'r', 'b', 'e', 'c', 'u', 'd', 'e'];
    
    const handler = (e: KeyboardEvent) => {
      keys.push(e.key);
      if (keys.length > target.length) {
        keys.shift();
      }
      
      let match = keys.length === target.length;
      if (match) {
        for (let i = 0; i < target.length; i++) {
          if (keys[i] !== target[i]) {
            match = false;
            break;
          }
        }
      }
      
      if (match) {
        router.push('/admin');
        keys = [];
      }
    };
    
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router]);

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-md border-b border-stone-gray font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {brandLogo ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-stone-gray transition-transform duration-300 group-hover:scale-105">
              <Image src={brandLogo} alt="Brand Logo" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
          ) : (
            <div className="relative w-8 h-8 bg-brand-green flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="absolute top-0 left-0 w-1.5 h-1.5 bg-bg-primary"></span>
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-bg-primary"></span>
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-bg-primary"></span>
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-bg-primary"></span>
              <span className="text-white font-black text-sm uppercase tracking-widest select-none">
                {brandName ? brandName.charAt(0).toUpperCase() : 'B'}
              </span>
            </div>
          )}
          <div className="flex flex-col text-left leading-tight">
            <span className="font-bold tracking-[0.15em] text-sm uppercase tracking-widest md:text-base  text-text-primary group-hover:text-brand-green transition-colors duration-200">
              {brandName}
            </span>
            {brandSubtitle && (
              <span className="font-bold tracking-[0.2em] text-[10px]  text-text-secondary">
                {brandSubtitle}
              </span>
            )}
          </div>
        </Link>

        {/* Clean minimal tab navigation */}
        <nav className="hidden md:flex items-center gap-1 text-xs uppercase tracking-wider font-bold  tracking-wider">
          <Link 
            href="/shop" 
            className={`px-4 py-2 transition-all flex items-center gap-2 border-b-2 hover:text-text-primary hover:border-brand-green/45 ${
              isLinkActive('/shop') 
                ? 'text-text-primary border-brand-green' 
                : 'text-text-secondary border-transparent'
            }`}
          >
            <Box className="w-3.5 h-3.5" /> Toko
          </Link>
          <div 
            className="px-4 py-2 flex items-center gap-2 border-b-2 border-transparent text-text-secondary/40 select-none cursor-not-allowed "
            title="Layanan hosting dinonaktifkan sementara"
          >
            <Server className="w-3.5 h-3.5" /> Hosting
          </div>
          <div 
            className="px-4 py-2 flex items-center gap-2 border-b-2 border-transparent text-text-secondary/40 select-none cursor-not-allowed "
            title="Layanan top-up dinonaktifkan sementara"
          >
            <Gamepad2 className="w-3.5 h-3.5" /> Top-Up
          </div>
        </nav>

        <div className="flex items-center gap-1">
          {/* Cart Icon styled professionally: green background, cart text and icon, no border */}
          <Link 
            href="/cart" 
            className={`px-3 py-1.5 bg-brand-green hover:brightness-110 text-text-primary relative flex items-center gap-2 text-xs uppercase tracking-wider font-bold  transition-all rounded-none ${
              isLinkActive('/cart') ? 'brightness-110' : ''
            }`}
          >
            <ShoppingCart className="w-4 h-4 text-text-primary" />
            <span>Keranjang</span>
            <span className="bg-[#1f541a] text-white text-[10px] px-1 py-0.5 font-bold font-mono">{cartCount}</span>
          </Link>

          {/* Mobile responsive toggler */}
          <button className="md:hidden p-2 bg-transparent hover:bg-bg-panel border border-transparent hover:border-stone-gray text-text-secondary hover:text-text-primary transition-all">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
