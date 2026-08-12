'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { authService } from '@/lib/services/authService';
import { useStore } from '@/context/StoreContext';

export default function LoginPage() {
  const { setCurrentUser, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await authService.login({ email, password });
      if (res.success) {
        setIsLoggedIn(true);
        if (res.user) setCurrentUser(res.user);
        showToast('Signed in successfully');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to sign in. Check email & password.');
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
              Patron Portal
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#1F130E]">Customer Login</h1>
            <p className="text-xs text-[#4A2E1D]/70">
              Sign in to manage your orders, track shipments & saved addresses.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isLoggedIn ? (
            <div className="p-6 bg-[#FAF7F2] border border-[#C59B27] text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#C59B27] mx-auto" />
              <h3 className="text-base font-serif font-bold text-[#1F130E]">Welcome Back!</h3>
              <p className="text-xs text-[#4A2E1D]">You are now signed into your Tatheer account.</p>
              <Link
                href="/account"
                className="inline-block px-6 py-2.5 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider hover:bg-[#1F130E]"
              >
                Go to Account Dashboard
              </Link>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">
                  Email Address
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A2E1D]/50" />
                  <input
                    type="email"
                    required
                    placeholder="shahzaib@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-mono uppercase text-[#4A2E1D] font-bold">Password</label>
                  <Link href="/auth/forgot-password" className="text-[#B87546] hover:underline">
                    Forgot Password?
                  </Link>
                </div>
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
                {isSubmitting ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-4 h-4 text-[#C59B27]" />
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#E2D7C7] text-center text-xs text-[#4A2E1D]/70">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-[#B87546] font-bold hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
