import { NextResponse } from 'next/server';
import { analyzeCVContent, generateAIFeedback } from '@/utils/cvAnalyzer';
import { withAuth } from '@/lib/api/middleware';
import { createClient } from '@/lib/supabase/server';

export const POST = withAuth(async (req, { userId }) => {
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

    // Store in database
    const supabase = await createClient();
    await supabase.from('resume_analyses').insert({
      user_id: userId,
      resume_url: file.name, // Storing filename for now as we don't have storage setup yet
      analysis_result: analysis,
      suggestions: aiFeedback,
      ats_score: analysis.score || 0, // Assuming analysis has a score field
    });

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
});
