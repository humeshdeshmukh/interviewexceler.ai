'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaUser, FaLaptopCode, FaChalkboardTeacher } from 'react-icons/fa';

interface InterviewType {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

interface InterviewTypeSelectorProps {
  interviewTypes: InterviewType[];
  selectedType: InterviewType | null;
  onSelect: (type: InterviewType) => void;
}

const getIconForType = (name: string) => {
  switch (name.toLowerCase()) {
    case 'technical':
      return FaCode;
    case 'behavioral':
      return FaUser;
    case 'system design':
      return FaLaptopCode;
    default:
      return FaChalkboardTeacher;
  }
};

export const InterviewTypeSelector: React.FC<InterviewTypeSelectorProps> = ({
  interviewTypes,
  selectedType,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {interviewTypes.map((type) => {
        const Icon = getIconForType(type.name);
        return (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelect(type)}
            className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 ${
              selectedType?.id === type.id
                ? 'bg-[#fcba28]/20 border-[#fcba28] border-2'
                : 'bg-white/5 border border-white/10'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#fcba28]/20">
                <Icon className="w-6 h-6 text-[#fcba28]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{type.name}</h3>
                <p className="text-gray-400 mb-4">{type.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    Duration: {type.duration} minutes
                  </span>
                  <span className="text-[#fcba28] font-medium">
                    ${type.price}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
