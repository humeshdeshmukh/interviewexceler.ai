import { Category } from '../utils/types';

export const categories: Category[] = [
  {
    id: 'technical',
    name: 'Technical Skills',
    subcategories: [
      { id: 'algorithms', name: 'Algorithms & Data Structures' },
      { id: 'system-design', name: 'System Design' },
      { id: 'web-dev', name: 'Web Development' },
      { id: 'databases', name: 'Database Design & SQL' },
      { id: 'cloud', name: 'Cloud Computing' }
    ]
  },
  {
    id: 'behavioral',
    name: 'Behavioral',
    subcategories: [
      { id: 'leadership', name: 'Leadership & Management' },
      { id: 'teamwork', name: 'Teamwork & Collaboration' },
      { id: 'problem-solving', name: 'Problem Solving' },
      { id: 'communication', name: 'Communication Skills' },
      { id: 'conflict', name: 'Conflict Resolution' }
    ]
  },
  {
    id: 'non-technical',
    name: 'Non-Technical',
    subcategories: [
      { id: 'project-management', name: 'Project Management' },
      { id: 'agile', name: 'Agile & Scrum' },
      { id: 'soft-skills', name: 'Soft Skills' },
      { id: 'time-management', name: 'Time Management' },
      { id: 'critical-thinking', name: 'Critical Thinking' }
    ]
  }
];
