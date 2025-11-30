import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { resumeData } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not set" },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const prompt = `Analyze this resume and provide feedback in strict JSON format.
    
    Resume Data:
    ${JSON.stringify(resumeData, null, 2)}
    
    Output Format:
    {
      "score": number (0-100),
      "improvements": [
        "specific improvement 1",
        "specific improvement 2",
        ...
      ]
    }
    
    Focus on ATS optimization, clarity, impact, and formatting suggestions.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up the response text if it contains markdown code blocks
        const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();

        try {
            const analysis = JSON.parse(cleanText);
            return NextResponse.json(analysis);
        } catch (parseError) {
            console.error("Error parsing Gemini response:", parseError);
            return NextResponse.json(
                { error: "Failed to parse AI response" },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error("Error analyzing resume:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
