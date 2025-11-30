import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ConsultationRequest {
  name: string;
  email: string;
  phone: string;
  experience: string;
  consultationType: string;
  company: string;
  jobTitle: string;
  goals: string;
  preferredMethod: string;
  heardFrom: string;
  preferredDate: string;
  preferredTime: string;
}

export async function POST(req: Request) {
  try {
    const data: ConsultationRequest = await req.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'experience', 'consultationType', 'jobTitle', 'goals', 'preferredDate', 'preferredTime'];
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
          <p><strong>Experience Level:</strong> ${data.experience}</p>
          <p><strong>Consultation Type:</strong> ${data.consultationType}</p>
          <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          <p><strong>Job Title:</strong> ${data.jobTitle}</p>
          
          <h3>Career Goals</h3>
          <p>${data.goals}</p>
          
          <h3>Schedule</h3>
          <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
          <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
          <p><strong>Preferred Method:</strong> ${data.preferredMethod}</p>
          
          <h3>Additional Information</h3>
          <p><strong>Heard From:</strong> ${data.heardFrom || 'Not provided'}</p>
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
            <li><strong>Consultation Type:</strong> ${data.consultationType}</li>
            <li><strong>Job Title:</strong> ${data.jobTitle}</li>
            <li><strong>Preferred Date:</strong> ${data.preferredDate}</li>
            <li><strong>Preferred Time:</strong> ${data.preferredTime}</li>
            <li><strong>Preferred Method:</strong> ${data.preferredMethod}</li>
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
