'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, TrendingUp, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function EmptyState() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 px-4"
        >
            <div className="max-w-2xl mx-auto">
                {/* Animated Icon */}
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                    }}
                    className="mb-8"
                >
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#fcba28]/20 to-[#fcba28]/5 flex items-center justify-center">
                        <Rocket className="w-12 h-12 text-[#fcba28]" />
                    </div>
                </motion.div>

                {/* Welcome Message */}
                <h2 className="text-3xl font-bold text-foreground mb-4">
                    Welcome to Your Dashboard!
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                    Start your journey to interview success. Complete your first mock interview to see your progress and insights here.
                </p>

                {/* Quick Tips */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-xl bg-card border border-border/10 backdrop-blur-xl"
                    >
                        <div className="w-12 h-12 rounded-lg bg-[#fcba28]/10 flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="w-6 h-6 text-[#fcba28]" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">Track Progress</h3>
                        <p className="text-sm text-muted-foreground">
                            Monitor your improvement over time with detailed analytics and charts
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-xl bg-card border border-border/10 backdrop-blur-xl"
                    >
                        <div className="w-12 h-12 rounded-lg bg-[#fcba28]/10 flex items-center justify-center mx-auto mb-4">
                            <Target className="w-6 h-6 text-[#fcba28]" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">AI Insights</h3>
                        <p className="text-sm text-muted-foreground">
                            Get personalized recommendations based on your performance patterns
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-6 rounded-xl bg-card border border-border/10 backdrop-blur-xl"
                    >
                        <div className="w-12 h-12 rounded-lg bg-[#fcba28]/10 flex items-center justify-center mx-auto mb-4">
                            <Rocket className="w-6 h-6 text-[#fcba28]" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">Build Confidence</h3>
                        <p className="text-sm text-muted-foreground">
                            Practice consistently and watch your confidence grow with each session
                        </p>
                    </motion.div>
                </div>

                {/* CTA Button */}
                <Link
                    href="/products/mock-interviews/visual-simulation/simulation"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#fcba28] hover:bg-[#fcd978] text-black font-semibold rounded-xl transition-all shadow-lg shadow-[#fcba28]/20 hover:shadow-xl hover:shadow-[#fcba28]/30"
                >
                    <Rocket className="w-5 h-5" />
                    Start Your First Interview
                    <ArrowRight className="w-5 h-5" />
                </Link>

                <p className="text-sm text-muted-foreground mt-6">
                    Not sure where to start?{' '}
                    <Link href="/profile" className="text-[#fcba28] hover:underline">
                        Complete your profile
                    </Link>{' '}
                    first for personalized questions
                </p>
            </div>
        </motion.div>
    );
}
