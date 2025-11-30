import { z } from 'zod';

export const interviewFeedbackSchema = z.object({
    question: z.string().min(1, 'Question is required'),
    answer: z.string().min(1, 'Answer is required'),
    category: z.string().min(1, 'Category is required'),
    sessionId: z.string().uuid().optional(),
    questionId: z.string().optional(),
});

export const cvAnalysisSchema = z.object({
    resumeText: z.string().min(50, 'Resume content must be at least 50 characters'),
    jobDescription: z.string().optional(),
});

export const practiceTestSchema = z.object({
    topics: z.array(z.string()).min(1, 'At least one topic is required'),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    questionsCount: z.number().min(1).max(20).default(5),
});

export type InterviewFeedbackRequest = z.infer<typeof interviewFeedbackSchema>;
export type CvAnalysisRequest = z.infer<typeof cvAnalysisSchema>;
export type PracticeTestRequest = z.infer<typeof practiceTestSchema>;
