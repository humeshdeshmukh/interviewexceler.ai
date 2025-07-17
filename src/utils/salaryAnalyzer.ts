interface SalaryData {
  role: string;
  experience: number;
  location: string;
  industry: string;
  currentSalary: number;
  benefits: string[];
  skills: string[];
}

interface MarketData {
  marketLow: number;
  marketMedian: number;
  marketHigh: number;
  percentile: number;
  competitiveness: string;
}

interface NegotiationStrategy {
  approach: string;
  keyPoints: string[];
  talkingPoints: string[];
  risksToAvoid: string[];
}

interface BenefitsAnalysis {
  category: string;
  value: string;
  marketComparison: string;
  negotiationTip: string;
}

export const analyzeSalary = (data: SalaryData): {
  marketData: MarketData;
  strategies: NegotiationStrategy[];
  benefitsAnalysis: BenefitsAnalysis[];
} => {
  // This is a placeholder implementation
  // In a real application, this would connect to salary databases and market research APIs
  
  const marketData: MarketData = {
    marketLow: calculateMarketLow(data),
    marketMedian: calculateMarketMedian(data),
    marketHigh: calculateMarketHigh(data),
    percentile: calculatePercentile(data),
    competitiveness: determineCompetitiveness(data)
  };

  const strategies = generateNegotiationStrategies(data, marketData);
  const benefitsAnalysis = analyzeBenefits(data);

  return {
    marketData,
    strategies,
    benefitsAnalysis
  };
};

function calculateMarketLow(data: SalaryData): number {
  // Placeholder calculation
  const baseSalary = 50000;
  const experienceMultiplier = 1 + (data.experience * 0.1);
  const industryMultiplier = getIndustryMultiplier(data.industry);
  return Math.round(baseSalary * experienceMultiplier * industryMultiplier);
}

function calculateMarketMedian(data: SalaryData): number {
  // Placeholder calculation
  return Math.round(calculateMarketLow(data) * 1.2);
}

function calculateMarketHigh(data: SalaryData): number {
  // Placeholder calculation
  return Math.round(calculateMarketMedian(data) * 1.3);
}

function calculatePercentile(data: SalaryData): number {
  // Placeholder calculation
  const marketMedian = calculateMarketMedian(data);
  return Math.min(Math.round((data.currentSalary / marketMedian) * 50), 100);
}

function determineCompetitiveness(data: SalaryData): string {
  const percentile = calculatePercentile(data);
  if (percentile > 75) return "Highly Competitive";
  if (percentile > 50) return "Competitive";
  if (percentile > 25) return "Below Market";
  return "Significantly Below Market";
}

function getIndustryMultiplier(industry: string): number {
  const multipliers: { [key: string]: number } = {
    'technology': 1.5,
    'finance': 1.4,
    'healthcare': 1.3,
    'retail': 1.0,
    'manufacturing': 1.2
  };
  return multipliers[industry.toLowerCase()] || 1.2;
}

function generateNegotiationStrategies(data: SalaryData, marketData: MarketData): NegotiationStrategy[] {
  return [
    {
      approach: "Value-Based Negotiation",
      keyPoints: [
        "Highlight specific achievements and their impact",
        "Quantify contributions in terms of revenue or savings",
        "Emphasize unique skills and expertise"
      ],
      talkingPoints: [
        `Your market value is around $${marketData.marketMedian.toLocaleString()}`,
        "Your skill set is in high demand",
        "Your experience brings significant value"
      ],
      risksToAvoid: [
        "Don't focus solely on personal needs",
        "Avoid comparing to coworkers",
        "Don't make ultimatums"
      ]
    },
    {
      approach: "Market-Based Approach",
      keyPoints: [
        "Present market research data",
        "Discuss industry standards",
        "Reference similar roles and companies"
      ],
      talkingPoints: [
        "Market research shows competitive ranges",
        "Industry trends support this range",
        "Similar roles command these rates"
      ],
      risksToAvoid: [
        "Don't rely solely on online data",
        "Avoid mentioning competing offers unless real",
        "Don't exaggerate market rates"
      ]
    }
  ];
}

function analyzeBenefits(data: SalaryData): BenefitsAnalysis[] {
  return [
    {
      category: "Health Insurance",
      value: data.benefits.includes("health") ? "Included" : "Not Included",
      marketComparison: "Standard in Industry",
      negotiationTip: "Consider negotiating for better coverage or lower premiums"
    },
    {
      category: "Remote Work",
      value: data.benefits.includes("remote") ? "Available" : "Not Available",
      marketComparison: "Increasingly Common",
      negotiationTip: "Request flexible work arrangements if not offered"
    },
    {
      category: "Professional Development",
      value: data.benefits.includes("development") ? "Provided" : "Not Provided",
      marketComparison: "Variable by Company",
      negotiationTip: "Ask for training budget or conference attendance"
    },
    {
      category: "Stock Options",
      value: data.benefits.includes("stock") ? "Offered" : "Not Offered",
      marketComparison: "Common in Tech/Startups",
      negotiationTip: "Consider negotiating for equity if not offered"
    }
  ];
}

export const generateCounterOffer = (
  currentOffer: number,
  marketData: MarketData
): number => {
  const difference = marketData.marketHigh - currentOffer;
  const counterOffer = currentOffer + (difference * 0.7);
  return Math.round(counterOffer / 1000) * 1000; // Round to nearest thousand
};
