"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaBrain, FaRobot } from "react-icons/fa6";

export const AptitudeHero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center gap-4 text-4xl text-[#fcba28] mb-8"
      >
        <FaBrain className="animate-pulse" />
        <FaRobot className="animate-bounce" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fcba28] to-[#ffd700] mb-6"
      >
        AI-Powered Aptitude Training
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-xl text-gray-300 max-w-2xl mb-12"
      >
        Enhance your aptitude skills with our advanced AI-driven practice platform.
        Choose between standard practice and personalized AI tests.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          href="/products/aptitude-ai/standard"
          className="px-8 py-4 bg-[#fcba28] text-black rounded-full font-semibold hover:bg-[#ffd700] transition-colors"
        >
          Standard Practice
        </Link>
        <Link
          href="/products/aptitude-ai/personalized"
          className="px-8 py-4 bg-transparent border border-[#fcba28] text-[#fcba28] rounded-full font-semibold hover:bg-[#fcba28]/10 transition-colors"
        >
          Personalized Test
        </Link>
      </motion.div>
    </div>
  );
};
