"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Trash2, GripVertical, Sparkles } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceFormProps {
  onSave: (experiences: Experience[]) => void;
  initialData?: Experience[];
}

export const ExperienceForm = ({ onSave, initialData }: ExperienceFormProps) => {
  const [experiences, setExperiences] = useState<Experience[]>(
    initialData || []
  );

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <div className="space-y-6">
      {experiences.map((experience, index) => (
        <motion.div
          key={experience.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
        >
          {/* Drag Handle */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 cursor-move text-white/40">
            <GripVertical className="w-5 h-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-8">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Job Title</label>
              <input
                type="text"
                value={experience.title}
                onChange={(e) =>
                  updateExperience(experience.id, "title", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. Software Engineer"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) =>
                  updateExperience(experience.id, "company", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. Tech Corp"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={experience.location}
                onChange={(e) =>
                  updateExperience(experience.id, "location", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. San Francisco, CA"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) =>
                    updateExperience(experience.id, "startDate", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) =>
                    updateExperience(experience.id, "endDate", e.target.value)
                  }
                  disabled={experience.current}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            {/* Current Position Checkbox */}
            <div className="col-span-full">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={experience.current}
                  onChange={(e) =>
                    updateExperience(experience.id, "current", e.target.checked)
                  }
                  className="rounded border-white/10 bg-white/5 text-[#fcba28] focus:ring-[#fcba28]"
                />
                <span className="text-sm">I currently work here</span>
              </label>
            </div>

            {/* Description */}
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <div className="relative">
                <textarea
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(experience.id, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                  placeholder="Describe your responsibilities and achievements..."
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 p-2 rounded-lg bg-[#fcba28]/10 hover:bg-[#fcba28]/20 text-[#fcba28] transition-colors"
                  onClick={() => {
                    // AI suggestion functionality will be added here
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Remove Experience Button */}
          <button
            type="button"
            onClick={() => removeExperience(experience.id)}
            className="absolute top-3 right-3 p-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </motion.div>
      ))}

      {/* Add Experience Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: experiences.length * 0.1 }}
        type="button"
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-white/60 hover:text-white/80 hover:border-white/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Experience
      </motion.button>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: experiences.length * 0.1 + 0.1 }}
        className="flex justify-end"
      >
        <button
          type="button"
          onClick={() => onSave(experiences)}
          className="px-6 py-2 bg-[#fcba28] text-black rounded-lg font-medium hover:bg-[#fcba28]/90 transition-colors"
        >
          Save & Continue
        </button>
      </motion.div>
    </div>
  );
};
