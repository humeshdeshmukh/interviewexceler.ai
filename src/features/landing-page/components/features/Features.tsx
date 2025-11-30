"use client";

import { motion } from 'framer-motion';
import { Brain, Code, Target, Presentation, Clock, Award, BarChart, Laptop, Github, Sparkles, Star, Trophy, Users } from 'lucide-react';
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

const BentoFeature = ({ icon: Icon, title, description, color, children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-xl p-6 ${className}`}
      style={{
        background: `linear-gradient(to bottom right, ${color}20, ${color}05)`
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{ backgroundColor: `${color}10` }}
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

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-6 h-6" style={{ color }} />
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-white/70 mb-4">{description}</p>
        {children}
      </div>
    </motion.div>
  );
};

const HighlightItem = ({ icon: Icon, title, value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center p-4 text-center"
    >
      <Icon className="w-8 h-8 mb-2 text-brand-yellow" />
      <h4 className="text-2xl font-bold mb-1">{value}</h4>
      <p className="text-white/70">{title}</p>
    </motion.div>
  );
};

export const Features = () => {
  return (
    <section className="relative py-20">
      <MaxWidthWrapper>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Master Your Interview Skills
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our comprehensive platform provides everything you need to excel in technical interviews
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <BentoFeature
            icon={Brain}
            title="AI-Powered Practice"
            description="Get personalized feedback and recommendations from our advanced AI system"
            color="#ff4d4d"
            className="md:col-span-2"
          >
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#ff4d4d]" />
                <span className="text-white/80">Smart Assessments</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-[#ff4d4d]" />
                <span className="text-white/80">Real-time Feedback</span>
              </div>
            </div>
          </BentoFeature>

          <BentoFeature
            icon={Presentation}
            title="Mock Interviews"
            description="Practice with real interview scenarios"
            color="#fcba28"
          >
            <div className="flex items-center gap-2 mt-4">
              <Clock className="w-5 h-5 text-[#fcba28]" />
              <span className="text-white/80">30-60 min sessions</span>
            </div>
          </BentoFeature>

          <BentoFeature
            icon={Award}
            title="Skill Tracking"
            description="Monitor your progress and improvements"
            color="#0ba95b"
          >
            <div className="flex items-center gap-2 mt-4">
              <BarChart className="w-5 h-5 text-[#0ba95b]" />
              <span className="text-white/80">Performance Analytics</span>
            </div>
          </BentoFeature>

          <BentoFeature
            icon={Laptop}
            title="Live Coding"
            description="Code and debug in real-time"
            color="#2563eb"
            className="md:col-span-2"
          >
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-[#2563eb]" />
                <span className="text-white/80">Multiple Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-[#2563eb]" />
                <span className="text-white/80">GitHub Integration</span>
              </div>
            </div>
          </BentoFeature>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-xl bg-foreground/5"
        >
          <HighlightItem
            icon={Sparkles}
            title="Practice Questions"
            value="500+"
          />
          <HighlightItem
            icon={Users}
            title="Active Users"
            value="10K+"
          />
          <HighlightItem
            icon={Star}
            title="Success Rate"
            value="95%"
          />
          <HighlightItem
            icon={Trophy}
            title="Job Offers"
            value="1000+"
          />
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Features;