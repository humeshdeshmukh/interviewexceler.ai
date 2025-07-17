import { NextResponse } from 'next/server';
import { analyzeCVContent, generateAIFeedback } from '@/utils/cvAnalyzer';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Read file content
    const fileContent = await file.text();
    
    // Analyze CV
    const analysis = await analyzeCVContent(fileContent);
    
    // Get AI feedback
    const aiFeedback = await generateAIFeedback(fileContent);

    return NextResponse.json({
      success: true,
      analysis,
      aiFeedback
    });
  } catch (error) {
    console.error('CV analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze CV', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
