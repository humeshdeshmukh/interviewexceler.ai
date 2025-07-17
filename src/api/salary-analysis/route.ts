import { NextResponse } from 'next/server';
import { analyzeSalary, generateCounterOffer } from '@/utils/salaryAnalyzer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Get salary analysis
    const analysis = analyzeSalary(data);
    
    // Generate counter offer if current offer is provided
    const counterOffer = data.currentOffer 
      ? generateCounterOffer(data.currentOffer, analysis.marketData)
      : null;

    return NextResponse.json({
      success: true,
      analysis,
      counterOffer
    });
  } catch (error) {
    console.error('Salary analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze salary data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
