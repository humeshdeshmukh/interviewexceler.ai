"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCheckCircle, FaCalendarAlt, FaClock, FaVideo, FaPhone, FaDollarSign, FaBriefcase } from 'react-icons/fa';
import { FormData, PackageType } from '@/app/types/salary-negotiation';
import { PACKAGES } from '@/app/constants/salary-negotiation';

interface ConfirmationProps {
  formData: FormData;
  selectedPackage: PackageType;
}

export function Confirmation({ formData, selectedPackage }: ConfirmationProps) {
  const selectedPackageDetails = PACKAGES[selectedPackage];

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#fcba28]/20 flex items-center justify-center"
      >
        <FaCheckCircle className="w-10 h-10 text-[#fcba28]" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-4"
      >
        Booking Confirmed!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 mb-8"
      >
        Thank you for choosing our {selectedPackageDetails.name} package. We'll be in touch shortly with further details.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8"
      >
        <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <div className="flex items-center gap-3">
              <FaBriefcase className="text-[#fcba28]" />
              <span className="text-gray-400">Package</span>
            </div>
            <span className="font-semibold">{selectedPackageDetails.name}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-[#fcba28]" />
              <span className="text-gray-400">Date</span>
            </div>
            <span className="font-semibold">{formData.preferredDate}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <div className="flex items-center gap-3">
              <FaClock className="text-[#fcba28]" />
              <span className="text-gray-400">Time</span>
            </div>
            <span className="font-semibold">{formData.preferredTime}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              {formData.communicationPreference === 'video' ? (
                <FaVideo className="text-[#fcba28]" />
              ) : (
                <FaPhone className="text-[#fcba28]" />
              )}
              <span className="text-gray-400">Meeting Type</span>
            </div>
            <span className="font-semibold capitalize">{formData.communicationPreference} Call</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        <Link
          href="/dashboard"
          className="px-8 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-colors duration-300"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/"
          className="text-gray-400 hover:text-white transition-colors duration-300"
        >
          Return to Home
        </Link>
      </motion.div>
    </motion.div>
  );
}
