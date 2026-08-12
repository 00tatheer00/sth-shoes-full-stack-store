'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Lock, Phone, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { authService } from '@/lib/services/authService';
import { useStore } from '@/context/StoreContext';

export default function RegisterPage() {
  const { setCurrentUser, showToast } = useStore();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await authService.register({
        full_name: fullName,
        phone,
        email,
        password,
      });

      if (res.success) {
        setRegistered(true);
        if (res.user) setCurrentUser(res.user);
        showToast('Patron account created successfully');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Check details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white border border-[#E2D7C7] p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B87546] font-bold">
              Join Tatheer Circle
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#1F130E]">Create Account</h1>
            <p className="text-xs text-[#4A2E1D]/70">
              Register to receive express checkout, exclusive drops & order tracking.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {registered ? (
            <div className="p-6 bg-[#FAF7F2] border border-[#C59B27] text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#C59B27] mx-auto" />
              <h3 className="text-base font-serif font-bold text-[#1F130E]">Account Created Successfully!</h3>
              <p className="text-xs text-[#4A2E1D]">Welcome to the Tatheer Chappalz patron community.</p>
              <Link
                href="/account"
                className="inline-block px-6 py-2.5 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider hover:bg-[#1F130E]"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A2E1D]/50" />
                  <input
                    type="text"
                    required
                    placeholder="Shahzaib Khan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A2E1D]/50" />
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="shahzaib@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A2E1D]/50" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#4A2E1D] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'} <ArrowRight className="w-4 h-4 text-[#C59B27]" />
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#E2D7C7] text-center text-xs text-[#4A2E1D]/70">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#B87546] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
