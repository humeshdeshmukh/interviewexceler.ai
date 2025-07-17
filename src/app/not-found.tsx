'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { FaHome, FaSearch } from 'react-icons/fa';

export default function NotFound() {
  return (
    <MaxWidthWrapper>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* 404 Text */}
          <motion.h1 
            className="text-9xl font-bold text-[#fcba28]"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2 
            }}
          >
            404
          </motion.h1>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Oops! The page you're looking for seems to have taken a coffee break. 
              Let's get you back on track.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-[#fcba28] text-background hover:bg-[#fcba28]/90 transition-colors"
              >
                <FaHome className="text-lg" />
                Back to Home
              </motion.button>
            </Link>
            <Link href="/search">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-transparent border-2 border-[#fcba28] text-[#fcba28] hover:bg-[#fcba28] hover:text-background transition-all"
              >
                <FaSearch className="text-lg" />
                Search Site
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute inset-0 -z-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#fcba28]/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 w-[700px] h-[700px] bg-[#fcba28]/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </MaxWidthWrapper>
  );
}