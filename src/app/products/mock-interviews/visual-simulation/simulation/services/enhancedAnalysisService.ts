import { FilesetResolver, FaceLandmarker, PoseLandmarker, DrawingUtils } from '@mediapipe/tasks-vision';
import Sentiment from 'sentiment';

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
  faceCount: number;
  headPose: {
    pitch: number;
    yaw: number;
    roll: number;
  } | null;
}

interface SpeechSegment {
  text: string;
  confidence: number;
  timestamp: number;
}

class EnhancedAnalysisService {
  private faceLandmarker: FaceLandmarker | null = null;
  private poseLandmarker: PoseLandmarker | null = null;
  private modelsLoaded = false;
  private speechSegments: SpeechSegment[] = [];
  private emotionHistory: any[] = [];
  private sentimentAnalyzer: Sentiment;
  private commonFillerWords = ['um', 'uh', 'like', 'you know', 'sort of', 'kind of', 'basically', 'actually', 'literally'];
  private positiveWords = ['experience', 'achieved', 'led', 'developed', 'improved', 'success', 'collaborated', 'managed', 'created', 'solved'];
  private confidenceWords = ['confident', 'certain', 'sure', 'definitely', 'absolutely', 'believe', 'convinced'];

  constructor() {
    this.sentimentAnalyzer = new Sentiment();
    if (typeof window !== 'undefined') {
      this.initializeMediaPipe();
    }
  }

  private async initializeMediaPipe() {
    if (typeof window === 'undefined') return;
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );

