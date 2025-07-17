'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';
import { formatTime, formatDate } from '@/utils/interviewScheduler';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface TimeSlotSelectorProps {
  availableSlots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  selectedDate: string;
  onSelectSlot: (slot: TimeSlot) => void;
  onSelectDate: (date: string) => void;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  availableSlots,
  selectedSlot,
  selectedDate,
  onSelectSlot,
  onSelectDate,
}) => {
  // Generate next 7 days for date selection
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const availableDays = getNextDays();

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaCalendarAlt className="w-5 h-5 text-[#fcba28]" />
          <h3 className="text-lg font-semibold text-white">Select Date</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {availableDays.map((date) => (
            <motion.button
              key={date}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelectDate(date)}
              className={`p-3 rounded-lg text-center transition-all duration-200 ${
                selectedDate === date
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <div className="text-sm font-medium">{formatDate(date)}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaClock className="w-5 h-5 text-[#fcba28]" />
            <h3 className="text-lg font-semibold text-white">Available Times</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {availableSlots.map((slot) => (
              <motion.button
                key={slot.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => slot.isAvailable && onSelectSlot(slot)}
                disabled={!slot.isAvailable}
                className={`p-3 rounded-lg text-center transition-all duration-200 ${
                  selectedSlot?.id === slot.id
                    ? 'bg-[#fcba28] text-black'
                    : slot.isAvailable
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="text-sm font-medium">
                  {formatTime(slot.startTime)}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
