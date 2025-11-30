'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function BackgroundEffects() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    // Generate particle positions only on client-side
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />

      {/* Top right accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2820_0%,transparent_70%)] blur-3xl" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2815_0%,transparent_60%)] blur-2xl"
        />
      </div>

      {/* Bottom left accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7c3aed20_0%,transparent_70%)] blur-3xl" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            delay: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7c3aed15_0%,transparent_60%)] blur-2xl"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [null, -20, 20],
              x: [null, -20, 20],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
