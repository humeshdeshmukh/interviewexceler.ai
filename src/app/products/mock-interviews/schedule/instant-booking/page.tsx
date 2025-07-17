'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaArrowRight,
  FaArrowLeft,
  FaCheck
} from 'react-icons/fa';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface Interviewer {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  avatar: string;
  available: boolean;
}

export default function InstantBookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedInterviewer, setSelectedInterviewer] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Mock data
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '09:00 AM', available: true },
    { id: '2', time: '10:00 AM', available: true },
    { id: '3', time: '11:00 AM', available: true },
    { id: '4', time: '02:00 PM', available: true },
    { id: '5', time: '03:00 PM', available: true },
    { id: '6', time: '04:00 PM', available: true },
  ];

  const interviewers: Interviewer[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Software Engineer',
      expertise: ['React', 'Node.js', 'System Design'],
      avatar: '/avatars/interviewer1.jpg',
      available: true,
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Tech Lead',
      expertise: ['Java', 'Spring', 'Microservices'],
      avatar: '/avatars/interviewer2.jpg',
      available: true,
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Senior Frontend Engineer',
      expertise: ['React', 'TypeScript', 'UI/UX'],
      avatar: '/avatars/interviewer3.jpg',
      available: true,
    },
  ];

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedInterviewer || !mounted) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowConfirmation(true);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/products/mock-interviews/schedule" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaArrowLeft className="w-5 h-5 mr-2" />
            Back to Scheduling Options
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Date Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaCalendarAlt className="text-[#fcba28]" />
                Select Date
              </h2>
              <input
                type="date"
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
              />
            </motion.div>

            {/* Time Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaClock className="text-[#fcba28]" />
                Select Time
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {timeSlots.map((slot) => (
                  <motion.button
                    key={slot.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`p-4 rounded-lg text-center transition-all ${
                      selectedTime === slot.time
                        ? 'bg-[#fcba28] text-black'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {slot.time}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Interviewer Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaUser className="text-[#fcba28]" />
                Select Interviewer
              </h2>
              <div className="space-y-4">
                {interviewers.map((interviewer) => (
                  <motion.button
                    key={interviewer.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedInterviewer(interviewer.id)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedInterviewer === interviewer.id
                        ? 'bg-[#fcba28]/20 border-[#fcba28]'
                        : 'bg-white/5 hover:bg-white/10'
                    } border`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <FaUser className="w-6 h-6 text-[#fcba28]" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{interviewer.name}</div>
                        <div className="text-sm text-gray-400">{interviewer.role}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Book Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime || !selectedInterviewer || isLoading}
                className={`px-8 py-4 rounded-lg font-medium flex items-center gap-2 ${
                  !selectedDate || !selectedTime || !selectedInterviewer || isLoading
                    ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                    : 'bg-[#fcba28] text-black'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <FaCheck className="w-5 h-5" />
                    Confirm Booking
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence mode="wait">
        {showConfirmation && mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-8 max-w-md w-full border border-[#fcba28]/20"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#fcba28]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="w-8 h-8 text-[#fcba28]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Interview Scheduled!</h2>
                <p className="text-gray-400 mt-2">
                  Your mock interview has been scheduled successfully.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <FaCalendarAlt className="w-5 h-5 text-[#fcba28]" />
                  <span>{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaClock className="w-5 h-5 text-[#fcba28]" />
                  <span>{selectedTime}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaUser className="w-5 h-5 text-[#fcba28]" />
                  <span>{interviewers.find(i => i.id === selectedInterviewer)?.name}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/dashboard" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-[#fcba28] text-black rounded-lg font-medium"
                  >
                    Go to Dashboard
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-6 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
