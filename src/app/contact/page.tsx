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
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#1F130E] text-[#FAF7F2] py-16 md:py-20 border-b border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C59B27] flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Peshawar Atelier Concierge
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">Contact Tatheer Chappalz</h1>
          <p className="text-xs sm:text-sm text-[#E2D7C7]/80 max-w-xl mx-auto font-sans font-light">
            We welcome inquiries regarding sizing, custom calfskin orders, and order status.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E2D7C7] p-8 space-y-6 shadow-xs">
              <h2 className="text-xl font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-3">
                Peshawar Flagship Workshop
              </h2>

              <div className="space-y-4 text-xs text-[#4A2E1D]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B87546] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1F130E] font-serif">Namak Mandi Atelier</div>
                    <p className="text-[#4A2E1D]/70 font-sans mt-0.5">
                      Namak Mandi Bazaar, Opposite Jahangirpura, Peshawar, KP, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B87546] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1F130E] font-serif">Helpline & Direct WhatsApp</div>
                    <p className="text-[#4A2E1D]/70 font-sans mt-0.5">+92 300 9876543 / +92 91 5271890</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#B87546] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1F130E] font-serif">Email Inquiries</div>
                    <p className="text-[#4A2E1D]/70 font-sans mt-0.5">concierge@tatheerchappalz.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#B87546] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1F130E] font-serif">Operating Hours</div>
                    <p className="text-[#4A2E1D]/70 font-sans mt-0.5">
                      Saturday – Thursday: 10:00 AM – 9:00 PM PKT
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-[#E2D7C7]">
                <a
                  href="https://wa.me/923009876543"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] text-white text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Instant WhatsApp Concierge
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E2D7C7] p-8 space-y-6 shadow-xs">
              <h2 className="text-xl font-serif font-bold text-[#1F130E]">Send Us a Message</h2>

              {submitted ? (
                <div className="p-8 bg-[#FAF7F2] border border-[#C59B27] text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-[#C59B27] mx-auto" />
                  <h3 className="text-lg font-serif font-bold text-[#1F130E]">
                    Thank You for Reaching Out
                  </h3>
                  <p className="text-xs text-[#4A2E1D]/80">
                    Our Peshawar atelier concierge has received your inquiry and will respond within 4 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shahzaib Khan"
                        className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">
                      Subject
                    </label>
                    <select className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]">
                      <option>Sizing & Fit Advice</option>
                      <option>Order Status Inquiry</option>
                      <option>Custom Leather Order</option>
                      <option>Wholesale & Corporate</option>
                      <option>General Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">
                      Message Details *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Specify product name, size, or order number..."
                      className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#4A2E1D] transition-colors flex items-center justify-center gap-2"
                  >
                    Submit Inquiry <Send className="w-4 h-4 text-[#C59B27]" />
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
