"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const CTACallToActionSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-16 text-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#fcba28]">
          Ready to Begin Your Interview Journey?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/products/mock-interviews/schedule">
            <button className="px-8 py-3 bg-gradient-to-r from-[#fcba28] to-amber-600 text-black rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
              Schedule Interview
            </button>
          </Link>
          <Link href="/products/mock-interviews/visual-simulation">
            <button className="px-8 py-3 bg-gradient-to-r from-[#b2be10] to-green-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
              Start Simulation
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};
