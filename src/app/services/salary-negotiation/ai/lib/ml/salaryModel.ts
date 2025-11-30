export interface SalaryFactors {
  experience: number;
  education: string;
  skills: string[];
  industry: string;
  location: string;
  role: string;
  currency?: string;
}

export interface SalaryPrediction {
  prediction: number;
  range: {
    min: number;
    max: number;
  };
  confidence: number;
  insights: {
    experienceImpact: string;
    educationImpact: string;
    locationImpact: string;
    skillsImpact: string;
  };
  marketInsights: {
    marketTrends: {
      growthRate: number;
      demandLevel: string;
      futureOutlook: string;
      competitionLevel: string;
    };
    salaryRange: {
      entry: number;
      median: number;
      senior: number;
    };
    locationInsight: string;
    careerProgression: string[];
  };
  currency: string;
}

export class SalaryModel {
  private readonly baselineSalaries: Record<string, Record<string, { usd: number; inr?: number; eur?: number; gbp?: number }>> = {
    'Technology': {
      'Software Engineer': { usd: 100000, inr: 1500000, eur: 85000, gbp: 75000 },
      'Data Scientist': { usd: 110000, inr: 1800000, eur: 90000, gbp: 80000 },
      'Product Manager': { usd: 120000, inr: 2500000, eur: 95000, gbp: 85000 },
      'DevOps Engineer': { usd: 105000, inr: 1700000, eur: 88000, gbp: 78000 },
      'UI/UX Designer': { usd: 90000, inr: 1400000, eur: 75000, gbp: 65000 },
      'Full Stack Developer': { usd: 95000, inr: 1600000, eur: 80000, gbp: 70000 },
      'Mobile Developer': { usd: 98000, inr: 1650000, eur: 82000, gbp: 72000 },
      'Cloud Architect': { usd: 130000, inr: 2800000, eur: 110000, gbp: 95000 },
    },
    'Finance': {
      'Financial Analyst': { usd: 85000, inr: 1200000, eur: 70000, gbp: 60000 },
      'Investment Banker': { usd: 130000, inr: 3000000, eur: 110000, gbp: 100000 },
      'Risk Manager': { usd: 95000, inr: 1800000, eur: 80000, gbp: 70000 },
      'Quantitative Analyst': { usd: 120000, inr: 2500000, eur: 100000, gbp: 90000 },
      'Financial Controller': { usd: 110000, inr: 2200000, eur: 92000, gbp: 82000 },
    },
    'Healthcare': {
      'Medical Doctor': { usd: 200000, inr: 3500000, eur: 170000, gbp: 150000 },
      'Nurse Practitioner': { usd: 110000, inr: 1500000, eur: 90000, gbp: 80000 },
      'Healthcare Administrator': { usd: 90000, inr: 1300000, eur: 75000, gbp: 65000 },
      'Pharmacist': { usd: 120000, inr: 1800000, eur: 100000, gbp: 90000 },
    },
    'Consulting': {
      'Management Consultant': { usd: 140000, inr: 2800000, eur: 115000, gbp: 100000 },
      'Strategy Consultant': { usd: 150000, inr: 3000000, eur: 125000, gbp: 110000 },
      'Business Analyst': { usd: 95000, inr: 1600000, eur: 80000, gbp: 70000 },
      'IT Consultant': { usd: 110000, inr: 2000000, eur: 92000, gbp: 82000 },
    },
  };

