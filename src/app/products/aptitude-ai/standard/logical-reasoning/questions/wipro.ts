export const wiproLogicalQuestions = [
  {
    id: 'wipro_log_1',
    question: 'Five persons A, B, C, D and E are sitting in a row. B is between E and C. D is between A and E. Who is sitting in the middle?',
    options: [
      'a) A',
      'b) B',
      'c) D',
      'd) E'
    ],
    correctAnswer: 'd',
    explanation: 'Using the conditions:\nB is between E and C: _ E B C _\nD is between A and E: A D E B C\nTherefore, E is in the middle',
    category: 'Seating Arrangement',
    difficulty: 'Medium'
  },
  {
    id: 'wipro_log_2',
    question: 'In a family of six persons P, Q, R, S, T and U. R is the sister of U. S is the brother of T. T is the daughter of P. Q is married to P. How is R related to S?',
    options: [
      'a) Sister',
      'b) Cousin',
      'c) Aunt',
      'd) Cannot be determined'
    ],
    correctAnswer: 'a',
    explanation: 'P is married to Q (parents)\nT is P\'s daughter\nS is T\'s brother\nR is U\'s sister\nSince all are in same family and R is female sibling, R is S\'s sister',
    category: 'Blood Relations',
    difficulty: 'Hard'
  },
  {
    id: 'wipro_log_3',
    question: 'If South-East becomes North, North-East becomes West and so on, what will West become?',
    options: [
      'a) North-East',
      'b) South-East',
      'c) South-West',
      'd) North-West'
    ],
    correctAnswer: 'b',
    explanation: 'Each direction is rotated 135° clockwise:\nSE → N (135° CW)\nNE → W (135° CW)\nTherefore, W → SE (135° CW)',
    category: 'Direction Sense',
    difficulty: 'Medium'
  },
  {
    id: 'wipro_log_4',
    question: 'Statement: All papers are books. Some books are journals.\nConclusions:\nI. Some papers are journals.\nII. Some books are papers.',
    options: [
      'a) Only I follows',
      'b) Only II follows',
      'c) Both follow',
      'd) Neither follows'
    ],
    correctAnswer: 'b',
    explanation: 'All papers are books (given)\nTherefore, some books are papers (Conclusion II - True)\nBut we cannot say some papers are journals (Conclusion I - False)',
    category: 'Syllogisms',
    difficulty: 'Medium'
  },
  {
    id: 'wipro_log_5',
    question: 'Find the odd one out: 3, 8, 15, 24, 35, 48, 63',
    options: [
      'a) 15',
      'b) 35',
      'c) 48',
      'd) 63'
    ],
    correctAnswer: 'c',
    explanation: 'Pattern: n² + 2\n3 = 1² + 2\n8 = 2² + 4\n15 = 3² + 6\n24 = 4² + 8\n35 = 5² + 10\n48 breaks pattern\n63 = 7² + 14',
    category: 'Number Series',
    difficulty: 'Hard'
  }
];
