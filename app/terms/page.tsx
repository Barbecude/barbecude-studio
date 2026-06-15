'use client';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-left animate-fade-in">
      <Link href="/legal" className="text-brand-green text-sm tracking-widest font-bold mb-6 inline-block hover:brightness-110">
        &larr; Kembali ke Informasi Sistemrmasi Legal
      </Link>
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-text-primary">
        Syarat & Ketentuan
      </h1>
      <div className="text-text-secondary space-y-6 leading-relaxed">
        <p>Terakhir diperbarui: 15 Juni 2026</p>
        <p>Dengan melakukan pembelian dan menggunakan platform ini, kamu menyetujui seluruh ketentuan layanan di bawah ini.</p>
        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4 tracking-wider tracking-wider">1. Ketersediaan Produk</h2>
        <p>Semua produk kami adalah kerajinan tangan. Jika suatu produk kehabisan stok, pemesanan dapat ditunda hingga proses produksi manual (crafting) selesai.</p>
        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4 tracking-wider tracking-wider">2. Pembayaran</h2>
        <p>Pembayaran harus diselesaikan maksimal 1x24 jam setelah proses checkout. Pesanan yang belum dibayar akan dibatalkan secara otomatis.</p>
        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4 tracking-wider tracking-wider">3. Hak Cipta</h2>
        <p>Semua desain produk voxel, visual, dan branding adalah milik eksklusif Studio ini dan dilindungi oleh kekayaan intelektual.</p>
      </div>
    </div>
  );
}
