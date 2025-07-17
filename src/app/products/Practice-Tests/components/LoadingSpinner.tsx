"use client";

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <motion.div
      className="relative w-12 h-12"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 border-4 border-[#fcba28]/20 rounded-full" />
      <div className="absolute inset-0 border-4 border-transparent border-t-[#fcba28] rounded-full" />
    </motion.div>
  );
}
