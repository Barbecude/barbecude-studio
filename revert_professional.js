const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file === 'node_modules' || file === '.next' || file === 'dist') return;
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(filePath));
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
            results.push(filePath);
        }
    });
    return results;
}

const replacements = {
    "Koleksi Favorit": "Edisi Kolektor Utama",
    "Dibuat dari kayu pinus premium. Desain minimalis, cocok banget buat nemenin meja kerjamu.": "Diukir presisi sepenuhnya dari satu balok kayu pinus padat premium tanpa sambungan. Dirancang minimalis sebagai pelindung elegan meja kerja Anda.",
    "Bungkus Sekarang": "Pesan via WhatsApp",
    "Cek Semua Barang": "Lihat Semua Koleksi",
    "Paling Ramah di Kantong": "Koleksi Termurah Kami",
    "Pajangan Keren Buat Mejamu": "Mahakarya Meja Anda",
    "Cek Detail": "Selengkapnya",
    "Masukin Keranjang": "Tambah ke Keranjang",
    "Aturan Main": "Syarat & Ketentuan",
    "Aksesoris kece buat nemenin aktivitasmu.": "Piksel mini pelengkap perjalanan harian Anda.",
    "Kesan estetik buat hiasan rak kamu.": "Mata berkilau misterius di atas lapisan kayu obsidian.",
    "Simpan barang berhargamu di kotak aman ini.": "Penyimpanan serbaguna berlapis kain pelindung lembut.",
    "Jelajah Katalog Seru": "Eksplorasi Katalog Voxel",
    "Temuin berbagai kerajinan kayu premium dari game favoritmu di sini.": "Temukan kerajinan kayu premium yang diadaptasi dari blok ikonik kesayangan Anda.",
    "Semua Item": "Semua Kategori",
    "Biar Rapi:": "Urutkan:",
    "Paling Murah": "Termurah",
    "Paling Mahal": "Termahal",
    "Kosong": "Habis",
    "Keranjang Belanja": "Manajemen Keranjang",
    "Total Habisnya": "Estimasi Total",
    "Gass Bayar": "Selesaikan Checkout",
    "Rincian Belanja": "Ringkasan Eksekusi",
    "Keranjangmu masih kosong nih.": "Inventori Anda saat ini kosong. Navigasikan ke katalog produk untuk menambahkan item.",
    "Yuk cari barang-barang keren di toko kita.": "Eksplorasi katalog kami untuk menemukan mahakarya kayu presisi untuk ruang kerja Anda.",
    "Cari Barang": "Eksplorasi Katalog",
    "Topup Termurah": "Portal Topup Kredit",
    "Isi kreditmu di sini, aman dan instan pastinya.": "Tingkatkan pengalaman server Anda dengan kredit instan dan aman melalui protokol kami.",
    "Spesifikasi Server": "Infrastruktur Node Server",
    "Hosting Super Ngebut": "Sistem Hosting Performa Gahar",
    "Sewa server kenceng buat mabar, dijamin lancar tanpa lag.": "Alokasikan komputasi privat node server dedicated untuk komunitas Anda. Uptime 99.9%.",
    "Yuk Cari": "Mulai Eksplorasi",
    "Bantuan": "Pusat Bantuan",
    "Siapa Kita": "Tentang Entitas",
    "Kontak": "Hubungi Kami",
    "Info": "Informasi Sistem",
    "Lainnya": "Eksekutif Ekosistem",
    "Cara Bayar": "Protokol Pembayaran",
    "Return Barang": "Kebijakan Pengembalian Entitas",
    "Barang": "Katalog Produk",
    "Pilih server dan masukin username kamu.": "Otentikasi server target dan identifikasi karaktar unik Anda.",
    "Pilih Jumlah": "Pilihan Denominasi",
    "Bayar Pake Apa": "Pilih Gerbang Pembayaran",
    "Cek Pesanan Bro": "Ringkasan Transaksi",
    "Sikat": "Akuisisi",
    "Keranjang Kosong": "Inventaris Kosong",
    "ORDER SUKSES!": "TRANSAKSI TEROTORISASI",
    "SABAR YA BRO...": "MEMPROSES OTORISASI...",
    "Hosting lagi off brow": "Layanan node dinonaktifkan sementara untuk pemeliharaan",
    "Top-up lagi off brow": "Gerbang topup sedang dalam kondisi bypass pemeliharaan",
    "Pajangan Original": "Koleksi Presisi Tangan",
    "Bikin mejamu makin keren pake pajangan kayu ala Minecraft ini. Detailnya cakep dan dibuat langsung pake tangan lho!": "Konversi estetika piksel ke realita material solid. Hasil karya pahat premium yang terinspirasi oleh lanskap digital kesukaan Anda.",
    "Aman & Nyaman Bro": "Protokol Transaksi Aman"
};

const uppercaseClasses = [
    { match: /text-xs/g, replace: 'text-xs uppercase tracking-wider' },
    { match: /text-sm/g, replace: 'text-sm uppercase tracking-widest' },
    { match: /tracking-tight\s*text-3xl/g, replace: 'tracking-tight uppercase text-3xl' },
    { match: /tracking-tight\s*text-4xl/g, replace: 'tracking-tight uppercase text-4xl' },
    { match: /font-bold[^"]*text-text-primary[^"]*mb-2/g, replace: '$& uppercase tracking-wider' }, // headers
    { match: /font-bold[^"]*text-text-primary[^"]*mb-4/g, replace: '$& uppercase tracking-wider' }, // headers
]

const files = walk('.');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Reverse copy
    for (const [key, value] of Object.entries(replacements)) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        content = content.replace(new RegExp(escapedKey, 'g'), value);
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Restored copy in ' + file);
    }
});
