export const tcsLogicalQuestions = [
  {
    id: 'tcs_log_1',
    question: 'In a row of 20 students, when Arun was shifted to his left by 4 places his number from left end became 10. What was his earlier position from the right end of the row?',
    options: [
      'a) 7',
      'b) 8',
      'c) 9',
      'd) 10'
    ],
    correctAnswer: 'a',
    explanation: 'Initial position from left = 14 (since after moving 4 places left, position is 10)\nTotal students = 20\nPosition from right = 20 - 14 + 1 = 7',
    category: 'Linear Arrangement',
    difficulty: 'Medium'
  },
  {
    id: 'tcs_log_2',
    question: 'If PALE is coded as 2134, EARTH is coded as 41567 and PEARL is coded as 24153, what is the code for LEAP?',
    options: [
      'a) 3412',
      'b) 3421',
      'c) 3214',
      'd) 3142'
    ],
    correctAnswer: 'b',
    explanation: 'From the given codes:\nP = 2, A = 1, L = 3, E = 4\nTherefore, LEAP = 3421',
    category: 'Coding-Decoding',
    difficulty: 'Easy'
  },
  {
    id: 'tcs_log_3',
    question: 'Statement: All cats are dogs. All dogs are rats.\nConclusions:\nI. All cats are rats.\nII. All rats are cats.',
    options: [
      'a) Only conclusion I follows',
      'b) Only conclusion II follows',
      'c) Both conclusions follow',
      'd) Neither conclusion follows'
    ],
    correctAnswer: 'a',
    explanation: 'Using syllogism:\nAll cats are dogs (given)\nAll dogs are rats (given)\nTherefore, all cats are rats (Conclusion I - True)\nBut we cannot say all rats are cats (Conclusion II - False)',
    category: 'Syllogisms',
    difficulty: 'Medium'
  },
  {
    id: 'tcs_log_4',
    question: 'A man walks 5 km toward south and then turns to the right. After walking 3 km he turns to the left and walks 5 km. Now in which direction is he from the starting point?',
    options: [
      'a) West',
      'b) South',
      'c) South-West',
      'd) South-East'
    ],
    correctAnswer: 'd',
    explanation: 'Starting point → 5 km South → 3 km West → 5 km South\nFinal position is South-East from starting point',
    category: 'Direction Sense',
    difficulty: 'Medium'
  },
  {
    id: 'tcs_log_5',
    question: 'Find the missing number: 2, 6, 12, 20, 30, ?',
    options: [
      'a) 40',
      'b) 42',
      'c) 44',
      'd) 46'
    ],
    correctAnswer: 'b',
    explanation: 'Pattern: +4, +6, +8, +10, +12\n2 + 4 = 6\n6 + 6 = 12\n12 + 8 = 20\n20 + 10 = 30\n30 + 12 = 42',
    category: 'Number Series',
    difficulty: 'Easy'
  }
];
