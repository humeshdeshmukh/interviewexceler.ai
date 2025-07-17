"use client";

import { motion } from "framer-motion";
import { Brain, Target, Shield, UserCheck, Zap, Trophy } from "lucide-react";

const features = [
  {
    title: "AI-Powered Feedback",
    description: "Get instant, personalized feedback on your responses and delivery",
    icon: Brain
  },
  {
    title: "Real-time Analysis",
    description: "Monitor your performance metrics during the interview",
    icon: Target
  },
  {
    title: "Secure Environment",
    description: "Practice in a safe, judgment-free space",
    icon: Shield
  },
  {
    title: "Expert Validation",
    description: "Questions and scenarios validated by industry experts",
    icon: UserCheck
  },
  {
    title: "Quick Progress",
    description: "See improvement in just a few practice sessions",
    icon: Zap
  },
  {
    title: "Success Tracking",
    description: "Track your progress and celebrate improvements",
    icon: Trophy
  }
];

export const FeaturesGridSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-white/60">Everything you need to ace your interviews</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
            >
              <feature.icon className="w-8 h-8 text-[#fcba28] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
