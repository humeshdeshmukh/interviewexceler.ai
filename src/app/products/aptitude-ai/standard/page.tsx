"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";
import {
  FaBrain,
  FaCalculator,
  FaChartLine,
  FaTable,
  FaPuzzlePiece,
  FaSquareRootVariable,
  FaClock,
  FaTrophy,
} from "react-icons/fa6";

const TopicCard = ({
  icon: Icon,
  title,
  description,
  questionCount,
  difficulty,
  color,
  path,
}: {
  icon: any;
  title: string;
  description: string;
  questionCount: number;
  difficulty: string;
  color: string;
  path: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 relative overflow-hidden group"
  >
    {/* Background glow */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity`} />
    
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="text-white text-xl" />
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-400">Questions</span>
          <p className="text-2xl font-bold text-[#fcba28]">{questionCount}</p>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-sm ${
          difficulty === "Easy" ? "bg-green-500/20 text-green-400" :
          difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
          "bg-red-500/20 text-red-400"
        }`}>
          {difficulty}
        </span>
        <Link
          href={path}
          className="text-[#fcba28] hover:text-[#ffd700] transition-colors inline-flex items-center gap-2"
        >
          Practice Now →
        </Link>
      </div>
    </div>
  </motion.div>
);

const topics = [
  {
    icon: FaCalculator,
    title: "Numerical Ability",
    description: "Master arithmetic, percentages, and mathematical concepts",
    questionCount: 250,
    difficulty: "Medium",
    color: "from-blue-500 to-cyan-500",
    path: "/products/aptitude-ai/standard/numerical-ability"
  },
  {
    icon: FaBrain,
    title: "Verbal Reasoning",
    description: "Improve logical deduction and verbal comprehension",
    questionCount: 200,
    difficulty: "Hard",
    color: "from-purple-500 to-pink-500",
    path: "/products/aptitude-ai/standard/verbal-reasoning"
  },
  {
    icon: FaPuzzlePiece,
    title: "Logical Reasoning",
    description: "Enhance problem-solving and analytical thinking",
    questionCount: 180,
    difficulty: "Medium",
    color: "from-orange-500 to-red-500",
    path: "/products/aptitude-ai/standard/logical-reasoning"
  },
  {
    icon: FaChartLine,
    title: "Data Interpretation",
    description: "Analyze graphs, charts, and statistical data",
    questionCount: 150,
    difficulty: "Hard",
    color: "from-green-500 to-emerald-500",
    path: "/products/aptitude-ai/standard/data-interpretation"
  },
  {
    icon: FaTable,
    title: "Non-verbal Reasoning",
    description: "Practice with patterns and spatial relationships",
    questionCount: 220,
    difficulty: "Medium",
    color: "from-yellow-500 to-amber-500",
    path: "/products/aptitude-ai/standard/non-verbal-reasoning"
  },
  {
    icon: FaSquareRootVariable,
    title: "Quantitative Aptitude",
    description: "Advanced mathematical and statistical concepts",
    questionCount: 280,
    difficulty: "Hard",
    color: "from-indigo-500 to-violet-500",
    path: "/products/aptitude-ai/standard/quantitative-aptitude"
  },
];

export default function StandardPracticePage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10">
        <MaxWidthWrapper>
          {/* Hero Section */}
          <div className="text-center py-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Standard{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fcba28] to-[#ffd700]">
                Practice
              </span>{" "}
              Mode
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-200 text-xl max-w-2xl mx-auto mb-12"
            >
              Choose from our comprehensive collection of aptitude topics and practice at your own pace
            </motion.p>

            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20"
              >
                <FaBrain className="text-[#fcba28] text-3xl mx-auto mb-4" />
                <div className="text-2xl font-bold text-[#fcba28] mb-2">1,280+</div>
                <div className="text-gray-400">Practice Questions</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20"
              >
                <FaClock className="text-[#fcba28] text-3xl mx-auto mb-4" />
                <div className="text-2xl font-bold text-[#fcba28] mb-2">6</div>
                <div className="text-gray-400">Topic Categories</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20"
              >
                <FaTrophy className="text-[#fcba28] text-3xl mx-auto mb-4" />
                <div className="text-2xl font-bold text-[#fcba28] mb-2">24/7</div>
                <div className="text-gray-400">AI Assistance</div>
              </motion.div>
            </div>
          </div>

          {/* Topics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-12"
          >
            {topics.map((topic) => (
              <TopicCard key={topic.title} {...topic} />
            ))}
          </motion.div>

          {/* CTA Section */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Practicing?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Choose any topic to begin your practice session. Our AI assistant will provide instant feedback and explanations.
            </p>
            <Link
              href="/products/aptitude-ai/standard/numerical-ability"
              className="px-8 py-4 bg-[#fcba28] text-black rounded-full font-semibold inline-flex items-center gap-2 hover:bg-[#ffd700] transition-colors"
            >
              Start with Numerical Ability
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div> */}
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
