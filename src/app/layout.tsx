import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { StorefrontShell } from '@/components/layout/StorefrontShell';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tatheer Chappalz | Authentic Handmade Peshawari Chappal Atelier',
  description:
    'Experience authentic Peshawari Chappal craftsmanship from Peshawar, Pakistan. Handcrafted Kaptan double sole, Zalmi suede, Norozi heritage, and royal calfskin footwear.',
  keywords: [
    'Peshawari Chappal',
    'Tatheer Chappalz',
    'Kaptan Chappal',
    'Zalmi Chappal',
    'Norozi Chappal',
    'Handmade Leather Shoes',
    'Peshawar Footwear',
    'Pakistani Crafts',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="font-sans bg-[#FAF7F2] text-[#1C1917] antialiased selection:bg-[#B87546] selection:text-white flex flex-col min-h-screen">
        <StoreProvider>
          <StorefrontShell>{children}</StorefrontShell>
        </StoreProvider>
      </body>
    </html>
  );
}
