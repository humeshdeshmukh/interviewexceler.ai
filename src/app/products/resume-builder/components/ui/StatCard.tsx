import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  description?: string;
  delay?: number;
}

export const StatCard = ({
  icon: Icon,
  value,
  label,
  description,
  delay = 0
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="text-center space-y-2"
    >
      <motion.div
        animate={{
          y: [-2, 2, -2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="inline-flex p-3 rounded-lg bg-[#fcba28]/20 mb-4"
      >
        <Icon className="w-6 h-6 text-[#fcba28]" />
      </motion.div>
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-lg font-medium text-white/80">{label}</div>
        {description && (
          <div className="text-sm text-white/60 mt-1">{description}</div>
        )}
      </motion.div>
    </motion.div>
  );
};
