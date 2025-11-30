import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiService {
  private model: any;

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
  }

  async analyzeInterviewAnswer(
    question: string,
    answer: string,
    visualMetrics?: {
      averageFaceCount: number;
      postureIssues: string[];
      expressions: string[];
    }
  ) {
    try {
      let visualContext = "";
      if (visualMetrics) {
        visualContext = `
Visual Analysis Data:
- Average Face Count: ${visualMetrics.averageFaceCount.toFixed(1)} (Should be close to 1)
- Posture Issues Detected: ${visualMetrics.postureIssues.length > 0 ? visualMetrics.postureIssues.join(', ') : "None (Good Posture)"}
- Dominant Expressions: ${visualMetrics.expressions.join(', ')}

Incorporate this visual data into your feedback. If there were posture issues or multiple faces, mention them in "keyImprovements". If expressions were positive, mention that in "analysis".
`;
      }

      const prompt = `You are an expert interview coach. Analyze this interview response and provide detailed feedback.
${visualContext}
Question: "${question}"
Answer: "${answer}"

CRITICAL: If the answer is empty, irrelevant, or contains only background noise/short phrases (< 5 words), return a JSON with score: 0, communicationScore: 0, bodyLanguageScore: 0, and analysis stating 'Insufficient data provided'.

Respond in this exact JSON format (do not include any other text):
{
  "analysis": "A brief but specific analysis of the answer's strengths and areas for improvement. Include comments on body language if data is provided.",
  "improvedAnswer": "A polished, professional version of the answer that maintains the candidate's key points while improving structure and clarity",
  "modelAnswer": "A model answer that demonstrates the ideal way to respond to this question",
  "score": <number between 0-100>,
  "keyImprovements": [
    "<specific improvement point 1>",
    "<specific improvement point 2>",
    "<specific improvement point 3>"
  ],
  "communicationScore": <number between 0-100>,
  "clarity": <number between 0-100>,
  "confidence": <number between 0-100>,
  "bodyLanguageScore": <number between 0-100>
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      try {
        // Clean the response text to ensure it's valid JSON
        const cleanText = text.replace(/^```json\n?|\n?```$/g, '').trim();
        const parsedResponse = JSON.parse(cleanText);

        // Validate the response has all required fields
        if (!parsedResponse.analysis || !parsedResponse.improvedAnswer || !parsedResponse.modelAnswer) {
          throw new Error('Invalid response format');
        }

        return {
          ...parsedResponse,
          success: true
        };
      } catch (e) {
        console.error('Failed to parse Gemini response:', e);
        // Provide a more helpful default response
        return {
          analysis: "We couldn't analyze your response properly. This might be because the answer was too short or unclear. Please try again with a more detailed response.",
          improvedAnswer: "N/A",
          modelAnswer: "N/A",
          score: 0,
          keyImprovements: [
            "Ensure your answer is audible and clear",
            "Provide more detail in your response",
            "Check your microphone settings"
          ],
          communicationScore: 0,
          clarity: 0,
          confidence: 0,
          bodyLanguageScore: 0,
          success: true
        };
      }
    } catch (error) {
      console.error('Gemini analysis error:', error);
      return {
        analysis: "Error analyzing the response. Please try again.",
        improvedAnswer: "Error generating improved answer. Please try again.",
        modelAnswer: "Error generating model answer. Please try again.",
        score: 0,
        keyImprovements: [
          "Structure your answer with a clear introduction, relevant experience, and future goals",
          "Polish your delivery by avoiding fragmented sentences and maintaining better flow",
          "Highlight specific achievements and skills that make you stand out"
        ],
        communicationScore: 0,
        clarity: 0,
        confidence: 0,
        bodyLanguageScore: 0,
        success: false
      };
    }
  }

  async generateContent(prompt: string) {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini content generation error:', error);
      throw error;
    }
  }

  async generatePersonalizedQuestions(resumeText: string, goal: string): Promise<any[]> {
    try {
      const prompt = `
        You are an expert technical interviewer.
        Candidate Goal: ${goal}
        Resume Content:
        ${resumeText.substring(0, 3000)} (truncated)

        Generate 5 personalized interview questions based on the candidate's resume and goal.
        The questions should assess their experience, technical skills, and behavioral traits relevant to the goal.
        
        Return ONLY a JSON array of objects with this format:
        [
          {
            "id": "p1",
            "text": "Question text here",
            "category": "Experience" | "Technical" | "Behavioral",
            "difficulty": "Easy" | "Medium" | "Hard"
          }
        ]
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const cleanText = text.replace(/^```json\n?|\n?```$/g, '').trim();
      return JSON.parse(cleanText);
    } catch (error) {
      console.error('Error generating personalized questions:', error);
      return [
        {
          id: 'fallback1',
          text: `Tell me about your experience relevant to ${goal}.`,
          category: 'Experience',
          difficulty: 'Easy'
        }
      ];
    }
  }

  async generateNextQuestion(
    resumeText: string,
    goal: string,
    previousQuestion?: string,
    previousAnswer?: string,
    context: 'initial' | 'follow-up' | 'new-topic' = 'initial',
    targetCategory?: 'Technical' | 'Behavioral' | 'Mixed'
  ): Promise<any> {
    try {
      let prompt = '';

      if (context === 'initial') {
        prompt = `
          You are an expert interviewer.
          Candidate Goal: ${goal}
          Resume Content: ${resumeText.substring(0, 2000)}...
          
          Generate the FIRST interview question to start the session.
          It should be an ice-breaker or an introductory question about their background relevant to the goal.
          
          Return ONLY a JSON object:
          {
            "id": "q1",
            "text": "Question text",
            "category": "Introduction",
            "difficulty": "Easy"
          }
        `;
      } else if (context === 'follow-up' && previousQuestion && previousAnswer) {
        prompt = `
          You are an expert interviewer.
          Goal: ${goal}
          Previous Question: "${previousQuestion}"
          Candidate Answer: "${previousAnswer}"
          
          Generate a FOLLOW-UP question based on the candidate's answer.
          Dig deeper into what they said, ask for clarification, or challenge an assumption.
          
          Return ONLY a JSON object:
          {
            "id": "followup_${Date.now()}",
            "text": "Question text",
            "category": "Follow-up",
            "difficulty": "Hard"
          }
        `;
      } else {
        // New Topic - Use targetCategory if provided
        const categoryPrompt = targetCategory && targetCategory !== 'Mixed'
          ? `The question MUST be from the "${targetCategory}" category.`
          : `The question can be either Technical or Behavioral.`;

        prompt = `
          You are an expert interviewer.
          Goal: ${goal}
          Resume: ${resumeText.substring(0, 2000)}...
          Previous Question: "${previousQuestion}"
          
          Generate a NEW interview question on a different topic relevant to the goal.
          ${categoryPrompt}
          
          Return ONLY a JSON object:
          {
            "id": "q_${Date.now()}",
            "text": "Question text",
            "category": "${targetCategory || 'Technical'}",
            "difficulty": "Medium"
          }
        `;
      }

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const cleanText = text.replace(/^```json\n?|\n?```$/g, '').trim();
      return JSON.parse(cleanText);
    } catch (error) {
      console.error('Error generating next question:', error);
      return {
        id: `fallback_${Date.now()}`,
        text: "Could you elaborate on your most recent project experience?",
        category: targetCategory || "Experience",
        difficulty: "Medium"
      };
    }
  }
}

export const geminiService = new GeminiService();
