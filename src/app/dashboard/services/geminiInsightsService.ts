import { GoogleGenerativeAI } from '@google/generative-ai';
import { SessionSummary, AIInsights } from './dashboardService';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

/**
 * Generate AI-powered insights based on user's session data
 */
export async function generateInsights(
    userId: string,
    recentSessions: SessionSummary[]
): Promise<AIInsights> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

        // Prepare session data for analysis
        const sessionSummary = recentSessions.map((s, idx) => ({
            sessionNumber: idx + 1,
            goal: s.goal || 'General Interview Practice',
            score: s.averageScore || 0,
            questionsAnswered: s.totalQuestions || 0,
            date: new Date(s.created_at).toLocaleDateString(),
        }));

        const prompt = `You are an AI career coach analyzing a user's interview practice sessions. 
Based on the following session data, provide personalized insights to help them improve.

Session Data:
${JSON.stringify(sessionSummary, null, 2)}

Please analyze and provide:
1. Performance Trends (2-3 observations about their progress over time)
2. Strengths (2-3 things they're doing well)
3. Weaknesses/Areas for Growth (2-3 specific areas to improve)
4. Actionable Recommendations (3-4 specific, actionable steps)

Format your response as JSON with this structure:
{
  "trends": ["trend 1", "trend 2", ...],
  "strengths": ["strength 1", "strength 2", ...],
  "weaknesses": ["weakness 1", "weakness 2", ...],
  "recommendations": ["recommendation 1", "recommendation 2", ...]
}

Important:
- Be specific and reference the actual data
- Keep each point concise (1-2 sentences max)
- Focus on actionable insights
- Be encouraging and constructive
- If data is limited, acknowledge it and provide general guidance
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Failed to parse AI response');
        }

        const insights: AIInsights = JSON.parse(jsonMatch[0]);

        // Validate the response structure
        if (!insights.trends || !insights.strengths || !insights.weaknesses || !insights.recommendations) {
            throw new Error('Invalid insights structure');
        }

        return insights;
    } catch (error) {
        console.error('Error generating insights:', error);

        // Fallback insights based on basic data analysis
        return generateFallbackInsights(recentSessions);
    }
}

/**
 * Generate fallback insights when AI fails
 */
function generateFallbackInsights(sessions: SessionSummary[]): AIInsights {
    if (sessions.length === 0) {
        return {
            trends: ['You are just getting started with interview practice!'],
            strengths: ['Taking the first step is the hardest part - you are here!'],
            weaknesses: ['More practice sessions needed to identify specific areas.'],
            recommendations: [
                'Complete your first few interview sessions.',
                'Try different types of questions to find your baseline.',
                'Practice consistently - aim for 2-3 sessions per week.',
            ],
        };
    }

    const avgScore = sessions.length > 0
        ? sessions.reduce((sum, s) => sum + (s.averageScore || 0), 0) / sessions.length
        : 0;

    const trends = [];
    const strengths = [];
    const weaknesses = [];
    const recommendations = [];

    // Analyze trends
    if (sessions.length >= 3) {
        const recentScores = sessions.slice(0, 3).map(s => s.averageScore || 0);
        const olderScores = sessions.slice(3, 6).map(s => s.averageScore || 0);

        if (olderScores.length > 0) {
            const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
            const olderAvg = olderScores.reduce((a, b) => a + b, 0) / olderScores.length;

            if (recentAvg > olderAvg) {
                trends.push('Your scores are improving over time - great progress!');
            } else if (recentAvg < olderAvg) {
                trends.push('Your recent scores show room for improvement. Stay focused!');
            } else {
                trends.push('Your performance is consistent across sessions.');
            }
        }
    } else {
        trends.push(`You have completed ${sessions.length} session(s). Keep practicing!`);
    }

    // Identify strengths
    if (avgScore >= 80) {
        strengths.push('Excellent overall performance with high average scores.');
    } else if (avgScore >= 60) {
        strengths.push('Solid performance showing good understanding of concepts.');
    } else if (sessions.length > 0) {
        strengths.push('You are actively practicing and building your skills.');
    }

    if (sessions.length >= 5) {
        strengths.push('Consistent practice habits - you are committed to improvement.');
    }

    // Identify weaknesses
    if (avgScore < 60 && sessions.length > 0) {
        weaknesses.push('Focus on strengthening foundational skills to boost scores.');
    }

    if (sessions.length < 5) {
        weaknesses.push('More practice sessions needed to build confidence and consistency.');
    }

    // Generate recommendations
    if (avgScore < 70) {
        recommendations.push('Review AI feedback from previous sessions to identify patterns.');
        recommendations.push('Focus on improving specific areas one at a time.');
    }

    recommendations.push('Practice regularly - aim for at least 2-3 sessions per week.');
    recommendations.push('Try varying your interview goals to challenge yourself.');

    return {
        trends: trends.length > 0 ? trends : ['Continue practicing to see meaningful trends.'],
        strengths: strengths.length > 0 ? strengths : ['You are taking action to improve - that is a strength!'],
        weaknesses: weaknesses.length > 0 ? weaknesses : ['More data needed for detailed analysis.'],
        recommendations,
    };
}
