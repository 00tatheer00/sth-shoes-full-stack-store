'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  subtitle?: string;
  accentColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtitle,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-3 hover:border-slate-300 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
          <Icon className="w-4 h-4 text-slate-700" />
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold text-slate-900 tracking-tight">{value}</div>
        {change && (
          <div
            className={`text-xs font-semibold mt-1 flex items-center gap-1 ${
              isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            <span>{change}</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        )}
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};
