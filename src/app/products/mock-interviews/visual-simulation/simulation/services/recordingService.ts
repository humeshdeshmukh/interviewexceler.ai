import RecordRTC, { RecordRTCPromisesHandler } from 'recordrtc';

class RecordingService {
  private recorder: RecordRTCPromisesHandler | null = null;
  private stream: MediaStream | null = null;

  async startRecording(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }
        },
        audio: true
      });

      this.recorder = new RecordRTCPromisesHandler(this.stream, {
        type: 'video',
        mimeType: 'video/webm;codecs=vp9',
        bitsPerSecond: 128000,
        frameInterval: 90,
        video: {
          width: 1920,
          height: 1080
        }
      });

      await this.recorder.startRecording();
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  async stopRecording(): Promise<Blob> {
    if (!this.recorder) {
      throw new Error('No recording in progress');
    }

    try {
      await this.recorder.stopRecording();
      const blob = await this.recorder.getBlob();
      
      // Stop all tracks
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
      }
      
      // Clean up
      this.recorder = null;
      this.stream = null;

      return blob;
    } catch (error) {
      console.error('Error stopping recording:', error);
      throw error;
    }
  }

  async generateThumbnail(videoBlob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoBlob);
      
      video.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.7);
        
        // Clean up
        URL.revokeObjectURL(video.src);
        resolve(thumbnailUrl);
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        reject(new Error('Error loading video'));
      };
    });
  }

  downloadRecording(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export const recordingService = new RecordingService();
