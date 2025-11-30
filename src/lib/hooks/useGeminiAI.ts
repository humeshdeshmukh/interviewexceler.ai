import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { geminiRateLimiter } from '@/utils/rateLimiter';

// Add retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Initialize with better error handling
let genAI: GoogleGenerativeAI | null = null;

try {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }
  genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
} catch (error) {
  console.error('Failed to initialize Gemini:', error);
  throw error;
}

// Add delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useGeminiAI() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const withRetry = async <T,>(
    fn: () => Promise<T>,
    retries = MAX_RETRIES
  ): Promise<T> => {
    await geminiRateLimiter();
    
    try {
      setIsLoading(true);
      setError(null);
      return await fn();
    } catch (error: any) {
      if (retries <= 0) {
        const errorMsg = error.message || 'Max retries reached';
        setError(errorMsg);
        throw new Error(errorMsg);
      }

      // Handle rate limiting (429) or server errors (5xx)
      if (error.status === 429 || (error.status >= 500 && error.status < 600)) {
        const delayMs = RETRY_DELAY * (MAX_RETRIES - retries + 1);
        console.log(`Rate limited. Retrying in ${delayMs}ms...`);
        await delay(delayMs);
        return withRetry(fn, retries - 1);
      }

      // Handle authentication errors
      if (error.message?.includes('API key not valid') || 
          error.message?.includes('authentication')) {
        const authError = 'Authentication failed. Please check your API key.';
        setError(authError);
        throw new Error(authError);
      }

      const errorMsg = error.message || 'An unknown error occurred';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = async (
    prompt: string,
    systemPrompt: string = '',
    context: string = ''
  ): Promise<string> => {
    if (!genAI) {
      const error = 'Gemini AI is not properly initialized';
      setError(error);
      throw new Error(error);
    }

    return withRetry(async () => {
      try {
        const model = genAI!.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
        const fullPrompt = `${systemPrompt}\n\nContext:\n${context}\n\nUser: ${prompt}`;
        
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while generating response';
        setError(errorMessage);
        throw err;
      }
    });
  };

  return {
    generateResponse,
    error,
    isLoading,
    clearError: () => setError(null)
  };
}
