'use client';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export interface ResumeData {
  fullName: string;
  currentRole: string;
  experience: {
    company: string;
    role: string;
    duration: string;
    highlights: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  skills: string[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
  }[];
}

export interface InterviewQuestion {
  id: string;
  type: 'behavioral' | 'technical' | 'experience' | 'project' | 'introduction' | 'closing';
  question: string;
  context?: string;
  expectedPoints?: string[];
  followUps?: {
    condition: string;
    question: string;
  }[];
}

export interface InterviewSession {
  id: string;
  candidateName: string;
  currentRole: string;
  targetRole?: string;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  feedback: {
    questionId: string;
    strengths: string[];
    improvements: string[];
    rating: number;
  }[];
}

export async function parseResume(resumeText: string): Promise<ResumeData> {
  try {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    // Create a more structured prompt that forces JSON output
    const prompt = `You are a professional resume parser. Your task is to extract key information from the resume and return it in a specific JSON format. Do not include any explanations or text outside of the JSON structure.

Input Resume:
${resumeText}

Instructions:
1. Extract the following information from the resume
2. Format it as a valid JSON object
3. Return ONLY the JSON object, no other text
4. Use empty strings or arrays for missing information
5. Ensure all required fields are present

Required JSON Structure:
{
  "fullName": "string (required)",
  "currentRole": "string (required)",
  "experience": [
    {
      "company": "string",
      "role": "string",
      "duration": "string",
      "highlights": ["string"]
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "year": "string"
    }
  ],
  "skills": ["string"],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": ["string"]
    }
  ]
}

Response must:
1. Be valid JSON
2. Include all fields
3. Contain no text outside JSON
4. Use proper JSON syntax
5. Have no trailing comma
6. Use double quotes for strings`;

    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    console.log('Received response from Gemini API');
    
    const response = await result.response;
    const text = response.text();
    
    // Try to find JSON in the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response:', text);
      throw new Error('Invalid response format from AI');
    }

    const jsonStr = jsonMatch[0];
    
    // Validate the response is proper JSON
    try {
      const parsedData = JSON.parse(jsonStr);
      
      // Validate required fields
      if (!parsedData.fullName?.trim()) {
        throw new Error('Could not find name in resume');
      }
      if (!parsedData.currentRole?.trim()) {
        throw new Error('Could not find current role in resume');
      }

      // Ensure arrays are present
      parsedData.experience = Array.isArray(parsedData.experience) ? parsedData.experience : [];
      parsedData.education = Array.isArray(parsedData.education) ? parsedData.education : [];
      parsedData.skills = Array.isArray(parsedData.skills) ? parsedData.skills : [];
      parsedData.projects = Array.isArray(parsedData.projects) ? parsedData.projects : [];

      // Clean up any null or undefined values
      parsedData.experience = parsedData.experience.map(exp => ({
        company: exp.company || '',
        role: exp.role || '',
        duration: exp.duration || '',
        highlights: Array.isArray(exp.highlights) ? exp.highlights.filter(Boolean) : []
      }));

      parsedData.education = parsedData.education.map(edu => ({
        degree: edu.degree || '',
        institution: edu.institution || '',
        year: edu.year || ''
      }));

      parsedData.projects = parsedData.projects.map(proj => ({
        name: proj.name || '',
        description: proj.description || '',
        technologies: Array.isArray(proj.technologies) ? proj.technologies.filter(Boolean) : []
      }));

      return parsedData;
    } catch (jsonError) {
      console.error('Failed to parse or validate JSON:', jsonError);
      console.error('Raw JSON string:', jsonStr);
      throw new Error('Failed to extract information from resume. Please ensure your resume contains basic information like name and current role.');
    }
  } catch (error) {
    console.error('Resume parsing error:', error);
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('API configuration error. Please contact support.');
      } else if (error.message.includes('Could not find')) {
        throw new Error(error.message + '. Please ensure this information is clearly stated in your resume.');
      }
      throw new Error(`Failed to parse resume: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while parsing the resume.');
  }
}

export async function generateInterviewQuestions(resumeData: ResumeData, targetRole?: string): Promise<InterviewQuestion[]> {
  try {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    // Create a structured prompt for generating interview questions
    const prompt = `You are an expert technical interviewer. Generate a series of interview questions based on the candidate's resume and ${targetRole ? `target role: ${targetRole}` : 'current role'}. 

Resume Information:
${JSON.stringify(resumeData, null, 2)}

Instructions:
1. Generate a structured interview flow with questions
2. Include a mix of question types
3. Return ONLY the JSON array of questions
4. Each question should have proper follow-ups
5. Questions should be relevant to the candidate's experience

Required JSON Structure for Questions Array:
[
  {
    "id": "string (unique identifier)",
    "type": "introduction" | "behavioral" | "technical" | "experience" | "project" | "closing",
    "question": "string (the actual question)",
    "context": "string (background or setup for the question)",
    "expectedPoints": ["string (key points to look for in answer)"],
    "followUps": [
      {
        "condition": "string (when to ask this follow-up)",
        "question": "string (the follow-up question)"
      }
    ]
  }
]

Requirements:
1. First question must be introduction type
2. Include technical questions based on skills
3. Include questions about specific projects
4. End with closing type question
5. Generate at least 8 questions
6. Return valid JSON array
7. Use double quotes for strings
8. No trailing commas`;

    console.log('Sending question generation request to Gemini API...');
    const result = await model.generateContent(prompt);
    console.log('Received response from Gemini API');
    
    const response = await result.response;
    const text = response.text();
    
    // Try to find JSON array in the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('No JSON array found in response:', text);
      throw new Error('Invalid question format from AI');
    }

    const jsonStr = jsonMatch[0];
    
    // Parse and validate questions
    try {
      const questions: InterviewQuestion[] = JSON.parse(jsonStr);
      
      // Validate questions array
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('No valid questions generated');
      }

      // Validate each question
      questions.forEach((q, index) => {
        if (!q.id) q.id = `q${index + 1}`;
        if (!q.type) throw new Error(`Question ${index + 1} missing type`);
        if (!q.question) throw new Error(`Question ${index + 1} missing question text`);
        if (!Array.isArray(q.expectedPoints)) q.expectedPoints = [];
        if (!Array.isArray(q.followUps)) q.followUps = [];
      });

      // Ensure first question is introduction
      if (questions[0].type !== 'introduction') {
        questions.unshift({
          id: 'q0',
          type: 'introduction',
          question: 'Please tell me about yourself and your background.',
          context: 'Opening question to understand candidate background',
          expectedPoints: [
            'Current role and responsibilities',
            'Relevant experience',
            'Key achievements',
            'Career goals'
          ],
          followUps: [
            {
              condition: 'If candidate doesn\'t mention current role',
              question: 'Could you tell me more about your current role and responsibilities?'
            }
          ]
        });
      }

      console.log('Successfully generated and validated questions');
      return questions;
    } catch (jsonError) {
      console.error('Failed to parse or validate questions:', jsonError);
      console.error('Raw JSON string:', jsonStr);
      throw new Error('Failed to generate valid interview questions');
    }
  } catch (error) {
    console.error('Question generation error:', error);
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('API configuration error. Please contact support.');
      }
      throw new Error(`Failed to generate questions: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while generating questions.');
  }
}

