import { NextResponse } from 'next/server';
import { generateSessionFeedback, analyzeCoachingProgress } from '@/utils/coachingAnalyzer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (data.action === 'generateFeedback') {
      const feedback = generateSessionFeedback(
        data.responses,
        data.sessionType,
        data.level
      );
      return NextResponse.json({ success: true, feedback });
    }
    
    if (data.action === 'analyzeProgress') {
      const analysis = analyzeCoachingProgress(data.sessions);
      return NextResponse.json({ success: true, analysis });
    }

    return NextResponse.json(
      { error: 'Invalid action specified' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Interview coaching error:', error);
    return NextResponse.json(
      { error: 'Failed to process coaching request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
