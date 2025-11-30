class RecordingService {
  private mediaRecorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private recordedChunks: Blob[] = [];

  async startRecording(): Promise<void> {
    if (typeof window === 'undefined') {
      throw new Error('Recording is only available in browser');
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Use native MediaRecorder API instead of RecordRTC
      const options: MediaRecorderOptions = {
        mimeType: 'video/webm;codecs=vp9,opus',
        videoBitsPerSecond: 2500000 // 2.5 Mbps for better quality
      };

      // Fallback to vp8 if vp9 is not supported
      if (!MediaRecorder.isTypeSupported(options.mimeType!)) {
        options.mimeType = 'video/webm;codecs=vp8,opus';
      }

      // Fallback to default if neither is supported
      if (!MediaRecorder.isTypeSupported(options.mimeType!)) {
        options.mimeType = 'video/webm';
      }

      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream, options);

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(100); // Collect data every 100ms
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  async stopRecording(): Promise<Blob> {
    if (!this.mediaRecorder) {
      throw new Error('No recording in progress');
    }

    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No recording in progress'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, {
          type: this.mediaRecorder?.mimeType || 'video/webm'
        });

        // Stop all tracks
        if (this.stream) {
          this.stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        }

        // Clean up
        this.mediaRecorder = null;
        this.stream = null;
        this.recordedChunks = [];

        resolve(blob);
      };

      this.mediaRecorder.onerror = (event: Event) => {
        console.error('MediaRecorder error:', event);
        reject(new Error('Recording failed'));
      };

      this.mediaRecorder.stop();
    });
  }

  async generateThumbnail(videoBlob: Blob): Promise<string> {
    if (typeof window === 'undefined') {
      return '';
    }

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
    if (typeof window === 'undefined') return;

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
