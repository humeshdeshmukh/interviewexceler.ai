import { skillCategories, proficiencyLevels, skillMetrics } from '../constants/skills';

export interface SkillAssessment {
  skillId: string;
  proficiencyLevel: number;
  yearsOfExperience: number;
  lastUsed: string;
  confidenceLevel: number;
  projects?: string[];
}

export interface AnalysisResult {
  overallScore: number;
  categoryScores: Record<string, number>;
  strengths: string[];
  areasForImprovement: string[];
  recommendations: string[];
  marketRelevance: number;
  growthPotential: number;
  skillGaps: string[];
  learningPath: LearningPathItem[];
}

interface LearningPathItem {
  skill: string;
  priority: 'high' | 'medium' | 'low';
  resources: string[];
  timeEstimate: string;
}

export class SkillAnalyzer {
  private calculateProficiencyScore(assessment: SkillAssessment): number {
    const weights = {
      proficiency: 0.4,
      experience: 0.3,
      recency: 0.2,
      confidence: 0.1
    };

    const proficiencyScore = (assessment.proficiencyLevel / 5) * 100;
    const experienceScore = Math.min(assessment.yearsOfExperience / 10, 1) * 100;
    
    // Calculate recency score (more recent = higher score)
    const lastUsedDate = new Date(assessment.lastUsed);
    const monthsAgo = (new Date().getTime() - lastUsedDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    const recencyScore = Math.max(0, 100 - (monthsAgo * 5)); // Subtract 5 points per month

    const confidenceScore = (assessment.confidenceLevel / 5) * 100;

    return (
      proficiencyScore * weights.proficiency +
      experienceScore * weights.experience +
      recencyScore * weights.recency +
      confidenceScore * weights.confidence
    );
  }

  private calculateMarketRelevance(skillId: string): number {
    // This would ideally be connected to real market data
    // For now, using a simplified scoring based on predefined weights
    const marketWeights = {
      'react': 0.9,
      'typescript': 0.85,
      'python': 0.8,
      'aws': 0.85,
      'docker': 0.8,
      'kubernetes': 0.75,
      'nodejs': 0.8,
      'sql': 0.75,
      'mongodb': 0.7
      // Add more skills and their weights
    };

    return (marketWeights[skillId as keyof typeof marketWeights] || 0.5) * 100;
  }

  private calculateGrowthPotential(skillId: string, currentProficiency: number): number {
    // Simplified growth potential calculation
    const marketRelevance = this.calculateMarketRelevance(skillId);
    const roomForGrowth = 100 - currentProficiency;
    
    return (marketRelevance * 0.7 + roomForGrowth * 0.3);
  }

  private identifySkillGaps(assessments: SkillAssessment[]): string[] {
    const gaps: string[] = [];
    const assessedSkills = new Set(assessments.map(a => a.skillId));

    // Check for missing essential skills in each category
    skillCategories.forEach(category => {
      const essentialSkills = category.topics.filter(topic => 
        ['Advanced', 'Expert'].includes(topic.level)
      );

      essentialSkills.forEach(skill => {
        if (!assessedSkills.has(skill.id)) {
          gaps.push(skill.name);
        }
      });
    });

    return gaps;
  }

  private generateLearningPath(
    assessments: SkillAssessment[],
    skillGaps: string[]
  ): LearningPathItem[] {
    const learningPath: LearningPathItem[] = [];

    // Add items for skill gaps
    skillGaps.forEach(skillName => {
      learningPath.push({
        skill: skillName,
        priority: 'high',
        resources: [
          'Online courses on platforms like Coursera or Udemy',
          'Official documentation and tutorials',
          'Practice projects and exercises'
        ],
        timeEstimate: '2-3 months'
      });
    });

    // Add improvement items for low-proficiency skills
    assessments
      .filter(assessment => assessment.proficiencyLevel < 3)
      .forEach(assessment => {
        const skill = this.findSkillById(assessment.skillId);
        if (skill) {
          learningPath.push({
            skill: skill.name,
            priority: 'medium',
            resources: [
              'Advanced tutorials and workshops',
              'Real-world project implementation',
              'Community forums and discussion groups'
            ],
            timeEstimate: '1-2 months'
          });
        }
      });

    return learningPath;
  }

  private findSkillById(skillId: string) {
    for (const category of skillCategories) {
      const skill = category.topics.find(topic => topic.id === skillId);
      if (skill) return skill;
    }
    return null;
  }

  public analyzeSkills(assessments: SkillAssessment[]): AnalysisResult {
    // Calculate overall score
    const scores = assessments.map(assessment => 
      this.calculateProficiencyScore(assessment)
    );
    const overallScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    // Calculate category scores
    const categoryScores: Record<string, number> = {};
    skillCategories.forEach(category => {
      const categoryAssessments = assessments.filter(assessment =>
        category.topics.some(topic => topic.id === assessment.skillId)
      );
      if (categoryAssessments.length > 0) {
        const categoryScore = categoryAssessments.reduce(
          (sum, assessment) => sum + this.calculateProficiencyScore(assessment),
          0
        ) / categoryAssessments.length;
        categoryScores[category.id] = categoryScore;
      }
    });

    // Identify strengths and areas for improvement
    const strengths: string[] = [];
    const areasForImprovement: string[] = [];
    const recommendations: string[] = [];

    assessments.forEach(assessment => {
      const skill = this.findSkillById(assessment.skillId);
      if (!skill) return;

      const score = this.calculateProficiencyScore(assessment);
      if (score >= 80) {
        strengths.push(`Strong proficiency in ${skill.name}`);
      } else if (score <= 60) {
        areasForImprovement.push(`Need improvement in ${skill.name}`);
        recommendations.push(`Focus on enhancing ${skill.name} skills through practical projects`);
      }
    });

    // Calculate market relevance and growth potential
    const marketRelevance = assessments.reduce(
      (sum, assessment) => sum + this.calculateMarketRelevance(assessment.skillId),
      0
    ) / assessments.length;

    const growthPotential = assessments.reduce(
      (sum, assessment) => 
        sum + this.calculateGrowthPotential(assessment.skillId, assessment.proficiencyLevel),
      0
    ) / assessments.length;

    // Identify skill gaps
    const skillGaps = this.identifySkillGaps(assessments);

    // Generate learning path
    const learningPath = this.generateLearningPath(assessments, skillGaps);

    return {
      overallScore,
      categoryScores,
      strengths,
      areasForImprovement,
      recommendations,
      marketRelevance,
      growthPotential,
      skillGaps,
      learningPath
    };
  }
}
