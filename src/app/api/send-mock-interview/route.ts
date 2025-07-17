import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface MockInterviewRequest {
  interviewType: {
    id: string;
    name: string;
    duration: number;
    price: number;
  };
  interviewer: {
    id: string;
    name: string;
    expertise: string[];
    timezone: string;
  };
  date: string;
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  candidate: {
    name: string;
    email: string;
    phone: string;
    experience: string;
    currentRole: string;
    targetRole: string;
    preferredLanguages: string[];
    notes?: string;
  };
}

export async function POST(req: Request) {
  try {
    const data: MockInterviewRequest = await req.json();
    
    // Validate required fields
    const requiredFields = [
      'interviewType', 'interviewer', 'date', 'timeSlot',
      'candidate.name', 'candidate.email', 'candidate.phone',
      'candidate.experience', 'candidate.currentRole',
      'candidate.targetRole', 'candidate.preferredLanguages'
    ];

    for (const field of requiredFields) {
      const value = field.includes('.')
        ? field.split('.').reduce((obj, key) => obj?.[key], data)
        : data[field as keyof MockInterviewRequest];

      if (!value) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Log the request data
    console.log('Mock Interview Request:', {
      ...data,
      timestamp: new Date().toISOString()
    });

    // Send emails in production and development
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Format the HTML for admin email
      const adminEmailHtml = `
        <h2>New Mock Interview Request</h2>
        <h3>Interview Details</h3>
        <p><strong>Type:</strong> ${data.interviewType.name}</p>
        <p><strong>Duration:</strong> ${data.interviewType.duration} minutes</p>
        <p><strong>Price:</strong> $${data.interviewType.price}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.timeSlot.startTime} - ${data.timeSlot.endTime}</p>
        
        <h3>Interviewer</h3>
        <p><strong>Name:</strong> ${data.interviewer.name}</p>
        <p><strong>Expertise:</strong> ${data.interviewer.expertise.join(', ')}</p>
        <p><strong>Timezone:</strong> ${data.interviewer.timezone}</p>
        
        <h3>Candidate Information</h3>
        <p><strong>Name:</strong> ${data.candidate.name}</p>
        <p><strong>Email:</strong> ${data.candidate.email}</p>
        <p><strong>Phone:</strong> ${data.candidate.phone}</p>
        <p><strong>Experience:</strong> ${data.candidate.experience}</p>
        <p><strong>Current Role:</strong> ${data.candidate.currentRole}</p>
        <p><strong>Target Role:</strong> ${data.candidate.targetRole}</p>
        <p><strong>Preferred Languages:</strong> ${data.candidate.preferredLanguages.join(', ')}</p>
        ${data.candidate.notes ? `<p><strong>Additional Notes:</strong> ${data.candidate.notes}</p>` : ''}
      `;

      // Format the HTML for client email
      const clientEmailHtml = `
        <h2>Mock Interview Confirmation</h2>
        <p>Dear ${data.candidate.name},</p>
        <p>Your mock interview has been scheduled successfully. Here are the details:</p>
        
        <h3>Interview Details</h3>
        <p><strong>Type:</strong> ${data.interviewType.name}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.timeSlot.startTime} - ${data.timeSlot.endTime}</p>
        <p><strong>Duration:</strong> ${data.interviewType.duration} minutes</p>
        
        <h3>Your Interviewer</h3>
        <p><strong>Name:</strong> ${data.interviewer.name}</p>
        <p><strong>Expertise:</strong> ${data.interviewer.expertise.join(', ')}</p>
        <p><strong>Timezone:</strong> ${data.interviewer.timezone}</p>
        
        <h3>Next Steps</h3>
        <ol>
          <li>You'll receive a calendar invite for the interview shortly.</li>
          <li>Please review our interview preparation guidelines.</li>
          <li>Make sure you have a stable internet connection and a quiet environment for the interview.</li>
          <li>Be ready 5 minutes before the scheduled time.</li>
        </ol>
        
        <p>If you need to reschedule or have any questions, please contact us immediately.</p>
        
        <p>Best regards,<br/>InterviewExceler.Ai Team</p>
      `;

      // Send email to admin
      await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Mock Interview Request',
        html: adminEmailHtml,
      });

      // Send confirmation email to client
      await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: data.candidate.email,
        subject: 'Mock Interview Confirmation',
        html: clientEmailHtml,
      });
    }

    return NextResponse.json({ message: 'Interview scheduled successfully' });
  } catch (error) {
    console.error('Mock interview scheduling error:', error);
    return NextResponse.json(
      { error: 'Failed to schedule interview' },
      { status: 500 }
    );
  }
}
