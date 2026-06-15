/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Settings, 
  Server, 
  ShoppingBag, 
  Gamepad2, 
  Users, 
  CreditCard, 
  LayoutDashboard, 
  Hammer, 
  Pencil, 
  Trash2, 
  Plus, 
  RotateCcw, 
  X, 
  Save,
  Search,
  CheckCircle,
  AlertTriangle,
  Upload,
  FileImage
} from 'lucide-react';
import { useProductStore } from '@/lib/productStore';
import { Product } from '@/lib/products';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('shop'); // Set woodshop management as default for instant feedback
  
  // Fully reactive state pattern to solve hydration and any visual latency
  const storeProducts = useProductStore((state) => state.products);
  const { addProduct, updateProduct, deleteProduct, resetToDefault } = useProductStore();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(storeProducts);
  }, [storeProducts]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);

  const [formFields, setFormFields] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    dimensions: '',
    material: '',
    stock: 5,
    category: 'Mob' as 'Gantungan Kunci' | 'Mob' | 'Item' | 'Flowers',
    cheapest: false
  });

  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info' | 'error'} | null>(null);
  const [productToDelete, setProductToDelete] = useState<{ id: number; name: string } | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Dynamic store brand & feature states
  const storeBrandName = useProductStore((state) => state.brandName);
  const storeBrandSubtitle = useProductStore((state) => state.brandSubtitle);
  const storeBrandLogo = useProductStore((state) => state.brandLogo);
  const storeBrandDesc = useProductStore((state) => state.brandDescription);
  const storeFeatures = useProductStore((state) => state.features);
  const { updateBrandName, updateBrandLogo, updateBrandDescription, updateFeatures } = useProductStore();

  const [inputBrandName, setInputBrandName] = useState(storeBrandName);
  const [inputBrandSubtitle, setInputBrandSubtitle] = useState(storeBrandSubtitle);
  const [inputBrandLogo, setInputBrandLogo] = useState(storeBrandLogo);
  const [inputBrandDesc, setInputBrandDesc] = useState(storeBrandDesc);
  const [inputFeatures, setInputFeatures] = useState(storeFeatures);

  useEffect(() => {
    setInputBrandName(storeBrandName);
  }, [storeBrandName]);

  useEffect(() => {
    setInputBrandSubtitle(storeBrandSubtitle);
  }, [storeBrandSubtitle]);

  useEffect(() => {
    setInputBrandLogo(storeBrandLogo);
  }, [storeBrandLogo]);

  useEffect(() => {
    setInputBrandDesc(storeBrandDesc);
  }, [storeBrandDesc]);

  useEffect(() => {
    setInputFeatures(storeFeatures);
  }, [storeFeatures]);

  const handleUpdateFeatureField = (id: number, key: 'title' | 'desc' | 'icon', val: string) => {
    setInputFeatures(prev => 
      prev.map(f => f.id === id ? { ...f, [key]: val } : f)
    );
  };

  const handleSaveBrandSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandName(inputBrandName, inputBrandSubtitle);
    updateBrandLogo(inputBrandLogo);
    updateBrandDescription(inputBrandDesc);
    updateFeatures(inputFeatures);
    showNotification('Pengaturan Brand dan Manfaat Utama berhasil disimpan!', 'success');
  };

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormFields({
      name: '',
      price: '',
      image: '',
      description: '',
      dimensions: '8cm x 8cm x 8cm',
      material: 'Kayu pinus, Cat akrilik, Pernis doff pelindung',
      stock: 5,
      category: 'Mob',
      cheapest: false
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingId(product.id);
    setFormFields({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description || '',
      dimensions: product.dimensions || '8cm x 8cm x 8cm',
      material: product.material || 'Kayu pinus, Cat akrilik',
      stock: product.stock !== undefined ? product.stock : 5,
      category: product.category,
      cheapest: product.cheapest || false
    });
    setIsFormOpen(true);
  };

  const handleDeleteTrigger = (id: number, name: string) => {
    setProductToDelete({ id, name });
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      showNotification(`Produk "${productToDelete.name}" telah dihapus!`, 'success');
      setProductToDelete(null);
    }
  };

  const handleResetDefaultsTrigger = () => {
    setIsResetConfirmOpen(true);
  };

  const handleConfirmReset = () => {
    resetToDefault();
    showNotification('Semua data produk telah di-reset ke bawaan pabrik!', 'info');
    setIsResetConfirmOpen(false);
  };

  // Drag and Drop File Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showNotification('Berkas harus berupa gambar!', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setFormFields(prev => ({ ...prev, image: e.target?.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name || !formFields.price) {
      showNotification('Nama produk dan harga wajib diisi!', 'error');
      return;
    }

    const priceNum = parseInt(formFields.price.replace(/[^\d]/g, ''), 10);
    if (isNaN(priceNum)) {
      showNotification('Harga harus berupa angka!', 'error');
      return;
    }

    // Auto generate clean slug
    const finalSlug = formFields.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars
      .trim()
      .replace(/\s+/g, '-'); // replace spaces with single hyphen

    // Fallback Image URL if empty
    const finalImage = formFields.image.trim() || `https://picsum.photos/seed/${encodeURIComponent(formFields.name)}/800/800`;

    const productPayload = {
      name: formFields.name,
      price: priceNum,
      slug: finalSlug,
      image: finalImage,
      description: formFields.description,
      dimensions: formFields.dimensions,
      material: formFields.material,
      stock: formFields.stock,
      category: formFields.category,
      cheapest: formFields.cheapest
    };

    if (editingId !== null) {
      updateProduct(editingId, productPayload);
      showNotification(`Produk "${formFields.name}" berhasil diperbarui!`, 'success');
    } else {
      // Generate unique ID based on max existing ID
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      addProduct({ id: newId, ...productPayload });
      showNotification(`Produk baru "${formFields.name}" berhasil ditambahkan!`, 'success');
    }

    setIsFormOpen(false);
  };

  // Filtered Products List
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'Semua' || product.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Calculate dynamic statistics
  const totalCatalogValue = products.reduce((acc, p) => acc + p.price, 0);
  const totalOutOfStock = products.filter(p => p.stock === 0).length;
  const totalLowStock = products.filter(p => p.stock > 0 && p.stock <= 2).length;

  return (
    <div className="flex min-h-screen bg-bg-primary text-text-primary font-sans relative">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div className={`minecraft-panel bg-bg-panel border-2 p-4 shadow-2xl flex items-center gap-3
            ${notification.type === 'error' ? 'border-red-500/70' : notification.type === 'info' ? 'border-amber-500/70' : 'border-brand-green/70'}`}>
            {notification.type === 'error' ? (
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            ) : notification.type === 'info' ? (
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            ) : (
              <CheckCircle className="w-5 h-5 text-brand-green shrink-0" />
            )}
            <span className="text-sm uppercase tracking-widest font-bold text-text-primary tracking-wide  font-mono">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-68 bg-bg-panel border-r border-stone-gray flex flex-col pt-8 shrink-0">
        <div className="px-6 mb-8 text-center text-text-primary font-sans tracking-widest text-xs uppercase tracking-wider  font-extrabold pb-3 border-b-2 border-stone-gray">
          ⚙️ VOXELWOOD ADMIN
        </div>
        <nav className="flex-1 flex flex-col gap-2 px-4">
          <button 
            onClick={() => setActiveTab('shop')} 
            className={`p-3 rounded-none text-left flex items-center gap-3 font-bold text-xs uppercase tracking-wider  tracking-wider transition-all border border-transparent cursor-pointer
              ${activeTab === 'shop' 
                ? 'bg-wood-dark/20 text-brand-green border-brand-green/30 font-extrabold' 
                : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'}`}
          >
            <Hammer className="w-4 h-4 text-brand-green" /> Kelola Produk
          </button>
          
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`p-3 rounded-none text-left flex items-center gap-3 font-bold text-xs uppercase tracking-wider  tracking-wider transition-all border border-transparent cursor-pointer
              ${activeTab === 'overview' 
                ? 'bg-wood-dark/20 text-brand-green border-brand-green/30 font-extrabold' 
                : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'}`}
          >
            <LayoutDashboard className="w-4 h-4 text-brand-green" /> Overview Statistik
          </button>

          <button 
            onClick={() => setActiveTab('brand')} 
            className={`p-3 rounded-none text-left flex items-center gap-3 font-bold text-xs uppercase tracking-wider  tracking-wider transition-all border border-transparent cursor-pointer
              ${activeTab === 'brand' 
                ? 'bg-wood-dark/20 text-brand-green border-brand-green/30 font-extrabold' 
                : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'}`}
          >
            <Settings className="w-4 h-4 text-brand-green" /> Pengaturan Brand
          </button>

          <button 
            className="p-3 rounded-none text-left flex items-center gap-3 font-bold text-xs uppercase tracking-wider  tracking-wider transition-all text-stone-600 cursor-not-allowed"
            disabled
          >
            <Server className="w-4 h-4 opacity-40" /> MC Hosting (Preview Only)
          </button>
          
          <button 
            className="p-3 rounded-none text-left flex items-center gap-3 font-bold text-xs uppercase tracking-wider  tracking-wider transition-all text-stone-600 cursor-not-allowed"
            disabled
          >
            <Gamepad2 className="w-4 h-4 opacity-40" /> Game Top-Up (Preview Only)
          </button>
        </nav>
        
        <div className="p-4 border-t border-stone-gray text-[10px] text-text-secondary font-mono tracking-wider">
          SYSTEM STATUS: <span className="text-brand-green font-bold">ONLINE</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto max-w-7xl">
        
        {/* TABS 1: SHOP MANAGEMENT (DYNAMIC ACTIVE PRODUCT EDITING) */}
        {activeTab === 'shop' && (
          <div className="animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-4 border-b border-stone-gray">
              <div>
                <span className="text-brand-green text-xs uppercase tracking-wider font-bold tracking-widest  font-mono block mb-1">DATA PRODUK</span>
                <h1 className="font-extrabold text-3xl text-text-primary  tracking-tight">Voxelwood Management</h1>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={handleResetDefaultsTrigger}
                  className="minecraft-btn-gold text-xs uppercase tracking-wider py-2.5 px-4 font-bold flex items-center gap-2  tracking-wider bg-amber-700/20 hover:brightness-110 !border-amber-700 text-amber-500 rounded-none cursor-pointer"
                  title="Kembalikan semua ke setelan pabrik"
                >
                  <RotateCcw className="w-4 h-4" /> Bawaan Pabrik
                </button>
                <button 
                  onClick={handleOpenAdd}
                  className="minecraft-btn text-xs uppercase tracking-wider py-2.5 px-5 font-bold flex items-center gap-2  tracking-wider bg-brand-green hover:brightness-110 text-text-primary rounded-none cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Tambah Produk
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="Cari nama produk, slug..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-bg-surface border border-stone-gray text-text-primary placeholder:text-stone-500 pl-10 pr-4 py-2 text-xs uppercase tracking-wider focus:border-brand-green focus:outline-none rounded-none"
                />
              </div>

              {/* Category selector */}
              <div>
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full bg-bg-surface border border-stone-gray text-text-primary px-4 py-2 text-xs uppercase tracking-wider focus:border-brand-green focus:outline-none rounded-none"
                >
                  <option value="Semua">Semua Kategori</option>
                  <option value="Mob">Mob</option>
                  <option value="Gantungan Kunci">Gantungan Kunci</option>
                  <option value="Item">Item</option>
                  <option value="Flowers">Flowers</option>
                </select>
              </div>

              {/* Status information */}
              <div className="text-right text-xs uppercase tracking-wider p-2 text-text-secondary font-mono flex items-center justify-end">
                Menampilkan {filteredProducts.length} dari {products.length} produk
              </div>
            </div>

            {/* List Table */}
            <div className="minecraft-panel p-6 bg-bg-panel border-stone-gray mb-10">
              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-text-secondary">
                  <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm uppercase tracking-widest font-bold  tracking-wide">Tidak Ada Produk Cocok</p>
                  <p className="text-xs uppercase tracking-wider">Coba ubah kata kunci pencairan atau filter kategori Anda.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm uppercase tracking-widest text-left align-middle">
                    <thead>
                      <tr className="text-left text-text-secondary border-b border-stone-gray text-xs uppercase tracking-wider  font-bold tracking-widest pb-3">
                        <th className="pb-3 w-16">Preview</th>
                        <th className="pb-3 pl-4">Rincian Produk</th>
                        <th className="pb-3">Kategori</th>
                        <th className="pb-3">Harga</th>
                        <th className="pb-3">Ketersediaan</th>
                        <th className="pb-3 text-right">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800/40">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="text-text-primary hover:hover:bg-bg-light transition-colors">
                          <td className="py-4">
                            <div className="relative w-12 h-12 bg-bg-panel border border-stone-gray overflow-hidden shrink-0">
                              <Image 
                                src={product.image || 'https://picsum.photos/seed/default/400/400'} 
                                alt={product.name} 
                                fill 
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </td>
                          <td className="py-4 pl-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm uppercase tracking-widest tracking-tight">{product.name}</span>
                              {product.cheapest && (
                                <span className="text-[9px] text-amber-500 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded-sm font-bold  font-mono">
                                  🌟 ekonomis
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-text-secondary font-mono block mt-1">slug: {product.slug}</span>
                          </td>
                          <td className="py-4 text-xs uppercase tracking-wider">
                            <span className="bg-bg-light px-2 py-0.5 text-text-secondary font-mono border border-stone-gray">
                              {product.category}
                            </span>
                          </td>
                          <td className="py-4 font-mono text-xs uppercase tracking-wider font-bold text-brand-green">
                            IDR {product.price.toLocaleString('id-ID')}
                          </td>
                          <td className="py-4 text-xs uppercase tracking-wider font-bold">
                            {product.stock === 0 ? (
                              <span className="px-2.5 py-1 text-[10px]  tracking-wider font-extrabold border bg-red-500/15 text-red-400 border-red-500/50">
                                HABIS
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 text-[10px]  tracking-wider font-extrabold border bg-brand-green/20 text-brand-green border-brand-green">
                                STOK: {product.stock}
                              </span>
                            )}
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleOpenEdit(product)}
                                className="p-2 border border-stone-gray hover:border-brand-green hover:text-brand-green text-text-secondary transition-colors cursor-pointer"
                                title="Edit Produk"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteTrigger(product.id, product.name)}
                                className="p-2 border border-stone-gray hover:border-red-500 hover:text-red-500 text-text-secondary transition-colors cursor-pointer"
                                title="Hapus Produk"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TABS 2: STATISTIK OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in text-left">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-gray">
              <div>
                <span className="text-brand-green text-xs uppercase tracking-wider font-bold tracking-widest  font-mono block mb-1">METRIKS</span>
                <h1 className="font-extrabold text-3xl text-text-primary  tracking-tight">Dashboard Overview</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="minecraft-panel p-6 bg-wood-dark/20 border-stone-gray text-left">
                <div className="text-text-secondary text-xs uppercase tracking-wider  font-extrabold tracking-wider mb-2">Total Katalog Produk</div>
                <div className="font-mono text-3xl text-text-primary font-bold">{products.length}</div>
              </div>
              <div className="minecraft-panel p-6 bg-brand-green/10 border-brand-green/30 text-left">
                <div className="text-text-secondary text-xs uppercase tracking-wider  font-extrabold tracking-wider mb-2">Nilai Kumulatif Katalog</div>
                <div className="font-mono text-xl text-brand-green font-bold">IDR {totalCatalogValue.toLocaleString('id-ID')}</div>
              </div>
              <div className="minecraft-panel p-6 bg-bg-panel border-red-500/20 text-left">
                <div className="text-text-secondary text-xs uppercase tracking-wider  font-extrabold tracking-wider mb-2">Produk Habis</div>
                <div className="font-mono text-3xl text-red-400 font-bold">{totalOutOfStock}</div>
              </div>
            </div>

            {/* Sales performance simulation logs */}
            <div className="minecraft-panel p-6">
              <h2 className="font-bold text-lg mb-4 pb-2 border-b-2 border-stone-gray  tracking-wider text-text-primary">Log Transaksi Terkini (Simulasi Toko)</h2>
              <table className="w-full text-sm uppercase tracking-widest">
                <thead>
                  <tr className="text-left text-text-secondary border-b border-stone-gray text-xs uppercase tracking-wider font-bold">
                    <th className="pb-2">Invoice ID</th>
                    <th className="pb-2">Platform</th>
                    <th className="pb-2">Nama Pelanggan</th>
                    <th className="pb-2">Total Belanja</th>
                    <th className="pb-2">Status Pembayaran</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/30 font-sans text-xs uppercase tracking-wider">
                  <tr className="text-text-primary">
                    <td className="py-3 font-mono">#TRX-V9012</td>
                    <td className="py-3"><span className="text-[10px]  font-bold border px-1 border-brand-green text-brand-green">E-Commerce</span></td>
                    <td className="py-3 font-bold">Alex Doe</td>
                    <td className="py-3 font-mono">IDR 150.000</td>
                    <td className="py-3"><span className="text-brand-green text-[10px] font-bold ">Lunas</span></td>
                  </tr>
                  <tr className="text-text-primary">
                    <td className="py-3 font-mono">#TRX-V9011</td>
                    <td className="py-3"><span className="text-[10px]  font-bold border px-1 border-brand-green text-brand-green">E-Commerce</span></td>
                    <td className="py-3 font-bold">Sarah Lee</td>
                    <td className="py-3 font-mono">IDR 350.000</td>
                    <td className="py-3"><span className="text-yellow-400 text-[10px] font-bold ">Diproses</span></td>
                  </tr>
                  <tr className="text-text-primary">
                    <td className="py-3 font-mono">#TRX-V9010</td>
                    <td className="py-3"><span className="text-[10px]  font-bold border px-1 border-brand-green text-brand-green">E-Commerce</span></td>
                    <td className="py-3 font-bold">Mike R.</td>
                    <td className="py-3 font-mono">IDR 45.000</td>
                    <td className="py-3"><span className="text-brand-green text-[10px] font-bold ">Lunas</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TABS 3: BRAND SETTINGS */}
        {activeTab === 'brand' && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-stone-gray gap-4">
              <div>
                <h2 className="text-2xl font-bold  tracking-tight text-text-primary font-mono">
                   PENGATURAN BRAND & MANFAAT UTAMA
                </h2>
                <p className="text-xs uppercase tracking-wider text-text-secondary mt-1">
                   Konfigurasi nama brand toko, deskripsi footer, dan 3 manfaat utama di halaman depan secara real-time.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveBrandSettings} className="space-y-8 max-w-4xl">
              {/* Sekilas Brand */}
              <div className="minecraft-panel p-6 bg-bg-panel border border-stone-gray space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold tracking-widest  text-brand-green border-b border-stone-gray pb-2 mb-4 font-mono">
                   1. Identitas Visual & Footer
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold  text-text-secondary mb-2 tracking-wider">
                       Nama Brand Toko (Baris Atas)
                    </label>
                    <input 
                      type="text"
                      required
                      value={inputBrandName}
                      onChange={(e) => setInputBrandName(e.target.value)}
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs uppercase tracking-wider focus:border-brand-green focus:outline-none rounded-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold  text-text-secondary mb-2 tracking-wider">
                       Subtitle Brand (Baris Bawah)
                    </label>
                    <input 
                      type="text"
                      value={inputBrandSubtitle}
                      onChange={(e) => setInputBrandSubtitle(e.target.value)}
                      placeholder="Contoh: STUDIO"
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs uppercase tracking-wider focus:border-brand-green focus:outline-none rounded-none font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold  text-text-secondary mb-2 tracking-wider">
                       Link Logo Brand (Auto-Circle)
                    </label>
                    <input 
                      type="text"
                      value={inputBrandLogo}
                      onChange={(e) => setInputBrandLogo(e.target.value)}
                      placeholder="URL Gambar"
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs uppercase tracking-wider focus:border-brand-green focus:outline-none rounded-none"
                    />
                    {inputBrandLogo && (
                      <div className="mt-4 flex items-center gap-4">
                        <span className="text-[10px] text-text-secondary  tracking-widest font-bold">Preview:</span>
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-green">
                          <img src={inputBrandLogo} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                     <label className="block text-[10px] font-bold  text-text-secondary mb-2 tracking-wider">
                        Deskripsi Singkat Toko (Footer)
                     </label>
                     <textarea 
                       rows={3}
                       required
                       value={inputBrandDesc}
                       onChange={(e) => setInputBrandDesc(e.target.value)}
                       className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs uppercase tracking-wider focus:border-brand-green focus:outline-none rounded-none leading-relaxed resize-none"
                     />
                  </div>
                </div>
              </div>

              {/* Manfaat Utama */}
              <div className="minecraft-panel p-6 bg-bg-panel border border-stone-gray space-y-6">
                 <h3 className="text-sm uppercase tracking-widest font-bold tracking-widest  text-brand-green border-b border-stone-gray pb-2 mb-4 font-mono">
                   2. Manfaat Utama (Keunggulan Toko)
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {inputFeatures.map((feat) => (
                     <div key={feat.id} className="space-y-4 p-4 border border-stone-gray bg-black/20">
                       <div className="flex items-center justify-between border-b border-stone-gray pb-2">
                         <span className="text-xs uppercase tracking-wider font-bold text-text-primary  tracking-wider font-mono">Poin #{feat.id}</span>
                       </div>
                       <div>
                         <label className="block text-[9px] font-bold  text-text-secondary mb-1">
                            Judul Manfaat
                         </label>
                         <input 
                           type="text"
                           required
                           value={feat.title}
                           onChange={(e) => handleUpdateFeatureField(feat.id, 'title', e.target.value)}
                           className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-xs uppercase tracking-wider focus:border-brand-green focus:outline-none rounded-none font-bold"
                         />
                       </div>

                       <div>
                         <label className="block text-[9px] font-bold  text-text-secondary mb-1">
                            Ikon Lucide
                         </label>
                         <input 
                           type="text"
                           required
                           value={feat.icon}
                           onChange={(e) => handleUpdateFeatureField(feat.id, 'icon', e.target.value)}
                           className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-xs uppercase tracking-wider focus:border-brand-green focus:outline-none rounded-none"
                         />
                       </div>

                       <div>
                         <label className="block text-[9px] font-bold  text-text-secondary mb-1">
                            Deskripsi Manfaat
                         </label>
                         <textarea 
                           rows={3}
                           required
                           value={feat.desc}
                           onChange={(e) => handleUpdateFeatureField(feat.id, 'desc', e.target.value)}
                           className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-xs uppercase tracking-wider focus:border-brand-green focus:outline-none rounded-none resize-none leading-relaxed text-left"
                         />
                       </div>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Save Controls */}
              <div className="flex justify-end gap-3">
                <button 
                  type="submit"
                  className="minecraft-btn text-xs uppercase tracking-wider font-bold py-3.5 px-8  tracking-widest flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Simpan Perubahan Brand
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* FORM DIALOG MODAL OVERLAY: ADD / EDIT PRODUCT */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="minecraft-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-bg-panel border-2 border-stone-gray p-6 text-left animate-zoom-in">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-stone-gray">
              <h2 className="text-xl font-bold  tracking-tight text-text-primary font-mono">
                {editingId !== null ? '✏️ Edit Produk Voxel' : '➕ Tambah Produk Voxel'}
              </h2>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="p-1 border border-stone-gray hover:border-red-500 hover:text-red-500 text-text-secondary transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-bold  text-text-secondary mb-1">Nama Produk</label>
                  <input 
                    type="text" 
                    required
                    value={formFields.name}
                    onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                    placeholder="Contoh: Pot Bunga Poppy Voxel"
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm uppercase tracking-widest focus:border-brand-green focus:outline-none rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold  text-text-secondary mb-1">Harga (IDR)</label>
                  <input 
                    type="text" 
                    required
                    value={formFields.price}
                    onChange={(e) => setFormFields({...formFields, price: e.target.value.replace(/[^\d]/g, '')})}
                    placeholder="Contoh: 150000"
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm uppercase tracking-widest focus:border-brand-green focus:outline-none rounded-none font-mono"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold  text-text-secondary mb-1">Kategori</label>
                  <select 
                    value={formFields.category}
                    onChange={(e) => setFormFields({...formFields, category: e.target.value as any})}
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm uppercase tracking-widest focus:border-brand-green focus:outline-none rounded-none"
                  >
                    <option value="Mob">Mob</option>
                    <option value="Gantungan Kunci">Gantungan Kunci</option>
                    <option value="Item">Item</option>
                    <option value="Flowers">Flowers</option>
                  </select>
                </div>

                {/* Stock Counter (Numeric Input) */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold  text-text-secondary mb-1">Jumlah Stok / Ketersediaan</label>
                  <input 
                    type="number" 
                    min="0"
                    required
                    value={formFields.stock}
                    onChange={(e) => setFormFields({...formFields, stock: Math.max(0, parseInt(e.target.value) || 0)})}
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm uppercase tracking-widest focus:border-brand-green focus:outline-none rounded-none font-mono"
                  />
                  <span className="text-[10px] text-text-secondary font-mono mt-1 block">
                    {formFields.stock === 0 ? "⚠️ Status: HABIS" : `Status: STOK AKTIF (${formFields.stock})`}
                  </span>
                </div>
              </div>

              {/* IMAGE DRAG-AND-DROP + CLICK ZONE (Custom upload system) */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold  text-text-secondary mb-1">Gambar Produk Preview</label>
                
                {/* Drag-and-drop zone container */}
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed p-6 text-center cursor-pointer relative transition-all duration-200 flex flex-col items-center justify-center min-h-[140px]
                    ${isDragging 
                      ? 'border-brand-green bg-brand-green/10 text-brand-green' 
                      : 'border-stone-700 bg-bg-panel/50 hover:border-brand-green/45 text-text-secondary hover:text-text-primary'}`}
                >
                  <input 
                    type="file" 
                    id="product-image-uploader"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden" 
                  />
                  
                  {/* Clicking triggers file input selection */}
                  <label htmlFor="product-image-uploader" className="absolute inset-0 cursor-pointer w-full h-full z-10" />

                  {formFields.image ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4 py-2 z-20">
                      <div className="relative w-16 h-16 border border-stone-700 overflow-hidden bg-bg-panel shrink-0">
                        <Image 
                          src={formFields.image} 
                          alt="Pratinjau Unggahan" 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-left">
                        <div className="text-xs uppercase tracking-wider font-bold text-brand-green flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Berhasil Diimpor
                        </div>
                        <p className="text-[10px] text-text-secondary font-mono max-w-[280px] truncate">{formFields.image}</p>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFormFields(prev => ({ ...prev, image: '' }));
                          }}
                          className="text-[10px] text-red-400 font-bold underline hover:text-red-300 mt-1 cursor-pointer z-30"
                        >
                          Hapus Gambar / Reset Ke Generator Otomatis
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 select-none pointer-events-none">
                      <Upload className="w-8 h-8 opacity-60 text-brand-green" />
                      <p className="text-xs uppercase tracking-wider font-bold text-text-primary  tracking-wider">Tarik &amp; Lepas gambar di sini</p>
                      <p className="text-[10px] text-text-secondary">atau klik area ini untuk memilih berkas gambar lokal</p>
                    </div>
                  )}
                </div>

                <div className="mt-2 text-left">
                  <label className="block text-[10px] font-bold  text-text-secondary mb-1">
                    Atau tempel Link URL Gambar Manual:
                  </label>
                  <input 
                    type="text" 
                    value={formFields.image}
                    onChange={(e) => setFormFields({...formFields, image: e.target.value})}
                    placeholder="https://picsum.photos/seed/.../800/800"
                    className="w-full bg-bg-panel border border-stone-700 text-text-primary p-2 text-xs uppercase tracking-wider focus:ring-1 focus:ring-brand-green focus:outline-none rounded-none text-xs uppercase tracking-wider font-mono"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold  text-text-secondary mb-1">Deskripsi Produk</label>
                <textarea 
                  value={formFields.description}
                  onChange={(e) => setFormFields({...formFields, description: e.target.value})}
                  rows={3}
                  placeholder="Ceritakan detail pengerjaan manual, jenis serat kayu, ketahanan pernis, dsb..."
                  className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm uppercase tracking-widest focus:border-brand-green focus:outline-none rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dimensions */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold  text-text-secondary mb-1">Dimensi (L x W x H)</label>
                  <input 
                    type="text" 
                    value={formFields.dimensions}
                    onChange={(e) => setFormFields({...formFields, dimensions: e.target.value})}
                    placeholder="Contoh: 12cm x 8cm x 4cm"
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm uppercase tracking-widest focus:border-brand-green focus:outline-none rounded-none font-mono"
                  />
                </div>

                {/* Materials */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold  text-text-secondary mb-1">Bahan Baku</label>
                  <input 
                    type="text" 
                    value={formFields.material}
                    onChange={(e) => setFormFields({...formFields, material: e.target.value})}
                    placeholder="Contoh: Kayu Pinus, Cat Akrilik"
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm uppercase tracking-widest focus:border-brand-green focus:outline-none rounded-none"
                  />
                </div>
              </div>

              {/* Boolean option toggle for cheapest */}
              <div className="flex items-center gap-3 py-2 border-y border-stone-gray">
                <input 
                  type="checkbox" 
                  id="cheapest"
                  checked={formFields.cheapest}
                  onChange={(e) => setFormFields({...formFields, cheapest: e.target.checked})}
                  className="w-4 h-4 text-brand-green border-stone-gray bg-bg-panel focus:ring-brand-green"
                />
                <label htmlFor="cheapest" className="text-xs uppercase tracking-wider font-bold  text-text-primary cursor-pointer select-none font-mono">
                  🌟 Seri Ekonomis (Ikut tampil di slideshow koleksi termurah beranda)
                </label>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-stone-gray font-mono">
                <button 
                  type="button" 
                  onClick={() => setIsFormOpen(false)}
                  className="minecraft-panel px-5 py-2.5 hover:bg-bg-surface text-text-secondary hover:text-text-primary text-xs uppercase tracking-wider  rounded-none border-t-0 cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="minecraft-btn font-bold px-6 py-2.5 text-xs uppercase tracking-wider  tracking-wider flex items-center gap-2 text-text-primary bg-brand-green rounded-none cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan Produk
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="minecraft-panel max-w-md w-full bg-bg-panel border-2 border-red-500/50 p-6 text-left animate-zoom-in">
            <div className="flex items-center gap-3 pb-3 mb-4 border-b border-stone-gray">
              <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
              <h2 className="text-lg font-bold  tracking-tight text-text-primary font-mono">
                Hapus Produk?
              </h2>
            </div>
            
            <p className="text-sm uppercase tracking-widest text-text-secondary mb-6 leading-relaxed">
              Apakah Anda yakin ingin menghapus produk <span className="text-text-primary font-bold">&ldquo;{productToDelete.name}&rdquo;</span>? Produk ini akan terhapus secara permanen dari katalog lokal Anda.
            </p>

            <div className="flex justify-end gap-3 font-mono">
              <button 
                type="button" 
                onClick={() => setProductToDelete(null)}
                className="minecraft-panel px-5 py-2.5 hover:bg-bg-surface text-text-secondary hover:text-text-primary text-xs uppercase tracking-wider  rounded-none border-t-0 cursor-pointer animate-none"
              >
                Batal
              </button>
              <button 
                type="button" 
                onClick={handleConfirmDelete}
                className="minecraft-btn font-bold px-6 py-2.5 text-xs uppercase tracking-wider  tracking-wider flex items-center gap-2 text-text-primary bg-red-600 border-red-700 hover:bg-red-500 rounded-none cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FACTORY RESET CONFIRMATION MODAL */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="minecraft-panel max-w-md w-full bg-bg-panel border-2 border-amber-500/50 p-6 text-left animate-zoom-in">
            <div className="flex items-center gap-3 pb-3 mb-4 border-b border-stone-gray">
              <RotateCcw className="w-6 h-6 text-amber-500 shrink-0" />
              <h2 className="text-lg font-bold  tracking-tight text-text-primary font-mono">
                Reset Setelan Pabrik?
              </h2>
            </div>
            
            <p className="text-sm uppercase tracking-widest text-text-secondary mb-6 leading-relaxed">
              Apakah Anda yakin ingin mengembalikan semua produk ke daftar bawaan pabrik? Tindakan ini akan menghapus semua produk kustom baru atau perubahan yang telah Anda buat secara permanen.
            </p>

            <div className="flex justify-end gap-3 font-mono">
              <button 
                type="button" 
                onClick={() => setIsResetConfirmOpen(false)}
                className="minecraft-panel px-5 py-2.5 hover:bg-bg-surface text-text-secondary hover:text-text-primary text-xs uppercase tracking-wider  rounded-none border-t-0 cursor-pointer animate-none"
              >
                Batal
              </button>
              <button 
                type="button" 
                onClick={handleConfirmReset}
                className="minecraft-btn font-bold px-6 py-2.5 text-xs uppercase tracking-wider  tracking-wider flex items-center gap-2 text-black bg-amber-500 border-amber-600 hover:bg-amber-400 rounded-none cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
