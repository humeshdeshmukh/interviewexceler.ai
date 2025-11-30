import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('resume') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No resume file provided' },
        { status: 400 }
      );
    }

    // Read the file content
    const fileContent = await file.text();

    // Use Gemini to analyze the resume
    const prompt = `Analyze this resume and extract the following information in JSON format:
    - currentRole (string)
    - yearsOfExperience (number)
    - skills (array of strings)
    - highestEducation (string)
    - certifications (array of strings)
    - recentAccomplishments (array of strings)
    - preferredIndustries (array of strings)
    - keyStrengths (array of strings)

    Return ONLY valid JSON with no markdown formatting or explanation.

    Resume content:
    ${fileContent}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Extract JSON from the response
    let cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    // Find JSON object
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in AI response:', response);
      return NextResponse.json(
        { error: 'AI did not return valid JSON. Please try again.' },
        { status: 500 }
      );
    }

    const analysisResult = JSON.parse(jsonMatch[0]);

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}
