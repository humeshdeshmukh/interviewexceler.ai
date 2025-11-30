'use client';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export interface TestFormData {
  topics: string[];
  customTopic?: string;
  difficulty: string;
  experienceLevel: string;
  questionCount: number;
  timeLimit: number;
  questionTypes: string[];
  specificFocus: string[];
  difficultyProgression: 'fixed' | 'gradual' | 'random' | 'adaptive';
  includeExplanations: boolean;
  includePracticeQuestions: boolean;
  includeHints: boolean;
  includeResources: boolean;
  focusAreas: string[];
  adaptiveMode: boolean;
  customInstructions?: string;
  interviewType?: string;
  companyFocus?: string;
  codingLanguages: string[];
  includeSystemDesign: boolean;
  includeArchitectureQuestions: boolean;
  includeBehavioralQuestions: boolean;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  previousPerformance?: {
    correctAnswers: number;
    totalQuestions: number;
    topics: Record<string, number>; // Topic success rates
  };
}

const generatePrompt = (formData: TestFormData) => {
  const adaptiveContext = formData.adaptiveMode && formData.previousPerformance
    ? `
Previous Performance Context:
- Success Rate: ${(formData.previousPerformance.correctAnswers / formData.previousPerformance.totalQuestions * 100).toFixed(1)}%
- Strong Topics: ${Object.entries(formData.previousPerformance.topics)
      .filter(([_, rate]) => rate >= 0.7)
      .map(([topic]) => topic)
      .join(', ')}
- Areas for Improvement: ${Object.entries(formData.previousPerformance.topics)
      .filter(([_, rate]) => rate < 0.7)
      .map(([topic]) => topic)
      .join(', ')}
`
    : '';

  return `Generate a technical interview test with the following specifications:
- Topics: ${formData.topics.join(', ')}
- Difficulty: ${formData.difficulty}
- Number of questions: ${formData.questionCount}
- Question types: ${formData.questionTypes.join(', ')}
- Experience level: ${formData.experienceLevel}
${formData.specificFocus.length > 0 ? `- Specific focus areas: ${formData.specificFocus.join(', ')}` : ''}
${adaptiveContext}

Test Configuration:
- Difficulty Progression: ${formData.difficultyProgression}
- Include Explanations: ${formData.includeExplanations}
- Include Practice Questions: ${formData.includePracticeQuestions}
- Include Hints: ${formData.includeHints}
- Include Resources: ${formData.includeResources}
${formData.adaptiveMode ? '- Adaptive Mode: Enabled' : ''}

For each question, provide:
{
  "id": "string",
  "type": "multiple-choice | coding | theoretical",
  "topic": "string",
  "difficulty": "string",
  "question": "string",
  "options": ["string"] (for multiple-choice),
  "correctAnswer": "string",
  "explanation": "string",
  "timeEstimate": "number (in minutes)",
  "points": "number",
  "language": "string" (for coding questions),
  "starterCode": "string" (for coding questions),
  "testCases": [
    {
      "input": "string",
      "expectedOutput": "string"
    }
  ] (for coding questions),
  "timeComplexity": "string" (for coding questions),
  "spaceComplexity": "string" (for coding questions),
  "evaluationCriteria": ["string"],
  "sampleAnswer": "string",
  "practiceQuestion": {
    "question": "string",
    "answer": "string"
  } (optional),
  "hints": ["string"] (optional),
  "resources": ["string"] (optional)
}

Return the response in the following JSON format:
{
  "questions": [
    // Array of question objects as defined above
  ],
  "metadata": {
    "topics": ["string"],
    "questionCount": number,
    "timeLimit": number,
    "experienceLevel": "string",
    "adaptiveMode": boolean
  }
}`;
};

