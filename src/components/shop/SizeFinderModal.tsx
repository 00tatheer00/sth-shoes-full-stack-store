'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, Ruler, RefreshCw } from 'lucide-react';

interface SizeFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize: (size: number) => void;
}

export const SizeFinderModal: React.FC<SizeFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
}) => {
  const [step, setStep] = useState(1);
  const [shoeSizeUS, setShoeSizeUS] = useState<number>(9);
  const [footWidth, setFootWidth] = useState<'normal' | 'wide'>('normal');
  const [sockPreference, setSockPreference] = useState<'barefoot' | 'socks'>('socks');

  if (!isOpen) return null;

  const recommendedEU = Math.min(46, Math.max(39, Math.round(shoeSizeUS + 33)));

  const handleFinish = () => {
    onSelectSize(recommendedEU);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A1128]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#F8FAFC] max-w-lg w-full border-2 border-[#2563EB] shadow-2xl p-6 sm:p-8 space-y-6 relative text-[#0F172A]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-[#EF4444] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#2563EB] font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" /> Interactive Atelier Sizer
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#0F172A]">
            Find Your Perfect Peshawari Fit
          </h2>
          <p className="text-xs text-slate-600 font-sans">
            Handmade leather stretches gracefully. Answer 3 quick questions for bespoke sizing.
          </p>
        </div>

        {/* Wizard Steps */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-xs font-mono uppercase font-bold text-[#0F172A] text-center">
              1. What is your usual US Sneaker Size? ({shoeSizeUS})
            </label>
            <div className="grid grid-cols-6 gap-2">
              {[7, 8, 9, 10, 11, 12].map((s) => (
                <button
                  key={s}
                  onClick={() => setShoeSizeUS(s)}
                  className={`py-3 text-xs font-mono font-bold border transition-all ${
                    shoeSizeUS === s
                      ? 'bg-[#2563EB] text-white border-[#00F0FF] shadow-lg scale-105'
                      : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#2563EB]'
                  }`}
                >
                  US {s}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-[#0A1128] text-white text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#2563EB] flex items-center justify-center gap-2 mt-4 shadow-md"
            >
              Next Step <ArrowRight className="w-4 h-4 text-[#00F0FF]" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <label className="block text-xs font-mono uppercase font-bold text-[#0F172A] text-center">
              2. How do you plan to wear your Peshawari Chappal?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSockPreference('socks')}
                className={`p-4 text-xs font-serif text-center border transition-all ${
                  sockPreference === 'socks'
                    ? 'bg-[#2563EB] text-white border-[#00F0FF] shadow-lg'
                    : 'bg-white text-[#0F172A] border-[#E2E8F0]'
                }`}
              >
                <div className="font-bold text-sm">With Shalwar Kameez Socks</div>
                <div className="text-[10px] text-[#F59E0B] font-mono mt-1">Standard Traditional Fit</div>
              </button>

              <button
                onClick={() => setSockPreference('barefoot')}
                className={`p-4 text-xs font-serif text-center border transition-all ${
                  sockPreference === 'barefoot'
                    ? 'bg-[#2563EB] text-white border-[#00F0FF] shadow-lg'
                    : 'bg-white text-[#0F172A] border-[#E2E8F0]'
                }`}
              >
                <div className="font-bold text-sm">Barefoot / Summer</div>
                <div className="text-[10px] text-[#F59E0B] font-mono mt-1">Snug Leather Mold</div>
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 bg-gray-200 text-xs font-serif text-gray-800 uppercase"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 bg-[#0A1128] text-white text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#2563EB] flex items-center justify-center gap-2 shadow-md"
              >
                Calculate Fit <Sparkles className="w-4 h-4 text-[#00F0FF]" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-4">
            <div className="p-6 bg-white border-2 border-[#2563EB] shadow-xl space-y-2">
              <span className="text-[10px] font-mono text-[#2563EB] uppercase font-bold tracking-widest">
                Recommended Peshawari Size
              </span>
              <div className="text-4xl font-serif font-bold text-[#0F172A]">
                EU {recommendedEU}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Full-grain leather molds comfortably to your foot arch within 2-3 wears.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 bg-gray-200 text-xs font-serif text-gray-800 uppercase flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-3.5 bg-[#2563EB] text-white text-xs font-serif font-bold uppercase tracking-widest hover:bg-[#0A1128] hover:text-[#00F0FF] transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4" /> Select Size EU {recommendedEU}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
