import Image from 'next/image';
import { Search, AlertTriangle } from 'lucide-react';

const games = [
  { id: 1, name: 'Mobile Legends', image: 'https://picsum.photos/seed/ml/400/400', popular: true, tag: 'Aksi' },
  { id: 2, name: 'Free Fire', image: 'https://picsum.photos/seed/ff/400/400', popular: true, tag: 'Battle Royale' },
  { id: 3, name: 'PUBG Mobile', image: 'https://picsum.photos/seed/pubg/400/400', popular: false, tag: 'Battle Royale' },
  { id: 4, name: 'Genshin Impact', image: 'https://picsum.photos/seed/gi/400/400', popular: true, tag: 'RPG' },
  { id: 5, name: 'Honkai Star Rail', image: 'https://picsum.photos/seed/hsr/400/400', popular: false, tag: 'RPG' },
  { id: 6, name: 'Roblox', image: 'https://picsum.photos/seed/roblox/400/400', popular: true, tag: 'Sandbox' },
  { id: 7, name: 'Valorant', image: 'https://picsum.photos/seed/valo/400/400', popular: true, tag: 'Aksi' },
  { id: 8, name: 'Koin Minecraft', image: 'https://picsum.photos/seed/mc/400/400', popular: false, tag: 'Sandbox' },
];

export default function TopupPage() {
  return (
    <div className="pb-16 font-sans">
      
      {/* Banner Peringatan Penonaktifan Sementara di Paling Atas */}
      <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-500 py-3.5 px-4 text-center text-xs uppercase tracking-wider font-bold  tracking-wider flex items-center justify-center gap-2">
         <AlertTriangle className="w-4 h-4 animate-pulse" />
         Pemberitahuan: Layanan Top-Up Akun Game Sedang Di-nonaktifkan Sementara
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Hero/Promos - Darkened & Disabled */}
        <div className="w-full bg-black/60 border border-stone-gray/30 mb-12 relative flex items-center p-8 overflow-hidden rounded-none min-h-[250px] select-none filter brightness-50 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/80 to-transparent z-10" />
          <Image src="https://picsum.photos/seed/arcade/1200/400" alt="Arcade" fill className="object-cover opacity-60" referrerPolicy="no-referrer" />
          
          <div className="z-20 max-w-lg text-left">
            <div className="inline-block bg-stone-700 text-text-primary text-[10px]  font-bold px-2.5 py-1 tracking-widest mb-3 rounded-none">NONAKTIF</div>
            <h1 className="font-semibold tracking-tight text-2xl md:text-4xl text-stone-500 mb-4 leading-tight  font-bold">
              TINGKATKAN GAME KAMU
            </h1>
            <p className="text-stone-600 font-bold mb-6">Nikmati kemudahan berbelanja koin game dan diamond terpercaya di sini. Layanan segera kembali.</p>
          </div>
        </div>

        {/* Search & Filter - Darkened & Disabled */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 select-none filter brightness-50 opacity-40 pointer-events-none">
           <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
             <input 
               type="text" 
               placeholder="Cari game..." 
               className="w-full bg-bg-surface border border-stone-gray text-text-primary p-4 pl-12 font-bold placeholder:text-stone-600 focus:outline-none rounded-none"
               disabled
             />
           </div>
           <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide py-1">
              {['Semua', 'Populer', 'Aksi', 'RPG', 'Battle Royale', 'Sandbox'].map(filter => (
                <button 
                  key={filter} 
                  className={`px-5 py-2.5 bg-bg-surface border border-stone-gray font-bold whitespace-nowrap text-xs uppercase tracking-wider  tracking-wider rounded-none`}
                  disabled
                >
                  {filter}
                </button>
              ))}
           </div>
        </div>

        {/* Game Grid - Darkened & Disabled */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 select-none filter brightness-50 opacity-30 pointer-events-none">
           {games.map(game => (
             <div key={game.id} className="relative block bg-bg-surface border border-stone-gray p-4 rounded-none">
                {game.popular && (
                   <div className="absolute -top-3 -right-2 bg-stone-700 text-text-primary text-[9px] font-extrabold px-2 py-0.5 z-10 border border-bg-primary tracking-widest  rounded-none">POPULER</div>
                )}
                <div className="aspect-[3/4] relative mb-3 bg-bg-panel border border-stone-gray overflow-hidden rounded-none">
                  <Image src={game.image} alt={game.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-widest text-center leading-snug text-stone-500  tracking-tight font-semibold">{game.name}</h3>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
