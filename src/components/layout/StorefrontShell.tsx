'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { SearchModal } from './SearchModal';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export const StorefrontShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // If inside /admin, completely isolate from storefront UI elements
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Consumer Storefront Layout
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <CartDrawer />
      <SearchModal />
      <WhatsAppButton />
      <Footer />
    </>
  );
};
