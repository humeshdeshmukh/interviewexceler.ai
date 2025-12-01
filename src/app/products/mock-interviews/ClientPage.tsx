"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Video, Brain, Target, ChevronRight, Sparkles, ArrowRight,
    MessageSquare, BarChart, Shield, UserCheck, Zap, Trophy,
    BookOpen, Users, Clock, Star, CheckCircle, PieChart
} from "lucide-react";
import { useState } from "react";
import { HeroSection } from './components/HeroSection';
import { NavigationSection } from './components/NavigationSection';
import { FeaturesGridSection } from './components/FeaturesGridSection';
import { CTACallToActionSection } from './components/CTACallToActionSection';

// Component imports
const InterviewTrack = ({ title, description, icon: Icon, color, difficulty, duration }: any) => (
    <div className="relative group cursor-pointer">
        <div className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-1 rounded-2xl transition-opacity duration-300`} />
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all">
            <div className="flex items-start justify-between mb-4">
                <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${color} bg-opacity-20`}>{difficulty}</span>
                    <span className="text-xs text-white/60">{duration}</span>
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-white/60 mb-4">{description}</p>
            <div className="flex items-center text-white/80 hover:text-white transition-colors">
                <span className="text-sm">Start Track</span>
                <ArrowRight className="w-4 h-4 ml-2" />
            </div>
        </div>
    </div>
);

const Statistic = ({ value, label, icon: Icon, color }: any) => (
    <div className="text-center">
        <div className={`w-12 h-12 ${color} bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3`}>
            <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-white/60">{label}</div>
    </div>
);

const TestimonialCard = ({ name, role, content, rating }: any) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10"
    >
        <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-white/20'}`} />
            ))}
        </div>
        <p className="text-white/80 mb-4">{content}</p>
        <div>
            <div className="font-medium text-white">{name}</div>
            <div className="text-sm text-white/60">{role}</div>
        </div>
    </motion.div>
);

export default function MockInterviewLanding() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
            {/* Hero Section */}
            <HeroSection />

            {/* Navigation Section */}
            <NavigationSection />

            {/* Statistics Section
      <StatisticsSection /> */}

            {/* Interview Tracks
      <InterviewTracksSection /> */}

            {/* Features Grid */}
            <FeaturesGridSection />

            {/* Testimonials
      <TestimonialsSection /> */}

            {/* FAQ Section
      <FAQSection /> */}

            {/* CTA Section */}
            <CTACallToActionSection />
        </div>
    );
}

const features = [
    {
        title: "AI-Powered Analysis",
        description: "Get instant feedback on your responses and body language",
        icon: Brain
    },
    {
        title: "Real-time Feedback",
        description: "Receive suggestions for improvement as you practice",
        icon: Zap
    },
    {
        title: "Video Analysis",
        description: "Review your recorded sessions with detailed insights",
        icon: Video
    },
    {
        title: "Progress Tracking",
        description: "Monitor your improvement over time with detailed metrics",
        icon: BarChart
    },
    {
        title: "Custom Scenarios",
        description: "Practice with industry-specific interview scenarios",
        icon: Target
    },
    {
        title: "Expert Tips",
        description: "Access curated interview tips from industry professionals",
        icon: Sparkles
    }
];

const faqs = [
    {
        question: "How does the AI interview simulation work?",
        answer: "Our AI uses advanced natural language processing and computer vision to analyze your responses, facial expressions, and body language in real-time, providing instant feedback and suggestions for improvement."
    },
    {
        question: "What types of interviews can I practice?",
        answer: "We offer various interview types including technical, behavioral, leadership, and industry-specific interviews. Each type is customized to match real-world scenarios."
    },
    {
        question: "How accurate is the AI feedback?",
        answer: "Our AI is trained on millions of successful interview interactions and is constantly updated with the latest interview practices, providing highly accurate and relevant feedback."
    },
    {
        question: "Can I track my progress over time?",
        answer: "Yes! Our platform provides detailed analytics and progress tracking, showing your improvement in various areas like communication skills, technical knowledge, and confidence."
    }
];
