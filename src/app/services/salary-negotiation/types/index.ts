export interface SalaryFormData {
  role: string;
  experience: number;
  location: string;
  industry: string;
  currentSalary: number;
  currentOffer?: number;
  benefits: string[];
  skills: string[];
  targetSalary?: number;
  notes?: string;
}

export interface Industry {
  id: string;
  name: string;
  icon: string;
}

export interface NegotiationStrategy {
  approach: string;
  keyPoints: string[];
  talkingPoints: string[];
  risksToAvoid: string[];
}

export interface MarketData {
  percentile: number;
  competitiveness: string;
  marketLow: number;
  marketMedian: number;
  marketHigh: number;
  growthRate: number;
  demandLevel: string;
}

export interface AIAnalysis {
  marketData: MarketData;
  strategies: NegotiationStrategy[];
  benefitsAnalysis: BenefitAnalysis[];
  recommendations: string[];
  skillsGap: string[];
}

export interface BenefitAnalysis {
  category: string;
  value: string;
  marketComparison: string;
  negotiationTip: string;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  type: 'video' | 'phone';
  notes: string;
  role?: string;
  experience?: number;
  currentSalary?: number;
  targetSalary?: number;
}

export interface NegotiationState {
  step: number;
  isAnalyzing: boolean;
  error: string | null;
  analysis: AIAnalysis | null;
}

export interface BenefitPackage {
  id: string;
  name: string;
  description: string;
  value: string;
  isNegotiable: boolean;
}

export interface CompensationPackage {
  baseSalary: number;
  bonus?: number;
  equity?: string;
  benefits: BenefitPackage[];
  totalValue: number;
}
