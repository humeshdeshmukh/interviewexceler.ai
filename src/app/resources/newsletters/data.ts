export interface Newsletter {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    company: string;
  };
  tags: string[];
  externalUrl: string;
  featured?: boolean;
  referralLinks: {
    title: string;
    url: string;
    description: string;
  }[];
}

export const newsletterCategories = [
  'Interview Prep',
  'Career Growth',
  'Tech Trends',
  'Industry Insights',
  'Engineering'
];

export const newsletters: Newsletter[] = [
  {
    id: 'system-design',
    title: 'System Design Newsletter',
    description: 'Weekly deep dives into system design concepts, distributed systems, and scalability challenges from top tech companies.',
    content: 'Subscribe to access full content...',
    date: '2024-01-05',
    category: 'Engineering',
    readTime: '10 min read',
    author: {
      name: 'Alex Xu',
      role: 'Founder',
      company: 'ByteByteGo'
    },
    tags: ['system design', 'architecture', 'scalability', 'engineering'],
    externalUrl: 'https://blog.bytebytego.com',
    featured: true,
    referralLinks: [
      {
        title: 'Free Resources',
        url: 'https://github.com/ByteByteGoHq/system-design-101',
        description: 'Free system design resources'
      },
      {
        title: 'Interview Guide',
        url: 'https://bytebytego.com/courses/system-design-interview',
        description: 'System design interview guide'
      }
    ]
  },
  {
    id: 'tech-interview',
    title: 'Tech Interview Handbook',
    description: 'Comprehensive guide to technical interviews, with real questions, solutions, and preparation strategies.',
    content: 'Subscribe to access full content...',
    date: '2024-01-10',
    category: 'Interview Prep',
    readTime: '15 min read',
    author: {
      name: 'Yangshun Tay',
      role: 'Author',
      company: 'Tech Interview Handbook'
    },
    tags: ['interviews', 'algorithms', 'preparation', 'career'],
    externalUrl: 'https://www.techinterviewhandbook.org',
    featured: true,
    referralLinks: [
      {
        title: 'Coding Patterns',
        url: 'https://www.techinterviewhandbook.org/algorithms/introduction/',
        description: 'Common coding patterns'
      },
      {
        title: 'Interview Questions',
        url: 'https://www.techinterviewhandbook.org/best-practice-questions/',
        description: 'Curated interview questions'
      }
    ]
  },
  {
    id: 'engineering-daily',
    title: 'Engineering Daily',
    description: 'Daily insights into software engineering trends, best practices, and technical deep dives.',
    content: 'Subscribe to access full content...',
    date: '2024-01-15',
    category: 'Engineering',
    readTime: '12 min read',
    author: {
      name: 'Jeff Meyerson',
      role: 'Founder',
      company: 'Software Engineering Daily'
    },
    tags: ['software engineering', 'technology', 'best practices'],
    externalUrl: 'https://www.softwareengineeringdaily.com',
    referralLinks: [
      {
        title: 'Latest Episodes',
        url: 'https://softwareengineeringdaily.com/category/all-episodes/',
        description: 'Recent engineering podcasts'
      },
      {
        title: 'Engineering Blog',
        url: 'https://softwareengineeringdaily.com/category/blog/',
        description: 'Technical blog posts'
      }
    ]
  },
  {
    id: 'leetcode',
    title: 'LeetCode Weekly',
    description: 'Weekly coding challenges, interview patterns, and problem-solving strategies for technical interviews.',
    content: 'Subscribe to access full content...',
    date: '2024-01-20',
    category: 'Interview Prep',
    readTime: '10 min read',
    author: {
      name: 'LeetCode Team',
      role: 'Content Team',
      company: 'LeetCode'
    },
    tags: ['algorithms', 'coding', 'interview prep'],
    externalUrl: 'https://leetcode.com/explore/',
    featured: true,
    referralLinks: [
      {
        title: 'Top Interview Problems',
        url: 'https://leetcode.com/problem-list/top-interview-questions/',
        description: 'Must-solve interview problems'
      },
      {
        title: 'Study Plans',
        url: 'https://leetcode.com/study-plan/',
        description: 'Structured learning paths'
      }
    ]
  },
  {
    id: 'system-design-primer',
    title: 'System Design Primer',
    description: 'Comprehensive guide to large-scale system design. Learn from real-world architectures and best practices.',
    content: 'Subscribe to access full content...',
    date: '2024-01-25',
    category: 'Engineering',
    readTime: '20 min read',
    author: {
      name: 'Donne Martin',
      role: 'Creator',
      company: 'System Design Primer'
    },
    tags: ['system design', 'architecture', 'scalability'],
    externalUrl: 'https://github.com/donnemartin/system-design-primer',
    featured: true,
    referralLinks: [
      {
        title: 'Interactive Learning',
        url: 'https://github.com/donnemartin/system-design-primer#interactive-learning',
        description: 'Hands-on system design'
      },
      {
        title: 'Real World Examples',
        url: 'https://github.com/donnemartin/system-design-primer#real-world-architectures',
        description: 'Case studies of large systems'
      }
    ]
  },
  {
    id: 'frontend-masters',
    title: 'Frontend Masters Newsletter',
    description: 'Stay updated with the latest in frontend development, including frameworks, tools, and best practices.',
    content: 'Subscribe to access full content...',
    date: '2024-02-01',
    category: 'Tech Trends',
    readTime: '8 min read',
    author: {
      name: 'Frontend Masters',
      role: 'Content Team',
      company: 'Frontend Masters'
    },
    tags: ['frontend', 'web development', 'javascript'],
    externalUrl: 'https://frontendmasters.com/learn/',
    referralLinks: [
      {
        title: 'Learning Paths',
        url: 'https://frontendmasters.com/learn/',
        description: 'Structured learning paths'
      },
      {
        title: 'Frontend Handbook',
        url: 'https://frontendmasters.com/guides/',
        description: 'Free development guides'
      }
    ]
  },
  {
    id: 'web-dev',
    title: 'Web.dev Newsletter',
    description: 'Official Google web development newsletter covering best practices, performance, and modern web capabilities.',
    content: 'Subscribe to access full content...',
    date: '2024-02-05',
    category: 'Tech Trends',
    readTime: '10 min read',
    author: {
      name: 'Google Chrome Team',
      role: 'Web Platform Team',
      company: 'Google'
    },
    tags: ['web development', 'performance', 'best practices'],
    externalUrl: 'https://web.dev',
    referralLinks: [
      {
        title: 'Learn Web Dev',
        url: 'https://web.dev/learn',
        description: 'Web development courses'
      },
      {
        title: 'Best Practices',
        url: 'https://web.dev/patterns',
        description: 'Modern web patterns'
      }
    ]
  },
  {
    id: 'devops-weekly',
    title: 'DevOps Weekly',
    description: 'Weekly newsletter covering DevOps practices, tools, and methodologies for modern software delivery.',
    content: 'Subscribe to access full content...',
    date: '2024-02-10',
    category: 'Engineering',
    readTime: '12 min read',
    author: {
      name: 'Gareth Rushgrove',
      role: 'Editor',
      company: 'DevOps Weekly'
    },
    tags: ['devops', 'cloud', 'automation'],
    externalUrl: 'https://www.devopsweekly.com',
    referralLinks: [
      {
        title: 'DevOps Guide',
        url: 'https://github.com/Tikam02/DevOps-Guide',
        description: 'Comprehensive DevOps guide'
      },
      {
        title: 'DevOps Roadmap',
        url: 'https://roadmap.sh/devops',
        description: 'DevOps learning path'
      }
    ]
  }
];
