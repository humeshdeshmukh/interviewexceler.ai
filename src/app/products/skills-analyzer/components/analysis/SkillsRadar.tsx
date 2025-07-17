'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../constants/theme';
import type { AnalysisResult } from '../../services/skill-analyzer';

interface SkillsRadarProps {
  result: AnalysisResult;
}

export const SkillsRadar: React.FC<SkillsRadarProps> = ({ result }) => {
  const categories = Object.keys(result.categoryScores);
  const numCategories = categories.length;
  const angleStep = (2 * Math.PI) / numCategories;
  const size = 300;
  const radius = size / 2;
  const center = { x: radius, y: radius };

  // Calculate points for the radar chart
  const getPoint = (angle: number, value: number) => {
    const distance = (value / 100) * radius;
    return {
      x: center.x + distance * Math.cos(angle - Math.PI / 2),
      y: center.y + distance * Math.sin(angle - Math.PI / 2)
    };
  };

  // Generate path for the radar shape
  const points = categories.map((category, i) => {
    const angle = i * angleStep;
    return getPoint(angle, result.categoryScores[category]);
  });

  const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} Z`;

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
          <circle
            key={i}
            cx={center.x}
            cy={center.y}
            r={radius * scale}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Category axes */}
        {categories.map((_, i) => {
          const angle = i * angleStep;
          const end = getPoint(angle, 100);
          return (
            <line
              key={i}
              x1={center.x}
              y1={center.y}
              x2={end.x}
              y2={end.y}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Radar shape */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          d={pathData}
          fill={`${theme.colors.primary.main}20`}
          stroke={theme.colors.primary.main}
          strokeWidth="2"
        />

        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            initial={{ r: 0 }}
            animate={{ r: 4 }}
            transition={{ delay: 1 + i * 0.1 }}
            cx={point.x}
            cy={point.y}
            fill={theme.colors.primary.main}
          />
        ))}
      </svg>

      {/* Category labels */}
      {categories.map((category, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const labelDistance = radius * 1.2;
        const x = center.x + labelDistance * Math.cos(angle);
        const y = center.y + labelDistance * Math.sin(angle);
        
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 + i * 0.1 }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-gray-300"
            style={{
              left: x,
              top: y,
              transform: `translate(-50%, -50%) rotate(${angle * (180 / Math.PI)}deg)`
            }}
          >
            {category}
          </motion.div>
        );
      })}
    </div>
  );
};
