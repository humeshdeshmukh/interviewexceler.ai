import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { withAuth } from '@/lib/api/middleware';
import { interviewFeedbackSchema } from '@/lib/api/validators';
import { createClient } from '@/lib/supabase/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = withAuth(async (req, { userId }) => {
  const body = await req.json();
  const { answer, question, category, sessionId, questionId } = interviewFeedbackSchema.parse(body);

  const prompt = `You are an expert interviewer evaluating a candidate's response. 
    Question Category: ${category}
    Interview Question: ${question}
    Candidate's Answer: ${answer}

    Please provide feedback in the following JSON format:
    {
      "score": <number between 1-10>,
      "strengths": [<list of key strengths in the answer>],
      "improvements": [<list of areas for improvement>],
      "feedback": "<detailed feedback paragraph>",
      "suggestedAnswer": "<an example of a strong answer>"
    }

    Focus on:
    1. Content relevance and completeness
    2. Structure and clarity
    3. Professional communication
    4. Specific examples provided
    5. STAR method usage (if applicable)`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4",
    temperature: 0.7,
    max_tokens: 1000,
  });

  const feedbackContent = completion.choices[0].message.content;
  if (!feedbackContent) {
    throw new Error('No feedback content received from OpenAI');
  }

  const feedback = JSON.parse(feedbackContent);

  // Store in database if sessionId is provided
  if (sessionId) {
    const supabase = await createClient();
    await supabase.from('interview_responses').insert({
      session_id: sessionId,
      question_id: questionId,
      question_text: question,
      user_answer: answer,
      ai_feedback: feedback,
      score: feedback.score,
    });
  }

  return NextResponse.json(feedback);
});