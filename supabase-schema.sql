-- Jalankan script ini di SQL Editor Supabase kamu

-- 1. Buat tabel untuk konfigurasi toko (Single row table)
CREATE TABLE store_config (
  id integer PRIMARY KEY,
  config jsonb NOT NULL
);

-- 2. Buat tabel untuk pesanan (Orders)
CREATE TABLE orders (
  order_id text PRIMARY KEY,
  email text,
  phone text NOT NULL,
  address text,
  country text,
  province text,
  city text,
  postal_code text,
  detail_address text,
  latitude double precision,
  longitude double precision,
  cart jsonb NOT NULL,
  subtotal double precision NOT NULL,
  shipping double precision NOT NULL,
  total double precision NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  qris_code text,
  created_at bigint NOT NULL,
  updated_at bigint NOT NULL
);

-- 3. Masukkan data konfigurasi default bawaan pabrik agar aplikasi tidak error
INSERT INTO store_config (id, config) VALUES (
  1, 
  '{
    "brandName": "Voxelwood",
    "brandSubtitle": "Studio",
    "brandLogo": "",
    "brandDescription": "Handcrafted wooden masterpieces",
    "heroLabel": "TERBARU",
    "heroTitle": "Koleksi Minecraft Kayu",
    "heroDescription": "Bawa petualangan ke dunia nyata",
    "heroImage": "",
    "heroPrice": 150000,
    "heroDimensions": "10x10x10",
    "heroLinkSlug": "koleksi-minecraft",
    "preorderTitle": "Pre-order Diamond Sword",
    "preorderDescription": "Pesan sekarang untuk mendapatkan diskon khusus",
    "preorderLinkSlug": "po-diamond-sword",
    "preorderImage": "",
    "features": [
      { "id": 1, "title": "100% Handmade", "desc": "Dibuat dengan tangan dan hati-hati", "icon": "HandHeart" },
      { "id": 2, "title": "Lapisan Pelindung", "desc": "Pernis mengkilap tahan air", "icon": "ShieldCheck" },
      { "id": 3, "title": "Pengiriman Aman", "desc": "Packing kayu gratis", "icon": "Truck" }
    ],
    "products": []
  }'::jsonb
);
