"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Brain, Target, Users, Sparkles, Zap, TrendingUp, Award, Rocket } from "lucide-react";

export default function About() {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-background to-background/95 overflow-hidden">
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 z-10">
                <MaxWidthWrapper>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#fcba28]/10 border border-[#fcba28]/20 rounded-full mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-[#fcba28]" />
                            <span className="text-sm font-medium text-[#fcba28]">AI-Powered Interview Excellence</span>
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                            About InterviewExceler.AI
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed">
                            Empowering job seekers worldwide with cutting-edge AI technology to master interviews, build confidence, and land their dream careers.
                        </p>
                    </motion.div>
                </MaxWidthWrapper>
            </section>

            {/* Team Section */}
            <section className="relative py-16 z-10">
                <MaxWidthWrapper>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet Our Team</h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            The passionate minds behind InterviewExceler.AI
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: "Humesh Deshmukh",
                                role: "Founder & CEO",
                                description: "Visionary leader driving the mission of InterviewExceler.AI.",
                            },
                            {
                                name: "Aisha Agrawal",
                                role: "Co-Founder & COO",
                                description: "Operational strategist ensuring seamless execution and growth.",
                            },
                            {
                                name: "Srushti Soitkar",
                                role: "Product Manager",
                                description: "Focused on delivering user-centric and effective solutions.",
                            },
                            {
                                name: "Shrish Deshmukh",
                                role: "Lead Engineer",
                                description: "Building robust and scalable technology for interview preparation.",
                            },
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-xl border border-white/10 hover:border-[#fcba28]/30 rounded-2xl p-8 text-center transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                <div className="relative z-10">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#fcba28]/20 to-[#fcba28]/5 rounded-full flex items-center justify-center">
                                        <Users className="w-10 h-10 text-[#fcba28]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                                    <p className="text-[#fcba28] font-semibold mb-3 text-sm">{member.role}</p>
                                    <p className="text-white/60 text-sm leading-relaxed">{member.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Mission & Vision Section */}
            <section className="relative py-20 z-10">
                <MaxWidthWrapper>
                    <div className="grid lg:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] hover:from-white/[0.08] hover:to-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#fcba28]/30 rounded-2xl p-10 transition-all duration-300"
                        >
                            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Target className="w-20 h-20 text-[#fcba28]" />
                            </div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 mb-4">
                                    <div className="w-2 h-2 bg-[#fcba28] rounded-full animate-pulse" />
                                    <span className="text-xs font-semibold text-[#fcba28] uppercase tracking-wider">Our Mission</span>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">Democratizing Interview Success</h2>
                                <p className="text-white/70 leading-relaxed text-lg">
                                    We're on a mission to level the playing field for job seekers everywhere. By combining advanced AI with real-world interview expertise, we provide personalized, accessible, and effective preparation tools that transform anxiety into confidence.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] hover:from-white/[0.08] hover:to-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#60a5fa]/30 rounded-2xl p-10 transition-all duration-300"
                        >
                            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Rocket className="w-20 h-20 text-[#60a5fa]" />
                            </div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 mb-4">
                                    <div className="w-2 h-2 bg-[#60a5fa] rounded-full animate-pulse" />
                                    <span className="text-xs font-semibold text-[#60a5fa] uppercase tracking-wider">Our Vision</span>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">The Future of Career Preparation</h2>
                                <p className="text-white/70 leading-relaxed text-lg">
                                    We envision a world where every job seeker has access to world-class interview coaching powered by AI. Where preparation is personalized, feedback is instant, and success is achievable for everyone, regardless of background or resources.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* What Makes Us Different */}
            <section className="relative py-20 z-10">
                <MaxWidthWrapper>
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            What Makes Us Different
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-white/60 max-w-2xl mx-auto"
                        >
                            Experience the next generation of interview preparation
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Brain,
                                title: "AI-Powered Analysis",
                                description: "Advanced algorithms analyze your responses in real-time, providing instant feedback on content, delivery, and body language.",
                                color: "#fcba28"
                            },
                            {
                                icon: Zap,
                                title: "Personalized Learning Paths",
                                description: "Adaptive difficulty that evolves with your progress, ensuring you're always challenged but never overwhelmed.",
                                color: "#60a5fa"
                            },
                            {
                                icon: Users,
                                title: "Industry-Specific Prep",
                                description: "Tailored questions and scenarios for tech, finance, healthcare, and more - matching real interview environments.",
                                color: "#34d399"
                            },
                            {
                                icon: Target,
                                title: "Actionable Insights",
                                description: "Detailed performance analytics showing exactly where to improve, with specific tips for each area.",
                                color: "#f472b6"
                            },
                            {
                                icon: Sparkles,
                                title: "Realistic Simulations",
                                description: "Practice with AI interviewers that ask follow-up questions and adapt to your answers like real hiring managers.",
                                color: "#a78bfa"
                            },
                            {
                                icon: Award,
                                title: "Proven Results",
                                description: "Our users report 47% average improvement in interview performance and 3x higher callback rates.",
                                color: "#fb923c"
                            },
                        ].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-2xl p-8 transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                    <div className="relative z-10">
                                        <div className="mb-5" style={{ color: feature.color }}>
                                            <Icon className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                        <p className="text-white/60 leading-relaxed">{feature.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 z-10">
                <MaxWidthWrapper>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden bg-gradient-to-br from-[#fcba28]/20 to-[#fcba28]/5 border border-[#fcba28]/20 rounded-3xl p-12 md:p-16 text-center"
                    >
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to Excel in Your Next Interview?
                            </h2>
                            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                                Join thousands of successful job seekers who transformed their interview skills with InterviewExceler.AI
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 bg-[#fcba28] hover:bg-[#e9aa22] text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#fcba28]/50"
                            >
                                Start Practicing Now
                                <Rocket className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                </MaxWidthWrapper>
            </section>
        </div>
    );
}
