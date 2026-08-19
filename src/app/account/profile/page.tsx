'use client';

import React, { useState } from 'react';
import { Save, ShieldCheck } from 'lucide-react';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { useStore } from '@/context/StoreContext';

export default function ProfilePage() {
  const { currentUser, showToast } = useStore();
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Account Preferences
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Profile Details
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-2xs space-y-6">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Personal Information
              </h2>

              {saved && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); setSaved(true); showToast('Profile changes saved'); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      defaultValue={currentUser?.user_metadata?.full_name || 'Shahzaib Khan'}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+92 300 1234567"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    defaultValue={currentUser?.email || 'shahzaib@example.com'}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Change Password</h3>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Profile Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
