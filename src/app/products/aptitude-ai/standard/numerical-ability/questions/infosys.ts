export const infosysNumericalQuestions = [
  {
    id: 'infosys_num_1',
    question: 'A number when divided by 899 gives a remainder of 47. When the same number is divided by 29, what will be the remainder?',
    options: [
      'a) 18',
      'b) 19',
      'c) 20',
      'd) 21'
    ],
    correctAnswer: 'a',
    explanation: '899 = 31 × 29\nWhen divided by 899, remainder = 47\nWhen divided by 29, remainder = 47 % 29 = 18',
    category: 'Remainder',
    difficulty: 'Hard'
  },
  {
    id: 'infosys_num_2',
    question: 'Find the missing number: 4, 9, 19, 39, ?, 159',
    options: [
      'a) 79',
      'b) 89',
      'c) 99',
      'd) 69'
    ],
    correctAnswer: 'a',
    explanation: 'Pattern: ×2 + 1\n4 × 2 + 1 = 9\n9 × 2 + 1 = 19\n19 × 2 + 1 = 39\n39 × 2 + 1 = 79\n79 × 2 + 1 = 159',
    category: 'Number Series',
    difficulty: 'Medium'
  },
  {
    id: 'infosys_num_3',
    question: 'The sum of squares of three consecutive even numbers is 460. Find the smallest number.',
    options: [
      'a) 10',
      'b) 12',
      'c) 8',
      'd) 14'
    ],
    correctAnswer: 'b',
    explanation: 'Let numbers be n, n+2, n+4\nn² + (n+2)² + (n+4)² = 460\nn² + n² + 4n + 4 + n² + 8n + 16 = 460\n3n² + 12n + 20 = 460\n3n² + 12n - 440 = 0\nn = 12',
    category: 'Equations',
    difficulty: 'Hard'
  },
  {
    id: 'infosys_num_4',
    question: 'What is the value of 0.25% of 420?',
    options: [
      'a) 1.05',
      'b) 10.5',
      'c) 105',
      'd) 0.105'
    ],
    correctAnswer: 'a',
    explanation: '0.25% = 0.25/100 = 0.0025\n0.0025 × 420 = 1.05',
    category: 'Percentages',
    difficulty: 'Easy'
  },
  {
    id: 'infosys_num_5',
    question: 'If 2^x = 8^3, then x = ?',
    options: [
      'a) 6',
      'b) 8',
      'c) 9',
      'd) 12'
    ],
    correctAnswer: 'c',
    explanation: '8^3 = (2^3)^3 = 2^9\nTherefore, x = 9',
    category: 'Exponents',
    difficulty: 'Medium'
  }
];
