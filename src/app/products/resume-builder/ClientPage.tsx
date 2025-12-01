"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { CTAButton } from './components/CTAButton';
import { ArrowRight, Brain, Sparkles } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            duration: 0.5
        }
    }
};

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

export default function ResumeBuilderPage() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
            {/* Animated Background */}
            <motion.div
                className="fixed inset-0 pointer-events-none"
                style={{ opacity }}
            >
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 20%, rgba(252, 186, 40, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 60% 60%, rgba(252, 186, 40, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 20%, rgba(252, 186, 40, 0.15) 0%, transparent 50%)",
                        ]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "radial-gradient(circle at 80% 80%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 40% 40%, rgba(76, 175, 80, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 80%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)",
                        ]
                    }}
                    transition={{
                        duration: 5,
                        delay: 2.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </motion.div>

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10"
            >
                {/* Hero Section */}
                <motion.div variants={sectionVariants}>
                    <HeroSection />
                    {/* <TrustBadges /> */}
                </motion.div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 space-y-32 py-20">


                    {/* Features */}
                    <motion.div variants={sectionVariants}>
                        <FeaturesSection />
                    </motion.div>


                    {/* Final CTA */}
                    <motion.div
                        variants={sectionVariants}
                        className="text-center space-y-8 py-20"
                    >
                        <h2 className="text-4xl font-bold">
                            Ready to Build Your Perfect Resume?
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Join thousands of professionals who have accelerated their career with our AI-powered resume builder
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <CTAButton
                                href="/products/resume-builder/features/ai-resume"
                                variant="primary"
                                icon={Brain}
                                size="lg"
                            >
                                Start Building Now
                            </CTAButton>
                            <CTAButton
                                href="/products/resume-builder/features/professional"
                                variant="outline"
                                size="lg"
                            >
                                Get Professional Help
                            </CTAButton>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
