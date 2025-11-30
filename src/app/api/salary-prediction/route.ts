import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// Location multipliers with currency and detailed insights
const locationData: Record<string, { multiplier: number; currency: string; insight: string; costOfLiving: string }> = {
  // US Cities
  'San Francisco': { multiplier: 1.5, currency: 'USD', insight: 'Highest tech salaries globally, very high cost of living', costOfLiving: 'Very High' },
  'New York': { multiplier: 1.4, currency: 'USD', insight: 'Financial center with diverse opportunities', costOfLiving: 'Very High' },
  'Seattle': { multiplier: 1.3, currency: 'USD', insight: 'Growing tech scene with competitive salaries', costOfLiving: 'High' },
  'Boston': { multiplier: 1.25, currency: 'USD', insight: 'Strong in biotech and education sectors', costOfLiving: 'High' },
  'Austin': { multiplier: 1.1, currency: 'USD', insight: 'Emerging tech hub with lower cost of living', costOfLiving: 'Moderate' },
  'Chicago': { multiplier: 1.2, currency: 'USD', insight: 'Diverse economy with moderate cost of living', costOfLiving: 'Moderate' },
  'Los Angeles': { multiplier: 1.35, currency: 'USD', insight: 'Entertainment and tech hub', costOfLiving: 'High' },
  'Denver': { multiplier: 1.15, currency: 'USD', insight: 'Growing tech scene with good quality of life', costOfLiving: 'Moderate' },
  'Portland': { multiplier: 1.2, currency: 'USD', insight: 'Emerging tech hub with strong work-life balance', costOfLiving: 'Moderate' },
  'San Diego': { multiplier: 1.25, currency: 'USD', insight: 'Growing biotech and tech sectors', costOfLiving: 'High' },
  'Washington DC': { multiplier: 1.3, currency: 'USD', insight: 'Strong government and defense sector jobs', costOfLiving: 'High' },
  
  // Indian Cities
  'Bangalore': { multiplier: 0.3, currency: 'INR', insight: 'India\'s Silicon Valley with highest tech salaries', costOfLiving: 'Moderate' },
  'Mumbai': { multiplier: 0.28, currency: 'INR', insight: 'Financial capital with high cost of living', costOfLiving: 'High' },
  'Delhi NCR': { multiplier: 0.27, currency: 'INR', insight: 'Major business hub with diverse opportunities', costOfLiving: 'Moderate' },
  'Hyderabad': { multiplier: 0.25, currency: 'INR', insight: 'Growing tech center with reasonable cost of living', costOfLiving: 'Low' },
  'Pune': { multiplier: 0.24, currency: 'INR', insight: 'Emerging IT hub with good quality of life', costOfLiving: 'Low' },
  'Chennai': { multiplier: 0.24, currency: 'INR', insight: 'Strong in manufacturing and IT sectors', costOfLiving: 'Low' },
  'Ahmedabad': { multiplier: 0.22, currency: 'INR', insight: 'Emerging business hub with lower living costs', costOfLiving: 'Low' },
  'Kolkata': { multiplier: 0.23, currency: 'INR', insight: 'Major economic center in Eastern India', costOfLiving: 'Low' },
  'Indore': { multiplier: 0.21, currency: 'INR', insight: 'Growing IT and education hub', costOfLiving: 'Low' },
  'Chandigarh': { multiplier: 0.22, currency: 'INR', insight: 'Well-planned city with good quality of life', costOfLiving: 'Low' },
  'Jaipur': { multiplier: 0.21, currency: 'INR', insight: 'Growing IT and startup ecosystem', costOfLiving: 'Low' },
  'Kochi': { multiplier: 0.22, currency: 'INR', insight: 'Major IT and startup hub in South India', costOfLiving: 'Low' },
  'Thiruvananthapuram': { multiplier: 0.21, currency: 'INR', insight: 'Growing IT sector with good work-life balance', costOfLiving: 'Low' },
  'Bhubaneswar': { multiplier: 0.20, currency: 'INR', insight: 'Emerging IT hub with affordable living', costOfLiving: 'Low' },
  'Nagpur': { multiplier: 0.20, currency: 'INR', insight: 'Central India\'s major commercial hub', costOfLiving: 'Low' },
  'Coimbatore': { multiplier: 0.21, currency: 'INR', insight: 'Industrial city with growing IT sector', costOfLiving: 'Low' },
  'Lucknow': { multiplier: 0.20, currency: 'INR', insight: 'Major cultural and business center', costOfLiving: 'Low' },
  'Gurgaon': { multiplier: 0.26, currency: 'INR', insight: 'Corporate hub with many multinational companies', costOfLiving: 'Moderate' },
  'Noida': { multiplier: 0.25, currency: 'INR', insight: 'Major IT and business process outsourcing hub', costOfLiving: 'Moderate' },
  
  // European Cities
  'London': { multiplier: 1.4, currency: 'GBP', insight: 'Major financial center with high salaries and living costs', costOfLiving: 'Very High' },
  'Berlin': { multiplier: 1.1, currency: 'EUR', insight: 'Growing startup scene with moderate living costs', costOfLiving: 'Moderate' },
  'Amsterdam': { multiplier: 1.2, currency: 'EUR', insight: 'Tech-friendly with good work-life balance', costOfLiving: 'High' },
  'Paris': { multiplier: 1.3, currency: 'EUR', insight: 'Strong in fashion, tech, and finance', costOfLiving: 'High' },
  'Dublin': { multiplier: 1.25, currency: 'EUR', insight: 'Tech hub with many multinational companies', costOfLiving: 'High' },
  'Munich': { multiplier: 1.25, currency: 'EUR', insight: 'Strong in automotive and tech sectors', costOfLiving: 'High' },
  'Stockholm': { multiplier: 1.3, currency: 'EUR', insight: 'Innovation hub with high quality of life', costOfLiving: 'High' },
  'Zurich': { multiplier: 1.45, currency: 'EUR', insight: 'Financial center with highest European salaries', costOfLiving: 'Very High' },
  'Copenhagen': { multiplier: 1.2, currency: 'EUR', insight: 'High quality of life with good work-life balance', costOfLiving: 'High' },
  'Oslo': { multiplier: 1.3, currency: 'EUR', insight: 'High salaries with excellent quality of life', costOfLiving: 'Very High' },
  'Helsinki': { multiplier: 1.2, currency: 'EUR', insight: 'Strong tech sector with good work-life balance', costOfLiving: 'High' },
  'Barcelona': { multiplier: 1.1, currency: 'EUR', insight: 'Growing tech scene with moderate living costs', costOfLiving: 'Moderate' },
  'Madrid': { multiplier: 1.15, currency: 'EUR', insight: 'Major business center with moderate costs', costOfLiving: 'Moderate' },
  'Milan': { multiplier: 1.2, currency: 'EUR', insight: 'Fashion and business hub', costOfLiving: 'High' },
  'Vienna': { multiplier: 1.25, currency: 'EUR', insight: 'High quality of life with good salaries', costOfLiving: 'High' },
  'Warsaw': { multiplier: 1.0, currency: 'EUR', insight: 'Growing tech hub with lower living costs', costOfLiving: 'Low' },
  
  // APAC Cities
  'Singapore': { multiplier: 1.35, currency: 'USD', insight: 'Major financial hub with high salaries and living costs', costOfLiving: 'Very High' },
  'Tokyo': { multiplier: 1.3, currency: 'USD', insight: 'Technology and finance center with unique work culture', costOfLiving: 'Very High' },
  'Hong Kong': { multiplier: 1.35, currency: 'USD', insight: 'Financial center with high cost of living', costOfLiving: 'Very High' },
  'Sydney': { multiplier: 1.3, currency: 'USD', insight: 'Major tech and financial hub in Australia', costOfLiving: 'High' },
  'Melbourne': { multiplier: 1.25, currency: 'USD', insight: 'Growing tech scene with good quality of life', costOfLiving: 'High' },
  'Seoul': { multiplier: 1.2, currency: 'USD', insight: 'Technology and entertainment hub', costOfLiving: 'High' },
  'Shanghai': { multiplier: 1.25, currency: 'USD', insight: 'Major financial and tech center', costOfLiving: 'High' },
  'Beijing': { multiplier: 1.2, currency: 'USD', insight: 'Technology and government center', costOfLiving: 'High' },
  'Taipei': { multiplier: 1.15, currency: 'USD', insight: 'Technology hub with good quality of life', costOfLiving: 'Moderate' },
  'Bangkok': { multiplier: 1.0, currency: 'USD', insight: 'Growing tech scene with lower living costs', costOfLiving: 'Low' },
  'Jakarta': { multiplier: 0.9, currency: 'USD', insight: 'Emerging tech hub with very low living costs', costOfLiving: 'Low' },
  'Kuala Lumpur': { multiplier: 1.0, currency: 'USD', insight: 'Growing tech scene with moderate costs', costOfLiving: 'Low' },
  'Manila': { multiplier: 0.9, currency: 'USD', insight: 'Emerging tech hub with low living costs', costOfLiving: 'Low' },
  'Brisbane': { multiplier: 1.2, currency: 'USD', insight: 'Growing tech scene with good quality of life', costOfLiving: 'Moderate' },
  'Perth': { multiplier: 1.15, currency: 'USD', insight: 'Mining and tech hub with good lifestyle', costOfLiving: 'Moderate' },
  
  // Remote
  'Remote': { multiplier: 1.0, currency: 'USD', insight: 'Location-independent with salary often based on company location', costOfLiving: 'Variable' },
};

