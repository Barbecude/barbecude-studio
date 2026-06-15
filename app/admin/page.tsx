/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Gear as Settings,
  HardDrives as Server,
  Tote as ShoppingBag,
  GameController as Gamepad2,
  Users,
  CreditCard,
  SquaresFour as LayoutDashboard,
  Hammer,
  PencilSimple as Pencil,
  Trash as Trash2,
  Plus,
  ArrowCounterClockwise as RotateCcw,
  X,
  FloppyDisk as Save,
  MagnifyingGlass as Search,
  CheckCircle,
  Warning as AlertTriangle,
  Upload,
  Image as FileImage
} from '@phosphor-icons/react';
import * as PhosphorIcons from '@phosphor-icons/react';

import { availableIcons } from '@/lib/phosphorIconsList';

const DynamicIcon = ({ iconName, ...props }: { iconName: string;[key: string]: any }) => {
  const [IconComp, setIconComp] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    import('@phosphor-icons/react').then((mod) => {
      if (isMounted) {
        setIconComp(() => mod[iconName as keyof typeof mod]);
      }
    });
    return () => { isMounted = false; };
  }, [iconName]);

  if (!IconComp) return <div className="w-6 h-6 bg-stone-gray/20 animate-pulse rounded-md" />;
  return <IconComp {...props} />;
};

