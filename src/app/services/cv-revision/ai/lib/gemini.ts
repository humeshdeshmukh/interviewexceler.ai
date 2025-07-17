import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const getGeminiClient = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }
  return new GoogleGenerativeAI(apiKey);
};

interface ATSScore {
  score: number;
  feedback: string;
  improvements: string[];
}

interface ATSScores {
  overall: ATSScore;
  format: ATSScore;
  keyword: ATSScore;
  relevance: ATSScore;
  readability: ATSScore;
}

const calculateATSScores = (text: string): ATSScores => {
  // Format Score
  const formatScore = {
    score: 0,
    feedback: '',
    improvements: [] as string[]
  };
  
  // Check proper sections
  const hasProperSections = /education|experience|skills/i.test(text);
  if (hasProperSections) formatScore.score += 20;
  else formatScore.improvements.push('Add clear section headings (Education, Experience, Skills)');

  // Check bullet points
  const hasBulletPoints = /•|-|\*/g.test(text);
  if (hasBulletPoints) formatScore.score += 20;
  else formatScore.improvements.push('Use bullet points to list achievements and responsibilities');

  // Check contact info
  const hasContactInfo = /email|phone|linkedin/i.test(text);
  if (hasContactInfo) formatScore.score += 20;
  else formatScore.improvements.push('Include complete contact information');

  // Check consistent formatting
  const hasConsistentFormatting = !/[^\x00-\x7F]/g.test(text); // Check for special characters
  if (hasConsistentFormatting) formatScore.score += 20;
  else formatScore.improvements.push('Remove special characters and ensure consistent formatting');

  // Check proper spacing
  const hasProperSpacing = !/\n{3,}/g.test(text);
  if (hasProperSpacing) formatScore.score += 20;
  else formatScore.improvements.push('Maintain consistent spacing between sections');

  formatScore.feedback = formatScore.score >= 80 
    ? 'Excellent formatting that meets ATS requirements'
    : 'Format needs improvement for better ATS compatibility';

  // Keyword Score
  const keywordScore = {
    score: 0,
    feedback: '',
    improvements: [] as string[]
  };

  const commonKeywords = [
    'experience', 'skills', 'education', 'project', 'achievement',
    'developed', 'managed', 'created', 'implemented', 'led',
    'team', 'analysis', 'solution', 'improvement', 'success'
  ];

  let keywordCount = 0;
  commonKeywords.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    const matches = text.match(regex);
    if (matches) keywordCount += matches.length;
  });

  keywordScore.score = Math.min(Math.round((keywordCount / 10) * 100), 100);
  if (keywordScore.score < 60) {
    keywordScore.improvements.push('Include more relevant industry keywords');
    keywordScore.improvements.push('Add specific technical skills and tools');
  }

  keywordScore.feedback = keywordScore.score >= 80
    ? 'Strong keyword optimization'
    : 'Consider adding more relevant keywords';

  // Readability Score
  const readabilityScore = {
    score: 0,
    feedback: '',
    improvements: [] as string[]
  };

  // Check sentence length
  const sentences = text.split(/[.!?]+/);
  const avgWordsPerSentence = sentences.reduce((acc, sent) => 
    acc + sent.trim().split(/\s+/).length, 0) / sentences.length;

  if (avgWordsPerSentence <= 20) readabilityScore.score += 40;
  else readabilityScore.improvements.push('Shorten sentences for better readability');

  // Check paragraph length
  const paragraphs = text.split(/\n\s*\n/);
  const avgWordsPerParagraph = paragraphs.reduce((acc, para) => 
    acc + para.trim().split(/\s+/).length, 0) / paragraphs.length;

  if (avgWordsPerParagraph <= 50) readabilityScore.score += 30;
  else readabilityScore.improvements.push('Break down long paragraphs');

  // Check active voice
  const passiveVoiceCount = (text.match(/was|were|been|being|is|are|am|\w+ed by/g) || []).length;
  if (passiveVoiceCount < text.split(/\s+/).length * 0.1) readabilityScore.score += 30;
  else readabilityScore.improvements.push('Use more active voice');

  readabilityScore.feedback = readabilityScore.score >= 80
    ? 'Content is clear and easy to read'
    : 'Improve readability with shorter sentences and active voice';

  // Relevance Score (simplified)
  const relevanceScore = {
    score: Math.min(keywordScore.score + formatScore.score, 100) / 2,
    feedback: '',
    improvements: [] as string[]
  };

  if (relevanceScore.score < 70) {
    relevanceScore.improvements.push('Align content more closely with job requirements');
    relevanceScore.improvements.push('Highlight relevant achievements and skills');
  }

  relevanceScore.feedback = relevanceScore.score >= 80
    ? 'Content is well-aligned with typical job requirements'
    : 'Content could be more targeted to job requirements';

  // Overall Score
  const overallScore = {
    score: Math.round((formatScore.score + keywordScore.score + readabilityScore.score + relevanceScore.score) / 4),
    feedback: '',
    improvements: [] as string[]
  };

  if (overallScore.score >= 80) {
    overallScore.feedback = 'CV is well-optimized for ATS systems';
  } else {
    overallScore.feedback = 'CV needs improvements for better ATS compatibility';
    overallScore.improvements = [
      ...formatScore.improvements,
      ...keywordScore.improvements,
      ...readabilityScore.improvements,
      ...relevanceScore.improvements
    ];
  }

  return {
    overall: overallScore,
    format: formatScore,
    keyword: keywordScore,
    relevance: relevanceScore,
    readability: readabilityScore
  };
};

