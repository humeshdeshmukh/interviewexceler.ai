"use client";

import { motion } from 'framer-motion';
import { Brain, UserCog, LightbulbIcon, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Card, FeatureCard } from './ui';
import { AnimatedResume } from './AnimatedResume';
import { AnimatedProfessional } from './AnimatedProfessional';

const services = [
    {
        title: 'AI Resume Builder',
        description: 'Create a professional resume instantly with our AI-powered tools. Get real-time suggestions and ATS optimization.',
        icon: Brain,
        href: '/products/resume-builder/features/ai',
        features: [
            'Smart content suggestions',
            'ATS keyword optimization',
            'Professional formatting',
            'Industry-specific templates'
        ],
        color: '#fcba28',
        animation: AnimatedResume
    },
    {
        title: 'Professional Service',
        description: 'Work with certified resume experts who understand your industry and career goals.',
        icon: UserCog,
        href: '/products/resume-builder/features/professional',
        features: [
            'One-on-one consultation',
            'Industry-specific expertise',
            'Unlimited revisions',
            'Interview preparation'
        ],
        color: '#4CAF50',
        animation: AnimatedProfessional
    },
    {
        title: 'Resume Tips & Resources',
        description: 'Access our comprehensive library of expert tips, templates, and industry insights.',
        icon: LightbulbIcon,
        href: '/products/resume-builder/features/tips',
        features: [
            'Industry best practices',
            'Keyword optimization guides',
            'Format templates',
            'Career advancement tips'
        ],
        color: '#2196F3'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
};

export function FeaturesSection() {
    return (
        <motion.div 
            className="space-y-12 py-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-center mb-12"
            >
                Choose Your Path
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group min-h-[500px]"
                    >
                        <Link href={service.href} className="block h-full">
                            <Card className="h-full p-6 space-y-6 hover:bg-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-[#fcba28]/10 relative overflow-hidden">
                                {service.animation && (
                                    <motion.div 
                                        className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent z-10" />
                                        <service.animation />
                                    </motion.div>
                                )}
                                <div className="relative z-20">
                                    <FeatureCard
                                        icon={service.icon}
                                        title={service.title}
                                        description={service.description}
                                        color={service.color}
                                        delay={0.5 + index * 0.1}
                                    />
                                    <ul className="space-y-2 mt-6">
                                        {service.features.map((feature, featureIndex) => (
                                            <motion.li
                                                key={featureIndex}
                                                variants={itemVariants}
                                                className="flex items-center gap-2 text-sm text-white/60 hover:text-white/80 transition-colors"
                                            >
                                                <motion.div
                                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    <CheckCircle2 className="w-4 h-4" style={{ color: service.color }} />
                                                </motion.div>
                                                {feature}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
