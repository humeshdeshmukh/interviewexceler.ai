"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaRobot, FaUserTie, FaArrowRight, FaStar, FaUsers, FaRocket, FaCheck, FaFileAlt, FaSearch, FaMedal, FaChartLine } from 'react-icons/fa';

export default function CVRevisionPage() {
    const stats = [
        { icon: FaFileAlt, value: '15,000+', label: 'CVs Optimized' },
        { icon: FaStar, value: '98%', label: 'Success Rate' },
        { icon: FaUsers, value: '2000+', label: 'Job Offers Received' },
    ];

    const revisionOptions = [
        {
            icon: FaRobot,
            title: 'AI CV Analysis',
            description: 'Get instant feedback and suggestions to improve your CV using our advanced AI technology.',
            features: [
                'Instant CV analysis',
                'ATS optimization check',
                'Keyword optimization',
                'Format suggestions'
            ],
            price: 'Free',
            link: './cv-revision/ai',
            gradient: 'from-purple-600/20 to-blue-600/20'
        },
        {
            icon: FaUserTie,
            title: 'Professional CV Review',
            description: 'Get a comprehensive review and optimization from our expert CV consultants.',
            features: [
                'Detailed expert review',
                'One-on-one consultation',
                'Industry-specific optimization',
                'Two revision rounds'
            ],
            price: '$2',
            link: './cv-revision/professional',
            gradient: 'from-amber-600/20 to-orange-600/20'
        }
    ];

    const benefits = [
        {
            icon: FaSearch,
            title: 'ATS-Optimized',
            description: 'Ensure your CV passes Applicant Tracking Systems and reaches human recruiters'
        },
        {
            icon: FaMedal,
            title: 'Industry Standards',
            description: 'Format and content aligned with current industry best practices'
        },
        {
            icon: FaChartLine,
            title: 'Higher Response Rate',
            description: 'Significantly improve your chances of getting interview calls'
        }
    ];

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
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6"
                    >
                        <FaFileAlt className="w-8 h-8 text-[#fcba28]" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
                    >
                        Make Your CV Stand Out
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                    >
                        Choose between instant AI analysis or expert review to create an impactful CV
                    </motion.p>
                </div>

                {/* Stats Section
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-[#fcba28] mb-4" />
              <span className="text-3xl font-bold text-white mb-2">{stat.value}</span>
              <span className="text-gray-400">{stat.label}</span>
            </div>
          ))}
        </motion.div> */}

                {/* Revision Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {revisionOptions.map((option, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className={`relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-lg bg-gradient-to-br ${option.gradient} p-8 group hover:scale-[1.02] transition-all duration-300`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Icon and Title */}
                            <div className="flex items-center gap-4 mb-6">
                                <option.icon className="w-10 h-10 text-[#fcba28]" />
                                <h3 className="text-2xl font-bold text-white">{option.title}</h3>
                            </div>

                            {/* Description */}
                            <p className="text-gray-300 mb-6">{option.description}</p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {option.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center gap-3 text-gray-300">
                                        <FaCheck className="w-5 h-5 text-[#fcba28]" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Price and CTA */}
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-white">{option.price}</span>
                                <Link href={option.link}>
                                    <button className="px-6 py-3 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200 flex items-center gap-2 group">
                                        Get Started
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center">Why Optimize Your CV With Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-lg bg-[#fcba28]/20">
                                        <benefit.icon className="w-6 h-6 text-[#fcba28]" />
                                    </div>
                                    <h3 className="text-xl font-semibold">{benefit.title}</h3>
                                </div>
                                <p className="text-gray-400">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg"
                >
                    <h2 className="text-2xl font-bold mb-4">Ready to Upgrade Your CV?</h2>
                    <p className="text-gray-400 mb-6">Choose your preferred review method and get started</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="./cv-revision/ai">
                            <button className="px-8 py-3 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200">
                                Try AI Analysis
                            </button>
                        </Link>
                        <Link href="./cv-revision/professional">
                            <button className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200">
                                Get Expert Review
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
