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
    "Edisi Kolektor Utama": "Koleksi Favorit",
    "Diukir presisi sepenuhnya dari satu balok kayu pinus padat premium tanpa sambungan. Dirancang minimalis sebagai pelindung elegan meja kerja kamu.": "Dibuat dari kayu pinus premium. Desain minimalis, cocok banget buat nemenin meja kerjamu.",
    "Harga Resmi": "Harga",
    "Beli Sekarang": "Bungkus Sekarang",
    "Lihat Semua Koleksi": "Cek Semua Barang",
    "Koleksi Termurah Kami": "Paling Ramah di Kantong",
    "Mahakarya Meja kamu": "Pajangan Keren Buat Mejamu",
    "Selengkapnya": "Cek Detail",
    "Pesan Sekarang": "Bungkus Sekarang",
    "Tambah ke Keranjang": "Masukin Keranjang",
    "Syarat & Ketentuan": "Aturan Main",
    "Piksel mini pelengkap perjalanan harian kamu.": "Aksesoris kece buat nemenin aktivitasmu.",
    "Mata berkilau misterius di atas lapisan kayu obsidian.": "Kesan estetik buat hiasan rak kamu.",
    "Penyimpanan serbaguna berlapis kain pelindung lembut.": "Simpan barang berhargamu di kotak aman ini.",
    "Eksplorasi Katalog Voxel": "Jelajah Katalog Seru",
    "Temukan kerajinan kayu premium yang diadaptasi dari blok ikonik kesayangan kamu.": "Temuin berbagai kerajinan kayu premium dari game favoritmu di sini.",
    "Semua Kategori": "Semua Item",
    "Urutkan:": "Biar Rapi:",
    "Termurah": "Paling Murah",
    "Termahal": "Paling Mahal",
    "Masukkan Keranjang": "Masukin Keranjang",
    "Ditambahkan": "Masuk Keranjang",
    "Habis": "Kosong",
    "Keranjang Belanja": "Keranjang Belanja",
    "Total Harga": "Total Habisnya",
    "Lanjut ke Pembayaran": "Gass Bayar",
    "Ringkasan Belanja": "Rincian Belanja",
    "Keranjang kamu kosong.": "Keranjangmu masih kosong nih.",
    "Mari temukan sesuatu yang luar biasa di katalog kami.": "Yuk cari barang-barang keren di toko kita.",
    "Eksplorasi Katalog": "Cari Barang",
    "Pusat Topup Kredit": "Topup Termurah",
    "Dukung perjalanan server kamu dengan kredit instan yang aman.": "Isi kreditmu di sini, aman dan instan pastinya.",
    "Infrastruktur Server": "Spesifikasi Server",
    "Hosting Berperforma Tinggi": "Hosting Super Ngebut",
    "Sewa node tangguh untuk komunitas kamu dengan uptime 99.9%.": "Sewa server kenceng buat mabar, dijamin lancar tanpa lag.",
    "Mari Temukan": "Yuk Cari",
    "Pusat Bantuan": "Bantuan",
    "Tentang Kami": "Siapa Kita",
    "Hubungi Kami": "Kontak",
    "Informasi": "Info",
    "Ekosistem": "Lainnya",
    "Pembayaran": "Cara Bayar",
    "Kebijakan Pengembalian": "Return Barang",
    "Produk": "Barang",
    "Dimensi": "Ukuran",
    "Pilih server dan masukkan username karakter kamu.": "Pilih server dan masukin username kamu.",
    "Pilih Nominal": "Pilih Jumlah",
    "Pilih Metode Pembayaran": "Bayar Pake Apa",
    "Ringkasan Pesanan": "Cek Pesanan Bro",
    "Beli Kredit": "Beli Sekarang",
    "Berhasil ditambahkan ke keranjang!": "Sukses masuk keranjang!",
    "Deskripsi Produk": "Deskripsi",
    "Bahan Baku": "Bahan",
    "Belanja Aman & Terjamin": "Aman & Nyaman Bro"
};

const files = walk('.');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    for (const [key, value] of Object.entries(replacements)) {
        // use regex globally, escaping special chars in key
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        content = content.replace(new RegExp(escapedKey, 'g'), value);
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Relaxed copy in ' + file);
    }
});
