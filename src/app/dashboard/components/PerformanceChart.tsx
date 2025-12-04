'use client';

import React, { useEffect } from 'react';
import { ResponsiveContainer, AreaChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface PerformanceChartProps {
    data: any[];
    type: 'line' | 'bar';
    title: string;
    dataKey: string;
    xAxisKey: string;
    loading?: boolean;
    height?: number;
}

export function PerformanceChart({
    data,
    type,
    title,
    dataKey,
    xAxisKey,
    loading,
    height = 280,
}: PerformanceChartProps) {
    // Debug logging
    useEffect(() => {
        if (data && data.length > 0) {
            console.log(`📊 ${title} data:`, data);
        }
    }, [data, title]);

    if (loading) {
        return (
            <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-700/50 animate-pulse">
                <div style={{ height: height }} />
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="p-5 rounded-xl bg-zinc-900/80 border border-[#fcba28]/20">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-[#fcba28]" />
                    <h3 className="text-sm font-medium text-white">{title}</h3>
                </div>
                <div style={{ height: height - 60 }} className="flex items-center justify-center">
                    <p className="text-gray-500 text-sm">No data available - complete more sessions!</p>
                </div>
            </div>
        );
    }

    // Custom tooltip for better score display
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            // Get the actual score value from the payload
            // For line chart: uses 'score' key, for bar chart: uses 'avgScore' key
            const payloadItem = payload[0];
            const item = payloadItem.payload;

            // Get the actual score value - try multiple possible keys
            const scoreValue = item.score ?? item.avgScore ?? payloadItem.value ?? 0;

            // Debug logging
            console.log('🎯 Tooltip Data:', {
                payloadValue: payloadItem.value,
                payloadDataKey: payloadItem.dataKey,
                itemScore: item.score,
                itemAvgScore: item.avgScore,
                fullItem: item,
                finalScoreValue: scoreValue
            });

            return (
                <div className="bg-zinc-900 border border-[#fcba28] rounded-lg p-3 shadow-lg">
                    <p className="text-[#fcba28] font-medium text-sm">{item.label || item.goal || label}</p>
                    <p className="text-white text-lg font-bold">Score: {Math.round(scoreValue)}/100</p>
                    {item.date && <p className="text-gray-400 text-xs">{item.date}</p>}
                    {item.count && <p className="text-gray-400 text-xs">{item.count} questions</p>}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-[#fcba28]/20 hover:border-[#fcba28]/40 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#fcba28]" />
                    <h3 className="text-sm font-medium text-white">{title}</h3>
                </div>
                <span className="text-xs text-gray-500">{data.length} entries</span>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={height}>
                {type === 'line' ? (
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#fcba28" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#fcba28" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.5} />
                        <XAxis
                            dataKey={xAxisKey}
                            stroke="#666"
                            fontSize={11}
                            tick={{ fill: '#888' }}
                        />
                        <YAxis
                            stroke="#666"
                            fontSize={11}
                            tick={{ fill: '#888' }}
                            domain={[0, 100]}
                            ticks={[0, 25, 50, 75, 100]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey={dataKey}
                            stroke="#fcba28"
                            strokeWidth={2}
                            fill="url(#colorGradient)"
                            dot={{ fill: '#fcba28', r: 5, strokeWidth: 0 }}
                            activeDot={{ r: 7, fill: '#fcba28' }}
                        />
                    </AreaChart>
                ) : (
                    <BarChart data={data}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#fcba28" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#fcba28" stopOpacity={0.6} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.5} />
                        <XAxis
                            dataKey={xAxisKey}
                            stroke="#666"
                            fontSize={10}
                            tick={{ fill: '#888' }}
                            interval={0}
                            angle={-15}
                            textAnchor="end"
                        />
                        <YAxis
                            stroke="#666"
                            fontSize={11}
                            tick={{ fill: '#888' }}
                            domain={[0, 100]}
                            ticks={[0, 25, 50, 75, 100]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                            dataKey={dataKey}
                            fill="url(#barGradient)"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}
