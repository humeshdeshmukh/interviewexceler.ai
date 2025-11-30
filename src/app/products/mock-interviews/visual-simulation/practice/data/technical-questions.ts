import { Question } from "./types";

export const technicalQuestions: Question[] = [
  {
    id: 5,
    text: "Explain your experience with [Technology/Framework]",
    category: "Technical",
    difficulty: "hard",
    expectedDuration: "3 minutes",
    sampleAnswer: {
      mainPoints: [
        "Level of expertise and years of experience",
        "Specific projects and implementations",
        "Technical challenges overcome",
        "Best practices and optimization techniques",
        "Continuous learning approach"
      ],
      structure: {
        introduction: "I have [X] years of experience with [Technology], primarily focusing on [Specific Areas].",
        body: [
          "In my most recent project, I implemented [Specific Feature/System] using [Technology] which resulted in [Measurable Outcome].",
          "I have extensive experience with [Key Features/Components] and have optimized [Specific Aspects] for better performance.",
          "I stay current with [Technology] by [Learning Methods] and have recently learned [New Feature/Update]."
        ],
        conclusion: "My experience with [Technology] has taught me the importance of [Key Learning] and I am excited to apply these skills to new challenges."
      },
      tips: [
        "Use specific technical examples",
        "Demonstrate problem-solving skills",
        "Show understanding of best practices",
        "Include performance improvements",
        "Mention learning and growth"
      ],
      commonMistakes: [
        "Being too vague about technical details",
        "Not providing real-world examples",
        "Overestimating expertise level",
        "Ignoring performance considerations",
        "Not showing problem-solving approach"
      ],
      keywords: ["expertise", "implementation", "optimization", "best practices", "problem-solving", "performance", "scalability"]
    }
  }
];
