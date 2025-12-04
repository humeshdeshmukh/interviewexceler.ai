'use client';

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const interviewTypes = [
    'Technical',
    'Non-Technical',
    'Behavioral',
    'Leadership',
    'Project Management',
    'General'
];

const AutoTypingText = () => {
    const [currentText, setCurrentText] = useState(interviewTypes[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const isMountedRef = useRef(false);
    const controls = useAnimation();

    useEffect(() => {
        isMountedRef.current = true;
        setIsMounted(true);
        // Set initial animation state
        controls.set({ opacity: 1, y: 0 });
        return () => {
            isMountedRef.current = false;
            setIsMounted(false);
        };
    }, [controls]);

    useEffect(() => {
        if (!isMounted) return;

        let active = true;
        const animateText = async () => {
            // Extra check using ref for async safety
            if (!active || !isMountedRef.current) return;

            try {
                await controls.start({
                    opacity: 0,
                    y: -20,
                    transition: { duration: 0.3 }
                });

                if (!active || !isMountedRef.current) return;
                setCurrentText(interviewTypes[currentIndex]);

                await controls.start({
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3 }
                });

                if (!active || !isMountedRef.current) return;
                setTimeout(() => {
                    if (active && isMountedRef.current) {
                        setCurrentIndex((prev) => (prev + 1) % interviewTypes.length);
                    }
                }, 1500);
            } catch (error) {
                // Silently handle animation errors during unmount
                console.debug('Animation interrupted:', error);
            }
        };

        animateText();

        return () => {
            active = false;
        };
    }, [currentIndex, controls, isMounted]);

    return (
        <span className="relative inline-block min-w-[200px]">
            <motion.span animate={controls}>
                <span className="text-[#fcba28] absolute left-0">{currentText}</span>
            </motion.span>
            <span className="invisible">Project Management</span>
        </span>
    );
};

const BrandBadge = () => (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20 backdrop-blur-sm">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <div className="w-5 h-5">
                    <Sparkles className="w-full h-full text-[#fcba28]" />
                </div>
            </motion.div>
            <span className="text-sm font-medium">AI-Powered Interview Master</span>
        </div>
    </motion.div>
);

export const LeftHero = () => {
    return (
        <div className="relative flex flex-col gap-8 py-8">
            {/* Brand Badge */}
            <BrandBadge />

            {/* Main Headline */}
            <div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="text-5xl font-bold leading-tight mb-4 min-h-[80px] relative">
                        Master Your <AutoTypingText /> Interview Journey with AI
                    </div>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <span className="text-xl text-white/60 mb-6 block">
                        Experience realistic mock interviews and instant feedback. Practice, improve, and succeed.
                    </span>
                </motion.p>
            </div>

            {/* CTA Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="flex gap-4">
                    <Link
                        href="/products/mock-interviews/visual-simulation/simulation"
                        className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fcba28] text-black font-semibold transition-all hover:bg-[#fcba28]/90"
                    >
                        Start Practicing Now
                        <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                            <ArrowRight className="w-5 h-5" />
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};
