export const accentureQuantitativeQuestions = [
  {
    id: 'accenture_q1',
    question: 'A person covers a certain distance at 12 km/hr and returns at 8 km/hr. If the total time taken is 20 hours, find the total distance.',
    options: [
      'a) 96 km',
      'b) 120 km',
      'c) 192 km',
      'd) 240 km'
    ],
    correctAnswer: 'b',
    explanation: 'Let distance be x km\nTime taken = x/12 + x/8 = 20\nx/12 + 3x/24 = 20\n5x/24 = 20\nx = 96\nTotal distance = 2x = 120 km',
    category: 'Time and Distance',
    difficulty: 'Medium'
  },
  {
    id: 'accenture_q2',
    question: 'The ages of three persons are in the ratio 4:7:9. If their sum is 60 years, find the age of the youngest person.',
    options: [
      'a) 12 years',
      'b) 15 years',
      'c) 18 years',
      'd) 21 years'
    ],
    correctAnswer: 'a',
    explanation: 'Let the ratio parts be 4x, 7x, and 9x\n4x + 7x + 9x = 60\n20x = 60\nx = 3\nYoungest age = 4x = 12 years',
    category: 'Ratio and Proportion',
    difficulty: 'Easy'
  },
  {
    id: 'accenture_q3',
    question: 'A sum of money at compound interest amounts to Rs. 6,250 in 2 years and to Rs. 7,500 in 3 years. Find the principal.',
    options: [
      'a) Rs. 4,000',
      'b) Rs. 4,500',
      'c) Rs. 5,000',
      'd) Rs. 5,500'
    ],
    correctAnswer: 'a',
    explanation: 'Let principal be P and rate be r\nP(1 + r/100)² = 6250\nP(1 + r/100)³ = 7500\nDividing gives (1 + r/100) = 1.2\nr = 20%\nSubstituting back gives P = 4000',
    category: 'Compound Interest',
    difficulty: 'Hard'
  },
  {
    id: 'accenture_q4',
    question: 'In a bag there are coins of 25p, 10p and 5p in the ratio 1:2:3. If there are 300 coins in all, what is the value of all the coins in rupees?',
    options: [
      'a) Rs. 35',
      'b) Rs. 37.50',
      'c) Rs. 40',
      'd) Rs. 42.50'
    ],
    correctAnswer: 'b',
    explanation: 'Ratio 1:2:3 means 50:100:150 coins\n50 × 0.25 + 100 × 0.10 + 150 × 0.05\n= 12.5 + 10 + 15 = 37.50 rupees',
    category: 'Numbers',
    difficulty: 'Medium'
  },
  {
    id: 'accenture_q5',
    question: 'A cylindrical vessel of height 20 cm and radius 5 cm is filled with water. If this water is poured into a rectangular vessel of base 10 cm × 10 cm, find the height of water in the rectangular vessel.',
    options: [
      'a) 15.7 cm',
      'b) 16.7 cm',
      'c) 17.7 cm',
      'd) 18.7 cm'
    ],
    correctAnswer: 'a',
    explanation: 'Volume of cylinder = πr²h = π × 5² × 20 = 1570 cm³\nArea of rectangular base = 100 cm²\nHeight = Volume/Area = 1570/100 = 15.7 cm',
    category: 'Mensuration',
    difficulty: 'Hard'
  }
];