export async function generateFeedback(
  question: InterviewQuestion,
  answer: string
): Promise<{ strengths: string[]; improvements: string[]; rating: number }> {
  try {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error('API key not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const prompt = `As an expert interviewer, evaluate this interview response.

Question Type: ${question.type}
Question: ${question.question}
Expected Points: ${question.expectedPoints?.join(', ')}
Candidate's Answer: ${answer}

Provide feedback in the following JSON format:
{
  "strengths": ["string"],
  "improvements": ["string"],
  "rating": number (1-5)
}

Requirements:
1. List 2-3 specific strengths
2. List 1-2 areas for improvement
3. Rate from 1-5 (5 being excellent)
4. Be constructive and specific
5. Consider the question type and expected points
6. Return ONLY valid JSON`;

    console.log('Requesting feedback from AI...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid feedback format');
    }

    const feedback = JSON.parse(jsonMatch[0]);

    // Validate feedback structure
    if (!Array.isArray(feedback.strengths) || !Array.isArray(feedback.improvements) || typeof feedback.rating !== 'number') {
      throw new Error('Invalid feedback structure');
    }

    // Ensure arrays are not empty and rating is valid
    if (feedback.strengths.length === 0) {
      feedback.strengths = ['Good attempt at answering the question'];
    }
    if (feedback.improvements.length === 0) {
      feedback.improvements = ['Try to provide more specific examples'];
    }
    if (feedback.rating < 1 || feedback.rating > 5) {
      feedback.rating = 3;
    }

    return feedback;
  } catch (error) {
    console.error('Error generating feedback:', error);
    // Return default feedback instead of throwing
    return {
      strengths: ['You provided a response to the question'],
      improvements: ['Consider providing more detailed examples'],
      rating: 3
    };
  }
}

export async function generateFollowUpResponse(
  question: InterviewQuestion,
  previousAnswer: string,
  candidateResponse: string
): Promise<{ response: string; nextQuestion?: string }> {
  try {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error('API key not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const prompt = `As an expert interviewer, generate a natural follow-up response to the candidate's answer.

Context:
Question Type: ${question.type}
Current Question: ${question.question}
Expected Points: ${question.expectedPoints?.join(', ')}
Candidate's Answer: ${candidateResponse}

Instructions:
1. Acknowledge the candidate's response
2. Provide a natural follow-up comment or question
3. Keep the conversation flowing professionally
4. Be encouraging but maintain professional distance
5. If the answer was incomplete, ask for clarification
6. If the answer was good, probe deeper or move to next topic

Return response in JSON format:
{
  "response": "string (your response to candidate)",
  "nextQuestion": "string (optional: next question if ready to move on)"
}`;

    console.log('Requesting follow-up from AI...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return {
        response: "Thank you for your response. Let's move on to the next question.",
        nextQuestion: undefined
      };
    }

    const followUp = JSON.parse(jsonMatch[0]);

    // Validate and clean up response
    if (!followUp.response || typeof followUp.response !== 'string') {
      followUp.response = "Thank you for sharing that. Let's continue with our discussion.";
    }

    // Clean up the response text
    followUp.response = followUp.response
      .replace(/["']/g, '') // Remove quotes
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();

    return followUp;
  } catch (error) {
    console.error('Error generating follow-up:', error);
    // Return a safe default response instead of throwing
    return {
      response: "Thank you for your response. Let's continue with our discussion.",
      nextQuestion: undefined
    };
  }
}
