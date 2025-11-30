import { Test } from '../../utils/types';

export const nonTechnicalTests: Test[] = [
  {
    id: 'communication-skills',
    title: 'Communication Skills Test',
    description: 'Assess your ability to communicate effectively in professional settings.',
    difficulty: 'beginner',
    timeLimit: 30,
    totalQuestions: 10,
    category: 'non-technical',
    subcategory: 'communication',
    questions: [
      {
        text: 'A colleague consistently misunderstands your project requirements. How do you address this?',
        options: [
          'Send longer, more detailed emails',
          'Schedule a meeting to discuss and use visual aids',
          'Ask someone else to explain it',
          'Complete their portion of the work yourself'
        ],
        correctAnswer: 'Schedule a meeting to discuss and use visual aids',
        explanation: 'Visual aids and face-to-face communication help ensure clear understanding and allow for immediate clarification'
      },
      {
        text: 'How do you handle receiving constructive criticism from a peer?',
        options: [
          'Defend your actions immediately',
          'Listen actively, ask questions, and consider their perspective',
          'Ignore their feedback',
          'Report them to management'
        ],
        correctAnswer: 'Listen actively, ask questions, and consider their perspective',
        explanation: 'Professional growth comes from being open to feedback and seeking to understand others perspectives'
      },
      {
        text: 'During a presentation, you notice audience members looking confused. What should you do?',
        options: [
          'Continue with the planned presentation',
          'Pause and ask for questions to check understanding',
          'End the presentation early',
          'Speak more quickly to finish sooner'
        ],
        correctAnswer: 'Pause and ask for questions to check understanding',
        explanation: 'Effective presenters monitor audience engagement and adjust their approach to ensure understanding'
      },
      {
        text: 'How should you communicate a project delay to stakeholders?',
        options: [
          'Wait until the last minute',
          'Communicate early with explanation and mitigation plan',
          'Only mention it if asked',
          'Blame team members for the delay'
        ],
        correctAnswer: 'Communicate early with explanation and mitigation plan',
        explanation: 'Proactive communication with solutions maintains trust and allows stakeholders to adjust their plans'
      },
      {
        text: 'What is the best way to handle a disagreement in a team meeting?',
        options: [
          'Argue until you win',
          'Stay silent and complain later',
          'Listen to all viewpoints and seek common ground',
          'End the meeting immediately'
        ],
        correctAnswer: 'Listen to all viewpoints and seek common ground',
        explanation: 'Professional disagreements should focus on understanding different perspectives and finding solutions'
      },
      {
        text: 'How do you ensure your emails are effective?',
        options: [
          'Write as much detail as possible',
          'Keep them brief with clear action items',
          'Use lots of formatting and colors',
          'Copy everyone in the company'
        ],
        correctAnswer: 'Keep them brief with clear action items',
        explanation: 'Effective emails are concise, clearly state the purpose, and specify required actions'
      },
      {
        text: 'A colleague seems upset after a meeting. What should you do?',
        options: [
          'Ignore it to avoid conflict',
          'Check in privately to see if they want to talk',
          'Tell everyone they are upset',
          'Pretend nothing happened'
        ],
        correctAnswer: 'Check in privately to see if they want to talk',
        explanation: 'Showing empathy and offering support privately helps maintain professional relationships'
      },
      {
        text: 'How do you handle interruptions during team discussions?',
        options: [
          'Let the loudest person speak',
          'Establish speaking turns and acknowledge all contributions',
          'End the discussion',
          'Talk over others to be heard'
        ],
        correctAnswer: 'Establish speaking turns and acknowledge all contributions',
        explanation: 'Effective discussions require managing participation to ensure all voices are heard'
      },
      {
        text: 'What is the best approach to giving updates in stand-up meetings?',
        options: [
          'Share every detail of your work',
          'Provide relevant updates and flag blockers concisely',
          'Let others do the talking',
          'Skip the meeting if busy'
        ],
        correctAnswer: 'Provide relevant updates and flag blockers concisely',
        explanation: 'Stand-ups should be concise and focus on progress, blockers, and next steps'
      },
      {
        text: 'How do you ensure remote team members feel included?',
        options: [
          'Let them figure it out themselves',
          'Actively engage them in discussions and decisions',
          'Schedule more meetings',
          'Treat them differently from local team members'
        ],
        correctAnswer: 'Actively engage them in discussions and decisions',
        explanation: 'Inclusive communication ensures all team members can contribute effectively regardless of location'
      }
    ]
  },
  {
    id: 'problem-solving',
    title: 'Problem-Solving Skills Test',
    description: 'Evaluate your approach to solving complex workplace challenges.',
    difficulty: 'intermediate',
    timeLimit: 45,
    totalQuestions: 10,
    category: 'non-technical',
    subcategory: 'problem-solving',
    questions: [
      {
        text: 'You discover a critical issue right before a deadline. What is your first step?',
        options: [
          'Panic and work overtime',
          'Assess impact and communicate to stakeholders immediately',
          'Hide the issue and hope no one notices',
          'Blame others for the problem'
        ],
        correctAnswer: 'Assess impact and communicate to stakeholders immediately',
        explanation: 'Quick assessment and transparent communication allow for proper problem management'
      },
      {
        text: 'How do you approach solving an unfamiliar problem?',
        options: [
          'Immediately ask for help',
          'Research, break down the problem, and consult others when needed',
          'Try random solutions until something works',
          'Avoid the problem entirely'
        ],
        correctAnswer: 'Research, break down the problem, and consult others when needed',
        explanation: 'Systematic problem-solving combines independent research with appropriate collaboration'
      },
      {
        text: 'What do you do when multiple high-priority tasks conflict?',
        options: [
          'Work on all simultaneously',
          'Evaluate impact, prioritize, and communicate with stakeholders',
          'Choose randomly',
          'Only work on the easiest task'
        ],
        correctAnswer: 'Evaluate impact, prioritize, and communicate with stakeholders',
        explanation: 'Effective prioritization requires understanding impact and maintaining clear communication'
      },
      {
        text: 'How do you handle a recurring problem in your workflow?',
        options: [
          'Keep applying the same solution',
          'Analyze root causes and implement preventive measures',
          'Complain about it to colleagues',
          'Learn to live with it'
        ],
        correctAnswer: 'Analyze root causes and implement preventive measures',
        explanation: 'Addressing root causes prevents future occurrences and improves processes'
      },
      {
        text: 'What approach do you take when a solution you implemented fails?',
        options: [
          'Hide the failure',
          'Analyze the failure, learn from it, and try a different approach',
          'Blame the tools or technology',
          'Give up on solving the problem'
        ],
        correctAnswer: 'Analyze the failure, learn from it, and try a different approach',
        explanation: 'Failures provide learning opportunities and inform better solutions'
      },
      {
        text: 'How do you handle stakeholders with conflicting requirements?',
        options: [
          'Implement all requirements',
          'Facilitate discussion to find compromise and priorities',
          'Ignore some stakeholders',
          'Let them argue it out'
        ],
        correctAnswer: 'Facilitate discussion to find compromise and priorities',
        explanation: 'Finding balance between competing needs requires facilitation and negotiation'
      },
      {
        text: 'What do you do when you notice a potential future problem?',
        options: [
          'Wait until it becomes urgent',
          'Proactively address it and develop contingency plans',
          'Hope it resolves itself',
          'Only mention it after it causes issues'
        ],
        correctAnswer: 'Proactively address it and develop contingency plans',
        explanation: 'Proactive problem-solving prevents issues from becoming critical'
      },
      {
        text: 'How do you approach making decisions with incomplete information?',
        options: [
          'Wait for complete information',
          'Assess risks, make assumptions explicit, and proceed with best judgment',
          'Make random decisions',
          'Let someone else decide'
        ],
        correctAnswer: 'Assess risks, make assumptions explicit, and proceed with best judgment',
        explanation: 'Professional decision-making often requires balancing incomplete information with business needs'
      },
      {
        text: 'What is your approach to solving problems that affect multiple teams?',
        options: [
          'Solve it alone',
          'Collaborate with all affected teams and coordinate solutions',
          'Let each team solve their part',
          'Escalate to management immediately'
        ],
        correctAnswer: 'Collaborate with all affected teams and coordinate solutions',
        explanation: 'Cross-team problems require collaborative solutions and coordinated implementation'
      },
      {
        text: 'How do you validate that a problem has been truly solved?',
        options: [
          'Assume it worked',
          'Define and verify success criteria with stakeholders',
          'Wait for complaints',
          'Move on to the next problem'
        ],
        correctAnswer: 'Define and verify success criteria with stakeholders',
        explanation: 'Proper problem resolution includes verifying the solution meets stakeholder needs'
      }
    ]
  },
  {
    id: 'workplace-scenarios',
    title: 'Workplace Scenarios Test',
    description: 'Practice handling common workplace situations and challenges.',
    difficulty: 'intermediate',
    timeLimit: 40,
    totalQuestions: 10,
    category: 'non-technical',
    subcategory: 'workplace-scenarios',
    questions: [
      {
        text: 'A colleague takes credit for your work in a meeting. How do you handle it?',
        options: [
          'Confront them publicly',
          'Address it privately and professionally',
          'Complain to management immediately',
          'Start taking credit for their work'
        ],
        correctAnswer: 'Address it privately and professionally',
        explanation: 'Professional conflicts should be handled privately to maintain workplace relationships'
      },
      {
        text: 'How do you handle a team member who consistently arrives late to meetings?',
        options: [
          'Ignore the behavior',
          'Discuss the impact privately and understand any underlying issues',
          'Start meetings without them',
          'Report them to HR'
        ],
        correctAnswer: 'Discuss the impact privately and understand any underlying issues',
        explanation: 'Addressing punctuality issues requires understanding and addressing root causes'
      },
      {
        text: 'What do you do when you witness unethical behavior?',
        options: [
          'Ignore it to avoid conflict',
          'Report it through appropriate channels',
          'Confront the person publicly',
          'Spread rumors about it'
        ],
        correctAnswer: 'Report it through appropriate channels',
        explanation: 'Ethical concerns should be reported through proper channels to ensure appropriate handling'
      },
      {
        text: 'How do you handle a heavy workload with approaching deadlines?',
        options: [
          'Work overtime without telling anyone',
          'Assess priorities, communicate challenges, and request support if needed',
          'Cut corners to meet deadlines',
          'Call in sick to catch up'
        ],
        correctAnswer: 'Assess priorities, communicate challenges, and request support if needed',
        explanation: 'Managing workload requires clear communication and appropriate escalation'
      },
      {
        text: 'What approach do you take when joining a new team?',
        options: [
          'Try to change everything immediately',
          'Observe, learn, and gradually contribute while building relationships',
          'Keep to yourself and focus only on your tasks',
          'Point out all the teams flaws'
        ],
        correctAnswer: 'Observe, learn, and gradually contribute while building relationships',
        explanation: 'Effective team integration combines learning with relationship building'
      },
      {
        text: 'How do you handle disagreement with a managers decision?',
        options: [
          'Complain to colleagues',
          'Express concerns professionally with supporting evidence',
          'Ignore the decision',
          'Threaten to quit'
        ],
        correctAnswer: 'Express concerns professionally with supporting evidence',
        explanation: 'Professional disagreement requires clear communication and supporting evidence'
      },
      {
        text: 'What do you do when a project changes direction suddenly?',
        options: [
          'Resist the change',
          'Understand the reasons and adapt while managing impacts',
          'Continue with the original plan',
          'Express frustration to the team'
        ],
        correctAnswer: 'Understand the reasons and adapt while managing impacts',
        explanation: 'Adaptability and understanding business needs are crucial for handling change'
      },
      {
        text: 'How do you handle receiving unclear requirements?',
        options: [
          'Make assumptions without verifying',
          'Ask clarifying questions and document understanding',
          'Wait for someone else to ask',
          'Complain about poor requirements'
        ],
        correctAnswer: 'Ask clarifying questions and document understanding',
        explanation: 'Clear requirements require proactive clarification and documentation'
      },
      {
        text: 'What do you do when you make a mistake that affects others?',
        options: [
          'Hide the mistake',
          'Own up to it, communicate impact, and work on solutions',
          'Blame others',
          'Make excuses'
        ],
        correctAnswer: 'Own up to it, communicate impact, and work on solutions',
        explanation: 'Professional accountability includes owning mistakes and focusing on solutions'
      },
      {
        text: 'How do you handle a colleague who is resistant to new processes?',
        options: [
          'Force them to comply',
          'Understand their concerns and demonstrate benefits',
          'Let them continue old processes',
          'Report them to management'
        ],
        correctAnswer: 'Understand their concerns and demonstrate benefits',
        explanation: 'Change adoption requires understanding and addressing concerns while showing value'
      }
    ]
  },
  {
    id: 'project-management',
    title: 'Project Management Skills Test',
    description: 'Evaluate your ability to manage projects, timelines, and resources effectively.',
    difficulty: 'intermediate',
    timeLimit: 40,
    totalQuestions: 10,
    category: 'non-technical',
    subcategory: 'project-management',
    questions: [
      {
        text: 'A critical team member unexpectedly takes leave during a crucial project phase. How do you proceed?',
        options: [
          'Delay the project until they return',
          'Assess impact, redistribute work, and adjust timeline if needed',
          'Ask remaining team to work overtime',
          'Continue as planned without adjustments'
        ],
        correctAnswer: 'Assess impact, redistribute work, and adjust timeline if needed',
        explanation: 'Effective project management requires quick adaptation to changes while maintaining realistic expectations'
      },
      {
        text: 'How do you handle scope creep in a project?',
        options: [
          'Accept all new requirements',
          'Document changes, assess impact, and manage through change control process',
          'Reject all new requirements',
          'Implement changes without updating timeline'
        ],
        correctAnswer: 'Document changes, assess impact, and manage through change control process',
        explanation: 'Proper scope management requires formal processes to assess and control changes'
      },
      {
        text: 'What is the best approach to creating project timelines?',
        options: [
          'Use best-case scenarios',
          'Consider team capacity, dependencies, and add buffer for uncertainties',
          'Copy timelines from similar projects',
          'Let team members set their own deadlines'
        ],
        correctAnswer: 'Consider team capacity, dependencies, and add buffer for uncertainties',
        explanation: 'Realistic timelines account for various factors and include contingency for unexpected issues'
      },
      {
        text: 'How do you ensure project quality while maintaining timeline?',
        options: [
          'Sacrifice quality for speed',
          'Implement quality checks throughout and adjust timeline if needed',
          'Only check quality at the end',
          'Add more team members last minute'
        ],
        correctAnswer: 'Implement quality checks throughout and adjust timeline if needed',
        explanation: 'Quality should be built into the process rather than treated as an afterthought'
      },
      {
        text: 'What do you do when multiple projects compete for the same resources?',
        options: [
          'First come, first served',
          'Prioritize based on business impact and negotiate resource allocation',
          'Split resources equally',
          'Let resources decide themselves'
        ],
        correctAnswer: 'Prioritize based on business impact and negotiate resource allocation',
        explanation: 'Resource conflicts require strategic prioritization and stakeholder alignment'
      },
      {
        text: 'How do you handle a project that is falling behind schedule?',
        options: [
          'Hide the delay from stakeholders',
          'Analyze causes, develop recovery plan, and communicate with stakeholders',
          'Push team to work weekends',
          'Reduce project scope without discussion'
        ],
        correctAnswer: 'Analyze causes, develop recovery plan, and communicate with stakeholders',
        explanation: 'Project recovery requires understanding issues and transparent communication'
      },
      {
        text: 'What is your approach to risk management in projects?',
        options: [
          'Deal with issues as they arise',
          'Identify risks early, create mitigation plans, and monitor regularly',
          'Ignore risks to avoid worry',
          'Add extra time to all estimates'
        ],
        correctAnswer: 'Identify risks early, create mitigation plans, and monitor regularly',
        explanation: 'Proactive risk management helps prevent issues and minimize impact'
      },
      {
        text: 'How do you ensure effective communication in a project?',
        options: [
          'Send daily status emails',
          'Establish communication plan with stakeholders and maintain regular updates',
          'Only communicate when issues arise',
          'Let team members handle their own updates'
        ],
        correctAnswer: 'Establish communication plan with stakeholders and maintain regular updates',
        explanation: 'Structured communication ensures all stakeholders stay appropriately informed'
      },
      {
        text: 'What do you do when stakeholders have conflicting project priorities?',
        options: [
          'Implement all requests',
          'Facilitate discussion to align on priorities based on business value',
          'Choose randomly',
          'Escalate to management immediately'
        ],
        correctAnswer: 'Facilitate discussion to align on priorities based on business value',
        explanation: 'Priority conflicts require facilitation and focus on business value'
      },
      {
        text: 'How do you handle project dependencies between teams?',
        options: [
          'Hope teams coordinate themselves',
          'Create dependency map, establish touchpoints, and monitor progress',
          'Ignore dependencies until they cause issues',
          'Add buffer to all estimates'
        ],
        correctAnswer: 'Create dependency map, establish touchpoints, and monitor progress',
        explanation: 'Managing dependencies requires active coordination and monitoring'
      }
    ]
  },
  {
    id: 'teamwork-collaboration',
    title: 'Teamwork and Collaboration Test',
    description: 'Test your ability to work effectively in team settings and collaborate with others.',
    difficulty: 'intermediate',
    timeLimit: 35,
    totalQuestions: 10,
    category: 'non-technical',
    subcategory: 'teamwork',
    questions: [
      {
        text: 'How do you integrate a new team member effectively?',
        options: [
          'Let them figure things out',
          'Create onboarding plan, provide mentorship, and gradually increase responsibility',
          'Assign them full workload immediately',
          'Have them shadow everyone for a month'
        ],
        correctAnswer: 'Create onboarding plan, provide mentorship, and gradually increase responsibility',
        explanation: 'Effective onboarding combines structure, support, and gradual integration'
      },
      {
        text: 'What do you do when team members are not pulling their weight?',
        options: [
          'Complain to management',
          'Discuss concerns privately, understand issues, and develop improvement plan',
          'Do their work yourself',
          'Criticize them in team meetings'
        ],
        correctAnswer: 'Discuss concerns privately, understand issues, and develop improvement plan',
        explanation: 'Performance issues should be addressed constructively and professionally'
      },
      {
        text: 'How do you promote knowledge sharing within a team?',
        options: [
          'Let people learn on their own',
          'Establish regular knowledge sharing sessions and documentation practices',
          'Share only when asked',
          'Keep knowledge to yourself'
        ],
        correctAnswer: 'Establish regular knowledge sharing sessions and documentation practices',
        explanation: 'Structured knowledge sharing builds team capability and reduces dependencies'
      },
      {
        text: 'What approach do you take when joining an established team?',
        options: [
          'Try to change everything immediately',
          'Learn existing processes, build relationships, and suggest improvements gradually',
          'Keep to yourself',
          'Point out all current problems'
        ],
        correctAnswer: 'Learn existing processes, build relationships, and suggest improvements gradually',
        explanation: 'Successful integration requires understanding and respect for existing team dynamics'
      },
      {
        text: 'How do you handle differences in working styles within a team?',
        options: [
          'Force everyone to work your way',
          'Acknowledge differences, find common ground, and establish team agreements',
          'Ignore the differences',
          'Complain about others styles'
        ],
        correctAnswer: 'Acknowledge differences, find common ground, and establish team agreements',
        explanation: 'Effective teams leverage diversity while maintaining alignment'
      },
      {
        text: 'What is your approach to team decision-making?',
        options: [
          'Make decisions yourself',
          'Foster inclusive discussion, consider all input, and build consensus',
          'Let others decide everything',
          'Go with the majority without discussion'
        ],
        correctAnswer: 'Foster inclusive discussion, consider all input, and build consensus',
        explanation: 'Collaborative decision-making leads to better outcomes and stronger buy-in'
      },
      {
        text: 'How do you maintain team motivation during challenging periods?',
        options: [
          'Ignore the challenges',
          'Acknowledge difficulties, celebrate small wins, and maintain open communication',
          'Push harder without support',
          'Lower all expectations'
        ],
        correctAnswer: 'Acknowledge difficulties, celebrate small wins, and maintain open communication',
        explanation: 'Supporting team morale requires balance between empathy and encouragement'
      },
      {
        text: 'What do you do when team members have personal conflicts?',
        options: [
          'Let them fight it out',
          'Mediate professionally, focus on work impact, and establish boundaries',
          'Take sides',
          'Ignore the conflict'
        ],
        correctAnswer: 'Mediate professionally, focus on work impact, and establish boundaries',
        explanation: 'Personal conflicts require professional handling to maintain team effectiveness'
      },
      {
        text: 'How do you ensure effective remote team collaboration?',
        options: [
          'Schedule more meetings',
          'Establish clear communication channels, regular check-ins, and collaboration tools',
          'Treat it like in-person work',
          'Reduce communication'
        ],
        correctAnswer: 'Establish clear communication channels, regular check-ins, and collaboration tools',
        explanation: 'Remote collaboration requires intentional structure and tools'
      },
      {
        text: 'What is your approach to giving feedback to peers?',
        options: [
          'Avoid giving feedback',
          'Provide specific, constructive feedback focused on growth',
          'Only give positive feedback',
          'Be harshly critical'
        ],
        correctAnswer: 'Provide specific, constructive feedback focused on growth',
        explanation: 'Effective peer feedback is specific, constructive, and growth-oriented'
      }
    ]
  },
  {
    id: 'conflict-resolution',
    title: 'Conflict Resolution Test',
    description: 'Assess your ability to handle and resolve workplace conflicts effectively.',
    difficulty: 'advanced',
    timeLimit: 40,
    totalQuestions: 10,
    category: 'non-technical',
    subcategory: 'conflict',
    questions: [
      {
        text: 'How do you handle a situation where two departments blame each other for a project failure?',
        options: [
          'Take sides with one department',
          'Facilitate joint discussion, focus on solutions rather than blame',
          'Let them resolve it themselves',
          'Escalate to upper management'
        ],
        correctAnswer: 'Facilitate joint discussion, focus on solutions rather than blame',
        explanation: 'Cross-department conflicts require neutral facilitation and solution focus'
      },
      {
        text: 'What do you do when a colleague consistently takes credit for team efforts?',
        options: [
          'Publicly confront them',
          'Address privately, establish clear contribution recognition process',
          'Start doing the same to them',
          'Complain to others'
        ],
        correctAnswer: 'Address privately, establish clear contribution recognition process',
        explanation: 'Credit issues should be addressed professionally with systemic solutions'
      },
      {
        text: 'How do you handle strong disagreement about technical direction?',
        options: [
          'Force your preferred solution',
          'Organize structured discussion, use data and proof of concepts',
          'Let the most senior person decide',
          'Implement multiple solutions'
        ],
        correctAnswer: 'Organize structured discussion, use data and proof of concepts',
        explanation: 'Technical conflicts should be resolved through objective evaluation'
      },
      {
        text: 'What approach do you take when team members report feeling excluded?',
        options: [
          'Tell them to be more outgoing',
          'Investigate patterns, implement inclusive practices, monitor improvement',
          'Ignore the complaints',
          'Force team building activities'
        ],
        correctAnswer: 'Investigate patterns, implement inclusive practices, monitor improvement',
        explanation: 'Inclusion issues require systematic changes and ongoing attention'
      },
      {
        text: 'How do you handle conflicts between junior and senior team members?',
        options: [
          'Always side with seniors',
          'Mediate fairly, focus on merit of ideas rather than seniority',
          'Let them figure it out',
          'Always side with juniors'
        ],
        correctAnswer: 'Mediate fairly, focus on merit of ideas rather than seniority',
        explanation: 'Fair conflict resolution focuses on ideas rather than hierarchy'
      },
      {
        text: 'What do you do when stakeholders disagree about project priorities?',
        options: [
          'Implement all requests',
          'Facilitate discussion based on business impact and resource constraints',
          'Ignore the conflict',
          'Choose randomly'
        ],
        correctAnswer: 'Facilitate discussion based on business impact and resource constraints',
        explanation: 'Priority conflicts require focus on business value and practical constraints'
      },
      {
        text: 'How do you handle personality conflicts in a team?',
        options: [
          'Force people to get along',
          'Establish professional boundaries, focus on work objectives',
          'Separate people completely',
          'Ignore the conflicts'
        ],
        correctAnswer: 'Establish professional boundaries, focus on work objectives',
        explanation: 'Personal conflicts require professional frameworks and clear boundaries'
      },
      {
        text: 'What approach do you take when there is resistance to process changes?',
        options: [
          'Force compliance',
          'Understand concerns, demonstrate benefits, implement gradually',
          'Abandon the changes',
          'Punish resistance'
        ],
        correctAnswer: 'Understand concerns, demonstrate benefits, implement gradually',
        explanation: 'Change resistance requires understanding and demonstrating value'
      },
      {
        text: 'How do you handle conflicts about resource allocation?',
        options: [
          'First come, first served',
          'Evaluate priorities, create fair allocation process, communicate clearly',
          'Let teams fight it out',
          'Give everyone equal shares'
        ],
        correctAnswer: 'Evaluate priorities, create fair allocation process, communicate clearly',
        explanation: 'Resource conflicts require systematic and transparent resolution'
      },
      {
        text: 'What do you do when there is conflict about code quality standards?',
        options: [
          'Ignore quality concerns',
          'Establish team standards through consensus, implement automated checks',
          'Let everyone use their own standards',
          'Force your preferred standards'
        ],
        correctAnswer: 'Establish team standards through consensus, implement automated checks',
        explanation: 'Quality standards should be established collaboratively and enforced systematically'
      }
    ]
  }
];
