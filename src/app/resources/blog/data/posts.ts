import { BlogPost } from '../types/blog';

export const POSTS_PER_PAGE = 6;

export const CATEGORIES = [
  'All',
  'System Design',
  'Coding Interviews',
  'Career Growth',
  'Interview Prep',
  'Tech Skills',
  'Job Search'
] as const;

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: "Master System Design: From Basic to FAANG Level",
    date: "December 23, 2024",
    excerpt: "Learn the essential system design principles that top tech companies look for. From scalability to microservices architecture, master it all.",
    link: "/blog/system-design-mastery",
    category: "System Design",
    readTime: "15 min read",
    author: "Alex Chen, Ex-Google Tech Lead",
    referralLinks: [
      {
        title: "System Design Course",
        url: "https://www.educative.io/system-design",
        description: "Comprehensive system design course"
      },
      {
        title: "Architecture Patterns",
        url: "https://www.patterns.dev",
        description: "Modern design patterns"
      }
    ]
  },
  {
    id: '2',
    title: "Cracking the Coding Interview: LeetCode Patterns",
    date: "December 21, 2024",
    excerpt: "Discover the most common coding patterns in technical interviews. Master sliding window, two pointers, and dynamic programming approaches.",
    link: "/blog/leetcode-patterns",
    category: "Coding Interviews",
    readTime: "12 min read",
    author: "Sarah Miller, Tech Interview Coach",
    referralLinks: [
      {
        title: "LeetCode Premium",
        url: "https://leetcode.com/premium",
        description: "Access company-specific questions"
      },
      {
        title: "AlgoExpert",
        url: "https://www.algoexpert.io",
        description: "Curated coding problems"
      }
    ]
  },
  {
    id: '3',
    title: "Negotiating Your Tech Salary in 2024",
    date: "December 19, 2024",
    excerpt: "Learn proven strategies for negotiating your tech salary. Real examples from FAANG companies and startups included.",
    link: "/blog/salary-negotiation",
    category: "Career Growth",
    readTime: "10 min read",
    author: "Michael Brown, Career Coach",
    referralLinks: [
      {
        title: "Levels.fyi",
        url: "https://www.levels.fyi",
        description: "Tech salary data"
      },
      {
        title: "Blind",
        url: "https://www.teamblind.com",
        description: "Anonymous tech community"
      }
    ]
  },
  {
    id: '4',
    title: "The Ultimate Guide to Behavioral Interviews",
    date: "December 18, 2024",
    excerpt: "Master the STAR method and ace your behavioral interviews. Includes real questions from top tech companies.",
    link: "/blog/behavioral-interviews",
    category: "Interview Prep",
    readTime: "8 min read",
    author: "Emily Zhang, Interview Expert",
    referralLinks: [
      {
        title: "Interview.io",
        url: "https://interview.io",
        description: "Practice mock interviews"
      },
      {
        title: "Pramp",
        url: "https://www.pramp.com",
        description: "Peer mock interviews"
      }
    ]
  },
  {
    id: '5',
    title: "Full Stack Development Roadmap 2024",
    date: "December 16, 2024",
    excerpt: "A comprehensive guide to becoming a full-stack developer. Includes tools, frameworks, and learning resources.",
    link: "/blog/fullstack-roadmap",
    category: "Tech Skills",
    readTime: "14 min read",
    author: "David Park, Senior Developer",
    referralLinks: [
      {
        title: "Frontend Masters",
        url: "https://frontendmasters.com",
        description: "Advanced web development courses"
      },
      {
        title: "Udemy Tech Courses",
        url: "https://udemy.com/tech",
        description: "Practical coding courses"
      }
    ]
  }
];
