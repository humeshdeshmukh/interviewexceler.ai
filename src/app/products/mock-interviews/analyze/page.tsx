"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartBar, FaRegLightbulb, FaVideo, FaMicrophone, FaSmile } from 'react-icons/fa';
import { BsGraphUp, BsSpeedometer } from 'react-icons/bs';

interface AnalysisMetrics {
  confidence: number;
  clarity: number;
  technicalAccuracy: number;
  communicationScore: number;
  eyeContact: number;
  posture: number;
  pacing: number;
  vocabulary: number;
}

interface SentimentAnalysis {
  positive: number;
  negative: number;
  neutral: number;
}

interface TranscriptSegment {
  text: string;
  startTime: number;
  endTime: number;
  confidence: number;
}

export default function AnalyzePage() {
  const [metrics, setMetrics] = useState<AnalysisMetrics>({
    confidence: 85,
    clarity: 78,
    technicalAccuracy: 92,
    communicationScore: 88,
    eyeContact: 75,
    posture: 82,
    pacing: 79,
    vocabulary: 90
  });

  const [sentiment, setSentiment] = useState<SentimentAnalysis>({
    positive: 65,
    negative: 10,
    neutral: 25
  });

  const [transcript, setTranscript] = useState<TranscriptSegment[]>([
    {
      text: "I have extensive experience with React and modern web development...",
      startTime: 0,
      endTime: 15,
      confidence: 0.95
    }
  ]);

  const [insights, setInsights] = useState<string[]>([
    "Strong technical knowledge demonstration",
    "Could improve eye contact",
    "Good use of specific examples",
    "Pace was appropriate for comprehension"
  ]);

  const renderMetricBar = (label: string, value: number) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{label}</span>
        <span className="text-[#fcba28]">{value}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
          className="h-full bg-[#fcba28]"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-4 md:px-8">
      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#fcba28]/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            Interview Analysis
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive analysis of your interview performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Metrics */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-semibold text-[#fcba28] mb-6 flex items-center gap-2">
                <BsGraphUp />
                Performance Metrics
              </h2>
              <div className="space-y-6">
                {Object.entries(metrics).map(([key, value]) => (
                  renderMetricBar(
                    key.replace(/([A-Z])/g, ' $1').trim(),
                    value
                  )
                ))}
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-semibold text-[#fcba28] mb-6 flex items-center gap-2">
                <FaSmile />
                Sentiment Analysis
              </h2>
              <div className="space-y-6">
                {Object.entries(sentiment).map(([key, value]) => (
                  renderMetricBar(key, value)
                ))}
              </div>
            </div>
          </div>

          {/* Transcript and Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transcript */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-semibold text-[#fcba28] mb-6 flex items-center gap-2">
                <FaMicrophone />
                Interview Transcript
              </h2>
              <div className="space-y-4">
                {transcript.map((segment, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>{`${Math.floor(segment.startTime / 60)}:${(segment.startTime % 60).toString().padStart(2, '0')} - ${Math.floor(segment.endTime / 60)}:${(segment.endTime % 60).toString().padStart(2, '0')}`}</span>
                      <span>Confidence: {Math.round(segment.confidence * 100)}%</span>
                    </div>
                    <p className="text-gray-200">{segment.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-semibold text-[#fcba28] mb-6 flex items-center gap-2">
                <FaRegLightbulb />
                Key Insights
              </h2>
              <div className="grid gap-4">
                {insights.map((insight, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl flex items-start gap-3">
                    <span className="text-[#fcba28] mt-1">•</span>
                    <p className="text-gray-200">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-semibold text-[#fcba28] mb-6 flex items-center gap-2">
                <BsSpeedometer />
                Areas for Improvement
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <h3 className="text-lg font-medium text-[#fcba28] mb-2">Communication</h3>
                  <p className="text-gray-300">Focus on maintaining consistent eye contact and using more industry-specific terminology.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <h3 className="text-lg font-medium text-[#fcba28] mb-2">Technical Depth</h3>
                  <p className="text-gray-300">Consider providing more detailed examples of your technical implementations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
