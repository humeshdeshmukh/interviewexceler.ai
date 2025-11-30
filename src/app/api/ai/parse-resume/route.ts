import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set" },
        { status: 500 }
      );
    }

    const buffer = await file.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString("base64");
    const mimeType = file.type;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `Extract data from this resume and format it as a JSON object matching this structure. If a field is missing, leave it as an empty string or empty array.

    Structure:
    {
      "personalInfo": {
        "fullName": "",
        "email": "",
        "phone": "",
        "location": "",
        "linkedin": "",
        "portfolio": "",
        "summary": ""
      },
      "experiences": [
        {
          "company": "",
          "position": "",
          "startDate": "YYYY-MM",
          "endDate": "YYYY-MM or Present",
          "current": boolean,
          "description": ["bullet point 1", "bullet point 2"],
          "technologies": []
        }
      ],
      "education": [
        {
          "institution": "",
          "degree": "",
          "field": "",
          "startDate": "YYYY-MM",
          "endDate": "YYYY-MM",
          "gpa": ""
        }
      ],
      "skills": ["skill1", "skill2"],
      "projects": [
        {
          "name": "",
          "description": "",
          "technologies": [],
          "link": ""
        }
      ],
      "certifications": [
        {
          "name": "",
          "issuer": "",
          "date": "YYYY-MM",
          "link": ""
        }
      ],
      "languages": [
        {
          "name": "",
          "proficiency": ""
        }
      ],
      "achievements": [
        {
          "title": "",
          "description": "",
          "date": ""
        }
      ],
      "volunteer": [
        {
          "organization": "",
          "role": "",
          "startDate": "",
          "endDate": "",
          "description": ""
        }
      ]
    }`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();

    try {
      const parsedData = JSON.parse(cleanText);
      return NextResponse.json(parsedData);
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Error parsing resume:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
