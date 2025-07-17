export interface ResumeSection {
  id: string;
  type: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'awards' | 'custom';
  title: string;
  content: any;
  order: number;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  achievements: string[];
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: number;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: {
    id: string;
    title: string;
    subtitle?: string;
    date?: string;
    description?: string;
    bullets?: string[];
  }[];
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  template: string;
  color: string;
  font: string;
  sections: ResumeSection[];
  isPublic: boolean;
  score?: number;
  aiSuggestions?: string[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'professional' | 'creative' | 'simple' | 'modern' | 'academic';
  popularityScore: number;
  suitableFor: string[];
}

export const defaultTemplates: ResumeTemplate[] = [
  {
    id: 'professional-1',
    name: 'Executive Pro',
    description: 'Clean and professional template perfect for corporate positions',
    preview: '/templates/professional-1.png',
    category: 'professional',
    popularityScore: 4.8,
    suitableFor: ['Business', 'Finance', 'Management', 'Consulting']
  },
  {
    id: 'creative-1',
    name: 'Creative Edge',
    description: 'Modern and eye-catching design for creative professionals',
    preview: '/templates/creative-1.png',
    category: 'creative',
    popularityScore: 4.7,
    suitableFor: ['Design', 'Marketing', 'Art', 'Media']
  },
  {
    id: 'simple-1',
    name: 'Minimalist',
    description: 'Clean and straightforward layout that focuses on content',
    preview: '/templates/simple-1.png',
    category: 'simple',
    popularityScore: 4.6,
    suitableFor: ['Entry Level', 'Academic', 'Research']
  },
  {
    id: 'modern-1',
    name: 'Tech Innovator',
    description: 'Contemporary design with a focus on skills and achievements',
    preview: '/templates/modern-1.png',
    category: 'modern',
    popularityScore: 4.9,
    suitableFor: ['Technology', 'Engineering', 'Product Management']
  }
];

export const analyzeResume = (resume: Resume): {
  score: number;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
} => {
  const analysis = {
    score: 0,
    suggestions: [],
    strengths: [],
    weaknesses: []
  };

  // Analyze content length and quality
  const sections = resume.sections;
  let totalScore = 0;

  // Check personal information
  const personalSection = sections.find(s => s.type === 'personal');
  if (personalSection) {
    const personal = personalSection.content as PersonalInfo;
    if (!personal.linkedin) {
      analysis.suggestions.push('Add your LinkedIn profile to increase professional networking opportunities');
    }
    if (!personal.portfolio && !personal.github) {
      analysis.suggestions.push('Consider adding a portfolio or GitHub profile to showcase your work');
    }
  }

  // Check experience section
  const experienceSection = sections.find(s => s.type === 'experience');
  if (experienceSection) {
    const experiences = experienceSection.content as Experience[];
    if (experiences.length === 0) {
      analysis.weaknesses.push('No work experience listed');
    } else {
      experiences.forEach(exp => {
        if (exp.description.length < 3) {
          analysis.suggestions.push(`Add more detail to your role at ${exp.company}`);
        }
        if (exp.achievements.length === 0) {
          analysis.suggestions.push(`Add specific achievements for your position at ${exp.company}`);
        }
      });
    }
  }

  // Check skills section
  const skillsSection = sections.find(s => s.type === 'skills');
  if (skillsSection) {
    const skills = skillsSection.content as Skill[];
    if (skills.length < 5) {
      analysis.suggestions.push('Add more skills to showcase your expertise');
    } else {
      analysis.strengths.push('Good range of skills listed');
    }
  }

  // Calculate final score
  totalScore = Math.min(100, totalScore);
  analysis.score = totalScore;

  return analysis;
};

export const generateAISuggestions = (resume: Resume): string[] => {
  const suggestions: string[] = [];
  
  // Add AI-powered suggestions based on industry trends and best practices
  suggestions.push('Use more action verbs in your experience descriptions');
  suggestions.push('Quantify your achievements with specific metrics');
  suggestions.push('Tailor your resume to match the job description keywords');
  
  return suggestions;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};
