'use client';

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { 
  FaArrowLeft, 
  FaTable, 
  FaChartLine, 
  FaLightbulb, 
  FaGraduationCap,
  FaClock,
  FaCube
} from "react-icons/fa6";

const features = [
  {
    icon: FaCube,
    title: "Pattern Recognition",
    description: "Master visual patterns, sequences, and spatial relationships"
  },
  {
    icon: FaChartLine,
    title: "Progressive Difficulty",
    description: "Start with basic patterns and advance to complex puzzles"
  },
  {
    icon: FaLightbulb,
    title: "Interactive Learning",
    description: "Visual explanations and step-by-step solutions"
  },
  {
    icon: FaGraduationCap,
    title: "AI-Powered Help",
    description: "Get instant assistance with pattern recognition"
  }
];

const topics = [
  {
    title: "Series Completion",
    questions: 45,
    difficulty: "Medium",
    topics: ["Figure Series", "Matrix Series", "Pattern Series"]
  },
  {
    title: "Analogy & Classification",
    questions: 40,
    difficulty: "Hard",
    topics: ["Figure Analogy", "Figure Classification", "Odd One Out"]
  },
  {
    title: "Cubes & Dice",
    questions: 35,
    difficulty: "Hard",
    topics: ["Cube Formation", "Dice Patterns", "Surface Areas"]
  },
  {
    title: "Mirror Images & Water Images",
    questions: 30,
    difficulty: "Medium",
    topics: ["Mirror Images", "Water Reflection", "Paper Folding"]
  }
];

export default function NonVerbalReasoningPage() {
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
          {/* Navigation */}
          <div className="pt-8">
            <Link 
              href="/products/aptitude-ai/standard"
              className="inline-flex items-center text-[#fcba28] hover:text-[#ffd700] transition-colors gap-2 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Topics
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center py-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Non-verbal{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fcba28] to-[#ffd700]">
                Reasoning
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-200 text-xl max-w-2xl mx-auto mb-12"
            >
              Enhance your spatial reasoning and pattern recognition skills with our interactive platform
            </motion.p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
              <div className="p-4 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                <div className="text-3xl font-bold text-[#fcba28] mb-2">150+</div>
                <div className="text-gray-400">Visual Puzzles</div>
              </div>
              <div className="p-4 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                <div className="text-3xl font-bold text-[#fcba28] mb-2">4</div>
                <div className="text-gray-400">Major Categories</div>
              </div>
              <div className="p-4 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                <div className="text-3xl font-bold text-[#fcba28] mb-2">12</div>
                <div className="text-gray-400">Pattern Types</div>
              </div>
            </div>

            {/* Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-3xl mx-auto mb-16 p-8 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20"
            >
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 p-4">
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          rotate: [0, 90, 180, 270, 360],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-16 h-16 bg-gradient-to-br from-[#fcba28] to-[#ffd700] rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mt-4 text-center">
                Interactive puzzles with real-time feedback and explanations
              </p>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20"
              >
                <feature.icon className="text-[#fcba28] text-2xl mb-4" />
                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Topics Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Available Topics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{topic.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      topic.difficulty === "Easy" ? "bg-green-500/20 text-green-400" :
                      topic.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {topic.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <FaClock className="text-[#fcba28]" />
                    <span>{topic.questions} questions</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topic.topics.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full bg-[#fcba28]/10 text-[#fcba28] text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Begin with our carefully curated visual puzzles and enhance your non-verbal reasoning skills.
            </p>
            <Link
              href="/products/aptitude-ai/standard/non-verbal-reasoning/practice"
              className="px-8 py-4 bg-[#fcba28] text-black rounded-full font-semibold inline-flex items-center gap-2 hover:bg-[#ffd700] transition-colors"
            >
              Start Practice
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