// Currency mapping based on location
const getCurrencyByLocation = (location: string): string => {
  // Check if we have specific location data
  const locationInfo = locationData[location];
  if (locationInfo) {
    return locationInfo.currency;
  }

  // Fallback to country-based detection
  const locationMap: { [key: string]: string } = {
    'United States': 'USD',
    'India': 'INR',
    'United Kingdom': 'GBP',
    'Canada': 'CAD',
    'Australia': 'AUD',
    'Germany': 'EUR',
    'France': 'EUR',
    'Japan': 'JPY',
    'Singapore': 'SGD',
    // Add more mappings as needed
  };

  // Check for country names in the location string
  for (const [country, currency] of Object.entries(locationMap)) {
    if (location.toLowerCase().includes(country.toLowerCase())) {
      return currency;
    }
  }
  return 'USD'; // Default to USD
};

const generateFallbackPrediction = (data: any) => {
  const { role, industry, location, experience, education, skills, companySize, workMode, employmentType } = data;
  
  // Base salary ranges by role and industry
  const baseSalaries: Record<string, Record<string, { min: number; max: number }>> = {
    'Technology': {
      'Software Engineer': { min: 80000, max: 150000 },
      'Data Scientist': { min: 90000, max: 160000 },
      'Product Manager': { min: 100000, max: 180000 },
      'DevOps Engineer': { min: 85000, max: 155000 },
      'UI/UX Designer': { min: 70000, max: 130000 },
      'Full Stack Developer': { min: 75000, max: 140000 },
      'Mobile Developer': { min: 80000, max: 145000 },
      'Cloud Architect': { min: 110000, max: 200000 },
    },
    'Finance': {
      'Financial Analyst': { min: 70000, max: 120000 },
      'Investment Banker': { min: 100000, max: 200000 },
      'Risk Manager': { min: 80000, max: 150000 },
      'Quantitative Analyst': { min: 90000, max: 180000 },
      'Financial Controller': { min: 85000, max: 160000 },
    },
    'Healthcare': {
      'Medical Doctor': { min: 150000, max: 300000 },
      'Nurse Practitioner': { min: 80000, max: 140000 },
      'Healthcare Administrator': { min: 70000, max: 130000 },
      'Pharmacist': { min: 90000, max: 160000 },
    },
    'Consulting': {
      'Management Consultant': { min: 100000, max: 200000 },
      'Strategy Consultant': { min: 110000, max: 220000 },
      'Business Analyst': { min: 75000, max: 140000 },
      'IT Consultant': { min: 85000, max: 160000 },
    },
  };



  // Experience multipliers
  const experienceMultiplier = Math.min(1.8, 0.8 + (experience * 0.1));
  
  // Education multipliers
  const educationMultipliers: Record<string, number> = {
    'High School': 0.8,
    'Associate': 0.9,
    'Bachelor': 1.0,
    'Master': 1.2,
    'PhD': 1.4,
    'MBA': 1.3,
  };

  // Get base salary
  const baseSalary = baseSalaries[industry]?.[role] || { min: 70000, max: 130000 };
  const locationInfo = locationData[location] || { multiplier: 1.0, currency: 'USD', insight: 'Location data not available', costOfLiving: 'Moderate' };
  const educationMultiplier = educationMultipliers[education] || 1.0;
  const skillsMultiplier = Math.min(1.3, 1 + (skills?.length * 0.05) || 1);

  // Calculate salary range
  const minSalary = Math.round(baseSalary.min * locationInfo.multiplier * educationMultiplier * experienceMultiplier * skillsMultiplier);
  const maxSalary = Math.round(baseSalary.max * locationInfo.multiplier * educationMultiplier * experienceMultiplier * skillsMultiplier);
  const averageSalary = Math.round((minSalary + maxSalary) / 2);

  // Format salary based on currency
  const formatSalary = (amount: number) => {
    if (locationInfo.currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    } else if (locationInfo.currency === 'GBP') {
      return `£${amount.toLocaleString('en-GB')}`;
    } else if (locationInfo.currency === 'EUR') {
      return `€${amount.toLocaleString('en-EU')}`;
    } else {
      return `$${amount.toLocaleString('en-US')}`;
    }
  };

  return {
    salaryRange: {
      min: minSalary,
      average: averageSalary,
      max: maxSalary
    },
    currency: locationInfo.currency,
    keyFactors: [
      `Experience level (${experience} years)`,
      `Education (${education})`,
      `Location (${location}) - ${locationInfo.costOfLiving} cost of living`,
      `Industry (${industry})`,
      `Skills (${skills?.length || 0} skills)`
    ],
    marketInsights: [
      locationInfo.insight,
      `${location} has ${locationInfo.costOfLiving.toLowerCase()} cost of living`,
      `${industry} industry shows strong growth potential`,
      `${role} positions are in high demand in ${location}`,
      `Remote work options may affect salary expectations`
    ],
    negotiationTips: [
      `Research market rates for ${role} in ${location}`,
      'Highlight your unique skills and experience',
      'Consider total compensation including benefits',
      'Be prepared to discuss your value proposition',
      `Negotiate based on ${location} market conditions`
    ],
    benefitsAnalysis: [
      'Health insurance and retirement benefits',
      'Stock options or equity compensation',
      'Professional development opportunities',
      'Work-life balance considerations',
      'Remote work flexibility'
    ]
  };
};

