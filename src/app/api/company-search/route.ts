import { NextResponse } from 'next/server';
import Fuse, { FuseResult } from 'fuse.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// Sample company data for fallback
const sampleCompanies = [
  {
    name: "Google",
    industry: "Technology",
    size: "100,000+ employees",
    location: "Mountain View, CA",
    salaryRange: {
      min: 120000,
      max: 250000,
      currency: "USD"
    }
  },
  {
    name: "Microsoft",
    industry: "Technology",
    size: "200,000+ employees",
    location: "Redmond, WA",
    salaryRange: {
      min: 110000,
      max: 220000,
      currency: "USD"
    }
  },
  {
    name: "Apple",
    industry: "Technology",
    size: "150,000+ employees",
    location: "Cupertino, CA",
    salaryRange: {
      min: 130000,
      max: 280000,
      currency: "USD"
    }
  },
  {
    name: "Amazon",
    industry: "E-commerce",
    size: "1,000,000+ employees",
    location: "Seattle, WA",
    salaryRange: {
      min: 100000,
      max: 200000,
      currency: "USD"
    }
  },
  {
    name: "Meta",
    industry: "Technology",
    size: "80,000+ employees",
    location: "Menlo Park, CA",
    salaryRange: {
      min: 140000,
      max: 300000,
      currency: "USD"
    }
  },
  {
    name: "Netflix",
    industry: "Entertainment",
    size: "10,000+ employees",
    location: "Los Gatos, CA",
    salaryRange: {
      min: 150000,
      max: 350000,
      currency: "USD"
    }
  },
  {
    name: "Salesforce",
    industry: "Technology",
    size: "70,000+ employees",
    location: "San Francisco, CA",
    salaryRange: {
      min: 120000,
      max: 250000,
      currency: "USD"
    }
  },
  {
    name: "Adobe",
    industry: "Technology",
    size: "25,000+ employees",
    location: "San Jose, CA",
    salaryRange: {
      min: 110000,
      max: 220000,
      currency: "USD"
    }
  },
  {
    name: "Oracle",
    industry: "Technology",
    size: "130,000+ employees",
    location: "Austin, TX",
    salaryRange: {
      min: 100000,
      max: 200000,
      currency: "USD"
    }
  },
  {
    name: "IBM",
    industry: "Technology",
    size: "350,000+ employees",
    location: "Armonk, NY",
    salaryRange: {
      min: 90000,
      max: 180000,
      currency: "USD"
    }
  }
];

const fuse = new Fuse(sampleCompanies, {
  keys: ['name', 'industry', 'location'],
  threshold: 0.3,
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // 1. Try Gemini API for company search
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
      const prompt = `List up to 10 real companies (with a focus on India and global tech/IT/finance/consulting) that match the search query: "${query}". For each, provide:
- name
- industry
- size (number of employees or size category)
- location (city, country)
- salaryRange (min, max, currency, if available)
Format as a JSON array of objects. Example:
[
  {"name": "Tata Consultancy Services (TCS)", "industry": "IT Services", "size": "600,000+ employees", "location": "Mumbai, India", "salaryRange": {"min": 400000, "max": 2500000, "currency": "INR"}},
  ...
]`;
      const result = await model.generateContent(prompt);
      let text = await result.response.text();
      text = text.replace(/```json|```/gi, '').trim();
      const companies = JSON.parse(text);
      if (Array.isArray(companies) && companies.length > 0) {
        return NextResponse.json(companies.slice(0, 10));
      }
    } catch (geminiError) {
      // If Gemini fails, fallback to fuzzy search
      console.error('Gemini company search failed:', geminiError);
    }

    // 2. Fuzzy search fallback
    const fuzzyResults = fuse.search(query).map((r: FuseResult<typeof sampleCompanies[0]>) => r.item);
    return NextResponse.json(fuzzyResults.slice(0, 5));
  } catch (error) {
    console.error('Error searching companies:', error);
    return NextResponse.json(
      { error: 'Failed to search companies' },
      { status: 500 }
    );
  }
}
