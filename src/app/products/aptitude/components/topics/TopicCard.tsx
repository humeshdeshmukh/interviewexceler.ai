'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Topic } from '../../types';

interface TopicCardProps extends Topic {
  index: number;
}

export function TopicCard({
  id,
  title,
  description,
  icon: Icon,
  color,
  questions,
  avgTime,
  index,
}: TopicCardProps) {
  return (
    <Link href={`/products/aptitude/practice/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 cursor-pointer"
      >
        <div className={`p-3 rounded-xl ${color} w-fit`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-white/60">{description}</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-white/40">
          <div className="flex items-center gap-1">
            <span className="text-[#fcba28]">{questions}</span> questions
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#fcba28]">{avgTime}</span> avg. time
          </div>
        </div>
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-[#fcba28] opacity-0 transition-opacity group-hover:opacity-100"
          initial={false}
          animate={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </Link>
  );
}
