export type QuestionType = 
  | 'multiple-choice'
  | 'matching'
  | 'identify-info'
  | 'form-completion'
  | 'table-completion'
  | 'diagram-completion'
  | 'short-answer';

export type TestSection = 'reading' | 'listening' | 'writing' | 'speaking';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  pairs: Array<{ item: string; match: string }>;
}

export interface IdentifyInfoQuestion extends BaseQuestion {
  type: 'identify-info';
  statements: string[];
  correctAnswers: string[];
}

export interface FormCompletionQuestion extends BaseQuestion {
  type: 'form-completion';
  form: {
    title: string;
    fields: Array<{
      label: string;
      answer: string;
      maxWords?: number;
      format?: 'text' | 'number' | 'date';
    }>;
  };
}

export type TestQuestion = 
  | MultipleChoiceQuestion 
  | MatchingQuestion 
  | IdentifyInfoQuestion 
  | FormCompletionQuestion;

export interface ReadingSection {
  title: string;
  content: string;
  questions: TestQuestion[];
}

export interface WritingTask {
  number: number;
  type: 'graph-description' | 'essay';
  prompt: string;
  minWords: number;
  maxTime: number;
}

export interface ListeningTask {
  number: number;
  title: string;
  audioUrl: string;
  type: 'conversation' | 'monologue' | 'academic-discussion' | 'lecture';
  questions: TestQuestion[];
  maxPlays: number;
  duration: number;
}

export interface SpeakingTask {
  number: number;
  type: 'introduction-and-interview' | 'individual-long-turn' | 'discussion';
  topics?: string[];
  prompt?: string;
  questions?: string[];
  preparationTime?: number;
  speakingTime: number;
  duration?: number;
}

export interface MockTest {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'general';
  duration: number; // in seconds
  sections: ReadingSection[];
  writingTasks?: WritingTask[];
  listeningTasks: ListeningTask[];
  speakingTasks?: SpeakingTask[];
}

export interface TestState {
  currentSection: TestSection;
  timeRemaining: number;
  isPaused: boolean;
  pausesRemaining: number;
  focusViolations: number;
  lastSaved: string;
  isSubmitted: boolean;
  answers: Record<string, Answer>;
}

export interface Answer {
  questionId: string;
  value: string;
  timestamp: string;
  sectionType: TestSection;
  metadata?: Record<string, any>;
}

export interface WritingAnswer extends Answer {
  metadata: {
    taskNumber: number;
    wordCount: number;
  };
}

export interface SpeakingAnswer extends Answer {
  metadata: {
    taskNumber: number;
    duration: number;
    recordingUrl: string;
  };
}

export interface TestProgress {
  totalQuestions: number;
  answeredQuestions: number;
  sectionProgress: Record<TestSection, number>;
  timeSpentPerSection: Record<TestSection, number>;
}

export interface TestResult {
  id: string;
  testId: string;
  userId: string;
  startTime: string;
  endTime: string;
  answers: Answer[];
  scores: {
    reading: number;
    listening: number;
    writing: number;
    speaking: number;
    overall: number;
  };
  bandScores: {
    reading: number;
    listening: number;
    writing: number;
    speaking: number;
    overall: number;
  };
}