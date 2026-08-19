'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, ShieldCheck, Phone, Mail, MapPin, Truck } from 'lucide-react';
import { dataEngine } from '@/lib/services/dataEngine';
import { useStore } from '@/context/StoreContext';

export default function AdminSettingsPage() {
  const { showToast } = useStore();
  const [announcement, setAnnouncement] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [freeThreshold, setFreeThreshold] = useState('5000');
  const [codFee, setCodFee] = useState('300');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = dataEngine.getSettings();
    setAnnouncement(s.announcement || 'Authentic Handcrafted Peshawari Chappal • Direct from Peshawar');
    setPhone(s.phone || '+92 300 9876543');
    setEmail(s.email || 'concierge@tatheerchappalz.com');
    setAddress(s.address || 'Namak Mandi, Opposite Jahangirpura, Peshawar, KP, Pakistan');
    setFreeThreshold(s.freeThreshold?.toString() || '5000');
    setCodFee(s.codFee?.toString() || '300');
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dataEngine.updateSettings({
      announcement,
      phone,
      email,
      address,
      freeThreshold: Number(freeThreshold) || 5000,
      codFee: Number(codFee) || 300,
    });
    setSaved(true);
    showToast('Storefront content & shipping settings updated across live store!');
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D5] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#0D3325] font-bold">
            Storefront Configuration
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917]">
            Content & Store Settings
          </h1>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span>Site settings saved successfully! Changes reflect across live storefront header, footer, and checkout.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border border-[#EAE3D5] rounded-lg p-8 space-y-6 max-w-3xl shadow-xs">
        <h3 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-2">
          Storefront Header & Announcement Bar
        </h3>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Top Announcement Bar Ribbon</label>
          <input
            type="text"
            required
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
          />
        </div>

        <h3 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-2 pt-4">
          Peshawar Flagship Concierge Contact
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">WhatsApp Concierge Phone</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono focus:outline-none focus:border-[#0D3325]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Support Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Atelier Flagship Address</label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
          />
        </div>

        <h3 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-2 pt-4">
          Shipping & Logistics Thresholds
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Free Delivery Threshold (PKR)</label>
            <input
              type="number"
              required
              value={freeThreshold}
              onChange={(e) => setFreeThreshold(e.target.value)}
              className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono focus:outline-none focus:border-[#0D3325]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Standard COD Flat Shipping (PKR)</label>
            <input
              type="number"
              required
              value={codFee}
              onChange={(e) => setCodFee(e.target.value)}
              className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono focus:outline-none focus:border-[#0D3325]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-forest px-8 py-3.5 text-xs flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Save className="w-4 h-4 text-[#E5A93C]" /> Save & Apply Store Settings
        </button>
      </form>
    </div>
  );
}
