"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Video, MessageSquare, CheckCircle, Clock, Mic, Camera } from "lucide-react";

const InterviewAnimation = () => {
  return (
    <div className="relative w-full h-full">
      {/* Main Container */}
      <motion.div
        className="relative w-full aspect-video bg-black/20 rounded-xl overflow-hidden border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Interview Interface */}
        <div className="absolute inset-0 p-6">
          <motion.div
            className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-[#1c6bff]/10 to-[#fcba28]/10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Top Bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-12 bg-black/30 backdrop-blur-sm flex items-center justify-between px-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#fcba28]" />
                <span className="text-sm text-white/80">15:00</span>
              </div>
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-full bg-white/10 cursor-pointer"
                >
                  <Mic className="w-4 h-4" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-full bg-white/10 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>

            {/* AI Interviewer Side */}
            <motion.div
              className="absolute left-6 top-16 w-[calc(50%-2rem)] h-[calc(100%-5rem)] rounded-lg bg-gradient-to-br from-[#1c6bff]/20 to-transparent backdrop-blur-sm border border-[#1c6bff]/20"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* AI Avatar */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="relative">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1c6bff] to-[#fcba28] p-1"
                    animate={{ 
                      boxShadow: ["0 0 20px #1c6bff50", "0 0 40px #1c6bff50", "0 0 20px #1c6bff50"] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <span className="text-2xl">🤖</span>
                    </div>
                  </motion.div>
                  {/* AI Status */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1c6bff] px-3 py-1 rounded-full text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    AI Interviewer
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Interview Question */}
            <motion.div
              className="absolute left-1/2 top-16 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <p className="text-sm text-white/80">Current Question:</p>
              <p className="text-white mt-1">"Tell me about your experience with..."</p>
            </motion.div>

            {/* Candidate Side */}
            <motion.div
              className="absolute right-6 top-16 w-[calc(50%-2rem)] h-[calc(100%-5rem)] rounded-lg bg-gradient-to-bl from-[#fcba28]/20 to-transparent backdrop-blur-sm border border-[#fcba28]/20"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Candidate Placeholder */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="relative">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-bl from-[#fcba28] to-[#b2be10] p-1"
                    animate={{ 
                      boxShadow: ["0 0 20px #fcba2850", "0 0 40px #fcba2850", "0 0 20px #fcba2850"] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                  </motion.div>
                  {/* Candidate Status */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#fcba28] px-3 py-1 rounded-full text-xs text-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Candidate
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Interview Progress */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 space-y-4">
              {/* Skills Being Assessed */}
              <motion.div
                className="flex justify-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {["Communication", "Technical", "Problem Solving"].map((skill, i) => (
                  <motion.div
                    key={skill}
                    className="px-3 py-1 rounded-full bg-white/10 text-xs flex items-center space-x-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                  >
                    <CheckCircle className="w-3 h-3 text-[#fcba28]" />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                className="h-2 rounded-full bg-white/10 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#1c6bff] to-[#fcba28]"
                  initial={{ width: '0%' }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
        {[...Array(36)].map((_, i) => (
          <motion.div
            key={i}
            className="border-[0.5px] border-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.02 }}
          />
        ))}
      </div>
    </div>
  );
};

export const HeroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative pt-20 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Hero Section */}
          <motion.div 
            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Master Your Interview Skills
            </motion.h1>
            <motion.p 
              className="text-lg text-white/60 mb-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Practice with our AI-powered platform and get real-time feedback on your responses, body language, and communication skills.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/products/mock-interviews/schedule">
                <motion.button 
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#fcba28] to-amber-600 text-black rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 flex items-center justify-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Video className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Start Interview
                </motion.button>
              </Link>
              <Link href="/products/mock-interviews/visual-simulation">
                <motion.button 
                  className="w-full sm:w-auto px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Simulation
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Hero Section - Interview Animation */}
          <motion.div 
            className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full aspect-video bg-black/20 rounded-lg overflow-hidden">
                <InterviewAnimation />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c6bff]/5 via-transparent to-[#fcba28]/5 -z-10" />
    </motion.div>
  );
};
