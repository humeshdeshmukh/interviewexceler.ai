export type QuestionCategory = 
  | 'Frontend'
  | 'Backend'
  | 'System Design'
  | 'Data Structures'
  | 'Algorithms'
  | 'DevOps'
  | 'Security'
  | 'Testing'
  | 'Database'
  | 'Machine Learning'
  | 'Leadership'
  | 'Problem Solving'
  | 'Communication'
  | 'Time Management'
  | 'Project Management'
  | 'Innovation';

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';

export type QuestionType = 'Tech' | 'Non-Tech';

export interface Question {
  id: number;
  title: string;
  description: string;
  company?: string;
  type: QuestionType;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  isBookmarked: boolean;
  details?: string;
  tags?: string[];
  likes?: number;
  views?: number;
  createdAt: string;
  updatedAt: string;
}

// Explicitly export all types and interfaces
export {
  QuestionCategory,
  QuestionDifficulty,
  QuestionType,
  Question
};
