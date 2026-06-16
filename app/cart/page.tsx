'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Trash2, ArrowLeft, MessageCircle, ChevronRight, X, QrCode } from 'lucide-react';
import { useCart, useProductStore } from '@/lib/productStore';
import { indonesiaData } from '@/lib/indonesiaData';
import QRCode from 'qrcode';
import { generateDynamicQRIS } from '@/lib/qris';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CartPage() {
  const cartItems = useCart();
  const { updateCartQty, removeFromCart, clearCart } = useProductStore();

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [qrisDataUrl, setQrisDataUrl] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = cartItems.length > 0 ? 25000 : 0;
  const total = subtotal + shipping;

  const handleQtyChange = (id: number, currentQty: number, change: number) => {
    const newQty = Math.max(1, currentQty + change);
    updateCartQty(id, newQty);
  };

  const handleCheckoutClick = async () => {
    if (!selectedProvince || !selectedCity || !detailAddress.trim()) {
      alert('Mohon lengkapi provinsi, kota, dan alamat pengiriman kamu');
      return;
    }
    
    try {
      const dynamicQrisString = generateDynamicQRIS(total);
      const dataUrl = await QRCode.toDataURL(dynamicQrisString, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      setQrisDataUrl(dataUrl);
      setShowQrisModal(true);
    } catch (err) {
      console.error("Failed to generate QRIS", err);
      alert('Gagal menampilkan QRIS');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (!selectedProvince || !selectedCity || !detailAddress.trim()) {
      alert('Mohon lengkapi provinsi, kota, dan alamat pengiriman kamu');
      return;
    }

    // Format pesan WhatsApp
    let message = 'Halo saya mau pesan:\n';

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.qty}x)\n`;
    });

    message += `\nTolong kirimkan ke alamat:\n${detailAddress}\n${selectedCity}, Provinsi ${selectedProvince}`;

    // Encode message untuk URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '6287822803787';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Clear cart dan redirect
    clearCart();
    window.open(whatsappURL, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center animate-fade-in">
        <div className="minecraft-panel p-8 bg-bg-panel border border-stone-gray flex flex-col items-center">
          <ShoppingCart className="w-16 h-16 text-text-secondary mb-6" />
          <h1 className="text-xl md:text-2xl font-bold tracking-wide text-text-primary mb-4 tracking-wider">
            Keranjang Kosong
          </h1>
          <p className="text-text-secondary text-sm tracking-widest mb-8 leading-relaxed max-w-sm">
            Keranjang belanja kamu kosong. Jelajahi katalog kami dan pilih produk terbaik!
          </p>
          <Link
            href="/shop"
            className="minecraft-btn w-full text-center py-3 bg-primary text-white hover:brightness-110 font-bold tracking-wider text-xs"
          >
            Lihat Semua Koleksi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-left animate-fade-in">
      <Link href="/shop" className="text-text-secondary hover:text-text-primary text-xs tracking-wider font-bold flex items-center gap-2 mb-8">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
      </Link>

      <h1 className="font-bold tracking-tight text-2xl md:text-3xl mb-8 flex items-center gap-3 text-text-primary">
        <ShoppingCart className="w-8 h-8 text-primary" /> Keranjang Belanja
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* List Items */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          <div className="minecraft-panel p-4 hidden md:grid grid-cols-12 gap-4 border-b-0 pb-2 text-text-secondary font-bold text-[10px] tracking-widest bg-bg-surface">
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
                  <h3 className="font-bold text-sm tracking-widest leading-tight text-text-primary">{item.name}</h3>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 text-xs tracking-wider hover:underline mt-1.5 flex items-center gap-1.5 cursor-pointer bg-transparent border-0 py-1 font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Hapus Item
                  </button>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 text-center hidden md:block text-text-secondary text-sm tracking-widest">
                Rp {item.price.toLocaleString('id-ID')}
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-center">
                <div className="flex items-center border border-stone-700 bg-bg-primary">
                  <button
                    onClick={() => handleQtyChange(item.id, item.qty, -1)}
                    className="px-3 py-1 hover:bg-bg-light font-bold cursor-pointer text-sm tracking-widest border-0 bg-transparent text-text-secondary"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-sm tracking-widest border-x border-stone-700 font-bold text-text-primary">{item.qty}</span>
                  <button
                    onClick={() => handleQtyChange(item.id, item.qty, 1)}
                    className="px-3 py-1 hover:bg-bg-light font-bold cursor-pointer text-sm tracking-widest border-0 bg-transparent text-text-secondary"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 text-right text-text-primary font-bold text-sm tracking-widest">
                Rp {(item.price * item.qty).toLocaleString('id-ID')}
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Summary */}
        <div className="w-full lg:w-1/3 sticky top-24">
          <div className="minecraft-panel p-6 bg-bg-panel border border-stone-gray">
            <h2 className="font-bold text-sm tracking-widest mb-6 pb-4 border-b-2 border-stone-gray text-text-primary">Ringkasan Pesanan</h2>

            <div className="space-y-4 text-xs tracking-wider mb-6 text-text-secondary">
              <div className="flex justify-between">
                <span>Subtotal Produk</span>
                <span className="text-text-primary">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimasi Ongkir</span>
                <span className="text-text-primary">Rp {shipping.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8 pt-4 border-t border-stone-gray text-sm tracking-widest font-bold text-text-primary">
              <span>Total Bayar</span>
              <span className="text-primary text-lg">Rp {total.toLocaleString('id-ID')}</span>
            </div>

            <div className="space-y-4 pt-4 border-t border-stone-gray text-left">
              <h3 className="text-xs tracking-wider font-bold tracking-widest text-text-primary mb-2">Alamat Pengiriman</h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-text-secondary mb-1">Provinsi *</label>
                  <Select value={selectedProvince} onValueChange={(val) => { setSelectedProvince(val || ''); setSelectedCity(''); }}>
                    <SelectTrigger className="w-full bg-bg-panel border-stone-gray text-text-primary text-xs rounded-none h-10">
                      <SelectValue placeholder="Pilih Provinsi" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {indonesiaData.data.map((prov) => (
                        <SelectItem key={prov.id} value={prov.provinsi}>{prov.provinsi}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-text-secondary mb-1">Kota/Kabupaten *</label>
                  <Select value={selectedCity} onValueChange={(val) => setSelectedCity(val || '')} disabled={!selectedProvince}>
                    <SelectTrigger className="w-full bg-bg-panel border-stone-gray text-text-primary text-xs rounded-none h-10">
                      <SelectValue placeholder={selectedProvince ? "Pilih Kota/Kabupaten" : "Pilih provinsi terlebih dahulu"} />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {selectedProvince && indonesiaData.data.find(p => p.provinsi === selectedProvince)?.kota_kabupaten.map((kota, idx) => (
                        <SelectItem key={idx} value={kota}>{kota}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-text-secondary mb-1">Detail Alamat Lengkap *</label>
                  <textarea
                    required
                    rows={3}
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    placeholder="Kecamatan, Jl. Merdeka No. 45, RT/RW, Kode Pos"
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none resize-none leading-relaxed"
                  />
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                disabled={!selectedProvince || !selectedCity || !detailAddress.trim()}
                className="minecraft-btn w-full text-xs tracking-wider font-bold py-3.5 bg-primary hover:brightness-110 text-text-primary border-0 cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
               
                Checkout & Bayar
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-text-secondary text-center leading-relaxed">
                Kamu akan melakukan pembayaran via QRIS sebelum diarahkan ke WhatsApp
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link href="/shop" className="text-xs tracking-wider text-text-secondary hover:text-text-primary underline">
                Lanjutkan Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* QRIS Modal */}
      {showQrisModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-bg-panel border border-stone-gray max-w-sm w-full p-6 relative flex flex-col items-center text-center shadow-2xl">
            <button 
              onClick={() => setShowQrisModal(false)}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
              <QrCode className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-bold tracking-widest text-text-primary mb-2">
              Pembayaran QRIS
            </h2>
            <p className="text-text-secondary text-xs tracking-wider mb-6 leading-relaxed">
              Silakan scan QR code di bawah ini menggunakan aplikasi M-Banking atau E-Wallet kamu.
            </p>

            <div className="bg-white p-2 rounded-xl mb-6 relative group overflow-hidden">
              {qrisDataUrl ? (
                <Image src={qrisDataUrl} alt="QRIS Payment" width={250} height={250} className="rounded-lg mix-blend-multiply" unoptimized />
              ) : (
                <div className="w-[250px] h-[250px] bg-stone-100 animate-pulse rounded-lg" />
              )}
            </div>

            <div className="w-full bg-bg-surface p-4 border border-stone-gray mb-6">
              <p className="text-[10px] text-text-secondary tracking-widest uppercase mb-1">Total Tagihan</p>
              <p className="text-2xl font-bold text-primary">Rp {total.toLocaleString('id-ID')}</p>
            </div>

            <button
              onClick={() => {
                setShowQrisModal(false);
                handleWhatsAppCheckout();
              }}
              className="minecraft-btn w-full text-xs tracking-wider font-bold py-3.5 bg-[#25D366] hover:brightness-110 text-white border-0 cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              Saya Sudah Bayar
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
