'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaStar } from 'react-icons/fa';
import { skillCategories, proficiencyLevels } from '../../constants/skills';
import { theme } from '../../constants/theme';
import type { SkillAssessment } from '../../services/skill-analyzer';

interface SkillInputProps {
  skills: SkillAssessment[];
  onAddSkill: () => void;
  onRemoveSkill: (index: number) => void;
  onUpdateSkill: (index: number, updates: Partial<SkillAssessment>) => void;
}

export const SkillInput: React.FC<SkillInputProps> = ({
  skills,
  onAddSkill,
  onRemoveSkill,
  onUpdateSkill
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold text-[#fcba28]">Your Skills</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddSkill}
          className="px-4 py-2 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black rounded-lg flex items-center gap-2 font-medium shadow-lg shadow-[#fcba28]/20"
        >
          <FaPlus className="w-4 h-4" />
          Add Skill
        </motion.button>
      </div>

      <div className="space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-white/5 rounded-xl border border-white/10 relative group hover:border-[#fcba28]/50 transition-all duration-300"
          >
            <button
              onClick={() => onRemoveSkill(index)}
              className="absolute top-4 right-4 p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <FaTrash className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skill Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Skill Category & Name
                </label>
                <select
                  value={skill.skillId}
                  onChange={(e) => onUpdateSkill(index, { skillId: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white focus:border-[#fcba28] focus:outline-none transition-colors [&>option]:bg-[#1a1a1a] [&>optgroup]:bg-[#1a1a1a] [&>optgroup]:text-[#fcba28] [&>option]:text-white"
                >
                  <option value="" className="bg-[#1a1a1a] text-white">Select a skill</option>
                  {skillCategories.map((category) => (
                    <optgroup key={category.id} label={category.name} className="bg-[#1a1a1a] text-[#fcba28] font-semibold">
                      {category.topics.map((topic) => (
                        <option key={topic.id} value={topic.id} className="bg-[#1a1a1a] text-white">
                          {topic.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Proficiency Level */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Proficiency Level
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => onUpdateSkill(index, { proficiencyLevel: level })}
                      className={`p-2 rounded-lg flex-1 transition-all duration-300 ${
                        skill.proficiencyLevel >= level
                          ? 'bg-[#fcba28] text-black'
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      <FaStar className="w-4 h-4 mx-auto" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={skill.yearsOfExperience}
                  onChange={(e) =>
                    onUpdateSkill(index, { yearsOfExperience: parseInt(e.target.value) || 0 })
                  }
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none transition-colors"
                />
              </div>

              {/* Last Used */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Used
                </label>
                <input
                  type="date"
                  value={skill.lastUsed}
                  onChange={(e) => onUpdateSkill(index, { lastUsed: e.target.value })}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none transition-colors"
                />
              </div>

              {/* Confidence Level */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confidence Level
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={skill.confidenceLevel}
                  onChange={(e) =>
                    onUpdateSkill(index, { confidenceLevel: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#fcba28]"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
