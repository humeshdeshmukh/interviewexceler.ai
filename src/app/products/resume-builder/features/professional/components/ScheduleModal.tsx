"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, AlertCircle, ArrowRight, Package } from 'lucide-react';
import { Button } from '../../../components/ui';
import type { Writer, Package } from '../types';
import toast from 'react-hot-toast'; // Import toast

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  writer: Writer;
}

const ScheduleModal = ({ isOpen, onClose, writer }: ScheduleModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [step, setStep] = useState<'package' | 'datetime' | 'details'>('package');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentRole: '',
    targetRole: '',
    notes: ''
  });

  // Generate next 14 days
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const handleNext = () => {
    if (step === 'package' && selectedPackage) {
      setStep('datetime');
    } else if (step === 'datetime' && selectedDate && selectedTime) {
      setStep('details');
    }
  };

  const handleBack = () => {
    if (step === 'datetime') {
      setStep('package');
    } else if (step === 'details') {
      setStep('datetime');
    }
  };

  const handleSubmit = async () => {
    try {
      const bookingData = {
        writerId: writer.id,
        packageId: selectedPackage,
        date: selectedDate,
        time: selectedTime,
        ...formData
      };

      const response = await fetch('/api/send-resume-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit request');
      }

      toast.success('Your resume writing session has been scheduled successfully!');
      onClose();
    } catch (err) {
      console.error('Booking submission error:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to schedule session. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-900 rounded-xl w-full max-w-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Schedule with {writer.name}</h3>
              <p className="text-sm text-white/60">{writer.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {['package', 'datetime', 'details'].map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${step === s ? 'bg-[#fcba28] text-black' :
                    step > s ? 'bg-green-500 text-white' :
                    'bg-white/10 text-white/60'}
                `}>
                  {i + 1}
                </div>
                {i < 2 && (
                  <div className={`w-20 h-0.5 ${
                    step > s ? 'bg-green-500' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Package Selection */}
          {step === 'package' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(writer.packages).map(([key, pkg]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPackage(key)}
                    className={`p-4 rounded-lg text-left transition-all relative ${
                      selectedPackage === key
                        ? 'bg-[#fcba28] text-black'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {pkg.isPopular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs bg-[#fcba28]/20 text-[#fcba28] px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="space-y-2">
                      <span className="block font-medium">{pkg.name}</span>
                      <span className="block text-lg font-semibold">${pkg.price}</span>
                      <span className="block text-sm opacity-80">{pkg.turnaround}</span>
                      <ul className="text-sm space-y-1 mt-4">
                        {pkg.features?.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Date & Time Selection */}
          {step === 'datetime' && (
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Select Date</label>
                <div className="grid grid-cols-4 gap-2">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-lg text-sm transition-colors ${
                        selectedDate === date
                          ? 'bg-[#fcba28] text-black'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Select Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg text-sm transition-colors ${
                        selectedTime === time
                          ? 'bg-[#fcba28] text-black'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact Details */}
          {step === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
                  placeholder="Your phone number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Role</label>
                  <input
                    type="text"
                    value={formData.currentRole}
                    onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                    className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
                    placeholder="Your current position"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Target Role</label>
                  <input
                    type="text"
                    value={formData.targetRole}
                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                    className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
                    placeholder="Position you're targeting"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28] h-32 resize-none"
                  placeholder="Any specific requirements or questions..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <div className="flex justify-between gap-4">
            {step !== 'package' && (
              <Button
                variant="secondary"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            
            {step === 'details' ? (
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email}
              >
                Confirm Booking
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleNext}
                disabled={
                  (step === 'package' && !selectedPackage) ||
                  (step === 'datetime' && (!selectedDate || !selectedTime))
                }
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          {step === 'datetime' && (
            <p className="text-sm text-white/60 text-center mt-4 flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" />
              All times are in your local timezone
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ScheduleModal;
