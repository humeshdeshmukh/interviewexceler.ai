"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const BackgroundEffects = () => {
  return (
    <>
      <BackgroundGradient />
      <GridPattern />
      <FloatingShapes />
    </>
  );
};

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

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Salary-themed shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
        animate={{ 
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-[#fcba28]/20 backdrop-blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.2, 1],
          rotate: [-45, -35, -45]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.2
        }}
        className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-lg border border-[#fcba28]/20 backdrop-blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.15, 1],
          rotate: [45, 35, 45]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.4
        }}
        className="absolute top-1/3 left-1/3 w-32 h-32 rounded-lg border border-[#fcba28]/20 backdrop-blur-3xl"
      />

      {/* Dollar sign shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.6
        }}
        className="absolute top-1/2 right-1/3 w-24 h-24 flex items-center justify-center"
      >
        <span className="text-6xl font-bold text-[#fcba28]/10">$</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.1, 0.15, 0.1],
          scale: [1, 1.05, 1],
          y: [0, 20, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.8
        }}
        className="absolute bottom-1/3 right-1/4 w-16 h-16 flex items-center justify-center"
      >
        <span className="text-4xl font-bold text-[#fcba28]/10">$</span>
      </motion.div>
    </div>
  );
};
