"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileAlt, FaUser, FaEnvelope, FaPhone, FaUserTie, FaCalendarAlt, FaClock, FaCheckCircle, FaArrowRight, FaLinkedin, FaGithub, FaBriefcase, FaIndustry } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { InlineSpinner } from '@/app/components/InlineSpinner';
import { ErrorPopup } from '@/app/components/ErrorPopup';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  package: string;
  industry: string;
  experience: string;
  currentJobTitle: string;
  targetJobTitle: string;
  additionalNotes: string;
  linkedinUrl?: string;
  githubUrl?: string;
  cvUrl: string;
}

export default function CVRevisionProfessionalPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('basic');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    package: 'basic',
    industry: '',
    experience: '',
    currentJobTitle: '',
    targetJobTitle: '',
    additionalNotes: '',
    linkedinUrl: '',
    githubUrl: '',
    cvUrl: ''
  });

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Manufacturing',
    'Retail',
    'Consulting',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'industry', 'experience', 'currentJobTitle', 'targetJobTitle', 'cvUrl'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const dataToSend = {
        ...formData,
        package: selectedPlan
      };

      const response = await fetch('/api/send-cv-revision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit CV revision request');
      }

      toast.success('Your CV revision request has been submitted successfully!');
      setIsSubmitted(true);
      
      // Navigate after a short delay to show the success message
      setTimeout(() => {
        router.push('/services/cv-revision/success');
      }, 2000);
    } catch (err) {
      console.error('Form submission error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit request. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-background p-6 rounded-lg shadow-xl border border-[#fcba28]/20 text-center">
              <InlineSpinner />
              <p className="mt-4 text-white">Submitting your request...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-amber-900/30 mb-6"
          >
            <FaFileAlt className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">Professional CV Revision</h1>
          <p className="text-gray-400 text-lg">Get your CV reviewed and optimized by our experts</p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Basic Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedPlan === 'basic'
                ? 'border-[#fcba28] bg-white/10'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => {
              setSelectedPlan('basic');
              setFormData(prev => ({ ...prev, package: 'basic' }));
            }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Basic Review</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-300">
                <FaCheckCircle className="text-[#fcba28] mr-2" />
                Detailed CV Analysis
              </li>
              <li className="flex items-center text-gray-300">
                <FaCheckCircle className="text-[#fcba28] mr-2" />
                Format Optimization
              </li>
              <li className="flex items-center text-gray-300">
                <FaCheckCircle className="text-[#fcba28] mr-2" />
                Content Suggestions
              </li>
            </ul>
            <p className="text-2xl font-bold text-white">$2</p>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedPlan === 'premium'
                ? 'border-[#fcba28] bg-white/10'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => {
              setSelectedPlan('premium');
              setFormData(prev => ({ ...prev, package: 'premium' }));
            }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Premium Review</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-300">
                <FaCheckCircle className="text-[#fcba28] mr-2" />
                All Basic Features
              </li>
              <li className="flex items-center text-gray-300">
                <FaCheckCircle className="text-[#fcba28] mr-2" />
                ATS Optimization
              </li>
              <li className="flex items-center text-gray-300">
                <FaCheckCircle className="text-[#fcba28] mr-2" />
                2 Revision Rounds
              </li>
              <li className="flex items-center text-gray-300">
                <FaCheckCircle className="text-[#fcba28] mr-2" />
                LinkedIn Profile Review
              </li>
            </ul>
            <p className="text-2xl font-bold text-white">$5</p>
          </motion.div>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fcba28]"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fcba28]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fcba28]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Industry</label>
                <div className="relative">
                  <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fcba28]"
                    required
                  >
                    <option value="">Select Industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry.toLowerCase()}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Experience Level</label>
                <div className="relative">
                  <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fcba28]"
                    required
                  >
                    <option value="">Select Experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Current Job Title</label>
                <div className="relative">
                  <FaUserTie className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="currentJobTitle"
                    value={formData.currentJobTitle}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fcba28]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Target Job Title</label>
                <div className="relative">
                  <FaUserTie className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="targetJobTitle"
                    value={formData.targetJobTitle}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fcba28]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">LinkedIn Profile</label>
                <div className="relative">
                  <FaLinkedin className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fcba28]"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">GitHub Profile</label>
                <div className="relative">
                  <FaGithub className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fcba28]"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>
            </div>

            {/* CV Link */}
            <div>
              <label className="block text-gray-300 mb-2">CV Link (Google Drive, Dropbox, etc.)</label>
              <div className="relative">
                <FaFileAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="url"
                  name="cvUrl"
                  value={formData.cvUrl}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fcba28]"
                  required
                  placeholder="https://drive.google.com/..."
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-gray-300 mb-2">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fcba28] min-h-[100px]"
                placeholder="Any specific areas you'd like us to focus on?"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || isSubmitted}
              className={`w-full py-3 px-6 rounded-lg bg-[#fcba28] text-black font-semibold hover:bg-[#fcba28]/90 transition-colors flex items-center justify-center gap-2 group ${
                (isLoading || isSubmitted) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <InlineSpinner className="w-5 h-5" />
                  <span>Processing...</span>
                </>
              ) : isSubmitted ? (
                <>
                  <FaCheckCircle className="w-5 h-5" />
                  <span>Request Submitted</span>
                </>
              ) : (
                <>
                  <span>Submit Request</span>
                  <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
