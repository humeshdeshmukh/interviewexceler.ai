import { Test, Category } from './types';
import { categories } from '../data/categories';

interface QuestionTemplate {
  templates: string[];
  options: string[][];
  explanations: string[];
}

const questionTemplates: { [key: string]: QuestionTemplate } = {
  'algorithms': {
    templates: [
      'What is the time complexity of %s?',
      'Which data structure is best suited for %s?',
      'How would you optimize %s?',
      'What is the space complexity of %s?',
      'Which algorithm would you use for %s?'
    ],
    options: [
      ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      ['Array', 'Hash Table', 'Binary Tree', 'Graph'],
      ['Dynamic Programming', 'Greedy Algorithm', 'Divide and Conquer', 'Backtracking'],
      ['Constant Space', 'Linear Space', 'Logarithmic Space', 'Quadratic Space'],
      ['BFS', 'DFS', 'Binary Search', 'Quick Sort']
    ],
    explanations: [
      'This time complexity is optimal for this operation as it requires examining each element exactly once.',
      'This data structure provides the best balance of access time and space efficiency for this use case.',
      'This optimization technique reduces redundant calculations and improves overall performance.',
      'The space complexity reflects the additional memory needed for auxiliary data structures.',
      'This algorithm is most efficient for this type of problem due to its specific characteristics.'
    ]
  },
  'system-design': {
    templates: [
      'How would you handle %s in a distributed system?',
      'What's the best way to scale %s?',
      'How would you ensure reliability of %s?',
      'Which database would you choose for %s?',
      'How would you optimize %s for high traffic?'
    ],
    options: [
      ['Load Balancer', 'Message Queue', 'Cache', 'CDN'],
      ['Horizontal Scaling', 'Vertical Scaling', 'Caching', 'Sharding'],
      ['Redundancy', 'Monitoring', 'Circuit Breakers', 'Fallbacks'],
      ['SQL', 'NoSQL', 'Graph Database', 'Time Series DB'],
      ['Caching', 'Load Balancing', 'Database Indexing', 'Query Optimization']
    ],
    explanations: [
      'This solution provides the best balance of scalability and reliability.',
      'This scaling approach is most cost-effective and maintainable.',
      'This ensures system stability and quick recovery from failures.',
      'This database type is best suited for this data pattern and access pattern.',
      'This optimization technique provides the best performance improvement for high traffic scenarios.'
    ]
  },
  'web-dev': {
    templates: [
      'What is the best practice for %s in modern web development?',
      'How would you implement %s in a web application?',
      'What's the most efficient way to handle %s?',
      'Which framework would you choose for %s?',
      'How would you optimize %s in a web app?'
    ],
    options: [
      ['React', 'Vue', 'Angular', 'Svelte'],
      ['Client-side', 'Server-side', 'Hybrid', 'Static'],
      ['REST API', 'GraphQL', 'WebSocket', 'Server-Sent Events'],
      ['Next.js', 'Nuxt', 'Gatsby', 'Remix'],
      ['Code Splitting', 'Lazy Loading', 'Caching', 'Minification']
    ],
    explanations: [
      'This approach follows modern web development best practices.',
      'This implementation provides the best user experience and developer experience.',
      'This solution offers the best performance and maintainability.',
      'This framework is well-suited for this type of application.',
      'This optimization technique significantly improves application performance.'
    ]
  },
  'leadership': {
    templates: [
      'How would you handle %s in a team setting?',
      'What's the best approach to %s?',
      'How would you motivate a team member who %s?',
      'What's your strategy for %s?',
      'How would you address %s?'
    ],
    options: [
      ['Open Discussion', 'One-on-one Meeting', 'Team Building', 'Clear Guidelines'],
      ['Direct Approach', 'Collaborative Approach', 'Delegative Approach', 'Coaching Approach'],
      ['Recognition', 'Clear Goals', 'Development Opportunities', 'Regular Feedback'],
      ['Clear Communication', 'Regular Check-ins', 'Goal Setting', 'Performance Reviews'],
      ['Immediate Action', 'Planned Response', 'Team Discussion', 'Individual Coaching']
    ],
    explanations: [
      'This approach builds trust and promotes open communication.',
      'This leadership style is most effective in this situation.',
      'This motivation technique aligns with individual and team goals.',
      'This strategy promotes team growth and individual development.',
      'This response addresses the issue while maintaining team morale.'
    ]
  }
};

const scenarios: { [key: string]: string[] } = {
  'algorithms': [
    'binary search implementation',
    'tree traversal',
    'graph algorithms',
    'sorting algorithms',
    'dynamic programming solutions'
  ],
  'system-design': [
    'user authentication',
    'data replication',
    'caching strategies',
    'microservices communication',
    'database scaling'
  ],
  'web-dev': [
    'state management',
    'API integration',
    'performance optimization',
    'responsive design',
    'authentication flows'
  ],
  'leadership': [
    'conflict resolution',
    'team motivation',
    'project deadlines',
    'performance issues',
    'team collaboration'
  ]
};

export function generateTest(category: string, subcategory: string, difficulty: 'beginner' | 'intermediate' | 'advanced'): Test {
  const template = questionTemplates[subcategory] || questionTemplates['leadership']; // Default to leadership if no specific template
  const scenarioList = scenarios[subcategory] || scenarios['leadership'];

  const questions = Array.from({ length: 10 }, (_, index) => {
    const templateIndex = index % template.templates.length;
    const scenarioIndex = index % scenarioList.length;
    const scenario = scenarioList[scenarioIndex];

    return {
      id: `${subcategory}-${difficulty}-${index + 1}`,
      text: template.templates[templateIndex].replace('%s', scenario),
      options: template.options[templateIndex],
      correctAnswer: template.options[templateIndex][0], // First option is correct
      explanation: template.explanations[templateIndex].replace('%s', scenario)
    };
  });

  const timeLimit = difficulty === 'beginner' ? 30 : difficulty === 'intermediate' ? 45 : 60;

  return {
    id: `${subcategory}-${difficulty}`,
    title: `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Test`,
    description: `A comprehensive ${difficulty} level test covering ${subcategory} concepts and best practices.`,
    difficulty,
    timeLimit,
    totalQuestions: 10,
    category,
    subcategory,
    questions
  };
}

export function generateAllTests(): Test[] {
  const allTests: Test[] = [];

  categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      ['beginner', 'intermediate', 'advanced'].forEach(difficulty => {
        allTests.push(generateTest(category.id, subcategory.id, difficulty as 'beginner' | 'intermediate' | 'advanced'));
      });
    });
  });

  return allTests;
}
