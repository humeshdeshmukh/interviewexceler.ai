'use client';

import { motion } from 'framer-motion';
import { FaInfoCircle, FaCode, FaDollarSign, FaUserCog } from 'react-icons/fa';
import { FAQCategory } from '../data/faq';

const iconMap = {
  FaInfoCircle,
  FaCode,
  FaDollarSign,
  FaUserCog,
};

interface CategoryCardProps {
  category: FAQCategory;
  isSelected: boolean;
  onClick: () => void;
}

export function CategoryCard({ category, isSelected, onClick }: CategoryCardProps) {
  const Icon = iconMap[category.icon as keyof typeof iconMap];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] p-6 rounded-xl border transition-all duration-300 ${
        isSelected
          ? 'bg-[#fcba28] border-[#fcba28] text-black'
          : 'bg-white/5 border-white/10 text-white hover:border-[#fcba28]/30'
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={`p-3 rounded-full ${
          isSelected ? 'bg-black/10' : 'bg-white/5'
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-medium">{category.title}</h3>
        <p className={`text-sm ${
          isSelected ? 'text-black/70' : 'text-white/60'
        }`}>
          {category.description}
        </p>
      </div>
    </motion.button>
  );
}
