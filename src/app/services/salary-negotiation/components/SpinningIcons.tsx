"use client";

import { motion } from 'framer-motion';
import { FaDollarSign, FaChartLine, FaHandshake, FaUserTie } from 'react-icons/fa';

const icons = [
  { Icon: FaDollarSign, color: '#fcba28', delay: 0 },
  { Icon: FaChartLine, color: '#fcba28', delay: 0.2 },
  { Icon: FaHandshake, color: '#fcba28', delay: 0.4 },
  { Icon: FaUserTie, color: '#fcba28', delay: 0.6 },
];

const iconVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.2,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function SpinningIcons() {
  return (
    <motion.div
      className="flex justify-center items-center gap-8 my-12"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {icons.map(({ Icon, color, delay }, index) => (
        <motion.div
          key={index}
          className="relative"
          variants={iconVariants}
          whileHover="hover"
          custom={delay}
        >
          <motion.div
            className="absolute inset-0 bg-[#fcba28]/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: delay,
            }}
          />
          <div className="relative z-10 p-4 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
            <Icon className="w-8 h-8 text-[#fcba28]" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
