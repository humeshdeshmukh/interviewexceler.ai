"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { Button } from './ui';
import { AnimatedResume } from './AnimatedResume';
import { AnimatedProfessional } from './AnimatedProfessional';

const floatAnimation = {
    y: [-10, 10],
    transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
};

export function HeroSection() {
    return (
        <div className="relative py-20">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 -left-10 w-40 h-40 bg-[#fcba28]/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-10 w-40 h-40 bg-[#4CAF50]/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 5,
                        delay: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-[#fcba28]" />
                            <span className="text-sm text-white/80">AI-Powered Resume Builder</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-6xl font-bold mb-6"
                        >
                            Build Your Perfect{" "}
                            <span className="text-[#fcba28]">Resume</span>{" "}
                            with AI
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-white/60 mb-12"
                        >
                            Create a professional resume that stands out with our AI-powered tools and expert guidance
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button 
                                    href="/products/resume-builder/features/ai-resume" 
                                    variant="primary" 
                                    icon
                                    className="relative overflow-hidden group"
                                >
                                    <motion.span
                                        className="absolute inset-0 bg-gradient-to-r from-[#fcba28]/20 to-transparent"
                                        animate={{
                                            x: ["0%", "200%"],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />
                                    Start Building <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button href="/products/resume-builder/features/professional" variant="secondary">
                                    Professional Service
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Animated Illustrations */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[600px]"
                    >
                        {/* Resume Builder Animation */}
                        <motion.div
                            className="absolute inset-0 z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        >
                            <AnimatedResume />
                        </motion.div>

                        {/* Professional Service Animation */}
                        <motion.div
                            className="absolute inset-0 z-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 4,
                                delay: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        >
                            <AnimatedProfessional />
                        </motion.div>
                        
                        {/* Decorative Elements */}
                        <motion.div
                            className="absolute -top-10 right-10 text-[#fcba28] z-30"
                            animate={floatAnimation}
                        >
                            <Star className="w-8 h-8" />
                        </motion.div>
                        <motion.div
                            className="absolute top-20 left-10 text-[#4CAF50] z-30"
                            animate={{
                                ...floatAnimation,
                                transition: {
                                    ...floatAnimation.transition,
                                    delay: 0.5
                                }
                            }}
                        >
                            <Star className="w-6 h-6" />
                        </motion.div>

                        {/* Transition Overlay */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-40"
                            animate={{
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
