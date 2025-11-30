"use client";

import { useState } from 'react';
import { PageContainer } from '../../components/ui';
import { UserCog, Star, Calendar, Clock, CheckCircle2, Award, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { WriterProfile } from './components/WriterProfile';
import ScheduleModal from './components/ScheduleModal';
import type { Writer } from './types';

const writers: Writer[] = [
  {
    id: 'w1',
    name: 'Sarah Johnson',
    title: 'Senior Resume Consultant',
    experience: '8+ years',
    specialties: ['Tech', 'Finance', 'Executive'],
    rating: 4.9,
    reviews: 324,
    availability: 'Available',
    description: 'Expert in crafting compelling resumes for tech and finance professionals. Certified resume writer with a proven track record.',
    certifications: [
      'Certified Professional Resume Writer (CPRW)',
      'Certified Career Management Coach (CCMC)',
      'LinkedIn Profile Optimization Specialist'
    ],
    languages: ['English', 'Spanish'],
    packages: {
      basic: {
        name: 'Basic',
        price: 5,
        turnaround: '3-5 business days',
        isPopular: false,
        features: [
          'Professional Resume Writing',
          'ATS Optimization',
          'One Revision Round',
          'Digital Delivery'
        ]
      },
      premium: {
        name: 'Premium',
        price: 10,
        turnaround: '2-3 business days',
        isPopular: true,
        features: [
          'Everything in Basic',
          'Cover Letter',
          'LinkedIn Profile Update',
          'Unlimited Revisions',
          'Priority Support'
        ]
      },
      executive: {
        name: 'Executive',
        price: 15,
        turnaround: '1-2 business days',
        isPopular: false,
        features: [
          'Everything in Premium',
          'Executive Bio',
          'Interview Preparation',
          'Career Strategy Session',
          'Job Search Strategy'
        ]
      }
    }
  },
  {
    id: 'w2',
    name: 'Michael Chen',
    title: 'Tech Industry Specialist',
    experience: '6+ years',
    specialties: ['Software', 'Data Science', 'Startups'],
    rating: 4.8,
    reviews: 256,
    availability: 'Limited',
    description: 'Former tech recruiter turned resume writer. Specializes in helping software engineers and data scientists land their dream jobs.',
    certifications: [
      'Certified Professional Resume Writer (CPRW)',
      'Technical Resume Specialist',
      'Career Transition Coach'
    ],
    languages: ['English', 'Mandarin'],
    packages: {
      basic: {
        name: 'Basic',
        price: 5,
        turnaround: '3-5 business days',
        isPopular: false,
        features: [
          'Technical Resume Writing',
          'ATS Optimization',
          'One Revision Round',
          'Digital Delivery'
        ]
      },
      premium: {
        name: 'Premium',
        price: 10,
        turnaround: '2-3 business days',
        isPopular: true,
        features: [
          'Everything in Basic',
          'GitHub Profile Review',
          'LinkedIn Optimization',
          'Unlimited Revisions',
          'Technical Interview Tips'
        ]
      },
      executive: {
        name: 'Executive',
        price: 15,
        turnaround: '1-2 business days',
        isPopular: false,
        features: [
          'Everything in Premium',
          'Portfolio Review',
          'Technical Interview Prep',
          'Salary Negotiation Tips',
          'Career Strategy Session'
        ]
      }
    }
  }
];

export default function ProfessionalWriterPage() {
  const [selectedWriter, setSelectedWriter] = useState<Writer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  // Get unique specialties from all writers
  const allSpecialties = Array.from(
    new Set(writers.flatMap(writer => writer.specialties))
  );

  // Filter writers based on search and specialties
  const filteredWriters = writers.filter(writer => {
    const matchesSearch = writer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      writer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      writer.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialties = selectedSpecialties.length === 0 ||
      selectedSpecialties.some(specialty => writer.specialties.includes(specialty));

    return matchesSearch && matchesSpecialties;
  });

  return (
    <PageContainer
      badge={{
        icon: UserCog,
        text: "Professional Resume Writers"
      }}
      title={{
        main: "Work with",
        highlight: "Expert Writers",
        end: "for Your Resume"
      }}
      description="Get personalized guidance from certified professional resume writers"
    >
      <div className="space-y-8">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search by name, title, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
              />
            </div>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <Filter className="w-5 h-5" />
              <span>Specialties</span>
            </button>
            <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-xl border border-white/10 p-4 hidden group-hover:block">
              <div className="space-y-2">
                {allSpecialties.map((specialty) => (
                  <label key={specialty} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSpecialties.includes(specialty)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSpecialties([...selectedSpecialties, specialty]);
                        } else {
                          setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
                        }
                      }}
                      className="form-checkbox text-[#fcba28] rounded"
                    />
                    <span>{specialty}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Writers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWriters.map((writer, index) => (
            <WriterProfile
              key={writer.id}
              writer={writer}
              onSchedule={() => {
                setSelectedWriter(writer);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredWriters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-white/60">No writers found matching your criteria.</p>
          </div>
        )}
      </div>

      {selectedWriter && (
        <ScheduleModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedWriter(null);
          }}
          writer={selectedWriter}
        />
      )}
    </PageContainer>
  );
}
