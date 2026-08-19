'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center font-sans">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-2xs space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-wider text-blue-600 font-semibold">
              Account Recovery
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Forgot Password</h1>
            <p className="text-xs text-slate-500">
              Enter your registered email address to receive password reset instructions.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">Reset Link Sent</h3>
              <p className="text-xs text-slate-600">
                Check your inbox for instructions to reset your password.
              </p>
              <Link
                href="/auth/login"
                className="inline-block px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="shahzaib@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                Send Reset Link <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Remembered your password?{' '}
            <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
