'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface StatsCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    loading?: boolean;
    trend?: {
        direction: 'up' | 'down' | 'neutral';
        value: string;
    };
    subtitle?: string;
}

export function StatsCard({
    icon: Icon,
    label,
    value,
    loading,
    trend,
    subtitle,
}: StatsCardProps) {
    if (loading) {
        return (
            <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-700/50 animate-pulse">
                <div className="h-20" />
            </div>
        );
    }

    return (
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-[#fcba28]/20 hover:border-[#fcba28]/40 transition-all duration-300">
            {/* Icon and Trend */}
            <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-lg bg-[#fcba28]/10 border border-[#fcba28]/20">
                    <Icon className="w-5 h-5 text-[#fcba28]" />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${trend.direction === 'up'
                            ? 'bg-green-500/10 text-green-400'
                            : trend.direction === 'down'
                                ? 'bg-red-500/10 text-red-400'
                                : 'bg-gray-500/10 text-gray-400'
                        }`}>
                        {trend.direction === 'up' && <ArrowUp className="w-3 h-3" />}
                        {trend.direction === 'down' && <ArrowDown className="w-3 h-3" />}
                        {trend.direction === 'neutral' && <Minus className="w-3 h-3" />}
                        {trend.value}
                    </div>
                )}
            </div>

            {/* Label */}
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                {label}
            </p>

            {/* Value */}
            <p className="text-3xl font-bold text-white">
                {value}
            </p>
            {subtitle && (
                <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
        </div>
    );
}
