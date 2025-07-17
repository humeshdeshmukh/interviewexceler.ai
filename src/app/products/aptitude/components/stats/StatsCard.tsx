'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-[#fcba28]',
}: StatsCardProps) {
  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-white/60">{title}</h3>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {change && <p className="text-sm text-white/40 mt-1">{change}</p>}
    </div>
  );
}
