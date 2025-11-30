export interface Skill {
  id: string;
  name: string;
  level: number;
  experience: number;
  lastUsed: string;
  confidence: number;
  projects: Project[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  role: string;
  impact: string;
}

export interface SkillAnalysis {
  overallScore: number;
  marketDemand: number;
  growthPotential: number;
  recommendations: Recommendation[];
  skillGaps: SkillGap[];
  learningPath: LearningPath;
}

export interface Recommendation {
  type: 'improvement' | 'learning' | 'project';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timeEstimate: string;
}

export interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  marketDemand: number;
  resources: Resource[];
}

export interface Resource {
  type: 'course' | 'documentation' | 'project' | 'mentor';
  title: string;
  url: string;
  duration?: string;
  cost?: string;
}

export interface LearningPath {
  steps: LearningStep[];
  estimatedDuration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface LearningStep {
  order: number;
  title: string;
  description: string;
  resources: Resource[];
  milestones: string[];
  skills: string[];
}