  private readonly locationMultipliers: Record<string, { multiplier: number; currency: string; insight: string }> = {
    // Indian Metro Cities
    'Bangalore': { multiplier: 1.3, currency: 'INR', insight: 'India\'s Silicon Valley with highest tech salaries.' },
    'Mumbai': { multiplier: 1.25, currency: 'INR', insight: 'Financial capital with high cost of living.' },
    'Delhi NCR': { multiplier: 1.2, currency: 'INR', insight: 'Major business hub with diverse opportunities.' },
    'Hyderabad': { multiplier: 1.15, currency: 'INR', insight: 'Growing tech center with reasonable cost of living.' },
    'Pune': { multiplier: 1.1, currency: 'INR', insight: 'Emerging IT hub with good quality of life.' },
    'Chennai': { multiplier: 1.1, currency: 'INR', insight: 'Strong in manufacturing and IT sectors.' },
    
    // Indian Tier 2 Cities
    'Ahmedabad': { multiplier: 0.95, currency: 'INR', insight: 'Emerging business hub with lower living costs.' },
    'Kolkata': { multiplier: 1.0, currency: 'INR', insight: 'Major economic center in Eastern India.' },
    'Indore': { multiplier: 0.9, currency: 'INR', insight: 'Growing IT and education hub.' },
    'Chandigarh': { multiplier: 0.95, currency: 'INR', insight: 'Well-planned city with good quality of life.' },
    'Jaipur': { multiplier: 0.9, currency: 'INR', insight: 'Growing IT and startup ecosystem.' },
    'Kochi': { multiplier: 0.95, currency: 'INR', insight: 'Major IT and startup hub in South India.' },
    'Thiruvananthapuram': { multiplier: 0.9, currency: 'INR', insight: 'Growing IT sector with good work-life balance.' },
    'Bhubaneswar': { multiplier: 0.85, currency: 'INR', insight: 'Emerging IT hub with affordable living.' },
    'Nagpur': { multiplier: 0.85, currency: 'INR', insight: 'Central India\'s major commercial hub.' },
    'Coimbatore': { multiplier: 0.9, currency: 'INR', insight: 'Industrial city with growing IT sector.' },
    'Lucknow': { multiplier: 0.85, currency: 'INR', insight: 'Major cultural and business center.' },
    'Gurgaon': { multiplier: 1.15, currency: 'INR', insight: 'Corporate hub with many multinational companies.' },
    'Noida': { multiplier: 1.1, currency: 'INR', insight: 'Major IT and business process outsourcing hub.' },
    
    // US Cities
    'San Francisco': { multiplier: 1.5, currency: 'USD', insight: 'Tech hub with highest salaries but very high cost of living.' },
    'New York': { multiplier: 1.4, currency: 'USD', insight: 'Financial center with diverse opportunities and high cost of living.' },
    'Seattle': { multiplier: 1.3, currency: 'USD', insight: 'Growing tech scene with competitive salaries.' },
    'Boston': { multiplier: 1.25, currency: 'USD', insight: 'Strong in biotech and education sectors.' },
    'Austin': { multiplier: 1.1, currency: 'USD', insight: 'Emerging tech hub with lower cost of living.' },
    'Chicago': { multiplier: 1.2, currency: 'USD', insight: 'Diverse economy with moderate cost of living.' },
    'Los Angeles': { multiplier: 1.35, currency: 'USD', insight: 'Entertainment and tech hub with high cost of living.' },
    'Denver': { multiplier: 1.15, currency: 'USD', insight: 'Growing tech scene with good quality of life.' },
    'Portland': { multiplier: 1.2, currency: 'USD', insight: 'Emerging tech hub with strong work-life balance.' },
    'San Diego': { multiplier: 1.25, currency: 'USD', insight: 'Growing biotech and tech sectors.' },
    'Washington DC': { multiplier: 1.3, currency: 'USD', insight: 'Strong government and defense sector jobs.' },
    
    // European Cities
    'London': { multiplier: 1.4, currency: 'GBP', insight: 'Major financial center with high salaries and living costs.' },
    'Berlin': { multiplier: 1.1, currency: 'EUR', insight: 'Growing startup scene with moderate living costs.' },
    'Amsterdam': { multiplier: 1.2, currency: 'EUR', insight: 'Tech-friendly with good work-life balance.' },
    'Paris': { multiplier: 1.3, currency: 'EUR', insight: 'Strong in fashion, tech, and finance.' },
    'Dublin': { multiplier: 1.25, currency: 'EUR', insight: 'Tech hub with many multinational companies.' },
    'Munich': { multiplier: 1.25, currency: 'EUR', insight: 'Strong in automotive and tech sectors.' },
    'Stockholm': { multiplier: 1.3, currency: 'EUR', insight: 'Innovation hub with high quality of life.' },
    'Zurich': { multiplier: 1.45, currency: 'EUR', insight: 'Financial center with highest European salaries.' },
    
    // APAC Cities
    'Singapore': { multiplier: 1.35, currency: 'USD', insight: 'Major financial hub with high salaries and living costs.' },
    'Tokyo': { multiplier: 1.3, currency: 'USD', insight: 'Technology and finance center with unique work culture.' },
    'Hong Kong': { multiplier: 1.35, currency: 'USD', insight: 'Financial center with high cost of living.' },
    'Sydney': { multiplier: 1.3, currency: 'USD', insight: 'Major tech and financial hub in Australia.' },
    'Melbourne': { multiplier: 1.25, currency: 'USD', insight: 'Growing tech scene with good quality of life.' },
    'Seoul': { multiplier: 1.2, currency: 'USD', insight: 'Technology and entertainment hub.' },
    
    // Remote
    'Remote': { multiplier: 1.0, currency: 'USD', insight: 'Location-independent with salary often based on company location.' },
  };

