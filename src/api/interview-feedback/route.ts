import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { answer, question, category } = await req.json();

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

    const feedback = completion.choices[0].message.content;
    if (!feedback) {
      return NextResponse.json(
        { error: 'No feedback content received from OpenAI' },
        { status: 500 }
      );
    }
    return NextResponse.json(JSON.parse(feedback));
  } catch (error) {
    console.error('Error in interview feedback:', error);
    return NextResponse.json(
      { error: 'Failed to generate feedback' },
      { status: 500 }
    );
  }
}
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);