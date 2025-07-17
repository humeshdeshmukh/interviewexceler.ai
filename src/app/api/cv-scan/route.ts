import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured");
    }

    const body = await req.json();
    const { cvText } = body;

    if (!cvText || typeof cvText !== 'string') {
      return NextResponse.json(
        { error: "CV text is required and must be a string" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `Analyze this CV/Resume and provide detailed feedback in the following format:

Professional Summary:
- Overall assessment of the candidate's profile
- Key highlights and unique selling points

Key Skills Analysis:
- Technical skills assessment
- Soft skills evaluation
- Industry-specific expertise

Experience Highlights:
- Notable achievements
- Career progression
- Impact and results

Areas for Improvement:
- Specific recommendations
- Missing elements
- Enhancement opportunities

Overall Score: [Score out of 10]

Additional Recommendations:
- Formatting suggestions
- Content optimization tips
- Industry-specific advice

CV Content to Analyze:
${cvText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Failed to generate analysis");
    }

    return NextResponse.json({ analysis: text });
  } catch (error: any) {
    console.error("CV Analysis Error:", error);
    
    // Handle specific error types
    if (error.message?.includes("quota")) {
      return NextResponse.json(
        { error: "API quota exceeded. Please try again later." },
        { status: 429 }
      );
    }

    if (error.message?.includes("API key")) {
      return NextResponse.json(
        { error: "API configuration error. Please contact support." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to analyze CV" },
      { status: 500 }
    );
  }
}
