import type {Metadata} from 'next';
import { Geist } from 'next/font/google';
import './globals.css'; // Global styles
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AdminShortcut } from './AdminShortcut';
import { DynamicFavicon } from '@/components/DynamicFavicon';
import { cn } from "@/lib/utils";

import { StoreHydrator } from '@/components/StoreHydrator';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Barbecude Studio',
  description: 'Craft. Host. Play. — all in one world.',
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  let config = null;
  try {
    const { data } = await supabase.from('store_config').select('config').eq('id', 1).single();
    if (data?.config) config = data.config;
  } catch (err) {
    console.error("SSR fetch config error:", err);
  }

  return (
    <html lang="en" className={cn("font-sans", geist.variable, "dark")} style={{ colorScheme: 'dark' }}>
      <body className="font-sans min-h-screen flex flex-col" suppressHydrationWarning>
        <DynamicFavicon />
        <StoreHydrator config={config} />
        <AdminShortcut />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
