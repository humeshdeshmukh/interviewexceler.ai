'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { timezones, experienceLevels } from '@/utils/manualScheduling';

interface ManualBookingFormProps {
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string;
  formData: {
    name: string;
    email: string;
    phone: string;
    preferredDate: string;
    preferredTime: string;
    alternateDate: string;
    alternateTime: string;
    interviewType: string;
    currentRole: string;
    targetRole: string;
    experience: string;
    specialRequirements: string;
    timezone: string;
  };
  setFormData: (data: any) => void;
  isSubmitted: boolean;
  referenceNumber: string;
}

export const ManualBookingForm: React.FC<ManualBookingFormProps> = ({
  onSubmit,
  isLoading,
  error,
  formData,
  setFormData,
  isSubmitted,
  referenceNumber,
}) => {
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 p-8 rounded-2xl text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#fcba28]/20 flex items-center justify-center">
          <FaCheckCircle className="w-8 h-8 text-[#fcba28]" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Request Received!</h2>
        <p className="text-gray-400 mb-6">
          Thank you for your interview request. Our team will contact you within 24 hours to confirm your schedule.
        </p>
        <div className="bg-white/5 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-[#fcba28] mb-2">Reference Number</h3>
          <p className="text-white font-mono">{referenceNumber}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-500 text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Preferred Date</label>
          <input
            type="date"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Preferred Time</label>
          <input
            type="time"
            value={formData.preferredTime}
            onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Alternate Date</label>
          <input
            type="date"
            value={formData.alternateDate}
            onChange={(e) => setFormData({ ...formData, alternateDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Alternate Time</label>
          <input
            type="time"
            value={formData.alternateTime}
            onChange={(e) => setFormData({ ...formData, alternateTime: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Current Role</label>
          <input
            type="text"
            value={formData.currentRole}
            onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Target Role</label>
          <input
            type="text"
            value={formData.targetRole}
            onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Experience Level</label>
          <select
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          >
            <option value="">Select Experience</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Timezone</label>
          <select
            value={formData.timezone}
            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          >
            <option value="">Select Timezone</option>
            {timezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Special Requirements</label>
        <textarea
          value={formData.specialRequirements}
          onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
          rows={4}
          placeholder="Any specific requirements or preferences..."
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Request'
          )}
        </button>
      </div>
    </motion.form>
  );
};