export async function generateTest(formData: TestFormData) {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    const prompt = generatePrompt(formData);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Validate and clean the response text
    let cleanText = text.trim();

    // Try to extract JSON from markdown code blocks
    const jsonMatch = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      cleanText = jsonMatch[1].trim();
    }

    try {
      const testData = JSON.parse(cleanText);

      // Validate required fields
      if (!testData.questions || !Array.isArray(testData.questions) || testData.questions.length === 0) {
        throw new Error('Invalid test data: missing or empty questions array');
      }

      if (!testData.metadata) {
        testData.metadata = {};
      }

      // Process questions to ensure consistent structure
      const questions = testData.questions.map((q: any, index: number) => {
        // Allow either correctAnswer or sampleAnswer (common for coding questions)
        if (!q.question || (!q.correctAnswer && !q.sampleAnswer)) {
          throw new Error(`Invalid question data at index ${index}: missing required fields (question or answer)`);
        }

        return {
          id: q.id || `q${index + 1}_${Math.random().toString(36).substr(2, 9)}`,
          type: q.type || 'multiple-choice',
          topic: q.topic || formData.topics[0],
          difficulty: q.difficulty || formData.difficulty,
          question: q.question,
          options: Array.isArray(q.options) ? q.options : [],
          correctAnswer: q.correctAnswer || q.sampleAnswer, // Use sampleAnswer as fallback
          explanation: formData.includeExplanations ? q.explanation : undefined,
          timeEstimate: typeof q.timeEstimate === 'number' ? q.timeEstimate : 5,
          points: typeof q.points === 'number' ? q.points : 1,
          language: q.language || 'javascript',
          starterCode: q.starterCode || '',
          testCases: Array.isArray(q.testCases) ? q.testCases : [],
          timeComplexity: q.timeComplexity || '',
          spaceComplexity: q.spaceComplexity || '',
          evaluationCriteria: Array.isArray(q.evaluationCriteria) ? q.evaluationCriteria : [],
          sampleAnswer: q.sampleAnswer || '',
          practiceQuestion: formData.includePracticeQuestions && q.practiceQuestion ? q.practiceQuestion : undefined,
          hints: formData.includeHints ? (Array.isArray(q.hints) ? q.hints : []) : undefined,
          resources: formData.includeResources ? (Array.isArray(q.resources) ? q.resources : []) : undefined
        };
      });

      // Ensure we have the right number of questions
      if (questions.length !== formData.questionCount) {
        console.warn(`Expected ${formData.questionCount} questions but got ${questions.length}`);
      }

      return {
        questions,
        metadata: {
          topics: formData.topics,
          timeLimit: formData.timeLimit,
          questionCount: questions.length,
          experienceLevel: formData.experienceLevel,
          difficultyProgression: formData.difficultyProgression,
          adaptiveMode: formData.adaptiveMode
        }
      };
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Raw response:', text);
      throw new Error('Failed to generate valid test data. Please try again.');
    }
  } catch (error) {
    console.error('Error generating test:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate test: ${error.message}`);
    }
    throw new Error('Failed to generate test. Please try again.');
  }
}

export async function gradeCode(
  code: string,
  language: string,
  question: string,
  testCases: Array<{ input: string; expectedOutput: string }>
) {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    const prompt = `
      Act as a code grader. Evaluate the following code solution for correctness, efficiency, and style.
      
      Question: ${question}
      Language: ${language}
      
      Code Solution:
      \`\`\`${language}
      ${code}
      \`\`\`
      
      Test Cases to Verify Against:
      ${JSON.stringify(testCases, null, 2)}
      
      Please analyze the code and return a JSON response with the following structure:
      {
        "passed": boolean, // true if logic is correct and handles edge cases
        "score": number, // 0-100
        "feedback": "string", // Constructive feedback
        "efficiency": "string", // Time/Space complexity analysis
        "improvements": ["string"], // List of potential improvements
        "testCaseResults": [
          {
            "input": "string",
            "expected": "string",
            "actual": "string", // Predicted output based on code logic
            "passed": boolean
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let cleanText = text.trim();
    // Try to extract JSON from markdown code blocks
    const jsonMatch = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      cleanText = jsonMatch[1].trim();
    }

    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Error grading code:', error);
    throw new Error('Failed to grade code. Please try again.');
  }
}
