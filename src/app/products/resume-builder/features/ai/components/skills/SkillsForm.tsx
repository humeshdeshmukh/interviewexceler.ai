"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Trash2, Star, Sparkles } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { Button } from "@/components/ui/button";

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

interface SkillsFormProps {
  onSave: (skills: Skill[]) => void;
  initialData?: Skill[];
}

const skillCategories = [
  "Technical",
  "Soft Skills",
  "Languages",
  "Tools",
  "Frameworks",
  "Other",
];

export const SkillsForm = ({ onSave, initialData }: SkillsFormProps) => {
  const [skills, setSkills] = useState<Skill[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(false);
  const { generateAISuggestions } = useResume();

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: 3,
      category: skillCategories[0],
    };
    setSkills([...skills, newSkill]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const handleAISuggestions = async () => {
    try {
      setIsLoading(true);
      const prompt = "Suggest relevant skills for my profile based on my experience";
      const suggestion = await generateAISuggestions("skills", prompt);
      
      // Parse and add suggested skills
      const suggestedSkills = suggestion.split(",").map((skill) => ({
        id: Date.now().toString() + Math.random(),
        name: skill.trim(),
        level: 3,
        category: "Technical",
      }));

      // Filter out duplicates
      const existingSkillNames = new Set(skills.map(s => s.name.toLowerCase()));
      const newSkills = suggestedSkills.filter(s => !existingSkillNames.has(s.name.toLowerCase()));

      setSkills([...skills, ...newSkills]);
    } catch (error) {
      console.error("Error generating AI suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skillCategories.map((category) => {
          const categorySkills = skills.filter(
            (skill) => skill.category === category
          );
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-lg font-medium mb-3">{category}</h3>
              <div className="space-y-2">
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) =>
                        updateSkill(skill.id, "name", e.target.value)
                      }
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg py-1 px-3 text-sm focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                      placeholder={`Add ${category} skill`}
                    />
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <Star
                          key={level}
                          size={16}
                          className={`cursor-pointer transition-colors ${
                            level <= skill.level
                              ? "text-[#fcba28]"
                              : "text-white/20"
                          }`}
                          onClick={() => updateSkill(skill.id, "level", level)}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button
          onClick={addSkill}
          className="bg-[#fcba28] hover:bg-[#fcba28]/90 text-black"
        >
          <Plus size={16} className="mr-2" />
          Add Skill
        </Button>
        <Button
          onClick={handleAISuggestions}
          variant="outline"
          className="border-[#fcba28] text-[#fcba28] hover:bg-[#fcba28]/10"
          disabled={isLoading}
        >
          <Sparkles size={16} className="mr-2" />
          {isLoading ? "Generating..." : "Get AI Suggestions"}
        </Button>
      </div>
    </div>
  );
};
