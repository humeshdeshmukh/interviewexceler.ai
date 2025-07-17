import { NextResponse } from 'next/server';
import { geminiService } from '@/services/gemini';

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
    - currentRole
    - yearsOfExperience (as a number)
    - skills (as an array of strings)
    - highestEducation
    - certifications (as an array of strings)
    - recentAccomplishments (as an array of strings)
    - preferredIndustries (as an array of strings)
    - keyStrengths (as an array of strings)

    Resume content:
    ${fileContent}`;

    const response = await geminiService.demonstrateAnswer(prompt, "resume");
    // Extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
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
