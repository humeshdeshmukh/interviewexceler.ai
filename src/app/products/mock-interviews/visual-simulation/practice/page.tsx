'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { QuestionList } from "./components/QuestionList";
import { QuestionPrompt } from "./components/QuestionPrompt";
import { VideoRecorder } from "./components/VideoRecorder";
import { allQuestions } from "./data";

export default function PracticePage() {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordedVideo(null);
  };

  const handleStopRecording = (blob: Blob) => {
    setIsRecording(false);
    const url = URL.createObjectURL(blob);
    setRecordedVideo(url);
  };

  const handleDownload = () => {
    if (recordedVideo) {
      const a = document.createElement('a');
      a.href = recordedVideo;
      a.download = `interview-answer-${Date.now()}.webm`;
      a.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Question List */}
          <div className="lg:col-span-1 bg-black/20 rounded-lg p-4 h-[calc(100vh-3rem)] overflow-y-auto">
            <QuestionList
              currentQuestionId={currentQuestionId}
              onSelectQuestion={(id) => {
                setCurrentQuestionId(id);
                setShowAnswer(false);
                setPracticeMode(false);
              }}
            />
          </div>

          {/* Right Panel - Question Details and Practice */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Panel */}
            <div className="bg-black/20 rounded-lg p-6">
              <div className="space-y-4">
                <QuestionPrompt
                  currentQuestionIndex={currentQuestionId - 1}
                  practiceMode={practiceMode}
                />

                {/* Toggle Answer Button */}
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcba28]/90 transition-colors"
                >
                  {showAnswer ? (
                    <>
                      <ChevronUp size={20} />
                      Hide Sample Answer
                    </>
                  ) : (
                    <>
                      <ChevronDown size={20} />
                      Show Sample Answer
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden space-y-6"
                    >
                      {/* Main Points */}
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h3 className="text-[#fcba28] font-medium mb-3">Key Points to Cover</h3>
                        <ul className="space-y-2">
                          {allQuestions[currentQuestionId - 1].sampleAnswer.mainPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-300">
                              <span className="text-[#fcba28] mt-1">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Answer Structure */}
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h3 className="text-[#fcba28] font-medium mb-3">Answer Structure</h3>
                        <div className="space-y-4">
                          {allQuestions[currentQuestionId - 1].sampleAnswer.structure.introduction && (
                            <div>
                              <h4 className="text-white text-sm font-medium mb-2">Introduction</h4>
                              <p className="text-gray-300 text-sm">{allQuestions[currentQuestionId - 1].sampleAnswer.structure.introduction}</p>
                            </div>
                          )}
                          {allQuestions[currentQuestionId - 1].sampleAnswer.structure.body && (
                            <div>
                              <h4 className="text-white text-sm font-medium mb-2">Main Points</h4>
                              <ul className="space-y-2">
                                {allQuestions[currentQuestionId - 1].sampleAnswer.structure.body.map((point, index) => (
                                  <li key={index} className="text-gray-300 text-sm">{point}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {allQuestions[currentQuestionId - 1].sampleAnswer.structure.conclusion && (
                            <div>
                              <h4 className="text-white text-sm font-medium mb-2">Conclusion</h4>
                              <p className="text-gray-300 text-sm">{allQuestions[currentQuestionId - 1].sampleAnswer.structure.conclusion}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tips and Common Mistakes */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <h3 className="text-[#fcba28] font-medium mb-3">Tips for Success</h3>
                          <ul className="space-y-2">
                            {allQuestions[currentQuestionId - 1].sampleAnswer.tips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                                <span className="text-[#fcba28] mt-1">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <h3 className="text-[#fcba28] font-medium mb-3">Common Mistakes to Avoid</h3>
                          <ul className="space-y-2">
                            {allQuestions[currentQuestionId - 1].sampleAnswer.commonMistakes.map((mistake, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                                <span className="text-red-500 mt-1">•</span>
                                <span>{mistake}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Keywords */}
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h3 className="text-[#fcba28] font-medium mb-3">Keywords to Include</h3>
                        <div className="flex flex-wrap gap-2">
                          {allQuestions[currentQuestionId - 1].sampleAnswer.keywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#fcba28]/10 text-[#fcba28] rounded-full text-sm"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Practice Controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setPracticeMode(!practiceMode)}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  practiceMode
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {practiceMode ? "Stop Practice" : "Start Practice"}
              </button>
            </div>

            {/* Practice Area */}
            {practiceMode && (
              <div className="bg-black/20 rounded-lg p-6 space-y-4">
                <VideoRecorder
                  isRecording={isRecording}
                  onStartRecording={handleStartRecording}
                  onStopRecording={handleStopRecording}
                />
                {recordedVideo && (
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Download Recording
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
