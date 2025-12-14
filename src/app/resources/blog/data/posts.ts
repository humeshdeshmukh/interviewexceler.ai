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
    slug: "system-design-mastery",
    date: "December 23, 2024",
    excerpt: "Learn the essential system design principles that top tech companies look for. From scalability to microservices architecture, master it all.",
    link: "/resources/blog/system-design-mastery",
    category: "System Design",
    readTime: "15 min read",
    author: "Alex Chen, Ex-Google Tech Lead",
    keywords: ["system design interview", "FAANG interview", "scalability", "microservices", "distributed systems"],
    image: "/images/blog/system-design.jpg",
    content: `
# Master System Design: From Basic to FAANG Level

System design interviews are a critical part of the interview process at top tech companies like Google, Amazon, Facebook, Apple, and Netflix (FAANG). This comprehensive guide will help you understand the fundamentals and prepare you for success.

## Why System Design Matters

System design interviews assess your ability to design large-scale distributed systems. They evaluate:

- **Scalability thinking**: Can you design systems that handle millions of users?
- **Technical depth**: Do you understand the trade-offs between different architectural decisions?
- **Communication skills**: Can you explain complex technical concepts clearly?

## Key Concepts to Master

### 1. Scalability

Scalability is the ability of a system to handle growing amounts of work. There are two types:

- **Vertical Scaling (Scale Up)**: Adding more power to existing machines
- **Horizontal Scaling (Scale Out)**: Adding more machines to the system

### 2. Load Balancing

Load balancers distribute incoming network traffic across multiple servers. Popular strategies include:

- Round Robin
- Least Connections
- IP Hash
- Weighted Round Robin

### 3. Database Design

Understanding when to use SQL vs NoSQL databases is crucial:

- **SQL databases**: Best for complex queries, ACID compliance, structured data
- **NoSQL databases**: Best for scalability, flexibility, unstructured data

### 4. Caching

Caching improves system performance by storing frequently accessed data. Popular caching strategies include:

- Cache-aside (Lazy loading)
- Write-through
- Write-behind (Write-back)

## Practice Problems

1. Design a URL shortener (like bit.ly)
2. Design a social media feed
3. Design a chat application
4. Design a video streaming platform

## Conclusion

Mastering system design takes time and practice. Focus on understanding the fundamentals, practice with real problems, and learn from feedback. Good luck with your interviews!
    `,
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
    slug: "leetcode-patterns",
    date: "December 21, 2024",
    excerpt: "Discover the most common coding patterns in technical interviews. Master sliding window, two pointers, and dynamic programming approaches.",
    link: "/resources/blog/leetcode-patterns",
    category: "Coding Interviews",
    readTime: "12 min read",
    author: "Sarah Miller, Tech Interview Coach",
    keywords: ["leetcode patterns", "coding interview", "data structures", "algorithms", "technical interview"],
    image: "/images/blog/leetcode.jpg",
    content: `
# Cracking the Coding Interview: LeetCode Patterns

Success in coding interviews isn't about memorizing solutions—it's about recognizing patterns. This guide covers the most important patterns you need to know.

## The Most Important Coding Patterns

### 1. Two Pointers

The two pointers technique uses two pointers to iterate through data structures. It's useful for:

- Finding pairs in sorted arrays
- Removing duplicates
- Reversing arrays
- Finding the middle of a linked list

**Example problem**: Find two numbers in a sorted array that sum to a target.

### 2. Sliding Window

The sliding window pattern is used for problems involving subarrays or substrings:

- Finding the maximum sum subarray of size k
- Finding the longest substring with k distinct characters
- Finding anagrams in a string

### 3. Binary Search

Binary search is essential for searching in sorted collections:

- Finding an element in a sorted array
- Finding the first/last occurrence
- Finding the smallest/largest element satisfying a condition

### 4. BFS and DFS

Graph traversal algorithms are crucial for:

- Finding shortest paths
- Detecting cycles
- Topological sorting
- Connected components

### 5. Dynamic Programming

DP is used when a problem has overlapping subproblems:

- Fibonacci sequence
- Coin change problem
- Longest common subsequence
- Knapsack problem

## Practice Strategy

1. **Learn the pattern first**: Understand when to apply each pattern
2. **Solve easy problems**: Build confidence with simpler versions
3. **Increase difficulty gradually**: Move to medium and hard problems
4. **Time yourself**: Practice under interview conditions

## Top 20 Must-Solve Problems

1. Two Sum
2. Valid Parentheses
3. Merge Two Sorted Lists
4. Maximum Subarray
5. Climbing Stairs
... and more!

Good luck with your coding interviews!
    `,
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
    slug: "salary-negotiation",
    date: "December 19, 2024",
    excerpt: "Learn proven strategies for negotiating your tech salary. Real examples from FAANG companies and startups included.",
    link: "/resources/blog/salary-negotiation",
    category: "Career Growth",
    readTime: "10 min read",
    author: "Michael Brown, Career Coach",
    keywords: ["salary negotiation", "tech salary", "compensation package", "FAANG salary", "career growth"],
    image: "/images/blog/salary.jpg",
    content: `
# Negotiating Your Tech Salary in 2024

Salary negotiation is one of the most important skills in your career. A successful negotiation can mean tens of thousands of dollars more per year.

## Why You Should Always Negotiate

Studies show that:
- 84% of employers expect candidates to negotiate
- The average raise from negotiation is 5-10%
- Not negotiating can cost you $500,000+ over your career

## Research Your Market Value

Before negotiating, know your worth:

1. **Use salary data sites**: Levels.fyi, Glassdoor, Blind
2. **Talk to peers**: Anonymous forums, networking events
3. **Consider location**: Remote vs in-office, cost of living
4. **Factor in experience**: Years of experience, special skills

## The Negotiation Framework

### Step 1: Wait for the Offer

Never share your current salary or desired salary first. Let the employer make the first move.

### Step 2: Express Enthusiasm

Show you're excited about the role before discussing compensation.

### Step 3: Ask for Time

"Thank you for the offer! I'm very excited about this opportunity. Can I have a few days to review the details?"

### Step 4: Make Your Counter

Be specific and provide justification:

"Based on my research and the value I'll bring, I'm looking for a base salary of $X, which aligns with the market rate for this role."

### Step 5: Negotiate the Full Package

Don't forget about:
- Signing bonus
- Stock options/RSUs
- Annual bonus
- Remote work flexibility
- Professional development budget

## Real Examples

**Example 1**: Software Engineer at Google
- Initial offer: $180,000 base
- After negotiation: $195,000 base + $30,000 signing bonus

**Example 2**: Senior Developer at Startup
- Initial offer: $150,000 base
- After negotiation: $165,000 base + 0.1% additional equity

## Conclusion

Remember: negotiation is expected and respected. Prepare well, be confident, and advocate for your worth!
    `,
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
    slug: "behavioral-interviews",
    date: "December 18, 2024",
    excerpt: "Master the STAR method and ace your behavioral interviews. Includes real questions from top tech companies.",
    link: "/resources/blog/behavioral-interviews",
    category: "Interview Prep",
    readTime: "8 min read",
    author: "Emily Zhang, Interview Expert",
    keywords: ["behavioral interview", "STAR method", "interview questions", "soft skills", "leadership principles"],
    image: "/images/blog/behavioral.jpg",
    content: `
# The Ultimate Guide to Behavioral Interviews

Behavioral interviews are designed to assess how you've handled situations in the past. Your past behavior is the best predictor of future performance.

## The STAR Method

STAR stands for:

- **S**ituation: Set the scene
- **T**ask: Describe what you needed to accomplish
- **A**ction: Explain what you specifically did
- **R**esult: Share the outcome

## Common Behavioral Questions

### Leadership
- "Tell me about a time you led a project."
- "Describe a situation where you had to motivate a team."

### Conflict Resolution
- "Tell me about a time you disagreed with a coworker."
- "How do you handle difficult conversations?"

### Problem Solving
- "Describe a complex problem you solved."
- "Tell me about a time when you had to make a decision with incomplete information."

### Failure & Growth
- "Tell me about a time you failed."
- "Describe a project that didn't go as planned."

## Preparing Your Stories

Create a "story bank" with 8-10 experiences that cover:

1. A time you showed leadership
2. A conflict you resolved
3. A challenging project you completed
4. A time you failed and learned
5. A time you exceeded expectations
6. A decision you made under pressure
7. A time you helped a teammate
8. A creative solution you developed

## Amazon's Leadership Principles

If interviewing at Amazon, know these principles:
- Customer Obsession
- Ownership
- Invent and Simplify
- Bias for Action
- Learn and Be Curious
- Hire and Develop the Best
- Insist on the Highest Standards
- Think Big
- Frugality
- Earn Trust
- Dive Deep
- Have Backbone; Disagree and Commit
- Deliver Results
- Strive to be Earth's Best Employer
- Success and Scale Bring Broad Responsibility

## Tips for Success

1. Be specific with numbers and metrics
2. Focus on YOUR contributions, not the team's
3. Practice out loud
4. Keep answers to 2-3 minutes
5. End with positive outcomes

Good luck with your behavioral interviews!
    `,
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
    slug: "fullstack-roadmap",
    date: "December 16, 2024",
    excerpt: "A comprehensive guide to becoming a full-stack developer. Includes tools, frameworks, and learning resources.",
    link: "/resources/blog/fullstack-roadmap",
    category: "Tech Skills",
    readTime: "14 min read",
    author: "David Park, Senior Developer",
    keywords: ["full stack developer", "web development", "frontend", "backend", "programming roadmap"],
    image: "/images/blog/fullstack.jpg",
    content: `
# Full Stack Development Roadmap 2024

Becoming a full-stack developer is an exciting journey. This roadmap will guide you through the essential skills and technologies.

## Phase 1: Fundamentals (Months 1-2)

### HTML & CSS
- Semantic HTML5
- CSS Grid and Flexbox
- Responsive design
- CSS preprocessors (Sass)

### JavaScript Basics
- Variables, data types, operators
- Functions and scope
- DOM manipulation
- ES6+ features

## Phase 2: Frontend Development (Months 3-4)

### Modern JavaScript
- Async/await and Promises
- Array methods (map, filter, reduce)
- Modules and bundlers

### React.js
- Components and props
- State management with hooks
- Context API and Redux
- React Router

### CSS Frameworks
- Tailwind CSS
- Styled Components
- CSS Modules

## Phase 3: Backend Development (Months 5-6)

### Node.js & Express
- RESTful API design
- Middleware
- Authentication (JWT, OAuth)
- Error handling

### Databases
- SQL basics (PostgreSQL, MySQL)
- NoSQL (MongoDB)
- ORM (Prisma, Sequelize)

## Phase 4: Full Stack Integration (Months 7-8)

### Next.js
- Server-side rendering
- API routes
- Static site generation
- Full-stack applications

### Deployment
- Vercel, Netlify
- Docker basics
- CI/CD pipelines

## Phase 5: Advanced Topics (Months 9-12)

### Cloud Services
- AWS basics
- Serverless functions
- S3, Lambda, DynamoDB

### Testing
- Unit testing (Jest)
- Integration testing
- E2E testing (Cypress)

### DevOps Fundamentals
- Git advanced
- Docker
- Kubernetes basics

## Learning Resources

1. **Free resources**: freeCodeCamp, The Odin Project
2. **Paid courses**: Frontend Masters, Udemy
3. **Documentation**: MDN Web Docs, React docs

## Building Your Portfolio

Create 3-5 projects:
1. Personal portfolio website
2. Full-stack e-commerce app
3. Real-time chat application
4. API with authentication
5. Open source contribution

## Conclusion

The journey to becoming a full-stack developer takes time, but with consistent practice and the right resources, you can achieve your goals. Start building today!
    `,
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
  },
  {
    id: '6',
    title: "How to Prepare for AI/ML Interviews",
    slug: "ai-ml-interview-prep",
    date: "December 14, 2024",
    excerpt: "Complete guide to acing AI and machine learning interviews at top tech companies. Covers theory, coding, and system design.",
    link: "/resources/blog/ai-ml-interview-prep",
    category: "Interview Prep",
    readTime: "16 min read",
    author: "Dr. Lisa Wang, ML Engineer at Meta",
    keywords: ["AI interview", "machine learning interview", "data science", "deep learning", "ML system design"],
    image: "/images/blog/ai-ml.jpg",
    content: `
# How to Prepare for AI/ML Interviews

AI and machine learning roles are among the most sought-after positions in tech. This guide covers everything you need to know to succeed.

## Interview Format

Most AI/ML interviews include:

1. **Phone Screen**: Basic ML concepts and coding
2. **Technical Deep Dive**: Advanced ML theory
3. **Coding Interview**: Implement ML algorithms
4. **ML System Design**: Design ML systems at scale
5. **Behavioral Interview**: Soft skills and culture fit

## Core ML Concepts

### Supervised Learning
- Linear/Logistic Regression
- Decision Trees and Random Forests
- Support Vector Machines
- Neural Networks

### Unsupervised Learning
- K-means Clustering
- PCA and Dimensionality Reduction
- Autoencoders

### Deep Learning
- CNNs for computer vision
- RNNs/LSTMs for sequences
- Transformers and attention
- GANs and diffusion models

## Common Interview Questions

### Theory Questions
1. Explain bias-variance tradeoff
2. How does gradient descent work?
3. What is regularization? Why use it?
4. Explain precision vs recall

### Coding Questions
1. Implement linear regression from scratch
2. Code a simple neural network
3. Implement k-means clustering
4. Build a decision tree

### System Design Questions
1. Design a recommendation system
2. Build a fraud detection system
3. Design a content moderation pipeline
4. Build a real-time translation service

## Preparation Strategy

### Months 1-2: Foundations
- Review statistics and probability
- Study ML algorithms in depth
- Practice Python and NumPy

### Months 3-4: Deep Learning
- Study neural network architectures
- Work through deep learning courses
- Implement models from scratch

### Months 5-6: Practice & Projects
- Solve ML interview questions
- Build end-to-end ML projects
- Practice system design

## Resources

- **Courses**: Coursera ML, Fast.ai
- **Books**: "Hands-On ML", "Deep Learning" by Goodfellow
- **Practice**: LeetCode, ML-specific interviews

Good luck with your AI/ML interviews!
    `,
    referralLinks: [
      {
        title: "Coursera ML Course",
        url: "https://www.coursera.org/learn/machine-learning",
        description: "Andrew Ng's famous ML course"
      },
      {
        title: "Fast.ai",
        url: "https://www.fast.ai",
        description: "Practical deep learning courses"
      }
    ]
  },
  {
    id: '7',
    title: "Remote Job Search Strategies That Work",
    slug: "remote-job-strategies",
    date: "December 12, 2024",
    excerpt: "Proven strategies for landing remote tech jobs in 2024. From optimizing your resume to acing virtual interviews.",
    link: "/resources/blog/remote-job-strategies",
    category: "Job Search",
    readTime: "11 min read",
    author: "Jessica Torres, Remote Work Advocate",
    keywords: ["remote jobs", "work from home", "job search", "virtual interview", "remote work tips"],
    image: "/images/blog/remote.jpg",
    content: `
# Remote Job Search Strategies That Work

The remote job market is competitive, but with the right strategies, you can land your dream remote position.

## Finding Remote Opportunities

### Top Remote Job Boards
1. **Remote.co**: Curated remote positions
2. **We Work Remotely**: Large tech job board
3. **FlexJobs**: Vetted remote opportunities
4. **AngelList**: Startup remote roles
5. **LinkedIn**: Filter for remote positions

### Company Research
Look for companies that are:
- Fully remote (GitLab, Automattic, Zapier)
- Remote-first (Basecamp, Buffer)
- Hybrid with remote options

## Optimizing Your Application

### Resume Tips for Remote Roles
- Highlight remote work experience
- Mention collaboration tools (Slack, Zoom, etc.)
- Show self-motivation and time management
- Include relevant time zone information

### Cover Letter Essentials
1. Address why you want to work remotely
2. Demonstrate remote work readiness
3. Show examples of async communication
4. Mention your home office setup

## Virtual Interview Success

### Technical Setup
- Test your internet connection
- Use quality headphones with mic
- Ensure good lighting
- Have a clean background

### Communication Tips
- Look at the camera, not the screen
- Speak clearly and pause appropriately
- Use the mute button when not speaking
- Have notes ready (but don't read them)

### Questions to Ask
1. "How does the team communicate async?"
2. "What tools do you use for collaboration?"
3. "How do you maintain team culture remotely?"
4. "What does a typical workday look like?"

## Building Your Remote Presence

### Online Portfolio
- GitHub profile with active projects
- Personal website/blog
- LinkedIn optimization
- Twitter for networking

### Networking
- Join remote work communities
- Attend virtual conferences
- Participate in online forums
- Contribute to open source

## After Getting the Offer

### Negotiation
- Remote work can justify location-independent salaries
- Ask about equipment stipends
- Clarify coworking space allowances
- Discuss time zone expectations

### Setting Up for Success
- Create a dedicated workspace
- Establish a routine
- Over-communicate initially
- Build relationships intentionally

Good luck with your remote job search!
    `,
    referralLinks: [
      {
        title: "Remote.co",
        url: "https://remote.co",
        description: "Curated remote job listings"
      },
      {
        title: "We Work Remotely",
        url: "https://weworkremotely.com",
        description: "Large remote job board"
      }
    ]
  }
];

// Helper function to get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Helper function to get related posts
export function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}
