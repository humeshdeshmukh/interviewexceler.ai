import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export interface AptitudeQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  timeEstimate: number; // in seconds
}

export interface PersonalizedTest {
  questions: AptitudeQuestion[];
  totalTime: number;
  difficulty: string;
  focusAreas: string[];
}

export const generatePersonalizedTest = async (
  userLevel: string,
  preferences: string[],
  previousPerformance?: {
    strongAreas: string[];
    weakAreas: string[];
  }
): Promise<PersonalizedTest> => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  const prompt = `Generate a personalized aptitude test based on the following criteria:
    User Level: ${userLevel}
    Preferred Topics: ${preferences.join(", ")}
    ${previousPerformance ? `
    Strong Areas: ${previousPerformance.strongAreas.join(", ")}
    Weak Areas: ${previousPerformance.weakAreas.join(", ")}
    ` : ""}
    
    Generate 5 questions with varying difficulty levels. For each question, provide:
    1. Question text
    2. Multiple choice options (4 options)
    3. Correct answer
    4. Detailed explanation
    5. Difficulty level
    6. Category/topic
    7. Estimated time to solve (in seconds)

    Format the response as a JSON object matching the PersonalizedTest interface.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const testData = JSON.parse(response.text());
    return testData as PersonalizedTest;
  } catch (error) {
    console.error("Error generating test:", error);
    throw new Error("Failed to generate personalized test");
  }
};

export const generateFeedback = async (
  userAnswer: string,
  question: AptitudeQuestion,
  timeTaken: number
): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  const prompt = `Analyze this aptitude question response:
    Question: ${question.question}
    Correct Answer: ${question.correctAnswer}
    User's Answer: ${userAnswer}
    Time Taken: ${timeTaken} seconds
    Expected Time: ${question.timeEstimate} seconds

    Provide detailed feedback including:
    1. Whether the answer is correct
    2. Where the user might have gone wrong (if applicable)
    3. Tips for improvement
    4. Time management suggestions
    Keep the response concise but informative.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating feedback:", error);
    throw new Error("Failed to generate feedback");
  }
};
