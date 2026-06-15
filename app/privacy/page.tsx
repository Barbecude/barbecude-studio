'use client';

import Link from 'next/link';
import { Eye, ArrowLeft } from 'lucide-react';
import { useBrandName } from '@/lib/productStore';

export default function PrivacyPage() {
  const brandName = useBrandName();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-left">
      <Link href="/" className="text-text-secondary hover:text-text-primary text-sm tracking-widest font-bold flex items-center gap-2 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
      </Link>

      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-stone-gray">
        <Eye className="w-10 h-10 text-primary" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">Kebijakan Privasi</h1>
          <p className="text-xs tracking-wider text-text-secondary">Pembaruan Terakhir: {new Date().toLocaleDateString('id-ID')}</p>
        </div>
      </div>

      <div className="space-y-8 text-sm tracking-widest text-text-secondary leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary tracking-wider">1. Informasi Sistemrmasi yang Kami Kumpulkan</h2>
          <p>
            Kami mengumpulkan beberapa jenis informasi untuk berbagai keperluan guna menyediakan dan meningkatkan Layanan kami kepada kamu:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Data Pribadi:</strong> Saat menggunakan Layanan kami, kami mungkin meminta kamu untuk memberikan informasi identitas pribadi tertentu yang dapat digunakan untuk menghubungi atau mengidentifikasi kamu (&quot;Data Pribadi&quot;), termasuk alamat email, nama depan dan nama belakang, serta alamat lengkap pengiriman.</li>
            <li><strong>Data Penggunaan:</strong> Kami juga dapat mengumpulkan informasi tentang bagaimana Layanan diakses dan digunakan.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary tracking-wider">2. Penggunaan Data</h2>
          <p>
            {brandName} menggunakan data yang dikumpulkan untuk berbagai tujuan:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Untuk menyediakan dan memelihara Layanan kami;</li>
            <li>Untuk memberitahu kamu tentang perubahan pada Layanan kami;</li>
            <li>Untuk memproses pembayaran dan pengiriman pesanan fisik kamu;</li>
            <li>Untuk memberikan dukungan layanan pelanggan yang responsif;</li>
            <li>Untuk memantau penggunaan Layanan kami guna mendeteksi serta mencegah masalah teknis.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary tracking-wider">3. Keamanan Data</h2>
          <p>
            Keamanan data kamu penting bagi kami, tetapi ingatlah bahwa tidak ada metode transmisi melalui Internet, atau metode penyimpanan elektronik yang 100% aman. Meskipun kami berusaha menggunakan cara yang dapat diterima secara komersial untuk melindungi Data Pribadi kamu, kami tidak dapat menjamin keamanan mutlaknya.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary tracking-wider">4. Tautan ke Situs Lain</h2>
          <p>
            Layanan kami mungkin berisi tautan ke situs lain yang tidak dioperasikan oleh kami. Jika kamu mengklik tautan pihak ketiga, kamu akan diarahkan ke situs pihak ketiga tersebut. Kami sangat menyarankan kamu untuk meninjau Kebijakan Privasi setiap situs yang kamu kunjungi.
          </p>
        </section>
      </div>
    </div>
  );
}
