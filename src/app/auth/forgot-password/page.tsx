'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white border border-[#E2D7C7] p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B87546] font-bold">
              Account Recovery
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#1F130E]">Forgot Password</h1>
            <p className="text-xs text-[#4A2E1D]/70">
              Enter your registered email address to receive password reset instructions.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-[#FAF7F2] border border-[#C59B27] text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#C59B27] mx-auto" />
              <h3 className="text-base font-serif font-bold text-[#1F130E]">Reset Link Sent</h3>
              <p className="text-xs text-[#4A2E1D]">
                Check your inbox for instructions to reset your password.
              </p>
              <Link
                href="/auth/login"
                className="inline-block px-6 py-2.5 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider hover:bg-[#1F130E]"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A2E1D]/50" />
                  <input
                    type="email"
                    required
                    placeholder="shahzaib@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#4A2E1D] transition-colors flex items-center justify-center gap-2"
              >
                Send Reset Link <ArrowRight className="w-4 h-4 text-[#C59B27]" />
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#E2D7C7] text-center text-xs text-[#4A2E1D]/70">
            Remembered your password?{' '}
            <Link href="/auth/login" className="text-[#B87546] font-bold hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