const cleanJsonString = (text: string): string => {
  // Remove markdown code block syntax
  text = text.replace(/```json\n/g, '').replace(/```/g, '');
  
  // Remove any leading/trailing whitespace
  text = text.trim();
  
  // Handle potential line breaks and formatting
  try {
    // First try parsing as is
    JSON.parse(text);
    return text;
  } catch {
    // If that fails, try to clean up the string more aggressively
    text = text.replace(/\\n/g, ' ')
               .replace(/\n/g, ' ')
               .replace(/\r/g, '')
               .replace(/\t/g, '')
               .replace(/\s+/g, ' ')
               .trim();
    
    // If the string doesn't start with {, try to find the first {
    if (!text.startsWith('{')) {
      const startIndex = text.indexOf('{');
      if (startIndex !== -1) {
        text = text.slice(startIndex);
      }
    }
    
    // If the string doesn't end with }, try to find the last }
    if (!text.endsWith('}')) {
      const endIndex = text.lastIndexOf('}');
      if (endIndex !== -1) {
        text = text.slice(0, endIndex + 1);
      }
    }
    
    return text;
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      role,
      industry,
      location,
      experience,
      education,
      skills,
      companySize,
      workMode,
      employmentType,
      currentSalary,
      benefits,
      certifications,
      languages,
      managementLevel,
      projectCount,
      teamSize,
    } = body;

    const currency = getCurrencyByLocation(location);

    const prompt = `You are a salary prediction expert. Based on the following information, provide a detailed salary analysis in JSON format. Focus on accuracy and current market rates for ${location}. Consider local market conditions, cost of living, and industry standards.

Role: ${role}
Industry: ${industry}
Location: ${location}
Experience: ${experience}
Education: ${education}
Skills: ${skills}
Company Size: ${companySize}
Work Mode: ${workMode}
Employment Type: ${employmentType}
Current Salary: ${currentSalary || 'Not provided'}
Benefits: ${benefits?.join(', ') || 'Not specified'}
Certifications: ${certifications?.join(', ') || 'None'}
Languages: ${languages?.join(', ') || 'Not specified'}
Management Level: ${managementLevel || 'Not specified'}
Project Count: ${projectCount || 'Not specified'}
Team Size: ${teamSize || 'Not specified'}

Return ONLY a JSON object in this exact format (no markdown, no explanation):
{
  "salaryRange": {
    "min": number,
    "average": number,
    "max": number
  },
  "currency": "${currency}",
  "keyFactors": ["factor1", "factor2", ...],
  "marketInsights": ["insight1", "insight2", ...],
  "negotiationTips": ["tip1", "tip2", ...],
  "benefitsAnalysis": ["benefit1", "benefit2", ...]
}`;

    // Try to use Gemini API if available
    if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        
        try {
          // Clean and parse the response
          const cleanedText = cleanJsonString(text);
          const parsedData = JSON.parse(cleanedText);
          
          // Validate the required fields
          if (!parsedData.salaryRange || !parsedData.currency || !parsedData.keyFactors) {
            throw new Error('Invalid response structure');
          }
          
          return NextResponse.json(parsedData);
        } catch (error) {
          console.error('Error parsing AI response:', error);
          // Fall through to fallback
        }
      } catch (error) {
        console.error('Error calling Gemini API:', error);
        // Fall through to fallback
      }
    }
    
    // Fallback: Generate salary prediction using local logic
    const fallbackPrediction = generateFallbackPrediction(body);
    return NextResponse.json(fallbackPrediction);
  } catch (error) {
    console.error('Salary prediction error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate salary prediction. Please try again.' 
    }, { status: 500 });
  }
}
