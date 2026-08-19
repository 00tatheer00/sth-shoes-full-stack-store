'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { formatPKR } from '@/lib/utils';

interface AnalyticsChartsProps {
  revenueData: { month: string; revenue: number; orders: number }[];
  cityData: { city: string; count: number }[];
  topProducts: { name: string; salesCount: number; revenue: number }[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  revenueData,
  cityData,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Revenue Over Time Chart */}
      <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Revenue Growth Trend</h3>
            <p className="text-xs text-slate-500 font-sans">Monthly sales volume across Pakistan</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            +32% vs Q3
          </span>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `Rs.${v / 1000}k`}
              />
              <Tooltip
                formatter={(value: any) => [formatPKR(Number(value)), 'Revenue']}
                contentStyle={{
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* City-Wise Orders Breakdown */}
      <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">Regional Delivery Hubs</h3>
          <p className="text-xs text-slate-500 font-sans">City-wise order concentration</p>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cityData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
              <YAxis dataKey="city" type="category" stroke="#64748B" fontSize={11} width={80} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
