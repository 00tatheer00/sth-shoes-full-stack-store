import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { adminService } from '@/lib/services/adminService';

export const metadata = {
  title: 'Admin Dashboard | Tatheer Chappalz SaaS Control',
  description: 'Management & Operations Portal for Tatheer Chappalz.',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-Side Authorization Check
  const authCheck = await adminService.verifyAdminRole();

  if (!authCheck.authorized) {
    return (
      <div className="min-h-screen bg-[#1F130E] text-[#FAF7F2] flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white text-[#1F130E] p-8 border border-[#C59B27] shadow-2xl space-y-4">
          <h2 className="text-xl font-serif font-bold">Access Restricted</h2>
          <p className="text-xs text-[#4A2E1D]">
            You do not have administrative privileges to view the Tatheer SaaS Control Portal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] text-[#1F130E]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
