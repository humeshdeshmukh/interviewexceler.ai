import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface MockTestRequest {
  name: string;
  email: string;
  phone: string;
  package: string;
  linkedin?: string;
  github?: string;
  experience: string;
  targetRole: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const data: MockTestRequest = await req.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'package', 'experience', 'targetRole', 'preferredDate', 'preferredTime'];
    for (const field of requiredFields) {
      if (!data[field as keyof MockTestRequest]) {
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

    // Send emails in production environment
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Format the HTML for admin email
      const adminHtml = `
        <h2>New Mock Interview Request</h2>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          
          <h3>Professional Details</h3>
          <p><strong>Package:</strong> ${data.package}</p>
          <p><strong>Experience Level:</strong> ${data.experience}</p>
          <p><strong>Target Role:</strong> ${data.targetRole}</p>
          
          <h3>Schedule</h3>
          <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
          <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
          
          <h3>Professional Profiles</h3>
          ${data.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${data.linkedin}">${data.linkedin}</a></p>` : ''}
          ${data.github ? `<p><strong>GitHub:</strong> <a href="${data.github}">${data.github}</a></p>` : ''}
          
          <h3>Additional Information</h3>
          <p>${data.message || 'No additional notes provided.'}</p>
        </div>
      `;

      // Format the HTML for client email
      const clientHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for your Mock Interview Request</h2>
          <p>Dear ${data.name},</p>
          <p>We have received your mock interview request and are excited to help you prepare for your upcoming interviews.</p>
          
          <h3>Your Request Details:</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li><strong>Package Selected:</strong> ${data.package}</li>
            <li><strong>Target Role:</strong> ${data.targetRole}</li>
            <li><strong>Preferred Date:</strong> ${data.preferredDate}</li>
            <li><strong>Preferred Time:</strong> ${data.preferredTime}</li>
          </ul>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Our team will review your request and schedule details</li>
            <li>We will confirm your interview slot via email within 24 hours</li>
            <li>You will receive preparation materials and guidelines before the interview</li>
          </ol>
          
          <p>We aim to provide the most realistic and helpful mock interview experience. If you need to modify your schedule or have any questions, please don't hesitate to contact us.</p>
          
          <p style="margin-top: 20px;">Best regards,<br>The InterviewExceler.Ai Team</p>
        </div>
      `;

      // Send emails to both admin and client
      await Promise.all([
        // Send to admin
        transporter.sendMail({
          from: process.env.ADMIN_EMAIL,
          to: process.env.ADMIN_EMAIL, // Send to admin email
          subject: `New Mock Interview Request from ${data.name}`,
          html: adminHtml,
        }),
        // Send to client
        transporter.sendMail({
          from: process.env.ADMIN_EMAIL,
          to: data.email,
          subject: 'Your Mock Interview Request - InterviewExceler.Ai',
          html: clientHtml,
        })
      ]);
    }

    return NextResponse.json(
      { message: 'Your mock interview request has been submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing mock interview request:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
