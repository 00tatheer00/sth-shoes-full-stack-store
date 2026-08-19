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
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md bg-white text-slate-900 p-8 border border-slate-200 rounded-2xl shadow-2xl space-y-4">
          <h2 className="text-xl font-bold">Access Restricted</h2>
          <p className="text-xs text-slate-500">
            You do not have administrative privileges to view the Tatheer SaaS Control Portal.
          </p>
        </div>
      </div>
    );
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
