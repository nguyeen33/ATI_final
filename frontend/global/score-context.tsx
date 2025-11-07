'use client';

import React, { createContext, useContext, useReducer } from 'react';

export interface Score {
  reading: {
    score: number;
    total: number;
    answers: Record<string, boolean>;
  };
  listening: {
    score: number;
    total: number;
    answers: Record<string, boolean>;
  };
  writing: {
    task1Score: number;
    task2Score: number;
    feedback: string[];
  };
  speaking: {
    fluencyScore: number;
    pronunciationScore: number;
    grammarScore: number;
    vocabularyScore: number;
    feedback: string[];
  };
  overall: number;
  bandScore: number;
}

interface ScoreState {
  scores: Score;
  testId: string | null;
  submittedAt: string | null;
}

type ScoreAction =
  | { type: 'SET_READING_SCORE'; payload: { score: number; answers: Record<string, boolean> } }
  | { type: 'SET_LISTENING_SCORE'; payload: { score: number; answers: Record<string, boolean> } }
  | { type: 'SET_WRITING_SCORE'; payload: { task1Score: number; task2Score: number; feedback: string[] } }
  | { type: 'SET_SPEAKING_SCORE'; payload: { scores: { fluency: number; pronunciation: number; grammar: number; vocabulary: number }; feedback: string[] } }
  | { type: 'SUBMIT_TEST'; payload: { testId: string } };

const initialState: ScoreState = {
  scores: {
    reading: { score: 0, total: 40, answers: {} },
    listening: { score: 0, total: 40, answers: {} },
    writing: { task1Score: 0, task2Score: 0, feedback: [] },
    speaking: {
      fluencyScore: 0,
      pronunciationScore: 0,
      grammarScore: 0,
      vocabularyScore: 0,
      feedback: []
    },
    overall: 0,
    bandScore: 0
  },
  testId: null,
  submittedAt: null
};

function calculateBandScore(score: number): number {
  if (score >= 39) return 9.0;
  if (score >= 37) return 8.5;
  if (score >= 35) return 8.0;
  if (score >= 33) return 7.5;
  if (score >= 30) return 7.0;
  if (score >= 27) return 6.5;
  if (score >= 23) return 6.0;
  if (score >= 20) return 5.5;
  if (score >= 16) return 5.0;
  if (score >= 13) return 4.5;
  if (score >= 10) return 4.0;
  if (score >= 7) return 3.5;
  if (score >= 5) return 3.0;
  if (score >= 3) return 2.5;
  return 2.0;
}

function calculateOverallScore(scores: Score): number {
  const readingScore = (scores.reading.score / scores.reading.total) * 9;
  const listeningScore = (scores.listening.score / scores.listening.total) * 9;
  const writingScore = ((scores.writing.task1Score + scores.writing.task2Score) / 2);
  const speakingScore = (
    scores.speaking.fluencyScore +
    scores.speaking.pronunciationScore +
    scores.speaking.grammarScore +
    scores.speaking.vocabularyScore
  ) / 4;

  return (readingScore + listeningScore + writingScore + speakingScore) / 4;
}

function scoreReducer(state: ScoreState, action: ScoreAction): ScoreState {
  switch (action.type) {
    case 'SET_READING_SCORE': {
      const newScores = {
        ...state.scores,
        reading: {
          ...state.scores.reading,
          score: action.payload.score,
          answers: action.payload.answers
        }
      };
      const overall = calculateOverallScore(newScores);
      return {
        ...state,
        scores: {
          ...newScores,
          overall,
          bandScore: calculateBandScore(overall)
        }
      };
    }
    case 'SET_LISTENING_SCORE': {
      const newScores = {
        ...state.scores,
        listening: {
          ...state.scores.listening,
          score: action.payload.score,
          answers: action.payload.answers
        }
      };
      const overall = calculateOverallScore(newScores);
      return {
        ...state,
        scores: {
          ...newScores,
          overall,
          bandScore: calculateBandScore(overall)
        }
      };
    }
    case 'SET_WRITING_SCORE': {
      const newScores = {
        ...state.scores,
        writing: {
          ...state.scores.writing,
          task1Score: action.payload.task1Score,
          task2Score: action.payload.task2Score,
          feedback: action.payload.feedback
        }
      };
      const overall = calculateOverallScore(newScores);
      return {
        ...state,
        scores: {
          ...newScores,
          overall,
          bandScore: calculateBandScore(overall)
        }
      };
    }
    case 'SET_SPEAKING_SCORE': {
      const newScores = {
        ...state.scores,
        speaking: {
          ...state.scores.speaking,
          fluencyScore: action.payload.scores.fluency,
          pronunciationScore: action.payload.scores.pronunciation,
          grammarScore: action.payload.scores.grammar,
          vocabularyScore: action.payload.scores.vocabulary,
          feedback: action.payload.feedback
        }
      };
      const overall = calculateOverallScore(newScores);
      return {
        ...state,
        scores: {
          ...newScores,
          overall,
          bandScore: calculateBandScore(overall)
        }
      };
    }
    case 'SUBMIT_TEST':
      return {
        ...state,
        testId: action.payload.testId,
        submittedAt: new Date().toISOString()
      };
    default:
      return state;
  }
}

const ScoreContext = createContext<{
  state: ScoreState;
  dispatch: React.Dispatch<ScoreAction>;
} | undefined>(undefined);

export function ScoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(scoreReducer, initialState);
  return (
    <ScoreContext.Provider value={{ state, dispatch }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
}