'use client';
import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Gem } from 'lucide-react';

const items = [
  { id: 1, name: '100 + 10 Diamonds', price: 28500 },
  { id: 2, name: '250 + 25 Diamonds', price: 71000 },
  { id: 3, name: '500 + 50 Diamonds', price: 140000, promo: true },
  { id: 4, name: '1000 + 150 Diamonds', price: 280000 },
  { id: 5, name: 'Starlight Member', price: 145000 },
  { id: 6, name: 'Twilight Pass', price: 135000 },
];

export default function GameTopupDetail({ params }: { params: Promise<{ game: string }> }) {
  const awaitedParams = use(params);
  const gameSlug = awaitedParams.game;
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  // In a real app we'd fetch the game data based on the params.game slug.

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
       <Link href="/topup" className="text-text-secondary hover:text-text-primary text-sm uppercase tracking-widest font-bold flex items-center gap-2 mb-6">
          ← Back to Games
       </Link>

       <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Game Informasi Sistem & User Data Form */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
             <div className="minecraft-panel p-6 flex items-center gap-4 border-l-4 border-l-purple-500">
                <div className="w-16 h-16 relative rounded-sm overflow-hidden border-2 border-stone-gray shrink-0">
                  <Image src="https://picsum.photos/seed/ml/200/200" alt="Mobile Legends" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                   <h1 className="font-bold text-lg leading-tight">Mobile Legends</h1>
                   <p className="text-xs uppercase tracking-wider text-text-secondary  tracking-widest mt-1">Moonton</p>
                </div>
             </div>

             <div className="minecraft-panel p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-semibold tracking-tight text-text-primary">1</span>
                  <h2 className="font-bold">Input Account Details</h2>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                     <label className="text-xs uppercase tracking-wider font-bold text-text-secondary block mb-1">User ID</label>
                     <input type="text" placeholder="12345678" className="w-full bg-bg-primary border-2 border-stone-700 p-2.5 text-text-primary focus:outline-none focus:border-purple-500" />
                  </div>
                  <div className="w-1/3">
                     <label className="text-xs uppercase tracking-wider font-bold text-text-secondary block mb-1">Zone ID</label>
                     <input type="text" placeholder="1234" className="w-full bg-bg-primary border-2 border-stone-700 p-2.5 text-text-primary focus:outline-none focus:border-purple-500" />
                  </div>
                </div>
                <button className="w-full mt-4 bg-stone-700 hover:bg-stone-600 text-text-primary font-bold py-2 border-2 border-stone-500 rounded-sm text-sm uppercase tracking-widest">
                   Check Account Validation
                </button>
             </div>
          </div>

          {/* Right Column: Items & Payment */}
          <div className="w-full md:w-2/3 flex flex-col gap-6">
             <div className="minecraft-panel p-6">
                <div className="flex items-center gap-2 mb-6">
                  <span className="font-pixel text-purple-400">2</span>
                  <h2 className="font-bold">Select Item</h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {items.map(item => (
                    <button 
                      key={item.id}
                      onClick={() => setSelectedItem(item.id)}
                      className={`relative flex flex-col items-center justify-center p-4 border-2 text-center transition-all bg-bg-surface
                        ${selectedItem === item.id ? 'border-purple-400 ring-2 ring-purple-500/50 bg-bg-panel' : 'border-stone-700 hover:border-stone-500'}`}
                    >
                      {item.promo && (
                         <div className="absolute -top-2 -right-2 bg-accent-gold text-bg-primary text-[10px] font-bold px-1.5 py-0.5 shadow-md z-10 font-sans">
                           HOT
                         </div>
                      )}
                      <Gem className="w-8 h-8 mb-2 text-purple-300" />
                      <div className="font-bold text-sm uppercase tracking-widest mb-1 leading-tight">{item.name}</div>
                      <div className="font-mono text-text-primary text-xs uppercase tracking-wider">Rp {(item.price).toLocaleString('id-ID')}</div>
                    </button>
                  ))}
                </div>
             </div>

             <div className="minecraft-panel p-6">
                <div className="flex items-center gap-2 mb-6">
                  <span className="font-pixel text-purple-400">3</span>
                  <h2 className="font-bold">Payment Method</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <button className="border-2 border-stone-700 bg-bg-surface p-4 flex items-center justify-between hover:border-purple-400">
                     <span className="font-bold">QRIS (Gopay, OVO, Dana)</span>
                     <span className="text-xs uppercase tracking-wider text-accent-green font-mono">0 Fee</span>
                   </button>
                   <button className="border-2 border-stone-700 bg-bg-surface p-4 flex items-center justify-between hover:border-purple-400">
                     <span className="font-bold">Bank Transfer (VA)</span>
                   </button>
                </div>
             </div>

             <div className="minecraft-panel p-6 bg-purple-900/20 border-purple-500/50">
                <div className="flex items-center gap-4">
                   <div className="flex-1">
                      <div className="text-xs uppercase tracking-wider text-text-secondary  font-bold mb-1">Promo Code (Optional)</div>
                      <input type="text" placeholder="Enter code" className="w-full bg-bg-primary border-2 border-stone-700 p-2.5 text-text-primary focus:outline-none" />
                   </div>
                   <button className="minecraft-btn mt-5 py-2.5 px-6 self-end border-purple-400 text-purple-400 hover:bg-purple-900 transition-colors">Apply</button>
                </div>
             </div>

             <button 
                className={`minecraft-btn w-full items-center justify-center p-4 text-xl font-bold transition-all shadow-lg
                  ${selectedItem ? 'bg-purple-600 border-purple-400 text-text-primary hover:bg-purple-500' : 'bg-bg-light border-stone-600 text-stone-500 cursor-not-allowed'}`}
                disabled={!selectedItem}
              >
                PROCEED TO CHECKOUT
             </button>
          </div>
       </div>
    </div>
  );
}
