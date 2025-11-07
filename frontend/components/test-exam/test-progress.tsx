'use client';

import { useContext } from 'react';
import { Progress } from '@/components/ui/progress';
import { ExamContext } from '@/global/exam-context';

export function TestProgress() {
  const { userAnswers, selectedAssessment } = useContext(ExamContext);

  if (!selectedAssessment) return null;

  const totalQuestions = selectedAssessment.totalQuestions;
  const answeredQuestions = userAnswers.length;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  return (
    <div className="px-4 py-2 border-b">
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