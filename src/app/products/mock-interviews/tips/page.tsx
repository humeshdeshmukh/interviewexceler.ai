/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Video, Briefcase, Brain, Clock, MessageSquare, Users, 
  Lightbulb, Target, ArrowRight, Code, Presentation, 
  Eye, BookOpen, Mic, Camera, Laptop, Coffee
} from "lucide-react";

const TipCard = ({ icon: Icon, title, description, subTips = [], delay = 0 }) => (
  <motion.div
    className="flex flex-col space-y-4 p-6 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#fcba28]/30 transition-all duration-300"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(252, 186, 40, 0.2)" }}
  >
    <div className="flex items-center space-x-4">
      <div className="p-3 rounded-lg bg-gradient-to-br from-[#fcba28] to-amber-600">
        <Icon className="w-6 h-6 text-black" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-white/70">{description}</p>
    {subTips.length > 0 && (
      <ul className="mt-4 space-y-2">
        {subTips.map((tip, index) => (
          <li key={index} className="flex items-start space-x-2 text-sm text-white/60">
            <span className="text-[#fcba28] mt-1">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    )}
  </motion.div>
);

const Tips = () => {
  const mainTips = [
    {
      icon: Brain,
      title: "Technical Preparation",
      description: "Master the technical aspects of your interview with thorough preparation.",
      subTips: [
        "Review fundamental concepts in your field",
        "Practice coding problems on platforms like LeetCode",
        "Understand system design principles",
        "Be ready to explain your thought process clearly"
      ]
    },
    {
      icon: Briefcase,
      title: "Company Research",
      description: "Show your genuine interest by thoroughly researching the company.",
      subTips: [
        "Study the company's products and services",
        "Read recent news and press releases",
        "Understand their mission and values",
        "Research their tech stack and engineering culture"
      ]
    },
    {
      icon: MessageSquare,
      title: "Communication Skills",
      description: "Articulate your thoughts clearly and professionally.",
      subTips: [
        "Use the STAR method for behavioral questions",
        "Practice active listening",
        "Maintain professional language",
        "Ask clarifying questions when needed"
      ]
    },
    {
      icon: Code,
      title: "Coding Best Practices",
      description: "Demonstrate clean coding and problem-solving skills.",
      subTips: [
        "Write readable and maintainable code",
        "Consider edge cases and error handling",
        "Optimize for time and space complexity",
        "Test your solution with examples"
      ]
    },
    {
      icon: Presentation,
      title: "System Design",
      description: "Show your ability to design scalable systems.",
      subTips: [
        "Understand distributed systems concepts",
        "Consider scalability and reliability",
        "Discuss trade-offs in your design",
        "Know common design patterns"
      ]
    },
    {
      icon: Eye,
      title: "Body Language",
      description: "Project confidence through your virtual presence.",
      subTips: [
        "Maintain good posture",
        "Use appropriate hand gestures",
        "Make eye contact with the camera",
        "Show engagement through facial expressions"
      ]
    },
    {
      icon: BookOpen,
      title: "Interview Etiquette",
      description: "Follow professional interview protocols.",
      subTips: [
        "Test your equipment beforehand",
        "Choose a quiet, well-lit location",
        "Dress professionally",
        "Have a backup internet connection"
      ]
    },
    {
      icon: Target,
      title: "Follow-up Questions",
      description: "Prepare thoughtful questions to ask the interviewer.",
      subTips: [
        "Ask about team culture and dynamics",
        "Inquire about growth opportunities",
        "Discuss current technical challenges",
        "Show interest in mentorship programs"
      ]
    }
  ];

  const quickTips = [
    {
      icon: <Clock className="w-6 h-6" />,
      tip: "Join 5-10 minutes early",
      detail: "Show punctuality and respect for the interviewer's time"
    },
    {
      icon: <Mic className="w-6 h-6" />,
      tip: "Test audio beforehand",
      detail: "Ensure clear communication during the interview"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      tip: "Check your camera angle",
      detail: "Present yourself professionally on video"
    },
    {
      icon: <Laptop className="w-6 h-6" />,
      tip: "Have backup devices ready",
      detail: "Be prepared for technical issues"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      tip: "Stay hydrated",
      detail: "Keep water nearby for long interviews"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      tip: "Practice with our AI",
      detail: "Get comfortable with interview scenarios"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Hero Section */}
      <motion.div
        className="relative pt-20 px-4 sm:px-6 lg:px-8 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-[#fcba28] to-amber-600 bg-clip-text text-transparent">
                Master Your Technical Interview
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Comprehensive tips and strategies to help you succeed in your technical interviews. Practice with our AI and get real-time feedback.
            </motion.p>
          </motion.div>

          {/* Tips Grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mainTips.map((tip, index) => (
              <TipCard key={tip.title} {...tip} delay={0.2 + index * 0.1} />
            ))}
          </div>

          {/* Quick Tips Section */}
          <motion.section
            className="mt-20 py-16 bg-white/5 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-bold text-[#fcba28] mb-4">
                  Pre-Interview Checklist
                </h2>
                <p className="text-white/60">
                  Essential items to check before your interview
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickTips.map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-lg bg-white/5 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-[#fcba28] mt-1">{item.icon}</div>
                      <div>
                        <p className="text-white font-medium">{item.tip}</p>
                        <p className="text-white/60 text-sm mt-1">{item.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Practice Section */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Ready to Put These Tips into Practice?
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Start a mock interview with our AI interviewer and get instant feedback on your performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products/mock-interviews/schedule">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-[#fcba28] to-amber-600 text-black rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 flex items-center justify-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Video className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Start Mock Interview
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c6bff]/5 via-transparent to-[#fcba28]/5" />
          {/* Grid Pattern */}
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
          {/* Floating Elements */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#1c6bff] to-[#fcba28]"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [-20, 20],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Tips;
