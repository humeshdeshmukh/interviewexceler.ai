import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface CVRevisionRequest {
  name: string;
  email: string;
  phone: string;
  package: string;
  industry: string;
  experience: string;
  currentJobTitle: string;
  targetJobTitle: string;
  additionalNotes: string;
  linkedinUrl?: string;
  githubUrl?: string;
  cvUrl: string;
}

export async function POST(req: Request) {
  try {
    const data: CVRevisionRequest = await req.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'package', 'industry', 'experience', 'currentJobTitle', 'targetJobTitle', 'cvUrl'];
    for (const field of requiredFields) {
      if (!data[field as keyof CVRevisionRequest]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // For development/testing, just log the data and return success
    console.log('CV Revision Request:', {
      ...data,
      timestamp: new Date().toISOString()
    });

    // In production, you would send emails here
    if (process.env.NODE_ENV === 'production' && process.env.ADMIN_EMAIL && process.env.EMAIL_PASS) {
      // Configure nodemailer with Gmail
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Format the HTML for admin email
      const adminHtml = `
        <h2>New CV Revision Request</h2>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          
          <h3>Professional Details</h3>
          <p><strong>Package:</strong> ${data.package}</p>
          <p><strong>Industry:</strong> ${data.industry}</p>
          <p><strong>Experience Level:</strong> ${data.experience}</p>
          <p><strong>Current Job Title:</strong> ${data.currentJobTitle}</p>
          <p><strong>Target Job Title:</strong> ${data.targetJobTitle}</p>
          
          <h3>Documents & Links</h3>
          <p><strong>CV URL:</strong> <a href="${data.cvUrl}">${data.cvUrl}</a></p>
          ${data.linkedinUrl ? `<p><strong>LinkedIn:</strong> <a href="${data.linkedinUrl}">${data.linkedinUrl}</a></p>` : ''}
          ${data.githubUrl ? `<p><strong>GitHub:</strong> <a href="${data.githubUrl}">${data.githubUrl}</a></p>` : ''}
          
          <h3>Additional Information</h3>
          <p>${data.additionalNotes || 'No additional notes provided.'}</p>
        </div>
      `;

      // Format the HTML for client email
      const clientHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for your CV Revision Request</h2>
          <p>Dear ${data.name},</p>
          <p>We have received your CV revision request and are excited to help you optimize your professional profile.</p>
          
          <h3>Your Request Details:</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li><strong>Package Selected:</strong> ${data.package}</li>
            <li><strong>Industry:</strong> ${data.industry}</li>
            <li><strong>Current Role:</strong> ${data.currentJobTitle}</li>
            <li><strong>Target Role:</strong> ${data.targetJobTitle}</li>
          </ul>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Our team will review your CV and professional information</li>
            <li>We will begin working on optimizing your CV based on your target role</li>
            <li>You will receive your revised CV within the timeframe specified in your selected package</li>
          </ol>
          
          <p>We aim to deliver high-quality results within our promised timeframe. If you need to provide any additional information or have questions, please don't hesitate to contact us.</p>
          
          <p style="margin-top: 20px;">Best regards,<br>The InterviewExceler.Ai Team</p>
        </div>
      `;

      // Send emails
      await Promise.all([
        transporter.sendMail({
          from: process.env.ADMIN_EMAIL,
          to: process.env.ADMIN_EMAIL,
          subject: `New CV Revision Request from ${data.name}`,
          html: adminHtml,
        }),
        transporter.sendMail({
          from: process.env.ADMIN_EMAIL,
          to: data.email,
          subject: 'Your CV Revision Request - InterviewExceler.Ai',
          html: clientHtml,
        })
      ]);
    }

    return NextResponse.json(
      { message: 'Your CV revision request has been submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing CV revision request:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
