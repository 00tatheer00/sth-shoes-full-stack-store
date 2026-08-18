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
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#0D3325] text-white py-16 md:py-20 border-b border-[#082419]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#E5A93C] block">
            PESHAWAR ATELIER CONCIERGE
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">Contact Tatheer Chappalz</h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto font-light">
            We welcome inquiries regarding sizing, custom calfskin orders, and order status.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#EAE3D5] rounded-xl p-8 space-y-6 shadow-xs">
              <h2 className="text-xl font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-3">
                Peshawar Flagship Workshop
              </h2>

              <div className="space-y-4 text-xs text-[#1C1917]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0D3325] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold font-serif text-[#1C1917]">Namak Mandi Atelier</div>
                    <p className="text-[#5A6578] mt-0.5">Namak Mandi Bazaar, Opposite Jahangirpura, Peshawar, KP, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#0D3325] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold font-serif text-[#1C1917]">Helpline & WhatsApp</div>
                    <p className="text-[#5A6578] mt-0.5">+92 300 9876543 / +92 91 5271890</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#0D3325] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold font-serif text-[#1C1917]">Email Inquiries</div>
                    <p className="text-[#5A6578] mt-0.5">hello@tatheerchappalz.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#0D3325] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold font-serif text-[#1C1917]">Operating Hours</div>
                    <p className="text-[#5A6578] mt-0.5">Saturday – Thursday: 10:00 AM – 9:00 PM PKT</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-[#EAE3D5]">
                <a
                  href="https://wa.me/923009876543"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Instant WhatsApp Concierge
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#EAE3D5] rounded-xl p-8 space-y-6 shadow-xs">
              <h2 className="text-xl font-serif font-bold text-[#1C1917]">Send Us a Message</h2>

              {submitted ? (
                <div className="p-8 bg-[#FAF6EF] border border-[#0D3325]/30 rounded-lg text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-[#E5A93C] mx-auto" />
                  <h3 className="text-lg font-serif font-bold text-[#1C1917]">
                    Thank You for Reaching Out
                  </h3>
                  <p className="text-xs text-[#5A6578]">
                    Our Peshawar atelier concierge has received your inquiry and will respond within 4 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shahzaib Khan"
                        className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs focus:outline-none focus:border-[#0D3325]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs focus:outline-none focus:border-[#0D3325]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs focus:outline-none focus:border-[#0D3325]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                      Subject
                    </label>
                    <select className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs focus:outline-none focus:border-[#0D3325]">
                      <option>Sizing & Fit Advice</option>
                      <option>Order Status Inquiry</option>
                      <option>Custom Leather Order</option>
                      <option>Wholesale & Corporate</option>
                      <option>General Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                      Message Details *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Specify product name, size, or order number..."
                      className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs focus:outline-none focus:border-[#0D3325]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-forest w-full py-3.5 text-xs flex items-center justify-center gap-2"
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
