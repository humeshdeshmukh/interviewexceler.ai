import { useState } from 'react';
import { analyzeCV } from '../lib/gemini';

export const useCVAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [cvText, setCvText] = useState<string>('');

  const analyzeResume = async (text: string) => {
    if (!text.trim()) {
      setError('CV content cannot be empty');
      return;
    }

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      setError('Gemini API key is not configured. Please check your environment variables.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setCvText(text);
    
    try {
      console.log('Starting CV analysis with text length:', text.length); // Debug log
      const analysisResult = await analyzeCV(text);
      console.log('Analysis Result:', analysisResult); // Debug log
      
      if (!analysisResult) {
        throw new Error('Failed to get analysis results');
      }
      
      setResult(analysisResult);
    } catch (err: any) {
      console.error('CV Analysis Error:', err);
      setError(err.message || 'An error occurred while analyzing the CV. Please try again.');
      setResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyzeCV: analyzeResume,
    isAnalyzing,
    error,
    result,
    cvText
  };
};
