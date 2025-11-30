"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface CTAButtonProps {
    href: string;
    variant: 'primary' | 'secondary' | 'outline';
    icon?: LucideIcon;
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const variants = {
    primary: "bg-gradient-to-r from-[#fcba28] to-[#ffcd4b] text-black font-semibold",
    secondary: "bg-white/10 hover:bg-white/20 text-white",
    outline: "border-2 border-[#fcba28] text-[#fcba28] hover:bg-[#fcba28]/10"
};

const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
};

const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
        scale: 1.05,
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    },
    tap: { 
        scale: 0.95,
        transition: {
            duration: 0.1,
            ease: "easeInOut"
        }
    }
};

const glowVariants = {
    rest: { opacity: 0 },
    hover: { 
        opacity: [0.5, 0.7, 0.5],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export function CTAButton({ 
    href, 
    variant = 'primary', 
    icon: Icon, 
    children,
    className = '',
    size = 'md'
}: CTAButtonProps) {
    return (
        <Link href={href}>
            <motion.div
                className="relative"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
            >
                {variant === 'primary' && (
                    <motion.div
                        className="absolute inset-0 bg-[#fcba28] rounded-lg blur-xl"
                        variants={glowVariants}
                    />
                )}
                <motion.div
                    className={`
                        relative flex items-center justify-center gap-2 rounded-lg
                        transition-colors duration-200
                        ${variants[variant]}
                        ${sizes[size]}
                        ${className}
                    `}
                    variants={buttonVariants}
                >
                    {Icon && <Icon className="w-5 h-5" />}
                    <span>{children}</span>
                    {variant === 'primary' && (
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                            animate={{
                                x: ['-100%', '100%'],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    )}
                </motion.div>
            </motion.div>
        </Link>
    );
}
