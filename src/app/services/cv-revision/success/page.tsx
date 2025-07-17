"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaFileAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function CVRevisionSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/services/cv-revision');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full text-center border border-white/10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-[#fcba28]/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <FaFileAlt className="w-10 h-10 text-[#fcba28]" />
        </motion.div>

        <h1 className="text-2xl font-bold text-white mb-4">
          CV Revision Request Submitted!
        </h1>

        <p className="text-gray-300 mb-6">
          Thank you for choosing our CV revision service. We have received your request and will begin working on your CV shortly. You will receive a confirmation email with further details.
        </p>

        <div className="text-sm text-gray-400">
          Redirecting you back in a few seconds...
        </div>
      </motion.div>
    </div>
  );
}
