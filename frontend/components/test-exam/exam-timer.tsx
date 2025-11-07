'use client';

import { useContext, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { ExamContext } from '@/global/exam-context';
import { useExamHandler } from '@/global/use-exam-handler';

export function ExamTimer() {
  const { timeRemaining, setTimeRemaining } = useContext(ExamContext);
  const { handleSubmit } = useExamHandler();

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit(); // Auto-submit when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, setTimeRemaining, handleSubmit]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 text-lg">
      <Clock className="h-5 w-5" />
      <span className="font-semibold">{formatTime(timeRemaining)}</span>
    </div>
  );
}