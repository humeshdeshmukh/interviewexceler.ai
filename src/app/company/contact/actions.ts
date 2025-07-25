'use server';

import { contactFormSchema, ContactFormData } from './validation';

export async function submitContactForm(data: ContactFormData) {
  try {
    const validatedData = contactFormSchema.parse(data);

    // Here you would typically send the email using your email service
    // For now, we'll just log it and return success
    console.log('Contact form submission:', validatedData);

    // In production, you would send this to your email service
    // Example: await sendEmail({
    //   to: "support@InterviewExceler.Ai",
    //   from: validatedData.email,
    //   subject: validatedData.subject,
    //   text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nMessage: ${validatedData.message}`,
    // });

    return {
      success: true,
      message: 'Thank you for your message. We\'ll get back to you soon!',
    };
  } catch (error) {
    console.error('Contact form error:', error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Invalid form data. Please check your inputs.',
        errors: error.errors,
      };
    }
    return {
      success: false,
      message: 'Failed to send message. Please try again later.',
    };
  }
}
