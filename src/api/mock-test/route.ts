import { NextResponse } from 'next/server';
import { getQuestions, analyzeTestResult, generateTestAnalysis } from '@/utils/testAnalyzer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (data.action === 'getQuestions') {
      const questions = getQuestions(data.category, data.difficulty, data.count);
      return NextResponse.json({ success: true, questions });
    }
    
    if (data.action === 'submitTest') {
      const result = analyzeTestResult(data.answers, data.questions, data.timeSpent);
      const analysis = generateTestAnalysis(result);
      return NextResponse.json({ success: true, result, analysis });
    }

    return NextResponse.json(
      { error: 'Invalid action specified' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Mock test error:', error);
    return NextResponse.json(
      { error: 'Failed to process test request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
