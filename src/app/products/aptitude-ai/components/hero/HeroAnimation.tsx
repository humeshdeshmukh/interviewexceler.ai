"use client";

import { motion } from "framer-motion";

export const HeroAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#fcba28]/5 via-white/5 to-[#fcba28]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-[500px] h-[500px]"
      >
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="white"
              strokeWidth="0.2"
              strokeDasharray="1,3"
              animate={{
                strokeDashoffset: [0, -10],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </svg>
        </motion.div>

        {/* Middle rotating ring */}
        <motion.div
          className="absolute inset-[15%]"
          animate={{ rotate: -360 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#fcba28"
              strokeWidth="0.3"
              strokeDasharray="1,2"
            />
          </svg>
        </motion.div>

        {/* Neural network nodes - White */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`white-${i}`}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
              filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Neural network nodes - Golden */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`golden-${i}`}
            className="absolute w-3 h-3 bg-[#fcba28] rounded-full"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full">
          {/* White lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line
              key={`white-line-${i}`}
              x1={Math.random() * 100 + "%"}
              y1={Math.random() * 100 + "%"}
              x2={Math.random() * 100 + "%"}
              y2={Math.random() * 100 + "%"}
              stroke="white"
              strokeWidth="0.5"
              strokeOpacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.1,
              }}
            />
          ))}

          {/* Golden lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.line
              key={`golden-line-${i}`}
              x1={Math.random() * 100 + "%"}
              y1={Math.random() * 100 + "%"}
              x2={Math.random() * 100 + "%"}
              y2={Math.random() * 100 + "%"}
              stroke="#fcba28"
              strokeWidth="0.5"
              strokeOpacity="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.15,
              }}
            />
          ))}
        </svg>

        {/* Central brain icon with glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-[#fcba28]/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          
          {/* Brain icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10"
          >
            <motion.path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
              fill="white"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </svg>
        </motion.div>

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
