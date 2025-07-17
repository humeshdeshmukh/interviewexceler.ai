import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { FaSearch, FaCalculator, FaChartLine, FaBrain, FaClock, FaChartBar, FaPuzzlePiece, FaRegLightbulb, FaPercentage, FaRulerCombined } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface TopicSelectorProps {
  onSelectTopic: (topic: string) => void;
}

interface Topic {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completionRate?: number;
  accuracy?: number;
}

const topics: Topic[] = [
  {
    id: 'number-series',
    name: 'Number Series',
    icon: <FaCalculator className="text-2xl" />,
    description: 'Pattern recognition in numerical sequences',
    category: 'Numerical Ability',
    difficulty: 'Beginner',
    completionRate: 75,
    accuracy: 82
  },
  {
    id: 'arithmetic',
    name: 'Arithmetic',
    icon: <FaPercentage className="text-2xl" />,
    description: 'Basic mathematical operations and calculations',
    category: 'Numerical Ability',
    difficulty: 'Beginner',
    completionRate: 60,
    accuracy: 78
  },
  {
    id: 'data-interpretation',
    name: 'Data Interpretation',
    icon: <FaChartBar className="text-2xl" />,
    description: 'Analyzing graphs, charts, and tables',
    category: 'Numerical Ability',
    difficulty: 'Intermediate',
    completionRate: 45,
    accuracy: 65
  },
  {
    id: 'probability',
    name: 'Probability',
    icon: <FaChartLine className="text-2xl" />,
    description: 'Understanding chance and likelihood',
    category: 'Numerical Ability',
    difficulty: 'Advanced',
    completionRate: 30,
    accuracy: 70
  },
  {
    id: 'logical-reasoning',
    name: 'Logical Reasoning',
    icon: <FaBrain className="text-2xl" />,
    description: 'Deductive and inductive reasoning problems',
    category: 'Logical Ability',
    difficulty: 'Intermediate',
    completionRate: 55,
    accuracy: 75
  },
  {
    id: 'verbal-reasoning',
    name: 'Verbal Reasoning',
    icon: <FaRegLightbulb className="text-2xl" />,
    description: 'Language-based logical problems',
    category: 'Logical Ability',
    difficulty: 'Intermediate',
    completionRate: 40,
    accuracy: 68
  },
  {
    id: 'spatial-reasoning',
    name: 'Spatial Reasoning',
    icon: <FaRulerCombined className="text-2xl" />,
    description: 'Visual and spatial problem solving',
    category: 'Logical Ability',
    difficulty: 'Advanced',
    completionRate: 35,
    accuracy: 72
  },
  {
    id: 'puzzle-solving',
    name: 'Puzzle Solving',
    icon: <FaPuzzlePiece className="text-2xl" />,
    description: 'Complex problem-solving scenarios',
    category: 'Logical Ability',
    difficulty: 'Advanced',
    completionRate: 25,
    accuracy: 60
  },
  {
    id: 'time-speed',
    name: 'Time and Speed',
    icon: <FaClock className="text-2xl" />,
    description: 'Problems involving time, speed, and distance',
    category: 'Applied Mathematics',
    difficulty: 'Intermediate',
    completionRate: 50,
    accuracy: 73
  }
];

export default function TopicSelector({ onSelectTopic }: TopicSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(topics.map(topic => topic.category)));

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-black/40 border-[#fcba28]/20 text-white placeholder-gray-400 focus:border-[#fcba28] focus:ring-[#fcba28]"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              !selectedCategory
                ? 'bg-[#fcba28] text-black'
                : 'bg-black/40 text-gray-400 hover:text-[#fcba28] border border-[#fcba28]/20'
            }`}
          >
            All Topics
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-black/40 text-gray-400 hover:text-[#fcba28] border border-[#fcba28]/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic) => (
          <motion.button
            key={topic.id}
            onClick={() => onSelectTopic(topic.name)}
            className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 p-6 text-left group"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-[#fcba28]">{topic.icon}</div>
                  <div>
                    <h3 className="text-lg font-medium text-[#fcba28]">{topic.name}</h3>
                    <p className="text-sm text-gray-400">{topic.category}</p>
                  </div>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  topic.difficulty === 'Beginner'
                    ? 'bg-green-500/20 text-green-400'
                    : topic.difficulty === 'Intermediate'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {topic.difficulty}
                </span>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">{topic.description}</p>
              
              {topic.completionRate !== undefined && topic.accuracy !== undefined && (
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Completion</span>
                      <span>{topic.completionRate}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${topic.completionRate}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#fcba28] to-[#ffd700]"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Accuracy</span>
                      <span>{topic.accuracy}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${topic.accuracy}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#fcba28] to-[#ffd700]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
