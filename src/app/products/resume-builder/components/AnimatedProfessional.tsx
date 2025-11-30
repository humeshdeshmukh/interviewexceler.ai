"use client";

import { motion } from 'framer-motion';
import { MessageSquare, Star, CheckCircle2, Users } from 'lucide-react';

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: { duration: 2, bounce: 0 },
            opacity: { duration: 0.5 }
        }
    }
};

const float = {
    hidden: { y: 0 },
    visible: {
        y: [-10, 10],
        transition: {
            y: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }
        }
    }
};

const pulse = {
    hidden: { scale: 1, opacity: 0.5 },
    visible: {
        scale: [1, 1.05, 1],
        opacity: [0.5, 1, 0.5],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const chat = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export function AnimatedProfessional() {
    return (
        <div className="relative w-full h-full">
            {/* Main Content */}
            <motion.div
                className="absolute inset-0"
                initial="hidden"
                animate="visible"
            >
                {/* Expert Profile */}
                <motion.div 
                    className="absolute top-10 left-1/2 transform -translate-x-1/2"
                    variants={float}
                >
                    <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.div
                            className="w-24 h-24 rounded-full bg-[#4CAF50] bg-opacity-20 flex items-center justify-center"
                            variants={pulse}
                        >
                            <Users className="w-12 h-12 text-[#4CAF50]" />
                        </motion.div>
                        <motion.div
                            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center"
                            variants={pulse}
                        >
                            <CheckCircle2 className="w-4 h-4 text-white" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Chat Messages */}
                {[
                    { delay: 0.2, x: -100, text: "Expert Review" },
                    { delay: 0.4, x: 100, text: "Personalized Feedback" },
                    { delay: 0.6, x: -80, text: "Industry Insights" }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        className="absolute top-1/2"
                        style={{ left: "50%", y: index * 80 }}
                        initial={{ opacity: 0, x: item.x, y: 150 + index * 60 }}
                        animate={{ opacity: 1, x: item.x, y: 150 + index * 60 }}
                        transition={{ delay: item.delay, duration: 0.5 }}
                    >
                        <motion.div
                            className="bg-[#4CAF50] bg-opacity-10 rounded-lg p-4 flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                        >
                            <MessageSquare className="w-5 h-5 text-[#4CAF50]" />
                            <span className="text-sm text-white">{item.text}</span>
                        </motion.div>
                    </motion.div>
                ))}

                {/* Floating Stars */}
                {[...Array(3)].map((_, index) => (
                    <motion.div
                        key={index}
                        className="absolute"
                        style={{
                            top: `${20 + index * 30}%`,
                            left: `${20 + index * 30}%`,
                        }}
                        variants={float}
                        custom={index}
                    >
                        <Star className="w-4 h-4 text-[#4CAF50]" />
                    </motion.div>
                ))}

                {/* Connection Lines */}
                {[...Array(3)].map((_, index) => (
                    <motion.div
                        key={`line-${index}`}
                        className="absolute left-1/2 h-[2px] bg-gradient-to-r from-[#4CAF50] to-transparent"
                        style={{
                            top: `${40 + index * 20}%`,
                            width: '100px',
                            transform: `translateX(${index % 2 === 0 ? '-' : ''}100%)`,
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ 
                            scaleX: 1, 
                            opacity: [0, 1, 0],
                            transition: {
                                duration: 2,
                                delay: index * 0.3,
                                repeat: Infinity,
                            }
                        }}
                    />
                ))}

                {/* Animated Circles */}
                {[...Array(4)].map((_, index) => (
                    <motion.div
                        key={`circle-${index}`}
                        className="absolute w-16 h-16"
                        style={{
                            bottom: '20%',
                            left: `${20 + index * 25}%`,
                        }}
                        variants={pulse}
                        custom={index}
                    >
                        <motion.div 
                            className="w-full h-full rounded-full bg-[#4CAF50] bg-opacity-10"
                            whileHover={{ scale: 1.1 }}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Background Effects */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    background: [
                        "radial-gradient(circle at 30% 30%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)",
                        "radial-gradient(circle at 70% 70%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)",
                        "radial-gradient(circle at 30% 30%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)",
                    ]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
}
