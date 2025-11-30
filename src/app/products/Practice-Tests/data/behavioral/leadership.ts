import { Test } from '../../utils/types';

export const leadershipTests: Test[] = [
  {
    id: 'leadership-beginner',
    title: 'Leadership Fundamentals',
    description: 'Test your understanding of basic leadership principles and practices.',
    difficulty: 'beginner',
    timeLimit: 30,
    totalQuestions: 10,
    category: 'behavioral',
    subcategory: 'leadership',
    questions: [
      {
        text: 'What is the most effective way to delegate tasks to team members?',
        options: [
          'Assign tasks without explanation',
          'Clearly communicate expectations and provide necessary resources',
          'Let team members choose their own tasks',
          'Micromanage every aspect of the task'
        ],
        correctAnswer: 'Clearly communicate expectations and provide necessary resources',
        explanation: 'Effective delegation requires clear communication of expectations and ensuring team members have the resources they need to succeed'
      },
      {
        text: 'How should a leader handle a team member who consistently underperforms?',
        options: [
          'Immediately terminate their employment',
          'Ignore the problem to avoid confrontation',
          'Have a private discussion to understand and address the issues',
          'Publicly criticize their performance'
        ],
        correctAnswer: 'Have a private discussion to understand and address the issues',
        explanation: 'Leaders should address performance issues privately and constructively, seeking to understand root causes and develop improvement plans'
      },
      {
        text: 'When team members have conflicting ideas about a project direction, what should a leader do?',
        options: [
          'Choose the idea from the most experienced team member',
          'Implement all ideas simultaneously',
          'Facilitate a discussion to find common ground',
          'Ignore the conflict and proceed with their own idea'
        ],
        correctAnswer: 'Facilitate a discussion to find common ground',
        explanation: 'Leaders should mediate conflicts constructively, helping team members understand each others perspectives and find solutions'
      },
      {
        text: 'What is the best approach to introducing a major change in team processes?',
        options: [
          'Implement the change immediately without discussion',
          'Communicate the change and gather feedback before implementation',
          'Let team members figure it out on their own',
          'Avoid making any changes'
        ],
        correctAnswer: 'Communicate the change and gather feedback before implementation',
        explanation: 'Effective change management requires clear communication and involving team members in the process to ensure buy-in and success'
      },
      {
        text: 'How should a leader respond to a mistake made by a team member?',
        options: [
          'Ignore it to maintain team morale',
          'Use it as a learning opportunity and support improvement',
          'Punish the team member to prevent future mistakes',
          'Blame the team member publicly'
        ],
        correctAnswer: 'Use it as a learning opportunity and support improvement',
        explanation: 'Leaders should create a culture where mistakes are viewed as learning opportunities rather than failures'
      },
      {
        text: 'What is the most important factor in building trust within a team?',
        options: [
          'Maintaining strict control',
          'Being consistently honest and transparent',
          'Avoiding all conflicts',
          'Having frequent social events'
        ],
        correctAnswer: 'Being consistently honest and transparent',
        explanation: 'Trust is built through consistent honesty, transparency, and following through on commitments'
      },
      {
        text: 'How should a leader handle disagreement with upper management?',
        options: [
          'Always agree with management',
          'Express concerns professionally with supporting evidence',
          'Complain to team members',
          'Ignore the disagreement'
        ],
        correctAnswer: 'Express concerns professionally with supporting evidence',
        explanation: 'Professional disagreement supported by evidence shows leadership maturity and commitment to organizational success'
      },
      {
        text: 'What is the best way to motivate team members?',
        options: [
          'Offer monetary rewards only',
          'Understand individual motivations and provide appropriate recognition',
          'Use fear of punishment',
          'Compare team members to each other'
        ],
        correctAnswer: 'Understand individual motivations and provide appropriate recognition',
        explanation: 'Different people are motivated by different factors, and effective leaders recognize and respond to these individual differences'
      },
      {
        text: 'How should a leader handle a team conflict?',
        options: [
          'Let the team resolve it themselves',
          'Address it immediately and facilitate resolution',
          'Ignore it until it goes away',
          'Take sides with one party'
        ],
        correctAnswer: 'Address it immediately and facilitate resolution',
        explanation: 'Prompt, fair conflict resolution maintains team harmony and demonstrates effective leadership'
      },
      {
        text: 'What is the most effective way to give feedback?',
        options: [
          'Wait for annual reviews',
          'Provide specific, timely, and constructive feedback regularly',
          'Only give positive feedback',
          'Avoid giving feedback'
        ],
        correctAnswer: 'Provide specific, timely, and constructive feedback regularly',
        explanation: 'Regular, specific feedback helps team members grow and improve continuously'
      }
    ]
  },
  {
    id: 'leadership-intermediate',
    title: 'Advanced Leadership Scenarios',
    description: 'Test your leadership skills with complex scenarios and strategic decision-making.',
    difficulty: 'intermediate',
    timeLimit: 45,
    totalQuestions: 10,
    category: 'behavioral',
    subcategory: 'leadership',
    questions: [
      {
        text: 'Your team is consistently missing sprint deadlines despite working overtime. What is the most effective long-term solution?',
        options: [
          'Add more team members immediately',
          'Analyze sprint metrics and team capacity, then adjust planning accordingly',
          'Reduce the scope of all future sprints',
          'Mandate longer working hours'
        ],
        correctAnswer: 'Analyze sprint metrics and team capacity, then adjust planning accordingly',
        explanation: 'Sustainable solutions require understanding root causes through data analysis and making informed adjustments to planning and processes'
      },
      {
        text: 'How should you handle a high-performing team member who frequently undermines team morale?',
        options: [
          'Ignore the behavior since they deliver good results',
          'Address the behavior privately and set clear expectations for team interaction',
          'Reduce their workload as punishment',
          'Transfer them to another team immediately'
        ],
        correctAnswer: 'Address the behavior privately and set clear expectations for team interaction',
        explanation: 'Performance includes both technical delivery and team collaboration. Leaders must address behaviors that harm team dynamics'
      },
      {
        text: 'Your team needs to choose between two technical approaches for a critical project. How do you facilitate the decision?',
        options: [
          'Choose the option preferred by senior team members',
          'Create a decision matrix with objective criteria and evaluate options collaboratively',
          'Let the team debate until someone gives in',
          'Implement both approaches simultaneously'
        ],
        correctAnswer: 'Create a decision matrix with objective criteria and evaluate options collaboratively',
        explanation: 'Using objective criteria and collaborative evaluation helps make better decisions and builds team buy-in'
      },
      {
        text: 'How do you maintain team motivation during a long-term, challenging project with multiple setbacks?',
        options: [
          'Focus only on the end goal',
          'Break down the project into smaller milestones and celebrate incremental progress',
          'Hide setbacks from the team',
          'Increase pressure to meet deadlines'
        ],
        correctAnswer: 'Break down the project into smaller milestones and celebrate incremental progress',
        explanation: 'Small wins and recognition help maintain momentum and morale during challenging projects'
      },
      {
        text: 'What is the best approach when inheriting a team with established but inefficient processes?',
        options: [
          'Immediately implement new processes based on best practices',
          'Understand current processes, involve team in improvement discussions, and implement changes gradually',
          'Continue with existing processes indefinitely',
          'Let each team member choose their preferred process'
        ],
        correctAnswer: 'Understand current processes, involve team in improvement discussions, and implement changes gradually',
        explanation: 'Successful process changes require understanding context, getting team buy-in, and managing change effectively'
      },
      {
        text: 'How should you handle a situation where upper management decisions conflict with team needs?',
        options: [
          'Simply enforce management decisions',
          'Advocate for team needs with data and propose alternative solutions',
          'Let the team ignore management decisions',
          'Complain about management to the team'
        ],
        correctAnswer: 'Advocate for team needs with data and propose alternative solutions',
        explanation: 'Effective leaders bridge gaps between management and teams by advocating with data and proposing constructive solutions'
      },
      {
        text: 'What is the best strategy for developing future leaders within your team?',
        options: [
          'Wait for them to ask for opportunities',
          'Create structured development plans with increasing responsibilities and mentorship',
          'Promote the most technically skilled members',
          'Send them to leadership training courses only'
        ],
        correctAnswer: 'Create structured development plans with increasing responsibilities and mentorship',
        explanation: 'Leadership development requires a combination of structured learning, practical experience, and ongoing mentorship'
      },
      {
        text: 'How do you handle a situation where two high-performing team members refuse to work together?',
        options: [
          'Keep them on separate projects indefinitely',
          'Identify root causes, mediate conflicts, and establish professional working agreements',
          'Force them to work together without intervention',
          'Ask one to transfer teams'
        ],
        correctAnswer: 'Identify root causes, mediate conflicts, and establish professional working agreements',
        explanation: 'Professional conflicts require understanding underlying issues and establishing clear expectations for collaboration'
      },
      {
        text: 'What approach should you take when team velocity consistently exceeds sprint commitments?',
        options: [
          'Increase sprint commitments immediately',
          'Evaluate quality metrics and technical debt before adjusting commitments',
          'Celebrate and maintain current velocity',
          'Give the team more challenging tasks'
        ],
        correctAnswer: 'Evaluate quality metrics and technical debt before adjusting commitments',
        explanation: 'High velocity should be balanced with quality and sustainability considerations'
      },
      {
        text: 'How do you handle a team member who frequently comes up with innovative ideas but rarely completes their assigned tasks?',
        options: [
          'Focus them solely on innovation and ideation',
          'Partner them with implementers and create accountability structures',
          'Ignore their ideas until they complete tasks',
          'Remove them from the team'
        ],
        correctAnswer: 'Partner them with implementers and create accountability structures',
        explanation: 'Good leaders find ways to leverage individual strengths while ensuring accountability for core responsibilities'
      }
    ]
  }
];
