import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiRateLimiter } from '@/utils/rateLimiter';

// Add retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Define interfaces at the top level
export interface ImprovementItem {
  point: string;
  solution: string;
}

export interface Skill {
  name: string;
  proficiency?: string;
  context?: string;
  importance?: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  achievements: string[];
}

export interface ActionItem {
  action: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ATSScore {
  score: number;
  feedback: string;
  improvements: string[];
}

export interface ATSScores {
  overall: ATSScore;
  format: ATSScore;
  keyword: ATSScore;
  relevance: ATSScore;
  readability: ATSScore;
}

export interface AnalysisResult {
  type: string;
  atsScores: ATSScores;
  improvements: {
    critical: ImprovementItem[];
    important: ImprovementItem[];
    recommended: ImprovementItem[];
  };
  skills: {
    technical: Skill[];
    missing: Skill[];
  };
  experience: Experience[];
  actionPlan: {
    immediate: ActionItem[];
    shortTerm: ActionItem[];
    longTerm: ActionItem[];
  };
  marketInsights: {
    trends: string[];
    keywords: { word: string; count: number; importance: string }[];
  };
  rawContent?: string;
}

export interface OptimizationOptions {
  tone: 'professional' | 'creative' | 'technical' | 'executive';
  focus: 'ats' | 'human' | 'balanced';
  targetRole?: string;
  preserveLayout: boolean;
}

export interface OptimizedResume {
  content: string;
  improvedSections: string[];
  changesSummary: string;
}

// Initialize with better error handling
let genAI: GoogleGenerativeAI | null = null;

try {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }
  genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  console.error('Failed to initialize Gemini:', errorMessage);
  // Don't throw here, let the function handle it
}

// Add delay helper
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Initialize the Gemini API with your API key
const getGeminiClient = (): GoogleGenerativeAI => {
  if (!genAI) {
    try {
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        throw new Error('Gemini API key is not configured');
      }
      genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    } catch (e) {
      throw new Error('Gemini client is not properly initialized');
    }
  }
  return genAI!;
};

