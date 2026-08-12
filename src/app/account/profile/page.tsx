'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Save, ShieldCheck } from 'lucide-react';
import { AccountSidebar } from '@/components/account/AccountSidebar';

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      <div className="bg-[#1F130E] text-[#FAF7F2] py-12 border-b border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C59B27]">
            Account Preferences
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#FAF7F2]">
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
            <div className="bg-white border border-[#E2D7C7] p-8 shadow-xs space-y-6">
              <h2 className="text-xl font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-3">
                Personal Information
              </h2>

              {saved && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">First Name</label>
                    <input
                      type="text"
                      defaultValue="Shahzaib"
                      className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Khan"
                      className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Email Address</label>
                  <input
                    type="email"
                    defaultValue="shahzaib@example.com"
                    className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+92 300 1234567"
                    className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                  />
                </div>

                <div className="pt-4 border-t border-[#E2D7C7]">
                  <h3 className="text-base font-serif font-bold text-[#1F130E] mb-3">Change Password</h3>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#4A2E1D] transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#C59B27]" /> Save Profile Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
