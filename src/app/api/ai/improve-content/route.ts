import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { text, type, context } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not set" },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        let prompt = "";

        if (type === "experience") {
            prompt = `Rewrite the following job experience description to be more professional, impactful, and result-oriented. Use action verbs and quantify achievements where possible. Keep it concise.
      
      Original Text:
      "${text}"
      
      Context (Company/Role): ${context || "N/A"}
      
      Return only the improved text, no explanations.`;
        } else if (type === "summary") {
            prompt = `Rewrite the following professional summary to be more engaging and highlight key strengths.
      
      Original Text:
      "${text}"
      
      Return only the improved text, no explanations.`;
        } else {
            prompt = `Improve the following text for a professional resume:
      
      Original Text:
      "${text}"
      
      Return only the improved text, no explanations.`;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const improvedText = response.text().trim();

        return NextResponse.json({ improvedText });

    } catch (error) {
        console.error("Error improving content:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
