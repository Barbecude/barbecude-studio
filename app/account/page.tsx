import Link from 'next/link';
import { User } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
       <div className="w-full md:w-64">
          <div className="minecraft-panel p-6 flex flex-col gap-2">
             <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-dirt-brown">
                <div className="w-12 h-12 bg-bg-light border-2 border-stone-600 rounded-sm flex items-center justify-center text-2xl">
                   <User className="w-6 h-6 text-stone-400" />
                </div>
                <div>
                   <div className="font-bold">Steve</div>
                   <div className="text-xs tracking-wider text-text-secondary">steve@example.com</div>
                </div>
             </div>
             
             <button className="text-left p-2 hover:bg-bg-surface font-bold text-sm tracking-widest text-text-primary">Profile</button>
             <button className="text-left p-2 hover:bg-bg-surface font-bold text-sm tracking-widest text-text-secondary">Orders</button>
             <button className="text-left p-2 hover:bg-bg-surface font-bold text-sm tracking-widest text-text-secondary">My Servers</button>
             <button className="text-left p-2 hover:bg-bg-surface font-bold text-sm tracking-widest text-text-secondary">Top-Up History</button>
             <button className="text-left p-2 hover:bg-bg-surface font-bold text-sm tracking-widest text-accent-red mt-4 border-t-2 border-dirt-brown pt-4">Logout</button>
          </div>
       </div>

       <div className="flex-1 minecraft-panel p-8">
          <h1 className="font-semibold tracking-tight text-2xl text-text-primary mb-6">Profile Settings</h1>
          
          <form className="space-y-6 max-w-lg">
             <div className="space-y-2">
                <label className="block text-sm tracking-widest font-bold text-text-secondary">Username</label>
                <input type="text" defaultValue="Steve" className="w-full bg-bg-primary border-2 border-stone-700 p-3 text-text-primary focus:border-accent-gold outline-none" />
             </div>
             <div className="space-y-2">
                <label className="block text-sm tracking-widest font-bold text-text-secondary">Email Address</label>
                <input type="email" defaultValue="steve@example.com" disabled className="w-full bg-bg-panel border-2 border-stone-gray p-3 text-stone-500 cursor-not-allowed" />
             </div>
             <div className="space-y-2">
                <label className="block text-sm tracking-widest font-bold text-text-secondary">Phone Number</label>
                <input type="text" defaultValue="+628123456789" className="w-full bg-bg-primary border-2 border-stone-700 p-3 text-text-primary focus:border-accent-gold outline-none" />
             </div>
             <button className="minecraft-btn-gold">Save Changes</button>
          </form>
       </div>
    </div>
  );
}
