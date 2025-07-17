export class VideoHandler {
  private stream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];

  async initializeStream(): Promise<MediaStream> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: true
      });
      return this.stream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      throw error;
    }
  }

  startRecording(onDataAvailable: (blob: Blob) => void): void {
    if (!this.stream) {
      throw new Error("Stream not initialized");
    }

    this.chunks = [];
    this.mediaRecorder = new MediaRecorder(this.stream, {
      mimeType: 'video/webm;codecs=vp9,opus'
    });

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.chunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.chunks, { type: 'video/webm' });
      onDataAvailable(blob);
    };

    this.mediaRecorder.start();
  }

  stopRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
  }

  pauseRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
    }
  }

  resumeRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
    }
  }

  cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  getStreamStatus(): boolean {
    return this.stream !== null && this.stream.active;
  }
}
