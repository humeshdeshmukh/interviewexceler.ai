"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaDollarSign, FaChartLine, FaRobot, FaUserTie, FaHandshake } from 'react-icons/fa';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const stats = [
  { title: "Average Salary Increase", value: "15-25%", icon: FaDollarSign },
  { title: "Success Rate", value: "92%", icon: FaChartLine },
  { title: "Satisfied Clients", value: "1000+", icon: FaHandshake }
];

export default function SalaryNegotiationPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Master Your{" "}
              <span className="text-[#fcba28]">Salary Negotiation</span>
            </h1>
          </motion.div>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Get personalized insights and expert guidance to negotiate your worth with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/services/salary-negotiation/ai">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-[#fcba28] text-black rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-[#fcba28]/20 hover:shadow-[#fcba28]/30 transition-shadow"
              >
                <FaRobot className="w-5 h-5" />
                Start AI Analysis
              </motion.button>
            </Link>
            <Link href="/services/salary-negotiation/professional">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-white/10 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-white/20 border border-white/20 transition-colors"
              >
                <FaUserTie className="w-5 h-5" />
                Book Expert Session
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-[#fcba28]/30 transition-all"
          >
            <div className="relative z-10">
              <div className="p-3 bg-[#fcba28]/10 rounded-lg w-fit mb-4">
                <FaRobot className="w-8 h-8 text-[#fcba28]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI-Powered Analysis</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Get instant, data-driven insights with market rate analysis, custom negotiation scripts, and real-time feedback powered by advanced AI.
              </p>
              <Link href="/services/salary-negotiation/ai">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-[#fcba28] text-black rounded-lg font-semibold inline-flex items-center gap-2 shadow-lg shadow-[#fcba28]/20"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-[#fcba28]/30 transition-all"
          >
            <div className="relative z-10">
              <div className="p-3 bg-[#fcba28]/10 rounded-lg w-fit mb-4">
                <FaUserTie className="w-8 h-8 text-[#fcba28]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Expert Consultation</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Work one-on-one with experienced negotiation experts for personalized coaching, mock practice sessions, and ongoing follow-up support.
              </p>
              <Link href="/services/salary-negotiation/professional">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-[#fcba28] text-black rounded-lg font-semibold inline-flex items-center gap-2 shadow-lg shadow-[#fcba28]/20"
                >
                  Book Session
                </motion.button>
              </Link>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="pt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Proven Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#fcba28]/30 transition-all"
              >
                <stat.icon className="w-10 h-10 text-[#fcba28] mb-3" />
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60 text-center text-sm">{stat.title}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