  private readonly educationMultipliers: Record<string, number> = {
    'High School': 0.8,
    'Associate': 0.9,
    'Bachelor': 1.0,
    'Master': 1.2,
    'PhD': 1.4,
    'MBA': 1.3,
  };

  private readonly experienceMultipliers = {
    entry: (years: number) => Math.min(1.0, 0.8 + years * 0.05),
    mid: (years: number) => Math.min(1.3, 1.0 + (years - 3) * 0.06),
    senior: (years: number) => Math.min(1.8, 1.3 + (years - 8) * 0.05),
  };

  private readonly marketDemand: Record<string, Record<string, { growth: number; demand: number }>> = {
    'Technology': {
      'Software Engineer': { growth: 0.15, demand: 0.9 },
      'Data Scientist': { growth: 0.18, demand: 0.95 },
      'DevOps Engineer': { growth: 0.16, demand: 0.85 },
      'Full Stack Developer': { growth: 0.14, demand: 0.88 },
      'Mobile Developer': { growth: 0.13, demand: 0.86 },
      'Cloud Architect': { growth: 0.17, demand: 0.92 },
    },
    'Finance': {
      'Financial Analyst': { growth: 0.1, demand: 0.8 },
      'Investment Banker': { growth: 0.08, demand: 0.75 },
      'Risk Manager': { growth: 0.12, demand: 0.82 },
    },
    'Healthcare': {
      'Medical Doctor': { growth: 0.08, demand: 0.9 },
      'Healthcare Administrator': { growth: 0.1, demand: 0.85 },
      'Pharmacist': { growth: 0.07, demand: 0.8 },
    },
    'Consulting': {
      'Management Consultant': { growth: 0.12, demand: 0.85 },
      'Strategy Consultant': { growth: 0.13, demand: 0.87 },
      'Business Analyst': { growth: 0.11, demand: 0.83 },
    },
  };

  private calculateExperienceMultiplier(years: number): number {
    if (years < 3) return this.experienceMultipliers.entry(years);
    if (years < 8) return this.experienceMultipliers.mid(years);
    return this.experienceMultipliers.senior(years);
  }

  private calculateSkillsMultiplier(skills: string[]): number {
    // Diminishing returns for number of skills
    return Math.min(1.3, 1 + (skills.length * 0.05));
  }

  private calculateMarketDemandMultiplier(industry: string, role: string): number {
    const defaultDemand = { growth: 0.05, demand: 0.5 };
    const marketData = this.marketDemand[industry]?.[role] || defaultDemand;
    return 1 + (marketData.growth * 0.5 + marketData.demand * 0.5);
  }

  public calculateCompetitionLevel(location: string, role: string): string {
    const locationFactor = this.locationMultipliers[location]?.multiplier || 1;
    if (locationFactor > 1.3) return 'High';
    if (locationFactor > 1.1) return 'Medium';
    return 'Low';
  }

  private getCareerProgression(role: string): string[] {
    // Simplified career progression paths
    const progressions: Record<string, string[]> = {
      'Software Engineer': [
        'Senior Software Engineer',
        'Lead Software Engineer',
        'Software Architect',
        'Engineering Manager',
        'CTO'
      ],
      // Add more progression paths
    };
    return progressions[role] || [];
  }

