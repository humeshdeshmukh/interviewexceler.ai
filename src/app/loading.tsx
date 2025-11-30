'use client';

import { motion } from 'framer-motion';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Logo } from '@/components/Logo';

const loadingVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: 1.1,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

const progressVariants = {
  initial: { width: "0%" },
  animate: {
    width: "100%",
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Loading() {
  return (
    <MaxWidthWrapper>
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <motion.div
          variants={loadingVariants}
          initial="initial"
          animate="animate"
          className="text-center space-y-8"
        >
          {/* Logo Animation */}
          <motion.div
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            className="mb-8"
          >
            <Logo className="w-32 h-32" />
          </motion.div>

          {/* Loading Text */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Loading Amazing Content
            </h2>
            <p className="text-muted-foreground">
              Please wait while we prepare your experience
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-background/20 rounded-full overflow-hidden mt-8">
            <motion.div
              variants={progressVariants}
              initial="initial"
              animate="animate"
              className="h-full bg-[#fcba28] rounded-full"
            />
          </div>
        </motion.div>

        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 -z-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          >
            <div className="absolute inset-0 bg-[#fcba28]/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 rotate-45 bg-[#fcba28]/5 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </MaxWidthWrapper>
  );
}