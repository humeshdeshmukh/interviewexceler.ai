import { LucideIcon } from 'lucide-react';

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  questions: number;
  avgTime: string;
}

export interface ProgressData {
  questionsSolved: number;
  questionsChange: string;
  accuracyRate: number;
  accuracyChange: string;
  avgTime: string;
  timeChange: string;
}

export interface StatItemProps {
  value: string;
  label: string;
  delay?: number;
}

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}
