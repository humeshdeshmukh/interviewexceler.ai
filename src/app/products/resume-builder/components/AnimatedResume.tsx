"use client";

import { motion } from 'framer-motion';

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

export function AnimatedResume() {
    return (
        <motion.div
            className="relative w-full h-full"
            initial="hidden"
            animate="visible"
        >
            {/* Main Resume Paper */}
            <motion.svg
                width="400"
                height="500"
                viewBox="0 0 400 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 right-0"
                variants={float}
            >
                {/* Background */}
                <motion.rect
                    x="50"
                    y="20"
                    width="300"
                    height="460"
                    rx="8"
                    fill="#1a1a1a"
                    stroke="#fcba28"
                    strokeWidth="2"
                    variants={draw}
                />

                {/* Header Section */}
                <motion.circle
                    cx="100"
                    cy="80"
                    r="30"
                    fill="#fcba28"
                    opacity="0.2"
                    variants={pulse}
                />
                <motion.rect
                    x="150"
                    y="60"
                    width="160"
                    height="12"
                    rx="2"
                    fill="#fcba28"
                    opacity="0.6"
                    variants={draw}
                />
                <motion.rect
                    x="150"
                    y="80"
                    width="120"
                    height="8"
                    rx="2"
                    fill="#fcba28"
                    opacity="0.4"
                    variants={draw}
                />

                {/* Content Lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.rect
                        key={`section-${i}`}
                        x="80"
                        y={140 + i * 70}
                        width="240"
                        height="50"
                        rx="4"
                        fill="#2a2a2a"
                        variants={draw}
                    />
                ))}

                {/* Animated Elements */}
                <motion.circle
                    cx="350"
                    cy="40"
                    r="15"
                    fill="#4CAF50"
                    opacity="0.3"
                    variants={pulse}
                />
                <motion.circle
                    cx="40"
                    cy="460"
                    r="20"
                    fill="#2196F3"
                    opacity="0.3"
                    variants={pulse}
                />

                {/* AI Highlights */}
                {[0, 1, 2].map((i) => (
                    <motion.rect
                        key={`highlight-${i}`}
                        x={100 + i * 100}
                        y="420"
                        width="80"
                        height="30"
                        rx="4"
                        fill="#fcba28"
                        opacity="0.1"
                        variants={pulse}
                    />
                ))}
            </motion.svg>

            {/* Floating Elements */}
            <motion.svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                className="absolute top-10 right-10"
                variants={float}
                custom={1}
            >
                <motion.path
                    d="M50 10L61.7 35.8L90 40.1L70 60.1L74.3 90L50 75.8L25.7 90L30 60.1L10 40.1L38.3 35.8L50 10Z"
                    fill="#fcba28"
                    opacity="0.2"
                    variants={draw}
                />
            </motion.svg>

            {/* AI Processing Lines */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={`line-${i}`}
                    className="absolute"
                    style={{
                        top: `${150 + i * 100}px`,
                        right: '-20px',
                        width: '40px',
                        height: '2px',
                        background: '#fcba28',
                        opacity: 0.3
                    }}
                    animate={{
                        x: [-40, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </motion.div>
    );
}
