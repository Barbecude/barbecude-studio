# Barbecude Studio - E-Commerce Platform

Platform e-commerce modern dengan Next.js 15, React 19, dan Tailwind CSS untuk menjual produk voxel/kerajinan kayu custom.

## ✨ Fitur Utama

### 🛒 Checkout System
- **QRIS Dinamis**: Generate QRIS code otomatis sesuai total pembayaran
- **Email Notifikasi**: Kirim detail pesanan ke admin & customer via Nodemailer
- **Invoice Tracking**: Order ID unik untuk setiap transaksi

### 📍 Location Integration
- **Google Maps Integration**: Pilih lokasi dengan map interaktif
- **Auto-Fill Address**: GPS location untuk auto-fill alamat
- **Complete Indonesia Data**: Dropdown lengkap provinsi, kota/kabupaten, dan kode pos seluruh Indonesia
- **Manual Detail**: Input manual untuk detail alamat rumah (jalan, RT/RW, dll)

### 📦 Order Tracking
- **Customer Tracking**: Halaman tracking pesanan dengan Order ID
- **Status Timeline**: Visual timeline status pesanan (Pending → Confirmed → Processing → Shipped → Delivered)
- **Real-time Updates**: Status pesanan update secara real-time

### 🎛️ Admin Dashboard
- **Order Management**: Tab khusus untuk kelola semua pesanan
- **Status Control**: Update status pesanan langsung dari dashboard
- **Order Details**: Lihat detail lengkap setiap pesanan (customer info, alamat, items, total)
- **Product Management**: Kelola katalog produk
- **Brand Settings**: Customize brand identity & hero section

### 📱 Mobile Responsive
- **Hamburger Menu**: Mobile navigation yang functional
- **Responsive Design**: Optimized untuk semua device sizes
- **Touch-Friendly**: Interface yang mudah digunakan di mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x atau lebih tinggi
- npm atau yarn
- Gmail account untuk SMTP
- Google Maps API key

### Installation

1. Clone repository
```bash
git clone <repository-url>
cd barbecude-studio
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` dan isi:
```env
# SMTP Configuration (Gmail)
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Generate dari Google App Passwords

# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

#### Cara Setup SMTP Gmail:
1. Buka Google Account Settings
2. Security → 2-Step Verification (harus aktif)
3. App Passwords → Generate new password
4. Pilih "Mail" dan "Other (Custom name)"
5. Copy password dan paste ke `SMTP_PASS`

#### Cara Setup Google Maps API:
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project atau pilih existing project
3. Enable APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API (optional)
4. Credentials → Create credentials → API Key
5. Copy API key dan paste ke `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

4. Run development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📋 Struktur Project

```
barbecude-studio/
├── app/
│   ├── api/
│   │   └── checkout/          # Checkout API dengan QRIS & email
│   ├── admin/                 # Admin dashboard
│   ├── cart/                  # Cart page dengan location picker
│   ├── tracking/              # Order tracking page
│   ├── shop/                  # Product catalog
│   └── ...
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Navigation dengan hamburger menu
│   │   └── Footer.tsx
│   └── ui/                    # Reusable UI components
├── lib/
│   ├── productStore.ts        # Zustand store untuk products & orders
│   ├── products.ts            # Product data
│   └── indonesiaData.ts       # Data provinsi, kota, kode pos Indonesia
└── ...
```

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19.2.1
- **Styling**: Tailwind CSS 4.1
- **State Management**: Zustand with persist
- **Email**: Nodemailer
- **QR Code**: qrcode library
- **Maps**: @react-google-maps/api
- **Icons**: Lucide React, Phosphor Icons
- **TypeScript**: Full type safety

## 📧 Email Configuration

Email dikirim ke **chillydudee@gmail.com** untuk setiap order baru dengan:
- Detail pesanan lengkap
- Informasi customer (email, phone)
- Alamat pengiriman dengan GPS coordinates (jika ada)
- List produk yang dipesan
- QRIS code attachment untuk pembayaran
- Total pembayaran

Customer juga menerima email konfirmasi jika mereka mengisi email di form checkout.

## 🗺️ Location Features

### Auto-Fill dari GPS:
1. User klik "Gunakan Lokasi Saya"
2. Browser request location permission
3. GPS coordinates → Google Geocoding API
4. Auto-fill: Negara, Provinsi, Kota, Kode Pos
5. User tinggal isi detail alamat rumah

### Manual Selection:
1. User klik di map untuk pilih lokasi
2. System auto-fill berdasarkan koordinat
3. Atau user bisa pilih manual dari dropdown

### Data Indonesia Lengkap:
- 38 Provinsi
- Ratusan Kota/Kabupaten per provinsi
- Kode pos per wilayah
- Dropdown yang user-friendly

## 🎨 Admin Dashboard

### Order Management Tab:
- List semua pesanan sorted by newest
- Update status dengan dropdown:
  - ⏳ Pending (Menunggu Konfirmasi)
  - ✅ Confirmed (Dikonfirmasi)
  - 📦 Processing (Sedang Diproses)
  - 🚚 Shipped (Dalam Pengiriman)
  - 🏠 Delivered (Telah Diterima)
  - ❌ Cancelled (Dibatalkan)
- Lihat detail customer & alamat pengiriman
- GPS coordinates (jika ada)
- List items yang dipesan
- Total pembayaran

### Product Management:
- Add/Edit/Delete products
- Upload gambar (drag & drop dengan kompresi otomatis)
- Set stock, price, category
- Auto-generate slug

### Image Quality:
- **Product Images**: Otomatis terkompresi ke 800x800px untuk performa
- **Hero Section Images**: Kualitas asli (no compression) untuk tampilan terbaik
- **Preorder Images**: Kualitas asli (no compression)

### Brand Settings:
- Customize brand name & logo
- Edit hero section
- Manage feature highlights

## 🔐 Admin Access

Admin dashboard dapat diakses dengan Easter egg keyboard shortcut:
Tekan secara berurutan: `↑ d u d e b a r b e c u d e`

Atau langsung ke `/admin`

## 📱 Mobile Navigation

Hamburger menu di mobile menampilkan:
- 🛍️ Toko
- 🖥️ Hosting (disabled)
- 🎮 Top-Up (disabled)
- 🔍 Lacak Pesanan

## 🔄 Order Flow

1. **Customer**: Add products to cart
2. **Customer**: Checkout dengan isi alamat (auto-fill dari GPS)
3. **System**: Generate QRIS code sesuai total
4. **System**: Kirim email ke admin & customer
5. **System**: Save order ke database (localStorage)
6. **Customer**: Scan QRIS untuk bayar
7. **Customer**: Track order dengan Order ID
8. **Admin**: Update status pesanan dari dashboard
9. **System**: Update status real-time
10. **Customer**: Cek status di tracking page

## 📊 Order Status Timeline

```
Pending → Confirmed → Processing → Shipped → Delivered
    ↓
Cancelled (jika dibatalkan)
```

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Midtrans, Xendit)
- [ ] WhatsApp notification
- [ ] Email notification untuk status updates
- [ ] Export orders to CSV/Excel
- [ ] Order analytics & reports
- [ ] Customer accounts & order history
- [ ] Multiple shipping options
- [ ] Discount codes & vouchers

## 📝 License

Private project untuk Barbecude Studio.

## 👨‍💻 Developer

Developed with ❤️ using Claude Code
