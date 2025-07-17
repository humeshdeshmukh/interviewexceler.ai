import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { to, subject, data } = await req.json();

    // Create a transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        // For Gmail, you need to use an App Password instead of your account password
        // Generate one at: https://myaccount.google.com/apppasswords
        pass: process.env.EMAIL_PASS
      }
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #fcba28; margin-bottom: 20px;">New Consultation Request</h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #2d3748; margin-bottom: 15px;">Personal Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
          <p><strong>Job Title:</strong> ${data.jobTitle || 'N/A'}</p>
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #2d3748; margin-bottom: 15px;">Consultation Details</h3>
          <p><strong>Type:</strong> ${data.consultationType}</p>
          <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
          <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
          <p><strong>Experience Level:</strong> ${data.experience}</p>
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #2d3748; margin-bottom: 15px;">Goals & Additional Info</h3>
          <p><strong>Career Goals:</strong></p>
          <ul style="margin-top: 5px;">
            ${data.goals.map((goal: string) => `<li>${goal}</li>`).join('')}
          </ul>
          <p><strong>Heard From:</strong> ${data.heardFrom}</p>
          <p><strong>Message:</strong> ${data.message}</p>
        </div>

        <div style="font-size: 12px; color: #666; margin-top: 30px; text-align: center;">
          <p>This is an automated message from InterviewExceler.Ai</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: {
        name: 'InterviewExceler.Ai',
        address: process.env.EMAIL_USER as string
      },
      to,
      subject,
      html: htmlContent
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
