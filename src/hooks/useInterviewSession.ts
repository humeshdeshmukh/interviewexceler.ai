"use client";

import { useState, useEffect, useCallback } from 'react';
import { geminiService } from '@/services/gemini';

interface InterviewState {
  isActive: boolean;
  currentQuestion: string;
  currentAnswer: string;
  feedback: {
    posture: number;
    voice: number;
    eyeContact: number;
    content: string;
    suggestions: string[];
    confidence: number;
  } | null;
  history: {
    question: string;
    answer: string;
    feedback: any;
  }[];
  role: string;
  experience: string;
}

export function useInterviewSession(role: string, experience: string) {
  const [state, setState] = useState<InterviewState>({
    isActive: false,
    currentQuestion: '',
    currentAnswer: '',
    feedback: null,
    history: [],
    role,
    experience,
  });

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [avatarState, setAvatarState] = useState<'idle' | 'speaking' | 'thinking' | 'greeting'>('idle');

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setTranscript(prev => prev + ' ' + transcript);
        };

        recognition.onend = () => {
          if (isRecording) {
            recognition.start();
          }
        };

        return () => {
          recognition.stop();
        };
      }
    }
  }, [isRecording]);

  const startSession = useCallback(async () => {
    setAvatarState('speaking');
    const question = await geminiService.generateInterviewQuestion(
      state.role,
      state.experience,
      state.history.map(h => h.question)
    );
    setState(prev => ({
      ...prev,
      isActive: true,
      currentQuestion: question.question
    }));
    setIsRecording(true);
  }, [state.role, state.experience, state.history]);

  const stopRecording = useCallback(async () => {
    setIsRecording(false);
    setAvatarState('thinking');

    if (transcript) {
      const feedback = await geminiService.analyzeSpeech(
        transcript,
        state.role,
        state.currentQuestion
      );

      setState(prev => ({
        ...prev,
        currentAnswer: transcript,
        feedback,
        history: [...prev.history, {
          question: prev.currentQuestion,
          answer: transcript,
          feedback
        }]
      }));

      setTranscript('');
      setAvatarState('speaking');
    }
  }, [transcript, state.role, state.currentQuestion]);

  const getNextQuestion = useCallback(async () => {
    setAvatarState('thinking');
    const question = await geminiService.generateInterviewQuestion(
      state.role,
      state.experience,
      state.history.map(h => h.question)
    );
    setState(prev => ({
      ...prev,
      currentQuestion: question.question,
      currentAnswer: '',
      feedback: null
    }));
    setAvatarState('speaking');
  }, [state.role, state.experience, state.history]);

  const endSession = useCallback(async () => {
    setIsRecording(false);
    setAvatarState('idle');
    const summary = await geminiService.provideFeedbackSummary(
      state.history.map(h => ({
        question: h.question,
        answer: h.answer
      }))
    );
    setState(prev => ({
      ...prev,
      isActive: false,
      currentQuestion: '',
      currentAnswer: '',
      feedback: null
    }));
    return summary;
  }, [state.history]);

  return {
    state,
    isRecording,
    transcript,
    avatarState,
    actions: {
      startSession,
      stopRecording,
      getNextQuestion,
      endSession
    }
  };
}
