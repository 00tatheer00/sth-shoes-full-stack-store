'use client';

import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, Phone, Mail, MapPin, Truck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AdminSettingsPage() {
  const { showToast } = useStore();
  const [announcement, setAnnouncement] = useState('Authentic Handcrafted Peshawari Chappal • Direct from Peshawar');
  const [phone, setPhone] = useState('+92 300 9876543');
  const [email, setEmail] = useState('concierge@tatheerchappalz.com');
  const [address, setAddress] = useState('Namak Mandi Bazaar, Opposite Jahangirpura, Peshawar, KP, Pakistan');
  const [freeThreshold, setFreeThreshold] = useState('5000');
  const [codFee, setCodFee] = useState('300');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    showToast('Storefront content settings updated');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D7C7] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B87546] font-bold">
            Storefront Configuration
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1F130E]">
            Content & Store Settings
          </h1>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span>Site settings saved successfully! Changes reflect across live storefront.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border border-[#E2D7C7] p-8 space-y-6 max-w-3xl shadow-xs">
        <h3 className="text-lg font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-2">
          Storefront Header & Announcement Bar
        </h3>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Top Announcement Bar Ribbon</label>
          <input
            type="text"
            required
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif"
          />
        </div>

        <h3 className="text-lg font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-2 pt-4">
          Peshawar Flagship Concierge Contact
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">WhatsApp Concierge Phone</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Support Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Atelier Address</label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif"
          />
        </div>

        <h3 className="text-lg font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-2 pt-4">
          Shipping Thresholds
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Free Delivery Threshold (PKR)</label>
            <input
              type="number"
              required
              value={freeThreshold}
              onChange={(e) => setFreeThreshold(e.target.value)}
              className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Standard COD Flat Shipping (PKR)</label>
            <input
              type="number"
              required
              value={codFee}
              onChange={(e) => setCodFee(e.target.value)}
              className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#4A2E1D] transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4 text-[#C59B27]" /> Save Store Settings
        </button>
      </form>
    </div>
  );
}
