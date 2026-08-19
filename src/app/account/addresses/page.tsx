'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Trash2, AlertCircle } from 'lucide-react';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { addressService } from '@/lib/services/addressService';
import { useStore } from '@/context/StoreContext';
import { Address } from '@/types';

export default function AddressesPage() {
  const { currentUser, showToast } = useStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('Home');
  const [fullName, setFullName] = useState('Shahzaib Khan');
  const [phone, setPhone] = useState('+92 300 1234567');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('Islamabad');
  const [province, setProvince] = useState('ICT');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadAddresses() {
      const data = await addressService.getAddresses(currentUser?.id || 'demo-user');
      setAddresses(data);
    }
    loadAddresses();
  }, [currentUser]);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      const created = await addressService.addAddress(currentUser?.id || 'demo-user', {
        title: newTitle,
        full_name: fullName,
        phone,
        address_line: addressLine,
        city,
        province,
        is_default: addresses.length === 0,
      });

      setAddresses((prev) => [created, ...prev]);
      setShowAddForm(false);
      setAddressLine('');
      showToast('New delivery address saved');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save address. Check fields.');
    }
  };

  const handleDelete = async (id: string) => {
    await addressService.deleteAddress(id);
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address deleted');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Delivery Destinations
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Saved Addresses
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                Saved Locations ({addresses.length})
              </span>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" /> Add New Address
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Add Address Form Box */}
            {showAddForm && (
              <form onSubmit={handleAddAddress} className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-md">
                <h3 className="text-sm font-bold text-slate-900">Add Delivery Destination</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Address Title (e.g. Home, Office)"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="p-3 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Recipient Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="p-3 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-3 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City (e.g. Islamabad, Lahore)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-3 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Full Street Address & House Number"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {/* Address Cards List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-6 bg-white border rounded-2xl space-y-3 relative shadow-2xs ${
                    addr.isDefault ? 'border-slate-900' : 'border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-bold text-slate-900">{addr.title}</h4>
                    </div>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold rounded-full">
                        Default COD
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="font-bold text-slate-900">{addr.fullName}</div>
                    <div>{addr.addressLine}</div>
                    <div>{addr.city}, {addr.province} {addr.postalCode}</div>
                    <div className="font-mono text-slate-400 pt-1">Phone: {addr.phone}</div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end items-center">
                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="text-rose-600 hover:underline text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
