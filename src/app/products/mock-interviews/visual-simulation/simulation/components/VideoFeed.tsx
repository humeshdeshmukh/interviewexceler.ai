'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { videoAnalysisService } from '../services/videoAnalysisService';

interface VideoFeedProps {
  isRecording: boolean;
  onVideoMetricsUpdate?: (metrics: any) => void;
  onVideoFrame?: (video: HTMLVideoElement) => void;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({ isRecording, onVideoMetricsUpdate, onVideoFrame }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Effect for Camera Stream (Mount only)
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startVideo = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 }
          },
          audio: true
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startVideo();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Effect for Analysis (Recording state changes)
  useEffect(() => {
    let analysisInterval: NodeJS.Timeout;

    if (isRecording && videoRef.current) {
      // Start internal analysis
      videoAnalysisService.startAnalysis(videoRef.current);

      // Set up external analysis loop
      if (onVideoFrame) {
        analysisInterval = setInterval(() => {
          if (videoRef.current) {
            onVideoFrame(videoRef.current);
          }
        }, 100); // 10 FPS
      }
    }

    return () => {
      if (analysisInterval) {
        clearInterval(analysisInterval);
      }
      videoAnalysisService.stopAnalysis();
    };
  }, [isRecording, onVideoFrame]);

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full aspect-video object-cover rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {isRecording && (
        <motion.div
          className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm text-white font-medium">Recording</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VideoFeed;
