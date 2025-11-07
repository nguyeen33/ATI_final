export type TestSection = 'reading' | 'listening';

export interface TestState {
  currentSection: TestSection;
  timeRemaining: number;
  isPaused: boolean;
  pausesRemaining: number;
  focusViolations: number;
  lastSaved: string;
  isSubmitted: boolean;
  answers: Record<string, Answer>;
  metadata?: Record<string, any>;
}

export interface Answer {
  questionId: string;
  value: string;
  timestamp: string;
  sectionType: TestSection;
  metadata?: Record<string, any>;
}

export interface TestProgress {
  totalQuestions: number;
  answeredQuestions: number;
  sectionProgress: Record<TestSection, number>;
  currentSection: TestSection;
  timeSpentPerSection: Record<TestSection, number>;
}

export interface WritingTask {
  taskNumber: number;
  content: string;
  wordCount: number;
  lastSaved: string;
}

export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playsRemaining: number;
}

export interface TestSettings {
  sectionTimeLimit: Record<TestSection, number>;
  allowedPauses: number;
  autoSaveInterval: number;
  maxFocusViolations: number;
}

export interface MatchingQuestion {
  id: string;
  type: 'matching';
  pairs: Array<{
    item: string;
    match: string;
  }>;
}

export interface IdentifyInfoQuestion {
  id: string;
  type: 'identify-info';
  statements: string[];
  answers: string[];
}

export interface ListeningSection {
  title: string;
  audioUrl: string;
  maxPlays: number;
  onPlayComplete?: () => void;
}

export interface Part {
  id: string;
  title: string;
  content: string;
}

export interface Assessment {
  id: string;
  title: string;
  parts: Part[];
}