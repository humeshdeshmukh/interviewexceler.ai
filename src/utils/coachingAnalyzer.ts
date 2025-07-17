interface CoachingSession {
  id: string;
  type: 'behavioral' | 'technical' | 'leadership' | 'case-study';
  level: 'entry' | 'mid' | 'senior' | 'executive';
  industry: string;
  role: string;
  duration: number;
  feedback: SessionFeedback;
}

interface SessionFeedback {
  strengths: string[];
  improvements: string[];
  communicationScore: number;
  technicalScore?: number;
  leadershipScore?: number;
  problemSolvingScore?: number;
  overallScore: number;
  recommendations: string[];
}

interface CoachingAnalysis {
  progress: {
    communicationGrowth: number;
    technicalGrowth: number;
    overallGrowth: number;
  };
  trends: {
    strongestAreas: string[];
    improvementAreas: string[];
    consistentPatterns: string[];
  };
  nextSteps: {
    shortTerm: string[];
    longTerm: string[];
    resources: string[];
  };
}

export const generateSessionFeedback = (
  responses: { [key: string]: string },
  sessionType: string,
  level: string
): SessionFeedback => {
  // This would typically connect to an AI model for analysis
  // For now, using mock analysis
  const strengths = ['Clear communication', 'Structured thinking'];
  const improvements = ['Provide more specific examples', 'Deepen technical explanations'];
  
  const scores = {
    communication: calculateScore(responses, 'communication'),
    technical: calculateScore(responses, 'technical'),
    leadership: calculateScore(responses, 'leadership'),
    problemSolving: calculateScore(responses, 'problemSolving'),
  };

  return {
    strengths,
    improvements,
    communicationScore: scores.communication,
    technicalScore: scores.technical,
    leadershipScore: scores.leadership,
    problemSolvingScore: scores.problemSolving,
    overallScore: calculateOverallScore(scores),
    recommendations: generateRecommendations(scores, level)
  };
};

export const analyzeCoachingProgress = (
  sessions: CoachingSession[]
): CoachingAnalysis => {
  const progress = calculateProgress(sessions);
  const trends = analyzeTrends(sessions);
  const nextSteps = generateNextSteps(sessions);

  return {
    progress,
    trends,
    nextSteps
  };
};

function calculateScore(responses: { [key: string]: string }, category: string): number {
  // Mock score calculation - would be replaced with actual scoring logic
  return Math.floor(Math.random() * 30) + 70; // Random score between 70-100
}

function calculateOverallScore(scores: {
  communication: number;
  technical: number;
  leadership: number;
  problemSolving: number;
}): number {
  return Math.round(
    (scores.communication + scores.technical + scores.leadership + scores.problemSolving) / 4
  );
}

function generateRecommendations(scores: any, level: string): string[] {
  const recommendations = [
    'Practice structured answering techniques using the STAR method',
    'Prepare more detailed technical examples from past projects',
    'Focus on quantifying achievements and impact in responses',
    'Develop stronger storytelling abilities for behavioral questions'
  ];

  if (level === 'senior' || level === 'executive') {
    recommendations.push(
      'Emphasize leadership experience and team impact',
      'Prepare strategic thinking examples'
    );
  }

  return recommendations;
}

function calculateProgress(sessions: CoachingSession[]): {
  communicationGrowth: number;
  technicalGrowth: number;
  overallGrowth: number;
} {
  if (sessions.length < 2) {
    return {
      communicationGrowth: 0,
      technicalGrowth: 0,
      overallGrowth: 0
    };
  }

  const firstSession = sessions[0];
  const lastSession = sessions[sessions.length - 1];

  return {
    communicationGrowth: 
      ((lastSession.feedback.communicationScore - firstSession.feedback.communicationScore) /
        firstSession.feedback.communicationScore) * 100,
    technicalGrowth:
      ((lastSession.feedback.technicalScore! - firstSession.feedback.technicalScore!) /
        firstSession.feedback.technicalScore!) * 100,
    overallGrowth:
      ((lastSession.feedback.overallScore - firstSession.feedback.overallScore) /
        firstSession.feedback.overallScore) * 100
  };
}

function analyzeTrends(sessions: CoachingSession[]): {
  strongestAreas: string[];
  improvementAreas: string[];
  consistentPatterns: string[];
} {
  // Analyze patterns across sessions
  return {
    strongestAreas: [
      'Technical problem solving',
      'Communication clarity',
      'Structured thinking'
    ],
    improvementAreas: [
      'Behavioral example specificity',
      'Leadership scenario responses',
      'System design depth'
    ],
    consistentPatterns: [
      'Strong in algorithmic problems',
      'Needs more focus on system scalability',
      'Good communication foundation'
    ]
  };
}

function generateNextSteps(sessions: CoachingSession[]): {
  shortTerm: string[];
  longTerm: string[];
  resources: string[];
} {
  return {
    shortTerm: [
      'Practice behavioral interviews with STAR method',
      'Review system design fundamentals',
      'Prepare leadership experience stories'
    ],
    longTerm: [
      'Develop deeper technical expertise in scalable systems',
      'Build portfolio of quantifiable achievements',
      'Enhance strategic thinking capabilities'
    ],
    resources: [
      'System Design Interview Course',
      'Leadership Case Studies',
      'Communication Workshop Series'
    ]
  };
}
