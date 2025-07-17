"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AvatarProps {
  avatarState: 'idle' | 'speaking' | 'thinking' | 'demonstrating';
  className?: string;
}

const robotImages = {
  idle: '/images/robot/robot-idle.png',
  speaking: '/images/robot/robot-speaking.png',
  thinking: '/images/robot/robot-thinking.png',
  demonstrating: '/images/robot/robot-demonstrating.png'
};

export default function Avatar({ avatarState = 'idle', className = '' }: AvatarProps) {
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [eyeColor, setEyeColor] = useState('#4ae3f0');

  // Animation variants for the container
  const containerVariants = {
    idle: {
      y: [0, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut"
      }
    },
    speaking: {
      y: [0, -2, 0],
      transition: {
        repeat: Infinity,
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    thinking: {
      rotate: [-1, 1, -1],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    },
    demonstrating: {
      scale: [1, 1.02, 1],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  // Glow effect animation
  useEffect(() => {
    const glowAnimation = setInterval(() => {
      setGlowIntensity(prev => (prev + 1) % 20);
    }, 50);

    return () => clearInterval(glowAnimation);
  }, []);

  // Eye color animation based on state
  useEffect(() => {
    const colors = {
      idle: '#4ae3f0',
      speaking: '#4af0a7',
      thinking: '#f04a4a',
      demonstrating: '#f0e54a'
    };
    setEyeColor(colors[avatarState]);
  }, [avatarState]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <motion.div
        className="relative w-full h-full"
        variants={containerVariants}
        animate={avatarState}
      >
        {/* Robot Base Image */}
        <div className="relative w-full h-full">
          <Image
            src={robotImages[avatarState]}
            alt="Robot Avatar"
            layout="fill"
            objectFit="contain"
            priority
            className="drop-shadow-2xl"
          />

          {/* Glowing Effects */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${eyeColor}${Math.floor(glowIntensity).toString(16)}, transparent 70%)`
            }}
          />

          {/* Circuit Pattern Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[url('/images/robot/circuit-pattern.png')] opacity-10" />
        </div>

        {/* State Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: eyeColor }}
          />
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: eyeColor }}
          />
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6
            }}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: eyeColor }}
          />
        </div>
      </motion.div>
    </div>
  );
}
