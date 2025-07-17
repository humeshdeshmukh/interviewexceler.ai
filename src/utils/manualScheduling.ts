export interface ManualBookingForm {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  alternateDate: string;
  alternateTime: string;
  interviewType: string;
  currentRole: string;
  targetRole: string;
  experience: string;
  specialRequirements: string;
  timezone: string;
}

export const timezones = [
  'UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00', 'UTC-07:00',
  'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00', 'UTC-01:00',
  'UTC+00:00', 'UTC+01:00', 'UTC+02:00', 'UTC+03:00', 'UTC+04:00', 'UTC+05:00',
  'UTC+05:30', 'UTC+06:00', 'UTC+07:00', 'UTC+08:00', 'UTC+09:00', 'UTC+10:00',
  'UTC+11:00', 'UTC+12:00'
];

export const experienceLevels = [
  '0-2 years',
  '2-5 years',
  '5-8 years',
  '8-12 years',
  '12+ years'
];

export const validateManualBooking = (form: ManualBookingForm): string[] => {
  const errors: string[] = [];

  if (!form.name.trim()) errors.push('Name is required');
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.push('Valid email is required');
  }
  if (!form.phone.trim() || !/^\+?[\d\s-]{8,}$/.test(form.phone)) {
    errors.push('Valid phone number is required');
  }
  if (!form.preferredDate || !form.preferredTime) {
    errors.push('Preferred date and time are required');
  }
  if (!form.interviewType) errors.push('Interview type is required');
  if (!form.targetRole) errors.push('Target role is required');
  if (!form.experience) errors.push('Experience level is required');
  if (!form.timezone) errors.push('Timezone is required');

  return errors;
};
