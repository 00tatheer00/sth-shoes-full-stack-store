'use client';

import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

export const AdminLayoutClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 font-sans antialiased">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <AdminHeader onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">{children}</main>
      </div>
    </div>
  );
};
