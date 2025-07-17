import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with error handling
let genAI: GoogleGenerativeAI | null = null;

try {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} catch (error) {
  console.error('Failed to initialize Gemini AI:', error);
}

export async function generateQuestions(params: {
  topics: string[];
  difficulty: string;
  questionsCount: number;
  includeExplanations: boolean;
}) {
  try {
    if (!genAI) {
      throw new Error('Gemini AI not initialized');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `Generate ${params.questionsCount} ${params.difficulty} difficulty practice questions for these topics: ${params.topics.join(', ')}.
    
    For each question:
    1. Include a clear problem statement
    2. Provide multiple choice options (A, B, C, D)
    3. Mark the correct answer
    4. ${params.includeExplanations ? 'Include a detailed solution explanation' : 'Skip the explanation'}
    
    Format each question as a JSON object with these properties:
    {
      "id": "unique number",
      "topic": "topic name",
      "difficulty": "easy/medium/hard",
      "question": "question text",
      "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
      "correctAnswer": "A/B/C/D",
      "explanation": "detailed explanation"
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response and format it
    const questions = text
      .split('\n')
      .filter(line => line.trim().startsWith('{'))
      .map(jsonStr => {
        try {
          return JSON.parse(jsonStr);
        } catch (e) {
          console.error('Failed to parse question:', e);
          return null;
        }
      })
      .filter(q => q !== null);

    return questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}

export async function generateAssessment(params: {
  topics: string[];
  difficulty: string;
  questionsCount: number;
  duration: number;
  adaptiveDifficulty: boolean;
}) {
  try {
    if (!genAI) {
      throw new Error('Gemini AI not initialized');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `Generate a ${params.difficulty} difficulty assessment with ${params.questionsCount} questions for these topics: ${params.topics.join(', ')}.
    The assessment should be completed in ${params.duration} minutes.
    
    For each question:
    1. Include a clear problem statement
    2. Provide multiple choice options (A, B, C, D)
    3. Mark the correct answer
    4. Include a detailed solution explanation
    
    Format each question as a JSON object with these properties:
    {
      "id": "unique number",
      "topic": "topic name",
      "difficulty": "easy/medium/hard",
      "question": "question text",
      "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
      "correctAnswer": "A/B/C/D",
      "explanation": "detailed explanation",
      "estimatedTime": "time in minutes"
    }
    
    ${params.adaptiveDifficulty ? 'Progressively increase the difficulty of questions based on the topic.' : ''}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response and format it
    const questions = text
      .split('\n')
      .filter(line => line.trim().startsWith('{'))
      .map(jsonStr => {
        try {
          return JSON.parse(jsonStr);
        } catch (e) {
          console.error('Failed to parse question:', e);
          return null;
        }
      })
      .filter(q => q !== null);

    return {
      questions,
      metadata: {
        totalQuestions: questions.length,
        duration: params.duration,
        topics: params.topics,
        difficulty: params.difficulty,
        adaptiveDifficulty: params.adaptiveDifficulty,
      }
    };
  } catch (error) {
    console.error('Error generating assessment:', error);
    throw error;
  }
}
