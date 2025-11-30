export interface FAQCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  faqs: FAQ[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  relatedLinks?: {
    text: string;
    url: string;
  }[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    title: 'General Questions',
    icon: 'FaInfoCircle',
    description: 'Common questions about our platform and services',
    faqs: [
      {
        id: 'what-is',
        question: 'What is InterviewExceler.Ai?',
        answer: 'InterviewExceler.Ai is an advanced AI-powered platform designed to help you prepare for technical interviews. We provide personalized practice sessions, real-time feedback, and comprehensive learning resources tailored to your specific needs and target roles.',
        relatedLinks: [
          { text: 'View Features', url: '/features' },
          { text: 'Get Started', url: '/signup' }
        ]
      },
      {
        id: 'how-works',
        question: 'How does the AI interview practice work?',
        answer: 'Our AI system simulates real interview scenarios by asking relevant technical questions, analyzing your responses in real-time, and providing detailed feedback on your answers. It adapts to your skill level and focuses on areas where you need the most improvement.',
        relatedLinks: [
          { text: 'Try Demo', url: '/demo' }
        ]
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Practice',
    icon: 'FaCode',
    description: 'Questions about coding challenges and technical interviews',
    faqs: [
      {
        id: 'languages',
        question: 'What programming languages are supported?',
        answer: 'We support all major programming languages including Python, Java, JavaScript, C++, and more. You can practice coding problems in your preferred language, and our AI will provide language-specific feedback and best practices.',
        relatedLinks: [
          { text: 'View Supported Languages', url: '/languages' }
        ]
      },
      {
        id: 'difficulty',
        question: 'How is the difficulty level determined?',
        answer: 'Our AI system assesses your skill level through initial practice sessions and continuously adjusts the difficulty of questions based on your performance. You can also manually select your preferred difficulty level.',
        relatedLinks: [
          { text: 'Skill Assessment', url: '/assessment' }
        ]
      }
    ]
  },
  {
    id: 'pricing',
    title: 'Pricing & Plans',
    icon: 'FaDollarSign',
    description: 'Information about our pricing plans and features',
    faqs: [
      {
        id: 'free-trial',
        question: 'Is there a free trial?',
        answer: 'Yes! We offer a 7-day free trial that gives you full access to all our features. No credit card required. You can explore our platform, try practice interviews, and see if it is right for you.',
        relatedLinks: [
          { text: 'Start Free Trial', url: '/trial' },
          { text: 'Compare Plans', url: '/pricing' }
        ]
      },
      {
        id: 'refund',
        question: 'What is your refund policy?',
        answer: 'We offer a 30-day money-back guarantee. If you are not satisfied with our service within the first 30 days of your paid subscription, we will provide a full refund, no questions asked.',
        relatedLinks: [
          { text: 'Refund Policy', url: '/refund-policy' }
        ]
      }
    ]
  },
  {
    id: 'account',
    title: 'Account & Settings',
    icon: 'FaUserCog',
    description: 'Help with account management and preferences',
    faqs: [
      {
        id: 'profile',
        question: 'How do I update my profile?',
        answer: 'You can update your profile information, including your experience level, target roles, and preferences, from your account settings. These details help us personalize your interview practice sessions.',
        relatedLinks: [
          { text: 'Account Settings', url: '/settings' }
        ]
      },
      {
        id: 'progress',
        question: 'How is my progress tracked?',
        answer: 'We provide detailed analytics and progress tracking, including performance metrics, improvement areas, and practice history. You can view these insights from your dashboard.',
        relatedLinks: [
          { text: 'View Dashboard', url: '/dashboard' }
        ]
      }
    ]
  }
];
