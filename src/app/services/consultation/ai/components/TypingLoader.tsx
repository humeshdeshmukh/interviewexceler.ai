import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

export const TypingLoader = () => {
  return (
    <div className="flex items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-xl max-w-[200px]">
      <div className="w-6 h-6 flex items-center justify-center bg-purple-900/30 rounded-full">
        <FaRobot className="w-4 h-4 text-[#fcba28]" />
      </div>
      <div className="flex gap-1">
        <motion.div
          className="w-2 h-2 bg-[#fcba28] rounded-full"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0,
          }}
        />
        <motion.div
          className="w-2 h-2 bg-[#fcba28] rounded-full"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
        <motion.div
          className="w-2 h-2 bg-[#fcba28] rounded-full"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
      </div>
    </div>
  );
};
