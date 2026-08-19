'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';

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
  const [sockPreference, setSockPreference] = useState<'barefoot' | 'socks'>('socks');

  if (!isOpen) return null;

  const recommendedEU = Math.min(46, Math.max(39, Math.round(shoeSizeUS + 33)));

  const handleFinish = () => {
    onSelectSize(recommendedEU);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white max-w-lg w-full border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 relative text-slate-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-xs uppercase tracking-wider text-blue-600 font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" /> Interactive Size Calculator
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Find Your Perfect Fit
          </h2>
          <p className="text-xs text-slate-500">
            Handmade leather stretches gracefully. Answer 2 quick questions for optimal sizing.
          </p>
        </div>

        {/* Wizard Steps */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase text-slate-700 text-center">
              1. What is your usual US Sneaker Size? (US {shoeSizeUS})
            </label>
            <div className="grid grid-cols-6 gap-2">
              {[7, 8, 9, 10, 11, 12].map((s) => (
                <button
                  key={s}
                  onClick={() => setShoeSizeUS(s)}
                  className={`py-3 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                    shoeSizeUS === s
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs scale-105'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  US {s}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 mt-4 shadow-xs transition-colors cursor-pointer"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase text-slate-700 text-center">
              2. How do you plan to wear your Peshawari Chappal?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSockPreference('socks')}
                className={`p-4 text-xs text-center rounded-xl border transition-all cursor-pointer ${
                  sockPreference === 'socks'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sm">With Socks</div>
                <div className={`text-[10px] mt-1 ${sockPreference === 'socks' ? 'text-slate-300' : 'text-slate-500'}`}>Standard Traditional Fit</div>
              </button>

              <button
                onClick={() => setSockPreference('barefoot')}
                className={`p-4 text-xs text-center rounded-xl border transition-all cursor-pointer ${
                  sockPreference === 'barefoot'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sm">Barefoot / Summer</div>
                <div className={`text-[10px] mt-1 ${sockPreference === 'barefoot' ? 'text-slate-300' : 'text-slate-500'}`}>Snug Leather Mold</div>
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 rounded-xl"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                Calculate Fit <Sparkles className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-4">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-2xs space-y-2">
              <span className="text-xs text-blue-600 uppercase font-bold tracking-wider">
                Recommended Peshawari Size
              </span>
              <div className="text-4xl font-extrabold text-slate-900">
                EU {recommendedEU}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Full-grain leather molds comfortably to your foot arch within 2-3 wears.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 rounded-xl flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
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
