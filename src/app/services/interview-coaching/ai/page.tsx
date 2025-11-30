"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaPlay, FaStop, FaForward, FaLightbulb, 
         FaChalkboardTeacher, FaCheck, FaArrowRight, FaChartLine } from 'react-icons/fa';
import Avatar from '@/components/Avatar';
import { geminiService } from '@/services/gemini';
import { speechService } from '@/services/speech';

interface InterviewStats {
  relevance: number;
  clarity: number;
  confidence: number;
  structure: number;
  technicalAccuracy: number;
  overallScore: number;
  answerTiming: number;
  keywordUsage: number;
  communicationStyle: number;
  industryAlignment: number;
}

interface AnswerFeedback {
  feedback: string;
  strengths: string[];
  improvements: string[];
  keywordsSuggested: string[];
  keywordsUsed: string[];
  timingAnalysis: {
    duration: number;
    isOptimal: boolean;
    suggestion: string;
  };
  industryBenchmark: {
    score: number;
    percentile: number;
    comparison: string;
  };
}

export default function AIInterviewCoachingPage() {
  const [role, setRole] = useState('Software Engineer');
  const [experience, setExperience] = useState('5+ years');
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [avatarState, setAvatarState] = useState<'idle' | 'speaking' | 'thinking' | 'demonstrating'>('idle');
  const [showingExample, setShowingExample] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [stats, setStats] = useState<InterviewStats | null>(null);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<Array<{
    question: string;
    answer: string;
    feedback: AnswerFeedback;
    stats: InterviewStats;
    timestamp: Date;
  }>>([]);
  const [showProgress, setShowProgress] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [quickFeedback, setQuickFeedback] = useState<string | null>(null);
  const [analysisCache, setAnalysisCache] = useState<{
    [key: string]: {
      timestamp: number;
      data: any;
    };
  }>({});
  const [progressiveAnalysis, setProgressiveAnalysis] = useState<{
    basic?: {
      relevance: number;
      clarity: number;
      structure: number;
    };
    keywords?: {
      used: string[];
      suggested: string[];
      score: number;
    };
    technical?: {
      accuracy: number;
      industryAlignment: number;
    };
  }>({});

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [interimTranscript, finalTranscript]);

  const startSession = async () => {
    console.log('Session started'); // DEBUG LOG
    console.log('speechService:', speechService); // DEBUG LOG
    setIsSessionStarted(true);
    setAvatarState('speaking');
    await speechService?.speak(
      "Welcome to your interview practice session. I'll ask you questions and provide real-time feedback. I can also demonstrate how to answer each question effectively. Let's begin!",
      () => {},
      () => {
        console.log('Welcome message finished speaking'); // DEBUG LOG
        setAvatarState('idle');
        getNextQuestion();
      }
    );
  };

  const getNextQuestion = async () => {
    setShowingExample(false);
    setFinalTranscript('');
    setInterimTranscript('');
    setFeedback(null);
    setStats(null);
    setAvatarState('thinking');

    let attempts = 0;
    let question = null;
    do {
      question = await geminiService.getNextQuestion(role, previousQuestions);
      attempts++;
    } while (question && previousQuestions.includes(question.question) && attempts < 3);

    if (!question || previousQuestions.includes(question.question)) {
      setAvatarState('idle');
      alert("No more unique questions available. Please restart the session or try a different role.");
      return;
    }

    setCurrentQuestion(question);
    setPreviousQuestions(prev => [...prev, question.question]);

    setAvatarState('speaking');
    await speechService.speak(
      question.question,
      () => {},
      () => setAvatarState('idle')
    );
  };

  const startRecording = () => {
    setIsRecording(true);
    setInterimTranscript('');
    setFinalTranscript('');
    setFeedback(null);
    setStats(null);
    
    speechService.startRecognition(
      (text, isFinal) => {
        if (isFinal) {
          setFinalTranscript(prev => prev + ' ' + text);
          setInterimTranscript('');
        } else {
          setInterimTranscript(text);
        }
      },
      (error) => {
        console.error('Recognition error:', error);
        setIsRecording(false);
      }
    );
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsProcessingAnswer(true);
    speechService.stopRecognition();
    
    const fullTranscript = (finalTranscript + ' ' + interimTranscript).trim();
    const answerStartTime = new Date().getTime();
    
    if (fullTranscript && currentQuestion) {
      setAvatarState('thinking');
      
      // 1. Immediate quick feedback
      const quickAnalysis = generateQuickFeedback(fullTranscript);
      setQuickFeedback(quickAnalysis);
      
      try {
        setIsGeneratingFeedback(true);
        
        // 2. Basic analysis (immediate, no API call)
        const basicAnalysis = performBasicAnalysis(fullTranscript);
        setProgressiveAnalysis(prev => ({ ...prev, basic: basicAnalysis }));
        
        // 3. Check cache for similar questions
        const cacheKey = `${currentQuestion.question}-${fullTranscript.length}`;
        const cachedResult = analysisCache[cacheKey];
        const cacheTimeout = 30 * 60 * 1000; // 30 minutes
        
        if (cachedResult && (Date.now() - cachedResult.timestamp) < cacheTimeout) {
          setProgressiveAnalysis(prev => ({
            ...prev,
            keywords: cachedResult.data.keywords,
            technical: cachedResult.data.technical
          }));
          
          updateFinalFeedback(
            basicAnalysis,
            cachedResult.data.keywords,
            cachedResult.data.technical,
            answerStartTime
          );
          return;
        }

        // 4. Parallel API calls with progressive updates
        const keywordPromise = geminiService.analyzeKeywords(fullTranscript)
          .then(keywordData => {
            setProgressiveAnalysis(prev => ({ ...prev, keywords: keywordData }));
            return keywordData;
          });

        const technicalPromise = Promise.all([
          geminiService.analyzeResponse(currentQuestion.question, fullTranscript),
          geminiService.getIndustryBenchmarks(currentQuestion.question)
        ]).then(([analysis, benchmarks]) => {
          const technical = {
            accuracy: analysis.technicalAccuracy || 0,
            industryAlignment: benchmarks.alignment || 0
          };
          setProgressiveAnalysis(prev => ({ ...prev, technical }));
          return technical;
        });

        // 5. Wait for all analysis to complete
        const [keywords, technical] = await Promise.all([
          keywordPromise,
          technicalPromise
        ]);

        // 6. Cache the results
        setAnalysisCache(prev => ({
          ...prev,
          [cacheKey]: {
            timestamp: Date.now(),
            data: { keywords, technical }
          }
        }));

        // 7. Update final feedback
        updateFinalFeedback(basicAnalysis, keywords, technical, answerStartTime);
        
      } catch (error) {
        console.error('Error analyzing response:', error);
        // Use progressive analysis results even if final analysis fails
        const { basic, keywords, technical } = progressiveAnalysis;
        if (basic) {
          updateFinalFeedback(
            basic,
            keywords || { used: [], suggested: [], score: 0 },
            technical || { accuracy: 0, industryAlignment: 0 },
            answerStartTime
          );
        }
      } finally {
        setIsGeneratingFeedback(false);
      }
    }
    
    setIsProcessingAnswer(false);
  };

  const performBasicAnalysis = (transcript: string): any => {
    const words = transcript.toLowerCase().split(' ');
    const wordCount = words.length;
    
    // Quick relevance check based on common interview keywords
    const relevantKeywords = ['experience', 'project', 'team', 'solution', 'challenge'];
    const relevanceScore = relevantKeywords.filter(k => words.includes(k)).length * 20;
    
    // Structure analysis
    const hasIntro = wordCount > 10;
    const hasConclusion = wordCount > 50;
    const hasExample = transcript.toLowerCase().includes('example');
    const structureScore = (hasIntro ? 30 : 0) + (hasConclusion ? 30 : 0) + (hasExample ? 40 : 0);
    
    // Clarity analysis based on sentence length and transition words
    const sentences = transcript.split(/[.!?]+/);
    const avgSentenceLength = wordCount / sentences.length;
    const clarityScore = avgSentenceLength > 8 && avgSentenceLength < 25 ? 100 : 70;
    
    return {
      relevance: relevanceScore,
      clarity: clarityScore,
      structure: structureScore
    };
  };

  const updateFinalFeedback = (
    basic: any,
    keywords: any,
    technical: any,
    startTime: number
  ) => {
    const answerDuration = (Date.now() - startTime) / 1000;
    
    const enhancedStats = {
      relevance: basic.relevance,
      clarity: basic.clarity,
      confidence: basic.structure,
      structure: basic.structure,
      technicalAccuracy: technical.accuracy,
      answerTiming: calculateTimingScore(answerDuration),
      keywordUsage: keywords.score || 0,
      communicationStyle: basic.clarity,
      industryAlignment: technical.industryAlignment,
      overallScore: Math.round(
        (basic.relevance + basic.clarity + basic.structure * 2 + 
         technical.accuracy + keywords.score + technical.industryAlignment) / 7
      )
    };

    setStats(enhancedStats);
    
    const enhancedFeedback: AnswerFeedback = {
      feedback: generateFeedbackSummary(enhancedStats),
      strengths: generateStrengths(enhancedStats),
      improvements: generateImprovements(enhancedStats),
      keywordsSuggested: keywords.suggested || [],
      keywordsUsed: keywords.used || [],
      timingAnalysis: {
        duration: answerDuration,
        isOptimal: answerDuration >= 60 && answerDuration <= 180,
        suggestion: getTimingSuggestion(answerDuration)
      },
      industryBenchmark: {
        score: enhancedStats.overallScore,
        percentile: calculatePercentile(enhancedStats.overallScore),
        comparison: getIndustryComparison(enhancedStats.overallScore)
      }
    };

    setFeedback(enhancedFeedback);
    setQuickFeedback(null);
    
    // Update session history
    setSessionHistory(prev => [...prev, {
      question: currentQuestion.question,
      answer: finalTranscript + ' ' + interimTranscript,
      feedback: enhancedFeedback,
      stats: enhancedStats,
      timestamp: new Date()
    }]);
  };

  const generateFeedbackSummary = (stats: any): string => {
    const points = [];
    if (stats.relevance >= 80) points.push("Your answer was highly relevant");
    if (stats.clarity >= 80) points.push("communicated clearly");
    if (stats.structure >= 80) points.push("well-structured");
    if (stats.technicalAccuracy >= 80) points.push("technically accurate");
    
    return points.length > 0 
      ? `Great job! Your response was ${points.join(", ")}. `
      : "Your answer shows potential. Here's how you can improve: ";
  };

  const generateStrengths = (stats: any): string[] => {
    const strengths = [];
    if (stats.relevance >= 70) strengths.push("Good understanding of the question");
    if (stats.clarity >= 70) strengths.push("Clear communication");
    if (stats.structure >= 70) strengths.push("Well-structured response");
    if (stats.technicalAccuracy >= 70) strengths.push("Strong technical knowledge");
    return strengths;
  };

  const generateImprovements = (stats: any): string[] => {
    const improvements = [];
    if (stats.relevance < 70) improvements.push("Focus more on addressing the question directly");
    if (stats.clarity < 70) improvements.push("Try to explain concepts more clearly");
    if (stats.structure < 70) improvements.push("Structure your answer with an introduction and conclusion");
    if (stats.technicalAccuracy < 70) improvements.push("Review technical concepts related to this topic");
    return improvements;
  };

  const calculateTimingScore = (duration: number): number => {
    // Optimal answer time is between 1-3 minutes
    if (duration >= 60 && duration <= 180) return 100;
    if (duration < 60) return Math.round((duration / 60) * 100);
    return Math.round((180 / duration) * 100);
  };

  const getTimingSuggestion = (duration: number): string => {
    if (duration < 60) return "Try to elaborate more on your answer. Aim for at least 1 minute.";
    if (duration > 180) return "Try to be more concise. Aim for maximum 3 minutes.";
    return "Great answer timing!";
  };

  const calculatePercentile = (score: number): number => {
    // Mock percentile calculation - replace with actual data
    return Math.round((score / 100) * 100);
  };

  const getIndustryComparison = (score: number): string => {
    if (score >= 90) return "Exceptional - Top 10% of candidates";
    if (score >= 75) return "Above Average - Top 25% of candidates";
    if (score >= 50) return "Average - Meeting industry standards";
    return "Below Average - Additional practice recommended";
  };

  const demonstrateAnswer = async () => {
    if (!currentQuestion) return;

    setShowingExample(true);
    setAvatarState('demonstrating');
    
    try {
      const demonstration = await geminiService.demonstrateAnswer(currentQuestion.question, role);
      
      await speechService.speak(
        "Let me demonstrate how to answer this question effectively.",
        () => {},
        async () => {
          await speechService.speak(
            demonstration,
            () => {},
            () => {
              setAvatarState('idle');
              setCurrentQuestion(prev => prev ? {
                ...prev,
                exampleAnswer: demonstration
              } : null);
            }
          );
        }
      );
    } catch (error) {
      console.error('Error demonstrating answer:', error);
      setAvatarState('idle');
    }
  };

  const generateQuickFeedback = (transcript: string): string => {
    const wordCount = transcript.split(' ').length;
    const duration = transcript.length / 20; // Rough estimate of speaking duration
    
    let feedback = [];
    
    // Quick timing check
    if (wordCount < 50) feedback.push("Consider providing more details in your answer.");
    else if (wordCount > 300) feedback.push("Try to be more concise.");
    
    // Quick structure check
    if (!transcript.toLowerCase().includes('example')) 
      feedback.push("Consider including specific examples.");
    
    if (!transcript.toLowerCase().includes('because') && !transcript.toLowerCase().includes('therefore'))
      feedback.push("Try to include more reasoning in your answer.");
    
    return feedback.join(' ');
  };

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
              AI Interview Coach
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">Master Your Interview Skills with AI-Powered Coaching</p>

          {!isSessionStarted && (
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-[#ffffff15] text-white px-4 py-2 rounded-lg"
                >
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="UX Designer">UX Designer</option>
                </select>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="bg-[#ffffff15] text-white px-4 py-2 rounded-lg"
                >
                  <option value="0-2 years">Entry Level (0-2 years)</option>
                  <option value="2-5 years">Mid Level (2-5 years)</option>
                  <option value="5+ years">Senior Level (5+ years)</option>
                </select>
              </div>
              <motion.button
                onClick={startSession}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black font-bold py-4 px-8 rounded-xl text-xl"
              >
                Start Practice Session
              </motion.button>
            </div>
          )}
        </motion.div>

        {isSessionStarted && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Avatar Section */}
              <div className="relative h-[400px] bg-gradient-to-b from-[#fcba2810] to-transparent rounded-2xl mb-8">
                <Avatar 
                  avatarState={avatarState}
                  className="w-full h-full max-w-[300px] mx-auto"
                />
              </div>

              {/* Question and Controls */}
              <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6 mb-8">
                {currentQuestion && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">Current Question</h3>
                      <p className="text-lg mb-2">{currentQuestion.question}</p>
                      <p className="text-sm text-gray-400">{currentQuestion.context}</p>
                    </div>

                    <div className="flex gap-4">
                      {!isRecording ? (
                        <>
                          <motion.button
                            onClick={startRecording}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black px-6 py-3 rounded-xl font-semibold"
                          >
                            <FaMicrophone />
                            Start Answer
                          </motion.button>
                          <motion.button
                            onClick={demonstrateAnswer}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-[#ffffff15] px-6 py-3 rounded-xl font-semibold"
                          >
                            <FaChalkboardTeacher />
                            Show Example
                          </motion.button>
                          <motion.button
                            onClick={getNextQuestion}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-[#ffffff15] px-6 py-3 rounded-xl font-semibold"
                          >
                            <FaForward />
                            Next Question
                          </motion.button>
                        </>
                      ) : (
                        <motion.button
                          onClick={stopRecording}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold"
                        >
                          <FaStop />
                          Stop Recording
                        </motion.button>
                      )}
                    </div>

                    {(isRecording || finalTranscript) && (
                      <div className="bg-[#ffffff15] p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Your Answer:</h4>
                        <div 
                          ref={transcriptRef}
                          className="max-h-48 overflow-y-auto space-y-2"
                        >
                          {finalTranscript && (
                            <p className="text-white">{finalTranscript}</p>
                          )}
                          {interimTranscript && (
                            <p className="text-gray-400 italic">{interimTranscript}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {showingExample && currentQuestion.exampleAnswer && (
                      <div className="bg-[#ffffff15] p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Example Answer:</h4>
                        <p className="text-white leading-relaxed">
                          {currentQuestion.exampleAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Tips and Feedback */}
            <div className="lg:col-span-4 space-y-6">
              {stats && (
                <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Response Analysis</h3>
                    <div className="flex items-center gap-2">
                      <FaChartLine className="text-[#fcba28]" />
                      <span className="text-2xl font-bold">{stats.overallScore}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(stats).map(([key, value]) => (
                      key !== 'overallScore' && (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span>{Math.round(value)}%</span>
                          </div>
                          <div className="h-2 bg-[#ffffff15] rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-[#fcba28]"
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {currentQuestion && (
                <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Points to Cover</h3>
                  <ul className="space-y-3">
                    {currentQuestion.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaCheck className="text-[#fcba28] mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {quickFeedback && !feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 mb-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#fcba28] border-t-transparent" />
                    <h3 className="text-lg font-semibold">Quick Feedback</h3>
                  </div>
                  <p className="text-gray-300">{quickFeedback}</p>
                  <p className="text-sm text-gray-400 mt-2">Generating detailed analysis...</p>
                </motion.div>
              )}
              
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 mb-8"
                >
                  <h3 className="text-2xl font-bold mb-4">Detailed Feedback</h3>
                  
                  {/* Strengths and Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-2">Strengths</h4>
                      <ul className="list-disc list-inside">
                        {feedback.strengths.map((strength, i) => (
                          <li key={i} className="text-gray-300">{strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-yellow-400 mb-2">Areas for Improvement</h4>
                      <ul className="list-disc list-inside">
                        {feedback.improvements.map((improvement, i) => (
                          <li key={i} className="text-gray-300">{improvement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Keyword Analysis */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Keyword Analysis</h4>
                    <div className="flex flex-wrap gap-2">
                      {feedback.keywordsUsed.map((keyword, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-500/20 rounded-full text-sm">
                          ✓ {keyword}
                        </span>
                      ))}
                      {feedback.keywordsSuggested.map((keyword, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-500/20 rounded-full text-sm">
                          + {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timing Analysis */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-purple-400 mb-2">Answer Timing</h4>
                    <p className="text-gray-300">
                      Duration: {feedback.timingAnalysis.duration.toFixed(1)}s
                      <br />
                      {feedback.timingAnalysis.suggestion}
                    </p>
                  </div>

                  {/* Industry Benchmark */}
                  <div>
                    <h4 className="text-lg font-semibold text-orange-400 mb-2">Industry Benchmark</h4>
                    <p className="text-gray-300">
                      {feedback.industryBenchmark.comparison}
                      <br />
                      Percentile: {feedback.industryBenchmark.percentile}%
                    </p>
                  </div>
                </motion.div>
              )}
              
              {progressiveAnalysis.basic && !feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 mb-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Analysis in Progress</h3>
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#fcba28] border-t-transparent" />
                      <span className="text-sm text-gray-400">Analyzing...</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {progressiveAnalysis.basic && (
                      <div>
                        <h4 className="text-md font-semibold text-blue-400">Initial Analysis</h4>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          <div>
                            <p className="text-sm text-gray-400">Relevance</p>
                            <p className="text-lg">{progressiveAnalysis.basic.relevance}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Clarity</p>
                            <p className="text-lg">{progressiveAnalysis.basic.clarity}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Structure</p>
                            <p className="text-lg">{progressiveAnalysis.basic.structure}%</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {progressiveAnalysis.keywords && (
                      <div>
                        <h4 className="text-md font-semibold text-green-400">Keyword Analysis</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {progressiveAnalysis.keywords.used.map((keyword, i) => (
                            <span key={i} className="px-2 py-1 bg-green-500/20 rounded-full text-sm">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {progressiveAnalysis.technical && (
                      <div>
                        <h4 className="text-md font-semibold text-purple-400">Technical Analysis</h4>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <p className="text-sm text-gray-400">Accuracy</p>
                            <p className="text-lg">{progressiveAnalysis.technical.accuracy}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Industry Alignment</p>
                            <p className="text-lg">{progressiveAnalysis.technical.industryAlignment}%</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isProcessingAnswer && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#fcba28] border-t-transparent" />
              <p>Analyzing your response...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

