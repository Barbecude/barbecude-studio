'use client';
import Link from 'next/link';

export default function RefundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-left animate-fade-in">
      <Link href="/legal" className="text-primary text-sm tracking-widest font-bold mb-6 inline-block hover:brightness-110">
        &larr; Kembali ke Informasi Sistemrmasi Legal
      </Link>
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-text-primary">
        Kebijakan Pengembalian
      </h1>
      <div className="text-text-secondary space-y-6 leading-relaxed">
        <p>Terakhir diperbarui: 15 Juni 2026</p>
        <p>Kami memastikan bahwa semua kerajinan tangan diperiksa kualitas (Quality Control) dua lapis sebelum dikirim.</p>
        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4 tracking-wider tracking-wider">1. Cacat atau Rusak saat Pengiriman</h2>
        <p>Apabila produk pajangan kamu diterima dalam keadaan rusak akibat kurir, kami memberikan garansi perbaikan atau penukaran unit baru penuh maksimal klaim 2 hari (2x24 jam) setelah barang tiba dengan melampirkan video unboxing utuh.</p>
        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4 tracking-wider tracking-wider">2. Pengembalian Dana (Refund)</h2>
        <p>Pengembalian dana hanya diperkenankan jika stok unit yang ingin ditukar ternyata Habis atau bahan baku dari hutan kami belum tersedia lebih dari masa tenggang pengiriman wajar (15 hari).</p>
      </div>
    </div>
  );
}
