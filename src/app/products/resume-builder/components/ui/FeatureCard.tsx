import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  color?: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
  color = '#fcba28'
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="space-y-4"
    >
      <motion.div
        animate={{
          y: [-2, 2, -2],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="p-3 rounded-lg inline-block"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </motion.div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-white/60">{description}</p>
      </div>
    </motion.div>
  );
};
