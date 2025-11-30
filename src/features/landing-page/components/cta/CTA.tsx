"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { BuyButton } from "@/components/BuyButton";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { FaRocket } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";

export const CTA = () => {
    const router = useRouter();
    const containerRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    const features = [
        "Real-time AI Interview Practice",
        "Personalized Feedback & Improvement Tips",
        "Industry-specific Interview Questions",
        "Interview Performance Analytics",
        "24/7 Practice Availability",
        "Multiple Interview Scenarios"
    ];

    const handleGetStarted = () => {
        router.push("/products/mock-interviews");
    };

    return (
        <section id="cta" className="relative overflow-hidden py-24 sm:py-32">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background/95" />
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fcba28]/10 via-transparent to-amber-600/10 animate-pulse" />
            
            {/* Animated Background Circles */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#fcba28]/30 rounded-full filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-600/30 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <motion.div
                ref={containerRef}
                style={{ opacity, scale }}
                className="relative z-10"
            >
                <MaxWidthWrapper className="relative flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative z-20 flex items-center flex-col justify-center w-full max-w-5xl mx-auto"
                    >
                        {/* Icon */}
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="p-6 rounded-2xl bg-gradient-to-br from-[#fcba28] to-amber-600 shadow-xl mb-10 relative"
                        >
                            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl" />
                            <FaRocket className="text-6xl text-white relative z-10" />
                        </motion.div>

                        {/* Heading */}
                        <h2 className="font-extrabold text-5xl md:text-7xl text-center bg-gradient-to-r from-[#fcba28] via-amber-500 to-amber-600 bg-clip-text text-transparent mb-6 leading-tight">
                            Master Your Interview Skills
                        </h2>

                        {/* Description */}
                        <p className="text-xl md:text-2xl text-center text-white/90 max-w-3xl mb-12 leading-relaxed">
                            Practice with our AI-powered interview simulator and receive instant, personalized feedback to boost your confidence and success rate.
                        </p>

                        {/* Features List */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3, staggerChildren: 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mb-12"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center space-x-4 bg-white/[0.03] backdrop-blur-sm rounded-xl p-5 hover:bg-white/[0.06] transition-colors duration-300 border border-white/[0.05]"
                                >
                                    <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-[#fcba28]/20 to-amber-600/20">
                                        <IoCheckmarkCircle className="text-[#fcba28] text-2xl" />
                                    </div>
                                    <span className="text-white/90 font-medium text-lg">{feature}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#fcba28] to-amber-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-300" />
                            <button
                                onClick={handleGetStarted}
                                className="relative px-12 py-5 bg-gradient-to-r from-[#fcba28] to-amber-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-amber-500/30 text-xl tracking-wide"
                            >
                                Start Your Practice Interview
                            </button>
                        </motion.div>
                    </motion.div>
                </MaxWidthWrapper>
            </motion.div>
        </section>
    );
};
