export const infosysLogicalQuestions = [
  {
    id: 'infosys_log_1',
    question: 'Six friends P, Q, R, S, T and U are sitting in a row facing north. S is between U and T. R is immediate right to P but immediate left to S. Q is at the extreme end. In order to sit, how many persons have to shift if P wants to sit at the extreme end at which Q is sitting?',
    options: [
      'a) 2',
      'b) 3',
      'c) 4',
      'd) 5'
    ],
    correctAnswer: 'c',
    explanation: 'Current arrangement: Q P R S U T\nFor P to sit at Q\'s position, Q, P, R and S need to shift\nFinal arrangement: P Q R S U T',
    category: 'Seating Arrangement',
    difficulty: 'Hard'
  },
  {
    id: 'infosys_log_2',
    question: 'If "+" means "×", "-" means "+", "×" means "÷" and "÷" means "-", then what will be the value of 8 + 12 - 6 × 2 ÷ 2?',
    options: [
      'a) 97',
      'b) 99',
      'c) 101',
      'd) 103'
    ],
    correctAnswer: 'c',
    explanation: 'Converting the symbols:\n8 × 12 + 6 ÷ 2 - 2\n= 96 + 3 - 2\n= 101',
    category: 'Mathematical Operations',
    difficulty: 'Medium'
  },
  {
    id: 'infosys_log_3',
    question: 'Statement: Some cats are animals. All animals are mammals.\nConclusions:\nI. Some cats are mammals.\nII. Some mammals are cats.',
    options: [
      'a) Only I follows',
      'b) Only II follows',
      'c) Both follow',
      'd) Neither follows'
    ],
    correctAnswer: 'c',
    explanation: 'Some cats are animals and all animals are mammals\nTherefore:\nI. Some cats are mammals (True)\nII. Some mammals are cats (True, conversion of I)',
    category: 'Syllogisms',
    difficulty: 'Medium'
  },
  {
    id: 'infosys_log_4',
    question: 'In a certain code, COMPUTER is written as RFUVQNPC. How will PRINTER be written in that code?',
    options: [
      'a) QSJOUFS',
      'b) SFUOJSQ',
      'c) QSJOUFR',
      'd) SFUOSJQ'
    ],
    correctAnswer: 'a',
    explanation: 'In the code, each letter is replaced by the next letter in the alphabet\nP → Q, R → S, I → J, N → O, T → U, E → F, R → S',
    category: 'Coding-Decoding',
    difficulty: 'Medium'
  },
  {
    id: 'infosys_log_5',
    question: 'If A + B means A is the mother of B; A × B means A is the sister of B, A % B means A is the father of B and A - B means A is the brother of B, then which of the following shows that P is the uncle of Q?',
    options: [
      'a) P - R + Q',
      'b) P × R + Q',
      'c) P - M % Q',
      'd) P + M × Q'
    ],
    correctAnswer: 'c',
    explanation: 'To be uncle, P should be brother of Q\'s father/mother\nP - M % Q means P is brother of M and M is father of Q\nTherefore, P is uncle of Q',
    category: 'Blood Relations',
    difficulty: 'Hard'
  }
];
