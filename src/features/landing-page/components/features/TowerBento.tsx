import Image from "next/image";
import {
    User,
    Layers,
    Palette,
    BookOpen,
    LifeBuoy,
    Settings,
    Megaphone,
    Proportions,
} from "lucide-react";
import { CardBentoIcon } from "./CardBentoIcon";
import { CardBentoWrapper } from "./CardBentoWrapper";
import { motion } from 'framer-motion';
import { Brain, Code, Target } from 'lucide-react';

export const TowerBento = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative h-full w-full bg-gradient-to-br from-brand-red/20 to-brand-red/5 rounded-xl p-6 group"
        >
            {/* Background Animation */}
            <motion.div
                className="absolute inset-0 bg-brand-red/10 rounded-xl"
                animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="relative z-10 space-y-6">
                <motion.div variants={itemVariants} className="flex items-center space-x-3">
                    <Brain className="w-8 h-8 text-brand-red" />
                    <h3 className="text-xl font-bold text-white">AI-Powered Interview Prep</h3>
                </motion.div>

                <motion.p variants={itemVariants} className="text-white/70">
                    Practice with our advanced AI system that adapts to your skill level and provides personalized feedback.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                        <Code className="w-5 h-5 text-brand-red" />
                        <span className="text-white/80">Real-time code evaluation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-brand-red" />
                        <span className="text-white/80">Targeted practice sessions</span>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-4 right-4"
                    animate={{
                        y: [0, -5, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <svg width="40" height="40" viewBox="0 0 40 40" className="text-brand-red">
                        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path
                            d="M20 12v16M28 20l-8 8-8-8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.div>
            </div>
        </motion.div>
    );
};

const Mockup = () => (
    <div className="absolute -bottom-4 left-6 h-[340px] w-full overflow-hidden rounded-xl border border-zinc-700 bg-background sm:h-[370px]">
        <MockupTopBar />
        <div className="flex h-full w-full">
            <MockupSidebar />
            <MockupMain />
        </div>
    </div>
);

const MockupSidebar = () => (
    <div className="h-full w-30 border-r border-zinc-700 bg-zinc-900 p-2">
        <div className="flex items-center mb-4">
            <Image src="/logo.svg" alt="InterviewMaster Logo" width={25} height={25} />
            <p className="text-foreground text-xs">InterviewMaster</p> {/* Updated name */}
        </div>
        <div className="space-y-2 flex flex-col items-start">
            <div className="flex items-center gap-1 rounded px-1 py-0.5 text-xs text-zinc-600">
                <User className="size-4" />
                Profile
            </div>
            <div className="flex items-center gap-1 rounded px-1 py-0.5 text-xs text-zinc-600">
                <BookOpen className="size-4" />
                Resources
            </div>
            <div className="flex items-center gap-1 rounded px-1 py-0.5 text-xs text-zinc-600">
                <Proportions className="size-4" />
                Courses
            </div>
            <div className="flex items-center gap-1 rounded px-1 py-0.5 text-xs text-zinc-600">
                <Layers className="size-4" />
                Mock Interviews
            </div>
            <div className="flex items-center gap-1 rounded px-1 py-0.5 text-xs text-zinc-600">
                <Settings className="size-4" />
                Settings
            </div>
            <div className="flex items-center gap-1 rounded px-1 py-0.5 text-xs text-zinc-600">
                <LifeBuoy className="size-4" />
                Help Center
            </div>
            <div className="flex items-center gap-1 rounded px-1 py-0.5 text-xs text-zinc-600">
                <Megaphone className="size-4" />
                Feedback
            </div>
        </div>
    </div>
);

const MockupTopBar = () => (
    <div className="flex gap-1 border-b border-zinc-700 bg-background p-2">
        <div className="size-2 rounded-full bg-red-600"></div>
        <div className="size-2 rounded-full bg-yellow-600"></div>
        <div className="size-2 rounded-full bg-green-600"></div>
    </div>
);

const MockupMain = () => {
    return (
        <div className="relative w-full">
            <div className="relative z-0 w-full p-4">
                <div className="w-full border-b border-zinc-700 text-foreground pb-2 text-xs font-semibold">
                    Interview Preparation Resources
                </div>
                <div className="w-full h-full grid grid-cols-3 gap-4 my-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <div key={i} className="border border-zinc-700 rounded-lg bg-neutral-900 animate-pulse h-[50px] w-full"/>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 top-1/4 z-10 bg-gradient-to-b from-zinc-950/0 via-zinc-950/90 to-zinc-950" />
        </div>
    );
};
