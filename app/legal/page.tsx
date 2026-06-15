'use client';
import Link from 'next/link';
import { useBrandName } from '@/lib/productStore';
import { Shield, FileText, RefreshCcw } from 'lucide-react';

export default function LegalIndexPage() {
  const brandName = useBrandName();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-left font-sans animate-fade-in">
      <h1 className="text-3xl md:text-5xl font-extrabold  tracking-tight mb-4 text-text-primary">
        INFORMASI LEGAL
      </h1>
      <p className="text-text-secondary text-sm uppercase tracking-widest mb-12">
        Semua informasi hukum, syarat penggunaan, dan kebijakan operasional platform {brandName}.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/terms" className="minecraft-panel border-stone-gray hover:border-brand-green group cursor-pointer text-left focus:outline-none h-full block">
          <FileText className="w-8 h-8 text-brand-green mb-4" />
          <h2 className="text-lg font-bold text-text-primary  mb-2 uppercase tracking-wider group-hover:text-brand-green transition-colors">Syarat & Ketentuan</h2>
          <p className="text-xs uppercase tracking-wider text-text-secondary">Aturan penggunaan layanan dan platform kami secara keseluruhan.</p>
        </Link>
        
        <Link href="/privacy" className="minecraft-panel border-stone-gray hover:border-brand-green group cursor-pointer text-left focus:outline-none h-full block">
          <Shield className="w-8 h-8 text-brand-green mb-4" />
          <h2 className="text-lg font-bold text-text-primary  mb-2 uppercase tracking-wider group-hover:text-brand-green transition-colors">Kebijakan Privasi</h2>
          <p className="text-xs uppercase tracking-wider text-text-secondary">Bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda.</p>
        </Link>
        
        <Link href="/refund" className="minecraft-panel border-stone-gray hover:border-brand-green group cursor-pointer text-left focus:outline-none h-full block">
          <RefreshCcw className="w-8 h-8 text-brand-green mb-4" />
          <h2 className="text-lg font-bold text-text-primary  mb-2 uppercase tracking-wider group-hover:text-brand-green transition-colors">Kebijakan Pengembalian</h2>
          <p className="text-xs uppercase tracking-wider text-text-secondary">Panduan pengembalian dana dan garansi produk dari toko kami.</p>
        </Link>
      </div>
    </div>
  );
}
