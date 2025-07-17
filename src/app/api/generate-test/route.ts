import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const settings = await req.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Create a prompt based on settings
    const prompt = `Generate ${settings.questionsPerTopic} ${settings.difficulty} difficulty practice questions for each of these topics: ${settings.topics.join(', ')}.
    For each question:
    1. Include a clear problem statement
    2. Provide multiple choice options (A, B, C, D)
    3. Mark the correct answer
    4. ${settings.showSolutions ? 'Include a detailed solution explanation' : 'Skip the solution'}
    5. ${settings.showHints ? 'Include a helpful hint' : 'Skip the hint'}
    
    Format each question as a JSON object with these properties:
    {
      "topic": "topic name",
      "question": "question text",
      "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
      "correctAnswer": "A/B/C/D",
      "solution": "detailed solution",
      "hint": "helpful hint"
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

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error generating test:', error);
    return NextResponse.json(
      { error: 'Failed to generate test questions' },
      { status: 500 }
    );
  }
}
