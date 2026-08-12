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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { formatPKR } from '@/lib/utils';

interface AnalyticsChartsProps {
  revenueData: { month: string; revenue: number; orders: number }[];
  cityData: { city: string; count: number }[];
  topProducts: { name: string; salesCount: number; revenue: number }[];
}

const COLORS = ['#4A2E1D', '#B87546', '#C59B27', '#5C1D24', '#1F130E'];

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  revenueData,
  cityData,
  topProducts,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Revenue Over Time Chart */}
      <div className="lg:col-span-8 bg-white border border-[#E2D7C7] p-6 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-[#E2D7C7] pb-3">
          <div>
            <h3 className="text-base font-serif font-bold text-[#1F130E]">Revenue Growth Trend</h3>
            <p className="text-xs text-[#4A2E1D]/70 font-mono">Monthly sales volume in PKR</p>
          </div>
          <span className="text-xs font-mono text-green-700 bg-green-50 px-2.5 py-1 border border-green-200">
            +32% Growth
          </span>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4A2E1D" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4A2E1D" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2D7C7" />
              <XAxis dataKey="month" stroke="#4A2E1D" fontSize={12} />
              <YAxis
                stroke="#4A2E1D"
                fontSize={12}
                tickFormatter={(v) => `Rs.${v / 1000}k`}
              />
              <Tooltip
                formatter={(value: any) => [formatPKR(Number(value)), 'Revenue']}
                contentStyle={{ backgroundColor: '#1F130E', color: '#FAF7F2', borderColor: '#C59B27' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#C59B27" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* City-Wise Orders Breakdown */}
      <div className="lg:col-span-4 bg-white border border-[#E2D7C7] p-6 shadow-xs space-y-4">
        <div className="border-b border-[#E2D7C7] pb-3">
          <h3 className="text-base font-serif font-bold text-[#1F130E]">Top Delivery Hubs</h3>
          <p className="text-xs text-[#4A2E1D]/70 font-mono">City-wise order volume</p>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2D7C7" />
              <XAxis type="number" stroke="#4A2E1D" fontSize={12} />
              <YAxis dataKey="city" type="category" stroke="#4A2E1D" fontSize={11} width={80} />
              <Tooltip contentStyle={{ backgroundColor: '#1F130E', color: '#FAF7F2' }} />
              <Bar dataKey="count" fill="#B87546" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
