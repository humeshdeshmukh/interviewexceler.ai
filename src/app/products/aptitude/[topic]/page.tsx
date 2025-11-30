'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Clock,
  Calculator,
  ChartBar,
  Puzzle,
  Sigma,
  Target,
  Lightbulb,
  ArrowLeft,
  Filter,
  BarChart,
} from 'lucide-react';
import Link from 'next/link';

const topics = {
  numerical: {
    title: 'Numerical Ability',
    icon: Calculator,
    color: 'bg-blue-500/10 text-blue-400',
    description: 'Master mathematical concepts and problem-solving techniques',
  },
  logical: {
    title: 'Logical Reasoning',
    icon: Brain,
    color: 'bg-purple-500/10 text-purple-400',
    description: 'Enhance your analytical and critical thinking skills',
  },
  verbal: {
    title: 'Verbal Ability',
    icon: Lightbulb,
    color: 'bg-yellow-500/10 text-yellow-400',
    description: 'Improve your language and communication skills',
  },
  'data-interpretation': {
    title: 'Data Interpretation',
    icon: ChartBar,
    color: 'bg-green-500/10 text-green-400',
    description: 'Learn to analyze and interpret complex data sets',
  },
  quantitative: {
    title: 'Quantitative Aptitude',
    icon: Sigma,
    color: 'bg-red-500/10 text-red-400',
    description: 'Practice advanced mathematical problem solving',
  },
  puzzles: {
    title: 'Puzzles',
    icon: Puzzle,
    color: 'bg-orange-500/10 text-orange-400',
    description: 'Solve challenging puzzles and brain teasers',
  },
};

const mockQuestions = [
  {
    id: 1,
    title: 'Time and Work',
    difficulty: 'Easy',
    timeLimit: '5 min',
    questions: 5,
    completed: true,
    score: 80,
  },
  {
    id: 2,
    title: 'Profit and Loss',
    difficulty: 'Medium',
    timeLimit: '8 min',
    questions: 8,
    completed: true,
    score: 75,
  },
  {
    id: 3,
    title: 'Simple Interest',
    difficulty: 'Medium',
    timeLimit: '6 min',
    questions: 6,
    completed: false,
  },
  {
    id: 4,
    title: 'Compound Interest',
    difficulty: 'Hard',
    timeLimit: '10 min',
    questions: 10,
    completed: false,
  },
];

export default function TopicPage({ params }: { params: { topic: string } }) {
  const topic = topics[params.topic as keyof typeof topics];
  const [filter, setFilter] = React.useState('all');
  const Icon = topic.icon;

  const filteredQuestions = React.useMemo(() => {
    if (filter === 'completed') return mockQuestions.filter(q => q.completed);
    if (filter === 'pending') return mockQuestions.filter(q => !q.completed);
    return mockQuestions;
  }, [filter]);

  return (
    <div className="min-h-screen bg-background pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/products/aptitude"
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div className={`p-3 rounded-lg ${topic.color}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{topic.title}</h1>
            <p className="text-white/60">{topic.description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-white/60">Completion</h3>
              <Target className="w-4 h-4 text-[#fcba28]" />
            </div>
            <p className="text-2xl font-bold text-white">50%</p>
          </div>
          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-white/60">Avg. Score</h3>
              <BarChart className="w-4 h-4 text-[#fcba28]" />
            </div>
            <p className="text-2xl font-bold text-white">77.5%</p>
          </div>
          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-white/60">Time/Question</h3>
              <Clock className="w-4 h-4 text-[#fcba28]" />
            </div>
            <p className="text-2xl font-bold text-white">1.5m</p>
          </div>
          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-white/60">Questions</h3>
              <Puzzle className="w-4 h-4 text-[#fcba28]" />
            </div>
            <p className="text-2xl font-bold text-white">29</p>
          </div>
        </div>

        {/* Question Sets */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Question Sets</h2>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/60" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white"
              >
                <option value="all">All Sets</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white group-hover:text-[#fcba28] transition-colors">
                    {question.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      question.difficulty === 'Easy'
                        ? 'bg-green-500/20 text-green-400'
                        : question.difficulty === 'Medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {question.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-white/40 mb-4">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {question.questions} Questions
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {question.timeLimit}
                  </div>
                </div>

                {question.completed ? (
                  <div className="flex items-center justify-between">
                    <span className="text-green-400">Completed</span>
                    <span className="text-white font-medium">{question.score}%</span>
                  </div>
                ) : (
                  <button className="w-full px-4 py-2 rounded-lg bg-[#fcba28] text-black font-medium hover:bg-[#fcba28]/90 transition-colors">
                    Start Practice
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
