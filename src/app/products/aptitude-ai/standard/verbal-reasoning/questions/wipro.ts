import { Question } from './common';

export const wiproQuestions: Question[] = [
  // Synonyms and Word Relationships (20 questions)
  {
    id: "vr_wipro_synonym_1",
    company: "Wipro",
    question: "Which word is most similar in meaning to PERSEVERANCE?",
    options: ["Tenacity", "Weakness", "Lethargy", "Surrender"],
    answer: "Tenacity",
    explanation: "PERSEVERANCE means persistent determination, which is synonymous with TENACITY (the quality of being determined and persistent).",
    difficulty: "Medium",
    category: "Synonyms",
    hints: [
      "Think about determination and persistence",
      "Look for a word expressing similar strength of character"
    ]
  },
  // ... more synonyms

  // Contextual Usage (20 questions)
  {
    id: "vr_wipro_context_1",
    company: "Wipro",
    question: `Choose the word that best completes the sentence:

The project manager's _______ approach to problem-solving helped the team overcome several critical challenges.`,
    options: ["Methodical", "Chaotic", "Random", "Haphazard"],
    answer: "Methodical",
    explanation: "The context suggests a positive outcome, and 'methodical' (done according to a systematic or established procedure) fits best with overcoming challenges.",
    difficulty: "Medium",
    category: "Contextual Usage",
    hints: [
      "Consider the positive outcome mentioned",
      "Think about effective problem-solving approaches"
    ]
  },
  // ... more contextual usage

  // Paragraph Completion (20 questions)
  {
    id: "vr_wipro_para_1",
    company: "Wipro",
    question: `Complete the paragraph with the most appropriate sentence:

The Internet of Things (IoT) has revolutionized how we interact with everyday objects. From smart homes to industrial automation, connected devices are becoming increasingly prevalent. _______.`,
    options: [
      "This trend is expected to continue as technology advances",
      "The first computer was invented in 1943",
      "People enjoy watching movies online",
      "Books are still popular among readers"
    ],
    answer: "This trend is expected to continue as technology advances",
    explanation: "The paragraph discusses the growth and impact of IoT, so a sentence about the continuation of this trend logically completes the thought.",
    difficulty: "Medium",
    category: "Paragraph Completion",
    hints: [
      "Consider the main theme of the paragraph",
      "Look for a logical conclusion to the ideas presented"
    ]
  },
  // ... more paragraph completion

  // Error Identification (20 questions)
  {
    id: "vr_wipro_error_1",
    company: "Wipro",
    question: "Identify the error in the sentence: 'Neither the software engineers nor the project manager were able to solve the problem.'",
    options: [
      "Use of 'were' instead of 'was'",
      "Use of 'neither' with 'nor'",
      "No error",
      "Use of 'the' before project manager"
    ],
    answer: "Use of 'were' instead of 'was'",
    explanation: "When 'neither/nor' is used, the verb agrees with the noun closest to it. Since 'project manager' is singular, the verb should be 'was'.",
    difficulty: "Hard",
    category: "Error Identification",
    hints: [
      "Focus on subject-verb agreement",
      "Consider the effect of 'neither/nor' on verb choice"
    ]
  },
  // ... more error identification

  // Logical Sequence (20 questions)
  {
    id: "vr_wipro_sequence_1",
    company: "Wipro",
    question: `Arrange the following steps in logical order to create a backup:

1. Verify the backup integrity
2. Select files to backup
3. Choose backup destination
4. Start the backup process
5. Configure backup settings`,
    options: [
      "2, 3, 5, 4, 1",
      "3, 2, 5, 4, 1",
      "2, 5, 3, 4, 1",
      "5, 2, 3, 4, 1"
    ],
    answer: "2, 3, 5, 4, 1",
    explanation: "The logical sequence is: select files (2), choose destination (3), configure settings (5), start process (4), and verify (1).",
    difficulty: "Medium",
    category: "Logical Sequence",
    hints: [
      "Think about the natural order of operations",
      "Consider what information is needed before each step"
    ]
  }
  // ... more logical sequence
];
