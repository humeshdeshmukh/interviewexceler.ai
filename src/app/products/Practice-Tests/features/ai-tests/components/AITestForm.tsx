import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaBrain, FaChartLine, FaLightbulb, FaGraduationCap, FaArrowRight, FaArrowLeft, FaRocket } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { TestFormData } from '../services/gemini';
import { Stepper } from './Stepper';

interface AITestFormProps {
  onSubmit: (formData: TestFormData) => void;
  loading: boolean;
  previousPerformance?: {
    correctAnswers: number;
    totalQuestions: number;
    topics: Record<string, number>;
  };
}

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead Level'];
const questionTypes = ['multiple-choice', 'coding', 'theoretical', 'scenario-based', 'system-design'];
const timeOptions = [30, 45, 60, 90, 120];
const topicsList = [
  'Data Structures',
  'Algorithms',
  'System Design',
  'Object-Oriented Programming',
  'Database Design',
  'Web Development',
  'Cloud Computing',
  'DevOps',
  'Security',
  'Machine Learning'
];

const steps = [
  { id: 1, label: 'Topics' },
  { id: 2, label: 'Configuration' },
  { id: 3, label: 'Advanced' },
  { id: 4, label: 'Review' }
];

const SelectButton = ({ selected, onClick, children }: any) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={cn(
      "px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border",
      selected
        ? "bg-[#fcba28] text-black border-[#fcba28] shadow-[0_0_15px_rgba(252,186,40,0.3)]"
        : "bg-[#1a1a1a] text-gray-400 border-gray-800 hover:border-[#fcba28]/50 hover:text-[#fcba28]"
    )}
  >
    {children}
  </motion.button>
);

