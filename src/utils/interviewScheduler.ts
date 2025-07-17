interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface Interviewer {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  availability: TimeSlot[];
  timezone: string;
}

interface InterviewType {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

interface BookingDetails {
  interviewerId: string;
  candidateId: string;
  interviewType: string;
  dateTime: string;
  timezone: string;
  specialRequirements?: string;
}

// Mock data for interview types
export const interviewTypes: InterviewType[] = [
  {
    id: 'technical',
    name: 'Technical Interview',
    duration: 60,
    price: 99,
    description: 'Deep dive into technical skills, coding problems, and system design'
  },
  {
    id: 'behavioral',
    name: 'Behavioral Interview',
    duration: 45,
    price: 79,
    description: 'Focus on soft skills, past experiences, and situational questions'
  },
  {
    id: 'system-design',
    name: 'System Design Interview',
    duration: 90,
    price: 149,
    description: 'Complex system architecture discussions and scalability challenges'
  },
  {
    id: 'full-loop',
    name: 'Full Interview Loop',
    duration: 180,
    price: 299,
    description: 'Complete interview experience with multiple rounds and comprehensive feedback'
  }
];

// Mock data for interviewers
export const interviewers: Interviewer[] = [
  {
    id: 'int1',
    name: 'Alex Thompson',
    expertise: ['Frontend', 'React', 'JavaScript'],
    rating: 4.8,
    availability: generateMockAvailability(),
    timezone: 'UTC-8'
  },
  {
    id: 'int2',
    name: 'Sarah Chen',
    expertise: ['Backend', 'System Design', 'Python'],
    rating: 4.9,
    availability: generateMockAvailability(),
    timezone: 'UTC-5'
  },
  {
    id: 'int3',
    name: 'Michael Rodriguez',
    expertise: ['Full Stack', 'Cloud Architecture', 'Java'],
    rating: 4.7,
    availability: generateMockAvailability(),
    timezone: 'UTC+1'
  },
  {
    id: 'int4',
    name: 'Priya Patel',
    expertise: ['Mobile Development', 'iOS', 'Android'],
    rating: 4.9,
    availability: generateMockAvailability(),
    timezone: 'UTC+5:30'
  }
];

function generateMockAvailability(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const today = new Date();
  
  // Generate slots for the next 7 days
  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    
    // Generate 8 slots per day
    for (let hour = 9; hour < 17; hour++) {
      const startTime = new Date(date);
      startTime.setHours(hour, 0, 0);
      
      const endTime = new Date(date);
      endTime.setHours(hour + 1, 0, 0);
      
      slots.push({
        id: `slot-${day}-${hour}`,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        isAvailable: Math.random() > 0.3 // 70% chance of being available
      });
    }
  }
  
  return slots;
}

export const getAvailableSlots = (
  interviewerId: string,
  date: string
): TimeSlot[] => {
  const interviewer = interviewers.find(int => int.id === interviewerId);
  if (!interviewer) return [];
  
  const selectedDate = new Date(date);
  return interviewer.availability.filter(slot => {
    const slotDate = new Date(slot.startTime);
    return (
      slotDate.getDate() === selectedDate.getDate() &&
      slotDate.getMonth() === selectedDate.getMonth() &&
      slotDate.getFullYear() === selectedDate.getFullYear() &&
      slot.isAvailable
    );
  });
};

export const bookInterview = async (details: BookingDetails): Promise<boolean> => {
  // In a real implementation, this would make an API call to book the interview
  console.log('Booking interview with details:', details);
  return true;
};

export const formatTime = (isoString: string): string => {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDate = (isoString: string): string => {
  return new Date(isoString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