      this.faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/face_landmarker.task",
          delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 2
      });

      this.poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/pose_landmarker_lite.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO"
      });

      this.modelsLoaded = true;
      console.log('MediaPipe models loaded successfully');
    } catch (error) {
      console.error('Error loading MediaPipe models:', error);
    }
  }

  async analyzeFace(videoElement: HTMLVideoElement): Promise<{
    expressions: any | null;
    faceCount: number;
    headPose: { pitch: number; yaw: number; roll: number } | null;
    posture: string | null;
  }> {
    if (!this.modelsLoaded || !this.faceLandmarker || !this.poseLandmarker) {
      return { expressions: null, faceCount: 0, headPose: null, posture: null };
    }

    try {
      const startTimeMs = performance.now();

      // Detect faces
      const faceResult = this.faceLandmarker.detectForVideo(videoElement, startTimeMs);
      const faceCount = faceResult.faceLandmarks.length;

      let expressions = null;
      let headPose = null;

      if (faceCount > 0 && faceResult.faceBlendshapes && faceResult.faceBlendshapes.length > 0) {
        // Extract expressions from blendshapes
        const shapes = faceResult.faceBlendshapes[0].categories;
        expressions = this.mapBlendshapesToEmotions(shapes);

        // Calculate head pose from landmarks
        headPose = this.calculateHeadPose(faceResult.faceLandmarks[0]);

        this.emotionHistory.push(expressions);
        if (this.emotionHistory.length > 50) {
          this.emotionHistory.shift();
        }
      }

      // Detect pose for body language
      const poseResult = this.poseLandmarker.detectForVideo(videoElement, startTimeMs);
      let posture = null;
      if (poseResult.landmarks && poseResult.landmarks.length > 0) {
        posture = this.analyzePosture(poseResult.landmarks[0]);
      }

      return {
        expressions,
        faceCount,
        headPose,
        posture
      };
    } catch (error) {
      console.error('MediaPipe analysis error:', error);
      return { expressions: null, faceCount: 0, headPose: null, posture: null };
    }
  }

  private mapBlendshapesToEmotions(shapes: any[]) {
    // Helper to get score
    const getScore = (name: string) => shapes.find(s => s.categoryName === name)?.score || 0;

    return {
      happy: getScore('mouthSmileLeft') + getScore('mouthSmileRight'),
      neutral: 1 - Math.max(getScore('mouthSmileLeft'), getScore('browDownLeft'), getScore('browInnerUp')), // Approximation
      sad: getScore('mouthFrownLeft') + getScore('mouthFrownRight') + getScore('browInnerUp'),
      angry: getScore('browDownLeft') + getScore('browDownRight'),
      surprised: getScore('browOuterUpLeft') + getScore('browOuterUpRight') + getScore('jawOpen')
    };
  }

  private calculateHeadPose(landmarks: any[]) {
    // Simplified head pose estimation based on key landmarks
    // Nose tip: 1, Left Eye: 33, Right Eye: 263, Chin: 152, Left Ear: 234, Right Ear: 454

    // Yaw (Left/Right turn) - based on nose position relative to eyes
    const nose = landmarks[1];
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];
    const midEyeX = (leftEye.x + rightEye.x) / 2;
    const yaw = (nose.x - midEyeX) * 100; // Scale for readability

    // Pitch (Up/Down) - based on nose relative to eyes/chin
    const chin = landmarks[152];
    const midFaceY = (leftEye.y + rightEye.y + chin.y) / 2;
    const pitch = (nose.y - midFaceY) * 100;

    // Roll (Tilt) - based on eye level
    const roll = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x) * (180 / Math.PI);

    return { pitch, yaw, roll };
  }

  private analyzePosture(landmarks: any[]) {
    // Shoulders: 11 (left), 12 (right)
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];

    // Check if shoulders are level
    const shoulderSlope = Math.abs(leftShoulder.y - rightShoulder.y);

    if (shoulderSlope > 0.05) return 'Tilting';
    if (leftShoulder.y > 0.8 || rightShoulder.y > 0.8) return 'Slouching'; // Low in frame
    return 'Good';
  }

  addSpeechSegment(text: string, confidence: number) {
    this.speechSegments.push({
      text,
      confidence,
      timestamp: Date.now()
    });

    // Keep only last 5 minutes of speech for context
    const fiveMinutesAgo = Date.now() - 300000;
    this.speechSegments = this.speechSegments.filter(
      segment => segment.timestamp > fiveMinutesAgo
    );
  }

  async analyzeResponse(
    text: string,
    question: string,
    visualMetrics?: {
      averageFaceCount: number;
      postureIssues: string[];
      expressions: string[];
    },
    durationSeconds?: number
  ): Promise<AnalysisResult> {
    // Analyze speech patterns
    const speechMetrics = this.analyzeSpeechPatterns(text, durationSeconds);

    // Get average emotions
    const emotions = this.getAverageEmotions();

    // Calculate scores
    const communicationScore = this.calculateCommunicationScore(speechMetrics);
    const bodyLanguageScore = this.calculateBodyLanguageScore(emotions, visualMetrics);
    const answerQualityScore = this.calculateAnswerQuality(text, question);

    // Generate tips
    const tips = this.generateTips(
      speechMetrics,
      emotions,
      communicationScore,
      bodyLanguageScore,
      answerQualityScore,
      text,
      visualMetrics
    );

    return {
      communicationScore,
      bodyLanguageScore,
      answerQualityScore,
      emotionData: emotions,
      speechMetrics,
      tips,
      faceCount: visualMetrics ? Math.round(visualMetrics.averageFaceCount) : 1,
      headPose: null // We don't track average head pose yet, but could add it
    };
  }

  private analyzeSpeechPatterns(text: string, durationSeconds?: number) {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);

    // Return 0s if text is too short to analyze meaningfully
    if (words.length < 5) {
      return {
        pace: 0,
        clarity: 0,
        fillerWords: 0,
        confidence: 0
      };
    }

    const fillerWordCount = this.commonFillerWords.reduce(
      (count, word) => count + (text.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length,
      0
    );

    // Calculate speaking pace (words per minute)
    let durationMinutes = 0.1;

    if (durationSeconds && durationSeconds > 0) {
      durationMinutes = durationSeconds / 60;
    } else if (this.speechSegments.length > 1) {
      const start = this.speechSegments[0].timestamp;
      const end = this.speechSegments[this.speechSegments.length - 1].timestamp;
      durationMinutes = (end - start) / 60000;
    }

    if (durationMinutes < 0.1 && words.length > 0) {
      durationMinutes = words.length / 130;
    }

    const wordsPerMinute = durationMinutes > 0 ? words.length / durationMinutes : 0;

    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : 0;
    const sentenceLengthScore = Math.max(0, 100 - Math.abs(avgWordsPerSentence - 15) * 5);

    const uniqueWords = new Set(words).size;
    const vocabularyScore = words.length > 10 ? (uniqueWords / words.length) * 100 : 80;

    const clarity = (sentenceLengthScore * 0.6) + (vocabularyScore * 0.4);

    const confidenceWordScore = this.confidenceWords.reduce(
      (score, word) => score + (text.toLowerCase().includes(word) ? 5 : 0),
      50
    );

    const avgSpeechConfidence = this.speechSegments.length > 0
      ? (this.speechSegments.reduce((sum, seg) => sum + seg.confidence, 0) / this.speechSegments.length) * 100
      : 80;

    const confidence = (confidenceWordScore * 0.4) + (avgSpeechConfidence * 0.6);

    return {
      pace: Math.round(wordsPerMinute),
      clarity: Math.min(100, Math.round(clarity)),
      fillerWords: fillerWordCount,
      confidence: Math.min(100, Math.round(confidence))
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
    // Return 0 if insufficient speech data
    if (speechMetrics.pace === 0 && speechMetrics.confidence === 0) return 0;

    let score = 70;

    if (speechMetrics.pace >= 120 && speechMetrics.pace <= 160) score += 15;
    else if (speechMetrics.pace >= 100 && speechMetrics.pace <= 180) score += 5;
    else score -= 10;

    score += (speechMetrics.clarity - 70) * 0.3;

    const fillerPenalty = Math.max(0, (speechMetrics.fillerWords - 2) * 3);
    score -= fillerPenalty;

    score += (speechMetrics.confidence - 50) * 0.2;

    return Math.min(100, Math.max(0, Math.round(score)));
  }

  private calculateBodyLanguageScore(
    emotions: any,
    visualMetrics?: {
      averageFaceCount: number;
      postureIssues: string[];
      expressions: string[];
    }
  ): number {
    // If no visual metrics or face not detected properly, return low score
    if (visualMetrics && visualMetrics.averageFaceCount === 0) return 0;

    let score = 60;

    score += emotions.happy * 30;
    score += emotions.neutral * 10;
    score += emotions.surprised * 10;

    score -= emotions.sad * 20;
    score -= emotions.angry * 30;

    const emotionValues = Object.values(emotions) as number[];
    const maxEmotion = Math.max(...emotionValues);
    if (maxEmotion < 0.9) score += 10;

    if (visualMetrics) {
      // Penalize for posture issues
      if (visualMetrics.postureIssues.length > 0) {
        score -= visualMetrics.postureIssues.length * 5;
      }

      // Penalize for multiple faces or no face
      if (visualMetrics.averageFaceCount < 0.5 || visualMetrics.averageFaceCount > 1.5) {
        score -= 15;
      }
    }

    return Math.min(100, Math.max(0, Math.round(score)));
  }

  private calculateAnswerQuality(text: string, question: string): number {
    const wordCount = text.split(' ').length;
    if (wordCount < 5) return 0;

    let score = 60;
    const lowerText = text.toLowerCase();

    const sentimentResult = this.sentimentAnalyzer.analyze(text);
    if (sentimentResult.score > 0) score += Math.min(10, sentimentResult.score);
    if (sentimentResult.score < -2) score -= 5;

    const questionWords = question.toLowerCase()
      .replace(/[?.,!]/g, '')
      .split(' ')
      .filter(w => w.length > 3);

    const relevantMentions = questionWords.filter(word => lowerText.includes(word)).length;
    const relevanceScore = questionWords.length > 0 ? (relevantMentions / questionWords.length) * 20 : 10;
    score += relevanceScore;

    const structureWords = ['situation', 'task', 'action', 'result', 'first', 'then', 'finally', 'example', 'instance', 'because', 'therefore'];
    const structureCount = structureWords.filter(w => lowerText.includes(w)).length;
    score += Math.min(15, structureCount * 3);

    if (wordCount > 50) score += 5;
    if (wordCount > 100) score += 5;
    if (wordCount < 20) score -= 10;

    return Math.min(100, Math.max(0, Math.round(score)));
  }

  private generateTips(
    speechMetrics: any,
    emotions: any,
    communicationScore: number,
    bodyLanguageScore: number,
    answerQualityScore: number,
    text: string,
    visualMetrics?: {
      averageFaceCount: number;
      postureIssues: string[];
      expressions: string[];
    }
  ): string[] {
    const tips: string[] = [];

    if (visualMetrics) {
      if (visualMetrics.postureIssues.includes('Slouching')) {
        tips.push('Maintain an upright posture to project confidence.');
      }
      if (visualMetrics.averageFaceCount < 0.5) {
        tips.push('Ensure your face is clearly visible in the camera.');
      } else if (visualMetrics.averageFaceCount > 1.5) {
        tips.push('Ensure only you are visible in the frame for a professional setting.');
      }
    }

    if (speechMetrics.pace > 170) {
      tips.push('You are speaking quite fast. Slow down to ensure your points land.');
    } else if (speechMetrics.pace < 100 && speechMetrics.pace > 0) {
      tips.push('Try to pick up the pace slightly to show energy and enthusiasm.');
    }

    if (speechMetrics.fillerWords > 3) {
      tips.push(`Watch out for filler words. Detected ${speechMetrics.fillerWords} fillers like "um", "like", etc.`);
    }

    if (emotions.neutral > 0.8) {
      tips.push('Your expression is very static. Try to smile or nod to show engagement.');
    }
    if (emotions.angry > 0.2) {
      tips.push('You seem tense or frustrated. Take a breath and try to relax your face.');
    }

    const wordCount = text.split(' ').length;
    if (wordCount < 30) {
      tips.push('Your answer is quite short. Elaborate with specific examples or details.');
    }

    if (answerQualityScore < 70) {
      tips.push('Structure your answer using the STAR method (Situation, Task, Action, Result).');
    }

    return tips.slice(0, 5);
  }

  clearHistory() {
    this.speechSegments = [];
    this.emotionHistory = [];
  }
}

export const enhancedAnalysisService = new EnhancedAnalysisService();
