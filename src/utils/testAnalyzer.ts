interface Question {
  id: string;
  type: 'mcq' | 'coding' | 'written';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  code?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  timeLimit: number; // in seconds
}

interface TestResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  accuracy: number;
  strengths: string[];
  improvements: string[];
  categoryScores: { [key: string]: number };
}

interface TestAnalysis {
  score: number;
  performance: {
    speed: string;
    accuracy: string;
    consistency: string;
  };
  recommendations: string[];
  nextSteps: string[];
}

// Mock questions database - In a real app, this would come from an API
export const getQuestions = (category: string, difficulty: string, count: number): Question[] => {
  const questions: Question[] = [
    {
      id: '1',
      type: 'mcq',
      difficulty: 'medium',
      category: 'javascript',
      question: 'What is the output of: console.log(typeof typeof 1)?',
      options: ['number', 'string', 'undefined', 'object'],
      correctAnswer: 'string',
      explanation: 'typeof 1 returns "number", and typeof "number" returns "string"',
      timeLimit: 60
    },
    {
      id: '2',
      type: 'coding',
      difficulty: 'hard',
      category: 'algorithms',
      question: 'Implement a function to find the longest palindromic substring in a string.',
      code: 'function longestPalindrome(s: string): string {\n  // Your code here\n}',
      correctAnswer: ['solution1', 'solution2'],
      explanation: 'The optimal solution uses dynamic programming or expand around center approach.',
      timeLimit: 900
    },
    // Add more questions as needed
  ];

  return questions
    .filter(q => q.category === category && q.difficulty === difficulty)
    .slice(0, count);
};

export const analyzeTestResult = (
  answers: { [key: string]: string },
  questions: Question[],
  timeSpent: number
): TestResult => {
  let correct = 0;
  const categoryScores: { [key: string]: number } = {};
  
  questions.forEach(q => {
    if (!categoryScores[q.category]) {
      categoryScores[q.category] = 0;
    }
    
    if (Array.isArray(q.correctAnswer)) {
      if (q.correctAnswer.includes(answers[q.id])) {
        correct++;
        categoryScores[q.category]++;
      }
    } else {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
        categoryScores[q.category]++;
      }
    }
  });

  const score = (correct / questions.length) * 100;
  const accuracy = (correct / questions.length) * 100;

  // Calculate strengths and improvements
  const strengths: string[] = [];
  const improvements: string[] = [];

  Object.entries(categoryScores).forEach(([category, score]) => {
    const categoryQuestions = questions.filter(q => q.category === category).length;
    const categoryAccuracy = (score / categoryQuestions) * 100;
    
    if (categoryAccuracy >= 70) {
      strengths.push(category);
    } else {
      improvements.push(category);
    }
  });

  return {
    score,
    totalQuestions: questions.length,
    correctAnswers: correct,
    timeSpent,
    accuracy,
    strengths,
    improvements,
    categoryScores
  };
};

export const generateTestAnalysis = (result: TestResult): TestAnalysis => {
  const speedRating = getSpeedRating(result.timeSpent, result.totalQuestions);
  const accuracyRating = getAccuracyRating(result.accuracy);
  const consistencyRating = getConsistencyRating(result.categoryScores);

  return {
    score: result.score,
    performance: {
      speed: speedRating,
      accuracy: accuracyRating,
      consistency: consistencyRating
    },
    recommendations: generateRecommendations(result),
    nextSteps: generateNextSteps(result)
  };
};

function getSpeedRating(timeSpent: number, totalQuestions: number): string {
  const avgTimePerQuestion = timeSpent / totalQuestions;
  if (avgTimePerQuestion < 30) return 'Excellent';
  if (avgTimePerQuestion < 60) return 'Good';
  if (avgTimePerQuestion < 90) return 'Average';
  return 'Needs Improvement';
}

function getAccuracyRating(accuracy: number): string {
  if (accuracy >= 90) return 'Excellent';
  if (accuracy >= 70) return 'Good';
  if (accuracy >= 50) return 'Average';
  return 'Needs Improvement';
}

function getConsistencyRating(categoryScores: { [key: string]: number }): string {
  const scores = Object.values(categoryScores);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = scores.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / scores.length;
  
  if (variance < 0.1) return 'Excellent';
  if (variance < 0.2) return 'Good';
  if (variance < 0.3) return 'Average';
  return 'Needs Improvement';
}

function generateRecommendations(result: TestResult): string[] {
  const recommendations: string[] = [];
  
  if (result.accuracy < 70) {
    recommendations.push('Focus on understanding core concepts');
    recommendations.push('Practice more questions in weak areas');
  }
  
  result.improvements.forEach(category => {
    recommendations.push(`Review ${category} fundamentals`);
    recommendations.push(`Take more practice tests in ${category}`);
  });

  return recommendations;
}

function generateNextSteps(result: TestResult): string[] {
  return [
    'Review incorrect answers and their explanations',
    'Focus on improving timing while maintaining accuracy',
    'Practice similar questions in weak areas',
    'Take another mock test in 2-3 days'
  ];
}
