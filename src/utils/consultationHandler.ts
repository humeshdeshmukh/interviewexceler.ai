interface ConsultationData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  jobTitle?: string;
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  experience: string;
  goals: string[];
  heardFrom: string;
}

export const submitToGoogleForm = async (data: ConsultationData) => {
  const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;
  
  if (!GOOGLE_FORM_URL) {
    console.error('Google Form URL not configured');
    return false;
  }

  try {
    const formData = new FormData();
    
    // Map your form fields to Google Form fields
    // These IDs should match your actual Google Form field IDs
    const fieldMapping = {
      name: process.env.NEXT_PUBLIC_FORM_NAME_ID,
      email: process.env.NEXT_PUBLIC_FORM_EMAIL_ID,
      phone: process.env.NEXT_PUBLIC_FORM_PHONE_ID,
      company: process.env.NEXT_PUBLIC_FORM_COMPANY_ID,
      jobTitle: process.env.NEXT_PUBLIC_FORM_JOB_TITLE_ID,
      consultationType: process.env.NEXT_PUBLIC_FORM_CONSULTATION_TYPE_ID,
      preferredDate: process.env.NEXT_PUBLIC_FORM_DATE_ID,
      preferredTime: process.env.NEXT_PUBLIC_FORM_TIME_ID,
      message: process.env.NEXT_PUBLIC_FORM_MESSAGE_ID,
      experience: process.env.NEXT_PUBLIC_FORM_EXPERIENCE_ID,
      goals: process.env.NEXT_PUBLIC_FORM_GOALS_ID,
      heardFrom: process.env.NEXT_PUBLIC_FORM_HEARD_FROM_ID,
    };

    // Append form data with environment variables
    Object.entries(fieldMapping).forEach(([key, formId]) => {
      if (formId && data[key as keyof ConsultationData]) {
        const value = data[key as keyof ConsultationData];
        formData.append(
          `entry.${formId}`,
          Array.isArray(value) ? value.join(', ') : value
        );
      }
    });

    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });

    return true;
  } catch (error) {
    console.error('Error submitting form:', error);
    return false;
  }
};

export const sendEmailNotification = async (data: ConsultationData) => {
  try {
    const response = await fetch('/api/send-consultation-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send email notification');
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
};
