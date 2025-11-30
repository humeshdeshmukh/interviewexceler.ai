export interface VideoMetrics {
  faceExpression: string;
  eyeContact: boolean;
  posture: string;
}

class VideoAnalysisService {
  private faceDetector: any;
  private lastMetrics: VideoMetrics = {
    faceExpression: 'neutral',
    eyeContact: true,
    posture: 'good'
  };
  private analysisInterval: any = null;

  constructor() {
    if (typeof window !== 'undefined' && 'FaceDetector' in window) {
      this.faceDetector = new (window as any).FaceDetector();
    }
  }

  async startAnalysis(videoElement: HTMLVideoElement): Promise<void> {
    if (!this.faceDetector) {
      console.warn('Face detection not supported');
      return;
    }

    this.analysisInterval = setInterval(async () => {
      try {
        const metrics = await this.analyzeFrame(videoElement);
        this.lastMetrics = metrics;
      } catch (error) {
        console.error('Video analysis error:', error);
      }
    }, 1000); // Analyze every second
  }

  stopAnalysis(): void {
    if (this.analysisInterval) {
      clearInterval(this.analysisInterval);
      this.analysisInterval = null;
    }
  }

  async analyzeFrame(videoElement: HTMLVideoElement): Promise<VideoMetrics> {
    if (!this.faceDetector || !videoElement) {
      return this.lastMetrics;
    }

    try {
      const faces = await this.faceDetector.detect(videoElement);
      
      if (faces.length === 0) {
        return {
          faceExpression: 'neutral',
          eyeContact: false,
          posture: 'poor'
        };
      }

      const face = faces[0];
      const { boundingBox } = face;
      
      // Check if face is centered (rough eye contact estimation)
      const centerX = videoElement.videoWidth / 2;
      const centerY = videoElement.videoHeight / 2;
      const faceX = boundingBox.x + boundingBox.width / 2;
      const faceY = boundingBox.y + boundingBox.height / 2;
      
      const eyeContact = Math.abs(centerX - faceX) < 50 && Math.abs(centerY - faceY) < 50;
      
      // Check posture based on face position
      const posture = this.analyzePosture(boundingBox, videoElement);
      
      // For expression, we'll use a simple neutral state since we can't detect emotions
      const expression = 'neutral';

      return {
        faceExpression: expression,
        eyeContact,
        posture
      };
    } catch (error) {
      console.error('Face detection error:', error);
      return this.lastMetrics;
    }
  }

  private analyzePosture(
    boundingBox: { x: number; y: number; width: number; height: number },
    videoElement: HTMLVideoElement
  ): string {
    // Check if face is too close or too far
    const faceRatio = boundingBox.width / videoElement.videoWidth;
    if (faceRatio > 0.4) return 'too close';
    if (faceRatio < 0.15) return 'too far';
    
    // Check if face is centered vertically
    const verticalPosition = boundingBox.y / videoElement.videoHeight;
    if (verticalPosition < 0.2) return 'too high';
    if (verticalPosition > 0.6) return 'too low';
    
    return 'good';
  }

  getCurrentMetrics(): VideoMetrics {
    return this.lastMetrics;
  }
}

export const videoAnalysisService = new VideoAnalysisService();
