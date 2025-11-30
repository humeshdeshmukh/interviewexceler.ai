'use client';

import React, { useRef, useState, useEffect } from "react";
import { Camera, StopCircle, RefreshCw } from "lucide-react";

interface VideoRecorderProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: (blob: Blob) => void;
}

export const VideoRecorder: React.FC<VideoRecorderProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>("");
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError("Failed to access camera. Please check permissions.");
        console.error("Error accessing media devices:", err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!stream) return;

    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording, stream]);

  const startRecording = () => {
    if (!stream) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      onStopRecording(blob);
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const retryCamera = async () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setError("");
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError("Failed to access camera. Please check permissions.");
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={retryCamera}
          className="flex items-center gap-2 px-4 py-2 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcba28]/90 transition-colors"
        >
          <RefreshCw size={16} />
          Retry Camera Access
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover rounded-lg"
      />
      {isRecording && (
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-red-500 rounded-full text-white text-sm">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Recording
        </div>
      )}
    </div>
  );
};
