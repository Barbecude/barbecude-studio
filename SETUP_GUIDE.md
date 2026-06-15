# Setup Guide - Barbecude Studio

Panduan lengkap untuk setup dan konfigurasi platform e-commerce Barbecude Studio.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Gmail SMTP Setup](#gmail-smtp-setup)
3. [Google Maps API Setup](#google-maps-api-setup)
4. [Environment Variables](#environment-variables)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- **Node.js**: v20.x atau lebih tinggi
- **npm**: v9.x atau lebih tinggi (atau yarn/pnpm)
- **Git**: untuk clone repository
- **Browser**: Chrome, Firefox, Safari, atau Edge (modern browser)

### Akun yang Diperlukan
1. **Gmail Account**: Untuk SMTP email notifications
2. **Google Cloud Platform**: Untuk Google Maps API

## Gmail SMTP Setup

### Step 1: Enable 2-Factor Authentication
1. Buka [Google Account Security](https://myaccount.google.com/security)
2. Scroll ke "Signing in to Google"
3. Klik "2-Step Verification"
4. Follow setup wizard untuk enable 2FA

### Step 2: Generate App Password
1. Setelah 2FA aktif, kembali ke [Security Settings](https://myaccount.google.com/security)
2. Klik "2-Step Verification" lagi
3. Scroll ke bawah, cari "App passwords"
4. Klik "App passwords"
5. Select app: **Mail**
6. Select device: **Other (Custom name)**
7. Ketik nama: "Barbecude Studio"
8. Klik "Generate"
9. **COPY PASSWORD** yang muncul (16 karakter)
   - Format: `xxxx xxxx xxxx xxxx`
   - Simpan dengan aman, tidak akan ditampilkan lagi!

### Step 3: Test SMTP (Optional)
```bash
# Test email dengan Node.js REPL
node
```
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password-here'
  }
});

transporter.sendMail({
  from: 'your-email@gmail.com',
  to: 'chillydudee@gmail.com',
  subject: 'Test Email',
  text: 'Testing SMTP configuration'
}).then(info => {
  console.log('Email sent:', info.messageId);
}).catch(err => {
  console.error('Error:', err);
});
```

## Google Maps API Setup

### Step 1: Create Google Cloud Project
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Klik dropdown project di header (atau create new)
3. Klik "New Project"
4. Project name: **Barbecude Studio Maps**
5. Klik "Create"
6. Tunggu project selesai dibuat

### Step 2: Enable Required APIs
1. Di sidebar, klik "APIs & Services" → "Library"
2. Enable 3 APIs berikut:

#### a) Maps JavaScript API
- Search: "Maps JavaScript API"
- Klik "Maps JavaScript API"
- Klik "Enable"

#### b) Geocoding API
- Search: "Geocoding API"
- Klik "Geocoding API"
- Klik "Enable"

#### c) Places API (Optional, untuk autocomplete)
- Search: "Places API"
- Klik "Places API"
- Klik "Enable"

### Step 3: Create API Key
1. Di sidebar, klik "APIs & Services" → "Credentials"
2. Klik "+ CREATE CREDENTIALS"
3. Pilih "API key"
4. **COPY API KEY** yang muncul
5. Klik "Edit API key" untuk restrict (recommended)

### Step 4: Restrict API Key (Recommended)
1. **Application restrictions**:
   - Pilih "HTTP referrers (web sites)"
   - Add items:
     - `http://localhost:3000/*`
     - `https://yourdomain.com/*` (production domain)

2. **API restrictions**:
   - Pilih "Restrict key"
   - Select APIs:
     - ✅ Maps JavaScript API
     - ✅ Geocoding API
     - ✅ Places API

3. Klik "Save"

### Step 5: Test Maps API
```bash
# Test dengan browser
# Buka di browser: (ganti YOUR_API_KEY)
https://maps.googleapis.com/maps/api/geocode/json?address=Jakarta&key=YOUR_API_KEY
```

Expected response:
```json
{
  "results": [...],
  "status": "OK"
}
```

## Environment Variables

### Step 1: Create .env.local File
```bash
cp .env.example .env.local
```

### Step 2: Fill Environment Variables
Edit `.env.local`:
```env
# SMTP Configuration
SMTP_USER=your-actual-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # App password dari Gmail

# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...  # API key dari Google Cloud
```

### Important Notes:
- ⚠️ **NEVER commit .env.local to git**
- `.env.local` sudah ada di `.gitignore`
- `SMTP_PASS` adalah **App Password**, bukan password Gmail biasa
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` harus prefix `NEXT_PUBLIC_` agar bisa diakses client-side

## Testing

### Test 1: Development Server
```bash
npm run dev
```
Expected: Server running di `http://localhost:3000`

### Test 2: Checkout Flow
1. Buka `http://localhost:3000/shop`
2. Add produk ke cart
3. Go to cart: `http://localhost:3000/cart`
4. Klik "Gunakan Lokasi Saya" → Allow location permission
5. Verifikasi alamat auto-fill dari GPS
6. Isi detail alamat rumah
7. Isi nomor telepon & email
8. Klik "Selesaikan Checkout"

Expected Results:
- ✅ QRIS code muncul
- ✅ Order ID generated
- ✅ Email terkirim ke chillydudee@gmail.com
- ✅ Email terkirim ke customer (jika diisi)
- ✅ Redirect ke success page

### Test 3: Email Verification
1. Check inbox `chillydudee@gmail.com`
2. Verify email received dengan:
   - Order ID
   - Customer info
   - Address dengan GPS coordinates
   - Product list
   - QRIS attachment
   - Total pembayaran

### Test 4: Order Tracking
1. Copy Order ID dari success page
2. Go to `http://localhost:3000/tracking`
3. Paste Order ID
4. Klik "Cari"

Expected:
- ✅ Order details muncul
- ✅ Status timeline ditampilkan
- ✅ Customer info & address
- ✅ Product list
- ✅ QRIS code (jika ada)

### Test 5: Admin Dashboard
1. Buka `http://localhost:3000`
2. Ketik shortcut: `↑ d u d e b a r b e c u d e`
3. Atau langsung ke `/admin`

Expected:
- ✅ Tab "Kelola Pesanan" muncul
- ✅ List orders
- ✅ Update status dropdown
- ✅ Order details lengkap

### Test 6: Mobile Responsive
1. Buka dev tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Pilih mobile device (iPhone, Galaxy, etc)
4. Test hamburger menu

Expected:
- ✅ Hamburger icon muncul
- ✅ Menu dropdown berfungsi
- ✅ Navigation links bekerja
- ✅ Cart & checkout mobile-friendly

## Troubleshooting

### Issue 1: Email Tidak Terkirim
**Error**: `Invalid login` atau `Authentication failed`

**Solution**:
1. Verify 2FA aktif di Gmail
2. Generate ulang App Password
3. Copy-paste tanpa spasi
4. Check `SMTP_USER` format benar (email lengkap)
5. Restart dev server setelah update .env.local

**Debug**:
```bash
# Check console log di terminal
# Lihat error message detail
```

### Issue 2: Maps Tidak Load
**Error**: `Google Maps JavaScript API error: RefererNotAllowedMapError`

**Solution**:
1. Check API key restrictions
2. Tambahkan `http://localhost:3000/*` ke HTTP referrers
3. Wait 1-2 menit untuk propagation
4. Hard refresh browser (Ctrl+Shift+R)

**Error**: `This API project is not authorized`

**Solution**:
1. Verify APIs enabled:
   - Maps JavaScript API ✅
   - Geocoding API ✅
2. Check API key restrictions
3. Regenerate API key jika perlu

### Issue 3: Location Permission Denied
**Error**: `User denied geolocation`

**Solution**:
1. Browser settings → Site settings
2. Find `http://localhost:3000`
3. Permissions → Location → Allow
4. Refresh page

### Issue 4: QRIS Tidak Generate
**Error**: QR code tidak muncul di email

**Solution**:
1. Check `qrcode` package installed: `npm list qrcode`
2. Verify checkout API route running
3. Check browser console untuk errors
4. Test dengan minimal cart (1 item)

### Issue 5: Order Tidak Tersimpan
**Error**: Order hilang setelah refresh

**Cause**: Order disimpan di localStorage (Zustand persist)

**Solution**:
1. Check browser localStorage: Dev Tools → Application → Local Storage
2. Cari key: `voxelwood-products-store`
3. Verify `orders` array ada
4. Jangan clear browser data

**Alternative**: Implement backend database (future enhancement)

### Issue 6: Build Error
**Error**: Type errors atau import errors

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
npm run clean
rm -rf .next

# Rebuild
npm run build
```

### Issue 7: Port Already in Use
**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Option 1: Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 2: Use different port
npm run dev -- -p 3001
```

## Production Deployment

### Vercel Deployment
1. Push code to GitHub
2. Import project di [Vercel](https://vercel.com)
3. Add environment variables di Vercel dashboard:
   - `SMTP_USER`
   - `SMTP_PASS`
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
4. Deploy!

### Important: Update Maps API Restrictions
1. Go to Google Cloud Console
2. Edit API key restrictions
3. Add production domain ke HTTP referrers:
   - `https://yourdomain.vercel.app/*`
   - `https://yourdomain.com/*` (custom domain)

## Security Best Practices

### DO ✅
- Keep `.env.local` secret
- Use App Passwords untuk SMTP
- Restrict Maps API key
- Enable 2FA pada semua accounts
- Regular update dependencies: `npm update`

### DON'T ❌
- Commit `.env.local` atau API keys
- Share App Password
- Use unrestricted API keys
- Hardcode credentials di code
- Ignore security warnings

## Support

Jika masih ada issues:
1. Check console errors (browser & terminal)
2. Verify semua setup steps diikuti
3. Test di browser lain
4. Check [Next.js docs](https://nextjs.org/docs)
5. Check [Google Maps docs](https://developers.google.com/maps/documentation)

---

Happy coding! 🚀
