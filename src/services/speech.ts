"use client";

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private recognition: any = null;
  private isRecognitionActive: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
      this.initRecognition();
    }
  }

  private initRecognition() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
      }
    }
  }

  startRecognition(
    onResult: (text: string, isFinal: boolean) => void,
    onError?: (error: any) => void
  ) {
    if (!this.recognition) {
      onError?.(new Error('Speech recognition not supported'));
      return;
    }

    this.isRecognitionActive = true;
    let finalTranscript = '';
    let interimTranscript = '';

    this.recognition.onresult = (event: any) => {
      interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
          onResult(finalTranscript.trim(), true);
        } else {
          interimTranscript += transcript;
          onResult(interimTranscript.trim(), false);
        }
      }
    };

    this.recognition.onerror = (error: any) => {
      console.error('Speech recognition error:', error);
      onError?.(error);
    };

    this.recognition.onend = () => {
      if (this.isRecognitionActive) {
        this.recognition.start();
      }
    };

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      onError?.(error);
    }
  }

  stopRecognition() {
    this.isRecognitionActive = false;
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  speak(text: string, onStart?: () => void, onEnd?: () => void) {
    console.log('speechService.speak called with:', text); // DEBUG LOG
    if (!this.synth) return;
    if (this.currentUtterance) {
      this.synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Microsoft') || 
      voice.name.includes('Google') || 
      voice.name.includes('Natural')
    ) || voices[0];

    utterance.voice = preferredVoice;
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      this.currentUtterance = utterance;
      onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      console.log('Speech synthesis finished:', text); // DEBUG LOG
      onEnd?.();
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.currentUtterance && this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }
}

// Only export speechService if window is defined (client-side)
export const speechService = (typeof window !== 'undefined') ? new SpeechService() : null;
