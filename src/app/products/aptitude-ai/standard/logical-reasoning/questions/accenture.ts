export const accentureLogicalQuestions = [
  {
    id: 'accenture_log_1',
    question: 'If FRIEND is coded as HUMJTK, how is CANDLE coded in that code?',
    options: [
      'a) EDRIRL',
      'b) DCQHNG',
      'c) ECPFNG',
      'd) ECOFNG'
    ],
    correctAnswer: 'b',
    explanation: 'Pattern: Each letter is moved 2 steps forward\nF → H, R → T, I → K, etc.\nTherefore:\nC → E, A → C, N → P, D → F, L → N, E → G',
    category: 'Coding-Decoding',
    difficulty: 'Medium'
  },
  {
    id: 'accenture_log_2',
    question: 'Pointing to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph was it?',
    options: [
      'a) His own',
      'b) His son\'s',
      'c) His father\'s',
      'd) His nephew\'s'
    ],
    correctAnswer: 'b',
    explanation: 'Man\'s father\'s son = Man himself (as he has no siblings)\nTherefore, "that man\'s father" = the speaker\nSo the photograph is of his son',
    category: 'Blood Relations',
    difficulty: 'Hard'
  },
  {
    id: 'accenture_log_3',
    question: 'If A = 1, FAT = 27, then FAITH = ?',
    options: [
      'a) 44',
      'b) 41',
      'c) 42',
      'd) 43'
    ],
    correctAnswer: 'a',
    explanation: 'Each letter\'s position in alphabet is squared:\nF = 6² = 36\nA = 1² = 1\nI = 9² = 81\nT = 20² = 400\nH = 8² = 64\nSum of digits: 4 + 4 = 44',
    category: 'Mathematical Operations',
    difficulty: 'Hard'
  },
  {
    id: 'accenture_log_4',
    question: 'Statement: Some teachers are professors. All professors are researchers.\nConclusions:\nI. Some teachers are researchers.\nII. Some researchers are teachers.',
    options: [
      'a) Only I follows',
      'b) Only II follows',
      'c) Both follow',
      'd) Neither follows'
    ],
    correctAnswer: 'c',
    explanation: 'Some teachers are professors and all professors are researchers\nTherefore:\nI. Some teachers are researchers (True)\nII. Some researchers are teachers (True - conversion of I)',
    category: 'Syllogisms',
    difficulty: 'Easy'
  },
  {
    id: 'accenture_log_5',
    question: 'In a row of 40 children, R is 11th from the right and there are 15 children between R and M. What is M\'s position from the left end?',
    options: [
      'a) 14',
      'b) 15',
      'c) 16',
      'd) 17'
    ],
    correctAnswer: 'a',
    explanation: 'R is 11th from right, so R\'s position from left = 40 - 11 + 1 = 30\n15 children between R and M\nTherefore, M\'s position = 30 - 16 = 14',
    category: 'Linear Arrangement',
    difficulty: 'Medium'
  }
];
