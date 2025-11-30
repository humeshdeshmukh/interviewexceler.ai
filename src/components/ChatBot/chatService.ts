import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

/**
 * Removes markdown formatting symbols and converts to clean, professional text
 */
function removeMarkdownFormatting(text: string): string {
  let cleaned = text;

  // Remove bold/italic markers (**, __, *, _)
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1');
  cleaned = cleaned.replace(/__([^_]+)__/g, '$1');
  cleaned = cleaned.replace(/\*([^*]+)\*/g, '$1');
  cleaned = cleaned.replace(/_([^_]+)_/g, '$1');

  // Remove inline code markers
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');

  // Remove headers (###, ##, #)
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');

  // Clean up bullet points - convert markdown bullets to proper bullets
  cleaned = cleaned.replace(/^\s*[-*+]\s+/gm, '• ');

  // Clean up numbered lists - ensure proper formatting
  cleaned = cleaned.replace(/^\s*(\d+)\.\s+/gm, '$1. ');

  // Remove horizontal rules
  cleaned = cleaned.replace(/^[\s]*[-*_]{3,}[\s]*$/gm, '');

  // Remove blockquotes
  cleaned = cleaned.replace(/^\s*>\s+/gm, '');

  // Clean up excessive newlines (more than 2 consecutive)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // Trim whitespace
  cleaned = cleaned.trim();

  return cleaned;
}

export async function generateChatResponse(message: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    // Enhanced prompt with explicit instructions for clean, professional responses
    const prompt = `You are a professional AI assistant for InterviewExceler.Ai, a platform that helps users excel in interviews and career development.

IMPORTANT INSTRUCTIONS:
- Respond in clean, professional language WITHOUT any markdown formatting
- Do NOT use asterisks (**), underscores (_), or hash symbols (#)
- Use simple bullet points (•) for lists if needed
- Be conversational, friendly, and professional
- Keep responses concise but informative
- Focus on interview preparation, career guidance, resume tips, and professional development

User question: ${message}

Provide a helpful, professional response:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text();

    // Clean up any markdown formatting that might have slipped through
    responseText = removeMarkdownFormatting(responseText);

    return responseText;
  } catch (error) {
    console.error('Error generating chat response:', error);
    return 'I apologize, but I encountered an error processing your request. Please try again in a moment. If the issue persists, try refreshing the page.';
  }
}
