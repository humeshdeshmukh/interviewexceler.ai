'use client';

import { motion } from 'framer-motion';
import { FaDollarSign, FaChartLine, FaHandshake } from 'react-icons/fa';

interface SpinningIconsProps {
  className?: string;
}

export const SpinningIcons: React.FC<SpinningIconsProps> = ({ className }) => {
  const iconVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  return (
    <motion.div
      className={`relative w-48 h-48 ${className}`}
      variants={containerVariants}
      animate="animate"
    >
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        variants={iconVariants}
        initial="initial"
        animate="animate"
      >
        <FaDollarSign className="text-4xl text-[#fcba28]" />
      </motion.div>
      <motion.div
        className="absolute bottom-0 right-0"
        variants={iconVariants}
        initial="initial"
        animate="animate"
      >
        <FaChartLine className="text-4xl text-[#fcba28]" />
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0"
        variants={iconVariants}
        initial="initial"
        animate="animate"
      >
        <FaHandshake className="text-4xl text-[#fcba28]" />
      </motion.div>
    </motion.div>
  );
};

export default SpinningIcons;
