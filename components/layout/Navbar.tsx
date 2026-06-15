'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Menu, Box, Server, Gamepad2 } from 'lucide-react';
import { useBrandName, useBrandSubtitle, useBrandLogo, useCart } from '@/lib/productStore';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isLinkActive = (path: string) => pathname === path;
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
      isScrolled ? "bg-zinc-900/80 backdrop-blur-md border-b border-border/50" : "bg-transparent border-b border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {brandLogo ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border transition-transform duration-300">
              <img src={brandLogo} alt="Brand Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          ) : (
            <div className="relative w-8 h-8 bg-primary rounded-md flex items-center justify-center transition-transform duration-300">
              <span className="text-primary-foreground font-black text-sm select-none">
                {brandName ? brandName.charAt(0).toUpperCase() : 'B'}
              </span>
            </div>
          )}
          <div className="flex flex-col text-left leading-tight">
            <span className="font-bold tracking-tight text-sm md:text-base text-foreground group-hover:text-primary transition-colors duration-200">
              {brandName}
            </span>
            {brandSubtitle && (
              <span className="font-semibold text-[10px] text-muted-foreground  tracking-widest">
                {brandSubtitle}
              </span>
            )}
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          <Link
            href="/shop"
            className={`px-4 py-2 transition-all flex items-center gap-2 hover:bg-muted ${pathname === '/' || pathname.startsWith('/shop')
                ? 'text-brand-green border-b-2 border-brand-green rounded-none'
                : 'text-muted-foreground rounded-md'
              }`}
          >
            <Box className="w-4 h-4" /> Toko
          </Link>
          <div
            className="px-4 py-2 flex items-center gap-2 rounded-md text-muted-foreground/40 select-none cursor-not-allowed"
            title="Layanan hosting dinonaktifkan sementara"
          >
            <Server className="w-4 h-4" /> Hosting
          </div>
          <div
            className="px-4 py-2 flex items-center gap-2 rounded-md text-muted-foreground/40 select-none cursor-not-allowed"
            title="Layanan top-up dinonaktifkan sementara"
          >
            <Gamepad2 className="w-4 h-4" /> Top-Up
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/cart" className={cn(buttonVariants({ variant: "default" }), "gap-2 font-bold shadow-sm")}>
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Keranjang</span>
            <span className="bg-background/20 px-1.5 py-0.5 rounded-full text-xs">{cartCount}</span>
          </Link>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-900/95 backdrop-blur-md border-b border-border/50 shadow-lg animate-fade-in">
            <nav className="flex flex-col p-4 gap-2 text-sm font-medium">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 transition-all flex items-center gap-2 hover:bg-muted ${pathname === '/' || pathname.startsWith('/shop')
                    ? 'text-brand-green border-b-2 border-brand-green rounded-none'
                    : 'text-muted-foreground rounded-md'
                  }`}
              >
                <Box className="w-4 h-4" /> Toko
              </Link>
              <div
                className="px-4 py-3 flex items-center gap-2 rounded-md text-muted-foreground/40 select-none cursor-not-allowed"
                title="Layanan hosting dinonaktifkan sementara"
              >
                <Server className="w-4 h-4" /> Hosting
              </div>
              <div
                className="px-4 py-3 flex items-center gap-2 rounded-md text-muted-foreground/40 select-none cursor-not-allowed"
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
