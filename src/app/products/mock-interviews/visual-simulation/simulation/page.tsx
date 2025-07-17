'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AIAvatar } from './components/AIAvatar';
import VideoFeed from './components/VideoFeed';
import QuestionPanel from './components/QuestionPanel';
import VideoPreview from './components/VideoPreview';
import RecordingsList from './components/RecordingsList';
import { Question, interviewQuestions } from './data/questions';
import { MessageSquare, BarChart, Download, Share2, ThumbsUp, Volume2, Mic, Camera, Settings, ChevronLeft, X, Clock, Activity, MessageCircle, Lightbulb } from 'lucide-react';
import { recordingService } from './services/recordingService';
import { aiAnalysisService } from './services/aiAnalysisService';
import { enhancedAnalysisService } from './services/enhancedAnalysisService';
import { CheckCircle } from 'lucide-react';
import { AnswerAnalysis } from './components/analysis';

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
    tips: ['Start speaking to see real-time feedback'],
    answerQuality: {
      feedback: '',
    }
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

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleClearNotes = () => {
    if (window.confirm('Are you sure you want to clear all notes?')) {
      setNotepadContent('');
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

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
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            
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
            enhancedAnalysisService.analyzeResponse(
              finalTranscript,
              questions[currentQuestion]?.text || ''
            ).then(setAnalysis);
          }
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
        };

        recognitionInstance.onend = () => {
          console.log('Speech recognition ended');
          if (isRecording) {
            recognitionInstance.start();
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

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  const handleVideoMetricsUpdate = async (videoElement: HTMLVideoElement) => {
    if (isRecording) {
      const faceAnalysis = await enhancedAnalysisService.analyzeFace(videoElement);
      if (faceAnalysis.expressions) {
        // Update will happen through speech analysis
        // as it combines both speech and face metrics
      }
    }
  };

  const handleToggleRecording = async () => {
    try {
      if (!isRecording) {
        // Start recording
        await recordingService.startRecording();
        setIsRecording(true);
        setIsAISpeaking(true);
        
        // Clear transcript
        setTranscript({
          final: '',
          interim: '',
          segments: []
        });

        // Start speech recognition
        if (recognition) {
          recognition.start();
        }

        enhancedAnalysisService.clearHistory();
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
      }
    } catch (error) {
      console.error('Recording error:', error);
      setIsRecording(false);
      if (recognition) {
        recognition.stop();
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

  const handleNextQuestion = () => {
    const nextIndex = (currentQuestion + 1) % questions.length;
    setCurrentQuestion(nextIndex);
    setIsAISpeaking(true);
    setTimeout(() => setIsAISpeaking(false), 3000);
  };

  const handleDownloadRecording = (id: string) => {
    const recording = recordings.find(r => r.id === id);
    if (recording?.blob) {
      const filename = `interview-${recording.timestamp.toISOString()}.webm`;
      recordingService.downloadRecording(recording.blob, filename);
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
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-white gap-2 hover:text-[#fcba28] transition-colors">
              <ChevronLeft className="w-5 h-5" />
              Exit Interview
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: AI Avatar and Question Panel */}
          <div className="space-y-8">
            <AIAvatar
              isSpoken={isAISpeaking}
              currentQuestion={questions[currentQuestion]?.text}
            />
            <QuestionPanel
              currentQuestion={currentQuestion}
              onQuestionSelect={handleQuestionSelect}
              onCustomQuestionAdd={handleCustomQuestionAdd}
              questions={questions}
            />
          </div>

          {/* Right Column: Video Feed and Controls */}
          <div className="space-y-8">
            <VideoFeed isRecording={isRecording} />
            
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

            {/* Start/Stop Recording Button above Practice Notes */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleToggleRecording}
                className={`p-4 rounded-xl ${
                  isRecording ? 'bg-red-500/20 text-red-500' : 'bg-[#fcba28] text-black'
                } font-medium flex items-center justify-center gap-2`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
            </div>

            {/* Notepad */}
            <div className="mt-4 p-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg col-span-full min-h-[500px] max-w-3xl mx-auto">
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
                  className={`w-full h-96 p-5 bg-black/20 border border-white/10 rounded-lg text-white placeholder-white/40 resize-none focus:outline-none focus:border-[#fcba28]/50 text-base lg:text-lg ${
                    fontSize === 'small' ? 'text-sm' : 
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
              <span className={`text-sm font-medium ${
                analysis.emotionData.neutral > 0.5 ? 'text-blue-400' :
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
              <span className={`text-sm font-medium ${
                analysis.answerQualityScore > 80 ? 'text-emerald-400' :
                analysis.answerQualityScore > 60 ? 'text-blue-400' : 'text-amber-400'
              }`}>
                {analysis.answerQualityScore > 80 ? 'Excellent' :
                 analysis.answerQualityScore > 60 ? 'Good' : 'Needs Work'}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
              <span className="text-white/60 text-sm">Examples</span>
              <span className={`text-sm font-medium ${
                analysis.answerQualityScore > 70 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {analysis.answerQualityScore > 70 ? 'Specific' : 'Generic'}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
              <span className="text-white/60 text-sm">Relevance</span>
              <span className={`text-sm font-medium ${
                analysis.answerQualityScore > 75 ? 'text-emerald-400' : 'text-blue-400'
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

        {/* Live Transcript Section */}
        <div className="mt-6 grid grid-cols-1 gap-6">
          {/* Header Section */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-emerald-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold text-white">Live Transcript</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm text-white/60">Live Analysis</span>
                    </div>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white/40" />
                      <span className="text-sm text-white/60">{new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-violet-500/20 animate-pulse" />
                    <div className="absolute inset-1 rounded-full bg-black/50 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-2xl font-bold text-white">
                          {Math.round(
                            analysis.communicationScore * 0.4 +
                            analysis.speechMetrics.clarity * 0.3 +
                            Math.min(100, (analysis.speechMetrics.pace / 150) * 100) * 0.3
                          )}
                        </span>
                        <span className="text-sm font-medium text-emerald-500">/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-0.5">
                    <span className="text-sm font-medium text-white/80 block">Overall Score</span>
                    <div className="flex items-center justify-center gap-1 text-[10px]">
                      <span className="text-emerald-400">Comm 40%</span>
                      <span className="text-white/20">·</span>
                      <span className="text-blue-400">Clarity 30%</span>
                      <span className="text-white/20">·</span>
                      <span className="text-violet-400">Pace 30%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Current Speech */}
            <div className="lg:col-span-2">
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Mic className="w-5 h-5 text-emerald-500" />
                    <h4 className="text-sm font-medium text-white/80">Current Speech</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-white/60">Real-time</span>
                  </div>
                </div>
                <div className="min-h-[120px] p-6 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-lg text-white/90 leading-relaxed">
                    {transcript.final}
                    <span className="text-white/50 italic">
                      {transcript.interim}
                    </span>
                  </p>
                </div>
                
                {/* Quick Analysis Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {analysis.tips.slice(0, 3).map((tip, i) => (
                    <div 
                      key={`tip-${i}`}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Analysis Metrics */}
            <div className="space-y-4">
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
                <p className="text-sm text-white/60">{analysis.tips[0]}</p>
              </div>

              {/* Speaking Rhythm */}
              <div className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-medium text-white/80">Speaking Pace</h4>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                    {analysis.speechMetrics.pace.toFixed(0)} WPM
                  </div>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${(analysis.speechMetrics.pace / 150) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Slow</span>
                  <span>Optimal (120-150 WPM)</span>
                  <span>Fast</span>
                </div>
              </div>

              {/* Speaking Tips */}
              <div className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <h4 className="font-medium text-white/80">Quick Tips</h4>
                </div>
                <ul className="space-y-3">
                  {analysis.tips.slice(0, 3).map((tip, i) => (
                    <li key={`full-tip-${i}`} className="flex items-center gap-3 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Analysis with AI */}
<div className="mt-8">
  <div className="p-6 bg-gradient-to-br from-white/5 via-violet-500/5 to-blue-500/5 border border-white/10 rounded-xl backdrop-blur-lg relative overflow-hidden">
    {/* Background Effects */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#8b5cf610_0%,transparent_50%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    
    {/* Content */}
    <div className="relative">
      <AnswerAnalysis
        isRecording={isRecording}
        currentQuestion={questions[currentQuestion]?.text || ''}
        transcript={{
          final: transcript.final,
          interim: transcript.interim
        }}
      />
    </div>
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
              onPlay={(recording) => {
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
              }}
            />
          </div>
        )}

        {/* Video Preview Section */}
        <div className="mt-8">
          <VideoPreview
            recordings={recordings}
            onPlay={handlePlayRecording}
            onDelete={(id) => {
              const recording = recordings.find(r => r.id === id);
              if (recording) {
                URL.revokeObjectURL(recording.url);
              }
              setRecordings(prev => prev.filter(r => r.id !== id));
            }}
            onDownload={handleDownloadRecording}
            onShare={(id) => {
              const recording = recordings.find(r => r.id === id);
              if (recording && navigator.share) {
                navigator.share({
                  title: 'Interview Recording',
                  text: `Interview recording from ${recording.timestamp.toLocaleString()}`,
                  url: recording.url
                }).catch(console.error);
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}
