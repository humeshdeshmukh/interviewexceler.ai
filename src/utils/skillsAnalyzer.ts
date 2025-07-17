interface SkillLevel {
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  score: number;
  description: string;
}

interface SkillCategory {
  name: string;
  skills: {
    name: string;
    proficiency: SkillLevel;
    lastUsed?: string;
    projects?: string[];
    certifications?: string[];
  }[];
}

interface SkillGap {
  skill: string;
  currentLevel: SkillLevel;
  requiredLevel: SkillLevel;
  recommendations: string[];
  resources: string[];
}

interface MarketAnalysis {
  demandLevel: 'low' | 'medium' | 'high';
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  topEmployers: string[];
  growthTrend: 'declining' | 'stable' | 'growing' | 'booming';
}

interface SkillsAnalysis {
  categories: SkillCategory[];
  overallScore: number;
  skillGaps: SkillGap[];
  marketAnalysis: MarketAnalysis;
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}

export const calculateSkillLevel = (
  experience: number,
  projectCount: number,
  certifications: string[]
): SkillLevel => {
  let score = 0;
  
  // Experience scoring
  score += Math.min(experience * 20, 40);
  
  // Project scoring
  score += Math.min(projectCount * 10, 30);
  
  // Certification scoring
  score += Math.min(certifications.length * 10, 30);
  
  // Determine level based on score
  if (score >= 90) {
    return {
      level: 'expert',
      score,
      description: 'Demonstrates mastery and thought leadership'
    };
  } else if (score >= 70) {
    return {
      level: 'advanced',
      score,
      description: 'Shows deep understanding and practical expertise'
    };
  } else if (score >= 40) {
    return {
      level: 'intermediate',
      score,
      description: 'Exhibits working knowledge and regular application'
    };
  } else {
    return {
      level: 'beginner',
      score,
      description: 'Shows basic understanding and limited experience'
    };
  }
};

export const analyzeSkillGaps = (
  currentSkills: SkillCategory[],
  targetRole: string
): SkillGap[] => {
  // Mock implementation - would connect to job market data API
  const mockRequiredSkills = {
    'Full Stack Development': 'advanced',
    'Cloud Computing': 'intermediate',
    'DevOps': 'intermediate',
    'Data Structures': 'advanced'
  };
  
  const gaps: SkillGap[] = [];
  
  currentSkills.forEach(category => {
    category.skills.forEach(skill => {
      const requiredLevel = mockRequiredSkills[skill.name as keyof typeof mockRequiredSkills];
      if (requiredLevel && getSkillLevelValue(skill.proficiency.level) < getSkillLevelValue(requiredLevel as SkillLevel['level'])) {
        gaps.push({
          skill: skill.name,
          currentLevel: skill.proficiency,
          requiredLevel: calculateSkillLevel(5, 10, []), // Mock required level
          recommendations: generateRecommendations(skill.name, requiredLevel as SkillLevel['level']),
          resources: generateResources(skill.name)
        });
      }
    });
  });
  
  return gaps;
};

export const getMarketAnalysis = async (
  skills: string[],
  location: string
): Promise<MarketAnalysis> => {
  // Mock implementation - would connect to job market API
  return {
    demandLevel: 'high',
    salaryRange: {
      min: 80000,
      max: 150000,
      currency: 'USD'
    },
    topEmployers: [
      'Google',
      'Microsoft',
      'Amazon',
      'Meta',
      'Apple'
    ],
    growthTrend: 'growing'
  };
};

function getSkillLevelValue(level: SkillLevel['level']): number {
  const levels = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4
  };
  return levels[level];
}

function generateRecommendations(skill: string, targetLevel: SkillLevel['level']): string[] {
  // Mock recommendations - would be AI-generated based on skill and target level
  return [
    `Complete advanced courses in ${skill}`,
    `Work on real-world projects involving ${skill}`,
    `Obtain industry-recognized certifications in ${skill}`,
    `Contribute to open-source projects using ${skill}`,
    `Build a portfolio showcasing ${skill} expertise`
  ];
}

function generateResources(skill: string): string[] {
  // Mock resources - would be dynamically generated based on skill
  return [
    `Udemy - Advanced ${skill} Masterclass`,
    `Coursera - ${skill} Specialization`,
    `GitHub - ${skill} Project Examples`,
    `YouTube - ${skill} Tutorial Series`,
    `Documentation - Official ${skill} Guide`
  ];
}

export const generateSkillsReport = (analysis: SkillsAnalysis): string => {
  return `
# Skills Analysis Report

## Overall Score: ${analysis.overallScore}/100

## Skill Categories
${analysis.categories.map(category => `
### ${category.name}
${category.skills.map(skill => `
- ${skill.name}
  - Level: ${skill.proficiency.level} (${skill.proficiency.score}/100)
  - ${skill.proficiency.description}
  ${skill.lastUsed ? `- Last Used: ${skill.lastUsed}` : ''}
  ${skill.projects ? `- Projects: ${skill.projects.join(', ')}` : ''}
  ${skill.certifications ? `- Certifications: ${skill.certifications.join(', ')}` : ''}
`).join('')}
`).join('')}

## Skill Gaps
${analysis.skillGaps.map(gap => `
### ${gap.skill}
- Current Level: ${gap.currentLevel.level} (${gap.currentLevel.score}/100)
- Required Level: ${gap.requiredLevel.level} (${gap.requiredLevel.score}/100)

Recommendations:
${gap.recommendations.map(rec => `- ${rec}`).join('\n')}

Resources:
${gap.resources.map(res => `- ${res}`).join('\n')}
`).join('')}

## Market Analysis
- Demand Level: ${analysis.marketAnalysis.demandLevel}
- Salary Range: ${analysis.marketAnalysis.salaryRange.currency} ${analysis.marketAnalysis.salaryRange.min.toLocaleString()} - ${analysis.marketAnalysis.salaryRange.max.toLocaleString()}
- Growth Trend: ${analysis.marketAnalysis.growthTrend}

Top Employers:
${analysis.marketAnalysis.topEmployers.map(employer => `- ${employer}`).join('\n')}

## Development Recommendations
### Immediate Actions
${analysis.recommendations.immediate.map(rec => `- ${rec}`).join('\n')}

### Short-term Goals (3-6 months)
${analysis.recommendations.shortTerm.map(rec => `- ${rec}`).join('\n')}

### Long-term Goals (6-12 months)
${analysis.recommendations.longTerm.map(rec => `- ${rec}`).join('\n')}
`.trim();
};
