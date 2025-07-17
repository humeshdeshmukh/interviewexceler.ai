'use client';

import React from 'react';
import { TopicCard } from './TopicCard';
import { Topic } from '../../types';
import {
  Brain,
  Calculator,
  ChartBar,
  Puzzle,
  Sigma,
  Lightbulb,
} from 'lucide-react';

const topics: Topic[] = [
  {
    id: 'numerical',
    title: 'Numerical Ability',
    description: 'Master mathematical concepts and problem-solving techniques',
    icon: Calculator,
    color: 'bg-blue-500/10 text-blue-400',
    questions: 250,
    avgTime: '20 min',
  },
  {
    id: 'logical',
    title: 'Logical Reasoning',
    description: 'Enhance your analytical and critical thinking skills',
    icon: Brain,
    color: 'bg-purple-500/10 text-purple-400',
    questions: 200,
    avgTime: '25 min',
  },
  {
    id: 'verbal',
    title: 'Verbal Ability',
    description: 'Improve your language and communication skills',
    icon: Lightbulb,
    color: 'bg-yellow-500/10 text-yellow-400',
    questions: 180,
    avgTime: '15 min',
  },
  {
    id: 'data-interpretation',
    title: 'Data Interpretation',
    description: 'Learn to analyze and interpret complex data sets',
    icon: ChartBar,
    color: 'bg-green-500/10 text-green-400',
    questions: 150,
    avgTime: '30 min',
  },
  {
    id: 'quantitative',
    title: 'Quantitative Aptitude',
    description: 'Practice advanced mathematical problem solving',
    icon: Sigma,
    color: 'bg-red-500/10 text-red-400',
    questions: 300,
    avgTime: '25 min',
  },
  {
    id: 'puzzles',
    title: 'Puzzles',
    description: 'Solve challenging puzzles and brain teasers',
    icon: Puzzle,
    color: 'bg-orange-500/10 text-orange-400',
    questions: 100,
    avgTime: '20 min',
  },
];

export function TopicsGrid() {
  return (
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((topic, index) => (
        <TopicCard key={topic.id} {...topic} index={index} />
      ))}
    </div>
  );
}
