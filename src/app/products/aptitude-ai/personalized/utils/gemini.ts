import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function generateQuestion(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating question:', error);
    throw error;
  }
}

export async function generatePersonalizedFeedback(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating feedback:', error);
    throw error;
  }
}

export async function generateHint(question: string): Promise<string> {
  try {
    const prompt = `For this question: "${question}"
    
    Generate a helpful hint that guides the user towards the solution without giving it away.
    The hint should:
    1. Point out key information to focus on
    2. Suggest a problem-solving approach
    3. Be encouraging and supportive
    4. Not reveal the answer`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating hint:', error);
    throw error;
  }
}
