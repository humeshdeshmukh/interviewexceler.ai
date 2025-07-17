"use client";

import { motion } from 'framer-motion';
import { FaUserTie, FaCalendarAlt, FaClock, FaVideo, FaPhone, FaDollarSign, FaBriefcase, FaArrowRight, FaArrowLeft, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FormData, PackageType } from '@/app/types/salary-negotiation';
import { validateForm } from '@/app/utils/form-validation';

interface NegotiationFormProps {
  formData: FormData;
  selectedPackage: PackageType;
  onFormChange: (field: keyof FormData, value: string) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
}

export function NegotiationForm({ formData, selectedPackage, onFormChange, onBack, onSubmit, error }: NegotiationFormProps) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="max-w-7xl mx-auto"
    >
      <form onSubmit={onSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-6 text-[#fcba28]">Personal Information</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <div className="relative">
                    <FaUserTie className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => onFormChange('fullName', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-colors duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => onFormChange('email', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-colors duration-300"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => onFormChange('phone', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-colors duration-300"
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-6 text-[#fcba28]">Career Information</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Current Role</label>
                    <div className="relative">
                      <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.currentRole}
                        onChange={(e) => onFormChange('currentRole', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-colors duration-300"
                        placeholder="Software Engineer"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Years of Experience</label>
                    <div className="relative">
                      <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={formData.yearsOfExperience}
                        onChange={(e) => onFormChange('yearsOfExperience', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-colors duration-300"
                        placeholder="5"
                        min="0"
                        step="1"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Target Role</label>
                    <div className="relative">
                      <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.targetRole}
                        onChange={(e) => onFormChange('targetRole', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-colors duration-300"
                        placeholder="Senior Engineer"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Current Company</label>
                    <div className="relative">
                      <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.currentCompany}
                        onChange={(e) => onFormChange('currentCompany', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-colors duration-300"
                        placeholder="Company Name"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Current Salary</label>
                    <div className="relative">
                      <FaDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={formData.currentSalary}
                        onChange={(e) => onFormChange('currentSalary', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-colors duration-300"
                        placeholder="75000"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Target Salary</label>
                    <div className="relative">
                      <FaDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={formData.targetSalary}
                        onChange={(e) => onFormChange('targetSalary', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-colors duration-300"
                        placeholder="90000"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-6 text-[#fcba28]">Scheduling</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Date</label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => onFormChange('preferredDate', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-colors duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Time</label>
                    <div className="relative">
                      <FaClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => onFormChange('preferredTime', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-colors duration-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Communication Preference</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => onFormChange('communicationPreference', 'video')}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300
                        ${formData.communicationPreference === 'video'
                          ? 'bg-[#fcba28] text-black'
                          : 'bg-white/5 text-white hover:bg-white/10'
                        }
                      `}
                    >
                      <FaVideo />
                      Video Call
                    </button>
                    <button
                      type="button"
                      onClick={() => onFormChange('communicationPreference', 'phone')}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300
                        ${formData.communicationPreference === 'phone'
                          ? 'bg-[#fcba28] text-black'
                          : 'bg-white/5 text-white hover:bg-white/10'
                        }
                      `}
                    >
                      <FaPhone />
                      Phone Call
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-6 text-[#fcba28]">Additional Information</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn Profile (Optional)</label>
                  <div className="relative">
                    <FaLinkedin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => onFormChange('linkedin', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-colors duration-300"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Additional Notes (Optional)</label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => onFormChange('additionalNotes', e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-colors duration-300"
                    placeholder="Any specific topics you'd like to discuss..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors duration-300"
          >
            <FaArrowLeft className="text-sm" />
            Back
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#fcba28] text-black hover:bg-[#fcd978] transition-colors duration-300"
          >
            Continue
            <FaArrowRight className="text-sm" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
