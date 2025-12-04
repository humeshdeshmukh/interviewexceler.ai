'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AIAvatar } from './components/AIAvatar';
import VideoFeed from './components/VideoFeed';
import QuestionPanel from './components/QuestionPanel';
import VideoPreview from './components/VideoPreview';
import RecordingsList from './components/RecordingsList';
import { Question, interviewQuestions } from './data/questions';
import { MessageSquare, BarChart, Download, Share2, ThumbsUp, Volume2, Mic, Camera, Settings, ChevronLeft, X, Clock, Activity, MessageCircle, Lightbulb, AlertTriangle } from 'lucide-react';
import { recordingService } from './services/recordingService';
import { enhancedAnalysisService } from './services/enhancedAnalysisService';
import { geminiService } from './services/geminiService';
import { transcriptCorrection } from './utils/transcriptCorrection';
import { CheckCircle, Sparkles, MicOff } from 'lucide-react';
import SetupModal from './components/SetupModal';
import PersonalizedQuestionDisplay from './components/PersonalizedQuestionDisplay';
import { supabaseService } from './services/supabaseService';
import { useAuth } from '@/features/auth/context/AuthContext';

export default function SimulationPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(interviewQuestions);
  const [transcript, setTranscript] = useState({
    final: '',
    interim: '',
    segments: [] as { text: string; timestamp: number }[]
  });
  const [analysis, setAnalysis] = useState({
    communicationScore: 0,
    bodyLanguageScore: 0,
    answerQualityScore: 0,
    emotionData: {
      happy: 0,
      neutral: 0,
      sad: 0,
      angry: 0,
      surprised: 0
    },
    speechMetrics: {
      pace: 0,
      clarity: 0,
      fillerWords: 0,
      confidence: 0
    },
    tips: ['Start speaking to see real-time feedback']
  });
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [recordings, setRecordings] = useState<Array<{
    id: string;
    timestamp: Date;
    duration: number;
    url: string;
    thumbnailUrl: string;
    questionIndex: number;
    transcript: string;
    blob?: Blob;
  }>>([]);
  const [recognition, setRecognition] = useState<any>(null);
  const [notepadContent, setNotepadContent] = useState('');
  const [fontSize, setFontSize] = useState('normal');
  const [showWordCount, setShowWordCount] = useState(false);
  const [geminiAnalysis, setGeminiAnalysis] = useState<any>(null);
  const [isLoadingGemini, setIsLoadingGemini] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [faceCount, setFaceCount] = useState(0);
  const [posture, setPosture] = useState<string | null>(null);
  const [correctedTranscript, setCorrectedTranscript] = useState('');
  const [isCorrectingTranscript, setIsCorrectingTranscript] = useState(false);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Personalized Interview State
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [interviewMode, setInterviewMode] = useState<'standard' | 'personalized'>('standard');
  const [resumeData, setResumeData] = useState<{ resumeText: string; goal: string } | null>(null);
  const [handsFreeMode, setHandsFreeMode] = useState(false);
  const [crossQuestioning, setCrossQuestioning] = useState(false);
  const [questionFlowType, setQuestionFlowType] = useState<'Technical' | 'Behavioral' | 'Mixed'>('Mixed');
  const [interviewPhase, setInterviewPhase] = useState<'intro' | 'technical' | 'behavioral'>('intro');
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      supabaseService.getUserProfile(user.id).then(profile => {
        if (profile) {
          setUserProfile({
            name: user.user_metadata?.full_name,
            targetRole: profile.target_role,
            experienceLevel: profile.experience_level,
            resumeText: profile.preferences?.resume_text
          });
        }
      });
    }
  }, [user]);

  // Ref to track AI speaking state without triggering re-renders in callbacks
  const isAISpeakingRef = React.useRef(false);

  // Sync ref with state
  useEffect(() => {
    isAISpeakingRef.current = isAISpeaking;
  }, [isAISpeaking]);

  // Ref for current question index to avoid closure staleness in callbacks
  const currentQuestionRef = React.useRef(currentQuestion);
  useEffect(() => {
    currentQuestionRef.current = currentQuestion;
  }, [currentQuestion]);

  // Ref for isRecording to avoid stale closure in speech recognition
  const isRecordingRef = React.useRef(false);
  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  // Refs for accumulating visual metrics during recording
  const visualMetricsRef = React.useRef<{
    faceCounts: number[];
    postureIssues: Set<string>;
    expressions: Set<string>;
  }>({
    faceCounts: [],
    postureIssues: new Set(),
    expressions: new Set()
  });

  // Ref for AI analysis panel to enable auto-scroll
  const analysisRef = React.useRef<HTMLDivElement>(null);

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleClearNotes = () => {
    if (window.confirm('Are you sure you want to clear all notes?')) {
      setNotepadContent('');
    }
  };

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);

        // Periodic analysis update for real-time feedback even during silence
        const currentVisualMetrics = {
          averageFaceCount: visualMetricsRef.current.faceCounts.length > 0
            ? visualMetricsRef.current.faceCounts.reduce((a, b) => a + b, 0) / visualMetricsRef.current.faceCounts.length
            : 0,
          postureIssues: Array.from(visualMetricsRef.current.postureIssues),
          expressions: Array.from(visualMetricsRef.current.expressions)
        };

        // Update analysis with current duration
        enhancedAnalysisService.analyzeResponse(
          transcript.final,
          questions[currentQuestion]?.text || '',
          currentVisualMetrics,
          timeElapsed + 1 // Add 1 since we just incremented
        ).then(setAnalysis);

      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, transcript.final, currentQuestion, timeElapsed]);

  // Effect for Hands-free mode auto-advance
  useEffect(() => {
    if (interviewMode === 'personalized' && handsFreeMode && !isRecording && transcript.final && !isGeneratingQuestion) {
      // Wait for analysis to complete then auto-advance
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isRecording, handsFreeMode, interviewMode, transcript.final, isGeneratingQuestion]);

  useEffect(() => {
    let recognitionInstance: any = null;

    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onstart = () => {
          console.log('Speech recognition started');
        };

        recognitionInstance.onresult = (event: any) => {
          // Ignore input if AI is speaking
          if (isAISpeakingRef.current) return;

          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;

            // Only filter if transcript is nearly identical to question (AI echo)
            // Use word overlap to detect echo vs legitimate answer
            const questionText = questions[currentQuestionRef.current]?.text || '';
            const questionWords = questionText.toLowerCase().split(/\s+/).filter(w => w.length > 3);
            const transcriptWords = transcript.toLowerCase().split(/\s+/).filter(w => w.length > 3);

            // Calculate overlap percentage
            let matchCount = 0;
            if (questionWords.length > 0 && transcriptWords.length > 0) {
              transcriptWords.forEach(word => {
                if (questionWords.includes(word)) matchCount++;
              });
              const overlapPercentage = matchCount / transcriptWords.length;

              // Only filter if >80% of words match (likely AI reading question)
              if (overlapPercentage > 0.8 && transcriptWords.length >= 3) {
                console.log('Filtering likely AI echo (overlap:', (overlapPercentage * 100).toFixed(0) + '%):', transcript);
                continue;
              }
            }

            if (event.results[i].isFinal) {
              finalTranscript += transcript;
              setTranscript(prev => ({
                ...prev,
                final: prev.final + ' ' + transcript,
                segments: [...prev.segments, {
                  text: transcript,
                  timestamp: Date.now()
                }]
              }));

              // Apply spell correction asynchronously (debounced)
              const fullText = transcript.final + ' ' + transcript;
              if (fullText.trim().length > 10) {
                setTimeout(async () => {
                  setIsCorrectingTranscript(true);
                  try {
                    const corrected = await transcriptCorrection.correctText(fullText.trim());
                    setCorrectedTranscript(corrected);
                  } catch (error) {
                    // Silently fail for 503 errors or other API issues to avoid disrupting the user
                    console.warn('Transcript correction failed:', error);
                  } finally {
                    setIsCorrectingTranscript(false);
                  }
                }, 2000); // Wait 2 seconds before correcting
              }
            } else {
              interimTranscript += transcript;
              setTranscript(prev => ({
                ...prev,
                interim: interimTranscript
              }));
            }
          }

          // Update analysis if we have final transcript
          if (finalTranscript) {
            enhancedAnalysisService.addSpeechSegment(finalTranscript, 1);

            // Calculate current visual metrics for real-time feedback
            const currentVisualMetrics = {
              averageFaceCount: visualMetricsRef.current.faceCounts.length > 0
                ? visualMetricsRef.current.faceCounts.reduce((a, b) => a + b, 0) / visualMetricsRef.current.faceCounts.length
                : 0,
              postureIssues: Array.from(visualMetricsRef.current.postureIssues),
              expressions: Array.from(visualMetricsRef.current.expressions)
            };

            // Only analyze if we have enough words (prevent noise triggering)
            if (getWordCount(finalTranscript) > 5) {
              enhancedAnalysisService.analyzeResponse(
                finalTranscript,
                questions[currentQuestion]?.text || '',
                currentVisualMetrics,
                timeElapsed
              ).then(setAnalysis);
            }
          }
        };

        recognitionInstance.onerror = (event: any) => {
          // "no-speech" is expected when user hasn't spoken within timeout - silently restart
          if (event.error === 'no-speech') {
            // Only restart if we're still recording
            if (isRecordingRef.current) {
              try {
                recognitionInstance.stop();
                setTimeout(() => {
                  if (isRecordingRef.current) {
                    recognitionInstance.start();
                  }
                }, 100);
              } catch (e) {
                // Ignore restart errors
              }
            }
            return;
          }

          // "aborted" happens when we manually stop - ignore it
          if (event.error === 'aborted') {
            return;
          }

          // Log only genuine errors
          console.error('Speech recognition error:', event.error);
        };

        recognitionInstance.onend = () => {
          console.log('Speech recognition ended');
          // Use ref to get current recording state (avoids stale closure)
          if (isRecordingRef.current) {
            console.log('Restarting speech recognition...');
            try {
              recognitionInstance.start();
            } catch (e) {
              console.error('Failed to restart recognition:', e);
            }
          }
        };

        setRecognition(recognitionInstance);
      }
    }

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, []);
  const handleVideoMetricsUpdate = React.useCallback(async (videoElement: HTMLVideoElement) => {
    if (isRecording) {
      const faceAnalysis = await enhancedAnalysisService.analyzeFace(videoElement);
      setFaceCount(faceAnalysis.faceCount);
      setPosture(faceAnalysis.posture);

      // Accumulate metrics
      visualMetricsRef.current.faceCounts.push(faceAnalysis.faceCount);
      if (faceAnalysis.posture && faceAnalysis.posture !== 'Good') {
        visualMetricsRef.current.postureIssues.add(faceAnalysis.posture);
      }
      if (faceAnalysis.expressions) {
        // Find dominant expression
        const dominant = Object.entries(faceAnalysis.expressions)
          .reduce((a, b) => (a[1] as number) > (b[1] as number) ? a : b)[0];
        visualMetricsRef.current.expressions.add(dominant);
      }
    }
  }, [isRecording]);

  const handleToggleRecording = async () => {
    try {
      if (!isRecording) {
        // Create session if not exists (for normal mode)
        if (!sessionId && user && interviewMode === 'standard') {
          try {
            const session = await supabaseService.saveSession(
              user.id,
              '',
              '',
              'Standard Mock Interview'
            );
            if (session) {
              setSessionId(session.id);
              console.log('✅ Standard interview session created:', session.id);
            }
          } catch (error) {
            console.error('Failed to create session:', error);
          }
        }

        // Start recording
        await recordingService.startRecording();
        setIsRecording(true);
        setIsAISpeaking(true);
        setRecordingError(null); // Clear any previous errors

        // Clear transcript
        setTranscript({
          final: '',
          interim: '',
          segments: []
        });

        // Reset visual metrics
        visualMetricsRef.current = {
          faceCounts: [],
          postureIssues: new Set(),
          expressions: new Set()
        };

        // Start speech recognition
        if (recognition) {
          try {
            // First stop any existing recognition to avoid "already started" error
            recognition.stop();
          } catch (e) {
            // Ignore errors from stopping (may not be running)
          }
          // Start after a brief delay to ensure stop has completed
          setTimeout(() => {
            try {
              recognition.start();
            } catch (e) {
              console.error('Failed to start speech recognition:', e);
            }
          }, 100);
        }

        enhancedAnalysisService.clearHistory();
        setGeminiAnalysis(null);
        setTimeout(() => setIsAISpeaking(false), 3000);
      } else {
        // Stop recording
        const blob = await recordingService.stopRecording();

        // Stop speech recognition
        if (recognition) {
          recognition.stop();
        }

        const thumbnailUrl = await recordingService.generateThumbnail(blob);
        const url = URL.createObjectURL(blob);

        // Save recording with transcript
        setRecordings(prev => [...prev, {
          id: Date.now().toString(),
          timestamp: new Date(),
          duration: timeElapsed,
          url,
          thumbnailUrl,
          questionIndex: currentQuestion,
          transcript: transcript.final.trim(),
          blob
        }]);

        setIsRecording(false);
        setTimeElapsed(0);

        // Get deep analysis from Gemini (async)
        const wordCount = getWordCount(transcript.final);
        if (wordCount > 1) {
          setIsLoadingGemini(true);
          setAnalysisError(null); // Clear any previous errors
          console.log('🔍 Starting Gemini analysis for answer:', transcript.final.substring(0, 50) + '...');

          // Calculate visual summary
          const avgFaceCount = visualMetricsRef.current.faceCounts.length > 0
            ? visualMetricsRef.current.faceCounts.reduce((a, b) => a + b, 0) / visualMetricsRef.current.faceCounts.length
            : 0;

          const visualSummary = {
            averageFaceCount: avgFaceCount,
            postureIssues: Array.from(visualMetricsRef.current.postureIssues),
            expressions: Array.from(visualMetricsRef.current.expressions)
          };

          geminiService.analyzeInterviewAnswer(
            questions[currentQuestion]?.text || '',
            transcript.final.trim(),
            visualSummary,
            userProfile
          ).then(async result => {
            console.log('✅ Gemini Analysis Result:', result);
            setGeminiAnalysis(result);
            setIsLoadingGemini(false);

            // Auto-scroll to analysis panel
            setTimeout(() => {
              analysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);

            // Save to Supabase - create session if needed
            if (user) {
              let currentSessionId = sessionId;

              // Create session if none exists (fallback)
              if (!currentSessionId) {
                try {
                  const session = await supabaseService.saveSession(
                    user.id,
                    '',
                    '',
                    'Mock Interview'
                  );
                  if (session) {
                    currentSessionId = session.id;
                    setSessionId(session.id);
                    console.log('✅ Fallback session created:', session.id);
                  }
                } catch (error) {
                  console.error('Failed to create fallback session:', error);
                }
              }

              // Save the score
              if (currentSessionId) {
                try {
                  await supabaseService.saveScore(
                    currentSessionId,
                    currentQuestion,
                    questions[currentQuestion]?.text || '',
                    transcript.final.trim(),
                    result
                  );
                  console.log('✅ Score saved for question', currentQuestion);
                } catch (error) {
                  console.error('Failed to save score:', error);
                }
              }
            }
          }).catch(error => {
            console.error('❌ Gemini analysis failed:', error);
            setIsLoadingGemini(false);
            setAnalysisError(
              error?.message?.includes('API key')
                ? 'API key not configured. Please check your environment variables.'
                : error?.message || 'Failed to analyze your response. Please try again.'
            );
          });
        } else {
          // Handle short answers
          setGeminiAnalysis({
            analysis: "Your answer was too short to analyze. Please try providing a more detailed response.",
            score: 0,
            communicationScore: 0,
            clarity: 0,
            confidence: 0,
            bodyLanguageScore: 0,
            keyImprovements: ["Speak for longer to get detailed feedback", "Elaborate on your key points"],
            improvedAnswer: "N/A",
            modelAnswer: "N/A"
          });
        }
      }
    } catch (error: any) {
      console.error('Recording error:', error);
      setIsRecording(false);
      if (recognition) {
        recognition.stop();
      }

      // Provide user-friendly error messages
      if (error?.name === 'NotAllowedError' || error?.name === 'PermissionDeniedError') {
        setRecordingError('Camera/microphone access denied. Please enable permissions in your browser settings and try again.');
      } else if (error?.name === 'NotFoundError') {
        setRecordingError('No camera or microphone found. Please connect a device and try again.');
      } else if (error?.name === 'NotReadableError') {
        setRecordingError('Camera/microphone is already in use by another application. Please close other applications and try again.');
      } else if (error?.message) {
        setRecordingError(`Recording failed: ${error.message}`);
      } else {
        setRecordingError('Failed to start recording. Please check your camera and microphone.');
      }
    }
  };

  const handleQuestionSelect = (index: number) => {
    // Stop recognition if it's running
    if (recognition && isRecording) {
      try {
        recognition.stop();
      } catch (error) {
        console.error('Failed to stop recognition on question change:', error);
      }
    }

    setCurrentQuestion(index);
    setIsAISpeaking(true);

    // Clear transcript for new question
    setTranscript({
      final: '',
      interim: '',
      segments: []
    });

    setTimeout(() => {
      setIsAISpeaking(false);
      // Only start recognition if we're recording
      if (isRecording && recognition) {
        try {
          recognition.start();
        } catch (error) {
          console.error('Failed to start recognition after question change:', error);
        }
      }
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = async () => {
    if (interviewMode === 'standard') {
      // Standard mode: cycle through predefined questions
      const nextIndex = (currentQuestion + 1) % questions.length;
      setCurrentQuestion(nextIndex);
      setIsAISpeaking(true);
      setTimeout(() => setIsAISpeaking(false), 3000);
      return;
    }

    // Personalized mode: generate AI questions
    if (!resumeData || isGeneratingQuestion) return;

    setIsGeneratingQuestion(true);
    try {
      let context: 'initial' | 'follow-up' | 'new-topic' = 'new-topic';
      let targetCategory: 'Technical' | 'Behavioral' | 'Mixed' | undefined;

      // Determine context and category based on interview flow type
      if (crossQuestioning && transcript.final.trim().length > 10) {
        context = 'follow-up';
      } else if (questionFlowType === 'Mixed') {
        // Implement Intro -> Technical -> Behavioral flow
        if (interviewPhase === 'intro') {
          context = 'new-topic';
          targetCategory = 'Technical';
          setInterviewPhase('technical');
        } else if (interviewPhase === 'technical') {
          context = 'new-topic';
          targetCategory = 'Behavioral';
          setInterviewPhase('behavioral');
        } else {
          // After behavioral, cycle back or continue with mixed
          context = 'new-topic';
          targetCategory = Math.random() > 0.5 ? 'Technical' : 'Behavioral';
        }
      } else {
        // Use the selected flow type
        targetCategory = questionFlowType;
      }

      const previousQuestion = questions[currentQuestion]?.text;
      const previousAnswer = transcript.final;

      const nextQuestion = await geminiService.generateNextQuestion(
        resumeData.resumeText,
        resumeData.goal,
        previousQuestion,
        previousAnswer,
        context,
        targetCategory
      );

      const mappedQuestion: Question = {
        id: nextQuestion.id,
        text: nextQuestion.text,
        category: nextQuestion.category,
        type: 'personalized',
        difficulty: nextQuestion.difficulty?.toLowerCase() || 'medium'
      };

      setQuestions(prev => [...prev, mappedQuestion]);
      setCurrentQuestion(prev => prev + 1);

      // Reset transcript for new question
      setTranscript({
        final: '',
        interim: '',
        segments: []
      });

      // Auto-start recording if hands-free
      if (handsFreeMode) {
        setTimeout(() => {
          handleToggleRecording();
        }, 2000); // Give user a moment to read the question
      }
    } catch (error) {
      console.error('Error generating next question:', error);
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const handlePersonalizedStart = async (data: { resumeText: string; jobDescription: string; goal: string; crossQuestioning: boolean; handsFreeMode: boolean; questionFlowType: 'Technical' | 'Behavioral' | 'Mixed' }) => {
    setResumeData(data);
    setInterviewMode('personalized');
    setCrossQuestioning(data.crossQuestioning);
    setHandsFreeMode(data.handsFreeMode);
    setQuestionFlowType(data.questionFlowType);
    setInterviewPhase('intro'); // Start with intro phase
    setIsSetupModalOpen(false);
    setIsGeneratingQuestion(true);

    try {
      // Save session to Supabase with authenticated user ID
      if (!user) {
        console.warn('No authenticated user found, session will not be saved');
        throw new Error('Please log in to save your interview session');
      }

      const session = await supabaseService.saveSession(
        user.id, // Use actual authenticated user ID
        data.resumeText || '',
        data.jobDescription || '',
        data.goal
      );
      if (session) {
        setSessionId(session.id);
        console.log('✅ Session saved with ID:', session.id, 'for user:', user.id);
      }

      // Generate initial question using Gemini
      // Use resume if available, otherwise use job description + goal
      const contextText = data.resumeText || `Job Description: ${data.jobDescription}\nTarget Role: ${data.goal}`;
      const initialQuestion = await geminiService.generateNextQuestion(
        contextText,
        data.goal,
        '',
        '',
        'initial',
        data.questionFlowType
      );

      const personalizedQuestion: Question = {
        id: initialQuestion.id,
        text: initialQuestion.text,
        category: initialQuestion.category,
        type: 'personalized',
        difficulty: initialQuestion.difficulty?.toLowerCase() || 'medium'
      };

      setQuestions([personalizedQuestion]);
      setCurrentQuestion(0);

      // Auto-start recording if hands-free
      if (data.handsFreeMode) {
        setTimeout(() => {
          handleToggleRecording();
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to start personalized interview:", error);
      // Fallback
      const personalizedQuestion: Question = {
        id: 'p1',
        text: `Based on your goal to be a ${data.goal}, tell me about your experience with relevant technologies found in your resume.`,
        category: 'Personalized',
        type: 'personalized',
        difficulty: 'medium'
      };
      setQuestions([personalizedQuestion]);
      setCurrentQuestion(0);
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const handleStopPersonalizedInterview = () => {
    // Reset to standard mode
    setInterviewMode('standard');
    setResumeData(null);
    setQuestions(interviewQuestions);
    setCurrentQuestion(0);
    setHandsFreeMode(false);
    setCrossQuestioning(false);
    setSessionId(null);
    setInterviewPhase('intro');

    // Reset transcript
    setTranscript({
      final: '',
      interim: '',
      segments: []
    });

    // Stop recording if active
    if (isRecording) {
      handleToggleRecording();
    }
  };

  const handleDownloadRecording = (id: string) => {
    const recording = recordings.find(r => r.id === id);
    if (recording?.blob) {
      const filename = `interview-${recording.timestamp.toISOString()}.webm`;
      recordingService.downloadRecording(recording.blob, filename);
    }
  };

  const handleDeleteRecording = (id: string) => {
    if (window.confirm('Are you sure you want to delete this recording?')) {
      setRecordings(prev => prev.filter(r => r.id !== id));
    }
  };

  const handlePlayRecording = (id: string) => {
    const recording = recordings.find(r => r.id === id);
    if (recording) {
      // Create a modal wrapper
      const modalWrapper = document.createElement('div');
      modalWrapper.className = 'fixed inset-0 bg-black/80 flex items-center justify-center p-8 z-50';
      modalWrapper.style.backdropFilter = 'blur(8px)';

      // Create modal content
      const modalContent = document.createElement('div');
      modalContent.className = 'relative w-full max-w-4xl bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10';

      // Create close button
      const closeButton = document.createElement('button');
      closeButton.className = 'absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors z-10';
      closeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;

      // Create video container
      const videoContainer = document.createElement('div');
      videoContainer.className = 'relative aspect-video';

      // Create and setup video element
      const video = document.createElement('video');
      video.src = recording.url;
      video.controls = true;
      video.className = 'w-full h-full object-contain bg-black';

      // Create info section
      const infoSection = document.createElement('div');
      infoSection.className = 'p-6 text-white';
      infoSection.innerHTML = `
        <h3 class="text-xl font-semibold mb-2">${questions[recording.questionIndex]?.text || 'Interview Answer'}</h3>
        <p class="text-white/60 text-sm">${new Date(recording.timestamp).toLocaleString()}</p>
      `;

      // Add click handlers
      modalWrapper.onclick = (e) => {
        if (e.target === modalWrapper) {
          document.body.removeChild(modalWrapper);
          video.pause();
        }
      };

      closeButton.onclick = () => {
        document.body.removeChild(modalWrapper);
        video.pause();
      };

      // Assemble modal
      videoContainer.appendChild(video);
      modalContent.appendChild(closeButton);
      modalContent.appendChild(videoContainer);
      modalContent.appendChild(infoSection);
      modalWrapper.appendChild(modalContent);
      document.body.appendChild(modalWrapper);

      // Start playback
      video.play();
    }
  };

  const handleCustomQuestionAdd = (question: Question) => {
    setQuestions(prev => [...prev, question]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Setup Modal for Personalized Interview */}
      <SetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        onStart={handlePersonalizedStart}
      />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Header with Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-white gap-2 hover:text-[#fcba28] transition-colors group">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Exit Interview
            </button>
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm hidden sm:block">{currentTime}</span>
              <div className="w-px h-6 bg-white/10 hidden sm:block" />
              <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300">
                <Settings className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: AI Avatar and Question Panel */}
          <div className="space-y-8">
            <AIAvatar
              isSpoken={isAISpeaking}
              currentQuestion={questions[currentQuestion]?.text}
            />
            {interviewMode === 'standard' && (
              <QuestionPanel
                currentQuestion={currentQuestion}
                onQuestionSelect={handleQuestionSelect}
                onCustomQuestionAdd={handleCustomQuestionAdd}
                questions={questions}
              />
            )}
          </div>

          {/* Right Column: Video Feed and Controls */}
          <div className="space-y-8">
            <VideoFeed isRecording={isRecording} onVideoFrame={handleVideoMetricsUpdate} />

            {/* Live Analysis Panel */}
            {isRecording && (
              <div className="grid grid-cols-3 gap-4">
                {/* Face Status */}
                <div className={`p-3 rounded-xl border backdrop-blur-sm transition-colors ${faceCount === 1
                  ? 'bg-emerald-500/10 border-emerald-500/20'
                  : 'bg-red-500/10 border-red-500/20 animate-pulse'
                  }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${faceCount === 1 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <span className={`text-sm font-medium ${faceCount === 1 ? 'text-emerald-500' : 'text-red-500'}`}>
                      Face Detection
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {faceCount === 0 ? 'No face detected' : faceCount > 1 ? 'Multiple faces' : 'Face detected'}
                  </p>
                </div>

                {/* Posture Status */}
                <div className={`p-3 rounded-xl border backdrop-blur-sm transition-colors ${posture === 'Good'
                  ? 'bg-emerald-500/10 border-emerald-500/20'
                  : !posture
                    ? 'bg-white/5 border-white/10'
                    : 'bg-blue-500/10 border-blue-500/20'
                  }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className={`w-4 h-4 ${posture === 'Good' ? 'text-emerald-500' : !posture ? 'text-white/40' : 'text-blue-500'}`} />
                    <span className={`text-sm font-medium ${posture === 'Good' ? 'text-emerald-500' : !posture ? 'text-white/40' : 'text-blue-500'}`}>
                      Posture
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {posture || 'No Detection'}
                  </p>
                </div>

                {/* Recording Status */}
                <div className="p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-[#fcba28]" />
                    <span className="text-sm font-medium text-[#fcba28]">Duration</span>
                  </div>
                  <p className="text-white/70 text-xs font-mono">
                    {formatTime(timeElapsed)}
                  </p>
                </div>
              </div>
            )}

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Volume2 className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  {isRecording && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-white">{formatTime(timeElapsed)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Error Message Display */}
            {recordingError && (
              <motion.div
                className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{recordingError}</p>
                  </div>
                  <button
                    onClick={() => setRecordingError(null)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors flex-shrink-0"
                    aria-label="Dismiss error"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Start/Stop Recording Button above Practice Notes */}
            <div className="flex justify-end items-center gap-4 mt-4">
              {interviewMode === 'standard' && (
                <button
                  onClick={() => setIsSetupModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all shadow-lg"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Personalized Interview
                </button>
              )}
              {interviewMode === 'personalized' && (
                <button
                  onClick={handleStopPersonalizedInterview}
                  className="flex items-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all shadow-lg"
                >
                  <X className="w-5 h-5" />
                  Stop AI Interview
                </button>
              )}
              <button
                onClick={handleToggleRecording}
                className={`px-6 py-4 rounded-xl ${isRecording ? 'bg-red-500/20 text-red-500' : 'bg-[#fcba28] text-black'
                  } font-medium flex items-center justify-center gap-2 shadow-lg`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
            </div>

            {/* Notepad - Only show in standard mode */}
            {interviewMode === 'standard' && (
              <div className="mt-4 p-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg min-h-[500px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-[#fcba28]" />
                    <h4 className="text-white font-medium">Practice Notes</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="bg-black/20 text-white border border-white/10 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-[#fcba28]/50"
                    >
                      <option value="small">Small</option>
                      <option value="normal">Normal</option>
                      <option value="large">Large</option>
                    </select>
                    <button
                      onClick={() => setShowWordCount(!showWordCount)}
                      className="px-3 py-1 bg-black/20 text-white/80 rounded-lg text-sm hover:bg-black/30 transition-colors"
                    >
                      {showWordCount ? 'Hide Count' : 'Show Count'}
                    </button>
                    <button
                      onClick={handleClearNotes}
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    value={notepadContent}
                    onChange={(e) => setNotepadContent(e.target.value)}
                    placeholder="Write your practice notes here... Jot down key points, structure your answers, and brainstorm ideas before you start recording. Use this space to organize your thoughts, draft responses, and track improvements for your interview preparation."
                    className={`w-full h-96 p-5 bg-black/20 border border-white/10 rounded-lg text-white placeholder-white/40 resize-none focus:outline-none focus:border-[#fcba28]/50 text-base lg:text-lg ${fontSize === 'small' ? 'text-sm' :
                      fontSize === 'large' ? 'text-xl' : 'text-base'
                      }`}
                  />
                  {showWordCount && (
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/40 rounded-md text-xs text-white/60">
                      {getWordCount(notepadContent)} words
                    </div>
                  )}
                </div>
                <div className="mt-3 flex justify-between items-center text-sm text-white/40">
                  <span>Tip: Use this space to prepare and refine your answers before recording. The more you write, the better you can organize your thoughts!</span>
                  <span>{notepadContent.length}/2000 characters</span>
                </div>
              </div>
            )}

            {/* Enhanced Real-time Tips
            <div className="mt-6 p-5 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/5 via-emerald-500/5 to-blue-500/5" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[#fcba28]/20">
                    <Lightbulb className="w-5 h-5 text-[#fcba28]" />
                  </div>
                  <h4 className="text-white font-medium">Real-time Improvement Tips</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      className="p-3 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#fcba28] to-emerald-500 mt-2" />
                        <p className="text-white/70 text-sm leading-relaxed">{tip}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Personalized Question Display */}
        {interviewMode === 'personalized' && (
          <PersonalizedQuestionDisplay
            question={questions[currentQuestion]}
            currentQuestionIndex={currentQuestion}
            totalQuestions={questions.length}
            goal={resumeData?.goal}
            onNextQuestion={handleNextQuestion}
            isGenerating={isGeneratingQuestion}
          />
        )}

        {/* AI Feedback Section */}
        <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/5 via-emerald-500/5 to-blue-500/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#fcba2810_0%,transparent_50%)]" />

          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#fcba28]/30 blur-xl animate-pulse" />
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#fcba28]/20 to-emerald-500/20 flex items-center justify-center border border-[#fcba28]/20 backdrop-blur-sm">
                    <MessageSquare className="w-7 h-7 text-[#fcba28]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold text-white">AI Interview Feedback</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#fcba28] animate-pulse" />
                      <span className="text-white/60 text-sm">Real-time analysis in progress...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overall Performance Score */}
              <div className="text-center">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#fcba28]/20 via-emerald-500/20 to-blue-500/20 animate-pulse blur-sm" />
                  <div className="absolute inset-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                    <div className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(from 0deg, #fcba28 ${Math.round(
                          (analysis.communicationScore + analysis.bodyLanguageScore + analysis.answerQualityScore) / 3
                        )}%, transparent 0)`
                      }} />
                    <div className="absolute inset-2 rounded-full bg-black/80 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-3xl font-bold bg-gradient-to-br from-[#fcba28] to-emerald-500 text-transparent bg-clip-text">
                          {Math.round((analysis.communicationScore + analysis.bodyLanguageScore + analysis.answerQualityScore) / 3)}
                        </span>
                        <span className="text-sm font-medium text-emerald-500">/100</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-white/80">Overall Performance</span>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Communication Skills */}
              <div className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm relative overflow-hidden group hover:bg-white/10 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/5 to-transparent" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-[#fcba28]/20">
                        <MessageSquare className="w-5 h-5 text-[#fcba28]" />
                      </div>
                      Communication Skills
                    </h4>
                    <div className="px-3 py-1.5 rounded-full bg-[#fcba28]/20 text-[#fcba28] text-sm font-medium">
                      {analysis.communicationScore}%
                    </div>
                  </div>

                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#fcba28] to-emerald-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${analysis.communicationScore}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                      <span className="text-white/60 text-sm">Speaking Pace</span>
                      <span className="text-sm font-medium text-[#fcba28]">
                        {analysis.speechMetrics.pace.toFixed(0)} WPM
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                      <span className="text-white/60 text-sm">Clarity</span>
                      <span className="text-sm font-medium text-emerald-400">
                        {analysis.speechMetrics.clarity.toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                      <span className="text-white/60 text-sm">Filler Words</span>
                      <span className="text-sm font-medium text-blue-400">
                        {analysis.speechMetrics.fillerWords}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body Language */}
              <div className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm relative overflow-hidden group hover:bg-white/10 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-emerald-500/20">
                        <Activity className="w-5 h-5 text-emerald-400" />
                      </div>
                      Body Language
                    </h4>
                    <div className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                      {analysis.bodyLanguageScore}%
                    </div>
                  </div>

                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${analysis.bodyLanguageScore}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                      <span className="text-white/60 text-sm">Engagement</span>
                      <span className="text-sm font-medium text-emerald-400">
                        {(analysis.emotionData.happy * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                      <span className="text-white/60 text-sm">Confidence</span>
                      <span className="text-sm font-medium text-emerald-400">
                        {analysis.speechMetrics.confidence.toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                      <span className="text-white/60 text-sm">Expression</span>
                      <span className={`text-sm font-medium ${analysis.emotionData.neutral > 0.5 ? 'text-blue-400' :
                        analysis.emotionData.happy > 0.3 ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                        {analysis.emotionData.neutral > 0.5 ? 'Neutral' :
                          analysis.emotionData.happy > 0.3 ? 'Positive' : 'Mixed'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Answer Quality */}
              <div className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm relative overflow-hidden group hover:bg-white/10 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                      </div>
                      Answer Quality
                    </h4>
                    <div className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                      {analysis.answerQualityScore}%
                    </div>
                  </div>

                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${analysis.answerQualityScore}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                      <span className="text-white/60 text-sm">Structure</span>
                      <span className={`text-sm font-medium ${analysis.answerQualityScore > 80 ? 'text-emerald-400' :
                        analysis.answerQualityScore > 60 ? 'text-blue-400' : 'text-amber-400'
                        }`}>
                        {analysis.answerQualityScore > 80 ? 'Excellent' :
                          analysis.answerQualityScore > 60 ? 'Good' : 'Needs Work'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                      <span className="text-white/60 text-sm">Examples</span>
                      <span className={`text-sm font-medium ${analysis.answerQualityScore > 70 ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                        {analysis.answerQualityScore > 70 ? 'Specific' : 'Generic'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                      <span className="text-white/60 text-sm">Relevance</span>
                      <span className={`text-sm font-medium ${analysis.answerQualityScore > 75 ? 'text-emerald-400' : 'text-blue-400'
                        }`}>
                        {analysis.answerQualityScore > 75 ? 'High' : 'Moderate'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Real-time Tips */}
            <div className="mt-6 p-5 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/5 via-emerald-500/5 to-blue-500/5" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[#fcba28]/20">
                    <Lightbulb className="w-5 h-5 text-[#fcba28]" />
                  </div>
                  <h4 className="text-white font-medium">Real-time Improvement Tips</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      className="p-3 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#fcba28] to-emerald-500 mt-2" />
                        <p className="text-white/70 text-sm leading-relaxed">{tip}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Live Transcript & Insights Section */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Transcript */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header with Stats */}
            <div className="p-6 bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-500/10 border border-emerald-500/20 rounded-xl backdrop-blur-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#10b98120_0%,transparent_50%)]" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl animate-pulse" />
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center border-2 border-emerald-500/30 backdrop-blur-sm">
                      <MessageSquare className="w-8 h-8 text-emerald-400" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white">Live Transcript & Insights</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm text-white/70">Real-time Analysis</span>
                      </div>
                      <div className="h-4 w-[1px] bg-white/20" />
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-white/50" />
                        <span className="text-sm text-white/70">{currentTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Word Count */}
                  <div className="px-4 py-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400">
                        {getWordCount(transcript.final)}
                      </div>
                      <div className="text-xs text-white/60 mt-1">words</div>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(transcript.final);
                    }}
                    className="p-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all group"
                    title="Copy transcript"
                  >
                    <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Transcript Display */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg min-h-[400px] max-h-[600px] overflow-y-auto relative">
              {transcript.final.trim().length > 0 ? (
                <div className="space-y-4">
                  <div className="p-5 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-lg border border-emerald-500/20 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 animate-pulse" />
                      <div className="flex-1">
                        <p className="text-lg text-white leading-relaxed">
                          {transcript.final}
                          {transcript.interim && (
                            <span className="text-white/40 italic ml-1">
                              {transcript.interim}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Mic className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-white/40 mb-2">Start Speaking</h4>
                    <p className="text-sm text-white/30">Your transcript will appear here in real-time</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Real-time Metrics */}
          <div className="space-y-6">
            {/* Overall Score Card */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-white">Live Score</h4>
                <div className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/60">Real-time</div>
              </div>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-24 h-24 mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-violet-500/20 animate-pulse" />
                  <div className="absolute inset-1 rounded-full bg-black/50 flex items-center justify-center border border-white/10">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-white">
                        {Math.round(
                          analysis.communicationScore * 0.4 +
                          analysis.speechMetrics.clarity * 0.3 +
                          Math.min(100, (analysis.speechMetrics.pace / 150) * 100) * 0.3
                        )}
                      </span>
                      <span className="text-xs font-medium text-emerald-500 block">/100</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] w-full">
                  <span className="text-emerald-400">Comm 40%</span>
                  <span className="text-white/20">·</span>
                  <span className="text-blue-400">Clarity 30%</span>
                  <span className="text-white/20">·</span>
                  <span className="text-violet-400">Pace 30%</span>
                </div>
              </div>
            </div>

            {/* Communication Score */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-blue-400" />
                  <h4 className="font-medium text-white/80">Communication</h4>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                  {analysis.communicationScore}%
                </div>
              </div>
              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${analysis.communicationScore}%` }}
                />
              </div>
            </div>

            {/* Speaking Rhythm & Clarity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-white/60">Pace</span>
                </div>
                <div className="text-xl font-bold text-white mb-1">
                  {analysis.speechMetrics.pace.toFixed(0)} <span className="text-xs font-normal text-white/40">WPM</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                    style={{ width: `${(analysis.speechMetrics.pace / 150) * 100}%` }}
                  />
                </div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-white/60">Clarity</span>
                </div>
                <div className="text-xl font-bold text-white mb-1">
                  {analysis.speechMetrics.clarity.toFixed(0)}%
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-400 rounded-full transition-all duration-300"
                    style={{ width: `${analysis.speechMetrics.clarity}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Tips Removed as per user request */}

          </div>
        </div>

        {/* Gemini Deep Analysis Section - Always visible with different states */}
        <div ref={analysisRef} className="mt-8 p-6 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-emerald-500/10 border border-purple-500/20 rounded-xl backdrop-blur-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#a855f720_0%,transparent_50%)]" />

          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/20">
                <MessageSquare className="w-7 h-7 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">AI Answer Analysis</h3>
                <p className="text-white/60 text-sm">Professional interview coaching insights powered by Gemini AI</p>
              </div>
            </div>

            {/* Loading State */}
            {isLoadingGemini && (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
                  <p className="text-white/60 text-lg">Analyzing your response with AI...</p>
                  <p className="text-white/40 text-sm">This may take a few seconds</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {!isLoadingGemini && analysisError && (
              <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <h4 className="text-lg font-medium text-red-400">Analysis Error</h4>
                </div>
                <p className="text-white/70 mb-4">{analysisError}</p>
                <button
                  onClick={() => {
                    setAnalysisError(null);
                    if (transcript.final.trim().length > 0) {
                      handleToggleRecording();
                    }
                  }}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Success State - Analysis Results */}
            {!isLoadingGemini && !analysisError && geminiAnalysis && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                  <h4 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-purple-400" />
                    Analysis & Feedback
                  </h4>
                  <p className="text-white/70 leading-relaxed">{geminiAnalysis.analysis}</p>

                  {geminiAnalysis.keyImprovements && geminiAnalysis.keyImprovements.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-white/80">Key Improvements:</p>
                      {geminiAnalysis.keyImprovements.map((improvement: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-white/60">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>{improvement}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                  <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    Detailed Scores
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm">Overall Score</span>
                        <span className="text-lg font-bold text-purple-400">{geminiAnalysis.score}/100</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000"
                          style={{ width: `${geminiAnalysis.score}%` }}
                        />
                      </div>
                    </div>

                    {geminiAnalysis.communicationScore !== undefined && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/70 text-sm">Communication</span>
                          <span className="text-sm font-medium text-blue-400">{geminiAnalysis.communicationScore}/100</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-400" style={{ width: `${geminiAnalysis.communicationScore}%` }} />
                        </div>
                      </div>
                    )}

                    {geminiAnalysis.clarity !== undefined && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/70 text-sm">Clarity</span>
                          <span className="text-sm font-medium text-emerald-400">{geminiAnalysis.clarity}/100</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400" style={{ width: `${geminiAnalysis.clarity}%` }} />
                        </div>
                      </div>
                    )}

                    {geminiAnalysis.confidence !== undefined && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/70 text-sm">Confidence</span>
                          <span className="text-sm font-medium text-yellow-400">{geminiAnalysis.confidence}/100</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400" style={{ width: `${geminiAnalysis.confidence}%` }} />
                        </div>
                      </div>
                    )}

                    {geminiAnalysis.bodyLanguageScore !== undefined && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/70 text-sm">Body Language</span>
                          <span className="text-sm font-medium text-purple-400">{geminiAnalysis.bodyLanguageScore}/100</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-400" style={{ width: `${geminiAnalysis.bodyLanguageScore}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {geminiAnalysis.improvedAnswer && (
                  <div className="md:col-span-2 p-5 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl backdrop-blur-sm">
                    <h4 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5 text-emerald-400" />
                      Improved Version of Your Answer
                    </h4>
                    <p className="text-white/80 leading-relaxed italic">{geminiAnalysis.improvedAnswer}</p>
                  </div>
                )}

                {geminiAnalysis.modelAnswer && (
                  <div className="md:col-span-2 p-5 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl backdrop-blur-sm">
                    <h4 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                      Model Answer (Best Practice)
                    </h4>
                    <p className="text-white/80 leading-relaxed">{geminiAnalysis.modelAnswer}</p>
                  </div>
                )}
              </div>
            )}

            {/* Empty/Waiting State */}
            {!isLoadingGemini && !analysisError && !geminiAnalysis && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-purple-400" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-3">Ready for AI Analysis</h4>
                  <p className="text-white/60 mb-2">Record your answer and stop the recording to receive:</p>
                  <ul className="text-left text-white/50 text-sm space-y-2 mt-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Detailed feedback on your answer quality
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Communication and clarity scores
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Body language analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Improved version of your answer
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Model answer examples
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm text-blue-400 flex items-center gap-2 justify-center">
                      <Lightbulb className="w-4 h-4" />
                      Tip: Speak for at least 5-10 seconds for best analysis results
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Past Recordings */}
        {recordings.length > 0 && (
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">Past Recordings</h3>
              </div>
            </div>

            <RecordingsList
              recordings={recordings}
              questions={questions}
              onDelete={handleDeleteRecording}
              onPlay={(recording) => handlePlayRecording(recording.id)}
            />
          </div>
        )}
      </main>
    </div>
  );
}
