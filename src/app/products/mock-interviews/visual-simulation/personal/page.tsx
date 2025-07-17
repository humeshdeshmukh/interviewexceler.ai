'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Upload, Play, Mic, MicOff, Send, Undo, Volume2, VolumeX } from 'lucide-react';
import { parseResume, generateInterviewQuestions, generateFeedback, generateFollowUpResponse } from './services/interview';
import type { ResumeData, InterviewQuestion, InterviewSession } from './services/interview';
import { extractTextFromFile, cleanResumeText } from './utils/fileParser';
import { getPreferredVoice, configureSpeech, initializeSpeechSynthesis } from './utils/speechUtils';

export default function PersonalInterviewPage() {
  const [step, setStep] = useState<'upload' | 'configure' | 'interview'>('upload');
  const [resumeText, setResumeText] = useState('');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isStartingInterview, setIsStartingInterview] = useState(false);

  const [showPreparationTips, setShowPreparationTips] = useState(false);
  const [skillAnalysis, setSkillAnalysis] = useState<Record<string, number>>({});

  const [showFeedbackSummary, setShowFeedbackSummary] = useState(false);

  const [interviewMetrics, setInterviewMetrics] = useState({
    clarity: 0,
    relevance: 0,
    confidence: 0,
    timeRemaining: 30,
    wordsPerMinute: 0,
    lastResponseLength: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);
  const [voiceMode, setVoiceMode] = useState(false);


  const [hasSpokenQuestion, setHasSpokenQuestion] = useState(false);
  

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError('');

    try {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size too large. Please upload a file smaller than 10MB.');
      }

      // Check file type
      const validTypes = [
        'text/plain',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload a .txt, .pdf, .doc, or .docx file.');
      }

      console.log('Extracting text from file...');
      const extractedText = await extractTextFromFile(file);
      
      if (!extractedText.trim()) {
        throw new Error('The uploaded file appears to be empty. Please check the file and try again.');
      }

      // Clean and normalize the extracted text
      const cleanedText = cleanResumeText(extractedText);

      console.log('Parsing resume...');
      const data = await parseResume(cleanedText);
      console.log('Resume parsed successfully');
      
      setResumeText(cleanedText);
      setResumeData(data);
      setStep('configure');
    } catch (err) {
      console.error('File upload error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const startInterview = async () => {
    if (!resumeData) {
      setError('Resume data is missing. Please upload your resume again.');
      return;
    }

    setIsStartingInterview(true);
    setIsProcessing(true);
    setError('');

    try {
      console.log('Starting interview with resume data:', resumeData);
      
      // Show loading state for at least 1.5 seconds for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let questions;
      try {
        questions = await generateInterviewQuestions(resumeData, targetRole);
      } catch (apiError) {
        console.error('API Error:', apiError);
        // Use mock questions if API fails
        questions = [
          {
            id: 'q1',
            type: 'introduction',
            question: 'Please introduce yourself and tell me about your background.',
            context: 'Opening question to understand candidate background',
            expectedPoints: ['Current role', 'Experience', 'Skills'],
            followUps: []
          },
          {
            id: 'q2',
            type: 'experience',
            question: `Tell me about your experience as ${resumeData.currentRole}.`,
            context: 'Understanding current role',
            expectedPoints: ['Responsibilities', 'Achievements'],
            followUps: []
          },
          {
            id: 'q3',
            type: 'technical',
            question: 'What are your key technical skills and how have you applied them?',
            context: 'Technical expertise assessment',
            expectedPoints: ['Technical skills', 'Project examples'],
            followUps: []
          },
          {
            id: 'q4',
            type: 'behavioral',
            question: 'Tell me about a challenging project you worked on.',
            context: 'Problem-solving assessment',
            expectedPoints: ['Challenge description', 'Solution', 'Outcome'],
            followUps: []
          },
          {
            id: 'q5',
            type: 'closing',
            question: 'Do you have any questions for me?',
            context: 'Closing discussion',
            expectedPoints: ['Thoughtful questions', 'Company interest'],
            followUps: []
          }
        ];
      }

      console.log('Generated questions:', questions);

      if (!questions || questions.length === 0) {
        throw new Error('No questions were generated. Please try again.');
      }

      const newSession: InterviewSession = {
        id: Math.random().toString(36).substr(2, 9),
        candidateName: resumeData.fullName,
        currentRole: resumeData.currentRole,
        targetRole: targetRole || undefined,
        questions,
        currentQuestionIndex: 0,
        feedback: []
      };

      console.log('Created new session:', newSession);
      setSession(newSession);
      
      // Set initial AI response with introduction and first question
      const introQuestion = questions[0].question;
      const introduction = `Hello ${resumeData.fullName}! I'm your AI interviewer. Let's begin with your introduction.\n\n${introQuestion}`;
      setAiResponse(introduction);
      
      console.log('Interview started successfully');
      setStep('interview');
      
      // Reset metrics at the start of interview
      setInterviewMetrics({
        clarity: 0,
        relevance: 0,
        confidence: 0,
        timeRemaining: 30,
        wordsPerMinute: 0,
        lastResponseLength: 0
      });
    } catch (err) {
      console.error('Error starting interview:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to start interview. Please try again.');
      }
    } finally {
      setIsStartingInterview(false);
      setIsProcessing(false);
    }
  };

  const startRecording = async () => {
    try {
      if (!recognitionRef.current) {
        throw new Error('Speech recognition is not supported in your browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current.start();
      setIsRecording(true);
      setVoiceMode(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Failed to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleResponse = async (response: string) => {
    if (!session || !response.trim()) return;

    const currentQuestion = session.questions[session.currentQuestionIndex];
    setIsThinking(true);
    setError('');

    try {
      // Calculate relevance based on keyword matching with expected points
      const keywords = currentQuestion.expectedPoints?.join(' ').toLowerCase().split(/\s+/) || [];
      const responseWords = response.toLowerCase().split(/\s+/);
      const matchedKeywords = keywords.filter(keyword => 
        responseWords.some(word => word.includes(keyword) || keyword.includes(word))
      );
      const relevanceScore = keywords.length > 0 
        ? Math.round((matchedKeywords.length / keywords.length) * 100)
        : 70;

      setInterviewMetrics(prev => ({
        ...prev,
        relevance: relevanceScore
      }));

      let feedback;
      try {
        feedback = await generateFeedback(currentQuestion, response);
      } catch (apiError) {
        console.error('API Error during feedback:', apiError);
        feedback = {
          strengths: [
            'Good structured response',
            'Provided specific examples',
            'Clear communication'
          ],
          improvements: [
            'Could provide more technical details',
            'Consider adding metrics or results'
          ],
          rating: Math.round((interviewMetrics.clarity + interviewMetrics.relevance + interviewMetrics.confidence) / 3)
        };
      }

      let followUp;
      try {
        followUp = await generateFollowUpResponse(currentQuestion, response, response);
      } catch (apiError) {
        console.error('API Error during follow-up:', apiError);
        followUp = {
          response: "Thank you for your detailed response. That gives me a good understanding of your experience.",
          nextQuestion: session.questions[session.currentQuestionIndex + 1]?.question
        };
      }

      // Update session with feedback
      setSession(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          feedback: [...prev.feedback, {
            questionId: currentQuestion.id,
            ...feedback
          }]
        };
      });

      // Construct AI's response
      let aiResponseText = '';
      
      if (currentQuestion.type !== 'introduction') {
        if (feedback.strengths.length > 0) {
          aiResponseText += 'Strengths:\n• ' + feedback.strengths.join('\n• ') + '\n\n';
        }
        if (feedback.improvements.length > 0) {
          aiResponseText += 'Areas to improve:\n• ' + feedback.improvements.join('\n• ') + '\n\n';
        }
      }

      aiResponseText += followUp.response;
      setAiResponse(aiResponseText);

      // Move to next question if provided
      if (followUp.nextQuestion) {
        setTimeout(() => {
          setSession(prev => {
            if (!prev) return prev;
            const nextIndex = prev.currentQuestionIndex + 1;
            if (nextIndex < prev.questions.length) {
              setAiResponse(prev => `${prev}\n\n${followUp.nextQuestion}`);
              resetTimer(); // Reset timer for new question
              return {
                ...prev,
                currentQuestionIndex: nextIndex
              };
            }
            return prev;
          });
        }, 2000);
      }

      setTranscript('');
    } catch (err) {
      console.error('Error processing response:', err);
      setAiResponse("I understand. Let's continue with our discussion.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcript.trim() || isThinking) return;
    
    const response = transcript.trim();
    setTranscript('');
    await handleResponse(response);
  };

  const resetTimer = useCallback(() => {
    setInterviewMetrics(prev => ({
      ...prev,
      timeRemaining: 30,
      wordsPerMinute: 0,
      lastResponseLength: 0
    }));
  }, []);

  // const speakText = useCallback((text: string) => {
  //   if (!speechSynthesisRef.current) return;

  //   // Cancel any ongoing speech
  //   speechSynthesisRef.current.cancel();

  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.rate = 1;
  //   utterance.pitch = 1;
  //   utterance.volume = 1;

  //   // Use a more natural voice if available
  //   const voices = speechSynthesisRef.current.getVoices();
  //   const preferredVoice = voices.find(voice => 
  //     voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Female')
  //   );
  //   if (preferredVoice) {
  //     utterance.voice = preferredVoice;
  //   }

  //   utterance.onstart = () => setIsSpeaking(true);
  //   utterance.onend = () => setIsSpeaking(false);
  //   utterance.onerror = (event) => {
  //     console.error('Speech synthesis error:', event);
  //     setIsSpeaking(false);
  //   };

  //   speechSynthesisRef.current.speak(utterance);
  // }, []);


  const speakText = useCallback((text: string) => {
    if (!speechSynthesisRef.current) return;
  
    // Cancel any ongoing speech
    speechSynthesisRef.current.cancel();
  
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure for Indian English
    configureSpeech(utterance);
    
    // Get preferred voice
    const voices = speechSynthesisRef.current.getVoices();
    const preferredVoice = getPreferredVoice(voices);
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
  
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setHasSpokenQuestion(true);
    };
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };
  
    speechSynthesisRef.current.speak(utterance);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesisRef.current = window.speechSynthesis;
      
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map(result => result.transcript)
            .join('');
          
          setTranscript(transcript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          if (event.error === 'not-allowed') {
            setError('Please enable microphone access to use voice mode.');
          }
        };
      }
    }

    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // useEffect(() => {
  //   if (voiceMode && aiResponse && !isSpeaking) {
  //     // Remove markdown and special characters for better speech
  //     const cleanText = aiResponse
  //       .replace(/[*_`#]/g, '')
  //       .replace(/\n+/g, ' ')
  //       .trim();
      
  //     speakText(cleanText);
  //   }
  // }, [aiResponse, voiceMode, isSpeaking, speakText]);

  useEffect(() => {
    const initSpeech = async () => {
      if (typeof window !== 'undefined') {
        const initialized = await initializeSpeechSynthesis();
        if (initialized) {
          speechSynthesisRef.current = window.speechSynthesis;
        }
      }
    };
    initSpeech();
  }, []);

  useEffect(() => {
    if (step === 'interview' && session) {
      const timer = setInterval(() => {
        setInterviewMetrics(prev => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 1)
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, session]);

  useEffect(() => {
    if (transcript) {
      const words = transcript.trim().split(/\s+/).length;
      const timeSpent = 30 - interviewMetrics.timeRemaining;
      const wpm = timeSpent > 0 ? Math.round((words / timeSpent) * 60) : 0;

      setInterviewMetrics(prev => ({
        ...prev,
        wordsPerMinute: wpm,
        lastResponseLength: words,
        clarity: Math.min(100, Math.max(0, wpm > 150 ? 70 : wpm > 100 ? 90 : wpm > 50 ? 80 : 60)),
        confidence: Math.min(100, Math.max(0, words > 100 ? 85 : words > 50 ? 75 : 60))
      }));
    }
  }, [transcript, interviewMetrics.timeRemaining]);

  useEffect(() => {
    if (!session || !transcript.trim()) return;

    const currentQuestion = session.questions[session.currentQuestionIndex];
    const keywords = currentQuestion.expectedPoints?.join(' ').toLowerCase().split(/\s+/) || [];
    const responseWords = transcript.toLowerCase().split(/\s+/);
    const matchedKeywords = keywords.filter(keyword => 
      responseWords.some(word => word.includes(keyword) || keyword.includes(word))
    );
    const relevanceScore = keywords.length > 0 
      ? Math.round((matchedKeywords.length / keywords.length) * 100)
      : 70;

    setInterviewMetrics(prev => ({
      ...prev,
      relevance: relevanceScore
    }));
  }, [session, transcript]);

  const InterviewSummary = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div className="bg-black/90 border border-[#fcba28]/20 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#fcba28]">Interview Performance Summary</h2>
            <button
              onClick={() => setShowFeedbackSummary(false)}
              className="text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="space-y-6">
            {/* Overall Score */}
            <div className="p-4 rounded-lg bg-black/40 border border-[#fcba28]/20">
              <h3 className="text-white font-medium mb-4">Overall Performance</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl font-bold text-[#fcba28]">85%</div>
                <div className="text-gray-400">Excellent Performance</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Technical Skills</div>
                  <div className="text-lg font-semibold text-white">90%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Communication</div>
                  <div className="text-lg font-semibold text-white">85%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Problem Solving</div>
                  <div className="text-lg font-semibold text-white">80%</div>
                </div>
              </div>
            </div>

            {/* Question Analysis */}
            <div className="p-4 rounded-lg bg-black/40 border border-[#fcba28]/20">
              <h3 className="text-white font-medium mb-4">Question-by-Question Analysis</h3>
              <div className="space-y-4">
                {session?.questions.map((q, index) => (
                  <div key={index} className="border-b border-gray-800 pb-4 last:border-0">
                    <div className="flex justify-between mb-2">
                      <div className="text-white font-medium">Question {index + 1}</div>
                      <div className="text-[#fcba28]">
                        {session.feedback[index]?.score || 0}%
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{q.question}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-400 text-sm">
                          {session.feedback[index]?.strengths[0]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">!</span>
                        <span className="text-gray-400 text-sm">
                          {session.feedback[index]?.improvements[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Areas */}
            <div className="p-4 rounded-lg bg-black/40 border border-[#fcba28]/20">
              <h3 className="text-white font-medium mb-4">Areas for Improvement</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[#fcba28] mb-2">Technical Skills</h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Deep dive into system design patterns</li>
                    <li>Practice more algorithmic problems</li>
                    <li>Strengthen database optimization knowledge</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#fcba28] mb-2">Soft Skills</h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Work on concise communication</li>
                    <li>Improve STAR format responses</li>
                    <li>Practice active listening</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="p-4 rounded-lg bg-black/40 border border-[#fcba28]/20">
              <h3 className="text-white font-medium mb-4">Recommended Next Steps</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#fcba28]/20 flex items-center justify-center text-[#fcba28]">1</div>
                  <div>
                    <h4 className="text-white font-medium">Practice Technical Questions</h4>
                    <p className="text-gray-400 text-sm">Focus on system design and algorithms</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#fcba28]/20 flex items-center justify-center text-[#fcba28]">2</div>
                  <div>
                    <h4 className="text-white font-medium">Mock Interviews</h4>
                    <p className="text-gray-400 text-sm">Schedule 2-3 more practice sessions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#fcba28]/20 flex items-center justify-center text-[#fcba28]">3</div>
                  <div>
                    <h4 className="text-white font-medium">Review Materials</h4>
                    <p className="text-gray-400 text-sm">Study the provided resources and documentation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const InterviewStats = () => (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20">
        <div className="text-sm text-gray-400">Question</div>
        <div className="text-xl text-white font-bold">
          {session ? `${session.currentQuestionIndex + 1}/${session.questions.length}` : '-'}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {session?.questions[session.currentQuestionIndex]?.type || ''}
        </div>
      </div>
      <div className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20">
        <div className="text-sm text-gray-400">Time</div>
        <div className="text-xl text-white font-bold">
          {interviewMetrics.timeRemaining}s
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {interviewMetrics.wordsPerMinute} words/min
        </div>
      </div>
      <div className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20">
        <div className="text-sm text-gray-400">Performance</div>
        <div className="text-xl text-white font-bold">
          {session?.feedback.length > 0 
            ? `${Math.round(session.feedback.reduce((acc, f) => acc + f.rating, 0) / session.feedback.length)}%`
            : '-'}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {session?.feedback.length || 0} responses
        </div>
      </div>
    </div>
  );

  const RealTimeFeedback = () => (
    <div className="fixed bottom-4 right-4 w-64">
      <div className="p-4 rounded-lg bg-black/90 border border-[#fcba28]/20 backdrop-blur-sm">
        <h3 className="text-[#fcba28] font-medium mb-2">Real-time Feedback</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">Clarity</span>
              <span className="text-sm text-white">{interviewMetrics.clarity}%</span>
            </div>
            <div className="w-full h-2 bg-black/20 rounded-full">
              <div 
                className="h-full bg-[#fcba28] rounded-full transition-all duration-300" 
                style={{ width: `${interviewMetrics.clarity}%` }} 
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">Relevance</span>
              <span className="text-sm text-white">{interviewMetrics.relevance}%</span>
            </div>
            <div className="w-full h-2 bg-black/20 rounded-full">
              <div 
                className="h-full bg-[#fcba28] rounded-full transition-all duration-300" 
                style={{ width: `${interviewMetrics.relevance}%` }} 
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">Confidence</span>
              <span className="text-sm text-white">{interviewMetrics.confidence}%</span>
            </div>
            <div className="w-full h-2 bg-black/20 rounded-full">
              <div 
                className="h-full bg-[#fcba28] rounded-full transition-all duration-300" 
                style={{ width: `${interviewMetrics.confidence}%` }} 
              />
            </div>
          </div>

          {transcript && (
            <div className="mt-4 pt-3 border-t border-gray-800">
              <div className="text-xs text-gray-400">Response Length</div>
              <div className="text-sm text-white">{interviewMetrics.lastResponseLength} words</div>
              <div className="text-xs text-gray-400 mt-1">Speaking Rate</div>
              <div className="text-sm text-white">{interviewMetrics.wordsPerMinute} words/min</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const VoiceModeToggle = () => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setVoiceMode(!voiceMode)}
      className={`p-2 rounded-lg ${voiceMode ? 'bg-[#fcba28]' : 'bg-gray-700'}`}
      title={voiceMode ? 'Disable voice mode' : 'Enable voice mode'}
    >
      {voiceMode ? (
        <div className="flex items-center gap-2">
          <div className="relative">
            <Volume2 className="w-6 h-6" />
            {isSpeaking && (
              <div className="absolute -right-1 -top-1 w-3 h-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fcba28] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fcba28]"></span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <VolumeX className="w-6 h-6" />
      )}
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/products/mock-interviews/visual-simulation" className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Main
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-[#fcba28] mb-4">Personalized AI Interview</h1>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Upload your resume and let our AI create a personalized interview experience based on your background and experience.
                  </p>
                </div>

                <div className="p-8 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".txt,.pdf,.doc,.docx"
                    className="hidden"
                  />
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessing}
                      className="inline-flex items-center px-6 py-3 bg-[#fcba28] text-black rounded-lg font-medium disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 mr-2" />
                          Upload Resume
                        </>
                      )}
                    </motion.button>
                    <p className="mt-2 text-sm text-gray-400">
                      Supported formats: TXT, PDF, DOC, DOCX (max 10MB)
                    </p>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5">⚠️</div>
                      <div>
                        <p className="font-medium">Error</p>
                        <p className="text-sm">{error}</p>
                        <p className="text-sm mt-2">
                          Tips:
                          <ul className="list-disc list-inside mt-1">
                            <li>Make sure your file is in .txt format</li>
                            <li>Ensure the file is not empty</li>
                            <li>Check that the file size is under 10MB</li>
                            <li>Verify that your resume contains basic information like name and current role</li>
                          </ul>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 'configure' && resumeData && (
              <motion.div
                key="configure"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-[#fcba28] mb-4">Configure Your Interview</h1>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Review your information and set your target role for the interview.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                    <h2 className="text-xl font-semibold text-white mb-4">Resume Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Name</label>
                        <div className="text-white">{resumeData.fullName}</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Current Role</label>
                        <div className="text-white">{resumeData.currentRole}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                    <h2 className="text-xl font-semibold text-white mb-4">Interview Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Target Role (Optional)</label>
                        <input
                          type="text"
                          value={targetRole}
                          onChange={(e) => setTargetRole(e.target.value)}
                          placeholder="e.g., Senior Software Engineer"
                          className="w-full px-4 py-2 bg-black/20 border border-[#fcba28]/20 rounded-lg text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  <motion.div
                    key="skill-analysis"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-8"
                  >
                    <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                      <h2 className="text-xl font-semibold text-[#fcba28] mb-4">Skills Analysis</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-white font-medium mb-3">Current Skills</h3>
                          <div className="space-y-3">
                            {Object.entries(skillAnalysis).map(([skill, level]) => (
                              <div key={skill} className="flex items-center justify-between">
                                <span className="text-gray-400">{skill}</span>
                                <div className="w-32 h-2 bg-black/20 rounded-full">
                                  <div 
                                    className="h-full bg-[#fcba28] rounded-full" 
                                    style={{ width: `${level}%` }} 
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-white font-medium mb-3">Target Role Requirements</h3>
                          <div className="space-y-2">
                            {targetRole && (
                              <ul className="list-disc list-inside text-gray-400">
                                <li>Technical expertise in required areas</li>
                                <li>Problem-solving capabilities</li>
                                <li>Communication skills</li>
                                <li>Leadership potential</li>
                                <li>Project management experience</li>
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-[#fcba28]">Interview Preparation Tips</h2>
                        <button
                          onClick={() => setShowPreparationTips(!showPreparationTips)}
                          className="text-gray-400 hover:text-white"
                        >
                          {showPreparationTips ? 'Hide' : 'Show'} Tips
                        </button>
                      </div>
                      
                      {showPreparationTips && (
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg bg-black/40">
                            <h3 className="text-white font-medium mb-2">Technical Preparation</h3>
                            <ul className="list-disc list-inside text-gray-400 space-y-1">
                              <li>Review core concepts in your tech stack</li>
                              <li>Practice coding problems related to your role</li>
                              <li>Understand system design principles</li>
                              <li>Prepare examples of past projects</li>
                            </ul>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-black/40">
                            <h3 className="text-white font-medium mb-2">Behavioral Preparation</h3>
                            <ul className="list-disc list-inside text-gray-400 space-y-1">
                              <li>Prepare STAR format responses</li>
                              <li>Review your major achievements</li>
                              <li>Think about challenging situations</li>
                              <li>Practice common behavioral questions</li>
                            </ul>
                          </div>

                          <div className="p-4 rounded-lg bg-black/40">
                            <h3 className="text-white font-medium mb-2">Company Research</h3>
                            <ul className="list-disc list-inside text-gray-400 space-y-1">
                              <li>Research company values and culture</li>
                              <li>Understand the company's products/services</li>
                              <li>Read recent news and developments</li>
                              <li>Prepare questions for the interviewer</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <div className="flex justify-end gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep('upload')}
                      className="px-6 py-3 bg-gray-700 text-white rounded-lg font-medium"
                      disabled={isStartingInterview}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={startInterview}
                      disabled={isStartingInterview}
                      className="relative px-8 py-3 bg-[#fcba28] text-black rounded-lg font-medium disabled:opacity-50 min-w-[160px]"
                    >
                      {isStartingInterview ? (
                        <>
                          <div className="absolute inset-0 bg-black/10 rounded-lg" />
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>Starting...</span>
                          </div>
                        </>
                      ) : (
                        'Start Interview'
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'interview' && session && (
              <motion.div
                key="interview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Interview Progress Bar */}
                <div className="w-full bg-black/20 rounded-full h-2 mb-4">
                  <div 
                    className="bg-[#fcba28] h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${((session.currentQuestionIndex + 1) / session.questions.length) * 100}%` 
                    }}
                  />
                </div>
                
                {/* Interview Stats */}
                <InterviewStats />

                {/* Real-time Feedback Panel */}
                <RealTimeFeedback />

                <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fcba28]/10 flex items-center justify-center">
                      🤖
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-white whitespace-pre-wrap">{aiResponse}</div>
                      {isThinking && (
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-[#fcba28] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-[#fcba28] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-[#fcba28] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <form onSubmit={handleTextSubmit} className="flex gap-4">
                    <input
                      type="text"
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      placeholder={voiceMode ? "Listening..." : "Type your response..."}
                      className="flex-1 px-4 py-2 bg-black/20 border border-[#fcba28]/20 rounded-lg text-white placeholder-gray-400"
                      disabled={isThinking || isRecording}
                    />
                    <VoiceModeToggle />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`p-2 rounded-lg ${isRecording ? 'bg-red-500' : 'bg-[#fcba28]'}`}
                    >
                      {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!transcript.trim() || isThinking || isSpeaking}
                      className="p-2 bg-[#fcba28] rounded-lg disabled:opacity-50"
                    >
                      <Send className="w-6 h-6" />
                    </motion.button>
                  </form>
                  
                  {voiceMode && (
                    <div className="text-center text-sm text-gray-400">
                      {isRecording ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                          Listening...
                        </div>
                      ) : isSpeaking ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-[#fcba28] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-[#fcba28] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-[#fcba28] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                          AI is speaking...
                        </div>
                      ) : (
                        'Click the microphone to start speaking'
                      )}
                    </div>
                  )}
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5">⚠️</div>
                      <div>
                        <p className="font-medium">Error</p>
                        <p className="text-sm">{error}</p>
                        <p className="text-sm mt-2">
                          Tips:
                          <ul className="list-disc list-inside mt-1">
                            <li>Make sure your file is in .txt format</li>
                            <li>Ensure the file is not empty</li>
                            <li>Check that the file size is under 10MB</li>
                            <li>Verify that your resume contains basic information like name and current role</li>
                          </ul>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isStartingInterview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#fcba28] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#fcba28] mb-2">Preparing Your Interview</h2>
            <p className="text-gray-400">Analyzing resume and generating personalized questions...</p>
          </div>
        </motion.div>
      )}

      {showFeedbackSummary && <InterviewSummary />}
    </div>
  );
}
