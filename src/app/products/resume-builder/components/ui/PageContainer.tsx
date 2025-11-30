import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PageContainerProps {
  children: React.ReactNode;
  badge?: {
    icon: LucideIcon;
    text: string;
  };
  title: {
    main: string;
    highlight: string;
    end?: string;
  };
  description: string;
}

export const PageContainer = ({
  children,
  badge,
  title,
  description,
}: PageContainerProps) => {
  return (
    <div className="min-h-screen bg-background text-white pt-20 px-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
              <badge.icon className="w-4 h-4 text-[#fcba28]" />
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {title.main}{' '}
            <span className="text-[#fcba28]">{title.highlight}</span>
            {title.end && ` ${title.end}`}
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};
