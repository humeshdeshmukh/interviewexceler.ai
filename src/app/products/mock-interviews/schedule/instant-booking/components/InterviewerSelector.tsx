'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaGlobe } from 'react-icons/fa';

interface Interviewer {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  timezone: string;
  avatar?: string;
}

interface InterviewerSelectorProps {
  interviewers: Interviewer[];
  selectedInterviewer: Interviewer | null;
  onSelect: (interviewer: Interviewer) => void;
}

export const InterviewerSelector: React.FC<InterviewerSelectorProps> = ({
  interviewers,
  selectedInterviewer,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      {interviewers.map((interviewer) => (
        <motion.div
          key={interviewer.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onSelect(interviewer)}
          className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 ${
            selectedInterviewer?.id === interviewer.id
              ? 'bg-[#fcba28]/20 border-[#fcba28] border-2'
              : 'bg-white/5 border border-white/10'
          }`}
        >
          <div className="flex items-center gap-4">
            {/* Avatar or Initial */}
            <div className="w-16 h-16 rounded-full bg-[#fcba28]/20 flex items-center justify-center text-2xl font-bold text-[#fcba28]">
              {interviewer.avatar || interviewer.name.charAt(0)}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-white">{interviewer.name}</h3>
                <div className="flex items-center gap-1">
                  <FaStar className="w-4 h-4 text-[#fcba28]" />
                  <span className="text-white">{interviewer.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {interviewer.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-[#fcba28]/20 text-[#fcba28]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-gray-400 text-sm">
                <FaGlobe className="w-4 h-4 mr-2" />
                {interviewer.timezone}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
