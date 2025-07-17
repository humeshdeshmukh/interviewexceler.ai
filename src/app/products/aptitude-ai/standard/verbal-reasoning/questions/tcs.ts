import { Question } from './common';

export const tcsQuestions: Question[] = [
  // Analogies Section
  {
    id: "vr_tcs_analogy_1",
    company: "TCS",
    question: "BOOK : AUTHOR :: PAINTING : ?",
    options: ["Canvas", "Artist", "Gallery", "Paint"],
    answer: "Artist",
    explanation: "Just as a BOOK is created by an AUTHOR, a PAINTING is created by an ARTIST. The relationship is that of creator and creation.",
    difficulty: "Easy",
    category: "Analogies",
    hints: ["Think about who creates what", "Focus on the creator-creation relationship"]
  },
  {
    id: "vr_tcs_analogy_2",
    company: "TCS",
    question: "CONDUCTOR : ORCHESTRA :: DIRECTOR : ?",
    options: ["Movie", "Script", "Actor", "Stage"],
    answer: "Movie",
    explanation: "A CONDUCTOR leads an ORCHESTRA, similarly a DIRECTOR leads a MOVIE. The relationship is that of leader and group/project.",
    difficulty: "Medium",
    category: "Analogies",
    hints: ["Consider leadership roles", "Think about who leads what"]
  },

  // Antonyms Section
  {
    id: "vr_tcs_antonym_1",
    company: "TCS",
    question: "Select the word that is most OPPOSITE in meaning to BENEVOLENT:",
    options: ["Malevolent", "Generous", "Kind", "Charitable"],
    answer: "Malevolent",
    explanation: "BENEVOLENT means kind and generous, while MALEVOLENT means having or showing a wish to do evil to others.",
    difficulty: "Medium",
    category: "Antonyms",
    hints: ["Think about the root 'volent'", "Consider words with opposite prefixes"]
  },
  {
    id: "vr_tcs_antonym_2",
    company: "TCS",
    question: "Choose the word most OPPOSITE to TRANSPARENT:",
    options: ["Opaque", "Clear", "Visible", "Lucid"],
    answer: "Opaque",
    explanation: "TRANSPARENT means allowing light to pass through, clear, or obvious. OPAQUE means not able to be seen through, unclear.",
    difficulty: "Easy",
    category: "Antonyms",
    hints: ["Think about visibility", "Consider physical properties"]
  },

  // Reading Comprehension
  {
    id: "vr_tcs_rc_1",
    company: "TCS",
    question: `Read the passage and answer the question:

The advent of artificial intelligence has revolutionized various industries, from healthcare to transportation. While AI offers numerous benefits, including increased efficiency and accuracy, it also raises ethical concerns regarding privacy, job displacement, and decision-making autonomy. As we continue to develop and implement AI systems, it becomes crucial to establish robust frameworks for responsible AI development and deployment.

What is the main concern regarding AI mentioned in the passage?`,
    options: [
      "Technical limitations",
      "Cost of implementation",
      "Ethical implications",
      "Market competition"
    ],
    answer: "Ethical implications",
    explanation: "The passage primarily discusses the ethical concerns surrounding AI, including privacy, job displacement, and decision-making autonomy.",
    difficulty: "Hard",
    category: "Reading Comprehension",
    hints: [
      "Look for recurring themes in the passage",
      "Focus on the challenges mentioned"
    ]
  },

  // Sentence Completion
  {
    id: "vr_tcs_sentence_1",
    company: "TCS",
    question: "Despite his _______ manner, he was actually quite kind and generous.",
    options: ["Gregarious", "Austere", "Effusive", "Benevolent"],
    answer: "Austere",
    explanation: "The sentence suggests a contrast between appearance and reality. 'Austere' (stern or severe in manner) contrasts well with 'kind and generous'.",
    difficulty: "Hard",
    category: "Sentence Completion",
    hints: [
      "Look for the contrast indicated by 'Despite'",
      "The word should contrast with 'kind and generous'"
    ]
  },

  // Verbal Classification
  {
    id: "vr_tcs_classification_1",
    company: "TCS",
    question: "Which word does NOT belong in the group?",
    options: ["Symphony", "Sonata", "Canvas", "Concerto"],
    answer: "Canvas",
    explanation: "All other words are types of musical compositions, while 'Canvas' is related to painting.",
    difficulty: "Medium",
    category: "Verbal Classification",
    hints: [
      "Look for the common theme among most words",
      "Identify the outlier based on category"
    ]
  },

  // Verbal Reasoning
  {
    id: "vr_tcs_reasoning_1",
    company: "TCS",
    question: `Consider the statements:
1. All programmers are logical thinkers
2. Some logical thinkers are creative
Therefore: ________`,
    options: [
      "All programmers are creative",
      "No programmers are creative",
      "Some programmers may be creative",
      "None of the above"
    ],
    answer: "Some programmers may be creative",
    explanation: "Since all programmers are logical thinkers, and some logical thinkers are creative, it follows that some programmers may be creative.",
    difficulty: "Hard",
    category: "Verbal Reasoning",
    hints: [
      "Draw a Venn diagram",
      "Consider the relationship between the three groups"
    ]
  },

  // Technical Comprehension
  {
    id: "vr_tcs_tech_1",
    company: "TCS",
    question: `Read and answer:
Agile methodology emphasizes iterative development, where requirements and solutions evolve through collaboration between cross-functional teams. What is the key principle of Agile described here?`,
    options: [
      "Detailed planning",
      "Evolutionary development",
      "Individual work",
      "Fixed requirements"
    ],
    answer: "Evolutionary development",
    explanation: "The passage emphasizes how requirements and solutions evolve through collaboration, which is the essence of evolutionary development in Agile.",
    difficulty: "Medium",
    category: "Technical Comprehension",
    hints: [
      "Focus on the development process described",
      "Consider the dynamic nature of the methodology"
    ]
  },

  // Logical Deduction
  {
    id: "vr_tcs_logic_1",
    company: "TCS",
    question: `If:
- All cloud services offer scalability
- AWS is a cloud service
- Some scalable systems are expensive
What can be concluded?`,
    options: [
      "AWS is expensive",
      "AWS offers scalability",
      "All cloud services are expensive",
      "Scalability is always expensive"
    ],
    answer: "AWS offers scalability",
    explanation: "From the premises, we can only conclude that AWS offers scalability because it's a cloud service, and all cloud services offer scalability.",
    difficulty: "Hard",
    category: "Logical Deduction",
    hints: [
      "Focus only on what logically follows",
      "Don't make assumptions beyond the given statements"
    ]
  },

  // Error Correction
  {
    id: "vr_tcs_error_1",
    company: "TCS",
    question: "Identify the error in: 'Neither the developers or the manager have reviewed the code.'",
    options: [
      "'or' should be 'nor'",
      "'have' should be 'has'",
      "Both a and b",
      "No error"
    ],
    answer: "Both a and b",
    explanation: "The sentence has two errors: 1) 'or' should be 'nor' with 'neither', and 2) with 'neither/nor', the verb agrees with the closer subject (manager), so 'have' should be 'has'.",
    difficulty: "Hard",
    category: "Error Correction",
    hints: [
      "Check for parallel structure with 'neither'",
      "Verify subject-verb agreement"
    ]
  }
];
