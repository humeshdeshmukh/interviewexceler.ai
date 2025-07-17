import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export function useGeminiAI() {
  const [error, setError] = useState<string | null>(null);

  const generateResponse = async (
    prompt: string,
    systemPrompt: string = '',
    context: string = ''
  ): Promise<string> => {
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      const fullPrompt = `${systemPrompt}\n\nContext:\n${context}\n\nUser: ${prompt}`;
      
      const result = await model.generateContent(fullPrompt);
      const response = result.response;
      const text = response.text();
      
      return text;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    generateResponse,
    error,
  };
}
