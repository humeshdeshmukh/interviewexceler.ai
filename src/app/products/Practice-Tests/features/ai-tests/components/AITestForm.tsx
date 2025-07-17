import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBrain, FaChartLine, FaLightbulb, FaRocket, FaGraduationCap } from 'react-icons/fa';
import type { TestFormData } from '../services/gemini';

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
const progressionTypes = ['fixed', 'gradual', 'random', 'adaptive'];
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

const FormSection = ({ title, icon: Icon, children }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm space-y-4"
  >
    <div className="flex items-center gap-3 text-[#fcba28] mb-4">
      <Icon className="w-5 h-5" />
      <h3 className="font-medium">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const SelectButton = ({ selected, onClick, children }: any) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm transition-all ${
      selected
        ? 'bg-[#fcba28] text-black font-medium'
        : 'bg-black/20 text-gray-300 hover:bg-[#fcba28]/10 border border-[#fcba28]/20'
    }`}
  >
    {children}
  </motion.button>
);

export default function AITestForm({ onSubmit, loading, previousPerformance }: AITestFormProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
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
    skillLevel: 'intermediate',
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.topics.length === 0) {
      newErrors.topics = 'Please select at least one topic';
    }
    if (formData.questionTypes.length === 0) {
      newErrors.questionTypes = 'Please select at least one question type';
    }
    if (formData.questionCount < 1 || formData.questionCount > 50) {
      newErrors.questionCount = 'Question count must be between 1 and 50';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || loading) return;
    
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    try {
      onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {previousPerformance && (
        <FormSection title="Previous Performance" icon={FaChartLine}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20">
              <div className="text-sm text-gray-400 mb-2">Success Rate</div>
              <div className={`text-2xl font-medium ${
                (previousPerformance.correctAnswers / previousPerformance.totalQuestions) >= 0.7
                  ? 'text-green-500'
                  : 'text-yellow-500'
              }`}>
                {Math.round((previousPerformance.correctAnswers / previousPerformance.totalQuestions) * 100)}%
              </div>
            </div>
          </div>
        </FormSection>
      )}

      <FormSection title="Topics" icon={FaBrain}>
        <div className="space-y-4">
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
          <div className="mt-4">
            <label className="block text-sm text-gray-400 mb-2">Add Custom Topic</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.customTopic}
                onChange={(e) => setFormData(prev => ({ ...prev, customTopic: e.target.value }))}
                placeholder="Enter custom topic..."
                className="flex-1 px-4 py-2 bg-black/20 border border-[#fcba28]/20 rounded-lg text-white placeholder-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (formData.customTopic.trim()) {
                    setFormData(prev => ({
                      ...prev,
                      topics: [...prev.topics, prev.customTopic.trim()],
                      customTopic: ''
                    }));
                  }
                }}
                className="px-4 py-2 bg-[#fcba28] text-black rounded-lg font-medium"
              >
                Add
              </motion.button>
            </div>
          </div>

          {/* Selected Topics Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {formData.topics.map(topic => (
              <div
                key={topic}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20"
              >
                <span className="text-sm text-gray-300">{topic}</span>
                <button
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    topics: prev.topics.filter(t => t !== topic)
                  }))}
                  className="text-gray-400 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          {errors.topics && <p className="text-red-500 text-sm mt-2">{errors.topics}</p>}
        </div>
      </FormSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSection title="Test Configuration" icon={FaGraduationCap}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Difficulty Level</label>
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
              <label className="block text-sm text-gray-400 mb-2">Experience Level</label>
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
              <label className="block text-sm text-gray-400 mb-2">Time Limit (minutes)</label>
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
        </FormSection>

        <FormSection title="Question Settings" icon={FaCode}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Question Types</label>
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
              {errors.questionTypes && <p className="text-red-500 text-sm mt-2">{errors.questionTypes}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Number of Questions</label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.questionCount}
                onChange={(e) => setFormData(prev => ({ ...prev, questionCount: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-2 bg-black/20 border border-[#fcba28]/20 rounded-lg text-white"
              />
              {errors.questionCount && <p className="text-red-500 text-sm mt-2">{errors.questionCount}</p>}
            </div>
          </div>
        </FormSection>
      </div>

      <FormSection title="Advanced Settings" icon={FaLightbulb}>
        <div className="space-y-6">
          {/* Interview Type */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Interview Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
            <label className="block text-sm text-gray-400 mb-2">Company Focus</label>
            <input
              type="text"
              value={formData.companyFocus}
              onChange={(e) => setFormData(prev => ({ ...prev, companyFocus: e.target.value }))}
              placeholder="e.g., FAANG, Startups, Enterprise..."
              className="w-full px-4 py-2 bg-black/20 border border-[#fcba28]/20 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* Coding Languages */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Preferred Coding Languages</label>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Add language and press Enter"
                className="w-full px-4 py-2 bg-black/20 border border-[#fcba28]/20 rounded-lg text-white placeholder-gray-400"
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
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.codingLanguages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20"
                  >
                    <span className="text-sm text-gray-300">{lang}</span>
                    <button
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        codingLanguages: prev.codingLanguages.filter((_, i) => i !== index)
                      }))}
                      className="text-gray-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question Type Toggles */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Additional Question Types</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.includeSystemDesign}
                  onChange={(e) => setFormData(prev => ({ ...prev, includeSystemDesign: e.target.checked }))}
                  className="form-checkbox h-5 w-5 text-[#fcba28]"
                />
                <span className="text-sm text-gray-300">System Design Questions</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.includeArchitectureQuestions}
                  onChange={(e) => setFormData(prev => ({ ...prev, includeArchitectureQuestions: e.target.checked }))}
                  className="form-checkbox h-5 w-5 text-[#fcba28]"
                />
                <span className="text-sm text-gray-300">Architecture Questions</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.includeBehavioralQuestions}
                  onChange={(e) => setFormData(prev => ({ ...prev, includeBehavioralQuestions: e.target.checked }))}
                  className="form-checkbox h-5 w-5 text-[#fcba28]"
                />
                <span className="text-sm text-gray-300">Behavioral Questions</span>
              </label>
            </div>
          </div>

          {/* Difficulty Distribution */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Difficulty Distribution</label>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Easy ({formData.difficultyDistribution.easy}%)</span>
                  <span>{formData.difficultyDistribution.easy}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.difficultyDistribution.easy}
                  onChange={(e) => {
                    const easy = parseInt(e.target.value);
                    const remaining = 100 - easy;
                    setFormData(prev => ({
                      ...prev,
                      difficultyDistribution: {
                        easy,
                        medium: Math.round(remaining * 0.6),
                        hard: Math.round(remaining * 0.4)
                      }
                    }));
                  }}
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Medium ({formData.difficultyDistribution.medium}%)</span>
                  <span>{formData.difficultyDistribution.medium}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.difficultyDistribution.medium}
                  onChange={(e) => {
                    const medium = parseInt(e.target.value);
                    const remaining = 100 - medium;
                    setFormData(prev => ({
                      ...prev,
                      difficultyDistribution: {
                        easy: Math.round(remaining * 0.4),
                        medium,
                        hard: Math.round(remaining * 0.6)
                      }
                    }));
                  }}
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Hard ({formData.difficultyDistribution.hard}%)</span>
                  <span>{formData.difficultyDistribution.hard}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.difficultyDistribution.hard}
                  onChange={(e) => {
                    const hard = parseInt(e.target.value);
                    const remaining = 100 - hard;
                    setFormData(prev => ({
                      ...prev,
                      difficultyDistribution: {
                        easy: Math.round(remaining * 0.4),
                        medium: Math.round(remaining * 0.6),
                        hard
                      }
                    }));
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Custom Instructions */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Custom Instructions</label>
            <textarea
              value={formData.customInstructions}
              onChange={(e) => setFormData(prev => ({ ...prev, customInstructions: e.target.value }))}
              placeholder="Add any specific instructions or requirements for the test..."
              className="w-full h-32 px-4 py-2 bg-black/20 border border-[#fcba28]/20 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* Focus Areas */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Focus Areas</label>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Add focus area and press Enter"
                className="w-full px-4 py-2 bg-black/20 border border-[#fcba28]/20 rounded-lg text-white placeholder-gray-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    e.preventDefault();
                    setFormData(prev => ({
                      ...prev,
                      focusAreas: [...prev.focusAreas, e.currentTarget.value.trim()]
                    }));
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.focusAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20"
                >
                  <span className="text-sm text-gray-300">{area}</span>
                  <button
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      focusAreas: prev.focusAreas.filter((_, i) => i !== index)
                    }))}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.includeExplanations}
                onChange={(e) => setFormData(prev => ({ ...prev, includeExplanations: e.target.checked }))}
                className="form-checkbox h-5 w-5 text-[#fcba28]"
              />
              <span className="text-sm text-gray-300">Include Explanations</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.includePracticeQuestions}
                onChange={(e) => setFormData(prev => ({ ...prev, includePracticeQuestions: e.target.checked }))}
                className="form-checkbox h-5 w-5 text-[#fcba28]"
              />
              <span className="text-sm text-gray-300">Include Practice Questions</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.includeHints}
                onChange={(e) => setFormData(prev => ({ ...prev, includeHints: e.target.checked }))}
                className="form-checkbox h-5 w-5 text-[#fcba28]"
              />
              <span className="text-sm text-gray-300">Include Hints</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.includeResources}
                onChange={(e) => setFormData(prev => ({ ...prev, includeResources: e.target.checked }))}
                className="form-checkbox h-5 w-5 text-[#fcba28]"
              />
              <span className="text-sm text-gray-300">Include Learning Resources</span>
            </label>
          </div>
        </div>
      </FormSection>

      <motion.button
        type="submit"
        disabled={loading || isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 rounded-xl text-lg font-medium transition-all ${
          loading || isSubmitting
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-[#fcba28] text-black hover:bg-[#fcba28]/90'
        }`}
      >
        {loading || isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <span>Review Configuration</span>
        )}
      </motion.button>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1a1a1a] rounded-xl p-8 border border-[#fcba28]/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Review Test Configuration</h2>
            
            <div className="space-y-6">
              {/* Basic Settings */}
              <div className="space-y-4">
                <h3 className="text-[#fcba28] font-medium">Basic Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <span className="font-medium">Topics:</span>
                    <div className="mt-1">{formData.topics.join(', ')}</div>
                  </div>
                  <div>
                    <span className="font-medium">Difficulty:</span>
                    <div className="mt-1">{formData.difficulty}</div>
                  </div>
                  <div>
                    <span className="font-medium">Question Count:</span>
                    <div className="mt-1">{formData.questionCount}</div>
                  </div>
                  <div>
                    <span className="font-medium">Time Limit:</span>
                    <div className="mt-1">{formData.timeLimit} minutes</div>
                  </div>
                  <div>
                    <span className="font-medium">Question Types:</span>
                    <div className="mt-1">{formData.questionTypes.join(', ')}</div>
                  </div>
                  <div>
                    <span className="font-medium">Experience Level:</span>
                    <div className="mt-1">{formData.experienceLevel}</div>
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="space-y-4">
                <h3 className="text-[#fcba28] font-medium">Advanced Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <span className="font-medium">Difficulty Progression:</span>
                    <div className="mt-1">{formData.difficultyProgression}</div>
                  </div>
                  <div>
                    <span className="font-medium">Interview Type:</span>
                    <div className="mt-1">{formData.interviewType}</div>
                  </div>
                  <div>
                    <span className="font-medium">Skill Level:</span>
                    <div className="mt-1">{formData.skillLevel}</div>
                  </div>
                  <div>
                    <span className="font-medium">Company Focus:</span>
                    <div className="mt-1">{formData.companyFocus || 'None'}</div>
                  </div>
                  <div>
                    <span className="font-medium">Coding Languages:</span>
                    <div className="mt-1">{formData.codingLanguages.join(', ') || 'None specified'}</div>
                  </div>
                  <div>
                    <span className="font-medium">Focus Areas:</span>
                    <div className="mt-1">{formData.focusAreas.join(', ') || 'None specified'}</div>
                  </div>
                </div>
              </div>

              {/* Additional Features */}
              <div className="space-y-4">
                <h3 className="text-[#fcba28] font-medium">Additional Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <span className="font-medium">Includes:</span>
                    <ul className="mt-1 space-y-1">
                      {formData.includeExplanations && <li>• Explanations</li>}
                      {formData.includePracticeQuestions && <li>• Practice Questions</li>}
                      {formData.includeHints && <li>• Hints</li>}
                      {formData.includeResources && <li>• Learning Resources</li>}
                      {formData.includeSystemDesign && <li>• System Design Questions</li>}
                      {formData.includeArchitectureQuestions && <li>• Architecture Questions</li>}
                      {formData.includeBehavioralQuestions && <li>• Behavioral Questions</li>}
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium">Difficulty Distribution:</span>
                    <ul className="mt-1 space-y-1">
                      <li>• Easy: {formData.difficultyDistribution.easy}%</li>
                      <li>• Medium: {formData.difficultyDistribution.medium}%</li>
                      <li>• Hard: {formData.difficultyDistribution.hard}%</li>
                    </ul>
                  </div>
                </div>
              </div>

              {formData.customInstructions && (
                <div className="space-y-2">
                  <h3 className="text-[#fcba28] font-medium">Custom Instructions</h3>
                  <div className="text-gray-300 whitespace-pre-wrap">{formData.customInstructions}</div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowConfirmation(false)}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg font-medium"
              >
                Edit Configuration
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                disabled={loading || isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium ${
                  loading || isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-[#fcba28] text-black hover:bg-[#fcba28]/90'
                }`}
              >
                {loading || isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Continue to Test Generation'
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </form>
  );
}
