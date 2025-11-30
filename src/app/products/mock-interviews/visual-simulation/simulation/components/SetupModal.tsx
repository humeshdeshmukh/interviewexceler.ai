import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Check, AlertCircle, Sparkles, Target, ChevronRight, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SetupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStart: (data: { resumeText: string; jobDescription: string; goal: string; crossQuestioning: boolean; handsFreeMode: boolean; questionFlowType: 'Technical' | 'Behavioral' | 'Mixed' }) => void;
}

export default function SetupModal({ isOpen, onClose, onStart }: SetupModalProps) {
    const [step, setStep] = useState<'upload' | 'goal'>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [goal, setGoal] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [crossQuestioning, setCrossQuestioning] = useState(false);
    const [handsFreeMode, setHandsFreeMode] = useState(false);
    const [questionFlowType, setQuestionFlowType] = useState<'Technical' | 'Behavioral' | 'Mixed'>('Mixed');
    const fileInputRef = useRef<HTMLInputElement>(null);

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
            throw new Error('Failed to parse PDF. Please try a different file format.');
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        if (selectedFile.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB');
            return;
        }

        setFile(selectedFile);
        setError('');
        setIsProcessing(true);

        try {
            let text = '';

            if (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf')) {
                text = await parsePDF(selectedFile);
            } else {
                text = await selectedFile.text();
            }

            if (!text || text.trim().length < 50) {
                setError('Resume seems too short. Please upload a complete resume.');
                setIsProcessing(false);
                return;
            }

            setResumeText(text);
            setStep('goal');
        } catch (err: any) {
            setError(err.message || 'Failed to read file. Please try a different format.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSubmit = () => {
        if (!resumeText && !jobDescription && !goal) {
            setError('Please provide at least your target role to continue.');
            return;
        }
        if (!goal.trim()) {
            setError('Target role is required to personalize your interview.');
            return;
        }
        onStart({ resumeText, jobDescription, goal, crossQuestioning, handsFreeMode, questionFlowType });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-3xl max-h-[90vh] overflow-auto"
                    >
                        <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#1f1f1f] to-[#1a1a1a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                            {/* Decorative gradient overlay */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28]" />

                            {/* Progress indicator */}
                            <div className="absolute top-5 right-20 flex items-center gap-2">
                                <div className={`w-8 h-1 rounded-full transition-all duration-300 ${step === 'upload' ? 'bg-[#fcba28]' : 'bg-white/20'}`} />
                                <div className={`w-8 h-1 rounded-full transition-all duration-300 ${step === 'goal' ? 'bg-[#fcba28]' : 'bg-white/20'}`} />
                            </div>

                            {/* Header */}
                            <div className="relative p-8 pb-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <motion.div
                                            key={step}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center gap-3 mb-2"
                                        >
                                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#fcba28]/20 to-[#fcd978]/10 border border-[#fcba28]/20">
                                                {step === 'upload' ? (
                                                    <Upload className="w-5 h-5 text-[#fcba28]" />
                                                ) : (
                                                    <Target className="w-5 h-5 text-[#fcba28]" />
                                                )}
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-white">
                                                    {step === 'upload' ? 'Setup Your Interview' : 'Customize Experience'}
                                                </h2>
                                                <p className="text-sm text-gray-400 mt-0.5">
                                                    {step === 'upload'
                                                        ? 'Step 1 of 2 • Upload your resume (optional)'
                                                        : 'Step 2 of 2 • Tell us about your goals'}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-all hover:rotate-90 duration-300"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-8 pb-6">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400"
                                    >
                                        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm">{error}</span>
                                    </motion.div>
                                )}

                                <AnimatePresence mode="wait">
                                    {step === 'upload' ? (
                                        <motion.div
                                            key="upload"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            {/* Upload Area */}
                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                className="relative border-2 border-dashed border-white/20 rounded-2xl p-10 text-center cursor-pointer hover:border-[#fcba28]/50 hover:bg-gradient-to-br hover:from-white/5 hover:to-[#fcba28]/5 transition-all duration-300 group overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    accept=".txt,.md,.pdf,application/pdf"
                                                    className="hidden"
                                                />
                                                <div className="relative">
                                                    <motion.div
                                                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#fcba28]/20 to-[#fcd978]/10 flex items-center justify-center mx-auto mb-4 border border-[#fcba28]/20"
                                                        whileHover={{ scale: 1.05, rotate: 5 }}
                                                        transition={{ type: "spring", stiffness: 400 }}
                                                    >
                                                        <Upload className="w-9 h-9 text-[#fcba28]" />
                                                    </motion.div>
                                                    <h3 className="text-white font-semibold text-lg mb-2">Drop your resume here</h3>
                                                    <p className="text-gray-400 text-sm mb-4">or click to browse from your computer</p>
                                                    <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <FileText className="w-3.5 h-3.5" />
                                                            <span>PDF, TXT, MD</span>
                                                        </div>
                                                        <span>•</span>
                                                        <span>Max 10MB</span>
                                                        <span>•</span>
                                                        <span className="text-green-500/70">100% Private</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Divider */}
                                            <div className="relative py-4">
                                                <div className="absolute inset-0 flex items-center">
                                                    <div className="w-full border-t border-white/10"></div>
                                                </div>
                                                <div className="relative flex justify-center text-sm">
                                                    <span className="px-4 bg-[#1a1a1a] text-gray-500 font-medium">or skip resume upload</span>
                                                </div>
                                            </div>

                                            {/* Skip Button */}
                                            <motion.button
                                                onClick={() => setStep('goal')}
                                                className="w-full group relative overflow-hidden text-sm text-white/70 hover:text-white transition-colors py-3.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-[#fcba28]/30 font-medium"
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fcba28]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                <div className="relative flex items-center justify-center gap-2">
                                                    <Briefcase className="w-4 h-4" />
                                                    <span>Continue without resume</span>
                                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </motion.button>

                                            {/* Info Card */}
                                            <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                                                <p className="text-xs text-blue-400/80 leading-relaxed">
                                                    <span className="font-semibold">💡 Pro Tip:</span> Uploading your resume helps us generate highly personalized questions based on your actual experience. You can still proceed without it!
                                                </p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="goal"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            {/* Resume Status */}
                                            {resumeText ? (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20"
                                                >
                                                    <div className="p-3 bg-green-500/20 rounded-xl">
                                                        <Check className="w-5 h-5 text-green-400" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-white text-sm font-semibold truncate">{file?.name || 'Resume Uploaded'}</p>
                                                        <p className="text-green-400/70 text-xs mt-0.5">✓ Ready for AI analysis</p>
                                                    </div>
                                                    <button
                                                        onClick={() => { setStep('upload'); setResumeText(''); setFile(null); }}
                                                        className="text-xs text-gray-400 hover:text-white underline px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                                                    >
                                                        Change
                                                    </button>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                                                >
                                                    <div className="p-3 bg-white/10 rounded-xl">
                                                        <Briefcase className="w-5 h-5 text-white/50" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-white text-sm font-semibold">No Resume • Using Manual Input</p>
                                                        <p className="text-white/40 text-xs mt-0.5">Questions will be based on your role and JD</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setStep('upload')}
                                                        className="text-xs text-[#fcba28] hover:text-[#fcd978] font-medium px-3 py-1.5 rounded-lg hover:bg-[#fcba28]/10 transition-colors"
                                                    >
                                                        Upload
                                                    </button>
                                                </motion.div>
                                            )}

                                            {/* Target Role */}
                                            <div>
                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                                                    <Target className="w-4 h-4 text-[#fcba28]" />
                                                    Target Role <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={goal}
                                                    onChange={(e) => setGoal(e.target.value)}
                                                    placeholder="e.g., Senior Software Engineer, Product Manager, Data Scientist..."
                                                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#fcba28]/50 focus:bg-white/10 focus:ring-2 focus:ring-[#fcba28]/20 transition-all"
                                                />
                                            </div>

                                            {/* Job Description */}
                                            <div>
                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                                                    <FileText className="w-4 h-4 text-[#fcba28]" />
                                                    Job Description <span className="text-gray-500 text-xs font-normal">(Optional)</span>
                                                </label>
                                                <textarea
                                                    value={jobDescription}
                                                    onChange={(e) => setJobDescription(e.target.value)}
                                                    placeholder="Paste the job description here for hyper-specific questions tailored to the role requirements..."
                                                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#fcba28]/50 focus:bg-white/10 focus:ring-2 focus:ring-[#fcba28]/20 transition-all min-h-[120px] resize-y"
                                                />
                                            </div>

                                            {/* Interview Features */}
                                            <div className="space-y-4 pt-2">
                                                <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4 text-[#fcba28]" />
                                                    Interview Features
                                                </h3>

                                                <div className="grid grid-cols-1 gap-3">
                                                    <motion.div
                                                        onClick={() => setCrossQuestioning(!crossQuestioning)}
                                                        className={`p-4 rounded-xl border cursor-pointer transition-all ${crossQuestioning
                                                            ? 'bg-[#fcba28]/10 border-[#fcba28]/50 shadow-lg shadow-[#fcba28]/10'
                                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                                            }`}
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.99 }}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${crossQuestioning ? 'bg-[#fcba28] border-[#fcba28]' : 'border-gray-500'}`}>
                                                                {crossQuestioning && <Check className="w-3.5 h-3.5 text-black" />}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className={`text-sm font-semibold ${crossQuestioning ? 'text-[#fcba28]' : 'text-white'}`}>Cross Questioning</h4>
                                                                <p className="text-xs text-gray-400 mt-0.5">AI will ask intelligent follow-up questions based on your answers</p>
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    <motion.div
                                                        onClick={() => setHandsFreeMode(!handsFreeMode)}
                                                        className={`p-4 rounded-xl border cursor-pointer transition-all ${handsFreeMode
                                                            ? 'bg-[#fcba28]/10 border-[#fcba28]/50 shadow-lg shadow-[#fcba28]/10'
                                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                                            }`}
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.99 }}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${handsFreeMode ? 'bg-[#fcba28] border-[#fcba28]' : 'border-gray-500'}`}>
                                                                {handsFreeMode && <Check className="w-3.5 h-3.5 text-black" />}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className={`text-sm font-semibold ${handsFreeMode ? 'text-[#fcba28]' : 'text-white'}`}>Hands-free Mode</h4>
                                                                <p className="text-xs text-gray-400 mt-0.5">Auto-advance to next question & auto-start recording</p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Question Flow Type */}
                                            <div className="pt-2">
                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                                                    <Sparkles className="w-4 h-4 text-[#fcba28]" />
                                                    Question Flow Type
                                                </label>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {(['Technical', 'Behavioral', 'Mixed'] as const).map((type) => (
                                                        <motion.button
                                                            key={type}
                                                            onClick={() => setQuestionFlowType(type)}
                                                            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${questionFlowType === type
                                                                    ? 'bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black shadow-lg shadow-[#fcba28]/30'
                                                                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:border-white/20'
                                                                }`}
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            {type}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-gray-400 mt-3 pl-1">
                                                    {questionFlowType === 'Technical' && '⚙️ Focus on technical skills, coding, and system design'}
                                                    {questionFlowType === 'Behavioral' && '🤝 Focus on soft skills, leadership, and past experiences'}
                                                    {questionFlowType === 'Mixed' && '🎯 Balanced flow: Intro → Technical → Behavioral'}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
                                <div className="flex justify-between items-center">
                                    {step === 'goal' ? (
                                        <button
                                            onClick={() => setStep('upload')}
                                            className="px-5 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium"
                                        >
                                            ← Back
                                        </button>
                                    ) : (
                                        <button
                                            onClick={onClose}
                                            className="px-5 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    {step === 'goal' && (
                                        <motion.button
                                            onClick={handleSubmit}
                                            disabled={isProcessing || !goal.trim()}
                                            className="px-8 py-3 bg-gradient-to-r from-[#fcba28] to-[#fcd978] hover:from-[#fcd978] hover:to-[#fcba28] text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#fcba28]/30 hover:shadow-[#fcba28]/50 disabled:shadow-none"
                                            whileHover={!isProcessing && goal.trim() ? { scale: 1.02 } : {}}
                                            whileTap={!isProcessing && goal.trim() ? { scale: 0.98 } : {}}
                                        >
                                            {isProcessing ? (
                                                <span className="flex items-center gap-2">
                                                    <motion.div
                                                        className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    />
                                                    Processing...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    Start AI Interview
                                                    <Sparkles className="w-4 h-4" />
                                                </span>
                                            )}
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
