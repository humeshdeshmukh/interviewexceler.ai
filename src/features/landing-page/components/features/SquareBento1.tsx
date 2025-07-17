import { Presentation, Clock } from "lucide-react";
import { CardBentoWrapper } from "./CardBentoWrapper";
import { motion } from 'framer-motion';

export const SquareBento1 = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative h-full w-full bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/5 rounded-xl p-6 group"
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-brand-yellow/10 rounded-xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 space-y-4">
        <motion.div variants={itemVariants} className="flex items-center space-x-3">
          <Presentation className="w-8 h-8 text-brand-yellow" />
          <h3 className="text-xl font-bold text-white">Mock Interviews</h3>
        </motion.div>

        <motion.p variants={itemVariants} className="text-white/70">
          Practice with realistic interview scenarios and get instant feedback.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-4 flex items-center space-x-2"
        >
          <Clock className="w-5 h-5 text-brand-yellow" />
          <span className="text-white/80">30-60 minute sessions</span>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-4 right-4 w-16 h-16"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-brand-yellow/30">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SquareBento1;
