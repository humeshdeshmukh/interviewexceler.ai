'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Save, User, Briefcase, FileText, Check, AlertCircle, Upload, Code, Target, GraduationCap } from 'lucide-react';
import { supabaseService } from '@/app/products/mock-interviews/visual-simulation/simulation/services/supabaseService';
import { useAuth } from '@/features/auth/context/AuthContext';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Header } from '@/components/Header';

export default function ProfilePage() {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [targetRole, setTargetRole] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('Entry Level');
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState('');
    const [education, setEducation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            loadProfile();
        }
    }, [user]);

    const parsePDF = async (file: File): Promise<string> => {
        try {
            const pdfjsLib = await import('pdfjs-dist');
            pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item: any) => item.str).join(' ');
                fullText += pageText + '\n';
            }
            return fullText;
        } catch (error) {
            console.error('PDF parsing error:', error);
            throw new Error('Failed to parse PDF');
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB');
            return;
        }

        setResumeFile(file);
        setError('');

        try {
            let text = '';
            if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
                text = await parsePDF(file);
            } else {
                text = await file.text();
            }
            setResumeText(text);
            setSuccessMessage('Resume uploaded successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to read file');
        }
    };

    const loadProfile = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const profile = await supabaseService.getUserProfile(user.id);
            if (profile) {
                setName(profile.name || '');
                setTargetRole(profile.target_role || '');
                setExperienceLevel(profile.experience_level || 'Entry Level');

                if (profile.preferences) {
                    if (profile.preferences.resume_text) {
                        setResumeText(profile.preferences.resume_text);
                    }
                    if (profile.preferences.job_description) {
                        setJobDescription(profile.preferences.job_description);
                    }
                    if (profile.preferences.education) {
                        setEducation(profile.preferences.education);
                    }
                }

                if (profile.skills && Array.isArray(profile.skills)) {
                    setSkills(profile.skills);
                }
            }
        } catch (err) {
            console.error('Error loading profile:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleSave = async () => {
        if (!user) return;
        setIsSaving(true);
        setError('');
        setSuccessMessage('');

        try {
            await supabaseService.updateUserProfile(user.id, {
                name: name,
                target_role: targetRole,
                experience_level: experienceLevel,
                skills: skills,
                preferences: {
                    resume_text: resumeText,
                    job_description: jobDescription,
                    education: education,
                    updated_at: new Date().toISOString()
                }
            });
            setSuccessMessage('Profile saved successfully!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (err: any) {
            console.error('Error saving profile:', err);
            setError(err.message || 'Failed to save profile');
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-background pt-24">
                <Header />
                <MaxWidthWrapper>
                    <div className="flex flex-col items-center justify-center py-20">
                        <h1 className="text-2xl font-bold text-foreground mb-4">Please sign in to view your profile</h1>
                    </div>
                </MaxWidthWrapper>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <Header />
            <MaxWidthWrapper>
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">Your Interview Profile</h1>
                        <p className="text-muted-foreground">Complete your profile to get personalized AI-powered interview practice and feedback.</p>
                    </div>

                    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-6 md:p-8 space-y-8">
                            {isLoading ? (
                                <div className="flex justify-center py-12">
                                    <div className="w-8 h-8 border-2 border-[#fcba28] border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : (
                                <>
                                    {error && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                                            <AlertCircle className="w-5 h-5" />
                                            <span className="text-sm">{error}</span>
                                        </div>
                                    )}

                                    {successMessage && (
                                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400">
                                            <Check className="w-5 h-5" />
                                            <span className="text-sm">{successMessage}</span>
                                        </div>
                                    )}

                                    {/* Basic Information */}
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                            <User className="w-5 h-5 text-[#fcba28]" />
                                            Basic Information
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-foreground focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-all outline-none"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground">Your name for interview practice</p>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Experience Level</label>
                                                <select
                                                    value={experienceLevel}
                                                    onChange={(e) => setExperienceLevel(e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-foreground focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-all outline-none cursor-pointer"
                                                >
                                                    <option value="Entry Level">Entry Level (0-2 years)</option>
                                                    <option value="Mid Level">Mid Level (3-5 years)</option>
                                                    <option value="Senior Level">Senior Level (5-8 years)</option>
                                                    <option value="Lead/Manager">Lead/Manager (8+ years)</option>
                                                    <option value="Executive">Executive</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">Target Role</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="text"
                                                    value={targetRole}
                                                    onChange={(e) => setTargetRole(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-foreground focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-all outline-none"
                                                    placeholder="e.g. Senior Software Engineer, Product Manager"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">Education</label>
                                            <div className="relative">
                                                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="text"
                                                    value={education}
                                                    onChange={(e) => setEducation(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-foreground focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-all outline-none"
                                                    placeholder="e.g. B.S. Computer Science, MIT"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                            <Code className="w-5 h-5 text-[#fcba28]" />
                                            Skills
                                        </h2>

                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                                className="flex-1 px-4 py-2.5 bg-background border border-input rounded-xl text-foreground focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-all outline-none"
                                                placeholder="Add a skill (e.g. React, Python, Leadership)"
                                            />
                                            <button
                                                onClick={handleAddSkill}
                                                className="px-6 py-2.5 bg-[#fcba28]/10 hover:bg-[#fcba28]/20 text-[#fcba28] font-medium rounded-xl transition-all"
                                            >
                                                Add
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#fcba28]/10 border border-[#fcba28]/20 text-foreground rounded-lg text-sm"
                                                >
                                                    {skill}
                                                    <button
                                                        onClick={() => handleRemoveSkill(skill)}
                                                        className="text-muted-foreground hover:text-red-400 transition-colors"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Resume */}
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-[#fcba28]" />
                                            Resume / CV
                                        </h2>

                                        <div className="space-y-4">
                                            <div>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept=".pdf,.doc,.docx,.txt"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                <button
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="flex items-center gap-2 px-4 py-2.5 bg-background border border-input hover:border-[#fcba28] rounded-xl text-foreground transition-all"
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    {resumeFile ? resumeFile.name : 'Upload Resume (PDF, DOC, TXT)'}
                                                </button>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Or paste your resume text</label>
                                                <textarea
                                                    value={resumeText}
                                                    onChange={(e) => setResumeText(e.target.value)}
                                                    className="w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-all outline-none min-h-[200px] resize-y text-sm leading-relaxed"
                                                    placeholder="Paste your complete resume or professional summary here..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Job Description */}
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                            <Target className="w-5 h-5 text-[#fcba28]" />
                                            Target Job Description (Optional)
                                        </h2>

                                        <div className="space-y-2">
                                            <label className="text-sm text-muted-foreground">Paste the job description you're preparing for</label>
                                            <textarea
                                                value={jobDescription}
                                                onChange={(e) => setJobDescription(e.target.value)}
                                                className="w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] transition-all outline-none min-h-[150px] resize-y text-sm leading-relaxed"
                                                placeholder="Paste the job description here to get tailored interview questions..."
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="p-6 border-t border-border bg-muted/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <p className="text-sm text-muted-foreground">
                                This information helps AI provide personalized interview practice
                            </p>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button
                                    onClick={() => {
                                        if (targetRole || resumeText) {
                                            window.location.href = '/products/mock-interviews/visual-simulation/simulation';
                                        } else {
                                            setError('Please save your profile first to get personalized interviews');
                                        }
                                    }}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-background border border-[#fcba28] hover:bg-[#fcba28]/10 text-[#fcba28] font-semibold rounded-xl transition-all"
                                >
                                    <Briefcase className="w-4 h-4" />
                                    Start Mock Interview
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving || isLoading}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-[#fcba28] hover:bg-[#fcd978] text-black font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#fcba28]/20"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Save Profile
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
}