import { useProductStore, useOrders, Order, OrderStatus } from '@/lib/productStore';
import { Product } from '@/lib/products';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders'); // Set orders as default

  // Fully reactive state pattern to solve hydration and any visual latency
  const storeProducts = useProductStore((state) => state.products);
  const storeOrders = useOrders();
  const { addProduct, updateProduct, deleteProduct, resetToDefault, updateOrderStatus, fetchOrders, fetchStoreConfig, saveStoreConfig } = useProductStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setProducts(storeProducts);
  }, [storeProducts]);

  useEffect(() => {
    setOrders(storeOrders);
  }, [storeOrders]);

  useEffect(() => {
    fetchStoreConfig();
    fetchOrders();
  }, [fetchStoreConfig, fetchOrders]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingHero, setIsDraggingHero] = useState(false);

  const [formFields, setFormFields] = useState({
    name: '',
    price: '',
    image: '',
    description: 'Dibuat dari blok kayu yang dicat akrilik, ditempel satu per satu dengan kuat, lalu difinishing pernis mengkilap.',
    dimensions: '',
    material: '',
    stock: 1,
    category: 'Gantungan Kunci' as 'Gantungan Kunci' | 'Pajangan Meja' | 'Hiasan Dinding',
    cheapest: false,
    shopee_link: ''
  });

  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'info' | 'error' } | null>(null);
  const [productToDelete, setProductToDelete] = useState<{ id: number; name: string } | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [iconPickerOpen, setIconPickerOpen] = useState<number | null>(null);
  const [iconSearch, setIconSearch] = useState('');

  // Dynamic store brand & feature states
  const storeBrandName = useProductStore((state) => state.brandName);
  const storeBrandSubtitle = useProductStore((state) => state.brandSubtitle);
  const storeBrandLogo = useProductStore((state) => state.brandLogo);
  const storeBrandDesc = useProductStore((state) => state.brandDescription);
  const storeFeatures = useProductStore((state) => state.features);

  const storeHeroLabel = useProductStore((state) => state.heroLabel);
  const storeHeroTitle = useProductStore((state) => state.heroTitle);
  const storeHeroDescription = useProductStore((state) => state.heroDescription);
  const storeHeroImage = useProductStore((state) => state.heroImage);
  const storeHeroPrice = useProductStore((state) => state.heroPrice);
  const storeHeroDimensions = useProductStore((state) => state.heroDimensions);
  const storeHeroLinkSlug = useProductStore((state) => state.heroLinkSlug);

  const storePreorderTitle = useProductStore((state) => state.preorderTitle);
  const storePreorderDescription = useProductStore((state) => state.preorderDescription);
  const storePreorderLinkSlug = useProductStore((state) => state.preorderLinkSlug);
  const storePreorderImage = useProductStore((state) => state.preorderImage);

  const { updateBrandName, updateBrandLogo, updateBrandDescription, updateFeatures, updateHeroSettings, updatePreorderSettings } = useProductStore();

  const [inputBrandName, setInputBrandName] = useState(storeBrandName);
  const [inputBrandSubtitle, setInputBrandSubtitle] = useState(storeBrandSubtitle);
  const [inputBrandLogo, setInputBrandLogo] = useState(storeBrandLogo);
  const [inputBrandDesc, setInputBrandDesc] = useState(storeBrandDesc);
  const [inputFeatures, setInputFeatures] = useState(storeFeatures);

  const [inputHeroLabel, setInputHeroLabel] = useState(storeHeroLabel);
  const [inputHeroTitle, setInputHeroTitle] = useState(storeHeroTitle);
  const [inputHeroDescription, setInputHeroDescription] = useState(storeHeroDescription);
  const [inputHeroImage, setInputHeroImage] = useState(storeHeroImage);
  const [inputHeroPrice, setInputHeroPrice] = useState(storeHeroPrice);
  const [inputHeroDimensions, setInputHeroDimensions] = useState(storeHeroDimensions);
  const [inputHeroLinkSlug, setInputHeroLinkSlug] = useState(storeHeroLinkSlug);

  const [inputPreorderTitle, setInputPreorderTitle] = useState(storePreorderTitle);
  const [inputPreorderDescription, setInputPreorderDescription] = useState(storePreorderDescription);
  const [inputPreorderLinkSlug, setInputPreorderLinkSlug] = useState(storePreorderLinkSlug);
  const [inputPreorderImage, setInputPreorderImage] = useState(storePreorderImage);

  const [isDraggingPreorder, setIsDraggingPreorder] = useState(false);

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
    if (!storeFeatures || storeFeatures.length === 0) {
      setInputFeatures([
        { id: 1, title: '', desc: '', icon: 'Package' },
        { id: 2, title: '', desc: '', icon: 'Package' },
        { id: 3, title: '', desc: '', icon: 'Package' }
      ]);
    } else {
      setInputFeatures(storeFeatures);
    }
  }, [storeFeatures]);

  useEffect(() => {
    setInputHeroLabel(storeHeroLabel);
    setInputHeroTitle(storeHeroTitle);
    setInputHeroDescription(storeHeroDescription);
    setInputHeroImage(storeHeroImage);
    setInputHeroPrice(storeHeroPrice);
    setInputHeroDimensions(storeHeroDimensions);
    setInputHeroLinkSlug(storeHeroLinkSlug);
  }, [storeHeroLabel, storeHeroTitle, storeHeroDescription, storeHeroImage, storeHeroPrice, storeHeroDimensions, storeHeroLinkSlug]);

  useEffect(() => {
    setInputPreorderTitle(storePreorderTitle);
    setInputPreorderDescription(storePreorderDescription);
    setInputPreorderLinkSlug(storePreorderLinkSlug);
    setInputPreorderImage(storePreorderImage);
  }, [storePreorderTitle, storePreorderDescription, storePreorderLinkSlug, storePreorderImage]);

  const handleUpdateFeatureField = (id: number, key: 'title' | 'desc' | 'icon', val: string) => {
    setInputFeatures(prev =>
      prev.map(f => f.id === id ? { ...f, [key]: val } : f)
    );
  };

  const handleSaveBrandSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update local state first
      updateBrandName(inputBrandName, inputBrandSubtitle);
      updateBrandLogo(inputBrandLogo);
      updateBrandDescription(inputBrandDesc);
      updateFeatures(inputFeatures);
      updateHeroSettings({
        heroLabel: inputHeroLabel,
        heroTitle: inputHeroTitle,
        heroDescription: inputHeroDescription,
        heroImage: inputHeroImage,
        heroPrice: inputHeroPrice,
        heroDimensions: inputHeroDimensions,
        heroLinkSlug: inputHeroLinkSlug
      });
      updatePreorderSettings({
        preorderTitle: inputPreorderTitle,
        preorderDescription: inputPreorderDescription,
        preorderLinkSlug: inputPreorderLinkSlug,
        preorderImage: inputPreorderImage
      });
      
      // Save to Supabase
      await saveStoreConfig();
      showNotification('Pengaturan Brand berhasil disimpan ke Database!', 'success');
    } catch (e: any) {
      console.error('Error saving brand settings:', e);
      if (e.name === 'QuotaExceededError' || e.message?.includes('quota')) {
        showNotification('Gagal: Ukuran gambar terlalu besar untuk disimpan.', 'error');
      } else {
        showNotification('Gagal menyimpan ke database: ' + (e.message || e), 'error');
      }
    }
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
      description: 'Dibuat dari blok kayu yang dicat akrilik, ditempel satu per satu dengan kuat, lalu difinishing pernis mengkilap.',
      dimensions: '',
      material: '',
      stock: 1,
      category: 'Gantungan Kunci',
      cheapest: false,
      shopee_link: ''
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
      dimensions: product.dimensions || '',
      material: product.material || '',
      stock: product.stock !== undefined ? product.stock : 0,
      category: product.category,
      cheapest: product.cheapest || false,
      shopee_link: product.shopee_link || ''
    });
    setIsFormOpen(true);
  };

  const handleDeleteTrigger = (id: number, name: string) => {
    setProductToDelete({ id, name });
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      saveStoreConfig()
        .then(() => showNotification(`Produk "${productToDelete.name}" telah dihapus dan disimpan ke database!`, 'success'))
        .catch((err: any) => {
          console.error(err);
          showNotification('Gagal menyimpan perubahan ke database: ' + err.message, 'error');
        });
      setProductToDelete(null);
    }
  };

  const handleResetDefaultsTrigger = () => {
    setIsResetConfirmOpen(true);
  };

  const handleConfirmReset = () => {
    resetToDefault();
    saveStoreConfig()
      .then(() => showNotification('Semua data produk telah di-reset ke bawaan pabrik dan disimpan ke database!', 'info'))
      .catch((err: any) => {
        console.error(err);
        showNotification('Gagal menyimpan reset ke database: ' + err.message, 'error');
      });
    setIsResetConfirmOpen(false);
  };

  // Hero Image Drag and Drop Handlers
  const handleHeroDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingHero(true);
  };

  const handleHeroDragLeave = () => {
    setIsDraggingHero(false);
  };

  const compressImageFile = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/webp', 0.7);
        callback(dataUrl);
      };
      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHeroFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showNotification('Berkas harus berupa gambar!', 'error');
      return;
    }
    // Use compression for hero image to prevent Supabase timeout (limit JSON payload size)
    compressImageFile(file, (base64) => {
      setInputHeroImage(base64);
    });
  };

  const handleHeroDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingHero(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleHeroFileProcess(file);
    }
  };

  const handleHeroFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleHeroFileProcess(file);
    }
  };

  // Preorder Image Drag and Drop Handlers
  const handlePreorderDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingPreorder(true);
  };

  const handlePreorderDragLeave = () => {
    setIsDraggingPreorder(false);
  };

  const handlePreorderFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showNotification('Berkas harus berupa gambar!', 'error');
      return;
    }
    // Use compression for preorder image to prevent Supabase timeout (limit JSON payload size)
    compressImageFile(file, (base64) => {
      setInputPreorderImage(base64);
    });
  };

  const handlePreorderDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingPreorder(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handlePreorderFileProcess(file);
    }
  };

  const handlePreorderFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePreorderFileProcess(file);
    }
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
    compressImageFile(file, (base64) => {
      setFormFields(prev => ({ ...prev, image: base64 }));
    });
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
      cheapest: formFields.cheapest,
      shopee_link: formFields.shopee_link
    };

    if (editingId !== null) {
      updateProduct(editingId, productPayload);
      saveStoreConfig()
        .then(() => showNotification(`Produk "${formFields.name}" berhasil diperbarui dan disimpan ke database!`, 'success'))
        .catch((err: any) => {
          console.error(err);
          showNotification('Gagal menyimpan ke database: ' + err.message, 'error');
        });
    } else {
      // Generate unique ID based on max existing ID
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      addProduct({ id: newId, ...productPayload });
      saveStoreConfig()
        .then(() => showNotification(`Produk baru "${formFields.name}" berhasil ditambahkan dan disimpan ke database!`, 'success'))
        .catch((err: any) => {
          console.error(err);
          showNotification('Gagal menyimpan ke database: ' + err.message, 'error');
        });
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
    <div className="flex min-h-screen bg-bg-primary text-text-primary relative">

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div className={`minecraft-panel bg-bg-panel border-2 p-4 shadow-2xl flex items-center gap-3
            ${notification.type === 'error' ? 'border-red-500/70' : notification.type === 'info' ? 'border-amber-500/70' : 'border-primary/70'}`}>
            {notification.type === 'error' ? (
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            ) : notification.type === 'info' ? (
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            ) : (
              <CheckCircle className="w-5 h-5 text-primary shrink-0" />
            )}
            <span className="text-sm tracking-widest font-bold text-text-primary tracking-wide">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-68 bg-bg-panel border-r border-stone-gray flex flex-col pt-8 shrink-0">
        <div className="px-6 mb-8 text-center text-text-primary tracking-widest text-xs tracking-wider font-extrabold pb-3 border-b-2 border-stone-gray">
          ⚙️ VOXELWOOD ADMIN
        </div>
        <nav className="flex-1 flex flex-col gap-2 px-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`p-3 rounded-none text-left flex items-center gap-3 font-bold text-xs tracking-wider transition-all border border-transparent cursor-pointer
              ${activeTab === 'orders'
                ? 'bg-wood-dark/20 text-primary border-primary/30 font-extrabold'
                : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'}`}
          >
            <ShoppingBag className="w-4 h-4 text-primary" /> Kelola Pesanan
          </button>

          <button
            onClick={() => setActiveTab('shop')}
            className={`p-3 rounded-none text-left flex items-center gap-3 font-bold text-xs  tracking-wider  tracking-wider transition-all border border-transparent cursor-pointer
              ${activeTab === 'shop'
                ? 'bg-wood-dark/20 text-primary border-primary/30 font-extrabold'
                : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'}`}
          >
            <Hammer className="w-4 h-4 text-primary" /> Kelola Produk
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`p-3 rounded-none text-left flex items-center gap-3 font-bold text-xs  tracking-wider  tracking-wider transition-all border border-transparent cursor-pointer
              ${activeTab === 'overview'
                ? 'bg-wood-dark/20 text-primary border-primary/30 font-extrabold'
                : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'}`}
          >
            <LayoutDashboard className="w-4 h-4 text-primary" /> Overview Statistik
          </button>

          <button
            onClick={() => setActiveTab('brand')}
            className={`p-3 rounded-none text-left flex items-center gap-3 font-bold text-xs  tracking-wider  tracking-wider transition-all border border-transparent cursor-pointer
              ${activeTab === 'brand'
                ? 'bg-wood-dark/20 text-primary border-primary/30 font-extrabold'
                : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'}`}
          >
            <Settings className="w-4 h-4 text-primary" /> Pengaturan Brand
          </button>

          <button
            className="p-3 rounded-none text-left flex items-center gap-3 font-bold text-xs tracking-wider tracking-wider transition-all text-stone-600 cursor-not-allowed"
            disabled
          >
            <Server className="w-4 h-4 opacity-40" /> MC Hosting (Preview Only)
          </button>

          <button
            className="p-3 rounded-none text-left flex items-center gap-3 font-bold text-xs tracking-wider tracking-wider transition-all text-stone-600 cursor-not-allowed"
            disabled
          >
            <Gamepad2 className="w-4 h-4 opacity-40" /> Game Top-Up (Preview Only)
          </button>
        </nav>

        <div className="p-4 border-t border-stone-gray text-[10px] text-text-secondary tracking-wider">
          SYSTEM STATUS: <span className="text-primary font-bold">ONLINE</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto max-w-7xl">

        {/* TABS 0: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-4 border-b border-stone-gray">
              <div>
                <span className="text-primary text-xs tracking-wider font-bold tracking-widest block mb-1">MANAJEMEN PESANAN</span>
                <h1 className="font-extrabold text-3xl text-text-primary tracking-tight">Order Management</h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-wider text-text-secondary">
                  Total Pesanan: <strong className="text-primary">{orders.length}</strong>
                </span>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="minecraft-panel p-12 bg-bg-panel border border-stone-gray text-center">
                <ShoppingBag className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-40" />
                <h3 className="text-lg font-bold text-text-primary mb-2">Belum Ada Pesanan</h3>
                <p className="text-sm text-text-secondary tracking-wider">
                  Pesanan baru akan muncul di sini setelah customer melakukan checkout.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.sort((a, b) => b.createdAt - a.createdAt).map((order) => (
                  <div key={order.orderId} className="minecraft-panel p-6 bg-bg-panel border border-stone-gray">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4 pb-4 border-b border-stone-gray">
                      <div>
                        <h3 className="text-lg font-bold text-text-primary tracking-wider mb-1">
                          Order ID: {order.orderId}
                        </h3>
                        <p className="text-xs text-text-secondary tracking-wider">
                          Dibuat: {new Date(order.createdAt).toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-text-secondary tracking-wider">
                          Update: {new Date(order.updatedAt).toLocaleString('id-ID')}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => {
                            updateOrderStatus(order.orderId, e.target.value as OrderStatus);
                            showNotification(`Status pesanan ${order.orderId} diubah menjadi ${e.target.value}`, 'success');
                          }}
                          className="bg-bg-panel border-2 border-stone-gray text-text-primary px-4 py-2 text-xs tracking-wider font-bold focus:border-primary focus:outline-none rounded-none"
                        >
                          <option value="pending">⏳ Menunggu Konfirmasi</option>
                          <option value="confirmed">✅ Dikonfirmasi</option>
                          <option value="processing">📦 Sedang Diproses</option>
                          <option value="shipped">🚚 Dalam Pengiriman</option>
                          <option value="delivered">🏠 Telah Diterima</option>
                          <option value="cancelled">❌ Dibatalkan</option>
                        </select>
                        <span className={`text-xs tracking-wider font-bold text-center px-3 py-1.5 border-2
                          ${order.status === 'delivered' ? 'border-primary text-primary bg-primary/10' :
                            order.status === 'cancelled' ? 'border-red-500 text-red-500 bg-red-500/10' :
                              order.status === 'shipped' ? 'border-orange-500 text-orange-500 bg-orange-500/10' :
                                'border-yellow-500 text-yellow-500 bg-yellow-500/10'}`}>
                          Status: {order.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="text-xs tracking-wider font-bold text-text-secondary mb-2">CUSTOMER INFO</h4>
                        <div className="space-y-1 text-sm tracking-wider text-text-primary">
                          <p><strong>Email:</strong> {order.email || '-'}</p>
                          <p><strong>Phone:</strong> {order.phone}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs tracking-wider font-bold text-text-secondary mb-2">ALAMAT PENGIRIMAN</h4>
                        <p className="text-sm tracking-wider text-text-primary leading-relaxed">
                          {order.detailAddress}<br />
                          {order.city}, {order.province}<br />
                          {order.country} {order.postalCode}
                          {order.latitude && order.longitude && (
                            <>
                              <br />
                              <span className="text-xs text-text-secondary">
                                GPS: {order.latitude.toFixed(6)}, {order.longitude.toFixed(6)}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-xs tracking-wider font-bold text-text-secondary mb-3">ITEMS DIPESAN</h4>
                      <div className="space-y-2">
                        {order.cart.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-bg-light border border-stone-gray text-sm tracking-wider">
                            <div className="relative w-12 h-12 border border-stone-gray shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-text-primary">{item.name}</p>
                              <p className="text-xs text-text-secondary">x{item.qty} @ Rp {item.price.toLocaleString('id-ID')}</p>
                            </div>
                            <p className="font-bold text-primary">
                              Rp {(item.price * item.qty).toLocaleString('id-ID')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t-2 border-stone-gray">
                      <div className="space-y-1 text-sm tracking-wider text-text-secondary">
                        <p>Subtotal: <span className="text-text-primary">Rp {order.subtotal.toLocaleString('id-ID')}</span></p>
                        <p>Ongkir: <span className="text-text-primary">Rp {order.shipping.toLocaleString('id-ID')}</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-text-secondary tracking-wider">TOTAL PEMBAYARAN</p>
                        <p className="text-2xl font-bold text-primary tracking-wider">
                          Rp {order.total.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TABS 1: SHOP MANAGEMENT (DYNAMIC ACTIVE PRODUCT EDITING) */}
        {activeTab === 'shop' && (
          <div className="animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-4 border-b border-stone-gray">
              <div>
                <span className="text-primary text-xs tracking-wider font-bold tracking-widest block mb-1">DATA PRODUK</span>
                <h1 className="font-extrabold text-3xl text-text-primary tracking-tight">Voxelwood Management</h1>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleResetDefaultsTrigger}
                  className="minecraft-btn-gold text-xs tracking-wider py-2.5 px-4 font-bold flex items-center gap-2 tracking-wider bg-amber-700/20 hover:brightness-110 !border-amber-700 text-amber-500 rounded-none cursor-pointer"
                  title="Kembalikan semua ke setelan pabrik"
                >
                  <RotateCcw className="w-4 h-4" /> Bawaan Pabrik
                </button>
                <button
                  onClick={handleOpenAdd}
                  className="minecraft-btn text-xs tracking-wider py-2.5 px-5 font-bold flex items-center gap-2 tracking-wider bg-primary hover:brightness-110 text-text-primary rounded-none cursor-pointer"
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
                  className="w-full bg-bg-surface border border-stone-gray text-text-primary placeholder:text-stone-500 pl-10 pr-4 py-2 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none"
                />
              </div>

              {/* Category selector */}
              <div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full bg-bg-surface border border-stone-gray text-text-primary px-4 py-2 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none"
                >
                  <option value="Semua">Semua Kategori</option>
                  <option value="Gantungan Kunci">Gantungan Kunci</option>
                  <option value="Pajangan Meja">Pajangan Meja</option>
                  <option value="Hiasan Dinding">Hiasan Dinding</option>
                </select>
              </div>

              {/* Status information */}
              <div className="text-right text-xs tracking-wider p-2 text-text-secondary flex items-center justify-end">
                Menampilkan {filteredProducts.length} dari {products.length} produk
              </div>
            </div>

            {/* List Table */}
            <div className="minecraft-panel p-6 bg-bg-panel border-stone-gray mb-10">
              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-text-secondary">
                  <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm tracking-widest font-bold tracking-wide">Tidak Ada Produk Cocok</p>
                  <p className="text-xs tracking-wider">Coba ubah kata kunci pencairan atau filter kategori kamu.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm tracking-widest text-left align-middle">
                    <thead>
                      <tr className="text-left text-text-secondary border-b border-stone-gray text-xs tracking-wider font-bold tracking-widest pb-3">
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
                              <img
                                src={product.image || 'https://picsum.photos/seed/default/400/400'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </td>
                          <td className="py-4 pl-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm tracking-widest tracking-tight">{product.name}</span>
                              {product.cheapest && (
                                <span className="text-[9px] text-amber-500 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded-sm font-bold">
                                  🌟 ekonomis
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-text-secondary block mt-1">slug: {product.slug}</span>
                          </td>
                          <td className="py-4 text-xs tracking-wider">
                            <span className="bg-bg-light px-2 py-0.5 text-text-secondary border border-stone-gray">
                              {product.category}
                            </span>
                          </td>
                          <td className="py-4 text-xs tracking-wider font-bold text-primary">
                            Rp {product.price.toLocaleString('id-ID')}
                          </td>
                          <td className="py-4 text-xs tracking-wider font-bold">
                            {product.stock === 0 ? (
                              <span className="px-2.5 py-1 text-[10px] tracking-wider font-extrabold border bg-red-500/15 text-red-400 border-red-500/50">
                                HABIS
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 text-[10px] tracking-wider font-extrabold border bg-primary/20 text-primary border-primary">
                                STOK: {product.stock}
                              </span>
                            )}
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleOpenEdit(product)}
                                className="p-2 border border-stone-gray hover:border-primary hover:text-primary text-text-secondary transition-colors cursor-pointer"
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
                <span className="text-primary text-xs tracking-wider font-bold tracking-widest block mb-1">METRIKS</span>
                <h1 className="font-extrabold text-3xl text-text-primary tracking-tight">Dashboard Overview</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="minecraft-panel p-6 bg-wood-dark/20 border-stone-gray text-left">
                <div className="text-text-secondary text-xs tracking-wider font-extrabold tracking-wider mb-2">Total Katalog Produk</div>
                <div className="text-3xl text-text-primary font-bold">{products.length}</div>
              </div>
              <div className="minecraft-panel p-6 bg-primary/10 border-primary/30 text-left">
                <div className="text-text-secondary text-xs tracking-wider font-extrabold tracking-wider mb-2">Nilai Kumulatif Katalog</div>
                <div className="text-xl text-primary font-bold">Rp {totalCatalogValue.toLocaleString('id-ID')}</div>
              </div>
              <div className="minecraft-panel p-6 bg-bg-panel border-red-500/20 text-left">
                <div className="text-text-secondary text-xs tracking-wider font-extrabold tracking-wider mb-2">Produk Habis</div>
                <div className="text-3xl text-red-400 font-bold">{totalOutOfStock}</div>
              </div>
            </div>

            {/* Sales performance simulation logs */}
            <div className="minecraft-panel p-6">
              <h2 className="font-bold text-lg mb-4 pb-2 border-b-2 border-stone-gray tracking-wider text-text-primary">Log Transaksi Terkini (Simulasi Toko)</h2>
              <table className="w-full text-sm tracking-widest">
                <thead>
                  <tr className="text-left text-text-secondary border-b border-stone-gray text-xs tracking-wider font-bold">
                    <th className="pb-2">Invoice ID</th>
                    <th className="pb-2">Platform</th>
                    <th className="pb-2">Nama Pelanggan</th>
                    <th className="pb-2">Total Belanja</th>
                    <th className="pb-2">Status Pembayaran</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/30 text-xs tracking-wider">
                  <tr className="text-text-primary">
                    <td className="py-3">#TRX-V9012</td>
                    <td className="py-3"><span className="text-[10px] font-bold border px-1 border-primary text-primary">E-Commerce</span></td>
                    <td className="py-3 font-bold">Alex Doe</td>
                    <td className="py-3">Rp 150.000</td>
                    <td className="py-3"><span className="text-primary text-[10px] font-bold">Lunas</span></td>
                  </tr>
                  <tr className="text-text-primary">
                    <td className="py-3">#TRX-V9011</td>
                    <td className="py-3"><span className="text-[10px] font-bold border px-1 border-primary text-primary">E-Commerce</span></td>
                    <td className="py-3 font-bold">Sarah Lee</td>
                    <td className="py-3">Rp 350.000</td>
                    <td className="py-3"><span className="text-yellow-400 text-[10px] font-bold">Diproses</span></td>
                  </tr>
                  <tr className="text-text-primary">
                    <td className="py-3">#TRX-V9010</td>
                    <td className="py-3"><span className="text-[10px] font-bold border px-1 border-primary text-primary">E-Commerce</span></td>
                    <td className="py-3 font-bold">Mike R.</td>
                    <td className="py-3">Rp 45.000</td>
                    <td className="py-3"><span className="text-primary text-[10px] font-bold">Lunas</span></td>
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
                <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                  PENGATURAN BRAND & MANFAAT UTAMA
                </h2>
                <p className="text-xs tracking-wider text-text-secondary mt-1">
                  Konfigurasi nama brand toko, deskripsi footer, dan 3 manfaat utama di halaman depan secara real-time.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveBrandSettings} className="space-y-8 max-w-4xl">
              {/* Sekilas Brand */}
              <div className="minecraft-panel p-6 bg-bg-panel border border-stone-gray space-y-6">
                <h3 className="text-sm tracking-widest font-bold tracking-widest text-primary border-b border-stone-gray pb-2 mb-4">
                  1. Identitas Visual & Footer
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Nama Brand Toko (Baris Atas)
                    </label>
                    <input
                      type="text"
                      required
                      value={inputBrandName}
                      onChange={(e) => setInputBrandName(e.target.value)}
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Subtitle Brand (Baris Bawah)
                    </label>
                    <input
                      type="text"
                      value={inputBrandSubtitle}
                      onChange={(e) => setInputBrandSubtitle(e.target.value)}
                      placeholder="Contoh: STUDIO"
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Link Logo Brand (Auto-Circle)
                    </label>
                    <input
                      type="text"
                      value={inputBrandLogo}
                      onChange={(e) => setInputBrandLogo(e.target.value)}
                      placeholder="URL Gambar"
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none"
                    />
                    {inputBrandLogo && (
                      <div className="mt-4 flex items-center gap-4">
                        <span className="text-[10px] text-text-secondary tracking-widest font-bold">Preview:</span>
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-primary">
                          <img src={inputBrandLogo} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Deskripsi Singkat Toko (Footer)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={inputBrandDesc}
                      onChange={(e) => setInputBrandDesc(e.target.value)}
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none leading-relaxed resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Pengaturan Hero Section */}
              <div className="minecraft-panel p-6 bg-bg-panel border border-stone-gray space-y-6">
                <h3 className="text-sm tracking-widest font-bold tracking-widest text-primary border-b border-stone-gray pb-2 mb-4">
                  2. Pengaturan Hero Section
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Label Hero (Teks kecil di atas judul)
                    </label>
                    <input
                      type="text"
                      required
                      value={inputHeroLabel}
                      onChange={(e) => setInputHeroLabel(e.target.value)}
                      placeholder="Contoh: BEST SELLER"
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Judul Hero (Nama Produk Utama)
                    </label>
                    <input
                      type="text"
                      required
                      value={inputHeroTitle}
                      onChange={(e) => setInputHeroTitle(e.target.value)}
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Harga (Rp)
                    </label>
                    <input
                      type="number"
                      required
                      value={inputHeroPrice}
                      onChange={(e) => setInputHeroPrice(Number(e.target.value))}
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Dimensi (Contoh: 12cm x 8cm x 4cm)
                    </label>
                    <input
                      type="text"
                      required
                      value={inputHeroDimensions}
                      onChange={(e) => setInputHeroDimensions(e.target.value)}
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Link Produk (Pilih dari Produk yang ada)
                    </label>
                    <select
                      required
                      value={inputHeroLinkSlug}
                      onChange={(e) => setInputHeroLinkSlug(e.target.value)}
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none font-bold"
                    >
                      <option value="" disabled>Pilih Produk Target</option>
                      {products.map(product => (
                        <option key={product.id} value={product.slug}>
                          {product.name} (Rp {product.price.toLocaleString('id-ID')})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Gambar Hero
                    </label>

                    {/* Drag-and-drop zone container */}
                    <div
                      onDragOver={handleHeroDragOver}
                      onDragLeave={handleHeroDragLeave}
                      onDrop={handleHeroDrop}
                      className={`border-2 border-dashed p-4 text-center cursor-pointer relative transition-all duration-200 flex flex-col items-center justify-center min-h-[140px] mb-4
                        ${isDraggingHero
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-stone-gray bg-bg-panel hover:border-primary/45 text-text-secondary hover:text-text-primary'}`}
                    >
                      <input
                        type="file"
                        id="hero-image-uploader"
                        accept="image/*"
                        onChange={handleHeroFileSelect}
                        className="hidden"
                      />

                      {/* Clicking triggers file input selection */}
                      <label htmlFor="hero-image-uploader" className="absolute inset-0 cursor-pointer w-full h-full z-10" />

                      {inputHeroImage ? (
                        <div className="flex flex-col sm:flex-row items-center gap-4 py-2 z-20 w-full justify-center">
                          <div className="relative w-16 h-16 border border-stone-gray overflow-hidden bg-bg-panel shrink-0">
                            <img
                              src={inputHeroImage}
                              alt="Pratinjau Unggahan Hero"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-left">
                            <div className="text-xs tracking-wider font-bold text-primary flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Berhasil Diimpor
                            </div>
                            <p className="text-[10px] text-text-secondary max-w-[200px] sm:max-w-[280px] truncate">{inputHeroImage}</p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setInputHeroImage('');
                              }}
                              className="text-[10px] text-red-400 font-bold underline hover:text-red-300 mt-1 cursor-pointer z-30 relative"
                            >
                              Hapus Gambar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 select-none pointer-events-none">
                          <Upload className="w-8 h-8 opacity-60 text-primary" />
                          <p className="text-xs tracking-wider font-bold text-text-primary tracking-wider">Tarik &amp; Lepas gambar di sini</p>
                          <p className="text-[10px] text-text-secondary">atau klik area ini untuk memilih berkas gambar lokal</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-2 text-left z-20 relative">
                      <label className="block text-[10px] font-bold text-text-secondary mb-1">
                        Atau tempel Link URL Gambar Manual:
                      </label>
                      <input
                        type="text"
                        value={inputHeroImage}
                        onChange={(e) => setInputHeroImage(e.target.value)}
                        placeholder="https://picsum.photos/seed/.../800/800"
                        className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                    Deskripsi Hero
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={inputHeroDescription}
                    onChange={(e) => setInputHeroDescription(e.target.value)}
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none leading-relaxed resize-none"
                  />
                </div>
              </div>

              {/* Pengaturan Preorder */}
              <div className="minecraft-panel p-6 bg-bg-panel border border-stone-gray space-y-6">
                <h3 className="text-sm tracking-widest font-bold tracking-widest text-primary border-b border-stone-gray pb-2 mb-4">
                  3. Pengaturan Notifikasi Beli sekarang (Muncul di Beranda)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Judul Notifikasi
                    </label>
                    <input
                      type="text"
                      required
                      value={inputPreorderTitle}
                      onChange={(e) => setInputPreorderTitle(e.target.value)}
                      placeholder="Contoh: Beli sekarang now!"
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Link Produk (Beli &raquo;)
                    </label>
                    <select
                      required
                      value={inputPreorderLinkSlug}
                      onChange={(e) => setInputPreorderLinkSlug(e.target.value)}
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none font-bold"
                    >
                      <option value="" disabled>Pilih Produk Target</option>
                      {products.map(product => (
                        <option key={product.id} value={product.slug}>
                          {product.name} (Rp {product.price.toLocaleString('id-ID')})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Deskripsi Preorder
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={inputPreorderDescription}
                      onChange={(e) => setInputPreorderDescription(e.target.value)}
                      placeholder="Contoh: Charge into a new adventure dengan produk kami..."
                      className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none leading-relaxed resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary mb-2 tracking-wider">
                      Gambar Preorder (Opsional)
                    </label>

                    {/* Drag-and-drop zone container */}
                    <div
                      onDragOver={handlePreorderDragOver}
                      onDragLeave={handlePreorderDragLeave}
                      onDrop={handlePreorderDrop}
                      className={`border-2 border-dashed p-4 text-center cursor-pointer relative transition-all duration-200 flex flex-col items-center justify-center min-h-[140px] mb-4
                        ${isDraggingPreorder
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-stone-gray bg-bg-panel hover:border-primary/45 text-text-secondary hover:text-text-primary'}`}
                    >
                      <input
                        type="file"
                        id="preorder-image-uploader"
                        accept="image/*"
                        onChange={handlePreorderFileSelect}
                        className="hidden"
                      />

                      {/* Clicking triggers file input selection */}
                      <label htmlFor="preorder-image-uploader" className="absolute inset-0 cursor-pointer w-full h-full z-10" />

                      {inputPreorderImage ? (
                        <div className="flex flex-col sm:flex-row items-center gap-4 py-2 z-20 w-full justify-center">
                          <div className="relative w-16 h-16 border border-stone-gray overflow-hidden bg-bg-panel shrink-0">
                            <img
                              src={inputPreorderImage}
                              alt="Pratinjau Unggahan Preorder"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-left">
                            <div className="text-xs tracking-wider font-bold text-primary flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Berhasil Diimpor
                            </div>
                            <p className="text-[10px] text-text-secondary max-w-[200px] sm:max-w-[280px] truncate">{inputPreorderImage}</p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setInputPreorderImage('');
                              }}
                              className="text-[10px] text-red-400 font-bold underline hover:text-red-300 mt-1 cursor-pointer z-30 relative"
                            >
                              Hapus Gambar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 select-none pointer-events-none">
                          <Upload className="w-8 h-8 opacity-60 text-primary" />
                          <p className="text-xs tracking-wider font-bold text-text-primary tracking-wider">Tarik &amp; Lepas gambar di sini</p>
                          <p className="text-[10px] text-text-secondary">atau klik area ini untuk memilih berkas gambar lokal</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-2 text-left z-20 relative">
                      <label className="block text-[10px] font-bold text-text-secondary mb-1">
                        Atau tempel Link URL Gambar Manual:
                      </label>
                      <input
                        type="text"
                        value={inputPreorderImage}
                        onChange={(e) => setInputPreorderImage(e.target.value)}
                        placeholder="https://picsum.photos/seed/.../800/800"
                        className="w-full bg-bg-panel border border-stone-gray text-text-primary p-3 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Manfaat Utama */}
              <div className="minecraft-panel p-6 bg-bg-panel border border-stone-gray space-y-6">
                <h3 className="text-sm tracking-widest font-bold tracking-widest text-primary border-b border-stone-gray pb-2 mb-4">
                  4. Manfaat Utama (Keunggulan Toko)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {inputFeatures.map((feat) => (
                    <div key={feat.id} className="space-y-4 p-4 border border-stone-gray bg-black/20">
                      <div className="flex items-center justify-between border-b border-stone-gray pb-2">
                        <span className="text-xs tracking-wider font-bold text-text-primary tracking-wider">Poin #{feat.id}</span>
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-text-secondary mb-1">
                          Judul Manfaat
                        </label>
                        <input
                          type="text"
                          required
                          value={feat.title}
                          onChange={(e) => handleUpdateFeatureField(feat.id, 'title', e.target.value)}
                          className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-text-secondary mb-1">
                          Ikon Phosphor
                        </label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setIconPickerOpen(feat.id)}
                            className="p-2 border border-stone-gray bg-bg-panel hover:bg-bg-surface flex items-center justify-center min-w-[40px] cursor-pointer transition-colors"
                            title="Pilih Ikon"
                          >
                            {(() => {
                              const IconComponent = (PhosphorIcons as any)[feat.icon] || PhosphorIcons.Package;
                              return <IconComponent className="w-4 h-4 text-primary" />;
                            })()}
                          </button>
                          <input
                            type="text"
                            required
                            value={feat.icon}
                            onChange={(e) => handleUpdateFeatureField(feat.id, 'icon', e.target.value)}
                            className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-text-secondary mb-1">
                          Deskripsi Manfaat
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={feat.desc}
                          onChange={(e) => handleUpdateFeatureField(feat.id, 'desc', e.target.value)}
                          className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none resize-none leading-relaxed text-left"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Controls */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 pt-4 border-t border-stone-gray">
                <button
                  type="submit"
                  className="minecraft-btn text-xs tracking-wider font-bold py-3.5 px-8 tracking-widest flex items-center justify-center gap-2"
                >
                  <Server className="w-4 h-4" /> Simpan Perubahan ke Database
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
              <h2 className="text-xl font-bold tracking-tight text-text-primary">
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
                  <label className="block text-xs tracking-wider font-bold text-text-secondary mb-1">Nama Produk</label>
                  <input
                    type="text"
                    required
                    value={formFields.name}
                    onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                    placeholder="Contoh: Pot Bunga Poppy Voxel"
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm tracking-widest focus:border-primary focus:outline-none rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-xs tracking-wider font-bold text-text-secondary mb-1">Harga (Rp)</label>
                  <input
                    type="text"
                    required
                    value={formFields.price}
                    onChange={(e) => setFormFields({ ...formFields, price: e.target.value.replace(/[^\d]/g, '') })}
                    placeholder="Contoh: 150000"
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm tracking-widest focus:border-primary focus:outline-none rounded-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs tracking-wider font-bold text-text-secondary mb-1">Kategori</label>
                  <select
                    value={formFields.category}
                    onChange={(e) => setFormFields({ ...formFields, category: e.target.value as any })}
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm tracking-widest focus:border-primary focus:outline-none rounded-none"
                  >
                    <option value="Gantungan Kunci">Gantungan Kunci</option>
                    <option value="Pajangan Meja">Pajangan Meja</option>
                    <option value="Hiasan Dinding">Hiasan Dinding</option>
                  </select>
                </div>

                {/* Stock Counter (Numeric Input) */}
                <div>
                  <label className="block text-xs tracking-wider font-bold text-text-secondary mb-1">Jumlah Stok / Ketersediaan</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formFields.stock}
                    onChange={(e) => setFormFields({ ...formFields, stock: Math.max(0, parseInt(e.target.value) || 0) })}
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm tracking-widest focus:border-primary focus:outline-none rounded-none"
                  />
                  <span className="text-[10px] text-text-secondary mt-1 block">
                    {formFields.stock === 0 ? "⚠️ Status: HABIS" : `Status: STOK AKTIF (${formFields.stock})`}
                  </span>
                </div>
              </div>

              {/* IMAGE DRAG-AND-DROP + CLICK ZONE (Custom upload system) */}
              <div>
                <label className="block text-xs tracking-wider font-bold text-text-secondary mb-1">Gambar Produk Preview</label>

                {/* Drag-and-drop zone container */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed p-6 text-center cursor-pointer relative transition-all duration-200 flex flex-col items-center justify-center min-h-[140px]
                    ${isDragging
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-stone-700 bg-bg-panel/50 hover:border-primary/45 text-text-secondary hover:text-text-primary'}`}
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
                        <img
                          src={formFields.image}
                          alt="Pratinjau Unggahan"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <div className="text-xs tracking-wider font-bold text-primary flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Berhasil Diimpor
                        </div>
                        <p className="text-[10px] text-text-secondary max-w-[280px] truncate">{formFields.image}</p>
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
                      <Upload className="w-8 h-8 opacity-60 text-primary" />
                      <p className="text-xs tracking-wider font-bold text-text-primary tracking-wider">Tarik &amp; Lepas gambar di sini</p>
                      <p className="text-[10px] text-text-secondary">atau klik area ini untuk memilih berkas gambar lokal</p>
                    </div>
                  )}
                </div>

                <div className="mt-2 text-left">
                  <label className="block text-[10px] font-bold text-text-secondary mb-1">
                    Atau tempel Link URL Gambar Manual:
                  </label>
                  <input
                    type="text"
                    value={formFields.image}
                    onChange={(e) => setFormFields({ ...formFields, image: e.target.value })}
                    placeholder="https://picsum.photos/seed/.../800/800"
                    className="w-full bg-bg-panel border border-stone-700 text-text-primary p-2 text-xs tracking-wider focus:ring-1 focus:ring-primary focus:outline-none rounded-none text-xs tracking-wider"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs tracking-wider font-bold text-text-secondary mb-1">Deskripsi Produk</label>
                <textarea
                  value={formFields.description}
                  onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                  rows={3}
                  placeholder="Ceritakan detail pengerjaan manual, jenis serat kayu, ketahanan pernis, dsb..."
                  className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm tracking-widest focus:border-primary focus:outline-none rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dimensions */}
                <div>
                  <label className="block text-xs tracking-wider font-bold text-text-secondary mb-1">Dimensi (L x W x H)</label>
                  <input
                    type="text"
                    value={formFields.dimensions}
                    onChange={(e) => setFormFields({ ...formFields, dimensions: e.target.value })}
                    placeholder="Contoh: 12cm x 8cm x 4cm"
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm tracking-widest focus:border-primary focus:outline-none rounded-none"
                  />
                </div>

                {/* Materials */}
                <div>
                  <label className="block text-xs tracking-wider font-bold text-text-secondary mb-1">Bahan Baku</label>
                  <input
                    type="text"
                    value={formFields.material}
                    onChange={(e) => setFormFields({ ...formFields, material: e.target.value })}
                    placeholder="Contoh: Kayu Pinus, Cat Akrilik"
                    className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm tracking-widest focus:border-primary focus:outline-none rounded-none"
                  />
                </div>
              </div>

              {/* Shopee Link */}
              <div>
                <label className="block text-xs tracking-wider font-bold text-text-secondary mb-1">Link Shopee (Opsional)</label>
                <input
                  type="url"
                  value={formFields.shopee_link}
                  onChange={(e) => setFormFields({ ...formFields, shopee_link: e.target.value })}
                  placeholder="https://shopee.co.id/product-link"
                  className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-sm tracking-widest focus:border-primary focus:outline-none rounded-none"
                />
                <p className="text-[10px] text-text-secondary mt-1">
                  🛒 Link produk di Shopee untuk tombol "Beli di Shopee"
                </p>
              </div>

              {/* Boolean option toggle for cheapest */}
              <div className="flex items-center gap-3 py-2 border-y border-stone-gray">
                <input
                  type="checkbox"
                  id="cheapest"
                  checked={formFields.cheapest}
                  onChange={(e) => setFormFields({ ...formFields, cheapest: e.target.checked })}
                  className="w-4 h-4 text-primary border-stone-gray bg-bg-panel focus:ring-primary"
                />
                <label htmlFor="cheapest" className="text-xs tracking-wider font-bold text-text-primary cursor-pointer select-none">
                  🌟 Seri Ekonomis (Ikut tampil di slideshow koleksi termurah beranda)
                </label>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-stone-gray">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="minecraft-panel px-5 py-2.5 hover:bg-bg-surface text-text-secondary hover:text-text-primary text-xs tracking-wider rounded-none border-t-0 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="minecraft-btn font-bold px-6 py-2.5 text-xs tracking-wider tracking-wider flex items-center gap-2 text-text-primary bg-primary rounded-none cursor-pointer"
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
              <h2 className="text-lg font-bold tracking-tight text-text-primary">
                Hapus Produk?
              </h2>
            </div>

            <p className="text-sm tracking-widest text-text-secondary mb-6 leading-relaxed">
              Apakah kamu yakin ingin menghapus produk <span className="text-text-primary font-bold">&ldquo;{productToDelete.name}&rdquo;</span>? Produk ini akan terhapus secara permanen dari katalog lokal kamu.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="minecraft-panel px-5 py-2.5 hover:bg-bg-surface text-text-secondary hover:text-text-primary text-xs tracking-wider rounded-none border-t-0 cursor-pointer animate-none"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="minecraft-btn font-bold px-6 py-2.5 text-xs tracking-wider tracking-wider flex items-center gap-2 text-text-primary bg-red-600 border-red-700 hover:bg-red-500 rounded-none cursor-pointer"
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
              <h2 className="text-lg font-bold tracking-tight text-text-primary">
                Reset Setelan Pabrik?
              </h2>
            </div>

            <p className="text-sm tracking-widest text-text-secondary mb-6 leading-relaxed">
              Apakah kamu yakin ingin mengembalikan semua produk ke daftar bawaan pabrik? Tindakan ini akan menghapus semua produk kustom baru atau perubahan yang telah kamu buat secara permanen.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="minecraft-panel px-5 py-2.5 hover:bg-bg-surface text-text-secondary hover:text-text-primary text-xs tracking-wider rounded-none border-t-0 cursor-pointer animate-none"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="minecraft-btn font-bold px-6 py-2.5 text-xs tracking-wider tracking-wider flex items-center gap-2 text-black bg-amber-500 border-amber-600 hover:bg-amber-400 rounded-none cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ICON PICKER MODAL */}
      {iconPickerOpen !== null && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="minecraft-panel max-w-3xl w-full h-[85vh] flex flex-col bg-bg-panel border-2 border-stone-gray p-6 text-left animate-zoom-in">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-stone-gray shrink-0">
              <h2 className="text-xl font-bold tracking-tight text-text-primary flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-primary" /> Pilih Ikon Phosphor
              </h2>
              <button
                onClick={() => { setIconPickerOpen(null); setIconSearch(''); }}
                className="p-1 border border-stone-gray hover:border-red-500 hover:text-red-500 text-text-secondary transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-4 shrink-0">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Cari ikon (contoh: Package, Check, Arrow...)"
                value={iconSearch}
                onChange={(e) => setIconSearch(e.target.value)}
                className="w-full bg-bg-surface border border-stone-gray text-text-primary placeholder:text-stone-500 pl-10 pr-4 py-2 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none"
                autoFocus
              />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {availableIcons.filter(iconName => iconName.toLowerCase().includes(iconSearch.toLowerCase())).slice(0, 200).map(iconName => {
                  return (
                    <button
                      key={iconName}
                      onClick={() => {
                        handleUpdateFeatureField(iconPickerOpen, 'icon', iconName);
                        setIconPickerOpen(null);
                        setIconSearch('');
                      }}
                      className="p-3 border border-stone-gray bg-bg-surface hover:bg-wood-dark/20 hover:border-primary/30 text-text-secondary hover:text-primary transition-colors flex flex-col items-center justify-center gap-2 rounded-none aspect-square cursor-pointer group"
                      title={iconName}
                    >
                      <DynamicIcon iconName={iconName} className="w-6 h-6" weight="regular" />
                      <span className="text-[8px] truncate w-full text-center group-hover:text-text-primary">{iconName}</span>
                    </button>
                  );
                })}
              </div>
              {availableIcons.filter(iconName => iconName.toLowerCase().includes(iconSearch.toLowerCase())).length === 0 && (
                <div className="py-12 text-center text-text-secondary flex flex-col items-center gap-2">
                  <AlertTriangle className="w-8 h-8 opacity-50" />
                  <p>Tidak ada ikon yang cocok dengan pencarian.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
