"use client";

import { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { PageContainer } from './ui/PageContainer';
import { FeatureCard } from './ui/FeatureCard';
import { StatCard } from './ui/StatCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, FileText, UserCog, LightbulbIcon, CheckCircle2, 
    Trophy, Target, Brain, Users, Sparkles, Zap, Star,
    GraduationCap, Briefcase, BarChart, Download, Rocket,
    PenTool, Globe, Shield
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
        color: '#fcba28'
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
        color: '#4CAF50'
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

const stats = [
    { 
        icon: FileText, 
        value: '50,000+', 
        label: 'Resumes Created',
        description: 'Trusted by professionals worldwide'
    },
    { 
        icon: Trophy, 
        value: '98%', 
        label: 'Success Rate',
        description: 'Of users land interviews'
    },
    { 
        icon: Users, 
        value: '30,000+', 
        label: 'Happy Users',
        description: 'And growing every day'
    },
];

const features = [
    {
        icon: Zap,
        title: 'Instant Generation',
        description: 'Create a professional resume in minutes with our AI-powered tools',
        color: '#fcba28'
    },
    {
        icon: Shield,
        title: 'ATS Optimized',
        description: 'Ensure your resume passes Applicant Tracking Systems with smart keyword optimization',
        color: '#4CAF50'
    },
    {
        icon: PenTool,
        title: 'Expert Guidance',
        description: 'Get personalized suggestions from certified resume experts',
        color: '#2196F3'
    },
    {
        icon: Globe,
        title: 'Industry Specific',
        description: 'Access templates and content tailored to your industry',
        color: '#9C27B0'
    },
    {
        icon: Rocket,
        title: 'Performance Tracking',
        description: "Monitor your resume's performance and get improvement suggestions",
        color: '#FF5722'
    }
];

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Software Engineer",
        company: "Tech Corp",
        content: "The AI suggestions were spot-on! Landed my dream job within weeks.",
        avatar: "/avatars/avatar1.jpg"
    },
    {
        name: "Michael Chen",
        role: "Marketing Manager",
        company: "Brand Co",
        content: "Professional writers helped me highlight my achievements perfectly.",
        avatar: "/avatars/avatar2.jpg"
    },
    {
        name: "Emily Davis",
        role: "Product Designer",
        company: "Design Studio",
        content: "Clean templates and excellent ATS optimization. Highly recommend!",
        avatar: "/avatars/avatar3.jpg"
    }
];

export default function ResumeBuilderPage() {
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    return (
        <PageContainer
            badge={{
                icon: Sparkles,
                text: "AI-Powered Resume Builder"
            }}
            title={{
                main: "Build Your Perfect",
                highlight: "Resume",
                end: "with AI"
            }}
            description="Create a professional resume that stands out with our AI-powered tools and expert guidance"
        >
            <div className="space-y-24">
                {/* Hero Section with Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Button href="/products/resume-builder/features/ai" variant="primary" icon>
                                    Start Building <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                                <Button href="/products/resume-builder/features/professional" variant="secondary">
                                    Professional Service
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                            <Image
                                src="/resume-preview.png"
                                alt="Resume Preview"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-[#fcba28] text-black p-4 rounded-lg shadow-lg">
                            <div className="flex items-center gap-2">
                                <Download className="w-5 h-5" />
                                <span className="font-medium">Export to PDF/DOCX</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                        >
                            <Card className="p-6 hover:bg-white/5 transition-colors">
                                <StatCard
                                    icon={stat.icon}
                                    value={stat.value}
                                    label={stat.label}
                                    description={stat.description}
                                    delay={0.4 + index * 0.1}
                                />
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Features Grid */}
                <div className="space-y-12">
                    <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-3xl font-bold text-center"
                    >
                        Powerful Features for Your Success
                    </motion.h2>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                <Card className="p-6 hover:bg-white/5 transition-colors">
                                    <div className="flex gap-4">
                                        <motion.div
                                            animate={{
                                                y: [-2, 2, -2],
                                                rotate: [-5, 5, -5],
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            className="p-2 rounded-lg"
                                            style={{ backgroundColor: `${feature.color}20` }}
                                        >
                                            <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                                        </motion.div>
                                        <div>
                                            <h3 className="font-semibold mb-1">{feature.title}</h3>
                                            <p className="text-sm text-white/60">{feature.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Services Grid */}
                <div className="space-y-12">
                    <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-3xl font-bold text-center"
                    >
                        Choose Your Path
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <Link key={service.title} href={service.href} className="group">
                                <Card className="h-full p-6 space-y-6 hover:bg-white/5 transition-colors">
                                    <FeatureCard
                                        icon={service.icon}
                                        title={service.title}
                                        description={service.description}
                                        color={service.color}
                                        delay={0.5 + index * 0.1}
                                    />
                                    <ul className="space-y-2">
                                        {service.features.map((feature, featureIndex) => (
                                            <motion.li
                                                key={featureIndex}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 + index * 0.1 + featureIndex * 0.05 }}
                                                className="flex items-center gap-2 text-sm text-white/60"
                                            >
                                                <CheckCircle2 className="w-4 h-4" style={{ color: service.color }} />
                                                {feature}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="space-y-12">
                    <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-3xl font-bold text-center"
                    >
                        What Our Users Say
                    </motion.h2>
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTestimonial}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center space-y-6"
                            >
                                <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden">
                                    <Image
                                        src={testimonials[activeTestimonial].avatar}
                                        alt={testimonials[activeTestimonial].name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <p className="text-lg italic text-white/80">"{testimonials[activeTestimonial].content}"</p>
                                <div>
                                    <h4 className="font-semibold">{testimonials[activeTestimonial].name}</h4>
                                    <p className="text-sm text-white/60">
                                        {testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        activeTestimonial === index ? 'bg-[#fcba28]' : 'bg-white/20'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col gap-3"
                >
                    {[
                        "AI-powered resume analysis and optimization",
                        "Professional templates for every industry",
                        "Expert guidance and real-time feedback",
                        "24/7 customer support",
                        "100% satisfaction guarantee"
                    ].map((text, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            className="flex items-center gap-2 text-sm text-white/60"
                        >
                            <CheckCircle2 className="w-4 h-4 text-[#fcba28]" />
                            {text}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </PageContainer>
    );
}
