import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface CareerProfile {
  experience: string;
  skills: string[];
  interests: string[];
  education: string;
  currentRole: string;
  targetRole: string;
  industry: string;
  location: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
}

interface ExternalProfileData {
  linkedinData?: string;
  githubData?: string;
  portfolioData?: string;
}

async function fetchExternalProfileData(profile: CareerProfile): Promise<ExternalProfileData> {
  const externalData: ExternalProfileData = {};

  try {
    if (profile.linkedinUrl) {
      const linkedinContent = await fetch(`/api/scrape?url=${encodeURIComponent(profile.linkedinUrl)}`);
      externalData.linkedinData = await linkedinContent.text();
    }

    if (profile.githubUrl) {
      const githubContent = await fetch(`/api/scrape?url=${encodeURIComponent(profile.githubUrl)}`);
      externalData.githubData = await githubContent.text();
    }

    if (profile.portfolioUrl) {
      const portfolioContent = await fetch(`/api/scrape?url=${encodeURIComponent(profile.portfolioUrl)}`);
      externalData.portfolioData = await portfolioContent.text();
    }
  } catch (error) {
    console.error('Error fetching external profile data:', error);
  }

  return externalData;
}

const CONSULTANT_PROMPT = `You are Sarah Chen, a warm and experienced career consultant. Respond in a conversational, friendly manner while providing professional advice.

Guidelines for your responses:
1. Be empathetic and understanding
2. Share relevant examples or success stories
3. Provide actionable advice
4. Be encouraging but realistic
5. Use a mix of professional insight and friendly conversation
6. When external profile data is available, incorporate insights from LinkedIn, GitHub, or portfolio
7. Suggest improvements for online presence when relevant

Format your responses naturally but include these sections:
- Key insights about their situation (including insights from their online profiles if available)
- Specific action steps they can take
- Relevant resources or tools
- Potential challenges to consider
- Suggestions for improving online presence (if applicable)

Sign off your messages with "Best regards, Sarah Chen" when appropriate.`;

export async function getGeminiResponse(
  userMessage: string,
  profile?: CareerProfile
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    let externalData: ExternalProfileData = {};
    if (profile) {
      externalData = await fetchExternalProfileData(profile);
    }

    const context = profile ? `
User Profile Context:
${profile.experience ? `- Experience: ${profile.experience}` : ''}
${profile.skills.length > 0 ? `- Skills: ${profile.skills.join(', ')}` : ''}
${profile.interests.length > 0 ? `- Interests: ${profile.interests.join(', ')}` : ''}
${profile.education ? `- Education: ${profile.education}` : ''}
${profile.currentRole ? `- Current Role: ${profile.currentRole}` : ''}
${profile.targetRole ? `- Target Role: ${profile.targetRole}` : ''}
${profile.industry ? `- Industry: ${profile.industry}` : ''}
${profile.location ? `- Location: ${profile.location}` : ''}

External Profile Information:
${externalData.linkedinData ? `LinkedIn Profile Overview: ${externalData.linkedinData}` : ''}
${externalData.githubData ? `GitHub Activity Overview: ${externalData.githubData}` : ''}
${externalData.portfolioData ? `Portfolio Overview: ${externalData.portfolioData}` : ''}` : '';

    const prompt = `${CONSULTANT_PROMPT}
${context}

User: ${userMessage}

Provide a helpful response while maintaining a conversational tone. If external profile data is available, incorporate relevant insights from it.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in Gemini service:', error);
    throw new Error('I apologize, but I encountered an issue. Could you please try asking your question again?');
  }
}
