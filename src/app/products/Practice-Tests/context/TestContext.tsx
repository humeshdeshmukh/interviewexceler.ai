"use client";

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Test, Category } from '../utils/types';

interface TestState {
  categories: Category[];
  tests: Test[];
  selectedTest: Test | null;
  error: string | null;
}

type TestAction =
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_TESTS'; payload: Test[] }
  | { type: 'SET_SELECTED_TEST'; payload: Test }
  | { type: 'CLEAR_SELECTED_TEST' }
  | { type: 'SET_ERROR'; payload: string };

const initialState: TestState = {
  categories: [],
  tests: [],
  selectedTest: null,
  error: null
};

const TestContext = createContext<{
  state: TestState;
  dispatch: React.Dispatch<TestAction>;
} | undefined>(undefined);

function testReducer(state: TestState, action: TestAction): TestState {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_TESTS':
      return { ...state, tests: action.payload };
    case 'SET_SELECTED_TEST':
      return { ...state, selectedTest: action.payload };
    case 'CLEAR_SELECTED_TEST':
      return { ...state, selectedTest: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function TestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(testReducer, initialState);

  return (
    <TestContext.Provider value={{ state, dispatch }}>
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}
