import { OpenAI } from "openai";

interface ResumeAnalysisResult {
  score: number;
  suggestions: {
    general: string[];
    sections: {
      [key: string]: string[];
    };
  };
  keywords: string[];
  improvement_areas: string[];
  strengths: string[];
  ats_compatibility: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  industry_fit: {
    matching_industries: string[];
    suggested_roles: string[];
    skill_gaps: string[];
  };
}

interface GenerationPrompt {
  section: string;
  context: string;
  tone: "professional" | "creative" | "academic" | "executive";
  length: "concise" | "detailed";
}

interface SkillSuggestion {
  technical: string[];
  soft: string[];
  industry_specific: string[];
  certifications: string[];
  tools: string[];
}

export class AIResumeService {
  private openai: OpenAI;
  private model = "gpt-4-1106-preview";

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  /**
   * Analyzes the entire resume and provides comprehensive feedback
   */
  async analyzeResume(resumeData: any): Promise<ResumeAnalysisResult> {
    const prompt = `Analyze this resume and provide comprehensive feedback:
    ${JSON.stringify(resumeData, null, 2)}
    
    Focus on:
    1. Overall impact and effectiveness
    2. Section-specific improvements
    3. ATS compatibility
    4. Industry fit and targeting
    5. Keywords and phrases
    6. Areas for improvement
    7. Notable strengths`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  }

  /**
   * Generates optimized content for specific resume sections
   */
  async generateContent(params: GenerationPrompt): Promise<string> {
    const prompt = `Generate ${params.length} ${params.tone} content for the ${
      params.section
    } section of a resume with this context:
    ${params.context}
    
    Focus on:
    - Action verbs and quantifiable achievements
    - Industry-relevant keywords
    - Clear and impactful statements
    ${
      params.tone === "executive"
        ? "- Strategic leadership and business impact"
        : params.tone === "creative"
        ? "- Innovative approaches and creative solutions"
        : params.tone === "academic"
        ? "- Research contributions and scholarly achievements"
        : "- Professional accomplishments and technical expertise"
    }`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return response.choices[0].message.content || "";
  }

  /**
   * Suggests relevant skills based on experience and target role
   */
  async suggestSkills(
    experience: string,
    targetRole: string
  ): Promise<SkillSuggestion> {
    const prompt = `Suggest relevant skills for someone with this experience targeting this role:
    Experience: ${experience}
    Target Role: ${targetRole}
    
    Provide:
    1. Technical skills
    2. Soft skills
    3. Industry-specific skills
    4. Relevant certifications
    5. Tools and technologies`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  }

  /**
   * Optimizes resume content for ATS compatibility
   */
  async optimizeForATS(content: string, jobDescription?: string): Promise<string> {
    const prompt = `Optimize this resume content for ATS systems:
    ${content}
    ${jobDescription ? `\nJob Description: ${jobDescription}` : ""}
    
    Focus on:
    1. Keyword optimization
    2. Format simplification
    3. Proper section headings
    4. Bullet point structure
    5. Removal of graphics and special characters`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    return response.choices[0].message.content || "";
  }

  /**
   * Generates achievement statements from bullet points
   */
  async enhanceAchievements(
    achievements: string[],
    role: string
  ): Promise<string[]> {
    const prompt = `Transform these achievements for a ${role} role into impactful bullet points:
    ${achievements.join("\n")}
    
    Focus on:
    1. Quantifiable results
    2. Action verbs
    3. Problem-solution format
    4. Business impact
    5. Technical details where relevant`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return (response.choices[0].message.content || "")
      .split("\n")
      .filter((line) => line.trim());
  }

  /**
   * Suggests improvements for specific resume sections
   */
  async suggestSectionImprovements(
    section: string,
    content: string
  ): Promise<string[]> {
    const prompt = `Analyze this ${section} section and suggest improvements:
    ${content}
    
    Consider:
    1. Content relevance and impact
    2. Structure and organization
    3. Language and tone
    4. Missing elements
    5. Industry best practices`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return (response.choices[0].message.content || "")
      .split("\n")
      .filter((line) => line.trim());
  }

  /**
   * Generates a professional summary based on resume content
   */
  async generateSummary(resumeData: any, targetRole?: string): Promise<string> {
    const prompt = `Generate a compelling professional summary based on this resume data:
    ${JSON.stringify(resumeData, null, 2)}
    ${targetRole ? `\nTarget Role: ${targetRole}` : ""}
    
    Create a summary that:
    1. Highlights key qualifications
    2. Demonstrates career progression
    3. Shows industry expertise
    4. Includes relevant achievements
    5. Aligns with career goals`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return response.choices[0].message.content || "";
  }

  /**
   * Provides tailored advice for career transitions
   */
  async getCareerTransitionAdvice(
    currentRole: string,
    targetRole: string,
    experience: string
  ): Promise<{
    skills_to_highlight: string[];
    skills_to_develop: string[];
    experience_framing: string[];
    recommended_certifications: string[];
    transition_strategy: string[];
  }> {
    const prompt = `Provide career transition advice:
    Current Role: ${currentRole}
    Target Role: ${targetRole}
    Experience: ${experience}
    
    Include:
    1. Skills to highlight
    2. Skills to develop
    3. How to frame existing experience
    4. Recommended certifications
    5. Overall transition strategy`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  }
}
