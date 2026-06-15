'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Menu, Box, Server, Gamepad2 } from 'lucide-react';
import { useBrandName, useBrandSubtitle, useBrandLogo, useCart } from '@/lib/productStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const brandName = useBrandName();
  const brandSubtitle = useBrandSubtitle();
  const brandLogo = useBrandLogo();
  const cart = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      "bg-bg-surface border-b border-stone-gray"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {brandLogo ? (
            <div className="relative w-10 h-10 rounded-none overflow-hidden border border-stone-gray transition-transform duration-300">
              <img src={brandLogo} alt="Brand Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          ) : (
            <div className="relative w-8 h-8 bg-brand-green rounded-none flex items-center justify-center transition-transform duration-300">
              <span className="text-white font-black text-sm select-none">
                {brandName ? brandName.charAt(0).toUpperCase() : 'B'}
              </span>
            </div>
          )}
          <div className="flex flex-col text-left leading-tight">
            <span className="font-bold tracking-tight text-sm md:text-base text-text-primary group-hover:text-brand-green transition-colors duration-200">
              {brandName}
            </span>
            {brandSubtitle && (
              <span className="font-semibold text-[10px] text-text-secondary tracking-widest">
                {brandSubtitle}
              </span>
            )}
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link
            href="/shop"
            className="flex items-center group px-2"
          >
            <div className={`py-1 flex items-center gap-2 transition-all ${
              pathname === '/' || pathname.startsWith('/shop')
                ? 'text-brand-green border-b-2 border-brand-green'
                : 'text-text-secondary border-b-2 border-transparent group-hover:text-text-primary group-hover:border-stone-gray'
            }`}>
              <Box className="w-4 h-4" /> Toko
            </div>
          </Link>
          <div
            className="px-2 py-1 flex items-center gap-2 text-text-secondary/50 select-none cursor-not-allowed"
            title="Layanan hosting dinonaktifkan sementara"
          >
            <Server className="w-4 h-4" /> Hosting
          </div>
          <div
            className="px-2 py-1 flex items-center gap-2 text-text-secondary/50 select-none cursor-not-allowed"
            title="Layanan top-up dinonaktifkan sementara"
          >
            <Gamepad2 className="w-4 h-4" /> Top-Up
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/cart" className="minecraft-btn gap-2 py-2 px-4 shadow-sm">
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Keranjang</span>
            <span className="bg-black/30 px-1.5 py-0.5 rounded-none text-xs">{cartCount}</span>
          </Link>

          {/* Mobile toggle */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden rounded-none border-stone-gray bg-transparent text-text-primary hover:bg-bg-panel"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-bg-surface border-b border-stone-gray shadow-lg animate-in slide-in-from-top-2">
            <nav className="flex flex-col p-4 gap-2 text-sm font-medium">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 transition-all flex items-center gap-2 rounded-none ${
                  pathname === '/' || pathname.startsWith('/shop')
                    ? 'bg-bg-panel text-brand-green border-l-2 border-brand-green'
                    : 'text-text-secondary hover:bg-bg-panel hover:text-text-primary border-l-2 border-transparent'
                }`}
              >
                <Box className="w-4 h-4" /> Toko
              </Link>
              <div
                className="px-4 py-3 flex items-center gap-2 text-text-secondary/50 select-none cursor-not-allowed border-l-2 border-transparent"
                title="Layanan hosting dinonaktifkan sementara"
              >
                <Server className="w-4 h-4" /> Hosting
              </div>
              <div
                className="px-4 py-3 flex items-center gap-2 text-text-secondary/50 select-none cursor-not-allowed border-l-2 border-transparent"
                title="Layanan top-up dinonaktifkan sementara"
              >
                <Gamepad2 className="w-4 h-4" /> Top-Up
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

