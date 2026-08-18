import React from 'react';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';
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
      <div className="min-h-screen bg-[#0D3325] text-white flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white text-[#1C1917] p-8 border border-[#E5A93C] rounded-xl shadow-2xl space-y-4">
          <h2 className="text-xl font-serif font-bold">Access Restricted</h2>
          <p className="text-xs text-[#5A6578]">
            You do not have administrative privileges to view the Tatheer SaaS Control Portal.
          </p>
        </div>
      </div>
    );
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
