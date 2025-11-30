import { Question } from "./types";

export const introductionQuestions: Question[] = [
  {
    id: 1,
    text: "Tell me about yourself and your background.",
    category: "Introduction",
    difficulty: "easy",
    expectedDuration: "2 minutes",
    sampleAnswer: {
      mainPoints: [
        "Present role and key responsibilities",
        "Relevant educational background",
        "Career progression and achievements",
        "Skills and expertise relevant to the role",
        "Professional interests and goals"
      ],
      structure: {
        introduction: "I am a [Your Role] with [X] years of experience in [Industry/Field].",
        body: [
          "Currently at [Company], I am responsible for [Key Responsibilities] where I have achieved [Specific Achievement].",
          "Prior to this, I [Previous Experience] at [Company] where I developed expertise in [Relevant Skills].",
          "I hold a [Degree] in [Field] from [University], which provided me strong foundations in [Relevant Areas]."
        ],
        conclusion: "I am now looking to leverage my experience in [Skills] to contribute to [Type of Role/Company] where I can [Value Proposition]."
      },
      tips: [
        "Keep it professional and relevant to the role",
        "Focus on recent experience and achievements",
        "Use numbers and metrics when possible",
        "Show enthusiasm and passion for your field",
        "Connect your background to the job requirements"
      ],
      commonMistakes: [
        "Talking too long (keep it under 2 minutes)",
        "Including personal information not relevant to the job",
        "Starting from childhood or early education",
        "Being too modest or too boastful",
        "Not connecting experience to the role"
      ],
      keywords: ["experience", "achievements", "skills", "expertise", "background", "education", "career goals"]
    }
  },
  {
    id: 2,
    text: "Why are you interested in this position?",
    category: "Introduction",
    difficulty: "medium",
    expectedDuration: "2 minutes",
    sampleAnswer: {
      mainPoints: [
        "Show understanding of the role",
        "Connect your skills to job requirements",
        "Express genuine enthusiasm",
        "Demonstrate company research",
        "Share career alignment"
      ],
      structure: {
        introduction: "This position aligns perfectly with my career goals and expertise in [Relevant Field].",
        body: [
          "The role's focus on [Key Responsibility] matches my experience in [Related Achievement].",
          "I am particularly excited about [Company Initiative/Project] and would love to contribute using my skills in [Relevant Skills].",
          "Your company's commitment to [Company Value/Mission] resonates with my professional values."
        ],
        conclusion: "I believe my background in [Skills/Experience] makes me well-suited to contribute to [Company Goals] while growing professionally."
      },
      tips: [
        "Research the company thoroughly",
        "Align your answer with company values",
        "Be specific about role requirements",
        "Show genuine enthusiasm",
        "Connect past experiences to future goals"
      ],
      commonMistakes: [
        "Being too generic",
        "Focusing only on personal benefits",
        "Not showing company knowledge",
        "Lacking specific examples",
        "Appearing overconfident or desperate"
      ],
      keywords: ["alignment", "contribution", "growth", "passion", "values", "goals", "experience"]
    }
  }
];
