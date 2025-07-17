import * as faceapi from 'face-api.js';
import * as tf from '@tensorflow/tfjs';

interface AnalysisResult {
  communicationScore: number;
  bodyLanguageScore: number;
  answerQualityScore: number;
  emotionData: {
    happy: number;
    neutral: number;
    sad: number;
    angry: number;
    surprised: number;
  };
  speechMetrics: {
    pace: number;
    clarity: number;
    fillerWords: number;
    confidence: number;
  };
  tips: string[];
}

interface SpeechSegment {
  text: string;
  confidence: number;
  timestamp: number;
}

class EnhancedAnalysisService {
  private faceModelsLoaded = false;
  private speechSegments: SpeechSegment[] = [];
  private emotionHistory: faceapi.FaceExpressions[] = [];
  private commonFillerWords = ['um', 'uh', 'like', 'you know', 'sort of', 'kind of'];
  private positiveWords = ['experience', 'achieved', 'led', 'developed', 'improved', 'success'];
  private confidenceWords = ['confident', 'certain', 'sure', 'definitely', 'absolutely'];

  constructor() {
    this.loadFaceModels();
  }

  private async loadFaceModels() {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
      this.faceModelsLoaded = true;
      console.log('Face models loaded successfully');
    } catch (error) {
      console.error('Error loading face models:', error);
    }
  }

  async analyzeFace(videoElement: HTMLVideoElement): Promise<{
    expressions: faceapi.FaceExpressions | null;
    landmarks: faceapi.FaceLandmarks68 | null;
  }> {
    if (!this.faceModelsLoaded) {
      return { expressions: null, landmarks: null };
    }

    try {
      const detection = await faceapi
        .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detection) {
        this.emotionHistory.push(detection.expressions);
        if (this.emotionHistory.length > 10) {
          this.emotionHistory.shift();
        }

        return {
          expressions: detection.expressions,
          landmarks: detection.landmarks
        };
      }
    } catch (error) {
      console.error('Face analysis error:', error);
    }

    return { expressions: null, landmarks: null };
  }

  addSpeechSegment(text: string, confidence: number) {
    this.speechSegments.push({
      text,
      confidence,
      timestamp: Date.now()
    });

    // Keep only last 2 minutes of speech
    const twoMinutesAgo = Date.now() - 120000;
    this.speechSegments = this.speechSegments.filter(
      segment => segment.timestamp > twoMinutesAgo
    );
  }

  async analyzeResponse(text: string, question: string): Promise<AnalysisResult> {
    // Analyze speech patterns
    const speechMetrics = this.analyzeSpeechPatterns(text);
    
    // Get average emotions
    const emotions = this.getAverageEmotions();
    
    // Calculate scores
    const communicationScore = this.calculateCommunicationScore(speechMetrics);
    const bodyLanguageScore = this.calculateBodyLanguageScore(emotions);
    const answerQualityScore = this.calculateAnswerQuality(text, question);

    // Generate tips
    const tips = this.generateTips(
      speechMetrics,
      emotions,
      communicationScore,
      bodyLanguageScore,
      answerQualityScore
    );

    return {
      communicationScore,
      bodyLanguageScore,
      answerQualityScore,
      emotionData: emotions,
      speechMetrics,
      tips
    };
  }

  private analyzeSpeechPatterns(text: string) {
    const words = text.toLowerCase().split(' ');
    const fillerWordCount = this.commonFillerWords.reduce(
      (count, word) => count + (text.toLowerCase().match(new RegExp(word, 'g')) || []).length,
      0
    );

    // Calculate speaking pace (words per minute)
    const timeSpan = (this.speechSegments[this.speechSegments.length - 1]?.timestamp || 0) -
                    (this.speechSegments[0]?.timestamp || 0);
    const wordsPerMinute = words.length / (timeSpan / 60000) || 0;

    // Calculate clarity based on sentence structure
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const avgWordsPerSentence = words.length / sentences.length;
    const clarity = Math.min(100, Math.max(0, 100 - Math.abs(avgWordsPerSentence - 15) * 5));

    // Calculate confidence from word choice
    const confidenceScore = this.confidenceWords.reduce(
      (score, word) => score + (text.toLowerCase().includes(word) ? 10 : 0),
      50
    );

    return {
      pace: wordsPerMinute,
      clarity,
      fillerWords: fillerWordCount,
      confidence: Math.min(100, confidenceScore)
    };
  }

  private getAverageEmotions() {
    if (this.emotionHistory.length === 0) {
      return {
        happy: 0,
        neutral: 0,
        sad: 0,
        angry: 0,
        surprised: 0
      };
    }

    const summedEmotions = this.emotionHistory.reduce(
      (sum, emotions) => ({
        happy: sum.happy + (emotions.happy || 0),
        neutral: sum.neutral + (emotions.neutral || 0),
        sad: sum.sad + (emotions.sad || 0),
        angry: sum.angry + (emotions.angry || 0),
        surprised: sum.surprised + (emotions.surprised || 0)
      }),
      { happy: 0, neutral: 0, sad: 0, angry: 0, surprised: 0 }
    );

    const count = this.emotionHistory.length;
    return {
      happy: summedEmotions.happy / count,
      neutral: summedEmotions.neutral / count,
      sad: summedEmotions.sad / count,
      angry: summedEmotions.angry / count,
      surprised: summedEmotions.surprised / count
    };
  }

  private calculateCommunicationScore(speechMetrics: any): number {
    let score = 70; // Base score

    // Adjust for speaking pace (ideal: 120-150 wpm)
    if (speechMetrics.pace >= 120 && speechMetrics.pace <= 150) score += 10;
    else if (speechMetrics.pace >= 100 && speechMetrics.pace <= 170) score += 5;
    else score -= 5;

    // Adjust for clarity
    score += (speechMetrics.clarity - 70) * 0.2;

    // Penalize for filler words
    score -= speechMetrics.fillerWords * 2;

    // Add confidence bonus
    score += (speechMetrics.confidence - 50) * 0.1;

    return Math.min(100, Math.max(0, score));
  }

  private calculateBodyLanguageScore(emotions: any): number {
    let score = 70;

    // Prefer a mix of neutral and positive emotions
    score += emotions.happy * 20;
    score += emotions.neutral * 10;
    score -= emotions.sad * 30;
    score -= emotions.angry * 40;
    score += emotions.surprised * 5;

    return Math.min(100, Math.max(0, score));
  }

  private calculateAnswerQuality(text: string, question: string): number {
    let score = 70;

    // Check for STAR method components
    const starComponents = ['situation', 'task', 'action', 'result'];
    starComponents.forEach(component => {
      if (text.toLowerCase().includes(component)) score += 5;
    });

    // Check for specific examples
    if (text.toLowerCase().includes('for example') || 
        text.toLowerCase().includes('instance') ||
        text.toLowerCase().includes('specifically')) {
      score += 10;
    }

    // Check for positive language
    this.positiveWords.forEach(word => {
      if (text.toLowerCase().includes(word)) score += 2;
    });

    // Check answer relevance to question
    const questionWords = question.toLowerCase().split(' ');
    const relevantWords = questionWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;
    score += (relevantWords / questionWords.length) * 20;

    return Math.min(100, Math.max(0, score));
  }

  private generateTips(
    speechMetrics: any,
    emotions: any,
    communicationScore: number,
    bodyLanguageScore: number,
    answerQualityScore: number
  ): string[] {
    const tips: string[] = [];

    // Speech-related tips
    if (speechMetrics.pace > 160) {
      tips.push('Try to slow down your speaking pace for better clarity');
    } else if (speechMetrics.pace < 110) {
      tips.push('Try to speak a bit faster to maintain engagement');
    }

    if (speechMetrics.fillerWords > 5) {
      tips.push('Reduce filler words like "um" and "uh" to sound more confident');
    }

    // Emotion-related tips
    if (emotions.neutral > 0.7) {
      tips.push('Show more enthusiasm through facial expressions');
    }
    if (emotions.sad > 0.3 || emotions.angry > 0.3) {
      tips.push('Maintain a positive and professional demeanor');
    }

    // Answer quality tips
    if (answerQualityScore < 80) {
      tips.push('Structure your answer using the STAR method (Situation, Task, Action, Result)');
      tips.push('Include specific examples to support your points');
    }

    return tips.slice(0, 3); // Return top 3 most important tips
  }

  clearHistory() {
    this.speechSegments = [];
    this.emotionHistory = [];
  }
}

export const enhancedAnalysisService = new EnhancedAnalysisService();
