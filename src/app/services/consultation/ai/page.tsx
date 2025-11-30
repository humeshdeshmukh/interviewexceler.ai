"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaRobot, FaPaperPlane, FaCog, FaMicrophone, FaMicrophoneSlash, FaCompass, FaHistory, FaBars, FaArrowLeft } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';
import { TypingLoader } from './components/TypingLoader';
import { TypingIndicator } from './components/TypingIndicator';
import { SessionSidebar } from './components/SessionSidebar';
import { useVoiceRecording } from '@/lib/hooks/useVoiceRecording';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useConsultation } from './hooks/use-consultation';
import { ChatMessage } from './components/ChatMessage';
import { CareerProfile } from './gemini-service';

const consultationTopics = [
  {
    id: 'career-guidance',
    title: 'Career Guidance',
    icon: FaCompass,
    description: 'Get personalized advice on your career path and growth.'
  },
  {
    id: 'resume-review',
    title: 'Resume Review',
    icon: FaHistory, // Using History icon as placeholder
    description: 'Analyze your resume and get improvement suggestions.'
  }
];

export default function AIConsultationPage() {
  const {
    messages,
    isLoading,
    sendMessage,
    loadHistory,
    sessions,
    activeSessionId,
    createNewSession,
    switchSession,
    deleteSession
  } = useConsultation();
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true); // Open by default on desktop
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Profile state
  const [showProfile, setShowProfile] = useState(false);
  const [careerProfile, setCareerProfile] = useState<CareerProfile>({
    experience: '',
    skills: [],
    interests: [],
    education: '',
    currentRole: '',
    targetRole: '',
    industry: '',
    location: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: ''
  });

  // Voice recording state
  const {
    isRecording: isRecordingVoice,
    startRecording,
    stopRecording,
    transcript
  } = useVoiceRecording();

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Update input from voice transcript
  useEffect(() => {
    if (transcript) {
      setInputMessage(transcript);
    }
  }, [transcript]);

  const handleProfileUpdate = (field: keyof CareerProfile, value: string) => {
    if (field === 'skills' || field === 'interests') {
      setCareerProfile(prev => ({
        ...prev,
        [field]: value.split(',').map(item => item.trim())
      }));
    } else {
      setCareerProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleVoiceInput = () => {
    if (isRecordingVoice) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage;
    setInputMessage('');
    await sendMessage(message, showProfile ? careerProfile : undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen bg-[#1a1a1a] overflow-hidden">
      {/* Session Sidebar */}
      <SessionSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onNewSession={createNewSession}
        onSelectSession={switchSession}
        onDeleteSession={deleteSession}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border-b border-[#fcba28]/20 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-white/5 text-[#fcba28] transition-colors"
              title="Go back"
            >
              <FaArrowLeft size={20} />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/5 text-[#fcba28] transition-colors"
              title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <FaBars size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#272727] border border-[#fcba28]/20 flex items-center justify-center">
                <FaRobot className="text-[#fcba28] text-xl" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#fcba28] leading-tight">AI Career Consultant</h1>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.2)]"></span>
                  <span className="text-xs text-[#f9f4da]/70">Ready to help</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowProfile(!showProfile)}
            className="text-sm text-[#fcba28] hover:text-[#e9aa22] flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#fcba28]/10 transition-colors"
          >
            <FaCog />
            <span className="hidden sm:inline">{showProfile ? 'Hide Profile' : 'Customize Profile'}</span>
          </button>
        </div>

        {/* Profile Panel (Slide down) */}
        <AnimatePresence>
          {showProfile && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-[#272727] border-b border-[#fcba28]/20 overflow-hidden z-20"
            >
              <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-lg font-semibold text-[#fcba28] mb-4">Your Career Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-[#f9f4da]/70">Current Role</label>
                      <input
                        type="text"
                        value={careerProfile.currentRole}
                        onChange={(e) => handleProfileUpdate('currentRole', e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-[#fcba28]/20 rounded-xl px-4 py-2.5 text-sm text-[#f9f4da] focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] outline-none transition-all placeholder-[#f9f4da]/30"
                        placeholder="e.g., Software Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-[#f9f4da]/70">Target Role</label>
                      <input
                        type="text"
                        value={careerProfile.targetRole}
                        onChange={(e) => handleProfileUpdate('targetRole', e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-[#fcba28]/20 rounded-xl px-4 py-2.5 text-sm text-[#f9f4da] focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] outline-none transition-all placeholder-[#f9f4da]/30"
                        placeholder="e.g., Senior Engineer"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-[#f9f4da]/70">Skills</label>
                      <input
                        type="text"
                        value={careerProfile.skills.join(', ')}
                        onChange={(e) => handleProfileUpdate('skills', e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-[#fcba28]/20 rounded-xl px-4 py-2.5 text-sm text-[#f9f4da] focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] outline-none transition-all placeholder-[#f9f4da]/30"
                        placeholder="Comma separated"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-[#f9f4da]/70">Experience</label>
                      <input
                        type="text"
                        value={careerProfile.experience}
                        onChange={(e) => handleProfileUpdate('experience', e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-[#fcba28]/20 rounded-xl px-4 py-2.5 text-sm text-[#f9f4da] focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] outline-none transition-all placeholder-[#f9f4da]/30"
                        placeholder="e.g., 5 years"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#fcba28] scrollbar-track-[#1a1a1a]"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
              <div className="w-20 h-20 rounded-full bg-[#272727] border border-[#fcba28]/20 flex items-center justify-center mb-6 animate-float">
                <FaRobot className="w-10 h-10 text-[#fcba28]" />
              </div>
              <h2 className="text-2xl font-bold text-[#fcba28] mb-2">How can I help you today?</h2>
              <p className="text-[#f9f4da]/70 max-w-md">
                I can help you optimize your resume, prepare for interviews, or provide personalized career guidance.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#272727] border border-[#fcba28]/20 flex items-center justify-center flex-shrink-0">
                <FaRobot size={20} className="text-[#fcba28]" />
              </div>
              <div className="bg-[#272727] border border-[#fcba28]/20 rounded-[1.125rem] rounded-bl-md p-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#fcba28] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-[#fcba28] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-[#fcba28] rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#272727] border-t border-[#fcba28]/20">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3 items-end">
            <div className="relative flex-1 bg-[#1a1a1a] border border-[#fcba28]/25 rounded-2xl focus-within:border-[#fcba28] focus-within:ring-1 focus-within:ring-[#fcba28]/50 transition-all">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-transparent border-none px-4 py-3.5 text-[#f9f4da] placeholder-[#f9f4da]/50 focus:ring-0"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-colors ${isRecordingVoice
                  ? 'text-red-500 bg-red-500/10'
                  : 'text-[#fcba28]/70 hover:text-[#fcba28] hover:bg-[#fcba28]/10'
                  }`}
              >
                {isRecordingVoice ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
            </div>
            <button
              type="submit"
              className={`p-3.5 bg-gradient-to-br from-[#fcba28] to-[#e9aa22] text-[#1a1a1a] rounded-xl hover:shadow-[0_4px_12px_rgba(252,186,40,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none`}
              disabled={isLoading || !inputMessage.trim()}
            >
              {isLoading ? (
                <BeatLoader size={8} color="#1a1a1a" />
              ) : (
                <FaPaperPlane size={18} />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
