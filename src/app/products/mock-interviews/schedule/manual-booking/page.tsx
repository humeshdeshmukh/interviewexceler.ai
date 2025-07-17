'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { ManualBookingForm } from './components/ManualBookingForm';

export default function ManualBookingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    alternateDate: '',
    alternateTime: '',
    interviewType: '',
    currentRole: '',
    targetRole: '',
    experience: '',
    specialRequirements: '',
    timezone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setReferenceNumber('MAN-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
            href="/products/mock-interviews/schedule" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaArrowLeft className="w-5 h-5 mr-2" />
            Back to Schedule Options
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
            Manual Interview Request
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
          >
            Submit your preferred interview times and requirements. Our team will contact you within 24 hours.
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <ManualBookingForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            formData={formData}
            setFormData={setFormData}
            isSubmitted={isSubmitted}
            referenceNumber={referenceNumber}
          />
        </div>
      </div>
    </div>
  );
}
