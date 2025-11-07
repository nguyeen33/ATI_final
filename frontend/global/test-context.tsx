'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { TestState, TestSection, Answer, TestProgress, TestSettings } from '@/types/test-exam/mock-test';

interface TestContextType {
  state: TestState;
  progress: TestProgress;
  answers: Record<string, Answer>;
  dispatch: React.Dispatch<TestAction>;
  settings: TestSettings;
}

type TestAction =
  | { type: 'SET_SECTION'; payload: TestSection }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'TOGGLE_PAUSE' }
  | { type: 'ADD_ANSWER'; payload: Answer }
  | { type: 'ADD_FOCUS_VIOLATION' }
  | { type: 'SAVE_STATE' }
  | { type: 'SUBMIT_TEST' };

const defaultSettings: TestSettings = {
  sectionTimeLimit: {
    reading: 3600,
    listening: 1800,
    writing: 3600,
    speaking: 840,
  },
  allowedPauses: 2,
  autoSaveInterval: 30000,
  maxFocusViolations: 3,
};

const initialState: TestState = {
  currentSection: 'reading',
  timeRemaining: defaultSettings.sectionTimeLimit.reading,
  isPaused: false,
  pausesRemaining: defaultSettings.allowedPauses,
  focusViolations: 0,
  lastSaved: new Date().toISOString(),
  isSubmitted: false,
  answers: {}
};

const initialProgress: TestProgress = {
  totalQuestions: 0,
  answeredQuestions: 0,
  sectionProgress: {
    reading: 0,
    listening: 0,
    writing: 0,
    speaking: 0,
  },
  currentSection: 'reading',
  timeSpentPerSection: {
    reading: 0,
    listening: 0,
    writing: 0,
    speaking: 0,
  },
};

const TestContext = createContext<TestContextType | undefined>(undefined);

function testReducer(state: TestState, action: TestAction): TestState {
  switch (action.type) {
    case 'SET_SECTION':
      return {
        ...state,
        currentSection: action.payload,
        timeRemaining: defaultSettings.sectionTimeLimit[action.payload],
      };
    case 'UPDATE_TIME':
      return {
        ...state,
        timeRemaining: action.payload,
      };
    case 'TOGGLE_PAUSE':
      return {
        ...state,
        isPaused: !state.isPaused,
        pausesRemaining: state.pausesRemaining - (state.isPaused ? 0 : 1),
      };
    case 'ADD_FOCUS_VIOLATION':
      return {
        ...state,
        focusViolations: state.focusViolations + 1,
      };
    case 'SAVE_STATE':
      return {
        ...state,
        lastSaved: new Date().toISOString(),
      };
    case 'SUBMIT_TEST':
      return {
        ...state,
        isSubmitted: true,
      };
    default:
      return state;
  }
}

export function TestProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(testReducer, initialState);
  const [answers, setAnswers] = React.useState<Record<string, Answer>>({});
  const [progress, setProgress] = React.useState<TestProgress>(initialProgress);

  // Auto-save functionality
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (!state.isPaused && !state.isSubmitted) {
        localStorage.setItem('testState', JSON.stringify(state));
        localStorage.setItem('testAnswers', JSON.stringify(answers));
        dispatch({ type: 'SAVE_STATE' });
      }
    }, defaultSettings.autoSaveInterval);

    return () => clearInterval(saveInterval);
  }, [state, answers]);

  // Focus monitoring
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !state.isPaused && !state.isSubmitted) {
        dispatch({ type: 'ADD_FOCUS_VIOLATION' });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [state.isPaused, state.isSubmitted]);

  // Timer functionality
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!state.isPaused && !state.isSubmitted && state.timeRemaining > 0) {
      timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TIME', payload: state.timeRemaining - 1 });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [state.isPaused, state.timeRemaining, state.isSubmitted]);

  // Update progress when answers change
  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    setProgress(prev => ({
      ...prev,
      answeredQuestions: answeredCount,
      sectionProgress: {
        ...prev.sectionProgress,
        [state.currentSection]: answeredCount,
      },
    }));
  }, [answers, state.currentSection]);

  const value = {
    state,
    progress,
    answers,
    dispatch,
    settings: defaultSettings,
  };

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
}

export function useTest() {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}