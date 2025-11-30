import { motion } from 'framer-motion';
import { Brain, BarChart, Award } from 'lucide-react';
import { IconBrain, IconChartBar, IconAward } from '@tabler/icons-react';

const mockComponents = [
  { id: 1, color: "bg-blue-400" },
  { id: 2, color: "bg-green-400" },
  { id: 3, color: "bg-yellow-400" },
  { id: 4, color: "bg-red-400" },
];

export const SquareBento2 = () => {
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
      className="relative h-full w-full bg-gradient-to-br from-brand-green/20 to-brand-green/5 rounded-xl p-6 group"
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-brand-green/10 rounded-xl"
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
          <Brain className="w-8 h-8 text-brand-green" />
          <h3 className="text-xl font-bold text-white">Smart Learning</h3>
        </motion.div>

        <motion.p variants={itemVariants} className="text-white/70">
          Track your progress and get personalized recommendations based on your performance.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <BarChart className="w-5 h-5 text-brand-green" />
            <span className="text-white/80">Performance Analytics</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-brand-green" />
            <span className="text-white/80">Skill Assessments</span>
          </div>
        </motion.div>

        {/* Decorative Grid Pattern */}
        <motion.div
          className="absolute bottom-4 right-4 w-20 h-20 opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-brand-green">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </motion.div>

        {/* Add a defined height here */}
        <div className="relative -bottom-2 z-10 h-44 rounded-xl border border-background bg-neural-100">
          <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
            {mockComponents.map((component) => (
              <motion.div
                key={component.id}
                className={`absolute ${component.color} rounded-md shadow-md flex items-center justify-center`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SquareBento2;