export async function analyzeCV(cvText: string): Promise<any> {
  try {
    if (!cvText?.trim()) {
      throw new Error('CV text is empty or invalid');
    }

    console.log('Initializing Gemini client...'); // Debug log
    const genAI = getGeminiClient();
    console.log('Getting Gemini model...'); // Debug log
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    console.log('Calculating ATS scores...'); // Debug log
    const atsScores = calculateATSScores(cvText);

    const prompt = `As an expert CV/Resume analyzer, provide a comprehensive analysis of the following CV. Focus on specific, actionable feedback.

CV Content:
${cvText}

Please provide a detailed analysis in exactly this format:

1. PRIORITY IMPROVEMENTS

Critical:
- [First critical improvement with specific solution]
- [Second critical improvement with specific solution]
- [Third critical improvement with specific solution]

Important:
- [First important improvement with actionable step]
- [Second important improvement with actionable step]
- [Third important improvement with actionable step]

Recommended:
- [First recommended improvement with suggestion]
- [Second recommended improvement with suggestion]
- [Third recommended improvement with suggestion]

2. SKILLS ANALYSIS

Technical Skills:
- [Technical skill 1] - [Proficiency level] - [Where demonstrated]
- [Technical skill 2] - [Proficiency level] - [Where demonstrated]
- [Technical skill 3] - [Proficiency level] - [Where demonstrated]

Missing Critical Skills:
- [Missing skill 1] - [Why it's important for the role]
- [Missing skill 2] - [Why it's important for the role]

3. EXPERIENCE ANALYSIS

[Most Recent Position]:
Company: [Company Name]
Duration: [Time Period]
Key Achievements:
- [Specific achievement with metrics]
- [Specific achievement with metrics]

[Previous Position]:
Company: [Company Name]
Duration: [Time Period]
Key Achievements:
- [Specific achievement with metrics]
- [Specific achievement with metrics]

4. MARKET INSIGHTS

Industry Trends:
- [Specific trend 1 and its relevance]
- [Specific trend 2 and its relevance]
- [Specific trend 3 and its relevance]

Keyword Analysis:
- [Key skill/keyword 1] - [Number of occurrences] - [Importance level]
- [Key skill/keyword 2] - [Number of occurrences] - [Importance level]
- [Key skill/keyword 3] - [Number of occurrences] - [Importance level]

5. ACTION PLAN

Immediate Actions (24-48 hours):
- [Specific immediate action 1]
- [Specific immediate action 2]
- [Specific immediate action 3]

Short-term Goals (1-2 weeks):
- [Specific short-term goal 1]
- [Specific short-term goal 2]
- [Specific short-term goal 3]

Long-term Development (1-3 months):
- [Specific long-term goal 1]
- [Specific long-term goal 2]
- [Specific long-term goal 3]

Ensure each point is specific to the CV content, includes metrics where possible, and provides actionable recommendations.`;

    console.log('Generating content with Gemini...'); // Debug log
    const result = await model.generateContent(prompt);
    console.log('Got response from Gemini...'); // Debug log
    const response = await result.response;
    const text = response.text();
    
    // Process the text response into sections
    console.log('Processing response sections...'); // Debug log
    const sections = text.split(/\d+\.\s+/).filter(Boolean).map(section => {
      const [title, ...content] = section.split('\n');
      return {
        title: title.trim(),
        content: content
          .filter(line => line.trim())
          .map(line => line.trim())
          .join('\n')
      };
    });

    // Structure the improvements
    const improvementsSection = sections.find(s => s.title.toLowerCase().includes('priority improvements'));
    const improvements = {
      critical: [],
      important: [],
      recommended: []
    };

    if (improvementsSection) {
      let currentCategory = null;
      improvementsSection.content.split('\n').forEach(line => {
        line = line.trim();
        if (line.toLowerCase().includes('critical:')) {
          currentCategory = 'critical';
        } else if (line.toLowerCase().includes('important:')) {
          currentCategory = 'important';
        } else if (line.toLowerCase().includes('recommended:')) {
          currentCategory = 'recommended';
        } else if (currentCategory && line.startsWith('-')) {
          const improvement = line.substring(1).trim();
          improvements[currentCategory].push({
            point: improvement,
            solution: improvement.includes('-') ? improvement.split('-')[1].trim() : ''
          });
        }
      });
    }

    // Structure the skills
    const skillsSection = sections.find(s => s.title.toLowerCase().includes('skills analysis'));
    const skills = {
      technical: [],
      missing: []
    };

    if (skillsSection) {
      let currentSkillType = null;
      skillsSection.content.split('\n').forEach(line => {
        line = line.trim();
        if (line.toLowerCase().includes('technical skills:')) {
          currentSkillType = 'technical';
        } else if (line.toLowerCase().includes('missing critical skills:')) {
          currentSkillType = 'missing';
        } else if (currentSkillType && line.startsWith('-')) {
          const parts = line.substring(1).trim().split('-').map(p => p.trim());
          if (currentSkillType === 'technical' && parts.length >= 2) {
            skills.technical.push({
              name: parts[0],
              proficiency: parts[1],
              context: parts[2] || ''
            });
          } else if (currentSkillType === 'missing' && parts.length >= 2) {
            skills.missing.push({
              name: parts[0],
              importance: parts[1]
            });
          }
        }
      });
    }

    // Structure the experience
    const experienceSection = sections.find(s => s.title.toLowerCase().includes('experience'));
    const experience = [];

    if (experienceSection) {
      let currentPosition = null;
      experienceSection.content.split('\n').forEach(line => {
        line = line.trim();
        if (line.endsWith(':')) {
          currentPosition = {
            title: line.replace(':', '').trim(),
            company: '',
            duration: '',
            achievements: []
          };
          experience.push(currentPosition);
        } else if (currentPosition && line.startsWith('Company:')) {
          currentPosition.company = line.replace('Company:', '').trim();
        } else if (currentPosition && line.startsWith('Duration:')) {
          currentPosition.duration = line.replace('Duration:', '').trim();
        } else if (currentPosition && line.startsWith('-')) {
          currentPosition.achievements.push(line.substring(1).trim());
        }
      });
    }

    // Structure the action plan
    const actionSection = sections.find(s => s.title.toLowerCase().includes('action plan'));
    const actionPlan = {
      immediate: [],
      shortTerm: [],
      longTerm: []
    };

    if (actionSection) {
      let currentTimeframe = null;
      actionSection.content.split('\n').forEach(line => {
        line = line.trim();
        if (line.toLowerCase().includes('immediate actions')) {
          currentTimeframe = 'immediate';
        } else if (line.toLowerCase().includes('short-term')) {
          currentTimeframe = 'shortTerm';
        } else if (line.toLowerCase().includes('long-term')) {
          currentTimeframe = 'longTerm';
        } else if (currentTimeframe && line.startsWith('-')) {
          actionPlan[currentTimeframe].push({
            action: line.substring(1).trim(),
            priority: currentTimeframe === 'immediate' ? 'high' : 
                     currentTimeframe === 'shortTerm' ? 'medium' : 'low'
          });
        }
      });
    }

    console.log('Analysis complete, returning results...'); // Debug log
    return {
      type: 'detailed',
      atsScores,
      sections,
      improvements,
      skills,
      experience,
      actionPlan,
      rawContent: text
    };

  } catch (error) {
    console.error('Error analyzing CV with Gemini:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to analyze CV');
  }
}
