'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAvatarProps {
  isSpoken: boolean;
  currentQuestion?: string;
}

const AIFace = ({ isSpeaking }: { isSpeaking: boolean }) => (
  <svg
    viewBox="0 0 200 200"
    className="w-full h-full"
  >
    {/* Face Circle */}
    <motion.circle
      cx="100"
      cy="100"
      r="90"
      fill="url(#gradientFace)"
      stroke="#fcba28"
      strokeWidth="2"
      initial={{ scale: 0.9 }}
      animate={{ 
        scale: [1, 1.02, 1],
        rotate: isSpeaking ? [0, 1, -1, 0] : 0
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />

    {/* Eyes */}
    <motion.g
      initial={{ scale: 0.9 }}
      animate={{ 
        scale: [1, 1.05, 1],
        y: isSpeaking ? [0, -1, 0] : 0
      }}
      transition={{ 
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      {/* Left Eye */}
      <circle cx="70" cy="85" r="10" fill="#fcba28" opacity="0.3" />
      <circle cx="70" cy="85" r="8" fill="#fcba28" />
      <circle cx="70" cy="85" r="4" fill="#1a1a1a" />
      <circle cx="72" cy="83" r="2" fill="white" />

      {/* Right Eye */}
      <circle cx="130" cy="85" r="10" fill="#fcba28" opacity="0.3" />
      <circle cx="130" cy="85" r="8" fill="#fcba28" />
      <circle cx="130" cy="85" r="4" fill="#1a1a1a" />
      <circle cx="132" cy="83" r="2" fill="white" />

      {/* Eyebrows */}
      <motion.path
        d="M60,75 Q70,72 80,75"
        stroke="#fcba28"
        strokeWidth="2"
        fill="none"
        animate={{
          d: isSpeaking 
            ? ["M60,75 Q70,72 80,75", "M60,73 Q70,70 80,73"]
            : "M60,75 Q70,72 80,75"
        }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.path
        d="M120,75 Q130,72 140,75"
        stroke="#fcba28"
        strokeWidth="2"
        fill="none"
        animate={{
          d: isSpeaking 
            ? ["M120,75 Q130,72 140,75", "M120,73 Q130,70 140,73"]
            : "M120,75 Q130,72 140,75"
        }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.g>

    {/* Mouth */}
    <motion.path
      d={isSpeaking 
        ? "M65,120 Q100,145 135,120" // Speaking mouth (more open)
        : "M65,120 Q100,130 135,120"  // Normal mouth (slight smile)
      }
      stroke="#fcba28"
      strokeWidth="4"
      fill="none"
      animate={{
        d: isSpeaking 
          ? [
              "M65,120 Q100,145 135,120", // Open wide
              "M65,120 Q100,135 135,120", // Half open
              "M65,120 Q100,145 135,120"  // Open wide again
            ]
          : "M65,120 Q100,130 135,120"
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />

    {/* Digital Circuit Lines with Glowing Effect */}
    <g stroke="#fcba28" strokeWidth="1.5" filter="url(#glow)">
      <motion.path
        d="M10,50 L50,50 L70,70"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ 
          pathLength: 1,
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.path
        d="M190,50 L150,50 L130,70"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ 
          pathLength: 1,
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          delay: 0.2,
          ease: "linear"
        }}
      />
      <motion.path
        d="M10,150 L50,150 L70,130"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ 
          pathLength: 1,
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          delay: 0.4,
          ease: "linear"
        }}
      />
      <motion.path
        d="M190,150 L150,150 L130,130"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ 
          pathLength: 1,
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          delay: 0.6,
          ease: "linear"
        }}
      />
    </g>

    {/* Enhanced Gradients */}
    <defs>
      <radialGradient id="gradientFace" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2a2a2a" />
        <stop offset="80%" stopColor="#1a1a1a" />
        <stop offset="90%" stopColor="#0a0a0a" />
        <stop offset="100%" stopColor="#000000" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  </svg>
);

export const AIAvatar: React.FC<AIAvatarProps> = ({ isSpoken, currentQuestion }) => {
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showFullQuestion, setShowFullQuestion] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dummy = new SpeechSynthesisUtterance('');
      window.speechSynthesis.speak(dummy);
      setIsInitialized(true);
    }
    
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const speakQuestion = async () => {
      try {
        if (isSpoken && currentQuestion) {
          window.speechSynthesis.cancel();

          const utterance = new SpeechSynthesisUtterance(currentQuestion);
          speechSynthesisRef.current = utterance;

          utterance.rate = 0.9;
          utterance.pitch = 1.1;
          utterance.volume = 1.0;

          let voices = window.speechSynthesis.getVoices();
          
          if (voices.length === 0) {
            await new Promise<void>((resolve) => {
              window.speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices();
                resolve();
              };
            });
          }

          const englishVoice = voices.find(voice => 
            voice.lang.startsWith('en-')
          );
          
          if (englishVoice) {
            utterance.voice = englishVoice;
          }

          utterance.onstart = () => {
            setIsSpeaking(true);
            document.addEventListener('visibilitychange', handleVisibilityChange);
          };

          utterance.onend = () => {
            setIsSpeaking(false);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
          };

          utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            setIsSpeaking(false);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
          };

          const chunks = splitTextIntoChunks(currentQuestion);
          
          for (const chunk of chunks) {
            utterance.text = chunk;
            window.speechSynthesis.speak(utterance);
            await new Promise(resolve => {
              utterance.onend = () => resolve(null);
            });
          }
        }
      } catch (error) {
        console.error('Speech synthesis error:', error);
        setIsSpeaking(false);
      }
    };

    speakQuestion();
  }, [isSpoken, currentQuestion, isInitialized]);

  const handleVisibilityChange = () => {
    if (document.hidden) {
      window.speechSynthesis.pause();
    } else {
      window.speechSynthesis.resume();
    }
  };

  const splitTextIntoChunks = (text: string): string[] => {
    const maxChunkLength = 200;
    const chunks: string[] = [];
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let currentChunk = '';
    
    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length <= maxChunkLength) {
        currentChunk += sentence;
      } else {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = sentence;
      }
    }
    
    if (currentChunk) chunks.push(currentChunk.trim());
    return chunks;
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Avatar Container */}
      <div className="relative w-64 h-64 mb-6">
        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#fcba28]/20 to-[#fcd978]/20"
          animate={{
            scale: isSpeaking ? [1, 1.1, 1] : 1,
            opacity: isSpeaking ? [0.5, 0.8, 0.5] : 0.5
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* AI Face */}
        <div className="relative w-full h-full">
          <AIFace isSpeaking={isSpeaking} />
        </div>

        {/* Voice Wave Animation */}
        <AnimatePresence>
          {isSpeaking && (
            <motion.div 
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[#fcba28] rounded-full"
                  animate={{
                    height: ['16px', '24px', '16px'],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Question Display */}
      {currentQuestion && (
        <motion.div
          className="w-full max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div 
            className={`relative bg-white/5 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 ${
              showFullQuestion ? 'max-h-none' : 'max-h-32 overflow-hidden'
            }`}
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              {currentQuestion}
            </p>
            
            {!showFullQuestion && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />
            )}
            
            <button
              className="absolute bottom-2 right-2 text-[#fcba28] text-sm hover:text-[#fcd978] transition-colors"
              onClick={() => setShowFullQuestion(!showFullQuestion)}
            >
              {showFullQuestion ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
