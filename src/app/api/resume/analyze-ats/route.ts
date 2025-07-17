import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { resumeData } = await req.json();

    // Format resume data for analysis
    const formattedResume = `
      Personal Information:
      Name: ${resumeData.personalInfo.fullName}
      Email: ${resumeData.personalInfo.email}
      Phone: ${resumeData.personalInfo.phone}
      Location: ${resumeData.personalInfo.location || ''}
      Summary: ${resumeData.personalInfo.summary || ''}

      Work Experience:
      ${resumeData.experiences?.map(exp => `
        Position: ${exp.position}
        Company: ${exp.company}
        Duration: ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
        Responsibilities:
        ${exp.description.map(desc => `- ${desc}`).join('\n')}
        Technologies: ${exp.technologies ? exp.technologies.join(', ') : ''}
      `).join('\n\n') || ''}

      Education:
      ${resumeData.education?.map(edu => `
        Degree: ${edu.degree} in ${edu.field}
        Institution: ${edu.institution}
        Duration: ${edu.startDate} - ${edu.endDate}
        ${edu.gpa ? `GPA: ${edu.gpa}` : ''}
      `).join('\n\n') || ''}

      Skills:
      ${resumeData.skills?.join(', ') || ''}

      Projects:
      ${resumeData.projects?.map(proj => `
        Name: ${proj.name}
        Description: ${proj.description}
        Technologies: ${proj.technologies ? proj.technologies.join(', ') : ''}
      `).join('\n\n') || ''}
    `;

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Prompt for ATS analysis
    const prompt = `
      You are an ATS (Applicant Tracking System) expert. Analyze this resume for ATS compatibility and scoring.
      Consider these key factors and their weights:
      1. Keyword optimization and relevance (30%)
      2. Proper formatting and structure (20%)
      3. Clear section headings and organization (15%)
      4. Quantifiable achievements and metrics (15%)
      5. Relevant skills and technologies (10%)
      6. Contact information completeness (5%)
      7. Education details (5%)

      Resume to analyze:
      ${formattedResume}

      Return only a number between 0 and 100 representing the overall ATS compatibility score.
      The score should reflect how well the resume would perform in typical ATS systems.
    `;

    // Get response from the model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract the score from the response (only numbers)
    const score = parseInt(text.match(/\d+/)?.[0] || "70");

    return NextResponse.json({ score });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume', score: 70 },
      { status: 200 }
    );
  }
}