export default function AITestForm({ onSubmit, loading, previousPerformance }: AITestFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<TestFormData>({
    topics: [],
    customTopic: '',
    difficulty: 'Intermediate',
    questionCount: 5,
    questionTypes: ['multiple-choice'],
    experienceLevel: 'Mid Level',
    specificFocus: [],
    difficultyProgression: 'fixed',
    includeExplanations: true,
    includePracticeQuestions: true,
    adaptiveMode: false,
    timeLimit: 60,
    includeHints: true,
    includeResources: true,
    focusAreas: [],
    customInstructions: '',
    interviewType: 'technical',
    companyFocus: '',
    codingLanguages: [],
    includeSystemDesign: false,
    includeArchitectureQuestions: false,
    includeBehavioralQuestions: false,
    difficultyDistribution: {
      easy: 30,
      medium: 40,
      hard: 30
    },
    previousPerformance: previousPerformance ? {
      correctAnswers: previousPerformance.correctAnswers,
      totalQuestions: previousPerformance.totalQuestions,
      topics: previousPerformance.topics
    } : undefined
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (step === 0) {
      if (formData.topics.length === 0) {
        newErrors.topics = 'Please select at least one topic';
        isValid = false;
      }
    } else if (step === 1) {
      if (formData.questionTypes.length === 0) {
        newErrors.questionTypes = 'Please select at least one question type';
        isValid = false;
      }
      if (formData.questionCount < 1 || formData.questionCount > 50) {
        newErrors.questionCount = 'Question count must be between 1 and 50';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    onSubmit(formData);
  };

  const toggleTopic = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const toggleQuestionType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      questionTypes: prev.questionTypes.includes(type)
        ? prev.questionTypes.filter(t => t !== type)
        : [...prev.questionTypes, type]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#fcba28] mb-4 border-b border-[#fcba28]/10 pb-4">
                <FaBrain className="w-5 h-5" />
                <h3 className="font-semibold text-lg tracking-wide">Select Topics</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {topicsList.map(topic => (
                  <SelectButton
                    key={topic}
                    selected={formData.topics.includes(topic)}
                    onClick={() => toggleTopic(topic)}
                  >
                    {topic}
                  </SelectButton>
                ))}
              </div>

              {/* Custom Topic Input */}
              <div className="mt-6 p-4 rounded-xl bg-[#1a1a1a]/30 border border-gray-800">
                <Label className="text-gray-400 mb-3 block">Add Custom Topic</Label>
                <div className="flex gap-3">
                  <Input
                    type="text"
                    value={formData.customTopic || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, customTopic: e.target.value }))}
                    placeholder="Enter custom topic..."
                    className="flex-1 bg-[#1a1a1a] border-gray-700 focus:border-[#fcba28] text-white placeholder:text-gray-600 h-11"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (formData.customTopic?.trim()) {
                          setFormData(prev => ({
                            ...prev,
                            topics: [...prev.topics, prev.customTopic!.trim()],
                            customTopic: ''
                          }));
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (formData.customTopic?.trim()) {
                        setFormData(prev => ({
                          ...prev,
                          topics: [...prev.topics, prev.customTopic!.trim()],
                          customTopic: ''
                        }));
                      }
                    }}
                    className="bg-[#fcba28] text-black hover:bg-[#fcba28]/90 font-medium px-6 h-11"
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Selected Topics Tags */}
              {formData.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-800">
                  {formData.topics.map(topic => (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      key={topic}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20 text-[#fcba28]"
                    >
                      <span className="text-sm font-medium">{topic}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          topics: prev.topics.filter(t => t !== topic)
                        }))}
                        className="text-[#fcba28]/60 hover:text-[#fcba28] transition-colors"
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
              {errors.topics && <p className="text-red-500 text-sm mt-2 font-medium">{errors.topics}</p>}
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[#fcba28] mb-4 border-b border-[#fcba28]/10 pb-4">
                  <FaGraduationCap className="w-5 h-5" />
                  <h3 className="font-semibold text-lg tracking-wide">Test Configuration</h3>
                </div>

                <div>
                  <Label className="text-gray-400 mb-3 block">Difficulty Level</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {difficultyLevels.map(level => (
                      <SelectButton
                        key={level}
                        selected={formData.difficulty === level}
                        onClick={() => setFormData(prev => ({ ...prev, difficulty: level }))}
                      >
                        {level}
                      </SelectButton>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-gray-400 mb-3 block">Experience Level</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {experienceLevels.map(level => (
                      <SelectButton
                        key={level}
                        selected={formData.experienceLevel === level}
                        onClick={() => setFormData(prev => ({ ...prev, experienceLevel: level }))}
                      >
                        {level}
                      </SelectButton>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-gray-400 mb-3 block">Time Limit (minutes)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeOptions.map(time => (
                      <SelectButton
                        key={time}
                        selected={formData.timeLimit === time}
                        onClick={() => setFormData(prev => ({ ...prev, timeLimit: time }))}
                      >
                        {time}
                      </SelectButton>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[#fcba28] mb-4 border-b border-[#fcba28]/10 pb-4">
                  <FaCode className="w-5 h-5" />
                  <h3 className="font-semibold text-lg tracking-wide">Question Settings</h3>
                </div>

                <div>
                  <Label className="text-gray-400 mb-3 block">Question Types</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {questionTypes.map(type => (
                      <SelectButton
                        key={type}
                        selected={formData.questionTypes.includes(type)}
                        onClick={() => toggleQuestionType(type)}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectButton>
                    ))}
                  </div>
                  {errors.questionTypes && <p className="text-red-500 text-sm mt-2 font-medium">{errors.questionTypes}</p>}
                </div>

                <div>
                  <Label className="text-gray-400 mb-3 block">Number of Questions</Label>
                  <Input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.questionCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, questionCount: parseInt(e.target.value) || 1 }))}
                    className="bg-[#1a1a1a] border-gray-700 focus:border-[#fcba28] text-white h-11"
                  />
                  {errors.questionCount && <p className="text-red-500 text-sm mt-2 font-medium">{errors.questionCount}</p>}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 text-[#fcba28] mb-4 border-b border-[#fcba28]/10 pb-4">
              <FaLightbulb className="w-5 h-5" />
              <h3 className="font-semibold text-lg tracking-wide">Advanced Settings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Interview Type */}
                <div>
                  <Label className="text-gray-400 mb-3 block">Interview Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['technical', 'system design', 'behavioral', 'mixed'].map(type => (
                      <SelectButton
                        key={type}
                        selected={formData.interviewType === type}
                        onClick={() => setFormData(prev => ({ ...prev, interviewType: type }))}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectButton>
                    ))}
                  </div>
                </div>

                {/* Company Focus */}
                <div>
                  <Label className="text-gray-400 mb-3 block">Company Focus</Label>
                  <Input
                    type="text"
                    value={formData.companyFocus}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyFocus: e.target.value }))}
                    placeholder="e.g., FAANG, Startups, Enterprise..."
                    className="bg-[#1a1a1a] border-gray-700 focus:border-[#fcba28] text-white h-11"
                  />
                </div>

                {/* Coding Languages */}
                <div>
                  <Label className="text-gray-400 mb-3 block">Preferred Coding Languages</Label>
                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Add language and press Enter"
                      className="bg-[#1a1a1a] border-gray-700 focus:border-[#fcba28] text-white h-11"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          e.preventDefault();
                          setFormData(prev => ({
                            ...prev,
                            codingLanguages: [...prev.codingLanguages, e.currentTarget.value.trim()]
                          }));
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.codingLanguages.map((lang, index) => (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          key={index}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20 text-[#fcba28]"
                        >
                          <span className="text-sm font-medium">{lang}</span>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              codingLanguages: prev.codingLanguages.filter((_, i) => i !== index)
                            }))}
                            className="text-[#fcba28]/60 hover:text-[#fcba28] transition-colors"
                          >
                            ×
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Additional Options */}
                <div>
                  <Label className="text-gray-400 mb-3 block">Additional Options</Label>
                  <div className="space-y-3">
                    {[
                      { key: 'includeSystemDesign', label: 'System Design Questions' },
                      { key: 'includeArchitectureQuestions', label: 'Architecture Questions' },
                      { key: 'includeBehavioralQuestions', label: 'Behavioral Questions' },
                      { key: 'includeExplanations', label: 'Include Explanations' },
                      { key: 'includePracticeQuestions', label: 'Include Practice Questions' },
                      { key: 'includeHints', label: 'Include Hints' }
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center space-x-3 p-3 rounded-lg bg-[#1a1a1a]/50 border border-gray-800 cursor-pointer hover:border-[#fcba28]/50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData[key as keyof TestFormData] as boolean}
                          onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.checked }))}
                          className="form-checkbox h-5 w-5 text-[#fcba28] rounded border-gray-600 bg-[#1a1a1a] focus:ring-[#fcba28]"
                        />
                        <span className="text-sm text-gray-300">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Difficulty Distribution */}
                <div className="p-6 rounded-xl bg-[#1a1a1a]/30 border border-gray-800">
                  <Label className="text-gray-400 mb-6 block">Difficulty Distribution</Label>
                  <div className="space-y-6">
                    {[
                      { key: 'easy', color: 'text-green-500', label: 'Easy' },
                      { key: 'medium', color: 'text-yellow-500', label: 'Medium' },
                      { key: 'hard', color: 'text-red-500', label: 'Hard' }
                    ].map(({ key, color, label }) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className={color}>{label}</span>
                          <span className="text-gray-400">{formData.difficultyDistribution[key as keyof typeof formData.difficultyDistribution]}%</span>
                        </div>
                        <Slider
                          value={[formData.difficultyDistribution[key as keyof typeof formData.difficultyDistribution]]}
                          max={100}
                          step={5}
                          onValueChange={(value: number[]) => {
                            const val = value[0];
                            const others = ['easy', 'medium', 'hard'].filter(k => k !== key);
                            const remaining = 100 - val;

                            setFormData(prev => ({
                              ...prev,
                              difficultyDistribution: {
                                ...prev.difficultyDistribution,
                                [key]: val,
                                [others[0]]: Math.round(remaining * 0.6),
                                [others[1]]: Math.round(remaining * 0.4)
                              }
                            }));
                          }}
                          className="py-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 text-[#fcba28] mb-4 border-b border-[#fcba28]/10 pb-4">
              <FaChartLine className="w-5 h-5" />
              <h3 className="font-semibold text-lg tracking-wide">Review Configuration</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div className="bg-[#1a1a1a]/50 p-6 rounded-xl border border-gray-800 space-y-4">
                <h4 className="text-[#fcba28] font-medium uppercase tracking-wider text-xs mb-4">Core Settings</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Topics</span>
                    <span className="text-white font-medium text-right">{formData.topics.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Difficulty</span>
                    <span className="text-white font-medium">{formData.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Questions</span>
                    <span className="text-white font-medium">{formData.questionCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time Limit</span>
                    <span className="text-white font-medium">{formData.timeLimit} mins</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a]/50 p-6 rounded-xl border border-gray-800 space-y-4">
                <h4 className="text-[#fcba28] font-medium uppercase tracking-wider text-xs mb-4">Advanced Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Interview Type</span>
                    <span className="text-white font-medium">{formData.interviewType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Company Focus</span>
                    <span className="text-white font-medium">{formData.companyFocus || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Languages</span>
                    <span className="text-white font-medium text-right">{formData.codingLanguages.join(', ') || 'Any'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a]/50 p-6 rounded-xl border border-gray-800">
              <h4 className="text-[#fcba28] font-medium uppercase tracking-wider text-xs mb-4">Included Features</h4>
              <div className="flex flex-wrap gap-3">
                {formData.includeExplanations && <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm border border-green-500/20">Explanations</span>}
                {formData.includePracticeQuestions && <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm border border-blue-500/20">Practice Questions</span>}
                {formData.includeHints && <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-sm border border-yellow-500/20">Hints</span>}
                {formData.includeSystemDesign && <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-sm border border-purple-500/20">System Design</span>}
                {formData.includeBehavioralQuestions && <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-sm border border-pink-500/20">Behavioral</span>}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="max-w-5xl mx-auto w-full">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex-1"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
          <Button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0 || loading}
            className={cn(
              "px-6 py-2.5 rounded-xl font-medium transition-all duration-200",
              currentStep === 0
                ? "opacity-0 pointer-events-none"
                : "bg-transparent border border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
            )}
          >
            <FaArrowLeft className="mr-2 w-4 h-4" /> Back
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="px-8 py-2.5 rounded-xl font-bold bg-[#fcba28] text-black hover:bg-[#fcba28]/90 shadow-[0_0_15px_rgba(252,186,40,0.2)]"
            >
              Next <FaArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={loading}
              className={cn(
                "px-8 py-2.5 rounded-xl font-bold bg-[#fcba28] text-black hover:bg-[#fcba28]/90 shadow-[0_0_20px_rgba(252,186,40,0.3)]",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Generating...
                </div>
              ) : (
                <>Generate Test <FaRocket className="ml-2 w-4 h-4" /></>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
