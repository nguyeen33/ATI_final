'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertCircle, Eye, Save } from 'lucide-react';

interface ReadingPassageProps {
  content: string;
  title: string;
  onHighlight?: (text: string) => void;
}

export function ReadingPassage({ content, title, onHighlight }: ReadingPassageProps) {
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      onHighlight?.(selection.toString());
    }
  };

  return (
    <Card className="p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div 
        className="prose max-w-none dark:prose-invert"
        onMouseUp={handleTextSelection}
      >
        {content}
      </div>
    </Card>
  );
}

interface QuestionProps {
  id: string;
  question: string;
  options: string[];
  onAnswer: (id: string, answer: string) => void;
  selectedAnswer?: string;
}

export function Question({ id, question, options, onAnswer, selectedAnswer }: QuestionProps) {
  return (
    <div className="border-t pt-4 mt-4">
      <p className="font-medium mb-3">{question}</p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-center space-x-3 p-3 rounded-lg border 
                     hover:bg-accent hover:text-accent-foreground transition-colors
                     cursor-pointer"
          >
            <input
              type="radio"
              name={`question-${id}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={(e) => onAnswer(id, e.target.value)}
              className="h-4 w-4 text-primary border-primary focus:ring-primary"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface TestHeaderProps {
  timeRemaining: number;
  onPause: () => void;
  isPaused: boolean;
  pausesRemaining: number;
  onSave: () => void;
  lastSaved: string;
}

export function TestHeader({ 
  timeRemaining, 
  onPause, 
  isPaused, 
  pausesRemaining,
  onSave,
  lastSaved
}: TestHeaderProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="sticky top-0 z-10 bg-background border-b">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">{formatTime(timeRemaining)}</span>
            </div>
            {pausesRemaining > 0 && (
              <Button
                variant="outline"
                onClick={onPause}
                disabled={pausesRemaining === 0}
              >
                {isPaused ? 'Resume' : 'Pause'} ({pausesRemaining} left)
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Last saved: {new Date(lastSaved).toLocaleTimeString()}
            </span>
            <Button variant="outline" onClick={onSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TestProgressBarProps {
  progress: number;
  answeredQuestions: number;
  totalQuestions: number;
}

export function TestProgressBar({ 
  progress, 
  answeredQuestions, 
  totalQuestions 
}: TestProgressBarProps) {
  return (
    <div className="container py-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">Your Progress</span>
        <span className="text-sm font-medium">{progress}% Complete</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
        <span>{answeredQuestions} of {totalQuestions} questions answered</span>
        <span>{totalQuestions - answeredQuestions} remaining</span>
      </div>
    </div>
  );
}