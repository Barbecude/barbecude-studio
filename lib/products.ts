export interface Product {
  id: number;
  name: string;
  price: number;
  slug: string;
  image: string; // Keep as primary/thumbnail for backward compatibility
  images?: string[]; // Array of up to 4 images for gallery
  // Cache busting comment
  description: string;
  dimensions: string;
  material: string;
  stock: number; // 0 means Out of Stock (Kosong)
  category: 'Gantungan Kunci' | 'Mob' | 'Item' | 'Flowers';
  cheapest: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Figur Iron Golem',
    price: 150000,
    slug: 'figur-iron-golem',
    image: 'https://picsum.photos/seed/craft1/800/800',
    description: 'Sebuah figur kayu kerajinan tangan yang dibuat dengan detail terinspirasi dari Iron Golem dunia Minecraft. Terbuat dari kayu pinus padat pilihan, dilukis manual dengan cat akrilik premium, dan dilapisi pelindung agar tahan lama. Dilengkapi dengan tangan artikulasi yang bisa diatur posisinya!',
    dimensions: '12cm x 8cm x 4cm',
    material: 'Kayu pinus, Cat akrilik, Pernis doff pelindung',
    stock: 4,
    category: 'Mob',
    cheapest: false
  },
  {
    id: 2,
    name: 'Gantungan Kunci Creeper',
    price: 45000,
    slug: 'gantungan-kunci-creeper',
    image: 'https://picsum.photos/seed/craft2/800/800',
    description: 'Gantungan kunci kayu berbentuk Creeper ikonik, dihaluskan dengan presisi dan dilapisi cat akrilik premium. Dilengkapi rantai gantungan metal anti karat berkualitas tinggi.',
    dimensions: '4cm x 4cm x 4cm',
    material: 'Kayu mahoni, Cat akrilik, Pernis satin pelindung',
    stock: 5,
    category: 'Gantungan Kunci',
    cheapest: true
  },
  {
    id: 3,
    name: 'Gantungan Kunci Wolf',
    price: 45000,
    slug: 'gantungan-kunci-wolf',
    image: 'https://picsum.photos/seed/wolfkey/800/800',
    description: 'Gantungan kunci kayu berbentuk Serigala menggemaskan. Buatan tangan dengan presisi tinggi and bahan terpilih berkualitas premium.',
    dimensions: '4.5cm x 3.5cm x 3.5cm',
    material: 'Kayu pinus, Cat akrilik, Pernis doff pelindung',
    stock: 3,
    category: 'Gantungan Kunci',
    cheapest: true
  },
  {
    id: 4,
    name: 'Gantungan Kunci Steve',
    price: 45000,
    slug: 'gantungan-kunci-steve',
    image: 'https://picsum.photos/seed/stevekey/800/800',
    description: 'Gantungan kunci Steve dengan pakaian biru ikonik. Dibuat langsung dari satu blok kayu kecil utuh dan dilukis dengan kuas mikro terbaik.',
    dimensions: '4.5cm x 3cm x 3cm',
    material: 'Kayu pinus, Cat akrilik, Pernis doff pelindung',
    stock: 2,
    category: 'Gantungan Kunci',
    cheapest: true
  },
  {
    id: 5,
    name: 'Gantungan Kunci Pig',
    price: 45000,
    slug: 'gantungan-kunci-pig',
    image: 'https://picsum.photos/seed/pigkey/800/800',
    description: 'Gantungan kunci babi pink imut dengan detail voxel pixelated yang menawan. Cocok sebagai pelengkap kunci kendaraan maupun tas gaming.',
    dimensions: '4cm x 4cm x 3.5cm',
    material: 'Kayu pinus, Cat akrilik, Pernis doff pelindung',
    stock: 5,
    category: 'Gantungan Kunci',
    cheapest: true
  },
  {
    id: 6,
    name: 'Stiker Voxel Anti Air',
    price: 15000,
    slug: 'stiker-voxel',
    image: 'https://picsum.photos/seed/sticker/800/800',
    description: 'Satu paket stiker vinil voxel eksklusif tahan air berkualitas tinggi dengan laminasi doff premium tahan UV. Sempurna untuk laptop Anda.',
    dimensions: '6cm x 6cm',
    material: 'Vinil tebal, Laminasi doff premium',
    stock: 1,
    category: 'Item',
    cheapest: true
  },
  {
    id: 7,
    name: 'Pajangan Rak Enderman',
    price: 120000,
    slug: 'pajangan-rak-enderman',
    image: 'https://picsum.photos/seed/craft4/800/800',
    description: 'Pajangan rak Enderman bertubuh ramping setinggi 15cm dengan mata ungu berkilauan. Dibuat menggunakan kayu jati pilihan berwarna obsidian gelap.',
    dimensions: '15cm x 4cm x 4cm',
    material: 'Kayu jati premium, Cat obsidian doff, Pernis doff',
    stock: 3,
    category: 'Mob',
    cheapest: false
  },
  {
    id: 8,
    name: 'Replika Pedang Berlian',
    price: 350000,
    slug: 'replika-pedang-berlian',
    image: 'https://picsum.photos/seed/craft3/800/800',
    description: 'Replika luar biasa pedang legendaris ukuran penuh (45cm) dari kayu ulin premium berdensitas tinggi yang sangat kuat.',
    dimensions: '45cm x 22cm x 3cm',
    material: 'Kayu ulin premium, Cat akrilik logam, Pelapis serat fiber',
    stock: 2,
    category: 'Item',
    cheapest: false
  },
  {
    id: 9,
    name: 'Kotak Penyimpanan Peti (S)',
    price: 200000,
    slug: 'kotak-peti-voxel',
    image: 'https://picsum.photos/seed/craft5/800/800',
    description: 'Kotak penyimpanan fungsional berbentuk Chest Minecraft ikonik. Dilengkapi engsel logam kokoh, penutup magnetis, dan beludru lembut.',
    dimensions: '10cm x 10cm x 10cm',
    material: 'Kayu pinus merah, Engsel kuningan, Velvet premium',
    stock: 4,
    category: 'Item',
    cheapest: false
  },
  {
    id: 10,
    name: 'Figur Serigala Jinak',
    price: 110000,
    slug: 'figur-serigala-jinak',
    image: 'https://picsum.photos/seed/craft6/800/800',
    description: 'Figur anjing/serigala jinak lengkap dengan kalung leher merah khas. Sudut kepala yang menggemaskan meningkatkan estetika setup meja Anda.',
    dimensions: '8cm x 7cm x 4cm',
    material: 'Kayu pinus, Cat akrilik, Pernis pelindung',
    stock: 5,
    category: 'Mob',
    cheapest: false
  },
  {
    id: 11,
    name: 'Pot Bunga Poppy Voxel',
    price: 35000,
    slug: 'pot-bunga-poppy',
    image: 'https://picsum.photos/seed/poppy/800/800',
    description: 'Dekorasi pot kecil berisi bunga Poppy merah khas Minecraft berbahan kayu pinus premium. Sempurna sebagai pemanis meja kerja.',
    dimensions: '8cm x 4cm x 4cm',
    material: 'Kayu pinus padat, Cat akrilik, Kawat fleksibel baja',
    stock: 3,
    category: 'Flowers',
    cheapest: true
  },
  {
    id: 12,
    name: 'Pajangan Wither Rose',
    price: 40000,
    slug: 'pajangan-wither-rose',
    image: 'https://picsum.photos/seed/witherrose/800/800',
    description: 'Bunga Wither Rose misterius beralaskan pot batu voxel hitam solid yang stylish. Menambah nuansa magis di setup meja personal Anda.',
    dimensions: '8cm x 4cm x 4cm',
    material: 'Kayu pinus hitam, Cat akrilik pekat, Lapisan satin',
    stock: 2,
    category: 'Flowers',
    cheapest: true
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
