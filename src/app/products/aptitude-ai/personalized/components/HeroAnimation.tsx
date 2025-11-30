import { motion } from "framer-motion";

export default function HeroAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Brain visualization using SVG */}
      <svg
        viewBox="0 0 200 200"
        className="w-64 h-64 text-[#fcba28]"
      >
        <motion.path
          d="M100 20C60 20 20 60 20 100s40 80 80 80 80-40 80-80-40-80-80-80z"
          fill="currentColor"
          opacity={0.1}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.path
          d="M100 40C70 40 40 70 40 100s30 60 60 60 60-30 60-60-30-60-60-60z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
      
      {/* Floating elements */}
      <motion.div
        className="absolute w-12 h-12 bg-[#fcba28]/10 rounded-full border border-[#fcba28]/20"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ top: "20%", left: "20%" }}
      />
      
      <motion.div
        className="absolute w-8 h-8 bg-[#fcba28]/10 rounded-full border border-[#fcba28]/20"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ bottom: "30%", right: "25%" }}
      />
      
      <motion.div
        className="absolute w-16 h-16 bg-[#fcba28]/10 rounded-full border border-[#fcba28]/20"
        animate={{
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ top: "40%", right: "15%" }}
      />

      {/* Neural network lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        <motion.line
          x1="20%"
          y1="20%"
          x2="80%"
          y2="80%"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5,5"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="text-[#fcba28]/20"
        />
        <motion.line
          x1="80%"
          y1="20%"
          x2="20%"
          y2="80%"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5,5"
          animate={{
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="text-[#fcba28]/20"
        />
      </svg>
    </motion.div>
  );
}
