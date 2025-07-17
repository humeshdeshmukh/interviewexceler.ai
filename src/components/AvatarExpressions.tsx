"use client";

import { motion } from 'framer-motion';

export const expressions = {
  happy: {
    mouth: "M 25,40 Q 40,48 55,40",
    eyebrows: {
      left: "M 80,58 L 90,62",
      right: "M 110,62 L 120,58"
    }
  },
  neutral: {
    mouth: "M 25,40 Q 40,43 55,40",
    eyebrows: {
      left: "M 80,58 L 90,60",
      right: "M 110,60 L 120,58"
    }
  },
  thinking: {
    mouth: "M 25,42 Q 40,40 55,42",
    eyebrows: {
      left: "M 80,56 L 90,58",
      right: "M 110,62 L 120,60"
    }
  },
  confident: {
    mouth: "M 25,38 Q 40,45 55,38",
    eyebrows: {
      left: "M 80,60 L 90,58",
      right: "M 110,58 L 120,60"
    }
  }
};

export const gestures = {
  nod: {
    head: {
      rotate: [0, 5, 0, 5, 0],
      transition: {
        repeat: 2,
        duration: 1,
        ease: "easeInOut"
      }
    }
  },
  shake: {
    head: {
      rotate: [0, -5, 0, 5, 0],
      transition: {
        repeat: 2,
        duration: 1,
        ease: "easeInOut"
      }
    }
  },
  wave: {
    hand: {
      rotate: [0, -45, 0],
      transition: {
        repeat: 3,
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }
};

interface EmotionProps {
  type: keyof typeof expressions;
  intensity?: number;
}

export function EmotionOverlay({ type, intensity = 1 }: EmotionProps) {
  const expression = expressions[type];
  
  return (
    <motion.g
      initial="neutral"
      animate={type}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <motion.path
        d={expression.mouth}
        stroke="#34495e"
        strokeWidth={2 * intensity}
        fill="none"
        strokeLinecap="round"
      />
      <motion.path
        d={expression.eyebrows.left}
        stroke="#34495e"
        strokeWidth={2 * intensity}
        fill="none"
        strokeLinecap="round"
      />
      <motion.path
        d={expression.eyebrows.right}
        stroke="#34495e"
        strokeWidth={2 * intensity}
        fill="none"
        strokeLinecap="round"
      />
    </motion.g>
  );
}
