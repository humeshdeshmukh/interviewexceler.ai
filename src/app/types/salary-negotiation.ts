export type PackageType = 'standard' | 'premium';

export interface Package {
  name: string;
  price: string;
  features: string[];
}

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  currentRole: string;
  targetRole: string;
  currentCompany: string;
  yearsOfExperience: string;
  currentSalary: string;
  targetSalary: string;
  preferredDate: string;
  preferredTime: string;
  communicationPreference: 'video' | 'phone';
  linkedin?: string;
  additionalNotes?: string;
}

export const INITIAL_FORM_DATA: FormData = {
  fullName: '',
  email: '',
  phone: '',
  currentRole: '',
  targetRole: '',
  currentCompany: '',
  yearsOfExperience: '',
  currentSalary: '',
  targetSalary: '',
  preferredDate: '',
  preferredTime: '',
  communicationPreference: 'video',
  linkedin: '',
  additionalNotes: ''
};
