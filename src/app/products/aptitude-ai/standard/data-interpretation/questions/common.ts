export const commonDataQuestions = [
  {
    id: 'common_data_1',
    question: `Study the line graph showing the population growth (in thousands) of two cities over years.

[Line graph:
Year    City A    City B
2018     500       450
2019     550       500
2020     600       580
2021     650       620
2022     700       680]

In which year was the percentage growth highest for City B?`,
    options: [
      'a) 2019',
      'b) 2020',
      'c) 2021',
      'd) 2022'
    ],
    correctAnswer: 'b',
    explanation: 'City B growth:\n2019: 11.11%\n2020: 16%\n2021: 6.9%\n2022: 9.68%\nHighest growth was in 2020',
    category: 'Line Graph',
    difficulty: 'Hard',
    imageUrl: '/images/aptitude/data/common/line1.png'
  },
  {
    id: 'common_data_2',
    question: `The pie chart shows the distribution of medals won by countries in Olympics.

[Pie chart:
USA: 30%
China: 25%
Russia: 20%
UK: 15%
Others: 10%]

If the total number of medals is 1000, how many more medals did USA win compared to UK?`,
    options: [
      'a) 100',
      'b) 150',
      'c) 200',
      'd) 250'
    ],
    correctAnswer: 'b',
    explanation: 'USA medals = 30% of 1000 = 300\nUK medals = 15% of 1000 = 150\nDifference = 300 - 150 = 150',
    category: 'Pie Chart',
    difficulty: 'Easy',
    imageUrl: '/images/aptitude/data/common/pie1.png'
  },
  {
    id: 'common_data_3',
    question: `Study the bar graph showing the number of books sold by a store in different months.

[Bar graph:
Month    Fiction    Non-Fiction
Jan       200         150
Feb       180         200
Mar       220         180
Apr       250         220]

What is the ratio of total Fiction to Non-Fiction books sold?`,
    options: [
      'a) 17:15',
      'b) 19:17',
      'c) 21:19',
      'd) 23:21'
    ],
    correctAnswer: 'a',
    explanation: 'Total Fiction = 850\nTotal Non-Fiction = 750\nRatio = 850:750 = 17:15',
    category: 'Bar Graph',
    difficulty: 'Medium',
    imageUrl: '/images/aptitude/data/common/bar1.png'
  },
  {
    id: 'common_data_4',
    question: `The table shows the marks obtained by students in different subjects out of 100.

[Table:
Student    Math    Science    English
A           85        75         90
B           70        85         80
C           90        80         75
D           80        90         85]

Which student has the highest average marks?`,
    options: [
      'a) Student A',
      'b) Student B',
      'c) Student C',
      'd) Student D'
    ],
    correctAnswer: 'd',
    explanation: 'Average marks:\nA = 83.33\nB = 78.33\nC = 81.67\nD = 85\nStudent D has highest average',
    category: 'Table',
    difficulty: 'Medium',
    imageUrl: '/images/aptitude/data/common/table1.png'
  },
  {
    id: 'common_data_5',
    question: `Study the compound bar chart showing import and export data (in billion $).

[Compound bar chart:
Year    Imports    Exports
2019     50         45
2020     45         50
2021     55         48
2022     60         58]

In which year was the trade surplus (Exports - Imports) highest?`,
    options: [
      'a) 2019',
      'b) 2020',
      'c) 2021',
      'd) 2022'
    ],
    correctAnswer: 'b',
    explanation: 'Trade surplus:\n2019: -5B\n2020: 5B\n2021: -7B\n2022: -2B\nHighest surplus was in 2020',
    category: 'Bar Graph',
    difficulty: 'Hard',
    imageUrl: '/images/aptitude/data/common/bar2.png'
  }
];
