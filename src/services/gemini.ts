"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
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

interface InterviewQuestion {
  question: string;
  context: string;
  exampleAnswer: string;
  keyPoints: string[];
  tips: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

class GeminiService {
  private model = genAI?.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  private async withRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
    await geminiRateLimiter(); // Apply rate limiting
    
    try {
      if (!this.model) {
        throw new Error('Gemini model not initialized');
      }
      return await fn();
    } catch (error: any) {
      if (retries <= 0) {
        console.error('Max retries reached:', error);
        throw error;
      }

      // Handle rate limiting (429) or server errors (5xx)
      if (error.status === 429 || (error.status >= 500 && error.status < 600)) {
        const delayMs = RETRY_DELAY * (MAX_RETRIES - retries + 1);
        console.log(`Rate limited. Retrying in ${delayMs}ms...`);
        await delay(delayMs);
        return this.withRetry(fn, retries - 1);
      }

      // For other errors, check if it's an authentication error
      if (error.message?.includes('API key not valid') || 
          error.message?.includes('authentication')) {
        throw new Error('Authentication failed. Please check your API key.');
      }

      throw error;
    }
  }

  async getNextQuestion(role: string, previousQuestions: string[]): Promise<InterviewQuestion> {
    const recentQuestions = previousQuestions.slice(-7);
    const prompt = `Generate a detailed and unique interview question for a ${role} position.\nDo NOT repeat or closely resemble any of these previous questions: ${recentQuestions.join('; ')}\nIf you cannot generate a new, unique question, return a JSON object with { \"question\": null }.\nReturn in JSON format:\n{\n  \"question\": \"the interview question\",\n  \"context\": \"why this question is asked\",\n  \"exampleAnswer\": \"a model answer demonstrating best practices\",\n  \"keyPoints\": [\"key points to include in answer\"],\n  \"tips\": [\"specific tips for answering\"],\n  \"difficulty\": \"medium\"\n}`;

    return this.withRetry(async () => {
      try {
        const result = await this.model!.generateContent(prompt);
        const response = await result.response;
        let responseText = response.text();
        responseText = responseText.replace(/```json|```/gi, '').trim();
        const data = JSON.parse(responseText);
        
        if (!data.question) {
          throw new Error("No unique question generated");
        }
        return data;
      } catch (error) {
        console.error('Error in getNextQuestion:', error);
        return this.getDefaultQuestion();
      }
    });
  }

  async demonstrateAnswer(question: string, role: string): Promise<string> {
    const prompt = `As an expert interviewer, demonstrate how to answer this interview question for a ${role} position:
    "${question}"
    
    Provide a natural, conversational response that:
    1. Uses the STAR method where applicable
    2. Includes specific examples
    3. Demonstrates key skills
    4. Shows enthusiasm and confidence
    
    Keep the response concise but impactful.`;

    return this.withRetry(async () => {
      try {
        const result = await this.model!.generateContent(prompt);
        const response = await result.response;
        return response.text();
      } catch (error) {
        console.error('Error in demonstrateAnswer:', error);
        return "Let me demonstrate a strong response to this question...";
      }
    });
  }

  private getDefaultQuestion(): InterviewQuestion {
    return {
      question: "Can you describe a challenging project you've worked on?",
      context: "This question assesses problem-solving and project management skills",
      exampleAnswer: "In my previous role, I led a team of five developers to rebuild our company's legacy payment system. The main challenge was ensuring zero downtime during the migration. I implemented a phased rollout strategy and conducted extensive testing, resulting in a successful migration with 99.9% uptime.",
      keyPoints: [
        "Specific project example",
        "Clear challenge identification",
        "Actions taken",
        "Measurable results"
      ],
      tips: [
        "Use the STAR method",
        "Focus on your direct contributions",
        "Include metrics where possible",
        "Keep it concise but detailed"
      ],
      difficulty: "medium"
    };
  }

  async getResponse(prompt: string): Promise<string> {
    return this.withRetry(async () => {
      try {
        const result = await this.model!.generateContent(prompt);
        const response = await result.response;
        return response.text();
      } catch (error) {
        console.error('Error in getResponse:', error);
        throw new Error('Failed to get response from AI service');
      }
    });
  }
}

export const geminiService = new GeminiService();
