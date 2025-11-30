import { useState } from 'react';
import { optimizeCV, OptimizationOptions, OptimizedResume } from '../lib/gemini';

export const useCVOptimization = () => {
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<OptimizedResume | null>(null);

    const optimize = async (cvText: string, options: OptimizationOptions) => {
        if (!cvText.trim()) {
            setError('CV content cannot be empty');
            return;
        }

        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            setError('Gemini API key is not configured. Please check your environment variables.');
            return;
        }

        setIsOptimizing(true);
        setError(null);

        try {
            console.log('Starting CV optimization with options:', options);
            const optimizationResult = await optimizeCV(cvText, options);
            console.log('Optimization Result:', optimizationResult);

            if (!optimizationResult) {
                throw new Error('Failed to get optimization results');
            }

            setResult(optimizationResult);
        } catch (err: any) {
            console.error('CV Optimization Error:', err);
            setError(err.message || 'An error occurred while optimizing the CV. Please try again.');
            setResult(null);
        } finally {
            setIsOptimizing(false);
        }
    };

    const reset = () => {
        setResult(null);
        setError(null);
    };

    return {
        optimize,
        isOptimizing,
        error,
        result,
        reset
    };
};
