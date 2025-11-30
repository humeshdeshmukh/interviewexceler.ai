"use client";

import { LeftHero } from "./LeftHero";
import { RightHero } from "./RightHero";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <section className="relative min-h-screen bg-gradient-to-b from-background to-background/95 overflow-hidden">
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
            {/* Content */}
            <div className="relative z-10">
                <MaxWidthWrapper>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16 min-h-screen py-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="flex-1 w-full flex justify-center">
                                <LeftHero />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            <div className="flex-1 w-full flex justify-center">
                                <RightHero />
                            </div>
                        </motion.div>
                    </div>
                </MaxWidthWrapper>
            </div>
            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <div className="w-6 h-10 rounded-full border-2 border-[#fcba28]/30 flex items-start justify-center p-2 bg-background/80 backdrop-blur">
                            <motion.div
                                animate={{ height: ["20%", "80%", "20%"] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <div className="w-1 bg-[#fcba28]/50 rounded-full h-full" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};