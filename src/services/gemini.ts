"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface InterviewQuestion {
  question: string;
  context: string;
  exampleAnswer: string;
  keyPoints: string[];
  tips: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

class GeminiService {
  private model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  async getNextQuestion(role: string, previousQuestions: string[]): Promise<InterviewQuestion> {
    // Only send the last 7 previous questions to Gemini
    const recentQuestions = previousQuestions.slice(-7);
    const prompt = `Generate a detailed and unique interview question for a ${role} position.\nDo NOT repeat or closely resemble any of these previous questions: ${recentQuestions.join('; ')}\nIf you cannot generate a new, unique question, return a JSON object with { \"question\": null }.\nReturn in JSON format:\n{\n  \"question\": \"the interview question\",\n  \"context\": \"why this question is asked\",\n  \"exampleAnswer\": \"a model answer demonstrating best practices\",\n  \"keyPoints\": [\"key points to include in answer\"],\n  \"tips\": [\"specific tips for answering\"],\n  \"difficulty\": \"medium\"\n}`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      // Sanitize response: remove markdown code block markers and trim whitespace
      let responseText = response.text();
      responseText = responseText.replace(/```json|```/gi, '').trim();
      const data = JSON.parse(responseText);
      if (!data.question) throw new Error("No unique question generated");
      return data;
    } catch (error) {
      console.error('Error generating question:', error);
      return this.getDefaultQuestion();
    }
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

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      return "Let me demonstrate a strong response to this question...";
    }
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
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error getting response from Gemini:', error);
      throw new Error('Failed to get response from AI service');
    }
  }

  // ... (keep other existing methods)
}

export const geminiService = new GeminiService();
