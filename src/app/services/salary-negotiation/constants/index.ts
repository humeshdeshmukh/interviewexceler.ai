import { Industry } from '../types';

export const INDUSTRIES: Industry[] = [
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'finance', name: 'Finance', icon: '💰' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { id: 'retail', name: 'Retail', icon: '🛍️' },
  { id: 'manufacturing', name: 'Manufacturing', icon: '🏭' },
  { id: 'consulting', name: 'Consulting', icon: '📊' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'media', name: 'Media & Entertainment', icon: '🎬' },
];

export const EXPERIENCE_LEVELS = [
  { id: 'entry', name: 'Entry Level (0-2 years)', range: [0, 2] },
  { id: 'junior', name: 'Junior (2-5 years)', range: [2, 5] },
  { id: 'mid', name: 'Mid-Level (5-8 years)', range: [5, 8] },
  { id: 'senior', name: 'Senior (8-12 years)', range: [8, 12] },
  { id: 'lead', name: 'Lead/Principal (12+ years)', range: [12, null] },
];

export const COMMON_BENEFITS = [
  { id: 'health', name: 'Health Insurance', icon: '🏥', category: 'Health & Wellness' },
  { id: 'dental', name: 'Dental Insurance', icon: '🦷', category: 'Health & Wellness' },
  { id: 'vision', name: 'Vision Insurance', icon: '👓', category: 'Health & Wellness' },
  { id: '401k', name: '401(k) Match', icon: '💰', category: 'Financial' },
  { id: 'equity', name: 'Stock Options/RSUs', icon: '📈', category: 'Financial' },
  { id: 'bonus', name: 'Performance Bonus', icon: '🎯', category: 'Financial' },
  { id: 'remote', name: 'Remote Work', icon: '🏠', category: 'Lifestyle' },
  { id: 'flexible', name: 'Flexible Hours', icon: '⏰', category: 'Lifestyle' },
  { id: 'pto', name: 'Paid Time Off', icon: '✈️', category: 'Lifestyle' },
  { id: 'parental', name: 'Parental Leave', icon: '👶', category: 'Lifestyle' },
  { id: 'education', name: 'Education Stipend', icon: '📚', category: 'Development' },
  { id: 'training', name: 'Professional Training', icon: '🎓', category: 'Development' },
];

export const COMMON_SKILLS = [
  { id: 'leadership', name: 'Leadership', category: 'Management' },
  { id: 'project_mgmt', name: 'Project Management', category: 'Management' },
  { id: 'team_mgmt', name: 'Team Management', category: 'Management' },
  { id: 'communication', name: 'Communication', category: 'Soft Skills' },
  { id: 'negotiation', name: 'Negotiation', category: 'Soft Skills' },
  { id: 'problem_solving', name: 'Problem Solving', category: 'Technical' },
  { id: 'analytics', name: 'Analytics', category: 'Technical' },
  { id: 'strategy', name: 'Strategic Planning', category: 'Business' },
];

export const NEGOTIATION_TIPS = [
  {
    id: 'research',
    title: 'Do Your Research',
    description: 'Research market rates and company compensation practices',
    icon: '🔍'
  },
  {
    id: 'value',
    title: 'Demonstrate Value',
    description: 'Highlight achievements and quantify your impact',
    icon: '📊'
  },
  {
    id: 'timing',
    title: 'Perfect Timing',
    description: 'Choose the right moment to negotiate',
    icon: '⏰'
  },
  {
    id: 'practice',
    title: 'Practice',
    description: 'Rehearse your negotiation points and responses',
    icon: '🎯'
  },
];

export const NEGOTIATION_SCRIPTS = [
  {
    scenario: 'Initial Offer Response',
    script: 'Thank you for the offer. I appreciate the opportunity...',
    tips: ['Express gratitude', 'Stay professional', 'Be confident']
  },
  {
    scenario: 'Counter Offer',
    script: 'Based on my research and experience, I was expecting...',
    tips: ['Use market data', 'Be specific', 'Remain flexible']
  },
  {
    scenario: 'Benefits Discussion',
    script: 'Could we discuss the complete compensation package...',
    tips: ['Consider total package', 'Prioritize benefits', 'Be open to alternatives']
  },
];

export const MARKET_INSIGHTS = {
  salaryRanges: {
    technology: { low: 80000, median: 120000, high: 180000 },
    finance: { low: 90000, median: 130000, high: 200000 },
    healthcare: { low: 70000, median: 100000, high: 150000 },
  },
  growthRates: {
    technology: 12,
    finance: 8,
    healthcare: 10,
  },
  demandLevels: {
    technology: 'High',
    finance: 'Moderate',
    healthcare: 'Very High',
  },
};

export const COMMON_MISTAKES = [
  {
    id: 'no_research',
    title: 'Lack of Research',
    description: 'Not knowing market rates or company standards',
    solution: 'Research thoroughly using reliable sources'
  },
  {
    id: 'early_number',
    title: 'Giving Number Too Early',
    description: 'Sharing salary expectations prematurely',
    solution: 'Wait for employer to make first offer'
  },
  {
    id: 'emotional',
    title: 'Getting Emotional',
    description: 'Letting emotions drive the negotiation',
    solution: 'Stay professional and data-driven'
  },
];

export const BREAKPOINTS = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
};
