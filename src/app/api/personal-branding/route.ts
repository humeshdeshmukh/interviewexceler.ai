import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

interface BrandingRequest {
  name: string;
  title: string;
  industry: string;
  experience: string;
  linkedin: string;
  twitter: string;
  github: string;
  bio: string;
  goals: string[];
  targetAudience: string;
  uniqueValue: string;
  interests: string[];
}

export async function POST(request: Request) {
  try {
    const data: BrandingRequest = await request.json();

    // Validate required fields
    if (!data.name || !data.title || !data.industry || !data.bio) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
    Act as an expert personal branding consultant. Analyze the following professional profile and provide detailed branding recommendations. Format your response as a valid JSON object with the structure shown below.

    Professional Profile:
    Name: ${data.name}
    Title: ${data.title}
    Industry: ${data.industry}
    Experience: ${data.experience}
    Bio: ${data.bio}
    Career Goals: ${data.goals?.join(", ") || "Not specified"}
    Target Audience: ${data.targetAudience || "Not specified"}
    Unique Value: ${data.uniqueValue || "Not specified"}
    Professional Interests: ${data.interests?.join(", ") || "Not specified"}

    Social Media:
    LinkedIn: ${data.linkedin || "Not provided"}
    Twitter: ${data.twitter || "Not provided"}
    GitHub: ${data.github || "Not provided"}

    Provide your analysis in this exact JSON format:
    {
      "brandIdentity": {
        "coreBrandMessage": "string",
        "valueProposition": "string",
        "brandPersonality": ["trait1", "trait2", "trait3"],
        "targetAudienceInsights": ["insight1", "insight2", "insight3"]
      },
      "socialMediaAnalyses": [
        {
          "platform": "string",
          "analysis": {
            "profileStrength": "string",
            "recommendations": ["rec1", "rec2", "rec3"],
            "metrics": {
              "contentQuality": "string",
              "engagementRate": "string",
              "postingFrequency": "string",
              "networkGrowth": "string"
            }
          }
        }
      ],
      "contentStrategy": {
        "topics": ["topic1", "topic2", "topic3"],
        "contentTypes": ["type1", "type2", "type3"],
        "postingSchedule": "string",
        "voiceTone": ["tone1", "tone2", "tone3"]
      },
      "visualBranding": {
        "colorPalette": ["color1", "color2", "color3"],
        "visualStyle": "string",
        "imageGuidelines": ["guideline1", "guideline2", "guideline3"]
      },
      "growthStrategy": {
        "shortTerm": ["goal1", "goal2", "goal3"],
        "mediumTerm": ["goal1", "goal2", "goal3"],
        "longTerm": ["goal1", "goal2", "goal3"]
      },
      "industryPositioning": {
        "nicheFocus": "string",
        "thoughtLeadership": ["area1", "area2", "area3"],
        "competitiveAdvantage": "string"
      },
      "networkingStrategy": {
        "targetConnections": ["type1", "type2", "type3"],
        "engagementTactics": ["tactic1", "tactic2", "tactic3"],
        "communityBuilding": ["strategy1", "strategy2", "strategy3"]
      }
    }

    Important: Ensure your response is a valid JSON object that exactly matches this structure. Do not include any markdown formatting or additional text outside the JSON object.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Clean the response text to ensure it's valid JSON
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      const brandingAnalysis = JSON.parse(cleanedText);

      // Add metadata
      const finalResponse = {
        ...brandingAnalysis,
        metadata: {
          timestamp: new Date().toISOString(),
          version: "2.0",
          industry: data.industry,
          experienceLevel: data.experience
        }
      };

      return NextResponse.json(finalResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Personal Branding Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze personal brand" },
      { status: 500 }
    );
  }
}
