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
    <div className="bg-white border border-[#E2D7C7] p-5 shadow-xs flex flex-col justify-between space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-[#4A2E1D]/70 font-bold">
          {title}
        </span>
        <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E2D7C7] flex items-center justify-center text-[#B87546]">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="text-2xl font-serif font-bold text-[#1F130E]">{value}</div>
        {change && (
          <div
            className={`text-[11px] font-mono font-bold mt-1 ${
              isPositive ? 'text-green-700' : 'text-red-600'
            }`}
          >
            {change} <span className="text-[#4A2E1D]/60 font-normal">vs last month</span>
          </div>
        )}
        {subtitle && <p className="text-[11px] text-[#4A2E1D]/60 font-sans mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
};
