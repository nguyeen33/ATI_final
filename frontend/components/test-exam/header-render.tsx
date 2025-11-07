'use client';

import { useContext } from 'react';
import { Wifi } from 'lucide-react';
import { ExamContext } from '@/global/exam-context';
import { Icons } from '../ui/icons';
import { ExamTimer } from './exam-timer';
import PublicAssessmentButton from './public-assessment-button';

function TextExamHeaderRender() {
  const { mode, selectedAssessment } = useContext(ExamContext);
  return (
    <div className="px-4 py-2 flex items-center border-b">
      {mode === 'edit' && <PublicAssessmentButton />}
      <div className="gap-6 flex items-center flex-1">
        <Icons.logo className="h-6 w-6" aria-hidden="true" />
        <div className="flex-1">
          <h1 className="font-bold text-lg">
            {selectedAssessment ? `IELTS ${selectedAssessment.name}` : 'Mock Test'}
          </h1>
          <div className="flex items-center gap-4">
            <ExamTimer />
            {mode === 'exam' && (
              <div className="text-sm text-muted-foreground">
                Auto-submits when time runs out
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-green-100">
          <Wifi className="h-4 w-4 text-green-600" />
        </div>
      </div>
    </div>
  );
}

export default TextExamHeaderRender;
