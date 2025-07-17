"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  Sparkles,
  Trophy,
  Medal,
  Award,
  Star,
} from "lucide-react";
import { useResume } from "../../context/ResumeContext";

interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  description: string;
  impact: string;
}

interface AchievementsFormProps {
  onSave: (data: Achievement[]) => void;
  initialData?: Achievement[];
}

const achievementCategories = [
  {
    name: "Professional",
    icon: Trophy,
    examples: [
      "Increased revenue by 25% through process optimization",
      "Led successful migration of legacy system",
      "Received Employee of the Year award",
    ],
  },
  {
    name: "Academic",
    icon: Medal,
    examples: [
      "Graduated with highest honors",
      "Published research paper in leading journal",
      "Received academic scholarship",
    ],
  },
  {
    name: "Leadership",
    icon: Star,
    examples: [
      "Led team of 10 developers on critical project",
      "Mentored 5 junior developers",
      "Founded and led tech community group",
    ],
  },
  {
    name: "Recognition",
    icon: Award,
    examples: [
      "Industry award for innovation",
      "Featured speaker at tech conference",
      "Patent holder for innovative solution",
    ],
  },
];

export const AchievementsForm = ({
  onSave,
  initialData,
}: AchievementsFormProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>(
    initialData || []
  );
  const [selectedCategory, setSelectedCategory] = useState(
    achievementCategories[0].name
  );
  const { generateAISuggestions } = useResume();

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: "",
      organization: "",
      date: "",
      category: selectedCategory,
      description: "",
      impact: "",
    };
    setAchievements([...achievements, newAchievement]);
  };

  const removeAchievement = (id: string) => {
    setAchievements(achievements.filter((ach) => ach.id !== id));
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: any) => {
    setAchievements(
      achievements.map((ach) =>
        ach.id === id ? { ...ach, [field]: value } : ach
      )
    );
  };

  const handleAISuggestion = async (id: string) => {
    const achievement = achievements.find((a) => a.id === id);
    if (!achievement) return;

    const prompt = `Generate a compelling description for the achievement: ${achievement.title} at ${achievement.organization}. Category: ${achievement.category}`;
    const suggestion = await generateAISuggestions("achievement", prompt);
    updateAchievement(id, "description", suggestion);
  };

  const handleExampleClick = (example: string) => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: example,
      organization: "",
      date: "",
      category: selectedCategory,
      description: "",
      impact: "",
    };
    setAchievements([...achievements, newAchievement]);
  };

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">Achievement Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievementCategories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setSelectedCategory(name)}
              className={`p-4 rounded-xl border backdrop-blur-sm transition-all ${
                selectedCategory === name
                  ? "bg-[#fcba28]/10 border-[#fcba28]/20 text-[#fcba28]"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <Icon className="w-6 h-6 mb-2 mx-auto" />
              <span className="block text-sm font-medium">{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Example Achievements */}
      <div>
        <h3 className="text-lg font-medium mb-4">Example Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {achievementCategories
            .find((cat) => cat.name === selectedCategory)
            ?.examples.map((example) => (
              <button
                key={example}
                onClick={() => handleExampleClick(example)}
                className="p-3 text-sm text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
              >
                {example}
              </button>
            ))}
        </div>
      </div>

      {/* Achievements List */}
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.id}
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
            {/* Achievement Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Achievement Title
              </label>
              <input
                type="text"
                value={achievement.title}
                onChange={(e) =>
                  updateAchievement(achievement.id, "title", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. Increased Team Productivity"
              />
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Organization
              </label>
              <input
                type="text"
                value={achievement.organization}
                onChange={(e) =>
                  updateAchievement(
                    achievement.id,
                    "organization",
                    e.target.value
                  )
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. Tech Corp"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="month"
                value={achievement.date}
                onChange={(e) =>
                  updateAchievement(achievement.id, "date", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={achievement.category}
                onChange={(e) =>
                  updateAchievement(achievement.id, "category", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
              >
                {achievementCategories.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <div className="relative">
                <textarea
                  value={achievement.description}
                  onChange={(e) =>
                    updateAchievement(
                      achievement.id,
                      "description",
                      e.target.value
                    )
                  }
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                  placeholder="Describe your achievement..."
                />
                <button
                  type="button"
                  onClick={() => handleAISuggestion(achievement.id)}
                  className="absolute right-3 top-3 p-2 rounded-lg bg-[#fcba28]/10 hover:bg-[#fcba28]/20 text-[#fcba28] transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Impact */}
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">
                Quantifiable Impact
              </label>
              <input
                type="text"
                value={achievement.impact}
                onChange={(e) =>
                  updateAchievement(achievement.id, "impact", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. Resulted in 30% cost savings"
              />
            </div>
          </div>

          {/* Remove Achievement Button */}
          <button
            type="button"
            onClick={() => removeAchievement(achievement.id)}
            className="absolute top-3 right-3 p-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </motion.div>
      ))}

      {/* Add Achievement Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: achievements.length * 0.1 }}
        type="button"
        onClick={addAchievement}
        className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-white/60 hover:text-white/80 hover:border-white/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Achievement
      </motion.button>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: achievements.length * 0.1 + 0.1 }}
        className="flex justify-end"
      >
        <button
          type="button"
          onClick={() => onSave(achievements)}
          className="px-6 py-2 bg-[#fcba28] text-black rounded-lg font-medium hover:bg-[#fcba28]/90 transition-colors"
        >
          Save & Continue
        </button>
      </motion.div>
    </div>
  );
};
