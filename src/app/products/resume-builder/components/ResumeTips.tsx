"use client";

import { motion } from "framer-motion";
import { FaLightbulb, FaCheck } from "react-icons/fa";

const tips = [
  {
    title: "Tailor Your Resume",
    description: "Customize your resume for each job application by matching keywords from the job description.",
    examples: [
      "Use industry-specific terminology",
      "Mirror the company's language",
      "Highlight relevant experience"
    ]
  },
  {
    title: "Use Action Verbs",
    description: "Begin bullet points with strong action verbs to demonstrate your achievements.",
    examples: [
      "Led team of 5 developers",
      "Implemented new system",
      "Reduced costs by 25%"
    ]
  },
  {
    title: "Quantify Achievements",
    description: "Include specific numbers and metrics to demonstrate your impact.",
    examples: [
      "Increased sales by $100K",
      "Managed $1M budget",
      "Improved efficiency by 30%"
    ]
  },
  {
    title: "Keep it Concise",
    description: "Limit your resume to 1-2 pages and use bullet points for better readability.",
    examples: [
      "3-5 bullet points per role",
      "Remove outdated experience",
      "Focus on relevant achievements"
    ]
  }
];

export default function ResumeTips() {
  return (
    <div className="space-y-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-[#fcba28]"
      >
        Professional Resume Tips
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 rounded-xl p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <FaLightbulb className="text-[#fcba28] text-xl" />
              <h3 className="text-lg font-semibold text-white">{tip.title}</h3>
            </div>
            
            <p className="text-gray-300">{tip.description}</p>
            
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#fcba28]">Examples:</h4>
              <ul className="space-y-1">
                {tip.examples.map((example) => (
                  <li key={example} className="flex items-center gap-2 text-sm text-gray-300">
                    <FaCheck className="text-green-400 text-xs" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
