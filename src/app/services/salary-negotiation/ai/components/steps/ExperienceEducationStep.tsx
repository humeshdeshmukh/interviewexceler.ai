'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ExperienceEducationStepProps {
    formData: {
        experience: string;
        education: string;
        managementLevel: string;
        currentSalary: string;
    };
    onChange: (field: string, value: string) => void;
}

export function ExperienceEducationStep({ formData, onChange }: ExperienceEducationStepProps) {
    const managementLevels = [
        'Individual Contributor',
        'Team Lead',
        'Manager',
        'Senior Manager',
        'Director',
        'Executive',
    ];

    const educationLevels = [
        'High School',
        'Associate',
        'Bachelor',
        'Master',
        'PhD',
        'MBA',
    ];

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold text-[#fcba28] mb-2">Your Experience & Education</h3>
                <p className="text-[#f9f4da]/70">This helps us understand your career level</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Years of Experience */}
                <div className="space-y-2">
                    <Label htmlFor="experience" className="text-[#f9f4da]/90 font-medium">Years of Experience *</Label>
                    <div className="relative">
                        <Input
                            id="experience"
                            type="number"
                            min="0"
                            max="50"
                            placeholder="e.g. 5"
                            className="bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da] placeholder:text-[#f9f4da]/40 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28]/50 rounded-xl h-11 transition-all"
                            value={formData.experience}
                            onChange={(e) => onChange('experience', e.target.value)}
                            required
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f9f4da]/40 text-sm">years</span>
                    </div>
                </div>

                {/* Education */}
                <div className="space-y-2">
                    <Label className="text-[#f9f4da]/90 font-medium">Highest Education *</Label>
                    <Select
                        value={formData.education}
                        onValueChange={(value) => onChange('education', value)}
                    >
                        <SelectTrigger className="w-full h-11 bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da] rounded-xl focus:ring-[#fcba28]/50">
                            <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da]">
                            {educationLevels.map((level) => (
                                <SelectItem
                                    key={level}
                                    value={level}
                                    className="focus:bg-[#fcba28]/20 focus:text-[#fcba28] cursor-pointer"
                                >
                                    {level}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Management Level */}
                <div className="space-y-2">
                    <Label className="text-[#f9f4da]/90 font-medium">Management Level</Label>
                    <Select
                        value={formData.managementLevel}
                        onValueChange={(value) => onChange('managementLevel', value)}
                    >
                        <SelectTrigger className="w-full h-11 bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da] rounded-xl focus:ring-[#fcba28]/50">
                            <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da]">
                            {managementLevels.map((level) => (
                                <SelectItem
                                    key={level}
                                    value={level}
                                    className="focus:bg-[#fcba28]/20 focus:text-[#fcba28] cursor-pointer"
                                >
                                    {level}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Current Salary */}
                <div className="space-y-2">
                    <Label htmlFor="currentSalary" className="text-[#f9f4da]/90 font-medium">
                        Current Salary <span className="text-[#f9f4da]/50 text-xs font-normal">(Optional)</span>
                    </Label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f9f4da]/40">$</span>
                        <Input
                            id="currentSalary"
                            type="number"
                            min="0"
                            placeholder="100000"
                            className="bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da] placeholder:text-[#f9f4da]/40 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28]/50 rounded-xl h-11 pl-8 transition-all"
                            value={formData.currentSalary}
                            onChange={(e) => onChange('currentSalary', e.target.value)}
                        />
                    </div>
                    <p className="text-xs text-[#f9f4da]/50 italic mt-1">💡 This helps us provide more accurate insights</p>
                </div>
            </div>
        </div>
    );
}
