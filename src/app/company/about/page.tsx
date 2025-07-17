"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import {
  companyStats,
  companyValues,
  companyMilestones,
  teamMembers,
  companyDescription,
} from "./data/company";

const BackgroundGradient = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div ref={ref} style={{ opacity }} className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
    </motion.div>
  );
};

const GridPattern = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.div ref={ref} style={{ y }} className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,#fcba2815,transparent)]" />
    </motion.div>
  );
};

export default function About() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <BackgroundGradient />
      <GridPattern />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              About InterviewExceler.Ai
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-12">
              {companyDescription.about}
            </p>
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Stats Section
      <section className="relative py-16">
        <MaxWidthWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {companyStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-lg p-6 text-center transition-colors"
                >
                  <div className="flex justify-center text-[#fcba28] mb-2">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-white/60">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </section> */}

      {/* Mission & Vision Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-8 transition-colors"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/60">{companyDescription.mission}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-8 transition-colors"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/60">{companyDescription.vision}</p>
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Values Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <h2 className="text-3xl font-bold text-center text-white mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-colors"
                >
                  <div className="flex justify-center text-[#fcba28] mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white text-center mb-2">
                    {value.title}
                  </h3>
                  <p className="text-white/60 text-center">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Milestones Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <h2 className="text-3xl font-bold text-center text-white mb-12">Our Journey</h2>
          <div className="space-y-8">
            {companyMilestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center gap-8"
              >
                <div className="w-24 text-center">
                  <span className="text-2xl font-bold text-[#fcba28]">{milestone.year}</span>
                </div>
                <div className="flex-1 group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-colors">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-white/60">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Team Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <h2 className="text-3xl font-bold text-center text-white mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-[#fcba28] mb-3">{member.role}</p>
                <p className="text-white/60">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Features Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyDescription.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-colors"
              >
                <p className="text-white/80">{feature}</p>
              </motion.div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
