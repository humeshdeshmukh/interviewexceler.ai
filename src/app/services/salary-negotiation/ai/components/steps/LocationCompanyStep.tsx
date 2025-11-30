'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TargetCompanyInput } from '../TargetCompanyInput';

interface LocationCompanyStepProps {
    formData: {
        location: string;
        targetCompany: any;
    };
    onChange: (field: string, value: any) => void;
}

export function LocationCompanyStep({ formData, onChange }: LocationCompanyStepProps) {
    const [isDetecting, setIsDetecting] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const popularLocations = [
        'San Francisco',
        'New York',
        'Seattle',
        'Bangalore',
        'Mumbai',
        'London',
        'Singapore',
        'Remote'
    ];

    const detectLocation = async () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsDetecting(true);
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                });
            });

            // For demo, just set to a default location
            // In production, you'd use reverse geocoding API
            onChange('location', 'Current Location (Auto-detected)');
        } catch (error) {
            console.error('Error detecting location:', error);
            alert('Could not detect your location. Please enter it manually.');
        } finally {
            setIsDetecting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            <div>
                <h3 className="text-2xl font-bold text-[#fcba28] mb-2">Location & Company</h3>
                <p className="text-[#f9f4da]/70">Where are you looking to work?</p>
            </div>

            {/* Location */}
            <div className="space-y-3">
                <Label className="text-[#f9f4da]/90 font-medium">Location *</Label>

                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#fcba28]" />
                    <Input
                        placeholder="Enter your city or 'Remote'"
                        value={formData.location}
                        onChange={(e) => {
                            onChange('location', e.target.value);
                            setShowSuggestions(e.target.value.length > 0);
                        }}
                        className="pl-10 bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da] placeholder:text-[#f9f4da]/40 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28]/50 rounded-xl h-11 transition-all"
                        required
                    />
                    <Button
                        type="button"
                        onClick={detectLocation}
                        disabled={isDetecting}
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#fcba28] hover:text-[#fcba28]/80 hover:bg-[#fcba28]/10"
                    >
                        <Navigation className={`h-4 w-4 ${isDetecting ? 'animate-spin' : ''}`} />
                    </Button>
                </div>

                {/* Popular Locations */}
                <div className="mt-4">
                    <p className="text-xs text-[#f9f4da]/50 mb-3 font-medium uppercase tracking-wider">Popular locations</p>
                    <div className="flex flex-wrap gap-2">
                        {popularLocations.map((loc) => (
                            <button
                                key={loc}
                                type="button"
                                onClick={() => onChange('location', loc)}
                                className={`px-4 py-1.5 text-sm rounded-full transition-all border ${formData.location === loc
                                        ? 'bg-[#fcba28] text-[#1a1a1a] border-[#fcba28] font-medium shadow-[0_0_10px_rgba(252,186,40,0.3)]'
                                        : 'bg-[#1a1a1a] text-[#f9f4da]/70 border-[#fcba28]/20 hover:border-[#fcba28]/50 hover:text-[#f9f4da]'
                                    }`}
                            >
                                {loc}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Target Company */}
            <div className="space-y-3">
                <Label className="text-[#f9f4da]/90 font-medium">
                    Target Company <span className="text-[#f9f4da]/50 text-sm font-normal">(Optional)</span>
                </Label>
                <p className="text-sm text-[#f9f4da]/60">
                    Get company-specific salary insights
                </p>
                <TargetCompanyInput
                    onCompanySelect={(company) => onChange('targetCompany', company)}
                />
            </div>
        </motion.div>
    );
}
