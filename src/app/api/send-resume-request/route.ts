import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ResumeRequestData {
  writerId: string;
  packageId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  currentRole: string;
  targetRole: string;
  notes?: string;
}

export async function POST(req: Request) {
  try {
    const data: ResumeRequestData = await req.json();
    
    // Validate required fields
    const requiredFields = ['writerId', 'packageId', 'date', 'time', 'name', 'email', 'phone', 'currentRole', 'targetRole'];
    for (const field of requiredFields) {
      if (!data[field as keyof ResumeRequestData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Log the request data
    console.log('Resume Writer Request:', {
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
        <h2>New Resume Writing Request</h2>
        <p><strong>Client Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Writer ID:</strong> ${data.writerId}</p>
        <p><strong>Package:</strong> ${data.packageId}</p>
        <p><strong>Scheduled Date:</strong> ${data.date}</p>
        <p><strong>Scheduled Time:</strong> ${data.time}</p>
        <p><strong>Current Role:</strong> ${data.currentRole}</p>
        <p><strong>Target Role:</strong> ${data.targetRole}</p>
        ${data.notes ? `<p><strong>Additional Notes:</strong> ${data.notes}</p>` : ''}
      `;

      // Format the HTML for client email
      const clientEmailHtml = `
        <h2>Resume Writing Session Confirmation</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for scheduling a resume writing session with us. Here are your session details:</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>Package:</strong> ${data.packageId}</p>
        <br/>
        <p>We'll be in touch shortly with additional information and next steps.</p>
        <p>Best regards,<br/>InterviewExceler.Ai Team</p>
      `;

      // Send email to admin
      await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Resume Writing Request',
        html: adminEmailHtml,
      });

      // Send confirmation email to client
      await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: data.email,
        subject: 'Resume Writing Session Confirmation',
        html: clientEmailHtml,
      });
    }

    return NextResponse.json({ message: 'Request submitted successfully' });
  } catch (error) {
    console.error('Resume request error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
