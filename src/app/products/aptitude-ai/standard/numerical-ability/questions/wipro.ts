export const wiproNumericalQuestions = [
  {
    id: 'wipro_num_1',
    question: 'If ΔABC ~ ΔDEF, and if AB = 3 cm, DE = 5 cm, BC = 4 cm, then EF = ?',
    options: [
      'a) 6 cm',
      'b) 6.67 cm',
      'c) 7 cm',
      'd) 7.5 cm'
    ],
    correctAnswer: 'b',
    explanation: 'In similar triangles, ratio of sides is constant\nAB:DE = BC:EF\n3:5 = 4:x\nx = (5 × 4)/3 = 6.67 cm',
    category: 'Geometry',
    difficulty: 'Medium'
  },
  {
    id: 'wipro_num_2',
    question: 'Find the value of (343)^(2/3)',
    options: [
      'a) 49',
      'b) 64',
      'c) 81',
      'd) 36'
    ],
    correctAnswer: 'a',
    explanation: '343 = 7^3\n(7^3)^(2/3) = 7^2 = 49',
    category: 'Exponents',
    difficulty: 'Medium'
  },
  {
    id: 'wipro_num_3',
    question: 'The average of first 10 multiples of 7 is:',
    options: [
      'a) 35',
      'b) 38.5',
      'c) 42',
      'd) 45.5'
    ],
    correctAnswer: 'b',
    explanation: 'First 10 multiples: 7,14,21,28,35,42,49,56,63,70\nSum = 385\nAverage = 385/10 = 38.5',
    category: 'Average',
    difficulty: 'Easy'
  },
  {
    id: 'wipro_num_4',
    question: 'If log₃9 = x and log₃81 = y, then find the value of y - 2x.',
    options: [
      'a) 0',
      'b) 1',
      'c) 2',
      'd) 3'
    ],
    correctAnswer: 'a',
    explanation: 'log₃9 = 2 (since 3² = 9)\nlog₃81 = 4 (since 3⁴ = 81)\ny - 2x = 4 - 2(2) = 4 - 4 = 0',
    category: 'Logarithms',
    difficulty: 'Hard'
  },
  {
    id: 'wipro_num_5',
    question: 'The value of 5^2 × 5^-3 × 25^2 is:',
    options: [
      'a) 125',
      'b) 25',
      'c) 5',
      'd) 1'
    ],
    correctAnswer: 'a',
    explanation: '5^2 × 5^-3 × (5^2)^2\n= 5^2 × 5^-3 × 5^4\n= 5^(2-3+4)\n= 5^3\n= 125',
    category: 'Simplification',
    difficulty: 'Medium'
  }
];
