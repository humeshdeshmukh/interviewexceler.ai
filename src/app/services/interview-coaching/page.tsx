"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaRobot, FaUserTie, FaChartLine, FaUsers, FaTrophy, FaCheckCircle } from 'react-icons/fa';

export function InterviewCoachingPage() {
  const stats = [
    { label: 'Success Rate', value: '94%', icon: FaChartLine },
    { label: 'Students Coached', value: '10,000+', icon: FaUsers },
    { label: 'Job Offers', value: '8,500+', icon: FaTrophy },
  ];

  const aiFeatures = [
    'Personalized coaching sessions',
    'Real-time feedback on responses',
    'Interview technique analysis',
    'Body language assessment',
    'Voice modulation tips',
    'Unlimited practice sessions'
  ];

  const proFeatures = [
    'One-on-one coaching with industry experts',
    'Custom interview strategy development',
    'Company-specific preparation',
    'Behavioral interview mastery',
    'Salary negotiation techniques',
    'Post-interview feedback and follow-up'
  ];

  const handleNavigationError = (error: Error) => {
    console.error('Navigation error:', error);
  };

  return (
    <div className="min-h-screen bg-background text-white pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Master Your{' '}
            <span className="bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
              Interview Skills
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Choose between AI-powered coaching available 24/7 or personalized sessions with industry experts to perfect your interview skills.
          </motion.p>
        </div>

        {/* Stats Section
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-[#fcba28] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[#fcba28] mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div> */}

        {/* Coaching Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* AI Coaching */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-[#fcba28]/20">
                <FaRobot className="w-8 h-8 text-[#fcba28]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Interview Coach</h2>
                <p className="text-gray-300">Practice anytime, anywhere</p>
              </div>
            </div>
            <div className="text-3xl font-bold mb-6">Free</div>
            <ul className="space-y-4 mb-8">
              {aiFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="text-[#fcba28] flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/services/interview-coaching/ai"
              onClick={() => handleNavigationError(new Error('Navigation to /services/interview-coaching/ai'))}
              className="block w-full py-3 px-6 bg-[#fcba28] text-black rounded-xl text-center font-semibold hover:bg-[#fcd978] transition-colors duration-300"
            >
              Start AI Coaching
            </Link>
          </motion.div>

          {/* Professional Coaching */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-[#fcba28]/20">
                <FaUserTie className="w-8 h-8 text-[#fcba28]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Professional Coach</h2>
                <p className="text-gray-300">Expert-led interview preparation</p>
              </div>
            </div>
            <div className="text-3xl font-bold mb-6">$5/hour</div>
            <ul className="space-y-4 mb-8">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="text-[#fcba28] flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/services/interview-coaching/professional"
              className="block w-full py-3 px-6 bg-[#fcba28] text-black rounded-xl text-center font-semibold hover:bg-[#fcd978] transition-colors duration-300"
            >
              Book Professional Coach
            </Link>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold mb-12">Why Choose Our Interview Coaching?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="p-3 rounded-full bg-[#fcba28]/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="w-8 h-8 text-[#fcba28]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Data-Driven Approach</h3>
              <p className="text-gray-300">
                Our coaching methods are backed by data and proven success metrics
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="p-3 rounded-full bg-[#fcba28]/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaUsers className="w-8 h-8 text-[#fcba28]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Network</h3>
              <p className="text-gray-300">
                Access to a network of experienced industry professionals
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="p-3 rounded-full bg-[#fcba28]/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="w-8 h-8 text-[#fcba28]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Proven Results</h3>
              <p className="text-gray-300">
                High success rate in helping candidates land their dream jobs
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default InterviewCoachingPage;