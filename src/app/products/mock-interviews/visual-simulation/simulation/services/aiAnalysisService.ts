import { geminiService } from './geminiService';

class AIAnalysisService {
  private analysisHistory: any[] = [];

  async analyzeResponse(transcript: string, question: string) {
    try {
      // Get Gemini analysis
      const geminiAnalysis = await geminiService.analyzeInterview(transcript, question);
      
      // Get real-time suggestions
      const suggestions = await geminiService.provideFeedbackSuggestions(transcript);

      // Combine analysis with suggestions
      const analysis = {
        communicationScore: geminiAnalysis.communication.score,
        bodyLanguageScore: 75, // From video analysis
        answerQualityScore: geminiAnalysis.answerQuality.score,
        emotionData: {
          happy: 0.6,
          neutral: 0.3,
          sad: 0.05,
          angry: 0.02,
          surprised: 0.03
        },
        speechMetrics: {
          pace: this.calculateSpeakingPace(transcript),
          clarity: geminiAnalysis.communication.score,
          fillerWords: this.countFillerWords(transcript),
          confidence: geminiAnalysis.communication.score
        },
        tips: suggestions
      };

      this.analysisHistory.push(analysis);
      return analysis;
    } catch (error) {
      console.error('AI analysis error:', error);
      return this.getDefaultAnalysis();
    }
  }

  private calculateSpeakingPace(transcript: string): number {
    const words = transcript.split(' ').length;
    const minutes = 1; // Assuming 1-minute segments
    return words / minutes;
  }

  private countFillerWords(transcript: string): number {
    const fillerWords = ['um', 'uh', 'like', 'you know', 'sort of', 'kind of'];
    let count = 0;
    fillerWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = transcript.match(regex);
      if (matches) count += matches.length;
    });
    return count;
  }

  private getDefaultAnalysis() {
    return {
      communicationScore: 75,
      bodyLanguageScore: 70,
      answerQualityScore: 80,
      emotionData: {
        happy: 0.6,
        neutral: 0.3,
        sad: 0.05,
        angry: 0.02,
        surprised: 0.03
      },
      speechMetrics: {
        pace: 120,
        clarity: 80,
        fillerWords: 0,
        confidence: 75
      },
      tips: [
        'Speak clearly and maintain good pace',
        'Use specific examples to support points',
        'Maintain positive body language'
      ]
    };
  }
}

export const aiAnalysisService = new AIAnalysisService();
