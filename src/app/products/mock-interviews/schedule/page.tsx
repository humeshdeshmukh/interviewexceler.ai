'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/products/mock-interviews" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaArrowLeft className="w-5 h-5 mr-2" />
            Back to Mock Interviews
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6"
          >
            <FaCalendarAlt className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
          >
            Schedule Your Interview
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
          >
            Choose your preferred scheduling method
          </motion.p>
        </div>

        {/* Scheduling Options */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Instant Booking */}
          <Link href="/products/mock-interviews/schedule/instant-booking">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 cursor-pointer group"
            >
              <div className="p-4 rounded-full bg-[#fcba28]/20 inline-block mb-6">
                <FaClock className="w-6 h-6 text-[#fcba28]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Instant Booking</h2>
              <p className="text-gray-400 mb-6">
                Schedule your interview immediately with our available experts. Choose your preferred time slot and get started right away.
              </p>
              <div className="flex items-center text-[#fcba28] group-hover:gap-2 transition-all duration-200">
                Book Now
                <FaArrowRight className="ml-2" />
              </div>
            </motion.div>
          </Link>

          {/* Manual Scheduling */}
          <Link href="/products/mock-interviews/schedule/manual-booking">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 cursor-pointer group"
            >
              <div className="p-4 rounded-full bg-[#fcba28]/20 inline-block mb-6">
                <FaUser className="w-6 h-6 text-[#fcba28]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Manual Scheduling</h2>
              <p className="text-gray-400 mb-6">
                Submit your preferred time slots and requirements. Our team will contact you to arrange the perfect interview session.
              </p>
              <div className="flex items-center text-[#fcba28] group-hover:gap-2 transition-all duration-200">
                Request Schedule
                <FaArrowRight className="ml-2" />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
