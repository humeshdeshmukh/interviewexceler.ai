import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export function useGeminiAI() {
  const generateQuestion = async (topic: string, difficulty: string, previousPerformance?: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      
      const prompt = `Generate a ${difficulty} level aptitude question for ${topic}.
      Format the response as a JSON object with the following structure:
      {
        "question": "the question text",
        "options": ["option1", "option2", "option3", "option4"],
        "correctAnswer": "the correct option",
        "explanation": "detailed explanation of the solution",
        "difficulty": "current difficulty level",
        "timeEstimate": seconds to solve,
        "topic": "specific subtopic",
        "skillsTested": ["skill1", "skill2"]
      }
      ${previousPerformance ? `Consider the user's previous performance: ${previousPerformance}` : ''}
      Make the question challenging but solvable, with clear instructions and realistic context.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error('Error generating question:', error);
      throw error;
    }
  };

  const analyzePerfomance = async (questions: any[], answers: any[]) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      
      const prompt = `Analyze the user's performance on these aptitude questions:
      Questions and Answers: ${JSON.stringify({ questions, answers })}
      
      Provide analysis in JSON format:
      {
        "overallScore": "percentage",
        "strengths": ["strength1", "strength2"],
        "weaknesses": ["weakness1", "weakness2"],
        "recommendedTopics": ["topic1", "topic2"],
        "recommendedDifficulty": "recommended difficulty level",
        "detailedFeedback": "specific feedback on performance"
      }`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error('Error analyzing performance:', error);
      throw error;
    }
  };

  const generatePersonalizedFeedback = async (
    question: string,
    userAnswer: string,
    correctAnswer: string,
    timeTaken: number,
    difficulty: string
  ) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      
      const prompt = `Provide personalized feedback for this aptitude question:
      Question: ${question}
      User's Answer: ${userAnswer}
      Correct Answer: ${correctAnswer}
      Time Taken: ${timeTaken} seconds
      Difficulty Level: ${difficulty}
      
      Format the response as a JSON object:
      {
        "isCorrect": boolean,
        "timingFeedback": "feedback about solving speed",
        "conceptualFeedback": "feedback about understanding",
        "improvementTips": ["tip1", "tip2"],
        "relatedConcepts": ["concept1", "concept2"],
        "nextSteps": "recommended next steps"
      }`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error('Error generating feedback:', error);
      throw error;
    }
  };

  return {
    generateQuestion,
    analyzePerfomance,
    generatePersonalizedFeedback,
  };
}
