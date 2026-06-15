'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Trash2, ArrowLeft, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import { useCart, useProductStore } from '@/lib/productStore';

import { CustomSelect } from './CustomSelect';

const PROVINCES = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan", "Bengkulu", "Lampung", "Kepulauan Bangka Belitung", "Kepulauan Riau",
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat",
  "Maluku", "Maluku Utara", "Papua Barat", "Papua", "Papua Selatan", "Papua Tengah", "Papua Pegunungan", "Papua Barat Daya"
];

const BANDUNG_CITIES = [
  "Kota Bandung", "Kabupaten Bandung", "Kabupaten Bandung Barat"
];

export default function CartPage() {
  const cartItems = useCart();
  const { updateCartQty, removeFromCart, clearCart } = useProductStore();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successOrder, setSuccessOrder] = useState<{ orderId: string, email: string } | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = cartItems.length > 0 ? 25000 : 0;
  const total = subtotal + shipping;

  const handleQtyChange = (id: number, currentQty: number, change: number) => {
    const newQty = Math.max(1, currentQty + change);
    updateCartQty(id, newQty);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!phone.trim() || !address.trim() || !province || !city) {
      setErrorMessage('Harap isi nomor telepon, provinsi, kota, dan alamat pengiriman lengkap Anda.');
      return;
    }

    setIsCheckingOut(true);

    const fullAddress = `${address}, ${city}, ${province}`;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          phone,
          address: fullAddress,
          cart: cartItems,
          subtotal,
          shipping,
          total
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessOrder({ orderId: data.orderId, email });
        clearCart();
        setEmail('');
        setAddress('');
      } else {
        setErrorMessage(data.error || 'Terjadi kesalahan saat memproses checkout.');
      }
    } catch (err) {
      setErrorMessage('Gagal menghubungi server. Periksa koneksi internet Anda.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (successOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center font-sans animate-fade-in">
        <div className="minecraft-panel p-8 bg-bg-panel border border-brand-green/45 flex flex-col items-center">
          <CheckCircle2 className="w-16 h-16 text-brand-green mb-6 animate-pulse" />
          <h1 className="text-2xl md:text-3xl font-bold  text-text-primary tracking-widest mb-2 uppercase tracking-wider font-mono">
            KIRIM BERHASIL!
          </h1>
          <p className="text-xs uppercase tracking-wider text-brand-green font-bold tracking-widest  mb-6 font-mono">
            Invoice: {successOrder.orderId}
          </p>
          <div className="text-text-secondary text-sm uppercase tracking-widest space-y-4 mb-8 max-w-sm text-center leading-relaxed">
            <p>
              Detail pesanan lengkap Anda telah dikirimkan secara otomatis ke alamat kami di <strong className="text-text-primary underline">chillydudee@gmail.com</strong> dan tim produksi voxel kami akan segera memulai pengerjaan kayu kustom Anda.
            </p>
            <p>
              Kami juga telah mengirimkan salinan tanda terima transaksi ke email <strong>{successOrder.email}</strong> sebagai konfirmasi pesanan resmi.
            </p>
          </div>
          <Link 
            href="/shop" 
            className="minecraft-btn w-full text-center py-3 bg-brand-green text-white hover:brightness-110  font-bold tracking-wider text-xs uppercase tracking-wider"
          >
             Belanja Koleksi Lain
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center font-sans animate-fade-in">
        <div className="minecraft-panel p-8 bg-bg-panel border border-stone-gray flex flex-col items-center">
          <ShoppingCart className="w-16 h-16 text-text-secondary mb-6" />
          <h1 className="text-xl md:text-2xl font-bold  tracking-wide text-text-primary mb-4 uppercase tracking-wider">
             Inventaris Habis
          </h1>
          <p className="text-text-secondary text-sm uppercase tracking-widest mb-8 leading-relaxed max-w-sm">
             Keranjang belanja Anda kosong saat ini. Jelajahi katalog voxel kerajinan tangan terbaik kami dan pilih koleksi baru untuk meja kerja Anda!
          </p>
          <Link 
            href="/shop" 
            className="minecraft-btn w-full text-center py-3 bg-brand-green text-white hover:brightness-110  font-bold tracking-wider text-xs uppercase tracking-wider"
          >
             Lihat Semua Koleksi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-left font-sans animate-fade-in">
      <Link href="/shop" className="text-text-secondary hover:text-text-primary text-xs uppercase tracking-wider font-bold flex items-center gap-2 mb-8">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
      </Link>

      <h1 className="font-bold tracking-tight  text-2xl md:text-3xl mb-8 flex items-center gap-3 text-text-primary">
        <ShoppingCart className="w-8 h-8 text-brand-green" /> Manajemen Keranjang Anda
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
         {/* List Items */}
         <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <div className="minecraft-panel p-4 hidden md:grid grid-cols-12 gap-4 border-b-0 pb-2 text-text-secondary font-bold text-[10px] tracking-widest bg-bg-surface ">
               <div className="col-span-6">Nama Koleksi</div>
               <div className="col-span-2 text-center">Harga</div>
               <div className="col-span-2 text-center">Jumlah</div>
               <div className="col-span-2 text-right">Subtotal</div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="minecraft-panel p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-bg-panel/50">
                 <div className="col-span-1 md:col-span-6 flex items-center gap-4 text-left">
                    <div className="relative w-16 h-16 border border-stone-gray shrink-0 aspect-square">
                      <Image src={item.image} alt={item.name} fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                       <h3 className="font-bold text-sm uppercase tracking-widest leading-tight text-text-primary">{item.name}</h3>
                       <button 
                         onClick={() => removeFromCart(item.id)}
                         className="text-red-400 text-xs uppercase tracking-wider hover:underline mt-1.5 flex items-center gap-1.5 cursor-pointer bg-transparent border-0 py-1 font-bold"
                       >
                         <Trash2 className="w-3.5 h-3.5" /> Hapus Item
                       </button>
                    </div>
                 </div>
                 
                 <div className="col-span-1 md:col-span-2 text-center hidden md:block text-text-secondary text-sm uppercase tracking-widest font-mono">
                    IDR {item.price.toLocaleString('id-ID')}
                 </div>
                 
                 <div className="col-span-1 md:col-span-2 flex justify-center">
                    <div className="flex items-center border border-stone-700 bg-bg-primary">
                       <button 
                         onClick={() => handleQtyChange(item.id, item.qty, -1)}
                         className="px-3 py-1 hover:bg-bg-light font-bold cursor-pointer text-sm uppercase tracking-widest font-mono border-0 bg-transparent text-text-secondary"
                       >
                         -
                       </button>
                       <span className="px-3 py-1 text-sm uppercase tracking-widest font-mono border-x border-stone-700 font-bold text-text-primary">{item.qty}</span>
                       <button 
                         onClick={() => handleQtyChange(item.id, item.qty, 1)}
                         className="px-3 py-1 hover:bg-bg-light font-bold cursor-pointer text-sm uppercase tracking-widest font-mono border-0 bg-transparent text-text-secondary"
                       >
                         +
                       </button>
                    </div>
                 </div>

                 <div className="col-span-1 md:col-span-2 text-right font-mono text-text-primary font-bold text-sm uppercase tracking-widest">
                    IDR {(item.price * item.qty).toLocaleString('id-ID')}
                 </div>
              </div>
            ))}
         </div>

         {/* Receipt Summary with Checkout Form */}
         <div className="w-full lg:w-1/3 sticky top-24">
            <div className="minecraft-panel p-6 bg-bg-panel border border-stone-gray">
               <h2 className="font-bold text-sm uppercase tracking-widest tracking-widest  mb-6 pb-4 border-b-2 border-stone-gray text-text-primary">Ringkasan Pesanan</h2>
               
               <div className="space-y-4 text-xs uppercase tracking-wider mb-6 font-mono text-text-secondary">
                  <div className="flex justify-between">
                     <span>Subtotal Produk</span>
                     <span className="text-text-primary">IDR {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Estimasi Ongkir</span>
                     <span className="text-text-primary">IDR {shipping.toLocaleString('id-ID')}</span>
                  </div>
               </div>

               <div className="flex justify-between items-center mb-8 pt-4 border-t border-stone-gray text-sm uppercase tracking-widest font-bold  text-text-primary font-mono">
                  <span>Total Bayar</span>
                  <span className="text-brand-green text-lg">IDR {total.toLocaleString('id-ID')}</span>
               </div>

               {/* Real Checkout Form for Email and address */}
               <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-4 border-t border-stone-gray text-left">
                  <h3 className="text-xs uppercase tracking-wider font-bold tracking-widest  text-text-primary mb-2 uppercase tracking-wider">Informasi Sistemrmasi Pembeli</h3>
                  
                  {errorMessage && (
                    <div className="bg-red-950/40 border border-red-500 text-red-400 p-3 text-xs uppercase tracking-wider flex gap-2 rounded-none animate-shake">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                     <label className="block text-[10px] font-bold  text-text-secondary mb-1">Email Anda (Opsional)</label>
                     <input 
                       type="email" 
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Contoh: user@email.com"
                       className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-xs uppercase tracking-wider focus:border-brand-green focus:outline-none rounded-none"
                     />
                  </div>
                  <div>
                     <label className="block text-[10px] font-bold  text-text-secondary mb-1">No. Telp / WhatsApp</label>
                     <input 
                       type="tel"
                       required
                       value={phone}
                       onChange={(e) => setPhone(e.target.value)}
                       placeholder="Contoh: 08123456789"
                       className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-xs uppercase tracking-wider focus:border-brand-green focus:outline-none rounded-none"
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                     <div>
                       <label className="block text-[10px] font-bold  text-text-secondary mb-1">Provinsi</label>
                       <CustomSelect 
                         options={PROVINCES}
                         value={province}
                         onChange={(val) => {
                            setProvince(val);
                            if (val !== 'Jawa Barat') setCity(''); // Reset city if province changes
                         }}
                         placeholder="Pilih Provinsi"
                         required
                       />
                     </div>
                     <div>
                       <label className="block text-[10px] font-bold  text-text-secondary mb-1">Kota / Kab</label>
                       {province === 'Jawa Barat' ? (
                         <CustomSelect 
                           options={BANDUNG_CITIES}
                           value={city}
                           onChange={(val) => setCity(val)}
                           placeholder="Pilih Kota/Kab"
                           required
                         />
                       ) : (
                         <input 
                           required
                           value={city}
                           onChange={(e) => setCity(e.target.value)}
                           placeholder="Ketik Kota/Kab"
                           className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs uppercase tracking-wider focus:border-brand-green focus:outline-none rounded-none"
                         />
                       )}
                     </div>
                  </div>

                  <div>
                     <label className="block text-[10px] font-bold  text-text-secondary mb-1">Detail Alamat Rumah</label>
                     <textarea 
                       required
                       rows={2}
                       value={address}
                       onChange={(e) => setAddress(e.target.value)}
                       placeholder="Contoh: Jl. Merdeka No. 45, RT 01/RW 02"
                       className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-xs uppercase tracking-wider focus:border-brand-green focus:outline-none rounded-none resize-none leading-relaxed"
                     />
                  </div>

                  <button 
                    type="submit"
                    disabled={isCheckingOut}
                    className="minecraft-btn w-full text-xs uppercase tracking-wider font-bold py-3.5 bg-brand-green hover:brightness-110 text-text-primary border-0 cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                     {isCheckingOut ? (
                       <span className="animate-pulse">MEMPROSES DETAIL...</span>
                     ) : (
                       <>
                         SELESAIKAN CHECKOUT <ChevronRight className="w-4 h-4" />
                       </>
                     )}
                  </button>
               </form>

               <div className="mt-4 text-center">
                  <Link href="/shop" className="text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary underline">
                    Lanjutkan Belanja
                  </Link>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
