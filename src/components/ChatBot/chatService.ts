import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function generateChatResponse(message: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    // Add context to make responses more relevant to your application
    const prompt = `As an AI assistant for InterviewExceler.Ai, help the user with their question: ${message}
    Focus on providing helpful responses related to interview preparation, aptitude tests, and career guidance.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating chat response:', error);
    return 'I apologize, but I encountered an error. Please try again later.';
  }
}
