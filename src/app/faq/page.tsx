'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'Are Tatheer Chappalz truly handcrafted in Peshawar?',
      answer: 'Yes, 100%. Every single pair of Tatheer Chappalz is designed and crafted in our workshop in Namak Mandi, Peshawar. Master cobblers cut the leather, shape the recycled tire soles, and hand-stitch the upper vamps using beeswax-coated threads.',
    },
    {
      question: 'How do I choose the correct size for my Peshawari Chappal?',
      answer: 'Peshawari Chappals run true to EU shoe sizing. If you wear size EU 42 in dress shoes, order EU 42. Since full-grain leather stretches slightly after 2-3 wears, a snug initial fit is ideal. Refer to our Size Guide page for exact centimeter measurements.',
    },
    {
      question: 'What is the sole made of?',
      answer: 'Authentic Peshawari Chappals feature soles crafted from recycled high-grip aircraft tire rubber. Tire rubber provides superior shock absorption, extreme durability against pavement friction, and complete water resistance.',
    },
    {
      question: 'Do you offer Cash on Delivery (COD) across Pakistan?',
      answer: 'Yes! We offer Nationwide Cash on Delivery (COD) across all cities and towns in Pakistan via courier partners (TCS, Leopards, M&P). Free shipping applies on orders over Rs. 5,000.',
    },
    {
      question: 'What is your size exchange policy?',
      answer: 'We offer a 7-day hassle-free size exchange. If the size does not fit comfortably, contact our WhatsApp concierge team, and we will arrange a doorstep exchange.',
    },
    {
      question: 'How should I care for and polish my leather Peshawari Chappal?',
      answer: 'Keep your chappals away from prolonged direct water submersion. Clean off dust with a soft cloth and apply organic carnauba leather balm or natural shoe polish every 2 weeks to preserve suppleness and natural shine.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="bg-slate-900 text-white py-16 md:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> Patron Assistance
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Answers to common queries regarding ordering, sizing, leather care, and nationwide shipping.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions (e.g. Sizing, Delivery, Leather care)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs"
          />
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl transition-all shadow-2xs overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold text-slate-900">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-5 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
