import { FaCode, FaDatabase, FaCloud, FaMobile, FaBrain, FaTools, FaChartLine, FaServer, FaPalette, FaShieldAlt } from 'react-icons/fa';
import { theme } from './theme';

export const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: FaCode,
    color: theme.colors.primary.main,
    topics: [
      { id: 'react', name: 'React.js', level: 'Advanced' },
      { id: 'vue', name: 'Vue.js', level: 'Intermediate' },
      { id: 'angular', name: 'Angular', level: 'Advanced' },
      { id: 'javascript', name: 'JavaScript', level: 'Expert' },
      { id: 'typescript', name: 'TypeScript', level: 'Advanced' },
      { id: 'html-css', name: 'HTML/CSS', level: 'Expert' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend Development',
    icon: FaServer,
    color: theme.colors.secondary.main,
    topics: [
      { id: 'nodejs', name: 'Node.js', level: 'Advanced' },
      { id: 'python', name: 'Python', level: 'Intermediate' },
      { id: 'java', name: 'Java', level: 'Advanced' },
      { id: 'csharp', name: 'C#', level: 'Intermediate' },
      { id: 'go', name: 'Go', level: 'Beginner' }
    ]
  },
  {
    id: 'database',
    name: 'Database',
    icon: FaDatabase,
    color: theme.colors.accent.main,
    topics: [
      { id: 'sql', name: 'SQL', level: 'Advanced' },
      { id: 'mongodb', name: 'MongoDB', level: 'Intermediate' },
      { id: 'postgresql', name: 'PostgreSQL', level: 'Advanced' },
      { id: 'redis', name: 'Redis', level: 'Intermediate' }
    ]
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    icon: FaCloud,
    color: theme.colors.success.main,
    topics: [
      { id: 'aws', name: 'AWS', level: 'Advanced' },
      { id: 'docker', name: 'Docker', level: 'Intermediate' },
      { id: 'kubernetes', name: 'Kubernetes', level: 'Advanced' },
      { id: 'ci-cd', name: 'CI/CD', level: 'Intermediate' }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    icon: FaMobile,
    color: theme.colors.warning.main,
    topics: [
      { id: 'react-native', name: 'React Native', level: 'Advanced' },
      { id: 'flutter', name: 'Flutter', level: 'Intermediate' },
      { id: 'ios', name: 'iOS (Swift)', level: 'Beginner' },
      { id: 'android', name: 'Android (Kotlin)', level: 'Intermediate' }
    ]
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    icon: FaBrain,
    color: theme.colors.error.main,
    topics: [
      { id: 'tensorflow', name: 'TensorFlow', level: 'Intermediate' },
      { id: 'pytorch', name: 'PyTorch', level: 'Beginner' },
      { id: 'nlp', name: 'NLP', level: 'Advanced' },
      { id: 'computer-vision', name: 'Computer Vision', level: 'Intermediate' }
    ]
  }
];

export const experienceLevels = [
  { id: 'beginner', name: 'Beginner', years: '0-1', color: theme.colors.success.main },
  { id: 'intermediate', name: 'Intermediate', years: '1-3', color: theme.colors.warning.main },
  { id: 'advanced', name: 'Advanced', years: '3-5', color: theme.colors.accent.main },
  { id: 'expert', name: 'Expert', years: '5+', color: theme.colors.secondary.main }
];

export const proficiencyLevels = [
  { id: 1, name: 'Basic Understanding', description: 'Familiar with core concepts' },
  { id: 2, name: 'Working Knowledge', description: 'Can work with guidance' },
  { id: 3, name: 'Practical Application', description: 'Can work independently' },
  { id: 4, name: 'Advanced Implementation', description: 'Can architect solutions' },
  { id: 5, name: 'Expert Mastery', description: 'Can innovate and teach' }
];

export const assessmentTypes = [
  {
    id: 'quick',
    name: 'Quick Assessment',
    icon: FaChartLine,
    description: 'Get a quick overview of your skills',
    duration: '5-10 minutes'
  },
  {
    id: 'detailed',
    name: 'Detailed Analysis',
    icon: FaTools,
    description: 'In-depth analysis with personalized feedback',
    duration: '15-20 minutes'
  },
  {
    id: 'ai-powered',
    name: 'AI-Powered Analysis',
    icon: FaBrain,
    description: 'Advanced analysis using AI algorithms',
    duration: '10-15 minutes'
  }
];

export const skillMetrics = [
  {
    id: 'technical',
    name: 'Technical Proficiency',
    icon: FaCode,
    description: 'Depth of technical knowledge and practical skills'
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    icon: FaTools,
    description: 'Ability to solve complex technical challenges'
  },
  {
    id: 'best-practices',
    name: 'Best Practices',
    icon: FaShieldAlt,
    description: 'Adherence to industry standards and best practices'
  },
  {
    id: 'design',
    name: 'Design & Architecture',
    icon: FaPalette,
    description: 'System design and architectural knowledge'
  }
];
