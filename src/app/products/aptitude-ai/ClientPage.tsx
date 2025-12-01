"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { useRef } from "react";
import { FaBrain, FaRobot, FaChartLine, FaClock, FaUserGraduate, FaTrophy } from "react-icons/fa6";
import { HeroAnimation } from "./components/hero/HeroAnimation";

// Feature card with hover effect
const FeatureCard = ({ icon: Icon, title, description }: {
    icon: any;
    title: string;
    description: string;
}) => (
    <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 flex flex-col items-center text-center group"
    >
        <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-full bg-[#fcba28]/10 flex items-center justify-center mb-4 group-hover:bg-[#fcba28]/20"
        >
            <Icon className="text-[#fcba28] text-2xl" />
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-200">{description}</p>
    </motion.div>
);

export default function AptitudeAIPage() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <main className="min-h-screen bg-background relative overflow-hidden" ref={targetRef}>
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl"
                />
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
                />
            </div>

            <div className="relative z-10">
                <MaxWidthWrapper>
                    {/* Two Column Hero Section */}
                    <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
                        {/* Left Column - Content */}
                        <div className="flex flex-col items-start text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="flex items-center gap-4 text-[#fcba28] mb-6"
                            >
                                {/* You can add a neutral icon here if desired */}
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl lg:text-6xl font-bold text-white mb-6"
                            >
                                Master Aptitude with
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fcba28] to-[#ffd700]">
                                    &nbsp;Personalized
                                </span>
                                &nbsp;Training
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-gray-200 mb-8"
                            >
                                Practice aptitude questions, track your progress, and improve your skills with our comprehensive training platform.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <Link
                                    href="/products/aptitude-ai/standard"
                                    className="group relative px-8 py-4 bg-[#fcba28] text-black rounded-full font-semibold overflow-hidden"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                                        whileHover={{ scale: 1.5 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                    Start Practice
                                </Link>
                                {/*
                <Link
                  href="/products/aptitude-ai/personalized"
                  className="group px-8 py-4 bg-transparent border border-[#fcba28] text-[#fcba28] rounded-full font-semibold relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-[#fcba28] opacity-0 group-hover:opacity-10 transition-opacity"
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.4 }}
                  />
                  Take Test
                </Link>
                */}
                            </motion.div>

                            {/* Quick Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="grid grid-cols-3 gap-8 mt-12"
                            >
                                <div>
                                    <p className="text-3xl font-bold text-[#fcba28]">50K+</p>
                                    <p className="text-gray-200">Questions</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-[#fcba28]">95%</p>
                                    <p className="text-gray-200">Success Rate</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - Animation */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[600px]"
                        >
                            <HeroAnimation />
                        </motion.div>
                    </div>



                    {/* Final CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center py-20"
                    >
                        <h2 className="text-4xl font-bold text-white mb-8">
                            Ready to Transform Your Aptitude Skills?
                        </h2>
                        <Link
                            href="/products/aptitude-ai/standard"
                            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#fcba28] text-black rounded-full font-semibold overflow-hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                                whileHover={{ scale: 1.5 }}
                                transition={{ duration: 0.4 }}
                            />
                            Start Your Journey
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </Link>
                    </motion.div>
                </MaxWidthWrapper>
            </div>
        </main>
    );
}
