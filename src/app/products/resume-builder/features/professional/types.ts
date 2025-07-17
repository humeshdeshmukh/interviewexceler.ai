export interface Package {
  name: string;
  price: number;
  turnaround: string;
  isPopular: boolean;
  features: string[];
}

export interface Writer {
  id: string;
  name: string;
  title: string;
  experience: string;
  specialties: string[];
  rating: number;
  reviews: number;
  availability: 'Available' | 'Limited' | 'Busy';
  description: string;
  certifications: string[];
  languages: string[];
  packages: {
    [key: string]: Package;
  };
  calendar?: {
    availableDates: string[];
    availableTimes: string[];
  };
}
