'use client';

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { allQuestions, categories } from "../data";

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  expectedDuration: string;
  sampleAnswer: {
    mainPoints: string[];
    structure: {
      situation?: string;
      task?: string;
      action?: string;
      result?: string;
      introduction?: string;
      body?: string[];
      conclusion?: string;
    };
    tips: string[];
    commonMistakes: string[];
    keywords: string[];
  };
}

interface QuestionListProps {
  currentQuestionId: number;
  onSelectQuestion: (id: number) => void;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Tell me about yourself and your background.",
    category: "Introduction",
    difficulty: "easy",
    expectedDuration: "2 minutes",
    sampleAnswer: {
      mainPoints: [
        "Present role and key responsibilities",
        "Relevant educational background",
        "Career progression and achievements",
        "Skills and expertise relevant to the role",
        "Professional interests and goals"
      ],
      structure: {
        introduction: "I am a [Your Role] with [X] years of experience in [Industry/Field].",
        body: [
          "Currently at [Company], I am responsible for [Key Responsibilities] where I have achieved [Specific Achievement].",
          "Prior to this, I [Previous Experience] at [Company] where I developed expertise in [Relevant Skills].",
          "I hold a [Degree] in [Field] from [University], which provided me strong foundations in [Relevant Areas]."
        ],
        conclusion: "I am now looking to leverage my experience in [Skills] to contribute to [Type of Role/Company] where I can [Value Proposition]."
      },
      tips: [
        "Keep it professional and relevant to the role",
        "Focus on recent experience and achievements",
        "Use numbers and metrics when possible",
        "Show enthusiasm and passion for your field",
        "Connect your background to the job requirements"
      ],
      commonMistakes: [
        "Talking too long (keep it under 2 minutes)",
        "Including personal information not relevant to the job",
        "Starting from childhood or early education",
        "Being too modest or too boastful",
        "Not connecting experience to the role"
      ],
      keywords: ["experience", "achievements", "skills", "expertise", "background", "education", "career goals"]
    }
  },
  {
    id: 2,
    text: "What is your greatest professional achievement?",
    category: "Behavioral",
    difficulty: "medium",
    expectedDuration: "3 minutes",
    sampleAnswer: {
      mainPoints: [
        "Choose a significant, relevant achievement",
        "Demonstrate leadership and initiative",
        "Show measurable impact",
        "Highlight key skills used",
        "Connect to future goals"
      ],
      structure: {
        situation: "At [Company], we faced [Specific Challenge] that was impacting [Business Area].",
        task: "I was responsible for [Your Role/Assignment] with the goal of [Specific Objective].",
        action: "I [Specific Actions] by implementing [Strategy/Solution]. This involved [Key Steps] and collaborating with [Stakeholders].",
        result: "As a result, we achieved [Specific Metrics/Outcomes], which led to [Broader Impact]. This experience taught me [Learning Outcome]."
      },
      tips: [
        "Use the STAR method (Situation, Task, Action, Result)",
        "Include specific metrics and numbers",
        "Show both individual contribution and team collaboration",
        "Explain why this achievement matters",
        "Keep it recent and relevant"
      ],
      commonMistakes: [
        "Choosing an achievement that is too small or irrelevant",
        "Not providing specific details or metrics",
        "Taking too much credit in a team effort",
        "Focusing on personal rather than professional achievements",
        "Not explaining the impact on the business"
      ],
      keywords: ["leadership", "initiative", "impact", "results", "collaboration", "success", "metrics"]
    }
  },
  {
    id: 3,
    text: "How do you handle conflict in the workplace?",
    category: "Behavioral",
    difficulty: "medium",
    expectedDuration: "3 minutes",
    sampleAnswer: {
      mainPoints: [
        "Emphasize professional approach to conflict",
        "Show emotional intelligence",
        "Demonstrate communication skills",
        "Focus on resolution and learning",
        "Highlight positive outcomes"
      ],
      structure: {
        situation: "In my role as [Position], I encountered a conflict when [Specific Situation] occurred between [Parties Involved].",
        task: "My responsibility was to [Your Role in Resolution] while maintaining team harmony and productivity.",
        action: "I approached this by first [Initial Steps], then [Further Actions]. I made sure to [Key Conflict Resolution Strategies].",
        result: "Through this approach, we were able to [Positive Outcome]. The experience helped strengthen [Relationship/Process] and taught me [Learning]."
      },
      tips: [
        "Stay professional and objective",
        "Focus on the resolution process",
        "Show active listening skills",
        "Emphasize positive outcomes",
        "Demonstrate learning from the experience"
      ],
      commonMistakes: [
        "Avoiding mention of real conflicts",
        "Speaking negatively about others",
        "Not showing your role in resolution",
        "Focusing too much on the conflict itself",
        "Not explaining the learning outcome"
      ],
      keywords: ["resolution", "communication", "mediation", "compromise", "understanding", "professional"]
    }
  }
  // Add more questions with detailed sample answers...
];

export const QuestionList: React.FC<QuestionListProps> = ({
  currentQuestionId,
  onSelectQuestion
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredQuestions = allQuestions.filter(question => {
    const matchesSearch = question.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || question.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    if (listRef.current) {
      const currentQuestionElement = listRef.current.querySelector(`[data-question-id="${currentQuestionId}"]`);
      if (currentQuestionElement) {
        currentQuestionElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentQuestionId]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500/20 text-green-500";
      case "medium": return "bg-yellow-500/20 text-yellow-500";
      case "hard": return "bg-red-500/20 text-red-500";
      default: return "bg-gray-500/20 text-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
            !selectedCategory ? "bg-[#fcba28] text-black" : "bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === category ? "bg-[#fcba28] text-black" : "bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Question List */}
      <div ref={listRef} className="space-y-3">
        {filteredQuestions.map((question) => (
          <motion.button
            key={question.id}
            data-question-id={question.id}
            onClick={() => onSelectQuestion(question.id)}
            className={`flex flex-col p-4 border border-white/10 rounded-lg text-left hover:bg-white/5 transition-colors ${
              currentQuestionId === question.id ? "bg-white/10 border-[#fcba28]" : ""
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-sm font-medium text-white">{question.text}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
              <span>{question.category}</span>
              <span>•</span>
              <span>{question.expectedDuration}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