  public predict(factors: SalaryFactors): SalaryPrediction {
    const locationInfo = this.locationMultipliers[factors.location] || { multiplier: 1, currency: 'USD', insight: 'Location data not available' };
    const baseSalaryInfo = this.baselineSalaries[factors.industry]?.[factors.role] || { usd: 80000, inr: 1200000, eur: 65000, gbp: 55000 };
    
    // Get base salary in the appropriate currency
    let baseSalary: number;
    switch(locationInfo.currency) {
      case 'INR':
        baseSalary = baseSalaryInfo.inr || baseSalaryInfo.usd * 75; // Approximate conversion
        break;
      case 'EUR':
        baseSalary = baseSalaryInfo.eur || baseSalaryInfo.usd * 0.85;
        break;
      case 'GBP':
        baseSalary = baseSalaryInfo.gbp || baseSalaryInfo.usd * 0.75;
        break;
      default:
        baseSalary = baseSalaryInfo.usd;
    }

    const locationMultiplier = locationInfo.multiplier;
    const educationMultiplier = this.educationMultipliers[factors.education] || 1;
    const experienceMultiplier = this.calculateExperienceMultiplier(factors.experience);
    const skillsMultiplier = this.calculateSkillsMultiplier(factors.skills);
    const marketDemandMultiplier = this.calculateMarketDemandMultiplier(factors.industry, factors.role);

    const prediction = Math.round(
      baseSalary *
      locationMultiplier *
      educationMultiplier *
      experienceMultiplier *
      skillsMultiplier *
      marketDemandMultiplier
    );

    const range = {
      min: Math.round(prediction * 0.9),
      max: Math.round(prediction * 1.1)
    };

    const marketData = this.marketDemand[factors.industry]?.[factors.role] || { growth: 0.05, demand: 0.5 };

    return {
      prediction,
      range,
      confidence: 0.85,
      insights: {
        experienceImpact: this.getExperienceImpact(factors.experience),
        educationImpact: this.getEducationImpact(factors.education),
        locationImpact: this.getLocationImpact(factors.location),
        skillsImpact: this.getSkillsImpact(factors.skills.length)
      },
      marketInsights: {
        marketTrends: {
          growthRate: marketData.growth,
          demandLevel: marketData.demand > 0.7 ? 'High' : marketData.demand > 0.4 ? 'Medium' : 'Low',
          futureOutlook: this.getFutureOutlook(marketData.growth),
          competitionLevel: this.calculateCompetitionLevel(factors.location, factors.role)
        },
        salaryRange: {
          entry: Math.round(baseSalary * 0.7),
          median: baseSalary,
          senior: Math.round(baseSalary * 1.5)
        },
        locationInsight: locationInfo.insight,
        careerProgression: this.getCareerProgression(factors.role)
      },
      currency: locationInfo.currency
    };
  }

  private getExperienceImpact(years: number): string {
    if (years < 3) return 'Entry level experience. Focus on skill development to increase value.';
    if (years < 8) return 'Mid-level experience. Consider specializing in high-demand areas.';
    return 'Senior level experience. Leadership roles could provide additional value.';
  }

  private getEducationImpact(education: string): string {
    const impacts: Record<string, string> = {
      'High School': 'Consider additional certifications or formal education to increase earning potential.',
      'Associate': "Bachelor's degree could significantly increase salary potential.",
      'Bachelor': 'Advanced degree or specialized certifications could provide salary boost.',
      'Master': 'Strong educational background. Consider industry certifications for specialization.',
      'PhD': 'Highest educational qualification. Focus on practical experience and leadership.',
      'MBA': 'Strong business acumen. Consider technical certifications if in technical role.'
    };
    return impacts[education] || 'Consider formal education or certifications to increase value.';
  }

  private getLocationImpact(location: string): string {
    const multiplier = this.locationMultipliers[location]?.multiplier || 1;
    if (multiplier > 1.3) return 'High cost of living area with competitive salaries.';
    if (multiplier > 1.1) return 'Moderate cost of living with good salary potential.';
    return 'Lower cost of living area. Consider remote opportunities.';
  }

  private getSkillsImpact(skillCount: number): string {
    if (skillCount > 8) return 'Diverse skill set. Focus on mastering key skills.';
    if (skillCount > 5) return 'Good skill range. Consider adding complementary skills.';
    return 'Build your skill set with in-demand technologies.';
  }

  private getFutureOutlook(growth: number): string {
    if (growth > 0.15) return 'Excellent growth prospects in coming years.';
    if (growth > 0.08) return 'Good growth expected in this field.';
    return 'Moderate growth expected. Stay updated with industry trends.';
  }

  private getLocationInsight(location: string): string {
    const insights: Record<string, string> = {
      'San Francisco': 'Tech hub with high salaries but very high cost of living.',
      'New York': 'Financial center with diverse opportunities and high cost of living.',
      'Seattle': 'Growing tech scene with competitive salaries.',
      'Austin': 'Emerging tech hub with lower cost of living.',
      'Remote': 'Location-independent with salary often based on company location.',
    };
    return insights[location] || 'Consider cost of living and local job market.';
  }
}
