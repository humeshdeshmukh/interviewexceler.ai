import { NextResponse } from 'next/server';
import { analyzeFeedback, generateFeedbackReport } from '@/utils/feedbackAnalyzer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (data.action === 'analyze') {
      const feedback = analyzeFeedback(
        data.response,
        {
          type: data.type,
          level: data.level,
          role: data.role
        }
      );
      return NextResponse.json({ success: true, feedback });
    }
    
    if (data.action === 'generateReport') {
      const report = generateFeedbackReport(data.feedback, {
        type: data.type,
        level: data.level,
        role: data.role
      });
      return NextResponse.json({ success: true, report });
    }

    return NextResponse.json(
      { error: 'Invalid action specified' },
      { status: 400 }
    );
  } catch (error) {
    console.error('AI feedback error:', error);
    return NextResponse.json(
      { error: 'Failed to process feedback request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
