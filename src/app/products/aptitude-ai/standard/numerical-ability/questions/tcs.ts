export const tcsNumericalQuestions = [
  {
    id: 'tcs_num_1',
    question: 'What is the next number in the series: 2, 5, 10, 17, 26, ?',
    options: [
      'a) 35',
      'b) 37',
      'c) 39',
      'd) 41'
    ],
    correctAnswer: 'b',
    explanation: 'The pattern is: +3, +5, +7, +9, +11\n2 + 3 = 5\n5 + 5 = 10\n10 + 7 = 17\n17 + 9 = 26\n26 + 11 = 37',
    category: 'Number Series',
    difficulty: 'Medium'
  },
  {
    id: 'tcs_num_2',
    question: 'If 40% of a number is 60, what is 25% of that number?',
    options: [
      'a) 37.5',
      'b) 35',
      'c) 40',
      'd) 42.5'
    ],
    correctAnswer: 'a',
    explanation: 'Let the number be x\n40% of x = 60\n0.4x = 60\nx = 150\n25% of 150 = 0.25 × 150 = 37.5',
    category: 'Percentages',
    difficulty: 'Easy'
  },
  {
    id: 'tcs_num_3',
    question: 'Find the value of √(256) ÷ √(16) × √(4)',
    options: [
      'a) 8',
      'b) 16',
      'c) 12',
      'd) 10'
    ],
    correctAnswer: 'a',
    explanation: '√(256) = 16\n√(16) = 4\n√(4) = 2\n16 ÷ 4 × 2 = 4 × 2 = 8',
    category: 'Simplification',
    difficulty: 'Medium'
  },
  {
    id: 'tcs_num_4',
    question: 'If x:y = 3:4 and y:z = 5:6, then x:z = ?',
    options: [
      'a) 5:8',
      'b) 15:24',
      'c) 5:6',
      'd) 3:6'
    ],
    correctAnswer: 'a',
    explanation: 'x:y = 3:4\ny:z = 5:6\nTherefore, x:z = (3×6):(4×6) = 18:24 = 5:8',
    category: 'Ratio and Proportion',
    difficulty: 'Hard'
  },
  {
    id: 'tcs_num_5',
    question: 'What is the unit digit in the product of 784 × 618 × 917?',
    options: [
      'a) 4',
      'b) 6',
      'c) 8',
      'd) 2'
    ],
    correctAnswer: 'd',
    explanation: 'Unit digit of 784 is 4\nUnit digit of 618 is 8\nUnit digit of 917 is 7\n4 × 8 × 7 = 224\nUnit digit is 2',
    category: 'Unit Digits',
    difficulty: 'Medium'
  }
];
