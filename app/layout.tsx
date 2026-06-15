import type {Metadata} from 'next';
import { Geist } from 'next/font/google';
import './globals.css'; // Global styles
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AdminShortcut } from './AdminShortcut';
import { DynamicFavicon } from '@/components/DynamicFavicon';
import { cn } from "@/lib/utils";

import { StoreInitializer } from '@/components/StoreInitializer';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Barbecude Studio',
  description: 'Craft. Host. Play. — all in one world.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable, "dark")} style={{ colorScheme: 'dark' }}>
      <body className="font-sans min-h-screen flex flex-col" suppressHydrationWarning>
        <DynamicFavicon />
        <StoreInitializer />
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
