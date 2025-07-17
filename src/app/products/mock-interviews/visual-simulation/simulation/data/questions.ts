export type QuestionType = 'introduction' | 'behavioral' | 'technical' | 'leadership' | 'problem-solving' | 'cultural-fit' | 'closing';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const interviewQuestions: Question[] = [
  // Introduction Questions
  {
    id: 'i1',
    text: 'Tell me about yourself and your background.',
    type: 'introduction',
    category: 'Opening',
    difficulty: 'easy'
  },
  {
    id: 'i2',
    text: 'Walk me through your resume and highlight your key achievements.',
    type: 'introduction',
    category: 'Opening',
    difficulty: 'easy'
  },
  {
    id: 'i3',
    text: 'What made you interested in this position and our company?',
    type: 'introduction',
    category: 'Opening',
    difficulty: 'easy'
  },

  // Behavioral Questions
  {
    id: 'b1',
    text: 'Tell me about a challenging project you worked on and how you handled it.',
    type: 'behavioral',
    category: 'Project Management',
    difficulty: 'medium'
  },
  {
    id: 'b2',
    text: 'Describe a situation where you had to deal with a difficult team member or stakeholder.',
    type: 'behavioral',
    category: 'Teamwork',
    difficulty: 'medium'
  },
  {
    id: 'b3',
    text: 'Give me an example of a time when you had to meet a tight deadline.',
    type: 'behavioral',
    category: 'Time Management',
    difficulty: 'medium'
  },
  {
    id: 'b4',
    text: 'Tell me about a time when you had to learn a new technology or skill quickly.',
    type: 'behavioral',
    category: 'Adaptability',
    difficulty: 'medium'
  },
  {
    id: 'b5',
    text: 'Describe a situation where you had to make a difficult decision with limited information.',
    type: 'behavioral',
    category: 'Decision Making',
    difficulty: 'hard'
  },

  // Technical Questions
  {
    id: 't1',
    text: 'What is your experience with modern web development frameworks? Which ones have you used and why?',
    type: 'technical',
    category: 'Web Development',
    difficulty: 'medium'
  },
  {
    id: 't2',
    text: 'How do you approach testing and quality assurance in your development process?',
    type: 'technical',
    category: 'Testing',
    difficulty: 'medium'
  },
  {
    id: 't3',
    text: 'Explain your experience with cloud services and deployment strategies.',
    type: 'technical',
    category: 'DevOps',
    difficulty: 'hard'
  },
  {
    id: 't4',
    text: 'How do you handle performance optimization in your applications?',
    type: 'technical',
    category: 'Performance',
    difficulty: 'hard'
  },

  // Leadership Questions
  {
    id: 'l1',
    text: 'Tell me about a time when you had to lead a team through a difficult situation.',
    type: 'leadership',
    category: 'Team Leadership',
    difficulty: 'hard'
  },
  {
    id: 'l2',
    text: 'How do you motivate team members and maintain high morale?',
    type: 'leadership',
    category: 'Team Management',
    difficulty: 'medium'
  },
  {
    id: 'l3',
    text: 'Describe a situation where you had to influence stakeholders without direct authority.',
    type: 'leadership',
    category: 'Stakeholder Management',
    difficulty: 'hard'
  },

  // Problem Solving Questions
  {
    id: 'ps1',
    text: 'How would you design a scalable system for handling millions of concurrent users?',
    type: 'problem-solving',
    category: 'System Design',
    difficulty: 'hard'
  },
  {
    id: 'ps2',
    text: 'Describe a complex technical problem you solved and your approach to solving it.',
    type: 'problem-solving',
    category: 'Technical Problem Solving',
    difficulty: 'medium'
  },
  {
    id: 'ps3',
    text: 'How do you approach debugging and troubleshooting complex issues?',
    type: 'problem-solving',
    category: 'Debugging',
    difficulty: 'medium'
  },

  // Cultural Fit Questions
  {
    id: 'cf1',
    text: 'How do you handle work-life balance and manage stress?',
    type: 'cultural-fit',
    category: 'Work-Life Balance',
    difficulty: 'medium'
  },
  {
    id: 'cf2',
    text: 'What type of work environment helps you thrive?',
    type: 'cultural-fit',
    category: 'Work Environment',
    difficulty: 'easy'
  },
  {
    id: 'cf3',
    text: 'How do you stay updated with industry trends and continue learning?',
    type: 'cultural-fit',
    category: 'Professional Development',
    difficulty: 'medium'
  },

  // Closing Questions
  {
    id: 'c1',
    text: 'What are your salary expectations for this role?',
    type: 'closing',
    category: 'Compensation',
    difficulty: 'medium'
  },
  {
    id: 'c2',
    text: 'Do you have any questions for me about the role or company?',
    type: 'closing',
    category: 'Final Questions',
    difficulty: 'easy'
  },
  {
    id: 'c3',
    text: 'What are your expectations for the first 30/60/90 days in this role?',
    type: 'closing',
    category: 'Role Expectations',
    difficulty: 'medium'
  }
];

// Helper functions for question management
export const getQuestionsByType = (type: QuestionType) => {
  return interviewQuestions.filter(q => q.type === type);
};

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return interviewQuestions.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByCategory = (category: string) => {
  return interviewQuestions.filter(q => q.category === category);
};

export const getAllCategories = () => {
  return Array.from(new Set(interviewQuestions.map(q => q.category)));
};
