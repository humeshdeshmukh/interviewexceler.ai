import { Package } from '../types/salary-negotiation';

export const PACKAGES: Record<string, Package> = {
  standard: {
    name: 'Standard Package',
    price: '$5',
    features: [
      'One-hour consultation session',
      'Basic salary negotiation strategy',
      'Market value assessment',
      'Email follow-up support',
    ],
  },
  premium: {
    name: 'Premium Package',
    price: '$10',
    features: [
      'Two-hour in-depth consultation',
      'Advanced negotiation tactics',
      'Comprehensive market analysis',
      'Mock negotiation practice',
      'Counter-offer strategy',
      '30-day email support',
      'Priority scheduling',
    ],
  },
};

export const OFFER_STATUS_OPTIONS = [
  { value: 'expecting', label: 'Expecting an Offer' },
  { value: 'received', label: 'Received an Offer' },
  { value: 'negotiating', label: 'Currently Negotiating' },
  { value: 'multiple', label: 'Multiple Offers' },
  { value: 'preparing', label: 'Preparing for Negotiation' },
];

export const INITIAL_FORM_DATA = {
  fullName: '',
  email: '',
  phone: '',
  currentCompany: '',
  yearsOfExperience: '',
  currentSalary: '',
  targetSalary: '',
  currentRole: '',
  targetRole: '',
  preferredDate: '',
  preferredTime: '',
  communicationPreference: 'video' as const,
  offerStatus: 'expecting',
  linkedin: '',
  additionalNotes: '',
};
