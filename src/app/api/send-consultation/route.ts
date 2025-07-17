import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ConsultationRequest {
  name: string;
  email: string;
  phone: string;
  package: string;
  experience: string;
  currentRole: string;
  targetRole: string;
  industry: string;
  goals: string[];
  preferredDate: string;
  preferredTime: string;
  linkedin?: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const data: ConsultationRequest = await req.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'package', 'experience', 'currentRole', 'targetRole', 'industry', 'goals', 'preferredDate', 'preferredTime'];
    for (const field of requiredFields) {
      if (!data[field as keyof ConsultationRequest]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Log the request data
    console.log('Career Consultation Request:', {
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
      const adminHtml = `
        <h2>New Career Consultation Request</h2>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          
          <h3>Professional Details</h3>
          <p><strong>Package:</strong> ${data.package}</p>
          <p><strong>Experience Level:</strong> ${data.experience}</p>
          <p><strong>Current Role:</strong> ${data.currentRole}</p>
          <p><strong>Target Role:</strong> ${data.targetRole}</p>
          <p><strong>Industry:</strong> ${data.industry}</p>
          
          <h3>Career Goals</h3>
          <p><strong>Goals:</strong> ${typeof data.goals === 'string' ? data.goals : Array.isArray(data.goals) ? data.goals.join(', ') : 'Not provided'}</p>
          
          <h3>Schedule</h3>
          <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
          <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
          
          <h3>Professional Profile</h3>
          ${data.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${data.linkedin}">${data.linkedin}</a></p>` : ''}
          
          <h3>Additional Information</h3>
          <p>${data.message || 'No additional notes provided.'}</p>
        </div>
      `;

      // Format the HTML for client email
      const clientHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for your Career Consultation Request</h2>
          <p>Dear ${data.name},</p>
          <p>We have received your career consultation request and are excited to help you achieve your professional goals.</p>
          
          <h3>Your Request Details:</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li><strong>Package Selected:</strong> ${data.package}</li>
            <li><strong>Current Role:</strong> ${data.currentRole}</li>
            <li><strong>Target Role:</strong> ${data.targetRole}</li>
            <li><strong>Preferred Date:</strong> ${data.preferredDate}</li>
            <li><strong>Preferred Time:</strong> ${data.preferredTime}</li>
          </ul>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Our team will review your career goals and background</li>
            <li>We will confirm your consultation slot via email within 24 hours</li>
            <li>You will receive a pre-consultation questionnaire to help us prepare</li>
          </ol>
          
          <p>We aim to provide you with actionable insights and strategies to advance your career. If you need to modify your schedule or have any questions, please don't hesitate to contact us.</p>
          
          <p style="margin-top: 20px;">Best regards,<br>The InterviewExceler.Ai Team</p>
        </div>
      `;

      // Send emails to both admin and client
      await Promise.all([
        // Send to admin
        transporter.sendMail({
          from: process.env.ADMIN_EMAIL,
          to: process.env.ADMIN_EMAIL,
          subject: `New Career Consultation Request from ${data.name}`,
          html: adminHtml,
        }),
        // Send to client
        transporter.sendMail({
          from: process.env.ADMIN_EMAIL,
          to: data.email,
          subject: 'Your Career Consultation Request - InterviewExceler.Ai',
          html: clientHtml,
        })
      ]);
    }

    return NextResponse.json(
      { message: 'Your career consultation request has been submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing career consultation request:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
