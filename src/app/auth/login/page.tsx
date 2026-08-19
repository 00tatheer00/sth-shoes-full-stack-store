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
    <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center font-sans">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-2xs space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-wider text-blue-600 font-semibold">
              Customer Portal
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Customer Sign In</h1>
            <p className="text-xs text-slate-500">
              Sign in to manage your orders, track shipments & saved addresses.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 rounded-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isLoggedIn ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">Welcome Back!</h3>
              <p className="text-xs text-slate-600">You are now signed into your Tatheer account.</p>
              <Link
                href="/account"
                className="inline-block px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
              >
                Go to Account Dashboard
              </Link>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="shahzaib@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-slate-700">Password</label>
                  <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-blue-600 font-semibold hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
