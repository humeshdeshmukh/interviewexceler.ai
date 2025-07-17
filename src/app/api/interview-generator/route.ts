import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { InterviewQuestion, InterviewResult, UserInput } from '@/app/products/interview-generator/types';
import { v4 as uuidv4 } from 'uuid';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

function cleanJsonString(str: string): string {
  return str
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/"/g, '\\"');
}

function extractJsonArray(text: string): string {
  const matches = text.match(/\[[\s\S]*\]/);
  if (matches) {
    return matches[0];
  }
  throw new Error('No JSON array found in response');
}

function cleanAnswer(answer: string): string {
  return answer
    // Remove asterisks
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    // Fix common formatting issues
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newline
    .replace(/[ \t]+$/gm, '') // Remove trailing whitespace
    .trim();
}

async function generateQuestionBatch(
  model: any,
  userInput: UserInput,
  category: string,
  count: number,
  retryCount = 0
): Promise<InterviewQuestion[]> {
  const prompt = `Generate ${count} interview questions for a ${userInput.jobRole} position at ${userInput.company}.
Focus on ${category} questions.
Key skills: ${userInput.skills.join(', ')}
Experience: ${userInput.experience} years

Each question must have:
1. Clear, specific question text
2. Detailed answer using STAR method
3. Real-world examples
4. Best practices

DO NOT use markdown formatting or asterisks in the answers.
Format answers in plain text with clear sections and line breaks.

Format as JSON array:
[{
  "question": "question text",
  "answer": "detailed answer",
  "category": "${category}",
  "difficulty": "easy|medium|hard"
}]`;

  try {
    const geminiResponse = await model.generateContent(prompt);
    const response = await geminiResponse.response;
    const text = response.text();
    
    const cleanedText = extractJsonArray(text);
    const parsedQuestions = JSON.parse(cleanedText);
    
    if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
      throw new Error('Invalid response format');
    }

    return parsedQuestions.map((q: any) => ({
      id: uuidv4(),
      question: q.question || 'Question not provided',
      answer: cleanAnswer(q.answer || 'Answer not provided'),
      category: q.category || category,
      difficulty: (q.difficulty?.toLowerCase() === 'easy' || 
                  q.difficulty?.toLowerCase() === 'medium' || 
                  q.difficulty?.toLowerCase() === 'hard')
                  ? q.difficulty.toLowerCase()
                  : 'medium'
    }));
  } catch (error) {
    console.error(`Error generating ${category} questions:`, error);
    // Retry up to 3 times with a smaller batch
    if (retryCount < 3) {
      console.log(`Retrying ${category} questions, attempt ${retryCount + 1}`);
      return generateQuestionBatch(model, userInput, category, Math.max(2, Math.floor(count / 2)), retryCount + 1);
    }
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const userInput: UserInput = await request.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Generate questions in smaller batches with retries
    const batches = await Promise.all([
      // Technical questions in two batches
      generateQuestionBatch(model, userInput, 'Technical', 3),
      generateQuestionBatch(model, userInput, 'Technical', 3),
      // Problem-solving questions in two batches
      generateQuestionBatch(model, userInput, 'Problem-Solving', 3),
      generateQuestionBatch(model, userInput, 'Problem-Solving', 2),
      // Behavioral questions in two batches
      generateQuestionBatch(model, userInput, 'Behavioral', 3),
      generateQuestionBatch(model, userInput, 'Behavioral', 2)
    ]);

    let questions = batches.flat();

    // If we still don't have enough questions, add fallback questions
    if (questions.length < 10) {
      const fallbackQuestions = [
        {
          id: uuidv4(),
          question: `Describe a challenging project where you used ${userInput.skills[0]}. What problems did you face and how did you solve them?`,
          answer: `Let me share a significant project that showcases my experience with ${userInput.skills[0]}:

Situation: Our team was facing performance issues with our main application during peak hours, affecting user experience.

Task: I was tasked with optimizing the application performance and reducing load times by 50%.

Action:
1. Conducted thorough performance profiling
2. Identified bottlenecks in database queries
3. Implemented caching strategy
4. Optimized front-end assets
5. Set up monitoring tools

Result:
- Reduced load times by 65%
- Improved user satisfaction scores
- Implemented best practices that became team standards
- Received recognition from management

This project taught me valuable lessons about performance optimization and the importance of monitoring.`,
          category: 'Technical',
          difficulty: 'hard'
        },
        {
          id: uuidv4(),
          question: `How do you stay updated with new technologies and best practices?`,
          answer: `I have a systematic approach to continuous learning:

1. Daily Practice:
- Read technical blogs and documentation
- Follow industry experts on social media
- Participate in online communities

2. Hands-on Learning:
- Build side projects
- Contribute to open source
- Take online courses

3. Knowledge Sharing:
- Write technical articles
- Mentor junior developers
- Present at team meetings

I recently learned [new technology] by building a small project and sharing my learnings with the team.`,
          category: 'Behavioral',
          difficulty: 'medium'
        },
        {
          id: uuidv4(),
          question: `How would you design a scalable notification system?`,
          answer: `Here's my approach to designing a scalable notification system:

Architecture Components:
1. Message Queue (RabbitMQ/Kafka)
2. Worker Services
3. Database Sharding
4. Caching Layer

Key Features:
- Asynchronous processing
- Multiple delivery channels
- Retry mechanism
- Rate limiting
- Analytics

Implementation:
1. Use event-driven architecture
2. Implement circuit breakers
3. Add monitoring and alerts
4. Use horizontal scaling

This design ensures reliability and scalability while maintaining performance.`,
          category: 'Problem-Solving',
          difficulty: 'hard'
        },
        {
          id: uuidv4(),
          question: `How do you handle conflicts in a team environment?`,
          answer: `I approach conflicts professionally and constructively:

1. Listen First:
- Understand all perspectives
- Stay objective
- Focus on facts

2. Find Common Ground:
- Identify shared goals
- Look for win-win solutions
- Keep team success in focus

3. Take Action:
- Propose solutions
- Document decisions
- Follow up regularly

Example: Recently mediated a disagreement about coding standards by organizing a team workshop to create shared guidelines.`,
          category: 'Behavioral',
          difficulty: 'medium'
        },
        {
          id: uuidv4(),
          question: `Explain your approach to debugging complex issues.`,
          answer: `My systematic debugging approach:

1. Reproduce the Issue:
- Gather information
- Document steps
- Identify patterns

2. Analyze:
- Check logs
- Use debugging tools
- Test hypotheses

3. Solve:
- Make targeted changes
- Test thoroughly
- Document solution

Example: Recently solved a memory leak by using heap snapshots and implementing proper cleanup methods.`,
          category: 'Problem-Solving',
          difficulty: 'medium'
        }
      ];

      questions = [...questions, ...fallbackQuestions];
    }

    // Clean all answers one more time before sending
    questions = questions.map(q => ({
      ...q,
      answer: cleanAnswer(q.answer)
    }));

    const interviewResult: InterviewResult = {
      questions: questions.slice(0, 16), // Return up to 16 questions
      timestamp: new Date().toISOString(),
      userInput,
    };

    return NextResponse.json(interviewResult);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate interview questions' },
      { status: 500 }
    );
  }
}
