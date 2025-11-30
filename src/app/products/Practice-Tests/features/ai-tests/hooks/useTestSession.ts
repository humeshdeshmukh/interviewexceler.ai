import { useState, useEffect, useCallback } from 'react';

interface UseTestSessionProps {
    testId: string;
    durationMinutes: number;
    onTimeUp: () => void;
}

interface TestSessionState {
    answers: Record<string, any>;
    flags: Record<string, boolean>;
    currentQuestionIndex: number;
    timeRemaining: number;
    isComplete: boolean;
}

export function useTestSession({ testId, durationMinutes, onTimeUp }: UseTestSessionProps) {
    // Initialize state from localStorage or defaults
    const [state, setState] = useState<TestSessionState>(() => {
        if (typeof window === 'undefined') {
            return {
                answers: {},
                flags: {},
                currentQuestionIndex: 0,
                timeRemaining: durationMinutes * 60,
                isComplete: false,
            };
        }

        const saved = localStorage.getItem(`test_session_${testId}`);
        if (saved) {
            const parsed = JSON.parse(saved);
            // If test was already completed, we might want to reset or handle differently
            // For now, we resume where they left off
            return parsed;
        }

        return {
            answers: {},
            flags: {},
            currentQuestionIndex: 0,
            timeRemaining: durationMinutes * 60,
            isComplete: false,
        };
    });

    // Persist state changes
    useEffect(() => {
        localStorage.setItem(`test_session_${testId}`, JSON.stringify(state));
    }, [state, testId]);

    // Timer logic
    useEffect(() => {
        if (state.isComplete || state.timeRemaining <= 0) return;

        const timer = setInterval(() => {
            setState(prev => {
                if (prev.timeRemaining <= 0) {
                    clearInterval(timer);
                    onTimeUp();
                    return { ...prev, timeRemaining: 0, isComplete: true };
                }
                return { ...prev, timeRemaining: prev.timeRemaining - 1 };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [state.isComplete, onTimeUp]);

    const setAnswer = useCallback((questionId: string, answer: any) => {
        setState(prev => ({
            ...prev,
            answers: { ...prev.answers, [questionId]: answer }
        }));
    }, []);

    const toggleFlag = useCallback((questionId: string) => {
        setState(prev => ({
            ...prev,
            flags: { ...prev.flags, [questionId]: !prev.flags[questionId] }
        }));
    }, []);

    const setCurrentQuestionIndex = useCallback((index: number) => {
        setState(prev => ({ ...prev, currentQuestionIndex: index }));
    }, []);

    const completeTest = useCallback(() => {
        setState(prev => ({ ...prev, isComplete: true }));
        // Optional: Clear localStorage upon completion if you don't want to persist finished tests
        // localStorage.removeItem(`test_session_${testId}`);
    }, []);

    const clearSession = useCallback(() => {
        localStorage.removeItem(`test_session_${testId}`);
    }, [testId]);

    return {
        ...state,
        setAnswer,
        toggleFlag,
        setCurrentQuestionIndex,
        completeTest,
        clearSession,
    };
}
