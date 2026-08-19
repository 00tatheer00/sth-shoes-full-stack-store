'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-16 md:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block">
            PESHAWAR ATELIER CONCIERGE
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Contact Tatheer Chappalz</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            We welcome inquiries regarding sizing, custom calfskin orders, and order tracking.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-2xs">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Peshawar Flagship Workshop
              </h2>

              <div className="space-y-4 text-xs text-slate-800">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Namak Mandi Atelier</div>
                    <p className="text-slate-500 mt-0.5">Namak Mandi Bazaar, Opposite Jahangirpura, Peshawar, KP, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Helpline & WhatsApp</div>
                    <p className="text-slate-500 mt-0.5">+92 300 9876543 / +92 91 5271890</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Email Inquiries</div>
                    <p className="text-slate-500 mt-0.5">hello@tatheerchappalz.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Operating Hours</div>
                    <p className="text-slate-500 mt-0.5">Monday – Saturday: 10:00 AM – 9:00 PM PKT</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href="https://wa.me/923009876543"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" /> Instant WhatsApp Concierge
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-2xs">
              <h2 className="text-base font-bold text-slate-900">Send Us a Message</h2>

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">
                    Thank You for Reaching Out
                  </h3>
                  <p className="text-xs text-slate-600">
                    Our Peshawar atelier concierge has received your inquiry and will respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shahzaib Khan"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Subject
                    </label>
                    <select className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900">
                      <option>Sizing & Fit Advice</option>
                      <option>Order Status Inquiry</option>
                      <option>Custom Leather Order</option>
                      <option>Wholesale & Corporate</option>
                      <option>General Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Message Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Specify product name, size, or order number..."
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Submit Inquiry</span> <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
