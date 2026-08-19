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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Storefront Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure header ribbons, support contacts, and shipping fee thresholds.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Site settings saved successfully! Changes reflect across live storefront header, footer, and checkout.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 max-w-3xl shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Announcement Bar & Top Ribbon
        </h3>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Top Announcement Ribbon</label>
          <input
            type="text"
            required
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 pt-2">
          Customer Support & Concierge Contact
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">WhatsApp / Phone</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Support Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Flagship Atelier Address</label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 pt-2">
          Shipping & Logistics Rules
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Free Delivery Threshold (PKR)</label>
            <input
              type="number"
              required
              value={freeThreshold}
              onChange={(e) => setFreeThreshold(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Standard COD Shipping Fee (PKR)</label>
            <input
              type="number"
              required
              value={codFee}
              onChange={(e) => setCodFee(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Store Settings
        </button>
      </form>
    </div>
  );
}
