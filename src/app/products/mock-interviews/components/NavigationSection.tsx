"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const NavigationSection = () => {
  return (
    <motion.nav 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-y border-white/10 mb-16"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-8 items-center overflow-x-auto hide-scrollbar">
            <Link href="/products/mock-interviews/schedule">
              <button className="group relative px-4 py-2 overflow-hidden rounded-lg">
                <div className="absolute inset-0 w-3 bg-[#fcba28] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative text-sm font-medium text-white group-hover:text-black">Schedule Interview</span>
              </button>
            </Link>
            
            <Link href="/products/mock-interviews/visual-simulation">
              <button className="group relative px-4 py-2 overflow-hidden rounded-lg">
                <div className="absolute inset-0 w-3 bg-[#b2be10] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative text-sm font-medium text-white group-hover:text-black">Start Simulation</span>
              </button>
            </Link>
            
            <Link href="/products/mock-interviews/tips">
              <button className="group relative px-4 py-2 overflow-hidden rounded-lg">
                <div className="absolute inset-0 w-3 bg-[#1c6bff] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative text-sm font-medium text-white group-hover:text-black">Interview Tips</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
