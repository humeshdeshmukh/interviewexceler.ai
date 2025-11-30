import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface SalaryNegotiationRequest {
  name: string;
  email: string;
  phone: string;
  package: string;
  experience: string;
  currentRole: string;
  targetRole: string;
  currentSalary?: string;
  targetSalary?: string;
  company?: string;
  offerStage: string;
  linkedin?: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const data: SalaryNegotiationRequest = await req.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'package', 'experience', 'currentRole', 'targetRole', 'offerStage'];
    for (const field of requiredFields) {
      if (!data[field as keyof SalaryNegotiationRequest]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Log the request data
    console.log('Salary Negotiation Request:', {
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
        <h2>New Salary Negotiation Request</h2>
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
          <p><strong>Current Salary:</strong> ${data.currentSalary || 'Not provided'}</p>
          <p><strong>Target Salary:</strong> ${data.targetSalary || 'Not provided'}</p>
          <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          <p><strong>Offer Stage:</strong> ${data.offerStage}</p>
          
          <h3>Professional Profile</h3>
          ${data.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${data.linkedin}">${data.linkedin}</a></p>` : ''}
          
          <h3>Additional Information</h3>
          <p>${data.message || 'No additional notes provided.'}</p>
        </div>
      `;

      // Format the HTML for client email
      const clientHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for your Salary Negotiation Request</h2>
          <p>Dear ${data.name},</p>
          <p>We have received your salary negotiation request and are excited to help you achieve your compensation goals.</p>
          
          <h3>Your Request Details:</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li><strong>Package Selected:</strong> ${data.package}</li>
            <li><strong>Current Role:</strong> ${data.currentRole}</li>
            <li><strong>Target Role:</strong> ${data.targetRole}</li>
            <li><strong>Offer Stage:</strong> ${data.offerStage}</li>
          </ul>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Our team will review your request and details</li>
            <li>We will contact you within 24 hours to schedule your consultation</li>
            <li>You will receive preparation materials and a strategy outline</li>
          </ol>
          
          <p>We aim to help you maximize your compensation package through effective negotiation strategies. If you need to provide additional information or have any questions, please don't hesitate to contact us.</p>
          
          <p style="margin-top: 20px;">Best regards,<br>The InterviewExceler.Ai Team</p>
        </div>
      `;

      // Send emails to both admin and client
      await Promise.all([
        // Send to admin
        transporter.sendMail({
          from: process.env.ADMIN_EMAIL,
          to: process.env.ADMIN_EMAIL,
          subject: `New Salary Negotiation Request from ${data.name}`,
          html: adminHtml,
        }),
        // Send to client
        transporter.sendMail({
          from: process.env.ADMIN_EMAIL,
          to: data.email,
          subject: 'Your Salary Negotiation Request - InterviewExceler.Ai',
          html: clientHtml,
        })
      ]);
    }

    return NextResponse.json(
      { message: 'Your salary negotiation request has been submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing salary negotiation request:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
