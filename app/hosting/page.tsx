import { Database, HardDrive, Cpu, Users, Shield, AlertTriangle } from 'lucide-react';

const plans = [
  { name: 'Dirt', ram: '2GB', storage: '10GB SSD', cpu: '1 vCPU', slots: '10 Slot', price: 30000, color: 'text-amber-600', borderColor: 'border-t-amber-700' },
  { name: 'Stone', ram: '4GB', storage: '20GB NVMe', cpu: '2 vCPU', slots: 'Tidak Terbatas', price: 65000, color: 'text-stone-400', borderColor: 'border-t-stone-500' },
  { name: 'Iron', ram: '8GB', storage: '40GB NVMe', cpu: '3 vCPU', slots: 'Tidak Terbatas', price: 120000, color: 'text-zinc-300', borderColor: 'border-t-zinc-400' },
  { name: 'Diamond', ram: '16GB', storage: '80GB NVMe', cpu: '4 vCPU', slots: 'Tidak Terbatas', price: 240000, color: 'text-sky-400', popular: true, borderColor: 'border-t-sky-400' },
  { name: 'Netherite', ram: '32GB', storage: '160GB NVMe', cpu: '8 vCPU', slots: 'Tidak Terbatas', price: 450000, color: 'text-purple-400', borderColor: 'border-t-purple-500' },
];

export default function HostingPage() {
  return (
    <div className="pb-16 font-sans">
      
      {/* Banner Peringatan Penonaktifan Sementara di Paling Atas */}
      <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-500 py-3.5 px-4 text-center text-xs uppercase tracking-wider font-bold  tracking-wider flex items-center justify-center gap-2">
         <AlertTriangle className="w-4 h-4 animate-pulse" />
         Pemberitahuan: Layanan Hosting Server Minecraft Sedang Di-nonaktifkan Sementara
      </div>

      {/* Hero Header - Dibuat Jauh Lebih Gelap (Disabled Look) */}
      <div className="relative bg-black/60 border-b border-stone-gray/30 py-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden filter brightness-50 opacity-40">
        <div className="absolute inset-0 bg-bg-primary pointer-events-none">
           <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at center, #0EA5E9 0, transparent 60%)' }} />
           {/* Decorative grid pattern */}
           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="z-10 relative select-none">
          <span className="text-stone-500 text-[10px] tracking-widest  mb-4 block font-bold">Infrastruktur Server</span>
          <h1 className="font-semibold tracking-tight uppercase text-4xl md:text-5xl lg:text-6xl text-stone-500 mb-6 tracking-tighter  font-bold">
            Hosting Berkinerja <span className="text-stone-500">Tinggi</span>
          </h1>
          <p className="text-sm uppercase tracking-widest md:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Luncurkan server Minecraft instan Anda dengan garansi uptime 99.9%, penyimpanan cepat SSD NVMe, dan standar perlindungan DDoS.
          </p>
        </div>
      </div>

      {/* Content Area - Dibuat Jauh Lebih Gelap & Pointer Events None */}
      <div className="max-w-7xl mx-auto px-4 mt-16 select-none opacity-25 filter brightness-50 pointer-events-none">
        
        {/* Detail Pilihan Paket */}
        <div className="flex flex-col md:flex-row gap-6 items-end justify-center mb-16">
           {plans.map((plan) => (
             <div key={plan.name} className="relative flex-1 min-w-[220px] bg-bg-surface border border-stone-gray p-6 flex flex-col rounded-none">
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-700 text-bg-primary font-bold text-xs uppercase tracking-wider px-3 py-1  tracking-wider whitespace-nowrap border-2 border-bg-primary rounded-none">
                    Paling Populer
                  </div>
                )}
                <h3 className={`font-semibold tracking-tight uppercase text-xl mb-4 ${plan.color}`}>{plan.name}</h3>
                
                <div className="mb-6">
                  <div className="text-3xl font-sans text-text-primary font-bold">
                     <span className="text-lg">Rp</span>{(plan.price/1000).toString()}rb<span className="text-sm uppercase tracking-widest text-text-secondary">/bln</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1 text-sm uppercase tracking-widest text-text-secondary border-t border-stone-gray pt-4">
                  <li className="flex items-center gap-2"><Database className="w-4 h-4" /> {plan.ram} RAM Khusus</li>
                  <li className="flex items-center gap-2"><HardDrive className="w-4 h-4" /> {plan.storage}</li>
                  <li className="flex items-center gap-2"><Cpu className="w-4 h-4" /> {plan.cpu}</li>
                  <li className="flex items-center gap-2"><Users className="w-4 h-4" /> Slot {plan.slots}</li>
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4" /> Proteksi DDoS Pro</li>
                </ul>

                <span className="minecraft-btn-gold w-full text-center py-2.5 font-bold  text-xs uppercase tracking-wider tracking-wider bg-bg-panel border-stone-gray text-stone-500 cursor-not-allowed">
                  TIDAK TERSEDIA
                </span>
             </div>
           ))}
        </div>
         
        {/* Foot Comparison */}
        <div className="minecraft-panel p-8 text-center max-w-4xl mx-auto">
           <h2 className="font-pixel text-xl text-text-primary mb-6">Bandingkan Semua Fitur Lengkap</h2>
           <p className="text-text-secondary mb-4">Mulai dari spesifikasi server teknis mendalam, modul pencadangan otomatis penuh, hingga dukungan penuh untuk Modpack Minecraft.</p>
           <button className="minecraft-btn bg-stone-700 text-stone-500 cursor-not-allowed" disabled>Lihat Spesifikasi Detail</button>
        </div>
      </div>
    </div>
  );
}
