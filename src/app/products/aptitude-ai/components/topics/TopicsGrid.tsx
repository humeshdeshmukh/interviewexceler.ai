"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaCalculator, 
  FaChartLine, 
  FaBrain, 
  FaTable, 
  FaPuzzlePiece, 
  FaSquareRootVariable 
} from "react-icons/fa6";

const topics = [
  {
    title: "Numerical Ability",
    icon: FaCalculator,
    description: "Master arithmetic, percentages, and mathematical concepts",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Verbal Reasoning",
    icon: FaBrain,
    description: "Improve logical deduction and verbal comprehension",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Logical Reasoning",
    icon: FaPuzzlePiece,
    description: "Enhance problem-solving and analytical thinking",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Data Interpretation",
    icon: FaChartLine,
    description: "Analyze graphs, charts, and statistical data",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Non-verbal Reasoning",
    icon: FaTable,
    description: "Practice with patterns and spatial relationships",
    color: "from-yellow-500 to-amber-500",
  },
  {
    title: "Quantitative Aptitude",
    icon: FaSquareRootVariable,
    description: "Advanced mathematical and statistical concepts",
    color: "from-indigo-500 to-violet-500",
  },
];

const TopicCard = ({ topic, index }: { topic: typeof topics[0]; index: number }) => {
  const Icon = topic.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20"
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4`}>
        <Icon className="text-white text-2xl" />
      </div>
      <h3 className="text-xl font-bold text-[#fcba28] mb-2">{topic.title}</h3>
      <p className="text-gray-300 mb-4">{topic.description}</p>
      <Link
        href={`/products/aptitude-ai/topics/${topic.title.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-[#fcba28] hover:text-[#ffd700] transition-colors inline-flex items-center gap-2"
      >
        Practice Now →
      </Link>
    </motion.div>
  );
};

export const TopicsGrid = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-[#fcba28] text-center mb-12">
        Practice Areas
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <TopicCard key={topic.title} topic={topic} index={index} />
        ))}
      </div>
    </div>
  );
};
