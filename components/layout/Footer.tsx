'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useBrandName, useBrandSubtitle, useBrandDescription, useBrandLogo } from '@/lib/productStore';

export function Footer() {
  const brandName = useBrandName();
  const brandSubtitle = useBrandSubtitle();
  const brandDescription = useBrandDescription();
  const brandLogo = useBrandLogo();

  return (
    <footer className="bg-card border-t border-border py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 text-left">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            {brandLogo ? (
              <div className="relative w-10 h-10 overflow-hidden border border-border transition-transform duration-300" style={{ borderRadius: '50%' }}>
                <img src={brandLogo} alt="Brand Logo" className="w-full h-full object-cover" style={{ borderRadius: '50%' }} referrerPolicy="no-referrer" />
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
          <p className="mt-4 text-muted-foreground text-sm max-w-sm leading-relaxed">
            {brandDescription}
          </p>
        </div>
        <div className="text-left">
          <h3 className="font-bold text-foreground mb-4  tracking-wider text-xs">Ekosistem</h3>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li><Link href="/shop" className="hover:text-primary transition-colors">Voxelwood Craft</Link></li>
            <li><span className="opacity-40 select-none">MC Hosting</span></li>
            <li><span className="opacity-40 select-none">Game Top-Up</span></li>
          </ul>
        </div>
        <div className="text-left">
          <Link href="/legal" className="inline-block font-bold text-foreground hover:text-primary mb-4  tracking-wider text-xs transition-colors">
            Legal
          </Link>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li><Link href="/terms" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
            <li><Link href="/refund" className="hover:text-primary transition-colors">Kebijakan Pengembalian</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-border text-center text-muted-foreground text-xs">
        &copy; {new Date().getFullYear()} {brandName}. Hak Cipta Dilindungi. Bukan produk resmi Minecraft. Tidak disetujui oleh atau terkait dengan Mojang.
      </div>
    </footer>
  );
}
