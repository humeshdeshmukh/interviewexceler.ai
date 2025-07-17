import { Skill } from './types';

export const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    topics: ['React', 'Angular', 'Vue.js', 'JavaScript', 'TypeScript', 'HTML/CSS'],
    icon: '💻',
    color: '#00A3FF'
  },
  {
    id: 'backend',
    name: 'Backend Development',
    topics: ['Node.js', 'Python', 'Java', 'C#', 'PHP', 'Ruby'],
    icon: '⚙️',
    color: '#00C48C'
  },
  {
    id: 'database',
    name: 'Database',
    topics: ['SQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Firebase'],
    icon: '🗄️',
    color: '#7B61FF'
  },
  {
    id: 'devops',
    name: 'DevOps',
    topics: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
    icon: '🚀',
    color: '#FF6B6B'
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    topics: ['React Native', 'Flutter', 'iOS', 'Android', 'Kotlin'],
    icon: '📱',
    color: '#FFA26B'
  },
  {
    id: 'ai',
    name: 'AI & Machine Learning',
    topics: ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'Deep Learning'],
    icon: '🧠',
    color: '#6B66FF'
  }
];

export const experienceLevels = [
  { value: 1, label: 'Beginner', description: '0-1 years' },
  { value: 2, label: 'Junior', description: '1-3 years' },
  { value: 3, label: 'Intermediate', description: '3-5 years' },
  { value: 4, label: 'Senior', description: '5-8 years' },
  { value: 5, label: 'Expert', description: '8+ years' }
];

export const confidenceLevels = [
  { value: 1, label: 'Basic Understanding' },
  { value: 2, label: 'Can Work With Guidance' },
  { value: 3, label: 'Independent Worker' },
  { value: 4, label: 'Can Mentor Others' },
  { value: 5, label: 'Subject Matter Expert' }
];

export const themes = {
  primary: {
    main: '#7B61FF',
    light: '#9D89FF',
    dark: '#5A3FFF'
  },
  secondary: {
    main: '#00C48C',
    light: '#33D2A6',
    dark: '#00A372'
  },
  accent: {
    main: '#FF6B6B',
    light: '#FF8F8F',
    dark: '#FF4747'
  },
  background: {
    default: '#0A0A0F',
    paper: '#14141F',
    elevated: '#1E1E2D'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B4B4C7',
    disabled: '#6E6E89'
  }
};
