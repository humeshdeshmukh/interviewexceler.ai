import { NextResponse } from 'next/server';
import {
  getAvailableSlots,
  bookInterview,
  interviewers,
  interviewTypes
} from '@/utils/interviewScheduler';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    switch (data.action) {
      case 'getSlots': {
        const slots = getAvailableSlots(data.interviewerId, data.date);
        return NextResponse.json({ success: true, slots });
      }
      
      case 'getInterviewers': {
        return NextResponse.json({ success: true, interviewers });
      }
      
      case 'getInterviewTypes': {
        return NextResponse.json({ success: true, interviewTypes });
      }
      
      case 'bookInterview': {
        const success = await bookInterview(data.bookingDetails);
        if (success) {
          return NextResponse.json({ success: true, message: 'Interview scheduled successfully' });
        }
        throw new Error('Failed to book interview');
      }
      
      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Interview scheduling error:', error);
    return NextResponse.json(
      { error: 'Failed to process scheduling request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
