import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const settings = await req.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Create a prompt based on settings
    const prompt = `Generate a ${settings.difficulty} difficulty assessment with ${settings.questionsCount} questions for these topics: ${settings.topics.join(', ')}.
    The assessment should be completed in ${settings.duration} minutes.
    
    For each question:
    1. Include a clear problem statement
    2. Provide multiple choice options (A, B, C, D)
    3. Mark the correct answer
    4. ${settings.includeExplanations ? 'Include a detailed solution explanation' : 'Skip the explanation'}
    
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
    
    ${settings.adaptiveDifficulty ? 'Progressively increase the difficulty of questions based on the topic.' : ''}`;

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

    return NextResponse.json({
      questions,
      metadata: {
        totalQuestions: questions.length,
        duration: settings.duration,
        topics: settings.topics,
        difficulty: settings.difficulty,
        adaptiveDifficulty: settings.adaptiveDifficulty,
      }
    });
  } catch (error) {
    console.error('Error generating assessment:', error);
    return NextResponse.json(
      { error: 'Failed to generate assessment questions' },
      { status: 500 }
    );
  }
}
