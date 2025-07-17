import { NextResponse } from 'next/server';
import { analyzeBranding, generateContentIdeas, generateHashtags } from '@/utils/brandingAnalyzer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Get branding analysis
    const analysis = await analyzeBranding(data);
    
    // Generate content ideas and hashtags
    const contentIdeas = generateContentIdeas(data.industry);
    const hashtags = generateHashtags(data.industry);

    return NextResponse.json({
      success: true,
      analysis,
      contentIdeas,
      hashtags
    });
  } catch (error) {
    console.error('Branding analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze personal branding', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
