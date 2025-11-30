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

interface BasicInfoStepProps {
    formData: {
        role: string;
        industry: string;
        companySize: string;
        workMode: string;
        employmentType: string;
    };
    onChange: (field: string, value: string) => void;
}

export function BasicInfoStep({ formData, onChange }: BasicInfoStepProps) {
    const companySizes = [
        'Startup (1-50)',
        'Small (51-200)',
        'Medium (201-1000)',
        'Large (1001-5000)',
        'Enterprise (5000+)',
    ];

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold text-[#fcba28] mb-2">Let's start with the basics</h3>
                <p className="text-[#f9f4da]/70">Tell us about your current or desired role</p>
            </div>

            {/* Role */}
            <div className="space-y-2">
                <Label htmlFor="role" className="text-[#f9f4da]/90 font-medium">Role / Position *</Label>
                <Input
                    id="role"
                    placeholder="e.g. Senior Software Engineer"
                    className="bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da] placeholder:text-[#f9f4da]/40 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28]/50 rounded-xl h-11 transition-all"
                    value={formData.role}
                    onChange={(e) => onChange('role', e.target.value)}
                    required
                />
            </div>

            {/* Industry */}
            <div className="space-y-2">
                <Label htmlFor="industry" className="text-[#f9f4da]/90 font-medium">Industry *</Label>
                <Input
                    id="industry"
                    placeholder="e.g. Technology, Finance, Healthcare"
                    className="bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da] placeholder:text-[#f9f4da]/40 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28]/50 rounded-xl h-11 transition-all"
                    value={formData.industry}
                    onChange={(e) => onChange('industry', e.target.value)}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Size */}
                <div className="space-y-2">
                    <Label className="text-[#f9f4da]/90 font-medium">Company Size</Label>
                    <Select
                        value={formData.companySize}
                        onValueChange={(value) => onChange('companySize', value)}
                    >
                        <SelectTrigger className="w-full h-11 bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da] rounded-xl focus:ring-[#fcba28]/50">
                            <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da]">
                            {companySizes.map((size) => (
                                <SelectItem
                                    key={size}
                                    value={size}
                                    className="focus:bg-[#fcba28]/20 focus:text-[#fcba28] cursor-pointer"
                                >
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Work Mode */}
                <div className="space-y-2">
                    <Label className="text-[#f9f4da]/90 font-medium">Work Mode</Label>
                    <Select
                        value={formData.workMode}
                        onValueChange={(value) => onChange('workMode', value)}
                    >
                        <SelectTrigger className="w-full h-11 bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da] rounded-xl focus:ring-[#fcba28]/50">
                            <SelectValue placeholder="Select work mode" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da]">
                            <SelectItem value="onsite" className="focus:bg-[#fcba28]/20 focus:text-[#fcba28] cursor-pointer">On-site</SelectItem>
                            <SelectItem value="remote" className="focus:bg-[#fcba28]/20 focus:text-[#fcba28] cursor-pointer">Remote</SelectItem>
                            <SelectItem value="hybrid" className="focus:bg-[#fcba28]/20 focus:text-[#fcba28] cursor-pointer">Hybrid</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Employment Type */}
            <div className="space-y-2">
                <Label className="text-[#f9f4da]/90 font-medium">Employment Type</Label>
                <div className="flex gap-3 p-1 bg-[#1a1a1a] rounded-xl border border-[#fcba28]/25">
                    {['full-time', 'part-time', 'contract'].map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => onChange('employmentType', type)}
                            className={`flex-1 px-4 py-2 rounded-lg transition-all font-medium capitalize text-sm ${formData.employmentType === type
                                ? 'bg-[#fcba28] text-[#1a1a1a] shadow-lg'
                                : 'text-[#f9f4da]/60 hover:text-[#f9f4da] hover:bg-white/5'
                                }`}
                        >
                            {type.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
