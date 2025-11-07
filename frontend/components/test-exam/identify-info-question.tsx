'use client';

import { IdentifyInfoQuestion as IdentifyInfoQuestionType } from '@/types/test-exam/mock-test';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Props {
  id: string;
  question: string;
  statements: string[];
  onAnswer: (id: string, value: string) => void;
  selectedAnswers?: string[];
}

export function IdentifyInfoQuestion({
  id,
  question,
  statements,
  onAnswer,
  selectedAnswers = []
}: Props) {
  const handleChange = (statement: string, checked: boolean) => {
    const newAnswers = checked
      ? [...selectedAnswers, statement]
      : selectedAnswers.filter(s => s !== statement);
    onAnswer(id, newAnswers.join(','));
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium mb-4">{question}</h3>
      <div className="space-y-4">
        {statements.map((statement) => (
          <div key={statement} className="flex items-start space-x-3">
            <Checkbox
              id={`${id}-${statement}`}
              checked={selectedAnswers.includes(statement)}
              onCheckedChange={(checked) => handleChange(statement, checked as boolean)}
            />
            <Label
              htmlFor={`${id}-${statement}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {statement}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}