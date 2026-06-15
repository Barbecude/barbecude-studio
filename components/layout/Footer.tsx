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
    <footer className="bg-bg-surface border-t border-stone-gray py-12 mt-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 text-left">
           <Link href="/" className="flex items-center gap-3 group w-fit">
             {brandLogo ? (
               <div className="relative w-10 h-10 rounded-full overflow-hidden border border-stone-gray transition-transform duration-300 group-hover:scale-105">
                 <Image src={brandLogo} alt="Brand Logo" fill className="object-cover" referrerPolicy="no-referrer" />
               </div>
             ) : (
               <div className="relative w-8 h-8 bg-brand-green flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                 <span className="absolute top-0 left-0 w-1.5 h-1.5 bg-bg-surface"></span>
                 <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-bg-surface"></span>
                 <span className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-bg-surface"></span>
                 <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-bg-surface"></span>
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
           <p className="mt-4 text-text-secondary text-sm uppercase tracking-widest max-w-sm leading-relaxed">
             {brandDescription}
           </p>
        </div>
        <div className="text-left">
          <h3 className="font-bold text-text-primary mb-4 uppercase tracking-wider text-xs uppercase tracking-wider tracking-widest ">Ekosistem</h3>
          <ul className="space-y-2 text-text-secondary text-sm uppercase tracking-widest">
            <li><Link href="/shop" className="hover:text-brand-green transition-colors">Voxelwood Craft</Link></li>
            <li><span className="opacity-40 select-none">MC Hosting</span></li>
            <li><span className="opacity-40 select-none">Game Top-Up</span></li>
          </ul>
        </div>
        <div className="text-left">
           <Link href="/legal" className="inline-block font-bold text-text-primary hover:text-brand-green mb-4 uppercase tracking-wider text-xs uppercase tracking-wider tracking-widest  transition-colors">
              Legal
           </Link>
          <ul className="space-y-2 text-text-secondary text-sm uppercase tracking-widest">
            <li><Link href="/terms" className="hover:text-brand-green transition-colors">Syarat & Ketentuan</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-green transition-colors">Kebijakan Privasi</Link></li>
            <li><Link href="/refund" className="hover:text-brand-green transition-colors">Kebijakan Pengembalian</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-gray text-center text-text-secondary text-xs uppercase tracking-wider  tracking-widest">
        &copy; {new Date().getFullYear()} {brandName}. Hak Cipta Dilindungi. Bukan produk resmi Minecraft. Tidak disetujui oleh atau terkait dengan Mojang.
      </div>
    </footer>
  );
}

