export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  hints: string[];
  company?: string;
}

export const commonQuestions: Question[] = [
  {
    id: "vr_tcs_1",
    company: "TCS",
    question: `Choose the word that best completes the analogy:
SYMPHONY : COMPOSER :: NOVEL : ?`,
    options: ["Reader", "Writer", "Publisher", "Editor"],
    answer: "Writer",
    explanation: "A symphony is created by a composer, just as a novel is created by a writer. The relationship is that of creator and creation.",
    difficulty: "Medium",
    category: "Analogies",
    hints: [
      "Focus on the relationship between the first pair",
      "Look for a similar relationship in the second pair"
    ]
  },
  {
    id: "vr_infosys_1",
    company: "Infosys",
    question: `Read the passage and answer the question:

The rise of artificial intelligence has sparked debates about its impact on employment. While some argue that AI will eliminate jobs, others contend that it will create new opportunities and transform existing roles. Historical precedents suggest that technological revolutions typically lead to job displacement in the short term but job creation in the long term.

What is the main argument of this passage?`,
    options: [
      "AI will definitely eliminate jobs",
      "AI will only create new jobs",
      "AI's impact on employment is complex and multifaceted",
      "Historical precedents are irrelevant to AI's impact"
    ],
    answer: "AI's impact on employment is complex and multifaceted",
    explanation: "The passage presents multiple perspectives on AI's impact on employment and uses historical context to suggest that the effects are not simple or one-dimensional.",
    difficulty: "Hard",
    category: "Reading Comprehension",
    hints: [
      "Look for the overall theme that connects all points",
      "Notice how the passage presents different viewpoints"
    ]
  }
];
