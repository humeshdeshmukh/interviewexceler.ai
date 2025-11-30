'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, Code, Brain, Clock, Award, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { ChipBanner } from '@/components/ChipBanner';

interface FAQItemProps {
    question: string;
    answer: string;
    icon: JSX.Element;
    isOpen: boolean;
    onToggle: () => void;
}

const FAQItem = ({ question, answer, icon, isOpen, onToggle }: FAQItemProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "group rounded-2xl p-6 backdrop-blur-sm transition-all duration-300",
                isOpen 
                    ? "bg-[#fcba28]/20 shadow-lg" 
                    : "bg-foreground/5 hover:bg-foreground/10"
            )}
        >
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-4"
            >
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "p-2 rounded-lg transition-colors duration-300",
                        isOpen ? "bg-[#fcba28] text-background" : "bg-foreground/10 text-foreground/70 group-hover:text-foreground"
                    )}>
                        {icon}
                    </div>
                    <h3 className="text-left text-lg font-semibold">{question}</h3>
                </div>
                <ChevronDown
                    className={cn(
                        "h-5 w-5 transition-transform duration-300",
                        isOpen ? "rotate-180" : "rotate-0"
                    )}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="mt-4 text-foreground/80 leading-relaxed pl-14">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const faqData = [
    {
        question: "How does InterviewExceler.Ai's AI interview simulation work?",
        answer: "Our AI-powered interview simulator uses advanced natural language processing to conduct realistic interview scenarios. It adapts to your responses in real-time, providing personalized feedback on your communication style, technical accuracy, and problem-solving approach. The system also analyzes your body language and tone through video interviews, offering comprehensive feedback to improve your interview performance.",
        icon: <Brain className="h-5 w-5" />,
    },
    {
        question: "What types of technical interviews does the platform cover?",
        answer: "We cover a wide range of technical interviews including Data Structures & Algorithms, System Design, Full Stack Development, Machine Learning, and Cloud Architecture. Each category features curated questions from top tech companies, real-time coding environments, and AI-powered code review. Our platform is regularly updated with the latest interview patterns from companies like Google, Amazon, Microsoft, and Meta.",
        icon: <Code className="h-5 w-5" />,
    },
    {
        question: "How does the instant feedback system work?",
        answer: "Our instant feedback system uses AI to analyze multiple aspects of your interview performance. For coding challenges, it evaluates code quality, time complexity, and problem-solving approach. For behavioral interviews, it assesses your response structure, relevance, and delivery. You receive detailed insights and actionable improvements after each practice session.",
        icon: <Zap className="h-5 w-5" />,
    },
    {
        question: "What makes InterviewExceler.Ai different from other platforms?",
        answer: "InterviewExceler.Ai stands out with its advanced AI technology that provides personalized interview experiences. Unlike traditional platforms, we offer dynamic question adaptation, real-time feedback, and comprehensive performance analytics. Our platform also includes industry-specific interview preparation, mock interviews with AI-powered interviewers, and a vast library of company-specific interview questions.",
        icon: <Award className="h-5 w-5" />,
    },
    {
        question: "How long does it take to see improvement in interview skills?",
        answer: "Most users report significant improvement within 2-4 weeks of consistent practice. Our analytics dashboard tracks your progress across different interview aspects, showing measurable improvements in areas like problem-solving speed, communication clarity, and technical accuracy. The platform adapts to your learning pace and continuously challenges you with appropriate difficulty levels.",
        icon: <Clock className="h-5 w-5" />,
    },
    {
        question: "Can I get help if I'm stuck during practice?",
        answer: "Absolutely! We offer multiple support channels including AI-powered hints during coding challenges, detailed solution explanations, and community discussion forums. Premium users also get access to one-on-one mentoring sessions with industry experts and priority support for technical queries.",
        icon: <MessageSquare className="h-5 w-5" />,
    },
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="relative py-20 bg-gradient-to-b from-background to-background/95">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <MaxWidthWrapper>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center mb-12"
                >
                    <ChipBanner text="FAQ" />
                    <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                        Common Questions About{" "}
                        <span className="text-[#fcba28]">InterviewExceler.Ai</span>
                    </h2>
                    <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto text-center">
                        Get answers to frequently asked questions about our AI-powered interview preparation platform
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-full aspect-square">
                            {/* Animated Elements */}
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-[#fcba28] to-amber-600 rounded-2xl shadow-xl"
                            />
                            <motion.div
                                animate={{
                                    y: [0, 20, 0],
                                    rotate: [0, -5, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                                className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-xl"
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 10, 0]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1
                                }}
                                className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-[#fcba28]/80 to-amber-500/80 rounded-3xl shadow-xl backdrop-blur-sm"
                            >
                                <div className="absolute inset-0 bg-white/10 rounded-3xl" />
                            </motion.div>
                            
                            {/* Interview Icons Animation */}
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                    x: [0, 10, 0]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-1/2 right-1/3 p-4 bg-white/5 backdrop-blur-md rounded-xl shadow-lg"
                            >
                                <MessageSquare className="w-8 h-8 text-[#fcba28]" />
                            </motion.div>
                            <motion.div
                                animate={{
                                    y: [0, 15, 0],
                                    x: [0, -10, 0]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                                className="absolute bottom-1/3 left-1/2 p-4 bg-white/5 backdrop-blur-md rounded-xl shadow-lg"
                            >
                                <Brain className="w-8 h-8 text-amber-500" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - FAQ Items */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="grid gap-4"
                    >
                        {faqData.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                icon={faq.icon}
                                isOpen={openIndex === index}
                                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                            />
                        ))}
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
};