export async function analyzeCV(cvText: string): Promise<AnalysisResult> {
  try {
    if (!cvText?.trim()) {
      throw new Error('CV text is empty or invalid');
    }

    console.log('Initializing Gemini client...');
    const genAI = getGeminiClient();
    console.log('Getting Gemini model...');
    // Using the requested model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `As an expert CV/Resume analyzer and ATS specialist, provide a comprehensive, professional analysis of the following CV. 
    
    CRITICAL INSTRUCTIONS:
    1. You MUST return the response in valid JSON format ONLY.
    2. Do NOT use markdown formatting (like **bold** or *italic*) in the content strings. Return clean, plain text.
    3. Analyze the SPECIFIC content of the resume. Do not provide generic advice.
    4. Calculate ATS scores based on the actual content quality, formatting (inferred), and keyword relevance.
    5. Be critical but constructive.

    CV Content:
    ${cvText}

    Output Schema (JSON):
    {
      "atsScores": {
        "overall": { "score": number (0-100), "feedback": "string", "improvements": ["string"] },
        "format": { "score": number (0-100), "feedback": "string", "improvements": ["string"] },
        "keyword": { "score": number (0-100), "feedback": "string", "improvements": ["string"] },
        "relevance": { "score": number (0-100), "feedback": "string", "improvements": ["string"] },
        "readability": { "score": number (0-100), "feedback": "string", "improvements": ["string"] }
      },
      "improvements": {
        "critical": [{ "point": "string", "solution": "string" }],
        "important": [{ "point": "string", "solution": "string" }],
        "recommended": [{ "point": "string", "solution": "string" }]
      },
      "skills": {
        "technical": [{ "name": "string", "proficiency": "string (0-100)", "context": "string" }],
        "missing": [{ "name": "string", "importance": "string" }]
      },
      "experience": [
        { "title": "string", "company": "string", "duration": "string", "achievements": ["string"] }
      ],
      "marketInsights": {
        "trends": ["string"],
        "keywords": [{ "word": "string", "count": number, "importance": "string" }]
      },
      "actionPlan": {
        "immediate": [{ "action": "string", "priority": "high" }],
        "shortTerm": [{ "action": "string", "priority": "medium" }],
        "longTerm": [{ "action": "string", "priority": "low" }]
      }
    }`;

    console.log('Generating content with Gemini...');
    const result = await model.generateContent(prompt);
    console.log('Got response from Gemini...');
    const response = await result.response;
    const text = response.text();

    console.log('Parsing JSON response...');
    let parsedData: AnalysisResult;
    try {
      parsedData = JSON.parse(text);
      // Add type for compatibility
      parsedData.type = 'detailed';
      parsedData.rawContent = cvText; // Store original text if needed, or summary
    } catch (e) {
      console.error("Failed to parse JSON:", text);
      throw new Error("Failed to parse analysis results. Please try again.");
    }

    return parsedData;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error analyzing CV with Gemini:', errorMessage);
    throw new Error(`Failed to analyze CV: ${errorMessage}`);
  }
}

export async function optimizeCV(
  originalCV: string,
  options: OptimizationOptions
): Promise<OptimizedResume> {
  try {
    if (!originalCV?.trim()) {
      throw new Error('CV content is empty or invalid');
    }

    console.log('Optimizing CV with options:', options);
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const toneDescriptions = {
      professional: 'formal, corporate, and conventional',
      creative: 'unique, innovative, and expressive',
      technical: 'precise, detailed, and industry-specific',
      executive: 'leadership-focused, strategic, and high-impact'
    };

    const focusDescriptions = {
      ats: 'optimized for Applicant Tracking Systems with keyword density',
      human: 'engaging and readable for human recruiters',
      balanced: 'balanced for both ATS and human readers'
    };

    const prompt = `As an expert resume writer and career consultant, optimize the following resume.

CRITICAL INSTRUCTIONS:
1. Return ONLY valid JSON format.
2. Do NOT use markdown formatting (**, *, _, etc.) anywhere in the output.
3. Return clean, plain text content.
4. Preserve the EXACT structure and layout of the original resume.
5. Keep all section headings in the same order.
6. Maintain the same formatting style (bullet points, dates, etc.).
7. Only improve the CONTENT, not the structure.

TARGET SPECIFICATIONS:
- Tone: ${options.tone} (${toneDescriptions[options.tone]})
- Focus: ${options.focus} (${focusDescriptions[options.focus]})
${options.targetRole ? `- Target Role: ${options.targetRole}` : ''}

OPTIMIZATION GOALS:
1. Enhance action verbs and quantify achievements
2. Improve keyword relevance for ${options.focus === 'ats' ? 'ATS systems' : 'recruiters'}
3. Strengthen impact statements
4. Remove weak or redundant phrases
5. Ensure consistency in tense and formatting
6. Make the content more compelling and results-oriented

ORIGINAL RESUME:
${originalCV}

Output Schema (JSON):
{
  "content": "string - The complete optimized resume text preserving exact layout",
  "improvedSections": ["string - list of section names that were improved"],
  "changesSummary": "string - brief summary of key improvements made"
}`;

    console.log('Generating optimized content...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Parsing optimization response...');
    let optimizedData: OptimizedResume;
    try {
      optimizedData = JSON.parse(text);

      // Strip any remaining markdown formatting
      optimizedData.content = optimizedData.content
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/\_\_/g, '')
        .replace(/\_/g, '');

    } catch (e) {
      console.error("Failed to parse JSON:", text);
      throw new Error("Failed to parse optimization results. Please try again.");
    }

    return optimizedData;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error optimizing CV with Gemini:', errorMessage);
    throw new Error(`Failed to optimize CV: ${errorMessage}`);
  }
}
