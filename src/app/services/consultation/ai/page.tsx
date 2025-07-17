"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaUserCircle, FaCog, FaMicrophone, FaMicrophoneSlash, FaCompass } from 'react-icons/fa';
import { getGeminiResponse } from './gemini-service';
import { BeatLoader } from 'react-spinners';
import { TypingLoader } from './components/TypingLoader';
import { useVoiceRecording } from '@/lib/hooks/useVoiceRecording';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BrainCircuit, 
  FileText, 
  MessageSquare, 
  Briefcase,
  GraduationCap,
  Target
} from 'lucide-react';

interface CareerProfile {
  experience: string;
  skills: string[];
  interests: string[];
  education: string;
  currentRole: string;
  targetRole: string;
  industry: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const consultationTopics = [
  {
    id: 'career-guidance',
    title: 'Career Guidance',
    icon: FaCompass,
    systemPrompt: `As a career guidance expert, provide personalized advice considering:
      - Current industry trends and market demands
      - Career growth opportunities
      - Skills development needs
      - Work-life balance
      - Professional networking
      - Long-term career planning`
  }
];

export default function AIConsultationPage() {
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const { 
    isRecording: isRecordingVoice, 
    startRecording, 
    stopRecording, 
    transcript 
  } = useVoiceRecording();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial greeting message
  useEffect(() => {
    const initialMessage: Message = {
      id: 'initial',
      role: 'assistant',
      content: "Hi! I'm Sarah Chen, your AI career consultant. I'm here to help you with your career journey. Feel free to ask me anything about your career goals, challenges, or development opportunities. I'm here to provide personalized guidance and support!",
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, []);

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
      if (transcript) {
        setInputMessage(transcript);
      }
    } else {
      startRecording();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(inputMessage, showProfile ? careerProfile : undefined);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an issue. Could you please try asking your question again?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-purple-900/30 mb-6"
          >
            <FaRobot className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            AI Career Consultation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Get personalized career guidance powered by advanced AI
          </motion.p>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <FaCog className="text-[#fcba28]" />
            {showProfile ? 'Hide Profile' : 'Update Profile'}
          </button>
        </div>

        {/* Profile Form */}
        {showProfile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Career Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Experience Level</label>
                <input
                  type="text"
                  value={careerProfile.experience}
                  onChange={(e) => handleProfileUpdate('experience', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., 5 years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={careerProfile.skills.join(', ')}
                  onChange={(e) => handleProfileUpdate('skills', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., JavaScript, Python, React"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Interests (comma-separated)</label>
                <input
                  type="text"
                  value={careerProfile.interests.join(', ')}
                  onChange={(e) => handleProfileUpdate('interests', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., AI, Web Development, Data Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Education</label>
                <input
                  type="text"
                  value={careerProfile.education}
                  onChange={(e) => handleProfileUpdate('education', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., Bachelor's in Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Current Role</label>
                <input
                  type="text"
                  value={careerProfile.currentRole}
                  onChange={(e) => handleProfileUpdate('currentRole', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., Software Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Role</label>
                <input
                  type="text"
                  value={careerProfile.targetRole}
                  onChange={(e) => handleProfileUpdate('targetRole', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Industry</label>
                <input
                  type="text"
                  value={careerProfile.industry}
                  onChange={(e) => handleProfileUpdate('industry', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., Technology"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={careerProfile.location}
                  onChange={(e) => handleProfileUpdate('location', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
            </div>

            {/* External Profile Links */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-[#fcba28]">External Profiles</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={careerProfile.linkedinUrl}
                    onChange={(e) => handleProfileUpdate('linkedinUrl', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={careerProfile.githubUrl}
                    onChange={(e) => handleProfileUpdate('githubUrl', e.target.value)}
                    placeholder="https://github.com/yourusername"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Portfolio URL</label>
                  <input
                    type="url"
                    value={careerProfile.portfolioUrl}
                    onChange={(e) => handleProfileUpdate('portfolioUrl', e.target.value)}
                    placeholder="https://yourportfolio.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Consultation Topics */}
        <Tabs value={consultationTopics[0].id} onValueChange={(value) => console.log(value)} className="mb-4">
          <TabsList className="grid grid-cols-1 gap-2">
            {consultationTopics.map((topic) => (
              <TabsTrigger
                key={topic.id}
                value={topic.id}
                className="flex items-center space-x-2 p-2"
              >
                <topic.icon className="w-4 h-4" />
                <span>{topic.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Chat Interface */}
        <div className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg p-6">
          {/* Messages */}
          <div ref={chatContainerRef} className="min-h-[400px] max-h-[600px] overflow-y-auto mb-6 space-y-4 pr-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-xl ${
                      message.role === 'user'
                        ? 'bg-[#fcba28] text-black'
                        : 'bg-white/10 backdrop-blur-sm text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[80%] p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <TypingLoader />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about your career..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`px-6 py-2 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200 flex items-center gap-2 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <BeatLoader size={8} color="#000000" />
              ) : (
                <>
                  Send
                  <FaPaperPlane />
                </>
              )}
            </button>
            <button
              onClick={handleVoiceInput}
              className={`p-2 rounded-full ${
                isRecordingVoice ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isRecordingVoice ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: '24/7 Availability',
              description: 'Get instant guidance anytime, anywhere',
              icon: '⏰'
            },
            {
              title: 'Personalized Advice',
              description: 'Tailored recommendations based on your profile',
              icon: '🎯'
            },
            {
              title: 'Data-Driven Insights',
              description: 'Backed by industry trends and market data',
              icon: '📊'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
