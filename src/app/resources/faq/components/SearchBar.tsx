'use client';

import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative max-w-2xl mx-auto"
    >
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search FAQs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50 focus:border-[#fcba28] transition-all duration-300 shadow-lg shadow-black/5"
      />
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#fcba28]/20 via-purple-500/20 to-[#fcba28]/20"
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
}
